/*********************************************************************
 * NAN - Native Abstractions for Node.js
 *
 * Copyright (c) 2015 NAN contributors
 *
 * MIT License <https://github.com/nodejs/nan/blob/master/LICENSE.md>
 ********************************************************************/

#include <nan.h>
#include <nan-marshal.h>

NAN_METHOD(GetFirstTenPrimes) {

    std::vector<int> primes = {
      2,
      3,
      5,
      7,
      11,
      13,
      17,
      19,
      23,
      29
    };

    info.GetReturnValue().Set(Nan::Marshal(primes));
}

NAN_MODULE_INIT(Init) {
    using namespace Nan;
    NAN_EXPORT(target, GetFirstTenPrimes);
}

NODE_MODULE(primeNumbers, Init)
