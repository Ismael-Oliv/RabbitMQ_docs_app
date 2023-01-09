const amqp = require("amqplib/callback_api");

amqp.connect("amqp://admin:123@localhost", (error_connection, connection) => {
  if (error_connection) throw error_connection;

  connection.createChannel((error_channel, channel) => {
    if (error_channel) throw error_channel;
    const queue = "task_queue";

    channel.assertQueue(queue, {
      durable: true,
    });

    channel.prefetch(1);

    channel.consume(
      queue,
      (msg) => {
        const secs = msg.content.toString().split(".").length - 1;
        console.log(" [x] Received %s", msg.content.toString());

        setTimeout(() => {
          console.log(" [X] Done");
        }, secs * 1000);
      },
      {
        noAck: false,
      }
    );
  });
});
