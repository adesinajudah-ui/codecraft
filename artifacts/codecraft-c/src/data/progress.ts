const STORAGE_KEY = "codecraft-c-progress";
const NAME_KEY = "codecraft-c-learner-name";

function readSet(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return new Set(arr);
    return new Set();
  } catch {
    return new Set();
  }
}

function writeSet(set: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
  } catch {
    // localStorage unavailable — progress just won't persist.
  }
}

export function isTopicComplete(topicId: string): boolean {
  return readSet().has(topicId);
}

export function markTopicComplete(topicId: string): void {
  const set = readSet();
  set.add(topicId);
  writeSet(set);
}

export function unmarkTopicComplete(topicId: string): void {
  const set = readSet();
  set.delete(topicId);
  writeSet(set);
}

export function toggleTopicComplete(topicId: string): boolean {
  const set = readSet();
  if (set.has(topicId)) {
    set.delete(topicId);
    writeSet(set);
    return false;
  }
  set.add(topicId);
  writeSet(set);
  return true;
}

export function getCompletedTopicIds(): Set<string> {
  return readSet();
}

export function getCompletedCount(): number {
  return readSet().size;
}

export function getLearnerName(): string {
  try {
    return localStorage.getItem(NAME_KEY) || "";
  } catch {
    return "";
  }
}

export function setLearnerName(name: string): void {
  try {
    localStorage.setItem(NAME_KEY, name);
  } catch {
    // ignore
  }
}
