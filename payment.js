const stripe = require('stripe')('your-stripe-secret-key');

async function createSubscription(customerId, paymentMethodId, plan) {
    const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ plan }],
        default_payment_method: paymentMethodId
    });
    return subscription;
}

module.exports = { createSubscription };