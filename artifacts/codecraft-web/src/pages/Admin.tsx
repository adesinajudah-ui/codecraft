import { useGetAdminStats, useListAdminUsers, getGetAdminStatsQueryKey, getListAdminUsersQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Users, Activity, Target, ShieldAlert, Loader2 } from "lucide-react";

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
          <p className="text-muted-foreground text-xs">System stats and user management.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
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

      <Card className="mb-4">
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
    </div>
  );
}
