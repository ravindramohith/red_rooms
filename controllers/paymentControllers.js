import Room from "../models/Room"
import User from "../models/User"
import Booking from "../models/Booking"
import ErrorHandler from "../utils/errorController"
import catchAsync from "../middlewares/catchAsync"
import APIFeatures from "../utils/apiFeatures"
import absoluteUrl from "next-absolute-url"
import getRawBody from "raw-body"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export const stripeCheckoutSession = catchAsync(async (req, res) => {

    const room = await Room.findById(req.query.roomId);

    const { checkInDate, checkOutDate, daysOfStay } = req.query;

    // Get origin
    const { origin } = absoluteUrl(req);

    // Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${origin}/bookings/me`,
        cancel_url: `${origin}/room/${room._id}`,
        customer_email: req.user.email,
        client_reference_id: req.query.roomId,
        metadata: { checkInDate, checkOutDate, daysOfStay },
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    unit_amount: req.query.amount * 100,
                    product_data: {
                        name: room.name,
                        images: [`${room.images[0].url}`],
                    }
                },
                quantity: 1,
            }
        ],
        mode: 'payment'
    })

    res.status(200).json(session)

})

export const webhookCheckout = catchAsync(async (req, res) => {
    const rawBody = await getRawBody(req)
    try {
        const signature = req.headers['stripe-signature']
        const event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET)

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const room = session.client_reference_id;
            const user = (await User.findOne({ email: session.customer_email })).id;

            const amountPaid = session.amount_total / 100;

            const paymentInfo = {
                id: session.payment_intent,
                status: session.payment_status
            }

            const checkInDate = session.metadata.checkInDate
            const checkOutDate = session.metadata.checkOutDate
            const daysOfStay = session.metadata.daysOfStay

            const booking = await Booking.create({
                room,
                user,
                checkInDate,
                checkOutDate,
                daysOfStay,
                amountPaid,
                paymentInfo,
                paidAt: Date.now()
            })

            res.status(200).json({ success: true })
        }
    } catch (error) {
        console.log('Error in Stripe Checkout Payment', error);
    }

})

const D = { "id": "cs_test_a1G04iXtwkF9d56uCrQmR8tznyZG7yRB4x50J2sxcGBEjtPTUFay185rmG", "object": "checkout.session", "after_expiration": null, "allow_promotion_codes": null, "amount_subtotal": 1000, "amount_total": 1000, "automatic_tax": { "enabled": false, "status": null }, "billing_address_collection": null, "cancel_url": "http://localhost:3000/room/639a34cf27f14d5bc0b5f379", "client_reference_id": "639a34cf27f14d5bc0b5f379", "consent": null, "consent_collection": null, "created": 1671222992, "currency": "inr", "custom_text": { "shipping_address": null, "submit": null }, "customer": null, "customer_creation": "if_required", "customer_details": { "address": null, "email": "user10@gmail.com", "name": null, "phone": null, "tax_exempt": "none", "tax_ids": null }, "customer_email": "user10@gmail.com", "expires_at": 1671309392, "invoice": null, "invoice_creation": { "enabled": false, "invoice_data": { "account_tax_ids": null, "custom_fields": null, "description": null, "footer": null, "metadata": {}, "rendering_options": null } }, "livemode": false, "locale": null, "metadata": {}, "mode": "payment", "payment_intent": null, "payment_link": null, "payment_method_collection": "always", "payment_method_options": {}, "payment_method_types": ["card"], "payment_status": "unpaid", "phone_number_collection": { "enabled": false }, "recovered_from": null, "setup_intent": null, "shipping_address_collection": null, "shipping_cost": null, "shipping_details": null, "shipping_options": [], "status": "open", "submit_type": null, "subscription": null, "success_url": "http://localhost:3000/bookings/me", "total_details": { "amount_discount": 0, "amount_shipping": 0, "amount_tax": 0 }, "url": "https://checkout.stripe.com/c/pay/cs_test_a1G04iXtwkF9d56uCrQmR8tznyZG7yRB4x50J2sxcGBEjtPTUFay185rmG#fidkdWxOYHwnPyd1blpxYHZxWjA0SENvdnFWTGF3TzVpd11dYmtOcTNzRmlON3JHa2Rva2FQYW9mfVVIbmZ9M0E2cTRERGBqakdydVdwVDZvXHwyRFxKbU5EfGBgM1NwU050c3dJTXJkbDc0NTVsUUJGQU1uaycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl" }
