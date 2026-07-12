// Seeds competition questions into the DB.
// Safe to run multiple times — checks first.
import { db } from "@workspace/db";
import { competitionQuestionsTable } from "@workspace/db";
import { competitionQuestions } from "./competitionQuestions.js";

export async function seedCompetitionQuestions() {
  const existing = await db.select().from(competitionQuestionsTable).limit(1);
  if (existing.length > 0) {
    console.log("Competition questions already seeded.");
    return;
  }

  console.log(`Seeding ${competitionQuestions.length} competition questions...`);

  // Insert in batches of 100 to avoid query size limits
  const BATCH = 100;
  for (let i = 0; i < competitionQuestions.length; i += BATCH) {
    const batch = competitionQuestions.slice(i, i + BATCH);
    await db.insert(competitionQuestionsTable).values(
      batch.map((q, idx) => ({
        languageSlug: q.languageSlug,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        difficulty: q.difficulty,
        questionNumber: i + idx + 1,
      }))
    );
  }

  console.log("✅ Competition questions seeded!");
  const counts = competitionQuestions.reduce<Record<string, number>>((acc, q) => {
    acc[q.languageSlug] = (acc[q.languageSlug] ?? 0) + 1;
    return acc;
  }, {});
  Object.entries(counts).forEach(([lang, count]) => {
    console.log(`   ${lang}: ${count} questions`);
  });
}
