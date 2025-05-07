function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = !0, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};
function stringifyPrimitive(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
}

function stringify (obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
}
function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

function parse(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
}var qs = {
  encode: stringify,
  stringify: stringify,
  decode: parse,
  parse: parse
};

var defaultHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "no-cache"
};
function syncAjax(url, method, data) {
  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var async = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var xhr = new XMLHttpRequest();

  // 初始化请求，第三个参数设为 false，表示同步请求
  xhr.open(method, url, async);

  // 设置请求头
  var combinedHeaders = _objectSpread2(_objectSpread2({}, defaultHeaders), headers);
  for (var key in combinedHeaders) {
    xhr.setRequestHeader(key, combinedHeaders[key]);
  }

  // 发送请求
  if (method.toUpperCase() === "POST") {
    xhr.send(JSON.stringify(data)); // 发送 POST 请求时需要传递数据
  } else {
    xhr.send(); // GET 请求不需要数据
  }

  // 确保请求完成后才返回响应结果
  // 暂时只有同步请求有返回值
  if (!async) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      return JSON.parse(xhr.responseText); // 返回响应内容
    } else {
      console.error("Request failed with status: " + xhr.status);
      return null; // 请求失败时返回 null
    }
  }
}
var Ajax = /*#__PURE__*/function () {
  function Ajax() {
    _classCallCheck(this, Ajax);
  }
  return _createClass(Ajax, [{
    key: "get",
    value: function get(url, params) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var async = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var reqUrl = url;
      return syncAjax(params ? "".concat(reqUrl, "?").concat(qs.stringify(params)) : reqUrl, "GET", headers, async);
    }
  }, {
    key: "post",
    value: function post(url, data) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var async = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      return syncAjax(url, "POST", data, headers, async);
    }
  }, {
    key: "delete",
    value: function _delete(url) {
      var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var async = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return syncAjax(url, "DELETE", null, headers, async);
    }
  }]);
}();

var ImageManager = /*#__PURE__*/function () {
  function ImageManager(root) {
    _classCallCheck(this, ImageManager);
    this.root = root;
    this.img = null;
  }
  return _createClass(ImageManager, [{
    key: "createImage",
    value: function createImage(src) {
      var _this = this;
      return new Promise(function (resolve) {
        var img = new Image();
        Object.assign(img.style, {
          position: "absolute",
          objectFit: "cover",
          // 驼峰式替代连字符写法
          transform: "translateZ(0)",
          willChange: "transform" // 统一属性命名格式
        });
        img.onload = function () {
          if (_this.root && _this.root.parentNode) {
            _this.img = img;
            _this.root.parentNode.appendChild(img);
            _this.updatePosition();
            _this.hideImage();
            resolve();
          }
        };
        img.src = src;
      });
    }
  }, {
    key: "updateImage",
    value: function updateImage(src) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        if (!_this2.img) return;

        // 清理旧监听器防止重复触发
        _this2.img.onload = null;
        _this2.img.onerror = null; // 新增错误监听清理

        var handleLoad = function handleLoad() {
          _this2.img.onerror = null; // 清理错误监听
          _this2.updatePosition();
          _this2.showImage();
          resolve();
        };
        var handleError = function handleError() {
          _this2.img.onload = null; // 清理成功监听
          reject();
        };
        _this2.img.onload = handleLoad;
        _this2.img.onerror = handleError; // 添加错误处理器

        _this2.img.src = src;
      });
    }
  }, {
    key: "updatePosition",
    value: function updatePosition() {
      if (!this.img) return;
      var img = this.img;
      var _this$root$getBoundin = this.root.getBoundingClientRect(),
        top = _this$root$getBoundin.top,
        left = _this$root$getBoundin.left,
        width = _this$root$getBoundin.width,
        height = _this$root$getBoundin.height;
      var border = 4;
      if (!img.style.top) {
        img.style.top = top + document.body.scrollTop + border + "px";
      }
      if (!img.style.left) {
        img.style.left = left - border + "px";
      }
      img.width = width;
      img.height = height;
      img.style.width = width + "px";
      img.style.height = height + "px";
    }
  }, {
    key: "showImage",
    value: function showImage() {
      if (!this.img) return;
      this.img.style.opacity = "1";
    }
  }, {
    key: "hideImage",
    value: function hideImage() {
      if (!this.img) return;
      this.img.style.opacity = "0";
    }
  }]);
}();

function handleParams(params) {
  return params.map(function (param) {
    var type = _typeof(param);
    switch (type) {
      case "boolean":
        return {
          type: "BOOL",
          value: param
        };
      case "number":
        return {
          type: "LONG",
          value: param
        };
      case "object":
        return {
          type: "IDISPATCH",
          value: param.service.caller
        };
      default:
        return {
          type: "BSTR",
          value: String(param)
        };
    }
  });
}
function parseParams(params) {
  var result = [];
  params.forEach(function (param) {
    var type = param.type,
      value = param.value;
    switch (type) {
      case "BOOL":
        var val = value == "true" ? true : false;
        result.push(val);
        break;
      case "BSTR":
        result.push(value.toString());
        break;
      case "LONG":
        result.push(Number(value));
        break;
      default:
        result.push(value);
    }
  });
  return result;
}
function isInnerIframe() {
  return window.parent !== window.self;
}

var ajax = new Ajax();
function handleRequest(url, reqBody) {
  var async = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var errorMsg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Request 请求异常";
  var params = new URLSearchParams({
    product: "iWebOffice"
  });
  var reqUrl = "".concat(url, "?").concat(params);
  if (self.registration) {
    fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqBody)
    });
  } else {
    if (async) {
      ajax.post(reqUrl, reqBody, {}, async);
    } else {
      var response = ajax.post(reqUrl, reqBody, {}, async);
      if (response.value !== "none" && response.value !== "Failed no method") {
        return response;
      } else {
        throw new Error(errorMsg);
      }
    }
  }
}
var Service = /*#__PURE__*/function () {
  function Service(baseUrl, caller) {
    _classCallCheck(this, Service);
    _defineProperty(this, "baseUrl", void 0);
    _defineProperty(this, "caller", void 0);
    this.baseUrl = baseUrl;
    this.caller = caller;
  }
  return _createClass(Service, [{
    key: "ReqUrl",
    value: function ReqUrl() {
      var bit = this.GetBit();
      var reqUrl = "https://local.kinggrid.com:9582/api/Midware/v1/kgmidware/requrl?bit=".concat(bit, "&product=iWebOffice");
      var response = ajax.get(reqUrl);
      this.response = response;
      var httpsurl = response.httpsurl;
      if (httpsurl) {
        this.baseUrl = httpsurl;
        return this.baseUrl;
      } else {
        throw new Error("ReqUrl 请求异常");
      }
    }
  }, {
    key: "GetURL",
    value: function GetURL() {
      return this.response;
    }
  }, {
    key: "GetBrowser",
    value: function GetBrowser() {
      var userAgent = navigator.userAgent;
      var userAgent = userAgent.toLowerCase();
      var browser;
      var index = userAgent.indexOf("edg/");
      if (index < 0) {
        index = userAgent.indexOf("qihu 360ee");
        if (index < 0) {
          index = userAgent.indexOf("qihu 360se");
          if (index < 0) {
            browser = "chrome.exe";
          } else browser = "360se.exe";
        } else browser = "360chrome.exe";
      } else {
        browser = "msedge.exe";
      }
      return browser;
    }
  }, {
    key: "GetBit",
    value: function GetBit() {
      try {
        // 尝试分配 4GB 内存（仅 64 位浏览器支持）
        new WebAssembly.Memory({
          initial: 65536,
          maximum: 65536
        }); // 65536 * 64KB = 4GB
        return "64";
      } catch (error) {
        return "32";
      }
    }
  }, {
    key: "GetInterface",
    value: function GetInterface() {
      var baseUrl = this.baseUrl;
      var browser = this.GetBrowser();
      var reqUrl = baseUrl + "/GetInterface?product=iWebOffice";
      var reqBody = {
        progid: "Kinggrid.iWebOffice.1",
        interface: "",
        browser: browser
      };
      var response = ajax.post(reqUrl, {
        GetInterface: reqBody
      });
      if (response.value && response.value !== "none") {
        this.caller = response.value;
        this.dpi = response.dpi ? response.dpi / 100 : 1;
        return this.caller;
      } else {
        throw new Error("GetInterface 请求异常");
      }
    }
  }, {
    key: "GetDPR",
    value: function GetDPR() {
      return this.dpi;
    }
  }, {
    key: "GetPic",
    value: function GetPic() {
      var baseUrl = this.baseUrl;
      var reqUrl = baseUrl + "/GetPic";
      var scale = 100; //Math.floor(window.devicePixelRatio * 100);
      var reqBody = {
        GetPic: {
          params: handleParams([scale])
        }
      };
      var errorMsg = "GetPic \u8BF7\u6C42\u5F02\u5E38";
      return handleRequest(reqUrl, reqBody, false, errorMsg);
    }
  }, {
    key: "Focus",
    value: function Focus() {
      var baseUrl = this.baseUrl;
      var reqUrl = baseUrl + "/Focus";
      var reqBody = {
        Focus: {}
      };
      var errorMsg = "Focus \u8BF7\u6C42\u5F02\u5E38";
      return handleRequest(reqUrl, reqBody, false, errorMsg);
    }
  }, {
    key: "MethodCall",
    value: function MethodCall(func, params) {
      var baseUrl = this.baseUrl,
        caller = this.caller;
      var reqUrl = baseUrl + "/MethodCall";
      var reqBody = {
        MethodCall: {
          caller: caller,
          function: func
        }
      };
      var errorMsg = "MethodCall \u8BF7\u6C42\u5F02\u5E38: ".concat(func);
      if (params) {
        reqBody.MethodCall.params = handleParams(params);
      }

      // console.log("🚀 ~ Service ~ MethodCall ~ reqBody:", reqBody);

      window.__iWebOffice2015__.MethodCall += 1;
      return handleRequest(reqUrl, reqBody, false, errorMsg);
    }
  }, {
    key: "EventList",
    value: function EventList(events) {
      var baseUrl = this.baseUrl,
        caller = this.caller;
      var reqUrl = baseUrl + "/EventList";
      var reqBody = {
        EventList: {
          caller: caller,
          events: events
        }
      };
      var errorMsg = "EventList \u8BF7\u6C42\u5F02\u5E38: ".concat(events);
      return handleRequest(reqUrl, reqBody, errorMsg);
    }
  }, {
    key: "PropPut",
    value: function PropPut(prop, value) {
      var baseUrl = this.baseUrl,
        caller = this.caller;
      var reqUrl = baseUrl + "/MethodCall";
      var reqBody = {
        PropPut: {
          caller: caller,
          propname: prop
        }
      };
      var errorMsg = "PropPut \u8BF7\u6C42\u5F02\u5E38: ".concat(prop, "=").concat(value);
      reqBody.PropPut.params = handleParams([value]);

      // console.log("🚀 ~ Service ~ PropPut ~ reqBody:", reqBody);
      window.__iWebOffice2015__.PropPut += 1;
      return handleRequest(reqUrl, reqBody, false, errorMsg);
    }
  }, {
    key: "PropPutPkg",
    value: function PropPutPkg(cacheSetPropertyMap) {
      var baseUrl = this.baseUrl,
        caller = this.caller;
      var reqUrl = baseUrl + "/MethodCall";
      var reqBody = {
        PropPutPkg: []
      };
      var errorMsg = "PropPutPkg \u8BF7\u6C42\u5F02\u5E38: ".concat(JSON.stringify(cacheSetPropertyMap));
      for (var key in cacheSetPropertyMap) {
        reqBody.PropPutPkg.push({
          caller: caller,
          propname: key,
          params: handleParams([cacheSetPropertyMap[key]])
        });
      }

      // console.log("🚀 ~ Service ~ PropPutPkg ~ reqBody:", reqBody);
      window.__iWebOffice2015__.PropPutPkg += 1;
      try {
        handleRequest(reqUrl, reqBody, false, errorMsg);
      } catch (error) {
        console.error(error);
      }
    }
  }, {
    key: "PropGet",
    value: function PropGet(prop) {
      var baseUrl = this.baseUrl,
        caller = this.caller;
      var reqUrl = baseUrl + "/MethodCall";
      var reqBody = {
        PropGet: {
          caller: caller,
          propname: prop
        }
      };
      var errorMsg = "PropGet \u8BF7\u6C42\u5F02\u5E38: ".concat(prop);
      // console.log("🚀 ~ Service ~ PropGet ~ reqBody:", reqBody);
      window.__iWebOffice2015__.PropGet += 1;
      return handleRequest(reqUrl, reqBody, false, errorMsg);
    }
  }]);
}();

var BaseMiddleware = /*#__PURE__*/function () {
  function BaseMiddleware() {
    _classCallCheck(this, BaseMiddleware);
    _defineProperty(this, "service", new Service());
    _defineProperty(this, "methods", []);
    _defineProperty(this, "cacheSetPropertyMap", {});
    // 缓存属性设置
    _defineProperty(this, "_enableCacheSetProperty", false);
    // 是否需要缓存属性设置请求
    _defineProperty(this, "_propertiesWithoutCache", ["Copyright"]);
  }
  return _createClass(BaseMiddleware, [{
    key: "handleHidePluginAction",
    value:
    // 不需要缓存的属性设置

    /**
     * 独立处理HidePlugin操作
     */
    function handleHidePluginAction(params) {
      var actionType = Number(params[0]);
      switch (actionType) {
        case 0:
          return __iWebOffice2015__.hideWebOffice();
        case 1:
          return __iWebOffice2015__.showWebOffice();
        default:
          console.warn("Unsupported HidePlugin action type: ".concat(actionType));
          return null;
      }
    }
  }, {
    key: "methodCall",
    value: function methodCall(func) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      if (func == "HidePlugin") {
        return this.handleHidePluginAction(params);
      }
      if (this.root && typeof this.root[func] === "function") {
        var _this$root;
        return (_this$root = this.root)[func].apply(_this$root, params);
      }
      var response = this.service.MethodCall(func, params);
      if (func == "WebOpen" && response.value == "true") {
        __iWebOffice2015__.pluginInstance.WebOpen();
      }
      if (!this.methods.includes(func)) {
        this.methods.push(func);
      }
      switch (response.type) {
        case "BOOL":
          return response.value == "true" ? true : false;
        case "BSTR":
          if (_typeof(response.value) === "object") {
            return JSON.stringify(response.value);
          }
          return response.value.toString();
        case "LONG":
          return Number(response.value);
        case "IDispatch":
          var middleware = createMiddleware(response.value);
          middleware.service.baseUrl = this.service.baseUrl;
          middleware.service.caller = response.value;
          return middleware;
        default:
          return response.value;
      }
    }
  }, {
    key: "getProperty",
    value: function getProperty(key) {
      if (this.root && typeof this.root[key] !== "undefined" && typeof this.root[key] !== "function") {
        return this.root[key];
      }
      var response = this.service.PropGet(key);
      switch (response.type) {
        case "BOOL":
          return response.value == "true" ? true : false;
        case "BSTR":
          if (_typeof(response.value) === "object") {
            return JSON.stringify(response.value);
          }
          return response.value.toString();
        case "LONG":
          return Number(response.value);
        case "IDispatch":
          var middleware = createMiddleware(response.value);
          middleware.service.baseUrl = this.service.baseUrl;
          middleware.service.caller = response.value;
          return middleware;
        default:
          return response.value;
      }
    }
  }, {
    key: "setProperty",
    value: function setProperty(key, value) {
      if (this.root && typeof this.root[key] !== "undefined" && typeof this.root[key] !== "function") {
        this.root[key] = value;
        return;
      }
      if (!this._enableCacheSetProperty || this._propertiesWithoutCache.includes(key)) {
        this.service.PropPut(key, value);
      } else {
        this.cacheSetPropertyMap[key] = value;
      }
    }
  }, {
    key: "sendCacheSetProperties",
    value: function sendCacheSetProperties() {
      if (this._enableCacheSetProperty) {
        var cacheSetPropertyMap = Object.assign({}, this.cacheSetPropertyMap);
        this.cacheSetPropertyMap = {};
        this.service.PropPutPkg(cacheSetPropertyMap);
      }
    }
  }]);
}();

function debounce(func, debounceMs) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    signal = _ref.signal,
    edges = _ref.edges;
  var pendingThis = undefined;
  var pendingArgs = null;
  var leading = edges != null && edges.includes('leading');
  var trailing = edges == null || edges.includes('trailing');
  var invoke = function invoke() {
    if (pendingArgs !== null) {
      func.apply(pendingThis, pendingArgs);
      pendingThis = undefined;
      pendingArgs = null;
    }
  };
  var onTimerEnd = function onTimerEnd() {
    if (trailing) {
      invoke();
    }
    cancel();
  };
  var timeoutId = null;
  var schedule = function schedule() {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(function () {
      timeoutId = null;
      onTimerEnd();
    }, debounceMs);
  };
  var cancelTimer = function cancelTimer() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  var cancel = function cancel() {
    cancelTimer();
    pendingThis = undefined;
    pendingArgs = null;
  };
  var flush = function flush() {
    cancelTimer();
    invoke();
  };
  var debounced = function debounced() {
    if (signal !== null && signal !== void 0 && signal.aborted) {
      return;
    }
    pendingThis = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    pendingArgs = args;
    var isFirstCall = timeoutId == null;
    schedule();
    if (leading && isFirstCall) {
      invoke();
    }
  };
  debounced.schedule = schedule;
  debounced.cancel = cancel;
  debounced.flush = flush;
  signal === null || signal === void 0 || signal.addEventListener('abort', cancel, {
    once: true
  });
  return debounced;
}

function throttle(func, throttleMs) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    signal = _ref.signal,
    _ref$edges = _ref.edges,
    edges = _ref$edges === void 0 ? ['leading', 'trailing'] : _ref$edges;
  var pendingAt = null;
  var debounced = debounce(func, throttleMs, {
    signal: signal,
    edges: edges
  });
  var throttled = function throttled() {
    if (pendingAt == null) {
      pendingAt = Date.now();
    } else {
      if (Date.now() - pendingAt >= throttleMs) {
        pendingAt = Date.now();
        debounced.cancel();
        debounced.apply(void 0, arguments);
      }
    }
    debounced.apply(void 0, arguments);
  };
  throttled.cancel = debounced.cancel;
  throttled.flush = debounced.flush;
  return throttled;
}

var Middleware = /*#__PURE__*/function (_BaseMiddleware) {
  function Middleware() {
    var _this;
    _classCallCheck(this, Middleware);
    _this = _callSuper(this, Middleware);
    _defineProperty(_this, "root", void 0);
    _this.inital();
    _this.service.ReqUrl();
    _this.service.GetInterface();
    _this.httpSetPos();
    _this.socketConnect();
    // this.mask = new Mask(this.root);

    // 扩展参数
    _this.WpsPersonalShowFlag();
    // 注册事件
    _this.registEvents();
    // 设置copyright
    _this.setCopyright();
    _this.bindThis();
    _this.bindEvents();
    _this.bindGlobalApi();
    return _this;
  }
  _inherits(Middleware, _BaseMiddleware);
  return _createClass(Middleware, [{
    key: "httpSetPos",
    value: function httpSetPos() {
      // 系统缩放比
      this.outer_dpr = this.service.GetDPR();
      var params = this.calcPos();
      this.service.MethodCall("SetPos", params);
    }
  }, {
    key: "WpsPersonalShowFlag",
    value: function WpsPersonalShowFlag() {
      var ext = "WpsPersonalShowFlag";
      var value = this.root.getAttribute(ext);
      if (value) {
        this.setProperty(ext, value);
      }
    }
  }, {
    key: "registEvents",
    value: function registEvents() {
      this.EventsMap = {};
      var _iterator = _createForOfIteratorHelper(this.root.attributes),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var attr = _step.value;
          var name = attr.name.toLowerCase();
          if (name.startsWith("on")) {
            this.EventsMap[name] = attr.value;
          }
        }
        // console.log("🚀 ~ Middleware ~ registEvents ~ this.EventsMap:", this.EventsMap);
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var eventList = Object.keys(this.EventsMap).join(",");
      this.service.EventList(eventList);
    }
  }, {
    key: "bindThis",
    value: function bindThis() {
      this.updateImage = this.updateImage.bind(this);
      this.debounceUpdateImage = debounce(this.updateImage, 200);
      this.onScroll = this.onScroll.bind(this);
      this.onScrollImage = this.onScrollImage.bind(this);

      // 调整为16ms实现60帧
      this.debounceScroll = throttle(this.onScroll, 16);
      this.onFocus = this.onFocus.bind(this);
      this.debounceFocus = throttle(this.onFocus, 100);
      this.showWebOffice = this.showWebOffice.bind(this);
      this.hideWebOffice = this.hideWebOffice.bind(this);
      this.onWindowResize = this.onWindowResize.bind(this);
      this.onBeforeunload = this.onBeforeunload.bind(this);
      this.onVisibilityChanged = this.onVisibilityChanged.bind(this);
      this.debounceResize = throttle(this.onWindowResize, 100);
    }
  }, {
    key: "bindGlobalApi",
    value: function bindGlobalApi() {
      var _this2 = this;
      this.globalConfig.hideWebOffice = function () {
        _this2.displayPermission = false;
        _this2.hideWebOffice();
      };
      this.globalConfig.showWebOffice = function () {
        _this2.displayPermission = true;
        _this2.showWebOffice();
      };
      this.globalConfig.getImageSrc = function () {
        return _this2.getImageSrc();
      };
    }
  }, {
    key: "getGlobalConfig",
    value: function getGlobalConfig() {
      return __iWebOffice2015__;
    }
  }, {
    key: "inital",
    value: function inital() {
      this.isInnerIframe = isInnerIframe();
      this.globalConfig = this.getGlobalConfig();
      this.updateRootElement();
      if (!this.root.id) throw new Error("控件 id 不能为空");
      this.preOuterHeight = 0;
      this.worker = this.globalConfig.workerInstance || new Worker("".concat(window.__iWebOffice2015__baseUrl, "/kg-chrome-plugin/worker/socket.js"));
      this.prevParams = "";
      this.isReconnect = false;
      this.displayPermission = true;
      this.outer_dpr = 1;
      this.imageManager = new ImageManager(this.root);
    }
  }, {
    key: "updateRootElement",
    value: function updateRootElement() {
      for (var i = 0; i < this.globalConfig.selectors.length; i++) {
        var selector = this.globalConfig.selectors[i];
        var target = document.querySelector(selector);
        if (target) {
          this.root = target;
          break;
        }
      }
    }
  }, {
    key: "calcPadTop",
    value: function calcPadTop() {
      var top = this.preOuterHeight <= 50 ? 0 : this.preOuterHeight - window.outerHeight;
      this.preOuterHeight = 0;
      return top;
    }
  }, {
    key: "initImage",
    value: function initImage() {
      var _this3 = this;
      if (this.imageManager.img) return;
      setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var src, self;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this3.getImageSrc();
            case 2:
              src = _context.sent;
              self = _this3;
              _context.next = 6;
              return _this3.imageManager.createImage(src);
            case 6:
              document.body.addEventListener("mouseenter", function () {
                self.visible && self.updateImage();
              });
              _this3.imageManager.img.addEventListener("mouseenter", function () {
                _this3.showWebOffice();
              });
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee);
      })), 1000);
    }
  }, {
    key: "WebOpen",
    value: function WebOpen() {

      // this.setPos();
      // this.initImage();
    }
  }, {
    key: "socketConnect",
    value: function socketConnect() {
      var _this4 = this;
      var _this$service$GetURL = this.service.GetURL(),
        wss = _this$service$GetURL.wss;
        _this$service$GetURL.wsurl;
      this.worker.postMessage({
        action: "start",
        url: wss
      });
      this.worker.onmessage = function (event) {
        var _event$data = event.data,
          action = _event$data.action,
          data = _event$data.data;
        switch (action) {
          case "open":
            setTimeout(function () {
              _this4.setPos();
            }, 500);
            break;
          case "close":
            _this4.isReconnect = true;
            break;
          case "message":
            _this4.socketEventBus(JSON.parse(data));
            break;
        }
      };
    }
  }, {
    key: "socketEventBus",
    value: function socketEventBus(data) {
      var type = data.type,
        evname = data.evname,
        params = data.params;
      var value = parseParams(params);
      switch (type) {
        case "event":
          this.socketHandleEvent(evname, value);
          break;
      }
    }
  }, {
    key: "socketHandleEvent",
    value: function socketHandleEvent(evname, value) {
      var eventName = this.EventsMap[evname.toLowerCase()];
      if (!eventName) return;
      var eventFunction = window[eventName];
      if (typeof eventFunction === "function") {
        eventFunction.apply(void 0, _toConsumableArray(value));
      }
    }
  }, {
    key: "setCopyright",
    value: function setCopyright() {
      this.setProperty("Copyright", this.root.getAttribute("copyright"));
    }
  }, {
    key: "getIframeClientRect",
    value: function getIframeClientRect() {
      if (!this.isInnerIframe) {
        return {
          top: 0,
          left: 0
        };
      }
      try {
        // 更安全地获取当前iframe元素
        var iframe = window.frameElement || window.parent.document.querySelector("iframe[src=\"".concat(window.location.href, "\"]"));
        if (!iframe) return {
          top: 0,
          left: 0
        };
        var rect = iframe.getBoundingClientRect();
        var parentViewport = window.parent.document.documentElement;

        // 解耦计算逻辑
        var calculateVerticalOffset = function calculateVerticalOffset() {
          var baseHeight = parentViewport.clientHeight - window.innerHeight;
          // 处理移动端工具栏动态高度
          return Math.max(0, baseHeight - rect.top);
        };
        return {
          top: calculateVerticalOffset(),
          left: Math.floor(rect.left)
        };
      } catch (error) {
        console.error("Iframe position calculation failed:", error);
        return {
          top: 0,
          left: 0
        };
      }
    }
  }, {
    key: "calcPos",
    value: function calcPos() {
      // 获取组件根元素的边界矩形
      var rect = this.root.getBoundingClientRect();

      // 滚动补偿计算（处理浏览器地址栏等界面元素的高度变化）
      var pad_top = this.calcPadTop();

      // 浏览器缩放比
      var inner_dpr = window.devicePixelRatio;

      // X轴定位：元素左边界 × 设备像素比 + 边框修正
      var left = Math.floor(rect.left * inner_dpr);
      var iframeRect = this.getIframeClientRect();

      // 浏览器界面高度差（包括地址栏、书签栏等）
      var diffHeight = Math.floor(window.outerHeight * this.outer_dpr - window.innerHeight * inner_dpr);

      // Y轴定位：元素顶部位置 + 滚动补偿 + 界面高度差
      var top = Math.floor(rect.top * inner_dpr + pad_top + diffHeight);

      // 元素尺寸计算
      var width = Math.floor(rect.width * inner_dpr);
      var inner_height = Math.floor(rect.height * inner_dpr);
      var params = [];

      // 边框修正值
      var pad = {
        left: 0,
        //6
        top: 0
      };
      var outer_left = left + pad.left + iframeRect.left * inner_dpr;
      if (rect.top >= 0) {
        var outer_Height = this.isInnerIframe ? (window.innerHeight - rect.top) * inner_dpr : inner_height;
        var outer_top = top + pad.top - iframeRect.top * inner_dpr;
        var inner_top = 0;
        // 元素完全可见时
        params = ["".concat(outer_left, ",").concat(outer_top, ",").concat(width, ",").concat(outer_Height), "0,".concat(inner_top, ",").concat(width, ",").concat(inner_height), true];

        // 更新图片坐标信息
        // this.imageManager.updateCoord(rect.left, rect.top, rect.width, rect.height);
      } else {
        if (rect.height < document.body.clientHeight) {
          // 蓝凌 场景
          var _outer_Height = this.isInnerIframe ? (window.innerHeight - rect.top) * inner_dpr : inner_height;
          var _outer_top = Math.floor(pad_top + diffHeight - iframeRect.top); // 外部可见区域顶部
          var _inner_top = Math.floor(rect.top * inner_dpr);
          params = ["".concat(outer_left, ",").concat(_outer_top, ",").concat(width, ",").concat(_outer_Height + _inner_top), "0,".concat(_inner_top, ",").concat(width, ",").concat(_outer_Height), true];
        } else {
          // 元素部分滚动出视口时
          var _outer_Height2 = this.isInnerIframe ? window.innerHeight * inner_dpr : inner_height;
          // const outer_top = Math.floor((pad_top + diffHeight - iframeRect.top) * inner_dpr); // 外部可见区域顶部
          var _outer_top2 = Math.floor(pad_top + diffHeight - iframeRect.top); // 外部可见区域顶部
          var _inner_top2 = Math.floor(rect.top * inner_dpr); // 内部实际位置

          params = ["".concat(outer_left, ",").concat(_outer_top2, ",").concat(width, ",").concat(_outer_Height2), "0,".concat(_inner_top2, ",").concat(width, ",").concat(inner_height), true];
        }
      }
      return params;
    }
  }, {
    key: "setPos",
    value: function setPos() {
      if (!this.root) return;
      if (!this.displayPermission) return;
      // 获取组件根元素的边界矩形
      var params = this.calcPos();

      // 新增统一发送逻辑
      if (!this.checkSocketParams(params.toString())) return;
      this.visible = true;
      this.worker.postMessage({
        action: "send",
        func: "SetPos",
        params: params,
        caller: this.service.caller
      });
    }
  }, {
    key: "checkSocketParams",
    value: function checkSocketParams(params) {
      if (this.isReconnect) {
        this.isReconnect = false;
        return true;
      }
      var nextParams = params.toString();
      if (this.prevParams === nextParams) return false;
      this.prevParams = nextParams;
      return true;
    }
  }, {
    key: "hide",
    value: function hide() {
      var params = ["0,0,0,0", "0,0,0,0", false];
      if (!this.checkSocketParams(params.toString())) return;
      this.visible = false;
      this.worker.postMessage({
        action: "send",
        func: "SetPos",
        params: params,
        caller: this.service.caller
      });
    }
  }, {
    key: "onBeforeunload",
    value: function onBeforeunload() {
      this.hide();
      var url = this.service.baseUrl + "/exit";
      navigator.sendBeacon(url);
    }
  }, {
    key: "onVisibilityChanged",
    value: function onVisibilityChanged() {
      if (document.hidden) {
        // 修复标签页切换后 高度塌陷问题
        this.preOuterHeight = window.outerHeight;
        //this.hideWebOffice(true);
        this.hide();
      } else {
        this.showWebOffice();
        // this.imageManager.hideImage();
      }
    }
  }, {
    key: "hideWebOffice",
    value: function () {
      var _hideWebOffice = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // await this.updateImage();
              this.hide();
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function hideWebOffice() {
        return _hideWebOffice.apply(this, arguments);
      }
      return hideWebOffice;
    }()
  }, {
    key: "showWebOffice",
    value: function showWebOffice() {
      var _this5 = this;
      window.requestAnimationFrame(function () {
        _this5.setPos();
        // this.imageManager.hideImage();
      });
    }
  }, {
    key: "getImageSrc",
    value: function getImageSrc() {
      var _this$service$GetPic = this.service.GetPic(),
        value = _this$service$GetPic.value;
      return this.service.baseUrl + "/files/" + value;
    }
  }, {
    key: "updateImage",
    value: function () {
      var _updateImage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var imageSrc;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              imageSrc = this.getImageSrc();
              _context3.next = 3;
              return this.imageManager.updateImage(imageSrc);
            case 3:
              return _context3.abrupt("return", _context3.sent);
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function updateImage() {
        return _updateImage.apply(this, arguments);
      }
      return updateImage;
    }()
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      var _this6 = this;
      window.requestAnimationFrame(function () {
        _this6.setPos();
      });

      // this.debounceUpdateImage();
    }
  }, {
    key: "onScroll",
    value: function onScroll() {
      var _this7 = this;
      window.requestAnimationFrame(function () {
        _this7.setPos();
      });
    }
  }, {
    key: "onScrollImage",
    value: function onScrollImage() {
      this.hide();
      // this.imageManager.showImage();
    }
  }, {
    key: "onFocus",
    value: function onFocus() {
      this.service.Focus();
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this8 = this;
      document.body.onclick = function () {
        return _this8.debounceFocus();
      };
      window.addEventListener("scroll", this.debounceScroll);
      // window.addEventListener("scroll", this.onScrollImage);

      window.addEventListener("resize", this.debounceResize);
      window.addEventListener("visibilitychange", this.onVisibilityChanged);
      window.addEventListener("beforeunload", this.onBeforeunload);
      window.addEventListener("unload", function () {
        if (_this8.worker) {
          _this8.worker.terminate();
          _this8.worker = null;
        }
      });

      // window.postMessage(
      //   {
      //     action: "init",
      //     baseUrl: this.service.baseUrl,
      //     caller: this.service.caller,
      //   },
      //   "*",
      // );

      window.addEventListener("message", function (event) {
        var _event$data2 = event.data,
          action = _event$data2.action,
          value = _event$data2.value;
        if (action == "display") {
          switch (value) {
            case "hide":
              _this8.hideWebOffice();
              break;
            case "show":
              _this8.showWebOffice();
              break;
          }
        }
        if (action == "debounceResize") {
          _this8.debounceResize();
        }
      });
    }
  }]);
}(BaseMiddleware);

var timer = null,
  interval = 200;
function sendCacheSetProperties(target) {
  if (Object.keys(target.cacheSetPropertyMap).length > 0) {
    target.sendCacheSetProperties();
  }
}
function resetTimer(target) {
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(function () {
    sendCacheSetProperties(target);
  }, interval);
}
function createMiddleware$1(caller) {
  var middleware = caller ? new BaseMiddleware() : new Middleware();
  var handler = {
    get: function get(target, propKey, receiver) {
      if (propKey in target) {
        return Reflect.get(target, propKey, receiver);
      } else if (target.methods.includes(propKey)) {
        return function () {
          resetTimer(target);
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return target.methodCall.apply(target, [propKey].concat(args));
        };
      } else {
        try {
          // 先尝试获取属性
          resetTimer(target);
          return target.getProperty(propKey);
        } catch (error) {
          // 如果获取属性失败，则尝试调用方法
          return function () {
            sendCacheSetProperties(target);
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            return target.methodCall.apply(target, [propKey].concat(args));
          };
        }
      }
    },
    set: function set(target, propKey, value, receiver) {
      if (propKey in target) {
        return Reflect.set(target, propKey, value, receiver);
      } else {
        resetTimer(target);
        target.setProperty(propKey, value);
      }
      return true;
    }
  };
  return new Proxy(middleware, handler);
}
window.createMiddleware = createMiddleware$1;
