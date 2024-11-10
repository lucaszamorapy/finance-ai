//localhost:3000/api/webhooks/stripe rota do webhook

import { clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import Stripe from "stripe"


export const POST = async (req: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEB_HOOK_SECRET) {
    return NextResponse.error();
  }
  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.error()
  }
  const text = await req.text()
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia"
  })
  const events = stripe.webhooks.constructEvent(text, signature, process.env.STRIPE_WEB_HOOK_SECRET)

  switch (events.type) {
    //adicionar assinatura
    case "invoice.paid":
      //atualizar o usuário com o seu novo plano
      const { customer, subscription, subscription_details } = events.data.object
      const clerkUserId = subscription_details?.metadata?.clerk_user_id
      if (!clerkUserId) {
        return NextResponse.error();
      }
      (await clerkClient()).users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubscriptionId: subscription,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });
      break;
    //cancelar assinatura
    case "customer.subscription.deleted": {
      const subscription = await stripe.subscriptions.retrieve(
        events.data.object.id
      );
      const clerkUserId = subscription.metadata?.clerk_user_id
      if (!clerkUserId) {
        return NextResponse.error();
      }
      (await clerkClient()).users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      });
    }
  }
  return NextResponse.json({ received: true }) //status 200
}