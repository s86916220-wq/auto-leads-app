import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI inside the route to avoid build-time issues
const getOpenAI = () => new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { profileId, name, phone, message } = body

    if (!name || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Generate AI response
    const openai = getOpenAI()
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using gpt-3.5-turbo for maximum compatibility
      messages: [
        { 
          role: "system", 
          content: "You are a helpful assistant for a contractor. A new lead just messaged. Draft a friendly, professional SMS reply to acknowledge their request and ask one clarifying question. Keep it under 160 characters." 
        },
        { 
          role: "user", 
          content: `Lead Name: ${name}\nLead Message: ${message}` 
        }
      ],
    })

    const aiReply = completion.choices[0].message.content

    // 2. Save lead to Airtable
    const airtableData = {
      records: [
        {
          fields: {
            "Name": name,
            "Phone": phone,
            "Message": message,
            "AI Response": aiReply,
            "Profile ID": profileId || "default",
            "Status": "New"
          }
        }
      ]
    }

    const res = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(airtableData)
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error?.message || 'Airtable error')
    }

    return NextResponse.json({ success: true, aiReply })
  } catch (error: any) {
    console.error('Lead error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
