import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')

  if (!username || username.length < 3 || username.length > 20) {
    return NextResponse.json({ error: 'Username inválido.' }, { status: 400 })
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return NextResponse.json({ error: 'Username contém caracteres inválidos.' }, { status: 400 })
  }

  try {
    const usernameRes = await fetch(
      'https://users.roblox.com/v1/usernames/users',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernames: [username], excludeBannedUsers: false }),
      }
    )

    if (!usernameRes.ok) throw new Error('Roblox API indisponível')

    const usernameData = await usernameRes.json()

    if (!usernameData.data || usernameData.data.length === 0) {
      return NextResponse.json({ error: 'Usuário não encontrado no Roblox.' }, { status: 404 })
    }

    const user = usernameData.data[0]

    let avatarUrl: string | null = null
    try {
      const avatarRes = await fetch(
        `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=150x150&format=Png&isCircular=true`
      )
      if (avatarRes.ok) {
        const avatarData = await avatarRes.json()
        avatarUrl = avatarData.data?.[0]?.imageUrl || null
      }
    } catch {
      // Avatar is optional — don't block the flow
    }

    return NextResponse.json({
      id: user.id,
      name: user.requestedUsername || user.name,
      displayName: user.displayName || user.name,
      avatarUrl,
    })
  } catch {
    return NextResponse.json(
      { error: 'Não foi possível verificar o usuário. Tente novamente.' },
      { status: 500 }
    )
  }
}
