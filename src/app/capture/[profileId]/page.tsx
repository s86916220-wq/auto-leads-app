'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Send, CheckCircle2, User, Phone, MessageSquare } from 'lucide-react'

export default function CapturePage() {
  const params = useParams()
  const profileId = params.profileId
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      profileId,
      name: formData.get('name'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSuccess(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[32px] p-12 text-center shadow-2xl shadow-blue-100 border border-slate-100 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4">You're All Set!</h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            We've received your request. One of our AI assistants will send you a text message shortly to help with your project.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6 font-sans">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-100 rotate-3">
            <Send className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Request a Quote</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Fast & Reliable Service</p>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl shadow-blue-100 border border-slate-100 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <User size={16} className="text-blue-500" /> Full Name
              </label>
              <input 
                name="name" 
                required 
                placeholder="John Doe"
                className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 transition-all font-medium" 
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <Phone size={16} className="text-blue-500" /> Mobile Number
              </label>
              <input 
                name="phone" 
                type="tel" 
                required 
                placeholder="(555) 000-0000"
                className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 transition-all font-medium" 
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <MessageSquare size={16} className="text-blue-500" /> Tell us about your project
              </label>
              <textarea 
                name="message" 
                rows={4} 
                required
                placeholder="What do you need help with?"
                className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-none" 
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-100 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Get Started
                  <Send size={20} />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
              By submitting, you agree to receive automated <br /> text messages for follow-up purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
