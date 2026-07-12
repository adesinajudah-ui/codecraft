import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
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
import { Coins, ArrowLeft, History, Loader2, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

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

export default function Wallet() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const reference = new URLSearchParams(search).get("reference");
  const [verifyingRef, setVerifyingRef] = useState<string | null>(reference);
  const [buyingId, setBuyingId] = useState<string | null>(null);

  const { data: packages, isLoading: loadingPackages } = useListCoinPackages();
  const { data: balance } = useGetWalletBalance();
  const { data: config } = useGetWalletConfig();
  const initialize = useInitializeCoinPurchase();

  const handleBuy = (packageId: string) => {
    if (!config?.paystackConfigured) {
      toast({ title: "Payments not available yet", description: "Coin purchases will open once payments are configured.", variant: "destructive" });
      return;
    }
    setBuyingId(packageId);
    const returnUrl = `${window.location.origin}${basePath}/wallet`;
    initialize.mutate({ data: { packageId: packageId as any, returnUrl } }, {
      onSuccess: (res) => {
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
            setVerifyingRef(null);
            setLocation("/wallet", { replace: true });
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
