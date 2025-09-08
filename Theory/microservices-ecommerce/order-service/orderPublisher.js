const amqp = require('amqplib');

async function publishOrder(order) {
    try {
        // Step 1: Connect to RabbitMQ server
        // amqp://localhost:5672
        const connection = await amqp.connect('amqp://localhost:5672');
        // Step 2: Create a channel
        // Channel is a virtual connection inside a real AMQP connection.
        const channel = await connection.createChannel();
        // Step 3: Define a queue
        const queue = 'orderQueue';
        await channel.assertQueue(queue, {
            durable: true
        });
        // durable: true ensures that the queue will survive a broker restart

        // Step 4: Send the message to the queue
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)));
        console.log("Order published to queue:", order);

        // Step 5: Close the connection and channel
        setTimeout(() => {
            channel.close();
            connection.close();
        }, 500);
    } catch (error) {
        console.error("Error in publishing order:", error);
    }
}