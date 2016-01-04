#!/bin/node
var request = require('supertest');

requestNormal = request('http://nginx.boilerplate/');
requestWww = request('http://www.nginx.boilerplate/');

function handle(err) {
    if (err) {
        console.log(err);
    }
}

requestWww.get('').expect(301, handle);
requestNormal.get('.git').expect(403, handle);
requestNormal.get('').expect(200, handle);
requestNormal.get('some/random/url/').expect(200, handle);
requestNormal.get('dir/script.php').expect(200, 'ok', handle);
requestNormal.get('test.dir/').expect(200, "ok\n", handle);
requestNormal.get('test.dir/index.html').expect(200, "ok\n", handle);
requestNormal.get('/query-string-test/?query=string').expect(200, function (err, res) {
    var match = res.text.match(/\[QUERY_STRING\] => query=string/g);
    if (match === null) {
        console.error('Query parameters were not transferred to Php');
        return false;
    }
});
