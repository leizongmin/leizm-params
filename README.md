[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@leizm/params.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@leizm/params
[travis-image]: https://img.shields.io/travis/leizongmin/leizm-params.svg?style=flat-square
[travis-url]: https://travis-ci.org/leizongmin/leizm-params
[coveralls-image]: https://img.shields.io/coveralls/leizongmin/leizm-params.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/leizongmin/leizm-params?branch=master
[david-image]: https://img.shields.io/david/leizongmin/leizm-params.svg?style=flat-square
[david-url]: https://david-dm.org/leizongmin/leizm-params
[node-image]: https://img.shields.io/badge/node.js-%3E=_6.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/@leizm/params.svg?style=flat-square
[download-url]: https://npmjs.org/package/@leizm/params
[license-image]: https://img.shields.io/npm/l/@leizm/params.svg

# @leizm/params
参数解析基础库

## 安装

```bash
$ npm install @leizm/params
```

## 使用方法

```typescript
import { NumberParam } from '@leizm/params';

const a = new NumberParam('age', '123');
console.log(a.isOk, a.isError, a.value);
// => true, false, 123

const b = new NumberParam('age', 'xyz');
console.log(b.value);
// => throws ParamError: [age] failed to parse number value: xyz
```

## 授权协议

```
MIT License

Copyright (c) 2017 老雷 <leizongmin@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
