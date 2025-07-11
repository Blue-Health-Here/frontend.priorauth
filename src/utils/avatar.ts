/**
 * utils/avatar.ts
 */

/* --- public API -------------------------------------------------------- */
export interface AvatarInfo {
    initials: string;
    bgColor: string;
    textColor: '#000' | '#FFF';
}

/**
 * Example
 *   getAvatarInfo('Razan Ahmad')
 *   ➜ { initials: 'RA', bgColor: '#2CC5B5', textColor: '#FFF' }
 */
export function getAvatarInfo(fullName: string): AvatarInfo {
    const initials = getInitials(fullName);
    const hue = stableHash(fullName) % 360;     // 0‑359° on the color wheel
    const bgColor = hsl(hue, 65, 45);           // vivid but not too bright/dark
    const textColor = isLight(bgColor) ? '#000' : '#FFF';
    return { initials, bgColor, textColor };
}

/* --- helpers ----------------------------------------------------------- */

// “Jaden Christopher-Sy”  →  “JC”
function getInitials(name: string): string {
    return (name.match(/\b\p{L}/gu) || [])          // first letter of every word
        .slice(0, 2)                                  // keep at most two
        .join('')
        .toUpperCase();
}

// Very small, fast, deterministic hash
function stableHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) >>> 0; // unsigned 32‑bit int
    }
    return hash;
}

// Build an HSL color string
function hsl(h: number, s: number, l: number) {
    return `hsl(${h}deg ${s}% ${l}%)`;
}

// Perceived lightness check (WCAG suggestion using relative luminance)
function isLight(hslColor: string): boolean {
    const [h, s, l] = hslColor
        .match(/[\d.]+/g)!
        .map(Number);                                     // h, s, l in %
    // Convert to RGB (formula simplified for performance)
    const a = s * Math.min(l, 100 - l) / 10000;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const c = l / 100 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return c;
    };
    const [r, g, b] = [f(0), f(8), f(4)];
    // luminance threshold 0.5 → tweak for your UI if needed
    return 0.299 * r + 0.587 * g + 0.114 * b > 0.5;
}

