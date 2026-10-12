import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'work'>;
export type TileSize = 'featured' | 'tall' | 'wide' | 'small';

const WALL_SIZE = 7;
const MAX_PINS = 3;

// The shape of each spot on the wall, in order. Together they fill 12 × 6.
// Spot 2 ('tall') is reserved for a mobile app
const WALL_SHAPES: TileSize[] = ['featured', 'tall', 'small', 'small', 'wide', 'small', 'small'];

// Every project, newest first.
// Drafts (placeholders) show while you work locally, never on the live site.
export async function getProjects(): Promise<Project[]> {
    const projects = await getCollection('work', ({ data }) => import.meta.env.DEV || !data.draft);
    return projects.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// Splits projects into the wall (7 spots) and the archive (everything else)
export async function getWall() {
    const all = await getProjects();
    const pinned = all.filter((p) => p.data.pinned);
    // Real projects always come before placeholders, so a placeholder
    // can never push a real project off the wall
    const unpinned = [
        ...all.filter((p) => !p.data.pinned && !p.data.draft),
        ...all.filter((p) => !p.data.pinned && p.data.draft),
    ];

    if (pinned.length > MAX_PINS) {
        throw new Error(
        `Only ${MAX_PINS} projects can be pinned. You have ${pinned.length}: ${pinned
            .map((p) => p.id)
            .join(', ')}`
        );
    }

    // Spot 2 (the tall one) always holds a mobile app:
    // a pinned app if there is one, otherwise the newest app
    const app =
        pinned.find((p) => p.data.platform === 'app') ??
        unpinned.find((p) => p.data.platform === 'app');

    const others = [...pinned, ...unpinned].filter((p) => p !== app);
    const pinnedOthers = others.filter((p) => p.data.pinned);
    const unpinnedOthers = others.filter((p) => !p.data.pinned);

    const spotsLeft = WALL_SIZE - pinnedOthers.length - (app ? 1 : 0);
    const rest = [...pinnedOthers, ...unpinnedOthers.slice(0, spotsLeft)];

    // Featured first, then the app, then everything else
    const onWall = app ? [rest[0], app, ...rest.slice(1)].filter(Boolean) : rest;
    // Placeholders never go to the archive
    const archive = unpinnedOthers.slice(spotsLeft).filter((p) => !p.data.draft);

    return {
        all,
        wall: onWall.map((project, i) => ({ project, size: WALL_SHAPES[i] })),
        archive,
    };
}