
var amqp = require('amqplib/callback_api');

// Conectarse al servidor RabbitMQ
// Forzamos frameMax >= 8192 (requisito en RabbitMQ 4+) para que no falle el
// handshake al negociar parámetros de conexión.
amqp.connect({
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    frameMax: 0xFFFF
}, function(error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'sumas';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Esperando por mensajes en la cola [ %s ]. Para finalizar presione CTRL+C", queue);

        // Consumir un mensaje si está disponible
        channel.consume(queue, function(msg) {
            var sumar = JSON.parse(msg.content);
            var res = sumar.num1 + sumar.num2;
            console.log(` >> Me solicitaron sumar ${sumar.num1} y ${sumar.num2}, el resultado es  ${res}`);
        }, {
            noAck: true
        });
    });
});
