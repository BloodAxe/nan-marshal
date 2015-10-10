/*********************************************************************
 * NAN - Native Abstractions for Node.js
 *
 * Copyright (c) 2015 NAN contributors
 *
 * MIT License <https://github.com/nodejs/nan/blob/master/LICENSE.md>
 ********************************************************************/

const test     = require('tap').test
    , testRoot = require('path').resolve(__dirname, '..')
    , bindings = require('bindings')({ module_root: testRoot, bindings: 'primeNumbers' });

test('primeNumbers', function (t) {

  var primes = bindings.GetFirstTenPrimes();
  t.ok(primes.length == 10, 'Retuned ten primes');
  t.ok(primes[0] == 2, 'Prime number at index 0 is correct');
  t.ok(primes[1] == 3, 'Prime number at index 0 is correct');
  t.ok(primes[2] == 5, 'Prime number at index 0 is correct');
  t.ok(primes[3] == 7, 'Prime number at index 0 is correct');
  t.ok(primes[4] == 11, 'Prime number at index 0 is correct');
  t.ok(primes[5] == 13, 'Prime number at index 0 is correct');
  t.ok(primes[6] == 17, 'Prime number at index 0 is correct');
  t.ok(primes[7] == 19, 'Prime number at index 0 is correct');
  t.ok(primes[8] == 23, 'Prime number at index 0 is correct');
  t.ok(primes[9] == 29, 'Prime number at index 0 is correct');
  t.end();
})
