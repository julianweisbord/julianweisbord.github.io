// run this after commit to update data.json file
// need to update this from julianweisbord.github.io and then commit a second time
// $ node ./scripts/main.js
var fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;

var DATA = 'assets/data.json';

function modify(data, callback) {
  exec("git log | grep Date", function (error, stdout, stderr) {
    console.log(stdout);
    data["date"] = stdout.replace("Date", "Last Updated");
    callback();
  });
};

fs.readFile('assets/data.json', function (err, data) {
  var existing = {};
  if (!err) {
    existing = JSON.parse(data.toString());
  }
  console.log(existing);
  modify(existing, function () {
    fs.writeFileSync('assets/data.json', JSON.stringify(existing));
  });
});
