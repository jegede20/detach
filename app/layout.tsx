import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Detach — Clean up your Discord servers', description: 'A focused utility for your Discord server list.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
