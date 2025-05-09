function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
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

/**
 * 基础 url
 */
window.__iWebOffice2015__baseUrl = ".";
var isChromeExtension = typeof(chrome)!='undefined' && chrome && chrome.runtime;
var baseUrl = isChromeExtension ? chrome.runtime.getURL("./middleware/") : "".concat(window.__iWebOffice2015__baseUrl, "/kg-chrome-plugin/middleware/");

/**
 * 要注入的 js 脚本
 */
var scriptsToInject = ["createMiddleware.js", "loadMiddleware.js"];
/**
 * iWebOffice 查询条件
 */
var OBJECT_SELECTORS = ['object[clsid="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025"]', 'object[progid="Kinggrid.iWebOffice"]'];
var IFRAME_SELECT = "iframe[plugin='iWebOffice2015']";
var timer = null;

/**
 * 注入脚本
 */
function injectScripts() {
  scriptsToInject.forEach(function (src) {
    // 1. 定位目标iframe：查找带有 plugin='iWebOffice2015' 属性的iframe元素
    var targetFrame = document.querySelector(IFRAME_SELECT);

    // 2. 回退机制：未找到iframe 或者非插件模式时向主文档注入
    if (!targetFrame || !isChromeExtension) {
      return injectToFrame(document, src);
    }

    // 3. 分层注入逻辑
    if (targetFrame.contentDocument) {
      // 已加载完成时直接注入
      injectToFrame(targetFrame.contentDocument, src);
    } else {
      // 未加载完成时设置监听
      targetFrame.addEventListener("load", function () {
        injectToFrame(targetFrame.contentDocument, src);
      });
    }
  });
}

// 新增：iframe注入辅助函数
function injectToFrame(doc, src) {
  // 防止重复注入（检查iframe内的脚本）
  if (_toConsumableArray(doc.scripts).some(function (s) {
    return s.src.includes(src);
  })) return;
  var script = doc.createElement("script");
  script.src = "".concat(baseUrl).concat(src);
  script.async = false;

  // 插入到iframe的head首部
  doc.head.insertBefore(script, doc.head.firstChild);
}

/**
 * 注入worker
 */
function injectWorker() {
  // 当 iframe 尚未加载完成时，contentWindow 可能为 null
  var targetFrame = document.querySelector(IFRAME_SELECT);
  var windows = [window].concat(_toConsumableArray(targetFrame !== null && targetFrame !== void 0 && targetFrame.contentWindow ? [targetFrame.contentWindow] : []));
  var postMessage = function postMessage(data) {
    return windows.forEach(function (target) {
      target === null || target === void 0 || target.postMessage(data, "*");
    });
  };
  if (isChromeExtension) {
    fetch(chrome.runtime.getURL("worker/socket.js")).then(function (response) {
      return response.text();
    }).then(function (scriptContent) {
      var blob = new Blob([scriptContent], {
        type: "application/javascript"
      });
      var value = URL.createObjectURL(blob);
      postMessage({
        action: "createWorker",
        value: value
      });
    });
  } else {
    var value = "./kg-chrome-plugin/worker/socket.js";
    postMessage({
      action: "createWorker",
      value: value
    });
  }
}

/**
 * 获取目标元素
 */
function getTargetElement() {
  var element = null;
  for (var i = 0; i < OBJECT_SELECTORS.length; i++) {
    var selector = OBJECT_SELECTORS[i];
    var target = document.querySelector(selector);
    if (target) {
      element = target;
      break;
    }
  }
  if (!element) return false;
  initialize();
  var attributes = {};
  for (var _i = 0; _i < element.attributes.length; _i++) {
    var attribute = element.attributes[_i];
    attributes[attribute.name] = attribute.value;
  }
  return {
    attributes: attributes,
    element: element
  };
}
function initialize() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(function () {
    window.postMessage({
      action: "initialize"
    });
  }, 50);
}

/**
 * 检查元素是否可见
 */
function isElementVisible(el) {
  var rect = el.getBoundingClientRect();
  var display = window.getComputedStyle(el).display;
  return !(rect.left <= 0 || rect.top <= 0 || rect.width <= 0 || rect.height <= 0 || display === "none");
}

/**
 * 检查是否已经存在目标元素
 */

function checkTargetElement(observer) {
  var lastVisible = null;
  var lastWidth = null;
  var lastHeight = null;
  var target = getTargetElement();
  if (target) {
    observer.disconnect();

    // 新增状态标记
    var elementRef = new WeakRef(target.element); // 创建弱引用
    var currentElement = elementRef.deref(); // 解引用
    var removalObserver = new MutationObserver(function (mutations) {
      if (!currentElement) return;
      if (!currentElement.getAttribute("isFakeObject")) return;
      if (!document.contains(currentElement)) {
        cleanup(); // 清理所有观察器
        window.postMessage({
          action: "destroyed"
        }, "*"); // 发送移除通知

        // 重新激活全局监听
        observer.disconnect();
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true
        });
      }
    });
    var cleanup = function cleanup() {
      removalObserver.disconnect();
      attrObserver.disconnect();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };

    // 尺寸检查
    var checkResize = function checkResize() {
      if (!target.element.getAttribute("isFakeObject")) return;
      var rect = target.element.getBoundingClientRect();
      var curWidth = rect.width;
      var curHeight = rect.height;
      if (curWidth !== lastWidth || curHeight !== lastHeight) {
        lastWidth = curWidth;
        lastHeight = curHeight;
        window.postMessage({
          action: "debounceResize"
        }, "*");
      }
    };
    var checkVisibility = function checkVisibility() {
      if (!target.element.getAttribute("isFakeObject")) return;
      var curVisible = isElementVisible(target.element);
      if (lastVisible !== curVisible) {
        lastVisible = curVisible;
        var value = curVisible ? "show" : "hide";
        window.postMessage({
          action: "display",
          value: value
        }, "*");
      }
    };
    var createObservers = function createObservers() {
      // 尺寸观察器
      var resizeObserver = new ResizeObserver(function (entries) {
        entries.forEach(checkResize);
      });

      // 属性观察器
      var attrObserver = new MutationObserver(function (mutations) {
        if (mutations.some(function (m) {
          return m.attributeName === "style" || m.attributeName === "class";
        })) {
          checkVisibility();
        }
      });

      // 交叉观察器
      var intersectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          return checkVisibility();
        });
      }, {
        threshold: 0.01
      });
      return {
        attrObserver: attrObserver,
        intersectionObserver: intersectionObserver,
        resizeObserver: resizeObserver,
        removalObserver: removalObserver
      };
    };

    // 启动观察
    var _createObservers = createObservers(),
      attrObserver = _createObservers.attrObserver,
      intersectionObserver = _createObservers.intersectionObserver,
      resizeObserver = _createObservers.resizeObserver;
    attrObserver.observe(target.element, {
      attributes: true,
      attributeFilter: ["style", "class"]
    });
    intersectionObserver.observe(target.element);
    resizeObserver.observe(target.element);
    removalObserver.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    // 返回清理方法
    return function () {
      cleanup();
    };
  }
}

/**
 * 获取浏览器信息
 */
function getBrowser() {
  var userAgent = navigator.userAgent,
    rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
    rFirefox = /(firefox)\/([\w.]+)/,
    rOpera = /(opera).+version\/([\w.]+)/,
    rChrome = /(chrome)\/([\w.]+)/,
    rSafari = /version\/([\w.]+).*(safari)/;
  var browser;
  var version;
  function is360SEBrowser() {
    var userAgent = navigator.userAgent;

    // 检查 User-Agent
    if (/QIHU|360SE|360EE/.test(userAgent)) {
      return true;
    }

    // 检查插件列表
    var plugins = Array.from(navigator.plugins);
    for (var _i2 = 0, _plugins = plugins; _i2 < _plugins.length; _i2++) {
      var plugin = _plugins[_i2];
      if (plugin.name.includes("360") || plugin.name.includes("QIHU")) {
        return true;
      }
    }

    // 检查 window.external
    try {
      if (_typeof(window.external) === "object" && typeof window.external.AddFavorite === "function") {
        return true;
      }
    } catch (e) {}

    // 检查 MIME 类型
    var mimeTypes = Array.from(navigator.mimeTypes);
    for (var _i3 = 0, _mimeTypes = mimeTypes; _i3 < _mimeTypes.length; _i3++) {
      var mimeType = _mimeTypes[_i3];
      if (mimeType.type.includes("360") || mimeType.suffixes.includes("360")) {
        return true;
      }
    }
    return false;
  }
  function uaMatch(ua) {
    if (is360SEBrowser()) {
      return {
        browser: "",
        version: "0"
      };
    }
    var match = rMsie.exec(ua);
    if (match != null) {
      return {
        browser: "IE",
        version: match[2] || "0"
      };
    }
    var match = rFirefox.exec(ua);
    if (match != null) {
      return {
        browser: match[1] || "",
        version: match[2] || "0"
      };
    }
    var match = rOpera.exec(ua);
    if (match != null) {
      return {
        browser: match[1] || "",
        version: match[2] || "0"
      };
    }
    var match = rChrome.exec(ua);
    if (match != null) {
      return {
        browser: match[1] || "",
        version: match[2] || "0"
      };
    }
    var match = rSafari.exec(ua);
    if (match != null) {
      return {
        browser: match[2] || "",
        version: match[1] || "0"
      };
    }
    if (match != null) {
      return {
        browser: "",
        version: "0"
      };
    }
  }
  var browserMatch = uaMatch(userAgent.toLowerCase());
  if (browserMatch.browser) {
    browser = browserMatch.browser;
    version = Number(browserMatch.version.split(".")[0]);
  }
  return {
    browser: browser,
    version: version
  };
}
/**
 * 主函数
 */
(function () {
  var _getBrowser = getBrowser(),
    browser = _getBrowser.browser,
    version = _getBrowser.version;
  if (browser == "chrome" && version > 106) {
    // 创建 MutationObserver 实例
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          checkTargetElement(observer);
        }
      });
    });

    // 开始观察整个文档树，包括子节点的变化
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    // 注入 JS 脚本
    injectScripts();

    // 注入 worker
    injectWorker();

    // 检查是否已经存在目标元素
    checkTargetElement(observer);
  }
})();
