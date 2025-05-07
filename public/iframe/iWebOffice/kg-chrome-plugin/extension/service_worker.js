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
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
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

/**
 * 记录目标页面的 tabId 和状态
 */
var targetPage = {
  tabId: null,
  state: "hide",
  service: null
};

/**
 * 判断是否是目标页面的 URL
 */
var targetUrl = "https://demo.kinggrid.com/iWebOffice2015/DocumentEdit.jsp";
function isTargetPage(url) {
  return url.includes(targetUrl);
}
chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "init") {
    targetPage.service.baseUrl = message.baseUrl;
    targetPage.service.caller = message.caller;
  }
});
chrome.commands.onCommand.addListener(function (command) {
});

/**
 * 更新目标页面的状态
 */
function updateTargetPageState(tabId, url) {
  if (isTargetPage(url)) {
    if (targetPage.tabId !== tabId) {
      // 如果是新的目标页面
      targetPage = {
        tabId: tabId,
        state: "show",
        service: new Service()
      };
      chrome.tabs.sendMessage(tabId, {
        action: "show",
        tabId: tabId
      });
    } else if (targetPage.state !== "show") {
      // 如果目标页面已记录，但状态是隐藏
      targetPage.state = "show";
      chrome.tabs.sendMessage(tabId, {
        action: "show",
        tabId: tabId
      });
    }
  } else if (targetPage.state !== "hide") {
    // 如果目标页面变为非目标页面
    targetPage.state = "hide";
    chrome.tabs.sendMessage(targetPage.tabId, {
      action: "hide",
      tabId: tabId
    });
  }
}

/**
 * 监听标签页切换事件
 */
chrome.tabs.onActivated.addListener(function (activeInfo) {
  var tabId = activeInfo.tabId;
  chrome.tabs.get(tabId, function (tab) {
    if (tab.url) {
      updateTargetPageState(tabId, tab.url);
    }
  });
});

/**
 * 监听标签页关闭事件
 */
chrome.tabs.onRemoved.addListener(function (tabId) {
  if (tabId === targetPage.tabId) {
    if (targetPage.service) {
      targetPage.service.MethodCall("SetPos", ["0,0,0,0", false]);
    }
    targetPage = {
      tabId: null,
      state: "hide",
      service: null
    };
  }
});

/**
 * 监听标签页更新事件
 */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tabId === targetPage.tabId) {
    if (changeInfo.status === "loading" && tab.url) {
      updateTargetPageState(tabId, tab.url);
    } else if (changeInfo.url) {
      updateTargetPageState(tabId, tab.url);
    }
  }
});
