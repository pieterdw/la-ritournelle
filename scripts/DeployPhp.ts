var FtpDeploy = require('ftp-deploy');

var ftpDeploy = new FtpDeploy();

var config = {
  user: 'deploy-ftp@vakantiehuisantibes.com',
  password: '_I#-fnGZCIl-',
  host: 'ftp.straffekoffie.be',
  port: 21,
  localRoot: './public',
  remoteRoot: '/',
  include: ['*.php'],
  exclude: [],
  deleteRemote: false
};

ftpDeploy
  .deploy(config)
  .then(() => {
    console.log('Files uploaded!');
  })
  .catch(err => console.log(err));
