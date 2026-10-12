import { execSync } from 'node:child_process';

export const now = [
    { label: 'Building', text: 'A.D.O.P.T.' },
    { label: 'Learning', text: 'Cybersecurity' },
    { label: 'Reading', text: 'Sell Like Crazy — Sabri Suby' },
];

// The month this file was last committed to Git, e.g. "October 2026"
function lastUpdated(file: string): string {
    try {
        const iso = execSync(`git log -1 --format=%cI -- "${file}"`).toString().trim();
        if (iso) return new Date(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    } catch {}
    return '';
}

export const nowUpdated = lastUpdated('src/pages/about/data/now.data.ts');