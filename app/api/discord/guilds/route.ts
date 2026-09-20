import { NextResponse } from 'next/server';
export async function GET(request: Request){
 const token=request.headers.get('cookie')?.match(/discord_access_token=([^;]+)/)?.[1];
 if(!token) return NextResponse.json({authenticated:false},{status:401});
 const result=await fetch('https://discord.com/api/users/@me/guilds',{headers:{Authorization:`Bearer ${token}`},cache:'no-store'});
 if(!result.ok) return NextResponse.json({error:'Discord session expired.'},{status:result.status});
 const guilds=await result.json();
 return NextResponse.json({authenticated:true,guilds:guilds.map((g:any)=>({id:g.id,name:g.name,members:g.approximate_member_count?`${g.approximate_member_count.toLocaleString()} members`:'Member count unavailable',color:'#5364a8',initials:g.name.slice(0,2).toUpperCase(),icon:g.icon}))});
}