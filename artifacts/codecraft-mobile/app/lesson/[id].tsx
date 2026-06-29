import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useGetLesson } from "@workspace/api-client-react";

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isWeb = Platform.OS === "web";
  const [completed, setCompleted] = useState(false);

  const { data: lesson, isLoading } = useGetLesson(parseInt(id ?? "0"));
  const styles = makeStyles(colors);

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (!lesson) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.mutedForeground, fontFamily: "Inter_400Regular" }}>Lesson not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[styles.scroll, { paddingBottom: isWeb ? 100 : insets.bottom + 40 }]}
    >
      <View style={styles.headerRow}>
        <View style={[styles.xpBadge, { backgroundColor: colors.primary + "22" }]}>
          <Text style={[styles.xpText, { color: colors.primary }]}>⚡ +{lesson.xpReward} XP</Text>
        </View>
        <View style={[styles.langBadge, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.langText, { color: colors.mutedForeground }]}>{lesson.language}</Text>
        </View>
      </View>

      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.content}>{lesson.content}</Text>

      {lesson.codeExample && (
        <View style={styles.codeBlock}>
          <View style={styles.codeHeader}>
            <Text style={[styles.codeHeaderText, { color: colors.mutedForeground }]}>
              {lesson.language.toUpperCase()} Example
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator>
            <Text style={styles.codeText} selectable>{lesson.codeExample}</Text>
          </ScrollView>
        </View>
      )}

      {!completed ? (
        <Pressable
          style={[styles.doneBtn, { backgroundColor: colors.primary }]}
          onPress={() => { setCompleted(true); }}
        >
          <Text style={[styles.doneBtnText, { color: colors.primaryForeground }]}>
            Mark Complete · +{lesson.xpReward} XP
          </Text>
        </Pressable>
      ) : (
        <View style={[styles.completedBanner, { backgroundColor: colors.success + "22", borderColor: colors.success }]}>
          <Text style={[styles.completedText, { color: colors.success }]}>✅ Lesson Complete!</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={[styles.backLink, { color: colors.primary }]}>← Back to Course</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    scroll: { padding: 20 },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    headerRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
    xpBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    xpText: { fontFamily: "Inter_700Bold", fontSize: 13 },
    langBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    langText: { fontFamily: "Inter_600SemiBold", fontSize: 13, textTransform: "capitalize" },
    title: { fontFamily: "Inter_700Bold", fontSize: 26, color: colors.foreground, marginBottom: 16, lineHeight: 34 },
    content: { fontFamily: "Inter_400Regular", fontSize: 16, color: colors.foreground, lineHeight: 26, marginBottom: 24 },
    codeBlock: {
      backgroundColor: "#0d1117",
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 24,
      overflow: "hidden",
    },
    codeHeader: {
      backgroundColor: colors.secondary,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    codeHeaderText: { fontFamily: "Inter_600SemiBold", fontSize: 12, letterSpacing: 1 },
    codeText: {
      fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
      fontSize: 13,
      color: "#7df9ff",
      padding: 16,
      lineHeight: 22,
    },
    doneBtn: { borderRadius: 14, paddingVertical: 18, alignItems: "center", marginTop: 8 },
    doneBtnText: { fontFamily: "Inter_700Bold", fontSize: 16 },
    completedBanner: { borderRadius: 14, padding: 20, alignItems: "center", borderWidth: 1, gap: 12 },
    completedText: { fontFamily: "Inter_700Bold", fontSize: 18 },
    backLink: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  });
}
