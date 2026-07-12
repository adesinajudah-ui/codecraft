import { useUser, useClerk } from "@clerk/react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useGetMyUsername, useGetWalletBalance } from "@workspace/api-client-react";
import { Coins, Calendar, AtSign, Mail, Settings, LogOut, Pencil, Wallet, History, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Account() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { data: usernameData } = useGetMyUsername();
  const { data: balance, isLoading: isLoadingBalance } = useGetWalletBalance();

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "—";

  return (
    <div className="p-4 pb-8">
      <div className="mb-5">
        <h1 className="text-xl font-bold font-mono tracking-tight">Account</h1>
        <p className="text-muted-foreground text-xs mt-0.5">Your profile, coin wallet, and account settings.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="mb-4 border-primary/20 overflow-hidden">
          <div className="h-16 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5" />
          <CardContent className="pb-4 px-4">
            <div className="flex items-end gap-3 -mt-8 mb-4">
              <Avatar className="w-16 h-16 border-4 border-background shadow-xl flex-shrink-0">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback className="bg-primary/20 text-primary font-bold text-xl">
                  {user?.firstName?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 pb-1">
                <h2 className="text-base font-bold truncate">{user?.fullName || "Developer"}</h2>
                {usernameData?.username && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <AtSign className="w-3 h-3" />{usernameData.username}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{user?.primaryEmailAddress?.emailAddress}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Member since {memberSince}</span>
              </div>
            </div>

            <Link href="/settings">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Pencil className="w-3.5 h-3.5" /> Edit Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      {/* Coin wallet */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="mb-4 border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Coin Balance</p>
                  {isLoadingBalance ? (
                    <Loader2 className="w-4 h-4 animate-spin text-yellow-500 mt-0.5" />
                  ) : (
                    <p className="text-xl font-bold font-mono text-yellow-500">{balance?.coinBalance ?? 0}</p>
                  )}
                </div>
              </div>
              <Badge variant="outline" className="border-yellow-500/40 text-yellow-500">Coins</Badge>
            </div>
            <div className="flex gap-2">
              <Link href="/wallet" className="flex-1">
                <Button size="sm" className="w-full gap-1.5 bg-yellow-600 hover:bg-yellow-700 text-white">
                  <Wallet className="w-3.5 h-3.5" /> Buy Coins
                </Button>
              </Link>
              <Link href="/wallet/history" className="flex-1">
                <Button size="sm" variant="outline" className="w-full gap-1.5">
                  <History className="w-3.5 h-3.5" /> History
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick links */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-2">
        <Link href="/settings">
          <Card className="hover:bg-secondary/50 transition-colors cursor-pointer">
            <CardContent className="p-3 flex items-center gap-3">
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium flex-1">Settings</span>
            </CardContent>
          </Card>
        </Link>
        <Card className="hover:bg-destructive/5 transition-colors cursor-pointer border-destructive/20" onClick={() => signOut()}>
          <CardContent className="p-3 flex items-center gap-3">
            <LogOut className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium flex-1 text-destructive">Log Out</span>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
