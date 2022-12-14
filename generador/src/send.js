
var amqp = require('amqplib/callback_api');

// Conectarse al server Rabbit
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'sumas';

        var num1 = Math.round(Math.random()*100);
        var num2 = Math.round(Math.random()*100);

        var msg = '{"num1":'+num1+',"num2":'+num2+'}';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" >> Solicito la suma de %s mas %s", num1, num2);
        
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});


