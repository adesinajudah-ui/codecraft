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
import { useGetCourse } from "@workspace/api-client-react";

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isWeb = Platform.OS === "web";

  const { data: course, isLoading } = useGetCourse(parseInt(id ?? "0"));
  const styles = makeStyles(colors);

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (!course) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.mutedForeground, fontFamily: "Inter_400Regular" }}>Course not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.courseHeader}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseDesc}>{course.description}</Text>
        <View style={styles.metaRow}>
          <View style={[styles.pill, { backgroundColor: colors.primary + "22" }]}>
            <Text style={[styles.pillText, { color: colors.primary }]}>⚡ {course.xpReward} XP</Text>
          </View>
          <View style={[styles.pill, { backgroundColor: colors.secondary }]}>
            <Text style={[styles.pillText, { color: colors.mutedForeground }]}>📖 {course.lessons.length} lessons</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={course.lessons}
        keyExtractor={(item) => String(item.id)}
        scrollEnabled={!!course.lessons.length}
        contentContainerStyle={[styles.list, { paddingBottom: isWeb ? 100 : insets.bottom + 40 }]}
        renderItem={({ item, index }) => (
          <Pressable
            style={({ pressed }) => [styles.lessonCard, { opacity: pressed ? 0.85 : 1 }]}
            onPress={() => router.push(`/lesson/${item.id}`)}
          >
            <View style={[styles.lessonNum, { backgroundColor: colors.primary + "22" }]}>
              <Text style={[styles.lessonNumText, { color: colors.primary }]}>{index + 1}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.lessonTitle}>{item.title}</Text>
              <Text style={styles.lessonXp}>+{item.xpReward} XP</Text>
            </View>
            <Text style={[styles.chevron, { color: colors.mutedForeground }]}>›</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { flex: 1 },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    courseHeader: { padding: 20, borderBottomWidth: 1, borderBottomColor: colors.border },
    courseTitle: { fontFamily: "Inter_700Bold", fontSize: 24, color: colors.foreground, marginBottom: 8 },
    courseDesc: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.mutedForeground, lineHeight: 20, marginBottom: 12 },
    metaRow: { flexDirection: "row", gap: 8 },
    pill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    pillText: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
    list: { padding: 16, gap: 10 },
    lessonCard: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: colors.border, gap: 12 },
    lessonNum: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
    lessonNumText: { fontFamily: "Inter_700Bold", fontSize: 15 },
    lessonTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: colors.foreground, marginBottom: 2 },
    lessonXp: { fontFamily: "Inter_400Regular", fontSize: 12, color: colors.mutedForeground },
    chevron: { fontFamily: "Inter_700Bold", fontSize: 22 },
  });
}
