import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username é obrigatório' }, { status: 400 });
  }

  try {
    // 1. Resolve o username para ID
    const userRes = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usernames: [username],
        excludeBannedUsers: true
      })
    });

    if (!userRes.ok) {
        throw new Error('Falha na API da Roblox');
    }

    const userData = await userRes.json();
    
    if (!userData.data || userData.data.length === 0) {
      return NextResponse.json({ existe: false }, { status: 200 });
    }

    const userId = userData.data[0].id;
    const realUsername = userData.data[0].name;

    // 2. Busca a miniatura (Headshot)
    const thumbRes = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=true`);
    
    let imageUrl = '';
    if (thumbRes.ok) {
        const thumbData = await thumbRes.json();
        if (thumbData.data && thumbData.data.length > 0) {
            imageUrl = thumbData.data[0].imageUrl;
        }
    }

    return NextResponse.json({ 
        existe: true, 
        userId, 
        username: realUsername,
        imageUrl 
    });

  } catch (error) {
    console.error('Erro de validação Roblox:', error);
    return NextResponse.json({ error: 'Erro ao validar na Roblox' }, { status: 500 });
  }
}
