import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Uma simulação robusta de scraper que lida com Bloxxer.GG (Next.js __NEXT_DATA__)
// Caso eles tenham proteção anti-bot pesada, isso precisaria rodar via Puppeteer/Scraping API em produção.
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.SYNC_SECRET_KEY}`) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Supabase não configurado' }, { status: 500 })
    }
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Categorias reais do bloxxer.gg
    const categories = ['knives', 'guns', 'pets', 'bundles']
    const allProducts = []

    for (const category of categories) {
      try {
        const response = await fetch(`https://bloxxer.gg/category/${category}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        })
        
        if (!response.ok) continue
        
        const html = await response.text()
        
        // No Next.js (pages router ou app router) às vezes os dados estão em __NEXT_DATA__ ou num chunk.
        // Simulando a extração via Regex do script json:
        const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)
        if (match && match[1]) {
          const nextData = JSON.parse(match[1])
          // A estrutura de itens depende da versão do build da Bloxxer. 
          // Para este código garantido, assumimos que eles estão num fallback.
          let items = nextData?.props?.pageProps?.initialProducts || []
          
          if (!items || items.length === 0) {
            // Em App Router os dados vêm embedded em payload de rsc
            console.log(`Pode não usar Pages Router ou anti-bot detectado em ${category}.`)
            // Pular...
          } else {
            // Se encontrar itens reais
            for (const item of items) {
              const usdPrice = parseFloat(item.price) // ex: $1.00
              if (isNaN(usdPrice)) continue

              // 1. Câmbio USD para BRL (usando api default)
              // Simulando um valor BRL atual (Ex: 5 BRL = 1 USD). O real seria buscar na AwesomeAPI
              const exchangeRate = 5.0
              const brlPrice = usdPrice * exchangeRate

              // 2. Aplicar markup de 50%
              const finalPriceBrl = brlPrice * 1.5

              // 3. Traduzir o Nome 
              // Exemplo trivial usando regex ou mapeamentos para MM2, ou API externa
              // let translatedName = await translate(item.name, 'en', 'pt')
              const translatedName = item.name.replace('Godly', 'Divino').replace('Knife', 'Faca')

              allProducts.push({
                product_id_source: item.id,
                name: translatedName,
                slug: item.slug || Math.random().toString(36).substring(7),
                category: category,
                price: parseFloat(finalPriceBrl.toFixed(2)),
                original_price: parseFloat((finalPriceBrl * 1.2).toFixed(2)), // Fake desconto
                image_url: item.image || 'https://i.ibb.co/f36xqgk/z7blox-logo.png',
                stock: item.stock > 0 ? 100 : 0, // Mock de estoque
              })
            }
          }
        }
      } catch (err) {
        console.error(`Erro buscando categoria ${category}`, err)
      }
    }

    if (allProducts.length > 0) {
      // Upsert no supabase
      const { error } = await supabase
        .from('products')
        .upsert(
          allProducts.map(p => ({
            name: p.name,
            slug: p.slug,
            description: `Item original e seguro do MM2. Receba ${p.name} instantaneamente via Trade no servidor privado.`,
            price: p.price,
            original_price: p.original_price,
            category: p.category,
            image_url: p.image_url,
            stock: p.stock,
            is_active: true
          })),
          { onConflict: 'slug' }
        )
      
      if (error) {
         return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, count: allProducts.length, data: allProducts })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
