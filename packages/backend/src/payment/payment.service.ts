import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async createSubscription(companyId: string, planId: string) {
    const prices = {
      basic: 'price_basic_monthly',
      professional: 'price_professional_monthly',
      enterprise: 'price_enterprise_monthly'
    };

    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: prices[planId as keyof typeof prices],
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      metadata: {
        companyId
      }
    });

    return { url: session.url };
  }

  async handleWebhook(signature: string, payload: Buffer) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        if (session.metadata?.companyId) {
          await this.activateSubscription(session.metadata.companyId, session.subscription as string);
        }
        break;
      
      case 'invoice.paid':
        await this.handleInvoicePaid(event.data.object);
        break;
      
      case 'customer.subscription.deleted':
        await this.cancelSubscription(event.data.object);
        break;
    }

    return { received: true };
  }

  private async activateSubscription(companyId: string, subscriptionId: string) {
    const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
    
    await this.prisma.subscription.upsert({
      where: { companyId },
      update: {
        stripeSubscriptionId: subscriptionId,
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        planId: subscription.items.data[0].price.id
      },
      create: {
        companyId,
        stripeSubscriptionId: subscriptionId,
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        planId: subscription.items.data[0].price.id
      }
    });
  }

  private async handleInvoicePaid(invoice: any) {
    // Handle paid invoice
    console.log('Invoice paid:', invoice.id);
  }

  private async cancelSubscription(subscription: any) {
    // Handle cancelled subscription
    console.log('Subscription cancelled:', subscription.id);
  }
}