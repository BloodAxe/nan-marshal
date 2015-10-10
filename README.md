Data type marshalling for C++ addons in Nodejs
===============================

This project contains some helper utilities that make native addon development a bit more easier.

 * **[Example](#example)**
 * **[Usage](#usage)**
 * **[API](#api)**
 * **[Tests](#tests)**

<a name="example"></a>
## Example

```cpp
NAN_METHOD(GetFirstNPrimes) {
    
    int numberOfPrimes = Nan::Marshal<int>(info[0]);
    std::vector<int> primes = computeNPrimes(numberOfPrimes);
    info.GetReturnValue().Set(Nan::Marshal(primes));
}
```

<a name="usage"></a>
## Usage

Simply add **nan-marshal** as a dependency in the *package.json* of your Node addon:

``` bash
$ npm install --save nan nan-marshal
```
Pull in the path to **NAN** and **NAN-Marshal** in your *binding.gyp* so that you can use `#include <nan-Marshal.h>` in your *.cpp* files:

``` python
"include_dirs" : [
    "<!(node -e \"require('nan')\")",
    "<!(node -e \"require('nan-marshal')\")"
]
```

This works like a `-I<path-to-NAN-Marshal>` when compiling your addon.

<a name="api"></a>
## API

There is a single all-purpose function: ``Nan::Marshal``. To convert from V8 object to C++ type, use it as follows: ``Nan::Marshal<Dst>(V8 object)``. 
To convert from C++ to V8 object: ``Nan::Marshal(..)``. 

``Nan::Marshal`` supports following types out of the box:
- Built-in C++ types
- std::string
- std::vector
- std::map
- std::shared_ptr
- Marshalling of used-defined types (There are intrusive and non-intrusive options available)


<a name="tests"></a>
### Tests

To run the NAN-Marshal tests do:

``` sh
npm install
npm run-script rebuild-tests
npm test
```

Or just:

``` sh
npm install
make test
```

## Licence &amp; copyright

Copyright (c) 2015 Ievgen Khvedchenia.

Native Abstractions for Node.js is licensed under an MIT license. 
All rights not explicitly granted in the MIT license are reserved. 
See the included LICENSE file for more details.
