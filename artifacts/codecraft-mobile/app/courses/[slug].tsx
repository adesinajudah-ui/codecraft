import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useListCoursesByLanguage } from "@workspace/api-client-react";

const LEVEL_COLORS: Record<string, string> = {
  beginner: "#3fb950",
  intermediate: "#d29922",
  advanced: "#f85149",
};

export default function CoursesScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isWeb = Platform.OS === "web";

  const { data: courses, isLoading } = useListCoursesByLanguage({ slug: slug ?? "" });
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
      <FlatList
        data={courses ?? []}
        keyExtractor={(item) => String(item.id)}
        scrollEnabled={!!(courses?.length)}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: isWeb ? 100 : insets.bottom + 40 },
        ]}
        renderItem={({ item, index }) => (
          <Pressable
            style={({ pressed }) => [styles.card, { opacity: pressed ? 0.85 : 1 }]}
            onPress={() => router.push(`/course/${item.id}`)}
          >
            <View style={styles.cardTop}>
              <View style={[styles.numBadge, { backgroundColor: colors.primary + "22" }]}>
                <Text style={[styles.num, { color: colors.primary }]}>{index + 1}</Text>
              </View>
              <View style={[styles.levelBadge, { backgroundColor: LEVEL_COLORS[item.level] + "22" }]}>
                <Text style={[styles.levelText, { color: LEVEL_COLORS[item.level] }]}>{item.level}</Text>
              </View>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.mutedForeground }]}>
                📖 {item.lessonCount ?? 0} lessons
              </Text>
              <Text style={[styles.footerText, { color: colors.primary }]}>
                ⚡ {item.xpReward} XP
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={[{ color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 16 }]}>
              No courses yet for this language
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
    list: { padding: 16, gap: 12 },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
    numBadge: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
    num: { fontFamily: "Inter_700Bold", fontSize: 16 },
    levelBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    levelText: { fontFamily: "Inter_600SemiBold", fontSize: 12, textTransform: "capitalize" },
    title: { fontFamily: "Inter_700Bold", fontSize: 18, color: colors.foreground, marginBottom: 6 },
    desc: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.mutedForeground, lineHeight: 20, marginBottom: 14 },
    footer: { flexDirection: "row", gap: 16 },
    footerText: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  });
}
