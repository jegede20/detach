import { NextResponse } from 'next/server';
import crypto from 'crypto';
export async function GET(request: Request) {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirect = process.env.DISCORD_REDIRECT_URI;
  if (!clientId || !redirect) return NextResponse.json({ error: 'Discord OAuth is not configured.' }, { status: 500 });
  const state = crypto.randomBytes(24).toString('hex');
  const url = new URL('https://discord.com/oauth2/authorize');
  url.searchParams.set('client_id', clientId); url.searchParams.set('response_type', 'code');
  url.searchParams.set('redirect_uri', redirect); url.searchParams.set('scope', 'identify guilds');
  const response = NextResponse.redirect(url); response.cookies.set('discord_oauth_state', state, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 600, path: '/' });
  url.searchParams.set('state', state); return NextResponse.redirect(url, { headers: response.headers });
}