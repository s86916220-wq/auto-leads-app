import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const res = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}?sort%5B0%5D%5Bfield%5D=Created&sort%5B0%5D%5Bdirection%5D=desc`, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`
      },
      next: { revalidate: 0 }
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error?.message || 'Airtable error')
    }

    const data = await res.json()
    
    const leads = data.records.map((record: any) => ({
      id: record.id,
      name: record.fields.Name,
      phone: record.fields.Phone,
      initial_message: record.fields.Message,
      ai_response: record.fields["AI Response"],
      status: record.fields.Status,
      created_at: record.createdTime
    }))

    return NextResponse.json(leads);
  } catch (error: any) {
    console.error('Fetch leads error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
