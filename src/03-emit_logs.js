const amqp = require("amqplib/callback_api");

amqp.connect("amqp://admin:123@localhost", (connnection_error, connection) => {
  if (connnection_error) throw connnection_error;

  connection.createChannel((channel_error, channel) => {
    if (channel_error) throw channel_error;
    const exchange = "logs";
    const message = process.argv.slice(2).join(" ") || "Hello World";

    channel.assertExchange(exchange, "fanout", { durable: false });

    channel.publish(exchange, "", Buffer.from(message));
    console.log(" [x] Sent %s", message);
  });

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
