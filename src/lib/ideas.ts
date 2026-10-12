import { getCollection, type CollectionEntry } from 'astro:content';

export type Idea = CollectionEntry<'ideas'>;

export const TOPICS = ['Engineering', 'Security', 'Adoption', 'Africa & tech', 'Building'] as const;

// Every essay and note, newest first.
// Drafts (placeholders) show while you work locally, never on the live site.
export async function getIdeas(): Promise<Idea[]> {
    const ideas = await getCollection('ideas', ({ data }) => import.meta.env.DEV || !data.draft);
    return ideas.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// Minutes to read, at about 220 words a minute. Never less than 1.
export function readingTime(idea: Idea): number {
    const words = (idea.body ?? '').trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
}

// Groups ideas by year, newest year first: [[2026, [...]], [2025, [...]]]
export function groupByYear(ideas: Idea[]): [number, Idea[]][] {
    const groups = new Map<number, Idea[]>();
    for (const idea of ideas) {
        const year = idea.data.date.getFullYear();
        if (!groups.has(year)) groups.set(year, []);
        groups.get(year)!.push(idea);
    }
    return [...groups.entries()];
}

// "12 Oct" and "12 October 2026"
export const shortDate = (d: Date) => d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
export const longDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });