// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import db from '@/lib/db' // ✅ This uses your existing Prisma instance

export async function POST(req: Request) {
  // 1. Get the secret from your .env
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env')
  }

  // 2. Get the headers for verification
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', { status: 400 })
  }

  // 3. Get the body content
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // 4. Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // 5. Verify the payload
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', { status: 400 })
  }

  // 6. Handle the "user.created" event
  const eventType = evt.type
  if (eventType === 'user.created') {
    const { id, email_addresses } = evt.data
    const email = email_addresses[0].email_address

    // ✅ CREATE THE USER IN NEON
    await db.user.create({
      data: {
        clerkId: id,
        email: email,
        plan: 'FREE'
      }
    })
    console.log(`✅ User ${id} successfully synced to Neon database`)
  }

  return new Response('Webhook processed', { status: 200 })
}