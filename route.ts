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

    console.log('--- DIAGNOSTIC START ---')
    console.log('Received Lead:', { name, phone, profileId })
    console.log('Base ID:', process.env.AIRTABLE_BASE_ID)
    console.log('Table Name:', process.env.AIRTABLE_TABLE_NAME)

    if (!name || !phone) {
      return NextResponse.json({ error: 'Missing Name or Phone' }, { status: 400 })
    }

    // 1. Generate AI response
    let aiReply = "Thank you! We will get back to you shortly."
    try {
      const openai = getOpenAI()
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a contractor assistant. Draft a 160 char SMS reply." },
          { role: "user", content: `Lead: ${name}. Message: ${message}` }
        ],
      })
      aiReply = completion.choices[0].message.content || aiReply
      console.log('AI Response Generated:', aiReply)
    } catch (aiErr: any) {
      console.error('AI Error:', aiErr.message)
    }

    // 2. Save lead to Airtable
    const airtableData = {
      records: [{
        fields: {
          "Name": name,
          "Phone": phone,
          "Message": message,
          "AI Response": aiReply,
          "Profile ID": profileId || "default",
          "Status": "New"
        }
      }]
    }

    const airtableUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`
    console.log('Sending to Airtable URL:', airtableUrl)

    const res = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(airtableData)
    })

    const airtableResponse = await res.json()

    if (!res.ok) {
      console.error('--- AIRTABLE ERROR DETAILS ---')
      console.error('Status:', res.status)
      console.error('Full Error:', JSON.stringify(airtableResponse, null, 2))
      return NextResponse.json({ 
        error: `Airtable Error: ${airtableResponse.error?.message || 'Unknown'}` 
      }, { status: 500 })
    }

    console.log('Success! Lead saved to Airtable.')
    console.log('--- DIAGNOSTIC END ---')

    return NextResponse.json({ success: true, aiReply })
  } catch (error: any) {
    console.error('System Error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
