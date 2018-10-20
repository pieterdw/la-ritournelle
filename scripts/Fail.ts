var Twilio = require('twilio');

var client = new Twilio('AC437e7ed94d29c261b1f9ce8fd32be152', 'e9471789102987d56cde48576909f413');
client.messages
  .create({
    body:
      'La Ritournelle deployment failed! More details: https://gitlab.com/straffekoffie-websites/la-ritournelle/pipelines',
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+32472735666'
  })
  .then(message => console.log(message.sid))
  .done();
