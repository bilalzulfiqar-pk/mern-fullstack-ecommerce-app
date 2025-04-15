// import stripe
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // your test secret key

// Create payment intent
const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    // Stripe expects amount in cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),  // Stripe works in cents
      currency: 'usd',
      description: 'E-commerce Payment',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
};

module.exports = { createPaymentIntent };
