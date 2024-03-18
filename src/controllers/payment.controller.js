import mercadopago from "mercadopago";

export const  createOrder = async (req, res) => {

    mercadopago.configure({
        access_token: "TEST-5204738346854964-031014-7db68dc924bf0f5190d94ae414f6bd3b-1719800591",
    });

    const result = await mercadopago.preferences.create({
        items: [
            {
            title: "Laptop",
            unit_price: 500,
            currency_id: "COL",
            quantity: 1,
        }
    ],
        back_urls: {
            success: "http://localhost:7000/success",
            failure: "http://localhost:7000/failure",
            pending: "http://localhost:7000/pending",
        },
        notification_url: "http://localhost:7000/Webhook"
    });

    console.log(result);

    res.send('creating order');
};

export const receiveWebhook = (req, res) => {
    console.log(req.query);

    res.send("Webhook");
}