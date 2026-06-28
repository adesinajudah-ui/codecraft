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
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center gap-3">
        <ShieldAlert className="w-8 h-8 text-destructive" />
        <div>
          <h1 className="text-3xl font-bold font-mono tracking-tight">Admin Portal</h1>
          <p className="text-muted-foreground">System statistics and user management.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{stats?.totalUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Today</CardTitle>
            <Activity className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{stats?.activeUsersToday.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lessons Completed</CardTitle>
            <Target className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{stats?.totalLessonsCompleted.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Language</CardTitle>
            <span className="w-4 h-4 font-bold text-primary text-center">#1</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono truncate">{stats?.popularLanguage || 'N/A'}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Language Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.languageBreakdown.map((lang, i) => (
              <div key={i} className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0">
                <span className="font-medium">{lang.languageName}</span>
                <div className="flex gap-8 text-sm font-mono text-muted-foreground">
                  <span>{lang.userCount} users</span>
                  <span>{lang.lessonsCompleted} completions</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>User Directory</CardTitle>
          <div className="w-full sm:w-72">
            <Input 
              placeholder="Search users..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingUsers ? (
            <div className="py-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>
          ) : (
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">XP</TableHead>
                    <TableHead className="text-right">Lessons</TableHead>
                    <TableHead className="text-right">Quizzes</TableHead>
                    <TableHead className="text-right text-muted-foreground">Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersData?.users.map((user) => (
                    <TableRow key={user.userId}>
                      <TableCell className="font-medium">{user.displayName}</TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell className="text-right font-mono text-primary">{user.xp}</TableCell>
                      <TableCell className="text-right font-mono">{user.lessonsCompleted}</TableCell>
                      <TableCell className="text-right font-mono">{user.quizzesPassed}</TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        {new Date(user.joinedAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  {usersData?.users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
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
