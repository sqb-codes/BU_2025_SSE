const amqp = require('amqplib');

async function consumeOrders(params) {
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

        console.log("Waiting for messages in queue:", queue);
        
        // Step 4: Consume messages from the queue
        channel.consume(queue, (msg) => {
            if(msg !== null) {
                const order = JSON.parse(msg.content.toString());
                console.log("Received order from queue:", order);
                
                console.log("Sending confirmation email to user:", order.userId);

                // Acknowledge that the message has been processed and remove it from the queue
                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error("Error in consuming orders:", error);
    }
}

module.exports = {consumeOrders};