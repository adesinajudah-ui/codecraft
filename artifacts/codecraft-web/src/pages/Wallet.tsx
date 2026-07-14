import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { useUser } from "@clerk/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useListCoinPackages,
  useGetWalletBalance,
  useGetWalletConfig,
  useInitializeCoinPurchase,
  useVerifyCoinPurchase,
  getGetWalletBalanceQueryKey,
  getVerifyCoinPurchaseQueryKey,
} from "@workspace/api-client-react";
import { queryClient } from "@/lib/queryClient";
import { Coins, ArrowLeft, History, Loader2, CheckCircle2, XCircle, Sparkles, Gift, Banknote } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

// Pending top-up payments are persisted to localStorage the moment a Paystack
// transaction is initialized (before redirecting away). Bank transfer takes
// the user out of the browser entirely — into their banking app — and when
// they return the hosted Paystack checkout page often can't be reloaded
// ("could not start this transaction"). Persisting the reference lets us
// restore a "payment in progress" banner and offer manual verification
// instead of treating the reload/app-switch as a cancelled purchase.
interface PendingTopUp {
  reference: string;
  packageId: string;
  coins: number;
  amountNaira: number;
  createdAt: number;
}

function pendingTopUpKey(userId: string | null | undefined) {
  return `codecraft_pending_wallet_topup_${userId ?? "anon"}`;
}

function loadPendingTopUp(userId: string | null | undefined): PendingTopUp | null {
  try {
    const raw = localStorage.getItem(pendingTopUpKey(userId));
    return raw ? (JSON.parse(raw) as PendingTopUp) : null;
  } catch {
    return null;
  }
}

function savePendingTopUp(userId: string | null | undefined, payment: PendingTopUp) {
  try {
    localStorage.setItem(pendingTopUpKey(userId), JSON.stringify(payment));
  } catch {
    // Storage unavailable (private browsing, quota) — the backend webhook
    // still credits the wallet even if we can't show the resume banner.
  }
}

function clearPendingTopUp(userId: string | null | undefined) {
  try {
    localStorage.removeItem(pendingTopUpKey(userId));
  } catch {
    /* ignore */
  }
}

function FirstPrizeBanner() {
  const { toast } = useToast();
  const [status, setStatus] = useState<"idle" | "loading" | "claimed">("idle");
  const [hasClaimed, setHasClaimed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${basePath}/api/wallet/claims/first-prize`)
      .then((r) => r.json())
      .then((data: { claimed: boolean }) => setHasClaimed(data.claimed))
      .catch(() => setHasClaimed(false));
  }, []);

  const handleClaim = async () => {
    setStatus("loading");
    try {
      const res = await fetch(`${basePath}/api/wallet/claims/first-prize`, { method: "POST" });
      const body = await res.json() as any;

      if (res.status === 409 || body?.error?.includes("already")) {
        setHasClaimed(true);
        setStatus("claimed");
        toast({ title: "Already claimed", description: "You've already collected this reward." });
        return;
      }
      if (!res.ok) {
        setStatus("idle");
        toast({ title: "Couldn't claim", description: body?.error ?? "Please try again.", variant: "destructive" });
        return;
      }

      setHasClaimed(true);
      setStatus("claimed");
      if (typeof body.coinBalance === "number") {
        queryClient.setQueryData(getGetWalletBalanceQueryKey(), { coinBalance: body.coinBalance });
      }
      toast({ title: "🎉 5 coins added!", description: "Your free coins are now in your wallet." });
    } catch {
      setStatus("idle");
      toast({ title: "Connection error", description: "Please try again.", variant: "destructive" });
    }
  };

  const claimed = hasClaimed || status === "claimed";

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
      <Card className="border-yellow-500/40 bg-gradient-to-r from-yellow-500/10 via-yellow-400/5 to-transparent">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
            <Gift className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">🥇 First Prize — Free Coins</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Claim <strong>5 free coins</strong> once, on us!
            </p>
          </div>
          <Button
            size="sm"
            variant={claimed ? "outline" : "default"}
            className={cn("flex-shrink-0 gap-1.5 h-8 text-xs min-w-[80px]", claimed && "text-muted-foreground")}
            disabled={claimed || status === "loading" || hasClaimed === null}
            onClick={handleClaim}
          >
            {status === "loading" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : claimed ? (
              <><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Claimed</>
            ) : (
              <><Coins className="w-3.5 h-3.5" /> Claim</>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function VerifyBanner({ reference, onDone }: { reference: string; onDone: () => void }) {
  const { toast } = useToast();
  const notified = useRef(false);
  const { data, isLoading, isError } = useVerifyCoinPurchase(reference, {
    query: { enabled: !!reference, retry: false, queryKey: getVerifyCoinPurchaseQueryKey(reference) },
  });

  useEffect(() => {
    if (notified.current) return;
    if (isLoading) return;
    notified.current = true;

    if (data?.status === "success") {
      queryClient.invalidateQueries({ queryKey: getGetWalletBalanceQueryKey() });
      toast({ title: "Payment successful! 🎉", description: `Your coins have been credited. New balance: ${data.coinBalance}.` });
    } else if (data?.status === "failed") {
      toast({ title: "Payment failed", description: "Your payment could not be verified. No coins were credited.", variant: "destructive" });
    } else if (data) {
      toast({ title: "Payment pending", description: "We're still waiting for confirmation. Check your history shortly." });
    } else if (isError) {
      toast({ title: "Couldn't verify payment", description: "Please check your wallet history or try again.", variant: "destructive" });
    }
    onDone();
  }, [isLoading, data, isError]);

  return (
    <Card className="mb-4 border-primary/30 bg-primary/5">
      <CardContent className="p-4 flex items-center gap-3">
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-primary flex-shrink-0" />
            <p className="text-sm">Verifying your payment with Paystack…</p>
          </>
        ) : data?.status === "success" ? (
          <>
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-sm">Payment verified — coins credited to your wallet.</p>
          </>
        ) : (
          <>
            <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="text-sm">We couldn't confirm this payment.</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Shown whenever a top-up was started but never confirmed on this page —
 * whether because the user is mid bank-transfer in their banking app, the
 * browser reloaded, or Paystack's hosted checkout page failed to reopen.
 * Verification is user-initiated via "I've Sent the Money" (never automatic
 * polling), backed by the same server-side reference check used everywhere
 * else, plus the webhook as a silent backstop if they never come back at all.
 */
function PendingTopUpBanner({ payment, onResolved }: { payment: PendingTopUp; onResolved: (status: "success" | "failed") => void }) {
  const { toast } = useToast();
  const [checking, setChecking] = useState(false);
  const [lastCheckedPending, setLastCheckedPending] = useState(false);

  const handleCheck = async () => {
    setChecking(true);
    setLastCheckedPending(false);
    try {
      const res = await fetch(`${basePath}/api/wallet/paystack/verify/${encodeURIComponent(payment.reference)}`);
      const body = await res.json() as { status?: "success" | "failed" | "pending"; coinBalance?: number | null; error?: string };

      if (!res.ok) {
        toast({ title: "Couldn't check payment", description: body.error ?? "Please try again in a moment.", variant: "destructive" });
        return;
      }

      if (body.status === "success") {
        if (typeof body.coinBalance === "number") {
          queryClient.setQueryData(getGetWalletBalanceQueryKey(), { coinBalance: body.coinBalance });
        }
        queryClient.invalidateQueries({ queryKey: getGetWalletBalanceQueryKey() });
        toast({ title: "Payment confirmed! 🎉", description: `${payment.coins} coins have been credited to your wallet.` });
        onResolved("success");
      } else if (body.status === "failed") {
        toast({ title: "Payment failed", description: "Paystack couldn't confirm this payment. No coins were credited.", variant: "destructive" });
        onResolved("failed");
      } else {
        setLastCheckedPending(true);
        toast({ title: "Still verifying", description: "Paystack hasn't confirmed this payment yet. If you've sent the money, this can take a minute — try again shortly." });
      }
    } catch {
      toast({ title: "Connection error", description: "Please check your connection and try again.", variant: "destructive" });
    } finally {
      setChecking(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Banknote className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">Payment in progress</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {payment.coins} coins for ₦{payment.amountNaira.toLocaleString()} — reference {payment.reference}
              </p>
              {lastCheckedPending && (
                <p className="text-xs text-blue-500 mt-1">Still waiting for Paystack to confirm — this updates automatically once it does.</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 gap-1.5" disabled={checking} onClick={handleCheck}>
              {checking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              I've Sent the Money
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground"
              disabled={checking}
              onClick={() => onResolved("failed")}
            >
              Dismiss
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Wallet() {
  const { toast } = useToast();
  const { user } = useUser();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const reference = new URLSearchParams(search).get("reference");
  const [verifyingRef, setVerifyingRef] = useState<string | null>(reference);
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const [pendingTopUp, setPendingTopUp] = useState<PendingTopUp | null>(null);

  // Restore any payment left in progress — e.g. the user picked bank
  // transfer, switched to their banking app, and the browser reloaded (or
  // Paystack's hosted page failed to reopen) before they could return here
  // via the normal redirect. We never treat this as a cancelled purchase.
  useEffect(() => {
    if (reference) return; // the redirect-callback path below already covers this reference
    const stored = loadPendingTopUp(user?.id);
    if (stored) setPendingTopUp(stored);
  }, [user?.id, reference]);

  const { data: packages, isLoading: loadingPackages } = useListCoinPackages();
  const { data: balance } = useGetWalletBalance();
  const { data: config } = useGetWalletConfig();
  const initialize = useInitializeCoinPurchase();

  const handleBuy = (packageId: string) => {
    if (!config?.paystackConfigured) {
      toast({ title: "Payments not available yet", description: "Coin purchases will open once payments are configured.", variant: "destructive" });
      return;
    }
    const pkg = packages?.find((p) => p.id === packageId);
    setBuyingId(packageId);
    const returnUrl = `${window.location.origin}${basePath}/wallet`;
    // Always request a brand-new Paystack transaction — never reuse a
    // previous authorization_url, which Paystack invalidates once opened.
    initialize.mutate({ data: { packageId: packageId as any, returnUrl } }, {
      onSuccess: (res) => {
        if (pkg) {
          const payment: PendingTopUp = {
            reference: res.reference,
            packageId,
            coins: pkg.coins,
            amountNaira: pkg.priceNaira,
            createdAt: Date.now(),
          };
          // Persisted *before* navigating away, so a reload or app-switch
          // during bank transfer can restore this exact pending payment.
          savePendingTopUp(user?.id, payment);
          setPendingTopUp(payment);
        }
        window.location.href = res.authorizationUrl;
      },
      onError: (err: any) => {
        setBuyingId(null);
        toast({ title: "Couldn't start payment", description: err?.body?.error || "Please try again.", variant: "destructive" });
      },
    });
  };

  return (
    <div className="p-4 pb-8">
      <Link href="/account">
        <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground h-8">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
        </Button>
      </Link>

      {verifyingRef && (
        <VerifyBanner
          reference={verifyingRef}
          onDone={() => {
            clearPendingTopUp(user?.id);
            setPendingTopUp(null);
            setVerifyingRef(null);
            setLocation("/wallet", { replace: true });
          }}
        />
      )}

      {!verifyingRef && pendingTopUp && (
        <PendingTopUpBanner
          payment={pendingTopUp}
          onResolved={() => {
            clearPendingTopUp(user?.id);
            setPendingTopUp(null);
          }}
        />
      )}

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-500" /> Coin Wallet
          </h1>
          <p className="text-muted-foreground text-xs mt-0.5">Buy coins to unlock premium courses and features.</p>
        </div>
        <Link href="/wallet/history">
          <Button variant="outline" size="sm" className="gap-1.5">
            <History className="w-3.5 h-3.5" /> History
          </Button>
        </Link>
      </div>

      <Card className="mb-5 border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
            <Coins className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Current Balance</p>
            <p className="text-xl font-bold font-mono text-yellow-500">{balance?.coinBalance ?? 0} coins</p>
          </div>
        </CardContent>
      </Card>

      <FirstPrizeBanner />

      {config && !config.paystackConfigured && (
        <Card className="mb-4 border-orange-500/30 bg-orange-500/5">
          <CardContent className="p-3 text-xs text-orange-500">
            Payments aren't fully set up yet. You'll be able to buy coins once Paystack is connected.
          </CardContent>
        </Card>
      )}

      {loadingPackages ? (
        <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {packages?.map((pkg, i) => {
            const popular = i === Math.floor((packages.length - 1) / 2);
            return (
              <motion.div key={pkg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card className={cn("relative overflow-hidden h-full", popular && "border-primary/50 shadow-md")}>
                  {popular && (
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground gap-1 text-[10px]">
                      <Sparkles className="w-2.5 h-2.5" /> Popular
                    </Badge>
                  )}
                  <CardContent className="p-4 flex flex-col items-center text-center h-full">
                    <Coins className="w-7 h-7 text-yellow-500 mb-2" />
                    <p className="text-lg font-bold font-mono">{pkg.coins} coins</p>
                    <p className="text-sm text-muted-foreground mb-3">₦{pkg.priceNaira.toLocaleString()}</p>
                    <Button
                      size="sm"
                      className="w-full mt-auto"
                      disabled={initialize.isPending && buyingId === pkg.id}
                      onClick={() => handleBuy(pkg.id)}
                    >
                      {initialize.isPending && buyingId === pkg.id
                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        : "Buy Now"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
