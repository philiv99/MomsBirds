var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();

console.log(__dirname)
 
var config = {
    user: "philiv99",
    host: "ftp.infogoer.com",
    port: 21,
    localRoot: __dirname + "/dist/",
    remoteRoot: "/explore.infogoer.com/wwwroot/momsbirds",
    include: ["*"],
    deleteRemote: false,
    forcePasv: true
};
 
// use with promises
ftpDeploy
    .deploy(config)
    .then(res => console.log("finished:", res))
    .catch(err => console.log(err));