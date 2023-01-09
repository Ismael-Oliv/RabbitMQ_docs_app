- # Explanation

  ​	This application was inspired by the will to understand how RabbitQM works and its features and how it can enable an application to be more flexible in its architecture.

  

  ## How the application works!

  ​	Well, each file has a different feature but basically with the same structure. The files that have the same number in their name are related, those files that contain 'emit' means that they are a 'producer', and those that contain 'receiver' is a 'consumer'.

  ***Producer\*** means that you can send a message to some specific consumer or to an exchange that will forward it to all consumer that is available if that is what you want.

  The ***consumer\*** is the one that will receive the message sent from a producer.

  ***Exchange\*** is a "place" that all message goes to and then the exchange sends to a specific consumer or broadcast to the consumers that is available.

  

  ## Execute

  Run ***02-emit_new_task.js\***

  ´npm run emit_new_task ..´ 

  *observation:* 

  - *the message goes directly to the consumer that is listening to the 'task_queue' "event".*
  - *the dots mean how long it going to take for the receiver to return the message.*

  

  Run ***03-emit_logs.js\*** 

  ´npm run emit_logs´

  *observation:* 

  - *This time the message goes to an exchange and the exchange sends whoever is connected to it.*

  

  Run ***04-emit_logs_direct.js\*** 

   ´npm run emit_logs_direct error warning´

  *observation:* 

  - *the message is sent to an exchange but only the consumer that is connected to this exchange and listening to "error" or "warning" "event" will receive it.*

  

  Run ***05-emit_logs_topic.js\*** 

   ´npm run emit_log_topic api.error.bug *.error.*´

  *observation:* 

  - *the message is sent to an exchange but only the consumer that is connected to this exchange and listening to "*api.error.bug*" will receive it or an event that contains "error" on the name.*