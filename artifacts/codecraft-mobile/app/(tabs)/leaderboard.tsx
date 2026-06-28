import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useGetLeaderboard } from "@workspace/api-client-react";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function LeaderboardScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { data: entries, isLoading } = useGetLeaderboard({ limit: 20 });
  const isWeb = Platform.OS === "web";
  const styles = makeStyles(colors);

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: isWeb ? 67 : insets.top + 16 }]}>
        <Text style={styles.headerLabel}>CodeCraft</Text>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <Text style={styles.headerSub}>Top coders this month</Text>
      </View>

      <FlatList
        data={entries ?? []}
        keyExtractor={(item) => item.userId}
        scrollEnabled={!!(entries?.length)}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: isWeb ? 100 : insets.bottom + 80 },
        ]}
        renderItem={({ item, index }) => (
          <View style={[styles.row, index === 0 && styles.rowFirst]}>
            <View style={styles.rankCol}>
              {index < 3 ? (
                <Text style={styles.medal}>{MEDALS[index]}</Text>
              ) : (
                <Text style={styles.rankNum}>#{item.rank}</Text>
              )}
            </View>
            <View style={[styles.avatar, { backgroundColor: colors.primary + "33" }]}>
              <Text style={[styles.avatarText, { color: colors.primary }]}>
                {item.displayName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.nameCol}>
              <Text style={styles.name} numberOfLines={1}>{item.displayName}</Text>
              <Text style={styles.stats}>
                {item.completedCourses} courses · {item.quizzesPassed} quizzes
              </Text>
            </View>
            <View style={[styles.xpBadge, { backgroundColor: colors.primary + "22" }]}>
              <Text style={[styles.xpText, { color: colors.primary }]}>{item.xp.toLocaleString()} XP</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🏆</Text>
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No rankings yet.{"\n"}Be the first to complete a course!
            </Text>
          </View>
        }
      />
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { flex: 1 },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    header: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.primary, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 },
    headerTitle: { fontFamily: "Inter_700Bold", fontSize: 28, color: colors.foreground, marginBottom: 4 },
    headerSub: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.mutedForeground },
    list: { padding: 16, gap: 8 },
    row: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 12,
    },
    rowFirst: {
      borderColor: "#ffd700",
      borderWidth: 1.5,
      backgroundColor: "#ffd70011",
    },
    rankCol: { width: 32, alignItems: "center" },
    medal: { fontSize: 22 },
    rankNum: { fontFamily: "Inter_700Bold", fontSize: 16, color: colors.mutedForeground },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: { fontFamily: "Inter_700Bold", fontSize: 18 },
    nameCol: { flex: 1 },
    name: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: colors.foreground },
    stats: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.mutedForeground },
    xpBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
    xpText: { fontFamily: "Inter_700Bold", fontSize: 12 },
    empty: { alignItems: "center", paddingTop: 60 },
    emptyIcon: { fontSize: 48, marginBottom: 16 },
    emptyText: { fontFamily: "Inter_400Regular", fontSize: 16, textAlign: "center", lineHeight: 24 },
  });
}
