const mock = {};
// require('fs').readdirSync(require('path').join(__dirname + '/src/mock'))
//     .forEach(function(file) {
//     Object.assign(mock, require('./src/mock/' + file))
// });
const fs = require("fs");
console.log('3333');
// process.stdout.write('dirname=' + __dirname +"\n");
const root = require('path').join(__dirname+ '/src/mock/');
fs.readdirSync(root).forEach((item) => {
    // const info = fs.statSync(root+"/"+item);
    // console.log('item='+ item);
    // console.log(info);
    Object.assign(mock, require(root  + item))
});

module.exports = mock;
