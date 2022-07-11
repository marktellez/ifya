const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function PaymentIntents(req, res) {
  const { amount } = req.query;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(amount) * 100,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.json(paymentIntent);
}
