import { NextResponse } from 'next/server';
export async function GET(request: Request) {
 const url=new URL(request.url), code=url.searchParams.get('code'), state=url.searchParams.get('state');
 const expected=request.headers.get('cookie')?.match(/discord_oauth_state=([^;]+)/)?.[1];
 if(!code || !state || !expected || state!==expected) return NextResponse.json({error:'Invalid OAuth state.'},{status:400});
 const body=new URLSearchParams({client_id:process.env.DISCORD_CLIENT_ID||'',client_secret:process.env.DISCORD_CLIENT_SECRET||'',grant_type:'authorization_code',code,redirect_uri:process.env.DISCORD_REDIRECT_URI||''});
 const token=await fetch('https://discord.com/api/oauth2/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body});
 if(!token.ok) return NextResponse.json({error:'Discord authorization failed.'},{status:502});
 const data=await token.json(); const response=NextResponse.redirect(new URL('/',request.url));
 response.cookies.set('discord_access_token',data.access_token,{httpOnly:true,secure:true,sameSite:'lax',maxAge:data.expires_in||604800,path:'/'}); response.cookies.delete('discord_oauth_state'); return response;
}