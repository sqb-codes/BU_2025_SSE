const amqp = require('amqplib');
let connection = null;
let channel = null;

/**
 * Connect to RabbitMQ with retry logic
 * @param {number} retries - number of retries
 * @param {number} interval - wait time between retries in ms
 */
async function connectRabbitMQ(retries = 5, interval = 5000) {
    for (let i = 0; i < retries; i++) {
        try {
            // Use Docker service name, not IP
            connection = await amqp.connect("amqp://rabbitmq:5672");

            // Create a channel (virtual connection inside AMQP connection)
            channel = await connection.createChannel();

            console.log("Connected to RabbitMQ");
            return channel;
        } catch (err) {
            console.error(`RabbitMQ connection failed (Attempt ${i + 1}):`, err.message);
            console.log(`Retrying in ${interval / 1000} seconds...`);
            await new Promise((res) => setTimeout(res, interval));
        }
    }

    throw new Error("Cannot connect to RabbitMQ after multiple attempts");
}

async function publishMessage(queue, message) {
    try {
        if(!channel) {
            channel = await connectRabbitMQ();
        }
        await channel.assertQueue(queue, {
            durable: true
        });
        // Step 4: Send the message to the queue
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log("Order published to queue:", message);
    } catch (error) {
        console.error("Error in publishing order:", error);
    }
}

async function consumeMessage(queue, callback) {
    try {
        if(!channel) {
            channel = await connectRabbitMQ();
        }
         // Assert queue BEFORE consuming
        await channel.assertQueue(queue, { durable: true });
        channel.consume(queue, async (msg) => {
            if(msg !== null) {
                const message = JSON.parse(msg.content.toString());
                console.log("Received message from queue:", message);
                
                await callback(message);

                // Acknowledge that the message has been processed and remove it from the queue
                channel.ack(msg);
            }
        });
        console.log("Waiting for messages in queue:", queue);
    } catch (error) {
        console.error("Error in consuming orders:", error);
    }
}

module.exports = {connectRabbitMQ, consumeMessage};