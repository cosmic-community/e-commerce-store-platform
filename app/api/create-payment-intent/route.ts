import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

interface CartItem {
  id: string;
  title: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  quantity: number;
  sku?: string;
  image?: string | null; // Now expecting just the URL string
}

interface CustomerInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerInfo }: { items: CartItem[]; customerInfo: CustomerInfo } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Items are required' }, { status: 400 });
    }

    if (!customerInfo || !customerInfo.email) {
      return NextResponse.json({ error: 'Customer email is required' }, { status: 400 });
    }

    // Calculate total amount from items
    const totalAmount = items.reduce((sum: number, item: CartItem) => {
      const effectivePrice = item.salePrice || item.price;
      return sum + (effectivePrice * item.quantity);
    }, 0);

    // Create line items for Stripe Checkout
    const lineItems = items.map((item: CartItem) => {
      const effectivePrice = item.salePrice || item.price;
      const productName = item.title || item.name;
      
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: productName,
            // Only include images if they exist and are valid URLs
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(effectivePrice * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'}/checkout`,
      customer_email: customerInfo.email,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      metadata: {
        customerName: customerInfo.fullName || '',
        customerEmail: customerInfo.email,
        customerAddress: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}`,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      totalAmount: totalAmount,
    });

  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}