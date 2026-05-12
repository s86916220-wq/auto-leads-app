import { NextResponse } from 'next/server'
import OpenAI from 'openai'

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
      model: "gpt-3.5-turbo",
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

    // 2. Save lead to Airtable (Using hardcoded IDs for maximum reliability)
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

    // Using your specific Base ID (appuKjwEEngthHc6B) and Table ID (tbl4k0Oimc5OTARu0)
    const res = await fetch(`https://api.airtable.com/v0/appuKjwEEngthHc6B/tbl4k0Oimc5OTARu0`, {
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
    console.error('Lead error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
