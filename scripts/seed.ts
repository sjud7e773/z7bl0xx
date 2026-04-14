import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const products = [
  {
    name: 'Icewing',
    slug: 'icewing',
    category: 'knives',
    price: 1.86,
    original_price: 25.73,
    stock: 10,
    description: 'A faca Icewing é um item exclusivo e altamente cobiçado do MM2. Design elegante em azul gelo.',
    image_url: 'https://placehold.co/400x400/1a0535/ffffff?text=Icewing',
  },
  {
    name: 'Harvester',
    slug: 'harvester',
    category: 'knives',
    price: 5.34,
    original_price: 42.99,
    stock: 5,
    description: 'Harvester — faca rara do Murder Mystery 2 com design de foice.',
    image_url: 'https://placehold.co/400x400/1a0535/ffffff?text=Harvester',
  },
  {
    name: 'Nightblade',
    slug: 'nightblade',
    category: 'knives',
    price: 0.57,
    original_price: 3.99,
    stock: 20,
    description: 'Nightblade — faca clássica do MM2 com efeitos noturnos.',
    image_url: 'https://placehold.co/400x400/1a0535/ffffff?text=Nightblade',
  },
  {
    name: 'Candy',
    slug: 'candy',
    category: 'knives',
    price: 7.64,
    original_price: 65.54,
    stock: 3,
    description: 'Candy — faca festiva e rara do Murder Mystery 2.',
    image_url: 'https://placehold.co/400x400/1a0535/ffffff?text=Candy',
  },
  {
    name: 'Batwing',
    slug: 'batwing',
    category: 'knives',
    price: 3.97,
    original_price: 51.55,
    stock: 7,
    description: 'Batwing — faca de Halloween exclusiva.',
    image_url: 'https://placehold.co/400x400/150030/ffffff?text=Batwing',
  },
  {
    name: 'Heartblade',
    slug: 'heartblade',
    category: 'knives',
    price: 7.28,
    original_price: 64.25,
    stock: 4,
    description: 'Heartblade — faca de Dia dos Namorados do MM2.',
    image_url: 'https://placehold.co/400x400/1a0535/ffffff?text=Heartblade',
  },
  {
    name: 'Shark Gun',
    slug: 'shark-gun',
    category: 'guns',
    price: 0.44,
    original_price: 1.99,
    stock: 15,
    description: 'Shark Gun — arma especial temática do Murder Mystery 2.',
    image_url: 'https://placehold.co/400x400/1a0535/ffffff?text=Shark',
  },
  {
    name: 'Snowcannon',
    slug: 'snowcannon',
    category: 'guns',
    price: 8.61,
    original_price: 74.99,
    stock: 3,
    description: 'Snowcannon — arma de temporada de inverno.',
    image_url: 'https://placehold.co/400x400/150030/ffffff?text=Snowcannon',
  },
  {
    name: 'Luger',
    slug: 'luger',
    category: 'guns',
    price: 3.72,
    original_price: 30.91,
    stock: 8,
    description: 'Luger — arma clássica e elegante do MM2.',
    image_url: 'https://placehold.co/400x400/1a0040/ffffff?text=Luger',
  },
  {
    name: 'Red Luger',
    slug: 'red-luger',
    category: 'guns',
    price: 4.08,
    original_price: 20.59,
    stock: 6,
    description: 'Red Luger — versão vermelha da famosa Luger.',
    image_url: 'https://placehold.co/400x400/2d1b69/ffffff?text=RedLuger',
  },
  {
    name: 'Bat Pet',
    slug: 'bat-pet',
    category: 'pets',
    price: 2.38,
    original_price: 19.99,
    stock: 0,
    description: 'Bat — pet exclusivo de Halloween no MM2.',
    image_url: 'https://placehold.co/400x400/1a0535/ffffff?text=Bat+Pet',
  },
  {
    name: 'Shark Pet',
    slug: 'shark-pet',
    category: 'pets',
    price: 4.50,
    original_price: 15.00,
    stock: 8,
    description: 'Shark Pet — companheiro aquático especial do MM2.',
    image_url: 'https://placehold.co/400x400/0d0020/ffffff?text=Shark+Pet',
  },
  {
    name: 'Winter Bundle',
    slug: 'winter-bundle',
    category: 'bundles',
    price: 4.64,
    original_price: 29.99,
    stock: 5,
    description: 'Winter Bundle — pack exclusivo de itens de inverno do MM2.',
    image_url: 'https://placehold.co/400x400/1a0040/ffffff?text=Winter+Bundle',
  },
  {
    name: 'OP Bundle',
    slug: 'op-bundle',
    category: 'bundles',
    price: 170.25,
    original_price: 928.86,
    stock: 0,
    description: 'Unlock the OP Bundle! Todo Godly de 2016–2020 em um pacote insano! Inclui 82 Godlies, 10 Vintages e 18 Pets.',
    image_url: 'https://placehold.co/400x400/150030/ffffff?text=OP+Bundle',
  },
]

async function seed() {
  console.log('[seed] Iniciando seed de produtos...')

  const { error } = await supabase.from('products').upsert(products, {
    onConflict: 'slug',
  })

  if (error) {
    console.error('[seed] Erro ao inserir produtos:', error)
    process.exit(1)
  }

  console.log(`[seed] ${products.length} produtos inseridos/atualizados com sucesso!`)
  process.exit(0)
}

seed()
