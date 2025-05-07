function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
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
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function createNewObject(root) {
  var object = document.createElement("object");
  var validAttrNameRegex = /^[a-zA-Z]+$/; // 仅允许纯字母的属性名
  var _iterator = _createForOfIteratorHelper(root.attributes),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var attr = _step.value;
      if (validAttrNameRegex.test(attr.name)) {
        object.setAttribute(attr.name, attr.value);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  object.setAttribute("isFakeObject", true);
  var parent = root.parentElement;
  parent.innerHTML = "";
  parent.appendChild(object);
  return object;
}

window.__iWebOffice2015__ = {
  getElementById: document.getElementById,
  selectors: ['object[clsid="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025"]', 'object[progid="Kinggrid.iWebOffice"]'],
  executed: false,
  isOnReady: false,
  workerInstance: null,
  pluginInstance: null,
  hideWebOffice: function hideWebOffice() {},
  showWebOffice: function showWebOffice() {},
  getImageSrc: function getImageSrc() {},
  PropPut: 0,
  PropGet: 0,
  MethodCall: 0,
  PropPutPkg: 0
};
var initialize = function () {
  var cache = {
    root: null,
    rootId: null,
    method: null
  };
  return function () {
    if (__iWebOffice2015__.executed) return cache;
    for (var i = 0; i < __iWebOffice2015__.selectors.length; i++) {
      var selector = __iWebOffice2015__.selectors[i];
      var target = document.querySelector(selector);
      if (target) {
        cache.root = target;
        break;
      }
    }
    if (!cache.root) return cache;
    cache.root = createNewObject(cache.root);
    cache.rootId = cache.root.getAttribute("id");
    cache.method = cache.root.getAttribute("onReady");
    if (typeof window[cache.method] === "function" && !__iWebOffice2015__.isOnReady) {
      __iWebOffice2015__.isOnReady = true;
      window[cache.method]();
    }
    __iWebOffice2015__.executed = true;
    return cache;
  };
}();

window.addEventListener("message", function (event) {
  var _event$data = event.data,
    action = _event$data.action,
    value = _event$data.value;
  if (!action) return;
  if (action === "createWorker") {
    if (!__iWebOffice2015__.workerInstance) {
      __iWebOffice2015__.workerInstance = new Worker(value);
    }

    // 延迟回收避免竞争
    setTimeout(function () {
      if (value.startsWith("blob:")) {
        URL.revokeObjectURL(value);
      }
    }, 1000);
  }
  if (action === "initialize") {
    initialize();
  }
  if (action === "destroyed") {
    var _iWebOffice2015__$pl;
    (_iWebOffice2015__$pl = __iWebOffice2015__.pluginInstance) === null || _iWebOffice2015__$pl === void 0 || _iWebOffice2015__$pl.hide();
    Object.assign(__iWebOffice2015__, {
      executed: false,
      isOnReady: false
    });
  }
}, false);

// 重写 getElementById 方法
document.getElementById = function (id) {
  if (!id) return __iWebOffice2015__.getElementById.call(document, id);
  var _initialize = initialize(),
    rootId = _initialize.rootId;
  if (id === rootId) {
    if (typeof window.createMiddleware === "function") {
      if (!__iWebOffice2015__.pluginInstance) {
        __iWebOffice2015__.pluginInstance = window.createMiddleware();
      }
      __iWebOffice2015__.pluginInstance.updateRootElement();
      return __iWebOffice2015__.pluginInstance;
    }
    console.error("window.createMiddleware is not a function");
    return null;
  }
  return __iWebOffice2015__.getElementById.call(document, id);
};
initialize();
