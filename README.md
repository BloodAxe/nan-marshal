Data type marshalling for C++ addons in Nodejs
===============================

[![Build Status](https://travis-ci.org/BloodAxe/nan-marshal.png?branch=master)](https://travis-ci.org/BloodAxe/nan-marshal)

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

## Requirements

This module requires [Nan][nan] package. If you are not using [Nan][nan] already for writing C++ addons for Nodejs I strongly avdise you to start doing that. Anyway, ``npm install --save nan`` is a right way to start.

## Usage

Simply add **nan-marshal** as a dependency module to *package.json* of your Node addon:

``` bash
$ npm install --save nan-marshal
```

Add include directories for **NAN** and **NAN-Marshal** in your *binding.gyp* so that you can use `#include <nan-marshal.h>` in your *.cpp* files:

```python
"include_dirs" : [
    "<!(node -e \"require('nan')\")",
    "<!(node -e \"require('nan-marshal')\")"
]
```

This works like a `-I<path-to-nan-marshal>` when compiling your addon.

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

User-defined serialization inspired by boost::serialization approach and you will find it similar and easy-to-use. Here's quick example of non-intrusive serialization of the OpenCV data type:

```cpp
namespace Nan
{
    namespace marshal
    {
        template<typename T>
        struct Serializer < cv::Rect_<T> >
        {
            template<typename InputArchive>
            static inline void load(InputArchive& ar, cv::Rect_<T>& val)
            {
                ar & make_nvp("x", val.x);
                ar & make_nvp("y", val.y);
                ar & make_nvp("width", val.width);
                ar & make_nvp("height", val.height);
            }

            template<typename OutputArchive>
            static inline void save(OutputArchive& ar, const cv::Rect_<T>& val)
            {
                ar & make_nvp("x", val.x);
                ar & make_nvp("y", val.y);
                ar & make_nvp("width", val.width);
                ar & make_nvp("height", val.height);
            }
        };
    }
}
```

Having a snippet above in your code lets you to return JavaScript object like ``{ x:12, y:13, width:124, height: 144 }`` from C++ code. The same is true for V8 -> C++ marshalling. Nan::Marshal will convert V8 object to desired object type.
 
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


[nan]: https://github.com/nodejs/nan
[nan-marshal]: https://github.com/BloodAxe/nan-marshal
