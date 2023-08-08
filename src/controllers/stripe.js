const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/order");

const create = async (req, res) => {
    const { imgSrc, name, price } = req.body;

    try {
        const product = await stripe.products.create({
            name,
            images: [imgSrc],
            default_price_data: {
                currency: "aud",
                unit_amount: price * 100,
            },
        });

        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.raw.message });
    }
};

const update = async (req, res) => {
    const { productId, priceId } = req.params;
    const { name, price } = req.body;

    try {
        let priceResponse = null;
        if (priceId && price) {
            priceResponse = await stripe.prices.create({
                unit_amount: price * 100,
                currency: "aud",
                product: productId,
            });
        }
        const priceConfig = priceResponse
            ? { default_price: priceResponse.id }
            : {};
        const product = await stripe.products.update(productId, {
            name,
            ...priceConfig,
        });
        if (priceId && price) {
            await stripe.prices.update(priceId, {
                active: false,
            });
        }
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.raw.message });
    }
};

const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        await stripe.products.update(productId, { active: false });
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send({ error: error.raw.message });
    }
};

const checkout = async (req, res) => {
    const { productList, customerEmail, metadata } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: productList,
            mode: "payment",
            customer_email: customerEmail,
            success_url: `https://64d260d018f27023d7a8d884--starlit-palmier-3e44c4.netlify.app/?success=true`,
            cancel_url: `https://64d260d018f27023d7a8d884--starlit-palmier-3e44c4.netlify.app/?canceled=true`,
            metadata,
        });

        return res.status(200).send({ url: session.url });
    } catch (error) {
        return res.status(500).send({ error: error.raw.message });
    }
};

const webhooks = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    if (event.type === "checkout.session.completed") {
        const { products, user } = event.data.object.metadata;

        const newOrder = new Order({
            products: JSON.parse(products),
            user,
        });
        await newOrder.save();
        return res.status(200).send("successful");
    }

    return res.sendStatus(200);
};

module.exports = { create, update, deleteProduct, checkout, webhooks };
