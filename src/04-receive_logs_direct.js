const amqp = require("amqplib/callback_api");

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_direct.js [info] [warning] [error");
  process.exit(1);
}

amqp.connect("amqp://admin:123@localhost", (connection_error, connection) => {
  if (connection_error) throw connection_error;

  connection.createChannel((channel_error, channel) => {
    if (channel_error) throw channel_error;

    const exchange = "direct_logs";

    channel.assertExchange(exchange, "direct", {
      durable: false,
    });

    channel.assertQueue(
      "",
      {
        exclusive: false,
      },
      (queue_error, q) => {
        if (queue_error) throw queue_error;

        console.log(" [*] waiting for logs. To exit press CTRL+C");

        args.forEach((severity) => {
          channel.bindQueue(q.queue, exchange, severity);
        });

        channel.consume(
          q.queue,
          (msg) => {
            console.log(" [X] %s: '%s'", msg.fields.routingKey, msg.content.toString());
          },
          {
            noAck: true,
          }
        );
      }
    );
  });
});
