'use client'

import { motion } from 'framer-motion'


export default function Hero() {
  return (
    <section className="px-4 py-20 text-center lg:px-20 lg:py-32">
      <motion.h1 
        className="mb-6 text-4xl font-bold text-purple-800 lg:text-6xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Unleash Your Thoughts with Articly
      </motion.h1>
      <motion.p 
        className="mb-8 text-xl text-gray-600 lg:text-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Where Ideas Flourish and Stories Come to Life
      </motion.p>
      <motion.div 
        className="space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <a href="/signin" className="rounded-full bg-purple-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-purple-700">
          Sign In
        </a>
        <a href="/signup" className="rounded-full border-2 border-purple-600 px-6 py-3 text-lg font-semibold text-purple-600 transition-colors hover:bg-purple-100">
          Sign Up
        </a>
      </motion.div>
    </section>
  )
}

