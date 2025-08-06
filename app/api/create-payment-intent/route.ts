import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { PaymentIntentRequest } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: PaymentIntentRequest = await request.json()
    
    const { amount, currency = 'usd', items } = body

    // Validate amount
    if (!amount || amount < 50) { // Stripe minimum is $0.50
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency,
      metadata: {
        itemCount: items.length.toString(),
        items: JSON.stringify(items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.salePrice ?? item.price,
        }))),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
    })

  } catch (error) {
    console.error('Payment intent error:', error)
    
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}