const amqp = require("amqplib/callback_api");

amqp.connect("amqp://admin:123@localhost", (connection_error, connection) => {
  if (connection_error) throw connection_error;

  connection.createChannel((channel_error, channel) => {
    if (channel_error) throw channel_error;

    const exchange = "direct_logs";
    const args = process.argv.slice(2);
    const msg = args.slice(1).join(" ") || "Hellow World";
    const severity = args.length > 0 ? args[0] : "info";
    console.log(severity);

    channel.assertExchange(exchange, "direct", { durable: false });
    channel.publish(exchange, severity, Buffer.from(msg));

    console.log(" [X] Sent %s: '%s'", severity, msg);
  });

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
