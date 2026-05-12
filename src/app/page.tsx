import Link from "next/link";
import { CheckCircle, Zap, Shield, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">A</div>
            <span className="font-bold text-2xl tracking-tight text-slate-900">Auto<span className="text-blue-600">Leads</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
            <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
          </div>
          <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95">
            Contractor Login
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-blue-100">
              <Zap size={16} /> Now with GPT-4o Support
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-slate-900 leading-[1.1]">
              Never Miss a <br />
              <span className="text-blue-600">Construction Lead</span> Again.
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              AI-powered SMS follow-ups that respond to your leads in 60 seconds. Book appointments while you're on the jobsite or sleeping.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                Start 7-Day Free Trial
              </button>
              <div className="flex items-center gap-4 text-slate-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                  ))}
                </div>
                <span className="text-sm font-medium">Joined by 200+ Contractors</span>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/5 blur-2xl rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="bg-white border border-slate-200 p-8 rounded-[40px] shadow-2xl relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <Smartphone className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">AI Assistant</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Active Now</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm font-medium text-slate-700">
                  Lead: "Hey, I need a quote for a kitchen remodel in Denver."
                </div>
                <div className="bg-blue-600 p-4 rounded-2xl rounded-tr-none ml-auto max-w-[80%] text-sm font-medium text-white shadow-lg shadow-blue-200">
                  AI: "Hi! I'm the assistant for Apex Construction. We'd love to help! Is this for a residential or commercial kitchen?"
                </div>
                <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm font-medium text-slate-700">
                  Lead: "Residential. My house was built in 1985."
                </div>
                <div className="animate-pulse flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 italic">Built for the Trade</h2>
            <p className="text-slate-500 font-medium">You focus on the build. We'll focus on the sales.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Zap className="text-blue-600" />, title: "Instant Response", desc: "Leads get a text back within 60 seconds, which increases closing rates by 400%." },
              { icon: <CheckCircle className="text-blue-600" />, title: "Lead Filtering", desc: "The AI asks qualifying questions (budget, location, timeline) so you don't waste time on tire-kickers." },
              { icon: <Shield className="text-blue-600" />, title: "CRM Sync", desc: "All conversations and lead data sync directly to your dashboard and Supabase backend." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Ready to book more jobs?</h2>
            <p className="text-blue-100 text-xl mb-12 max-w-xl mx-auto font-medium">
              Start your free trial today. Connect your first lead source in under 5 minutes.
            </p>
            <button className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-extrabold text-lg hover:bg-slate-100 transition-all shadow-xl active:scale-95">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm italic">A</div>
            <span className="font-bold text-lg tracking-tight text-slate-900">AutoLeads</span>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">© 2026 AutoLeads AI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
