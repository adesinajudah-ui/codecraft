import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const styles = makeStyles(colors);

  const stats = [
    { label: "XP Earned", value: "0", icon: "⚡" },
    { label: "Lessons Done", value: "0", icon: "📖" },
    { label: "Quizzes Passed", value: "0", icon: "✅" },
    { label: "Day Streak", value: "1", icon: "🔥" },
  ];

  const achievements = [
    { title: "First Lesson", desc: "Complete your first lesson", earned: false, icon: "🎯" },
    { title: "Quiz Master", desc: "Pass 5 quizzes", earned: false, icon: "🧠" },
    { title: "Speed Coder", desc: "Complete a lesson in < 5 min", earned: false, icon: "⚡" },
    { title: "Polyglot", desc: "Learn 3 languages", earned: false, icon: "🌐" },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.scroll,
        { paddingTop: isWeb ? 67 : insets.top + 16, paddingBottom: isWeb ? 100 : insets.bottom + 80 },
      ]}
    >
      <View style={styles.profileCard}>
        <View style={[styles.avatar, { backgroundColor: colors.primary + "33" }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>?</Text>
        </View>
        <Text style={styles.name}>Guest User</Text>
        <Text style={styles.tagline}>Sign in to track your progress</Text>
        <Pressable style={[styles.signInBtn, { backgroundColor: colors.primary }]}>
          <Text style={[styles.signInText, { color: colors.primaryForeground }]}>Sign In</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Your Stats</Text>
      <View style={styles.statsGrid}>
        {stats.map((s) => (
          <View key={s.label} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.statIcon}>{s.icon}</Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>{s.value}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Achievements</Text>
      <View style={styles.achievementsList}>
        {achievements.map((a) => (
          <View key={a.title} style={[styles.achievementCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: a.earned ? 1 : 0.5 }]}>
            <Text style={styles.achieveIcon}>{a.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.achieveTitle, { color: colors.foreground }]}>{a.title}</Text>
              <Text style={[styles.achieveDesc, { color: colors.mutedForeground }]}>{a.desc}</Text>
            </View>
            {a.earned && (
              <View style={[styles.earnedBadge, { backgroundColor: colors.success + "33" }]}>
                <Text style={[{ color: colors.success, fontFamily: "Inter_600SemiBold", fontSize: 11 }]}>Earned</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    scroll: { padding: 20 },
    profileCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 24,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 24,
    },
    avatar: { width: 72, height: 72, borderRadius: 36, alignItems: "center", justifyContent: "center", marginBottom: 12 },
    avatarText: { fontFamily: "Inter_700Bold", fontSize: 32 },
    name: { fontFamily: "Inter_700Bold", fontSize: 22, color: colors.foreground, marginBottom: 4 },
    tagline: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.mutedForeground, marginBottom: 16 },
    signInBtn: { paddingHorizontal: 32, paddingVertical: 12, borderRadius: 24 },
    signInText: { fontFamily: "Inter_700Bold", fontSize: 15 },
    sectionTitle: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.mutedForeground, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 },
    statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 28 },
    statCard: { flex: 1, minWidth: 140, borderRadius: 14, padding: 16, alignItems: "center", borderWidth: 1 },
    statIcon: { fontSize: 24, marginBottom: 8 },
    statValue: { fontFamily: "Inter_700Bold", fontSize: 28, marginBottom: 4 },
    statLabel: { fontFamily: "Inter_500Medium", fontSize: 12, textAlign: "center" },
    achievementsList: { gap: 10 },
    achievementCard: { flexDirection: "row", alignItems: "center", borderRadius: 14, padding: 14, borderWidth: 1, gap: 12 },
    achieveIcon: { fontSize: 28 },
    achieveTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15, marginBottom: 2 },
    achieveDesc: { fontFamily: "Inter_400Regular", fontSize: 13 },
    earnedBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  });
}
