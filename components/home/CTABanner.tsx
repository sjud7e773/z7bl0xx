'use client'



import Link from 'next/link'

import { motion } from 'framer-motion'

import { Zap, Sword } from 'lucide-react'



export default function CTABanner() {

  return (

    <section className="cta-banner">

      <div className="page-container">

        <motion.div

          initial={{ opacity: 0, y: 20 }}

          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true }}

          transition={{ duration: 0.5 }}

          className="flex flex-col items-center text-center gap-6"

        >

          <div

            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"

            style={{

              background: 'rgba(255,255,255,0.15)',

              border: '1px solid rgba(255,255,255,0.25)',

              color: '#fff',

              fontFamily: 'Inter',

            }}

          >

            <Zap size={14} />

            Entrega em minutos

          </div>



          <h2

            className="font-black text-white"

            style={{

              fontFamily: 'Inter',

              fontSize: 'clamp(28px, 5vw, 52px)',

              letterSpacing: '-0.04em',

              lineHeight: 1.1,

            }}

          >

            Pronto para turbinar seu

            <br />

            inventí¡rio MM2?

          </h2>



          <p

            className="max-w-md text-base"

            style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Inter' }}

          >

            Centenas de Godlys, Ancients e Pets esperando por vocíª. 

            Compra segura, entrega instantânea.

          </p>



          <div className="flex items-center gap-4 flex-wrap justify-center">

            <Link

              href="/categoria/facas"

              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all"

              style={{

                background: '#fff',

                color: 'var(--accent)',

                fontFamily: 'Inter',

                textDecoration: 'none',

              }}

              onMouseEnter={(e) => {

                e.currentTarget.style.background = 'rgba(255,255,255,0.9)'

                e.currentTarget.style.transform = 'translateY(-2px)'

              }}

              onMouseLeave={(e) => {

                e.currentTarget.style.background = '#fff'

                e.currentTarget.style.transform = 'translateY(0)'

              }}

            >

              <Sword size={18} /> Explorar Itens

            </Link>

            <Link

              href="#faq"

              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all"

              style={{

                background: 'rgba(255,255,255,0.1)',

                color: '#fff',

                border: '1px solid rgba(255,255,255,0.3)',

                fontFamily: 'Inter',

                textDecoration: 'none',

              }}

              onMouseEnter={(e) => {

                e.currentTarget.style.background = 'rgba(255,255,255,0.2)'

              }}

              onMouseLeave={(e) => {

                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'

              }}

            >

              Como Funciona

            </Link>

          </div>

        </motion.div>

      </div>

    </section>

  )

}

