const amqp = require('amqplib');
let channel, connection;

async function connectRabbitMQ(order) {
    try {
        // Step 1: Connect to RabbitMQ server
        // amqp://localhost:5672
        connection = await amqp.connect('amqp://localhost:5672');
        // Step 2: Create a channel
        // Channel is a virtual connection inside a real AMQP connection.
        channel = await connection.createChannel();
        return channel;
    } catch (error) {
        console.error("Error in publishing order:", error);
    }
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
        channel.consume(queue, (msg) => {
            if(msg !== null) {
                const message = JSON.parse(msg.content.toString());
                console.log("Received message from queue:", message);
                
                callback(message);

                // Acknowledge that the message has been processed and remove it from the queue
                channel.ack(msg);
            }
        });
        console.log("Waiting for messages in queue:", queue);
    } catch (error) {
        console.error("Error in consuming orders:", error);
    }
}

module.exports = {connectRabbitMQ, publishMessage, consumeMessage};