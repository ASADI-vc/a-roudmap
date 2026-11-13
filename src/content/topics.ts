import type { Topic } from "./types";
import { coreTopics } from "./topics-core";
import { frontendTopics } from "./topics-frontend";
import { backendTopics } from "./topics-backend";
import { aiappsTopics } from "./topics-aiapps";

export const topics: Topic[] = [...coreTopics, ...frontendTopics, ...backendTopics, ...aiappsTopics];

export const topicById = new Map(topics.map((t) => [t.id, t]));

export const branchStubs = [
  { id: "branch-mobile", fa: "موبایل (React Native / Kotlin)", en: "Mobile (React Native / Kotlin)" },
  { id: "branch-data", fa: "مهندسی داده و پایپ‌لاین‌ها", en: "Data Engineering & Pipelines" },
  { id: "branch-devops", fa: "DevOps / SRE پیشرفته", en: "Advanced DevOps / SRE" },
  { id: "branch-ml", fa: "مهندسی یادگیری ماشین", en: "ML Engineering" },
  { id: "branch-seceng", fa: "مهندسی امنیت", en: "Security Engineering" },
];
