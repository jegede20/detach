import { NextResponse } from 'next/server';
export async function GET(request: Request){
 const token=request.headers.get('cookie')?.match(/discord_access_token=([^;]+)/)?.[1];
 if(!token)return NextResponse.json({authenticated:false},{status:401});
 const r=await fetch('https://discord.com/api/users/@me',{headers:{Authorization:`Bearer ${token}`},cache:'no-store'});
 if(!r.ok)return NextResponse.json({authenticated:false},{status:r.status});
 const u=await r.json(); return NextResponse.json({authenticated:true,id:u.id,username:u.username,globalName:u.global_name||u.username,avatar:u.avatar});
}