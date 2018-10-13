var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
  user: 'deploy-ftp@vakantiehuisantibes.com',
  password: '_I#-fnGZCIl-',
  host: 'ftp.straffekoffie.be',
  port: 21,
  localRoot: './dist',
  remoteRoot: '/',
  include: ['*', '**/*'],
  exclude: [],
  deleteRemote: true
};

ftpDeploy
  .deploy(config)
  .then(() => console.log('finished'))
  .catch(err => console.log(err));
