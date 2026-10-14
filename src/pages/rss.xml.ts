import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET() {
    // Only published ideas, newest first
    const ideas = (await getCollection('ideas', ({ data }) => !data.draft))
        .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

    return rss({
            title: 'Bruce Travis — Ideas',
            description: 'Essays and notes on building, security, and technology.',
            site: 'https://brucetravis.neurorainnovations.com',
            items: ideas.map((idea) => ({
                title: idea.data.title,
                description: idea.data.subtitle,
                pubDate: idea.data.date,
                link: `/ideas/${idea.id}`,
        })),
    });
}