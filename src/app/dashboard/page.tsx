'use client'

import { useEffect, useState } from 'react'
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut, 
  Search, 
  Filter,
  MoreVertical,
  ChevronRight,
  Clock
} from 'lucide-react'

interface Lead {
  id: string
  name: string
  phone: string
  initial_message: string
  status: string
  created_at: string
}

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('leads')

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch('/api/leads');
        const data = await res.json();
        if (Array.isArray(data)) {
          setLeads(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg italic shadow-lg shadow-blue-100">A</div>
            <span className="font-bold text-xl tracking-tight">AutoLeads</span>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'leads', label: 'Leads', icon: <Users size={20} /> },
              { id: 'chat', label: 'Conversations', icon: <MessageSquare size={20} /> },
              { id: 'calendar', label: 'Appointments', icon: <Calendar size={20} /> },
              { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-50' 
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-slate-50">
          <button className="flex items-center gap-4 text-slate-400 hover:text-red-500 transition-colors text-sm font-bold group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Lead Overview</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Manage your incoming project requests</p>
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                placeholder="Search leads..." 
                className="bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-3 text-sm font-medium w-64 focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
              />
            </div>
            <button className="bg-white border border-slate-200 p-3 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all shadow-sm">
              <Filter size={20} />
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {[
            { label: 'Total Leads', value: leads.length, color: 'bg-blue-600' },
            { label: 'Pending Response', value: leads.filter(l => l.status === 'new').length, color: 'bg-orange-500' },
            { label: 'Booked Jobs', value: 0, color: 'bg-green-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all cursor-default">
              <div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">{stat.label}</p>
                <h3 className="text-4xl font-black">{stat.value}</h3>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity`} />
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center px-8">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Customer Details</span>
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Status</span>
          </div>
          
          <ul className="divide-y divide-slate-50">
            {loading ? (
              <li className="p-12 text-center text-slate-400 font-medium">Loading your leads...</li>
            ) : leads.length === 0 ? (
              <li className="p-12 text-center">
                <p className="text-slate-400 font-medium mb-4">No leads found yet. Share your link to get started!</p>
                <button className="text-blue-600 font-black text-sm uppercase tracking-widest hover:underline">Copy Capture Link</button>
              </li>
            ) : (
              leads.map((lead) => (
                <li key={lead.id} className="group p-8 hover:bg-slate-50/50 transition-all flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-black text-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {lead.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">{lead.name}</h4>
                      <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                        <span className="flex items-center gap-1.5"><Clock size={14} /> {new Date(lead.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{lead.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      lead.status === 'new' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {lead.status}
                    </span>
                    <button className="text-slate-300 hover:text-slate-900 transition-colors">
                      <MoreVertical size={20} />
                    </button>
                    <ChevronRight size={20} className="text-slate-200 group-hover:text-blue-600 transition-colors" />
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </div>
  )
}
