const amqp = require("amqplib/callback_api");

amqp.connect("amqp://admin:123@localhost", (connection_error, connection) => {
  if (connection_error) throw connection_error;

  connection.createChannel((channel_error, channel) => {
    if (channel_error) throw channel_error;

    const exchange = "topic_logs";
    const args = process.argv.slice(2);

    const key = args.length > 0 ? args[0] : "anonymous.info";
    const msg = args.slice(1).join(" ") || "Hello world";

    channel.assertExchange(exchange, "topic", {
      durable: false,
    });

    channel.publish(exchange, key, Buffer.from(msg));
    console.log(" [X] Sent %s: '%s'", key, msg);
  });

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
