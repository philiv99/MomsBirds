require('dotenv').config();

var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();

console.log(__dirname)

// Credentials are supplied at deploy time via environment variables and are never
// committed. Set FTP_USER and FTP_PASSWORD (e.g. in a git-ignored .env, see
// .env.example) before running `npm run deploy`. FTP_HOST is optional.
var config = {
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    host: process.env.FTP_HOST || "ftp.infogoer.com",
    port: 21,
    localRoot: __dirname + "/dist/",
    remoteRoot: "/explore.infogoer.com/wwwroot/momsbirds",
    include: ["*"],
    deleteRemote: false,
    forcePasv: true
};

if (!config.user || !config.password) {
    console.error("FTP_USER and FTP_PASSWORD environment variables are required. Aborting deploy.");
    process.exit(1);
}

// use with promises
ftpDeploy
    .deploy(config)
    .then(res => console.log("finished:", res))
    .catch(err => console.log(err));