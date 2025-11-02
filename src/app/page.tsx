"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Footer from "@/components/Footer"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  features: string[]
  isPopular?: boolean
}

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar?: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [testimonialsLoading, setTestimonialsLoading] = useState(true)

  // Helper function to generate avatar gradient and initial
  const getAvatarClass = (index: number) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-blue-600', 
      'from-purple-500 to-pink-600',
      'from-orange-500 to-red-600',
      'from-teal-500 to-cyan-600'
    ]
    return gradients[index % gradients.length]
  }

  const getNameInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  // Fetch products from admin API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/public/products')
        if (response.ok) {
          const data = await response.json()
          // Transform API data to match our interface
          const transformedProducts = data.map((product: any) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            features: product.features ? JSON.parse(product.features) : [],
            isPopular: product.category === 'dropshipping' // Mark dropshipping as popular
          }))
          setProducts(transformedProducts)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
        // Fallback to default products if API fails
        setProducts([
          {
            id: '1',
            name: 'Affiliate Sites',
            description: 'Perfect for content creators and affiliate marketers',
            price: 399,
            category: 'affiliate',
            features: ['SEO optimized content', 'Affiliate link integration', 'Review templates', 'Analytics setup']
          },
          {
            id: '2',
            name: 'Dropshipping Stores',
            description: 'Complete e-commerce solution ready to sell',
            price: 599,
            category: 'dropshipping',
            features: ['20+ products included', 'Payment gateway setup', 'Shipping configuration', 'Email marketing flows'],
            isPopular: true
          },
          {
            id: '3',
            name: 'AI Solutions',
            description: 'Advanced AI chatbots and automation',
            price: 1199,
            category: 'ai',
            features: ['Custom AI training', 'CRM integration', 'Lead qualification', '24/7 automation']
          }
        ])
      }
      setLoading(false)
    }
    
    fetchProducts()
  }, [])

  // Fetch testimonials from admin API
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/public/content')
        if (response.ok) {
          const data = await response.json()
          // Filter for testimonials content
          const testimonialsData = data.filter((item: any) => item.type === 'testimonial')
          const transformedTestimonials = testimonialsData.map((item: any) => ({
            id: item.id,
            name: item.title,
            role: item.subtitle || 'Client',
            content: item.content,
            rating: 5 // Default to 5 stars
          }))
          setTestimonials(transformedTestimonials)
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error)
        // Fallback to default testimonials if API fails
        setTestimonials([
          {
            id: '1',
            name: 'Rajesh Kumar',
            role: 'E-commerce Store Owner',
            content: 'Bought a dropshipping store and was making sales within a week. The onboarding was smooth and support team is very responsive.',
            rating: 5
          },
          {
            id: '2',
            name: 'Priya Sharma',
            role: 'Affiliate Marketer',
            content: 'The affiliate website I purchased is perfectly optimized for conversions. Already earning commissions and ranking well on Google.',
            rating: 5
          },
          {
            id: '3',
            name: 'Arjun Patel',
            role: 'SaaS Founder',
            content: 'Got a custom landing page that converted 3x better than my old site. The AI chatbot integration is a game-changer for lead generation.',
            rating: 5
          }
        ])
      }
      setTestimonialsLoading(false)
    }
    
    fetchTestimonials()
  }, [])

  useEffect(() => {
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle')
    const mobileNav = document.getElementById('mobileNav')
    
    if (navToggle && mobileNav) {
      navToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden')
      })
    }

    // Header scroll effect
    const header = document.querySelector('.site-header')
    const handleScroll = () => {
      if (!header) return
      if (window.scrollY > 4) {
        header.classList.add('is-scrolled')
      } else {
        header.classList.remove('is-scrolled')
      }
    }
    
    window.addEventListener('scroll', handleScroll)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="bg-white text-slate-800 antialiased">
      {/* Header */}
      <header className="site-header sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a73e8] text-white font-bold text-lg">
                W
              </span>
              <span className="text-xl font-extrabold tracking-tight">WebCraft Pro</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <Link href="/" className="text-[#1a73e8] font-semibold">Home</Link>
              <Link href="/buy-websites" className="hover:text-[#1a73e8]">Products</Link>
              <Link href="/about" className="hover:text-[#1a73e8]">About</Link>
              <Link href="#faq" className="hover:text-[#1a73e8]">FAQ</Link>
              <Link href="#contact" className="hover:text-[#1a73e8]">Contact</Link>
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <Link href="#contact" className="btn btn-outline">Get a quote</Link>
              <Link href="#contact" className="btn btn-primary">Book a call</Link>
              <Link href="/sign-in" className="text-sm text-slate-600 hover:text-[#1a73e8] ml-3">Admin</Link>
            </div>
            <button id="navToggle" className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
        <div id="mobileNav" className="md:hidden hidden border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 grid gap-2 text-sm">
            <Link href="/" className="py-2">Home</Link>
            <Link href="/buy-websites" className="py-2">Products</Link>
            <Link href="/about" className="py-2">About</Link>
            <Link href="#faq" className="py-2">FAQ</Link>
            <Link href="#contact" className="py-2">Contact</Link>
            <Link href="/sign-in" className="py-2 text-slate-600">Admin</Link>
            <Link href="#contact" className="mt-2 btn btn-primary justify-center">Book a call</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-[#F2F2F2] to-white"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 items-center gap-10">
            <div>
              <p className="chip bg-[#F2F2F2] text-[#1a73e8]">Ready‑to‑ship catalog</p>
              <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight">
                Buy websites and AI agents that start producing day one
              </h1>
              <p className="mt-3 text-lg text-slate-600">
                Dropshipping stores, affiliate sites, niche templates, and on‑site chat/lead agents. View demo, then buy with one click.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/buy-websites" className="btn btn-primary">Browse products</Link>
                <Link href="#contact" className="btn btn-outline">Need custom?</Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-[0_8px_30px_rgba(0,0,0,.08)] grid place-items-center">
                <div className="grid grid-cols-3 gap-3 p-6 w-full">
                  {/* Dropshipping Store */}
                  <div className="h-24 rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,.08)] p-3 flex flex-col justify-between">
                    <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">E-commerce</p>
                      <p className="text-xs text-slate-500">$599+</p>
                    </div>
                  </div>

                  {/* Affiliate Site */}
                  <div className="h-24 rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,.08)] p-3 flex flex-col justify-between">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 9l-9-9" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Affiliate</p>
                      <p className="text-xs text-slate-500">$399+</p>
                    </div>
                  </div>

                  {/* AI Chatbot */}
                  <div className="h-24 rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,.08)] p-3 flex flex-col justify-between">
                    <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">AI Chatbot</p>
                      <p className="text-xs text-slate-500">$699+</p>
                    </div>
                  </div>

                  {/* Mobile App */}
                  <div className="h-24 rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,.08)] p-3 flex flex-col justify-between">
                    <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Mobile App</p>
                      <p className="text-xs text-slate-500">$1199+</p>
                    </div>
                  </div>

                  {/* Custom Website */}
                  <div className="h-24 rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,.08)] p-3 flex flex-col justify-between">
                    <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Custom</p>
                      <p className="text-xs text-slate-500">$999+</p>
                    </div>
                  </div>

                  {/* AI Agent */}
                  <div className="h-24 rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,.08)] p-3 flex flex-col justify-between">
                    <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">AI Agent</p>
                      <p className="text-xs text-slate-500">$1599+</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.08)] p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#1a73e8]/10 flex items-center justify-center text-[#1a73e8]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20l9-16H3l9 16z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold">One‑click deploy</p>
                  <p className="text-xs text-slate-500">Hosting + DNS help included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Why Choose WebCraft Pro?</h2>
            <p className="mt-3 text-xl text-slate-600 max-w-2xl mx-auto">
              We deliver production-ready websites and solutions that start generating value from day one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a73e8]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#1a73e8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast Delivery</h3>
              <p className="text-slate-600">Get your website transferred and live within 24-48 hours. No waiting weeks for development.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a73e8]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#1a73e8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Conversion Optimized</h3>
              <p className="text-slate-600">Every site is built with proven layouts, optimized checkout flows, and high-converting elements.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a73e8]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#1a73e8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Full Support</h3>
              <p className="text-slate-600">7-day bug fix guarantee, 30-minute onboarding call, and DNS/SSL setup included.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a73e8]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#1a73e8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Mobile First</h3>
              <p className="text-slate-600">All websites are fully responsive and optimized for mobile devices and modern browsers.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a73e8]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#1a73e8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">SEO Ready</h3>
              <p className="text-slate-600">Built-in SEO optimization with proper meta tags, schema markup, and fast loading speeds.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a73e8]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#1a73e8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Made in India</h3>
              <p className="text-slate-600">Proudly crafted by Indian developers with global standards and competitive pricing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">How It Works</h2>
            <p className="mt-3 text-xl text-slate-600 max-w-2xl mx-auto">
              From browsing to launch in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#1a73e8] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Browse & Choose</h3>
              <p className="text-slate-600 mb-4">
                Explore our catalog of ready-made websites. View live demos and choose the perfect fit for your business.
              </p>
              <div className="flex justify-center">
                <Link href="/buy-websites" className="btn btn-outline">Browse Products</Link>
              </div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#1a73e8] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Buy & Customize</h3>
              <p className="text-slate-600 mb-4">
                Complete your purchase and tell us about your niche preferences. We&apos;ll customize colors, content, and branding.
              </p>
              <div className="flex justify-center">
                <Link href="#contact" className="btn btn-outline">Get Started</Link>
              </div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#1a73e8] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Launch & Grow</h3>
              <p className="text-slate-600 mb-4">
                We transfer the site to your account, set up hosting, and provide onboarding. You&apos;re ready to start selling!
              </p>
              <div className="flex justify-center">
                <a href="https://wa.me/0000000000" className="btn btn-outline">Get Support</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">What Our Clients Say</h2>
            <p className="mt-3 text-xl text-slate-600 max-w-2xl mx-auto">
              Join hundreds of successful entrepreneurs who chose WebCraft Pro
            </p>
          </div>

          {testimonialsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_8px_30px_rgba(0,0,0,.08)] animate-pulse">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                    <div className="ml-4 flex-1">
                      <div className="h-4 bg-slate-200 rounded mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-slate-200 rounded"></div>
                    <div className="h-3 bg-slate-200 rounded"></div>
                    <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                  </div>
                  <div className="h-4 bg-slate-200 rounded w-24"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_8px_30px_rgba(0,0,0,.08)]">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getAvatarClass(index)} rounded-full flex items-center justify-center text-white font-bold`}>
                      {getNameInitial(testimonial.name)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-4 bg-slate-50 rounded-2xl p-6">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-slate-400 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-bold">
                  +50
                </div>
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">200+ Happy Clients</p>
                <p className="text-sm text-slate-600">Successfully launched businesses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Transparent Pricing</h2>
            <p className="mt-3 text-xl text-slate-600 max-w-2xl mx-auto">
              One-time payment, lifetime ownership. No monthly fees or hidden costs.
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-8 text-center animate-pulse">
                  <div className="h-6 bg-slate-200 rounded mb-4"></div>
                  <div className="h-8 bg-slate-200 rounded mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded mb-6"></div>
                  <div className="space-y-2 mb-8">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-4 bg-slate-200 rounded"></div>
                    ))}
                  </div>
                  <div className="h-10 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className={`bg-white rounded-2xl p-8 text-center relative ${
                  product.isPopular ? 'border-2 border-[#1a73e8]' : 'border border-slate-200'
                }`}>
                  {product.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#1a73e8] text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                  <div className="text-3xl font-extrabold text-[#1a73e8] mb-4">${product.price}</div>
                  <p className="text-slate-600 mb-6">{product.description}</p>
                  <ul className="text-left space-y-2 text-sm text-slate-600 mb-8">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={`/buy-websites?filter=${product.category}`} 
                    className={`btn w-full justify-center ${
                      product.isPopular ? 'btn-primary' : 'btn-outline'
                    }`}
                  >
                    View {product.name}
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">Need something custom or have a different budget?</p>
            <Link href="#contact" className="btn btn-primary">Get Custom Quote</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#1a73e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-extrabold mb-2">200+</div>
              <p className="text-blue-100">Websites Delivered</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-2">48hrs</div>
              <p className="text-blue-100">Average Delivery</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-2">98%</div>
              <p className="text-blue-100">Client Satisfaction</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-2">24/7</div>
              <p className="text-blue-100">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold">Buying FAQ</h2>
            <p className="mt-3 text-slate-600">Licensing, revisions, and launch support — quick answers below.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <details className="group p-6 rounded-2xl border border-slate-200">
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="font-semibold">What do I get after purchase?</span>
                <span className="ml-4 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-4 text-slate-600">
                We deliver site files or transfer the store to your account, plus a setup checklist, 7‑day support, and a 30‑minute onboarding call.
              </p>
            </details>
            <details className="group p-6 rounded-2xl border border-slate-200">
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="font-semibold">Can I request changes?</span>
                <span className="ml-4 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-4 text-slate-600">
                Yes — each product includes minor tweaks (colors, logo, copy blocks). Larger edits can be scoped as add‑ons.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Want a different niche or bundle?</h2>
              <p className="mt-3 text-slate-600">Tell us what you&apos;re after and we&apos;ll share the closest match — or build it.</p>
              <form className="mt-8 grid grid-cols-1 gap-4">
                <input 
                  type="text" 
                  placeholder="Full name" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1a73e8]" 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1a73e8]" 
                />
                <input 
                  type="text" 
                  placeholder="Preferred niche / platform" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1a73e8]" 
                />
                <textarea 
                  rows={4} 
                  placeholder="Describe what you want to sell or automate" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
                ></textarea>
                <button type="button" className="btn btn-primary">Send request</button>
                <p className="text-xs text-slate-500">Demo form — connect your CRM or handler.</p>
              </form>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_8px_30px_rgba(0,0,0,.08)]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#1a73e8]/10 text-[#1a73e8] grid place-items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10a8.38 8.38 0 01-.9 3.8l-1.2 2.2a2 2 0 01-2.2 1l-2.3-.8a10.66 10.66 0 01-4.8-4.8l-.8-2.3a2 2 0 011-2.2L11 3.9A8.38 8.38 0 0114.8 3H15"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Prefer WhatsApp?</p>
                  <p className="text-sm text-slate-600">Message us for a quick quote and timeline.</p>
                </div>
              </div>
              <a href="https://wa.me/0000000000" className="mt-4 btn btn-outline">Chat on WhatsApp</a>
              <div className="mt-8 grid sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-slate-600">hello@webcraft.pro</p>
                </div>
                <div>
                  <p className="font-semibold">Hours</p>
                  <p className="text-slate-600">Mon–Sat, 10:00–18:00 IST</p>
                </div>
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-slate-600">Mumbai • India</p>
                </div>
                <div>
                  <p className="font-semibold">Social</p>
                  <div className="flex gap-3 mt-1">
                    <a href="#" aria-label="LinkedIn" className="hover:text-[#1a73e8]">in</a>
                    <a href="#" aria-label="X" className="hover:text-[#1a73e8]">x</a>
                    <a href="#" aria-label="Instagram" className="hover:text-[#1a73e8]">ig</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}