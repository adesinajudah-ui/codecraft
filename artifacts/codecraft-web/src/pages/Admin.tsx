import {
  useGetAdminStats, useListAdminUsers, getGetAdminStatsQueryKey, getListAdminUsersQueryKey,
  useGetAdminWalletStats, useListAdminWalletTransactions, getListAdminWalletTransactionsQueryKey,
  useAdjustUserCoins, getGetAdminWalletStatsQueryKey,
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Users, Activity, Target, ShieldAlert, Loader2, Coins, TrendingUp, Download, Wallet as WalletIcon, PlusCircle, MinusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

const basePath = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");

function WalletAdminPanel() {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [adjustUserId, setAdjustUserId] = useState("");
  const [adjustAmount, setAdjustAmount] = useState("");
  const [adjustReason, setAdjustReason] = useState("");

  const { data: walletStats, isLoading: isLoadingWalletStats } = useGetAdminWalletStats();
  const params = { page, limit: 20, status: status === "all" ? undefined : status, search: search || undefined };
  const { data: txData, isLoading: isLoadingTx } = useListAdminWalletTransactions(params, {
    query: { queryKey: getListAdminWalletTransactionsQueryKey(params) },
  });

  const adjust = useAdjustUserCoins({
    mutation: {
      onSuccess: (res) => {
        toast({ title: "Balance adjusted", description: `New balance: ${res.coinBalance} coins.` });
        setAdjustUserId(""); setAdjustAmount(""); setAdjustReason("");
        queryClient.invalidateQueries({ queryKey: getGetAdminWalletStatsQueryKey() });
      },
      onError: (err: any) => {
        toast({ title: "Couldn't adjust balance", description: err?.body?.error || "Please check the user ID and try again.", variant: "destructive" });
      },
    },
  });

  const statusStyles: Record<string, string> = {
    success: "bg-green-500/15 text-green-500 border-green-500/30",
    pending: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
    failed: "bg-destructive/15 text-destructive border-destructive/30",
  };

  if (isLoadingWalletStats) {
    return <div className="py-10 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Total Revenue", value: `₦${(walletStats?.totalRevenueNaira ?? 0).toLocaleString()}`, icon: TrendingUp, color: "text-green-500" },
          { label: "Coins Sold", value: (walletStats?.totalCoinsSold ?? 0).toLocaleString(), icon: Coins, color: "text-yellow-500" },
          { label: "Successful", value: (walletStats?.successfulTransactions ?? 0).toLocaleString(), icon: WalletIcon, color: "text-blue-500" },
          { label: "Pending", value: (walletStats?.pendingTransactions ?? 0).toLocaleString(), icon: Loader2, color: "text-orange-500" },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-3">
              <stat.icon className={`w-4 h-4 ${stat.color} mb-1.5`} />
              <p className="text-lg font-bold font-mono leading-tight truncate">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3 px-4 pt-4">
          <CardTitle className="text-sm flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-primary" /> Manual Coin Adjustment
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">User ID (Clerk)</Label>
              <Input value={adjustUserId} onChange={(e) => setAdjustUserId(e.target.value)} placeholder="user_..." className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Amount (+credit / -debit)</Label>
              <Input value={adjustAmount} onChange={(e) => setAdjustAmount(e.target.value)} placeholder="e.g. 10 or -5" type="number" className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Reason</Label>
              <Input value={adjustReason} onChange={(e) => setAdjustReason(e.target.value)} placeholder="e.g. Support refund" className="h-9 text-sm" />
            </div>
          </div>
          <Button
            size="sm"
            className="gap-1.5"
            disabled={adjust.isPending || !adjustUserId.trim() || !adjustAmount || !adjustReason.trim()}
            onClick={() => adjust.mutate({ data: { userId: adjustUserId.trim(), amount: parseInt(adjustAmount, 10), reason: adjustReason.trim() } })}
          >
            {adjust.isPending
              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
              : parseInt(adjustAmount || "0", 10) < 0 ? <MinusCircle className="w-3.5 h-3.5" /> : <PlusCircle className="w-3.5 h-3.5" />}
            Apply Adjustment
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3 px-4 pt-4">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-sm">Wallet Transactions</CardTitle>
            <a href={`${basePath}/api/admin/wallet/transactions/export`} download="wallet-transactions.csv">
              <Button size="sm" variant="outline" className="gap-1.5 h-8 text-xs">
                <Download className="w-3.5 h-3.5" /> Export CSV
              </Button>
            </a>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Search by name, email, reference..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="h-9 text-sm flex-1"
            />
            <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
              <SelectTrigger className="w-32 h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          {isLoadingTx ? (
            <div className="py-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                    <TableHead className="text-xs pl-4">User</TableHead>
                    <TableHead className="text-xs text-right">Coins</TableHead>
                    <TableHead className="text-xs text-right">Amount</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs text-right pr-4">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {txData?.transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="text-xs pl-4">
                        <div className="font-medium truncate max-w-[110px]">{tx.displayName}</div>
                        <div className="text-muted-foreground truncate max-w-[110px]">{tx.email}</div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-yellow-500 text-xs">{tx.coins}</TableCell>
                      <TableCell className="text-right font-mono text-xs">₦{tx.amountNaira.toLocaleString()}</TableCell>
                      <TableCell className="text-xs"><Badge variant="outline" className={statusStyles[tx.status] ?? ""}>{tx.status}</Badge></TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground pr-4">
                        {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                  {txData?.transactions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground text-sm">
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          {txData && txData.total > txData.limit && (
            <div className="flex items-center justify-between p-3 border-t border-border">
              <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
              <span className="text-xs text-muted-foreground">Page {page} of {Math.ceil(txData.total / txData.limit)}</span>
              <Button size="sm" variant="outline" disabled={page >= Math.ceil(txData.total / txData.limit)} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function Admin() {
  const { data: stats, isLoading: isLoadingStats } = useGetAdminStats();
  const [search, setSearch] = useState("");

  const { data: usersData, isLoading: isLoadingUsers } = useListAdminUsers({ search }, {
    query: { queryKey: getListAdminUsersQueryKey({ search }) }
  });

  if (isLoadingStats) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 pb-8">
      <div className="mb-5 flex items-center gap-3">
        <ShieldAlert className="w-6 h-6 text-destructive" />
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight">Admin Portal</h1>
          <p className="text-muted-foreground text-xs">System stats, user management, and wallet payments.</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="text-xs gap-1.5">Overview</TabsTrigger>
          <TabsTrigger value="wallet" className="text-xs gap-1.5"><Coins className="w-3.5 h-3.5" /> Wallet & Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Total Users", value: stats?.totalUsers.toLocaleString(), icon: Users, color: "text-blue-500" },
              { label: "Active Today", value: stats?.activeUsersToday.toLocaleString(), icon: Activity, color: "text-green-500" },
              { label: "Lessons Done", value: stats?.totalLessonsCompleted.toLocaleString(), icon: Target, color: "text-orange-500" },
              { label: "Top Language", value: stats?.popularLanguage || "N/A", icon: () => <span className="text-sm font-bold text-primary">#1</span>, color: "text-primary" },
            ].map(stat => (
              <Card key={stat.label}>
                <CardContent className="p-3">
                  <stat.icon className={`w-4 h-4 ${stat.color} mb-1.5`} />
                  <p className="text-lg font-bold font-mono leading-tight truncate">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-3 px-4 pt-4">
              <CardTitle className="text-sm">Language Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-3">
                {stats?.languageBreakdown.map((lang, i) => (
                  <div key={i} className="flex items-center justify-between pb-2 border-b border-border/50 last:border-0 last:pb-0">
                    <span className="font-medium text-sm">{lang.languageName}</span>
                    <div className="flex gap-4 text-xs font-mono text-muted-foreground">
                      <span>{lang.userCount} users</span>
                      <span>{lang.lessonsCompleted}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 px-4 pt-4">
              <CardTitle className="text-sm mb-2">User Directory</CardTitle>
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 text-sm"
              />
            </CardHeader>
            <CardContent className="px-0 pb-0">
              {isLoadingUsers ? (
                <div className="py-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                        <TableHead className="text-xs pl-4">User</TableHead>
                        <TableHead className="text-xs text-right">XP</TableHead>
                        <TableHead className="text-xs text-right">Lessons</TableHead>
                        <TableHead className="text-xs text-right pr-4">Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersData?.users.map((user) => (
                        <TableRow key={user.userId}>
                          <TableCell className="text-xs pl-4">
                            <div className="font-medium truncate max-w-[100px]">{user.displayName}</div>
                            <div className="text-muted-foreground truncate max-w-[100px]">{user.email}</div>
                          </TableCell>
                          <TableCell className="text-right font-mono text-primary text-xs">{user.xp}</TableCell>
                          <TableCell className="text-right font-mono text-xs">{user.lessonsCompleted}</TableCell>
                          <TableCell className="text-right text-xs text-muted-foreground pr-4">
                            {new Date(user.joinedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </TableCell>
                        </TableRow>
                      ))}
                      {usersData?.users.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center text-muted-foreground text-sm">
                            No users found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet">
          <WalletAdminPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
