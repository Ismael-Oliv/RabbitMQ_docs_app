const amqp = require("amqplib/callback_api");

amqp.connect("amqp://admin:123@localhost", (error_connection, connection) => {
  if (error_connection) throw error_connection;

  connection.createChannel((error_channel, channel) => {
    if (error_channel) throw error_channel;
    const exchange = "post";

    channel.assertExchange(exchange, "fanout", { durable: false });

    channel.assertQueue(
      "",
      {
        exclusive: true,
      },
      (queue_error, q) => {
        if (queue_error) throw queue_error;
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
        channel.bindQueue(q.queue, exchange, "");

        channel.consume(
          q.queue,
          (msg) => {
            if (msg.content) {
              console.log(" [x] %s", msg.content.toString());
            }
          },
          {
            noAck: true,
          }
        );
      }
    );
  });
});
