import { Link } from "wouter";
import { useGetMyWalletTransactions } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, History, Loader2, Coins } from "lucide-react";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    success: "bg-green-500/15 text-green-500 border-green-500/30",
    pending: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
    failed: "bg-destructive/15 text-destructive border-destructive/30",
  };
  return <Badge variant="outline" className={styles[status] ?? ""}>{status}</Badge>;
}

export default function WalletHistory() {
  const { data: transactions, isLoading } = useGetMyWalletTransactions();

  return (
    <div className="p-4 pb-8">
      <Link href="/wallet">
        <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground h-8">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
        </Button>
      </Link>

      <div className="mb-5">
        <h1 className="text-xl font-bold font-mono tracking-tight flex items-center gap-2">
          <History className="w-5 h-5 text-primary" /> Wallet History
        </h1>
        <p className="text-muted-foreground text-xs mt-0.5">All your coin purchase transactions.</p>
      </div>

      <Card>
        <CardContent className="px-0 pb-0">
          {isLoading ? (
            <div className="py-10 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                    <TableHead className="text-xs pl-4">Date</TableHead>
                    <TableHead className="text-xs text-right">Coins</TableHead>
                    <TableHead className="text-xs text-right">Amount</TableHead>
                    <TableHead className="text-xs">Reference</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs text-right pr-4">ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions?.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="text-xs pl-4 whitespace-nowrap">
                        {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                      </TableCell>
                      <TableCell className="text-right text-xs font-mono">
                        <span className="inline-flex items-center gap-1 text-yellow-500">
                          <Coins className="w-3 h-3" />{tx.coins}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-xs font-mono">₦{tx.amountNaira.toLocaleString()}</TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground truncate max-w-[140px]">{tx.paystackReference}</TableCell>
                      <TableCell className="text-xs"><StatusBadge status={tx.status} /></TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground pr-4">#{tx.id}</TableCell>
                    </TableRow>
                  ))}
                  {transactions?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground text-sm">
                        No transactions yet. <Link href="/wallet" className="text-primary underline">Buy coins</Link> to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
