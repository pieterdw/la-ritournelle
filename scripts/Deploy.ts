var FtpDeploy = require('ftp-deploy');
var Twilio = require('twilio');

var ftpDeploy = new FtpDeploy();

var config = {
  user: 'deploy-ftp@vakantiehuisantibes.com',
  password: '_I#-fnGZCIl-',
  host: 'ftp.straffekoffie.be',
  port: 21,
  localRoot: './dist',
  remoteRoot: '/',
  include: ['*', '**/*', '.*'],
  exclude: [],
  deleteRemote: true
};

ftpDeploy
  .deploy(config)
  .then(() => {
    var client = new Twilio('AC437e7ed94d29c261b1f9ce8fd32be152', 'e9471789102987d56cde48576909f413');
    client.messages
      .create({
        body: 'La Ritournelle has been deployed!',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+32472735666'
      })
      .then(message => console.log(message.sid))
      .done();
  })
  .catch(err => console.log(err));
