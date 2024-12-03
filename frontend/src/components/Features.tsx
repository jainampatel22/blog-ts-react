'use client'

import { motion } from 'framer-motion'
import { Pen, Users, Zap } from 'lucide-react'

const features = [
  {
    icon: Pen,
    title: 'Intuitive Editor',
    description: 'Write and format your posts with ease using our user-friendly interface.'
  },
  {
    icon: Users,
    title: 'Engage Your Audience',
    description: 'Connect with readers through comments, likes, and shares.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Enjoy quick load times and seamless performance across devices.'
  }
]

export default function Features() {
  return (
    <section className="px-4 py-16 lg:px-20">
      <h2 className="mb-12 text-center text-3xl font-bold text-purple-800 lg:text-4xl">Why Choose Articly?</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <feature.icon className="mb-4 h-12 w-12 text-purple-600" />
            <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

