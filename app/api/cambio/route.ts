import { NextResponse } from 'next/server';

export const revalidate = 3600; // revalida a cada 1 hora

export async function GET() {
  try {
    const response = await fetch(
      'https://api.exchangerate-api.com/v4/latest/USD'
    );
    const data = await response.json();
    const brl = data.rates.BRL;
    return NextResponse.json({ usd_to_brl: brl });
  } catch {
    return NextResponse.json({ usd_to_brl: 5.7 }); // fallback
  }
}
