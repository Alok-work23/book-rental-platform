import React from 'react';

interface AvatarProps {
  name: string;
  className?: string; // Tailwind size classes e.g. w-12 h-12
  title?: string;
}

function getInitials(fullName: string): string {
  if (!fullName) return 'U';
  const safe = fullName.trim();
  if (!safe) return 'U';
  // If it's an email, use first two letters of the username part
  if (safe.includes('@')) {
    const handle = safe.split('@')[0];
    const letters = handle.replace(/[^a-zA-Z]/g, '').slice(0, 2);
    return letters.toUpperCase() || 'U';
  }
  const parts = safe.split(/\s+/);
  const first = parts[0]?.[0] || '';
  const second = parts.length > 1 ? parts[parts.length - 1][0] : '';
  const initials = `${first}${second}` || safe[0];
  return initials.toUpperCase();
}

function colorFromName(name: string): string {
  const palette = [
    'bg-blue-600',
    'bg-cyan-600',
    'bg-emerald-600',
    'bg-amber-600',
    'bg-violet-600',
    'bg-rose-600',
    'bg-indigo-600',
    'bg-teal-600',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0; // Convert to 32bit int
  }
  const idx = Math.abs(hash) % palette.length;
  return palette[idx];
}

export default function Avatar({ name, className = 'w-12 h-12', title }: AvatarProps) {
  const initials = getInitials(name);
  const color = colorFromName(name);
  return (
    <div
      className={`${className} ${color} rounded-full text-white flex items-center justify-center font-semibold select-none shadow-sm ring-1 ring-black/10 dark:ring-white/10`}
      aria-label={`Avatar for ${name}`}
      title={title || name}
    >
      <span className="tracking-wide">
        {initials}
      </span>
    </div>
  );
}


