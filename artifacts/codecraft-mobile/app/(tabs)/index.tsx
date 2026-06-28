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
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useListLanguages } from "@workspace/api-client-react";

const LANG_ICONS: Record<string, string> = {
  html: "🌐",
  css: "🎨",
  javascript: "⚡",
  java: "☕",
  c: "⚙️",
  python: "🐍",
};

const LANG_COLORS: Record<string, string> = {
  html: "#e34c26",
  css: "#264de4",
  javascript: "#f7df1e",
  java: "#b07219",
  c: "#555555",
  python: "#3572a5",
};

export default function LearnScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { data: languages, isLoading } = useListLanguages();

  const styles = makeStyles(colors);
  const isWeb = Platform.OS === "web";

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          { paddingTop: isWeb ? 67 : insets.top + 16 },
        ]}
      >
        <Text style={styles.headerLabel}>CodeCraft</Text>
        <Text style={styles.headerTitle}>Choose a Language</Text>
        <Text style={styles.headerSub}>
          {languages?.length ?? 6} languages · Start your journey
        </Text>
      </View>

      <FlatList
        data={languages ?? []}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={[
          styles.grid,
          { paddingBottom: isWeb ? 100 : insets.bottom + 80 },
        ]}
        columnWrapperStyle={styles.row}
        scrollEnabled={!!languages?.length}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              { opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] },
            ]}
            onPress={() => router.push(`/courses/${item.slug}`)}
          >
            <View
              style={[
                styles.iconBadge,
                { backgroundColor: (LANG_COLORS[item.slug] ?? "#7df9ff") + "22" },
              ]}
            >
              <Text style={styles.langIcon}>{LANG_ICONS[item.slug] ?? "💻"}</Text>
            </View>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSub} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.cardFooter}>
              <View
                style={[
                  styles.pill,
                  { backgroundColor: (LANG_COLORS[item.slug] ?? "#7df9ff") + "33" },
                ]}
              >
                <Text
                  style={[
                    styles.pillText,
                    { color: LANG_COLORS[item.slug] ?? colors.primary },
                  ]}
                >
                  {item.courseCount} courses
                </Text>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No languages available yet
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
    headerLabel: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 12,
      color: colors.primary,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 4,
    },
    headerTitle: {
      fontFamily: "Inter_700Bold",
      fontSize: 28,
      color: colors.foreground,
      marginBottom: 4,
    },
    headerSub: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: colors.mutedForeground,
    },
    grid: { padding: 12 },
    row: { gap: 12 },
    card: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    iconBadge: {
      width: 48,
      height: 48,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
    },
    langIcon: { fontSize: 26 },
    cardTitle: {
      fontFamily: "Inter_700Bold",
      fontSize: 16,
      color: colors.foreground,
      marginBottom: 4,
    },
    cardSub: {
      fontFamily: "Inter_400Regular",
      fontSize: 12,
      color: colors.mutedForeground,
      lineHeight: 17,
      marginBottom: 12,
    },
    cardFooter: { flexDirection: "row" },
    pill: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
    },
    pillText: { fontFamily: "Inter_600SemiBold", fontSize: 11 },
    emptyText: { fontFamily: "Inter_400Regular", fontSize: 16 },
  });
}
