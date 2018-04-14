'use strict';

require('http').createServer((req, res) => {
  console.log(req);

  res.writeHead(200, {
    'field': 'data',
  })
  res.write('data1');
  setTimeout(() => res.end('data'), 12000);
  // res.end('data');s
}).listen(8000);