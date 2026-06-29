import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useListLanguages, useGetQuizByCourse, useListCoursesByLanguage, getListCoursesByLanguageQueryKey, getGetQuizByCourseQueryKey } from "@workspace/api-client-react";

export default function QuizScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { data: languages, isLoading } = useListLanguages();
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const isWeb = Platform.OS === "web";
  const styles = makeStyles(colors);

  const { data: courses } = useListCoursesByLanguage(
    selectedLang ?? "",
    { query: { enabled: !!selectedLang, queryKey: getListCoursesByLanguageQueryKey(selectedLang ?? "") } }
  );
  const { data: quiz, isLoading: quizLoading } = useGetQuizByCourse(
    selectedCourseId ?? 0,
    { query: { enabled: !!selectedCourseId, queryKey: getGetQuizByCourseQueryKey(selectedCourseId ?? 0) } }
  );

  function handleAnswer(idx: number) {
    if (!quiz) return;
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (currentQ + 1 >= quiz.questions.length) {
      let correct = 0;
      quiz.questions.forEach((q, i) => { if (newAnswers[i] === q.correctIndex) correct++; });
      setScore(correct);
    } else {
      setCurrentQ(currentQ + 1);
    }
  }

  function resetQuiz() {
    setQuizStarted(false);
    setCurrentQ(0);
    setAnswers([]);
    setScore(null);
    setSelectedCourseId(null);
  }

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  // Score screen
  if (score !== null && quiz) {
    const pct = Math.round((score / quiz.questions.length) * 100);
    const passed = pct >= 60;
    return (
      <View style={[styles.center, { backgroundColor: colors.background, padding: 32 }]}>
        <Text style={[styles.scoreEmoji]}>{passed ? "🏆" : "📚"}</Text>
        <Text style={[styles.scoreTitle, { color: passed ? colors.success : colors.mutedForeground }]}>
          {passed ? "Passed!" : "Keep Practicing"}
        </Text>
        <Text style={styles.scorePct}>{pct}%</Text>
        <Text style={styles.scoreSub}>
          {score} / {quiz.questions.length} correct
        </Text>
        <Pressable style={[styles.btn, { backgroundColor: colors.primary, marginTop: 32 }]} onPress={resetQuiz}>
          <Text style={[styles.btnText, { color: colors.primaryForeground }]}>Try Another Quiz</Text>
        </Pressable>
      </View>
    );
  }

  // Active quiz
  if (quizStarted && quiz) {
    const q = quiz.questions[currentQ];
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.quizHeader, { paddingTop: isWeb ? 67 : insets.top + 16 }]}>
          <Text style={styles.quizProgress}>Question {currentQ + 1} / {quiz.questions.length}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${((currentQ) / quiz.questions.length) * 100}%`, backgroundColor: colors.primary }]} />
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.quizBody}>
          <Text style={styles.question}>{q.question}</Text>
          {q.options.map((opt, idx) => (
            <Pressable
              key={idx}
              style={({ pressed }) => [styles.option, { opacity: pressed ? 0.8 : 1, backgroundColor: pressed ? colors.primary + "22" : colors.card }]}
              onPress={() => handleAnswer(idx)}
            >
              <View style={[styles.optionBadge, { backgroundColor: colors.secondary }]}>
                <Text style={[styles.optionLetter, { color: colors.mutedForeground }]}>{String.fromCharCode(65 + idx)}</Text>
              </View>
              <Text style={styles.optionText}>{opt}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: isWeb ? 67 : insets.top + 16 }]}>
        <Text style={styles.headerLabel}>CodeCraft</Text>
        <Text style={styles.headerTitle}>Quick Quiz</Text>
        <Text style={styles.headerSub}>Test your knowledge</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: isWeb ? 100 : insets.bottom + 80 }}>
        <Text style={styles.sectionTitle}>Pick a Language</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.langRow}>
          {(languages ?? []).map((l) => (
            <Pressable
              key={l.id}
              style={[styles.langChip, selectedLang === l.slug && { backgroundColor: colors.primary }]}
              onPress={() => { setSelectedLang(l.slug); setSelectedCourseId(null); }}
            >
              <Text style={[styles.langChipText, selectedLang === l.slug && { color: colors.primaryForeground }]}>{l.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {selectedLang && (
          <>
            <Text style={styles.sectionTitle}>Pick a Course</Text>
            {(courses ?? []).map((c) => (
              <Pressable
                key={c.id}
                style={[styles.courseCard, selectedCourseId === c.id && { borderColor: colors.primary }]}
                onPress={() => setSelectedCourseId(c.id)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.courseTitle}>{c.title}</Text>
                  <Text style={styles.courseLevel}>{c.level}</Text>
                </View>
                {selectedCourseId === c.id && (
                  <View style={[styles.checkBadge, { backgroundColor: colors.primary }]}>
                    <Text style={{ color: colors.primaryForeground, fontSize: 12 }}>✓</Text>
                  </View>
                )}
              </Pressable>
            ))}
          </>
        )}

        {selectedCourseId && (
          <View style={{ padding: 20 }}>
            {quizLoading ? (
              <ActivityIndicator color={colors.primary} />
            ) : quiz ? (
              <Pressable
                style={[styles.btn, { backgroundColor: colors.primary }]}
                onPress={() => setQuizStarted(true)}
              >
                <Text style={[styles.btnText, { color: colors.primaryForeground }]}>
                  Start Quiz · {quiz.questions.length} Questions
                </Text>
              </Pressable>
            ) : (
              <Text style={{ color: colors.mutedForeground, textAlign: "center", fontFamily: "Inter_400Regular" }}>
                No quiz available for this course yet
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { flex: 1 },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    header: { paddingHorizontal: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: colors.border },
    headerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.primary, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 },
    headerTitle: { fontFamily: "Inter_700Bold", fontSize: 28, color: colors.foreground, marginBottom: 4 },
    headerSub: { fontFamily: "Inter_400Regular", fontSize: 14, color: colors.mutedForeground },
    sectionTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: colors.mutedForeground, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, textTransform: "uppercase", letterSpacing: 1 },
    langRow: { paddingHorizontal: 16, gap: 8 },
    langChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: colors.secondary, borderWidth: 1, borderColor: colors.border },
    langChipText: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.foreground },
    courseCard: { marginHorizontal: 20, marginBottom: 10, backgroundColor: colors.card, borderRadius: 12, padding: 16, borderWidth: 1.5, borderColor: colors.border, flexDirection: "row", alignItems: "center" },
    courseTitle: { fontFamily: "Inter_600SemiBold", fontSize: 16, color: colors.foreground, marginBottom: 4 },
    courseLevel: { fontFamily: "Inter_400Regular", fontSize: 13, color: colors.mutedForeground, textTransform: "capitalize" },
    checkBadge: { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" },
    btn: { borderRadius: 12, paddingVertical: 16, alignItems: "center" },
    btnText: { fontFamily: "Inter_700Bold", fontSize: 16 },
    quizHeader: { paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
    quizProgress: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.mutedForeground, marginBottom: 8 },
    progressBar: { height: 4, backgroundColor: colors.secondary, borderRadius: 2 },
    progressFill: { height: 4, borderRadius: 2 },
    quizBody: { padding: 20, gap: 12 },
    question: { fontFamily: "Inter_700Bold", fontSize: 22, color: colors.foreground, marginBottom: 16, lineHeight: 32 },
    option: { flexDirection: "row", alignItems: "center", padding: 16, borderRadius: 12, borderWidth: 1, borderColor: colors.border, gap: 12 },
    optionBadge: { width: 32, height: 32, borderRadius: 8, alignItems: "center", justifyContent: "center" },
    optionLetter: { fontFamily: "Inter_700Bold", fontSize: 14 },
    optionText: { fontFamily: "Inter_500Medium", fontSize: 16, color: colors.foreground, flex: 1 },
    scoreEmoji: { fontSize: 64, marginBottom: 16 },
    scoreTitle: { fontFamily: "Inter_700Bold", fontSize: 24, marginBottom: 8 },
    scorePct: { fontFamily: "Inter_700Bold", fontSize: 56, color: colors.primary },
    scoreSub: { fontFamily: "Inter_400Regular", fontSize: 16, color: colors.mutedForeground },
  });
}
