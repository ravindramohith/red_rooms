import Room from "../models/Room";
import User from "../models/User";
import Booking from "../models/Booking";
import ErrorHandler from "../utils/errorController";
import catchAsync from "../middlewares/catchAsync";
import APIFeatures from "../utils/apiFeatures";
import absoluteUrl from "next-absolute-url";
import getRawBody from "raw-body";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const stripeCheckoutSession = catchAsync(async (req, res) => {
  const room = await Room.findById(req.query.roomId);

  const { checkInDate, checkOutDate, daysOfStay } = req.query;

  // Get origin
  const { origin } = absoluteUrl(req);

  // Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${origin}/bookings/me`,
    cancel_url: `${origin}/room/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
      {
        price_data: {
          currency: "inr",
          unit_amount: req.query.amount * 100,
          product_data: {
            name: room.name,
            images: [`${room.images[0].url}`],
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  res.status(200).json(session);
});

export const webhookCheckout = catchAsync(async (req, res) => {
  console.log("hai", process.env.STRIPE_WEBHOOK_SECRET);
  const rawBody = await getRawBody(req);
  try {
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const room = session.client_reference_id;
      const user = (await User.findOne({ email: session.customer_email })).id;

      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const checkInDate = session.metadata.checkInDate;
      const checkOutDate = session.metadata.checkOutDate;
      const daysOfStay = session.metadata.daysOfStay;

      const booking = await Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });
      console.log("booking");
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log("Error in Stripe Checkout Payment", error);
  }
});
