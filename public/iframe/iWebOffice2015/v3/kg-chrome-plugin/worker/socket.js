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
  return _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
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

var Socket = /*#__PURE__*/function () {
  function Socket(url) {
    _classCallCheck(this, Socket);
    this.url = url;
    this.socket = null;
    this.reconnectInterval = 5000; // 重连间隔（毫秒）
    this.reconnecting = false;
    this.eventHandlers = {};
    this.interval = null;
    this.timeout = null;
    this.connect();
    this.cache = null;
  }

  // 注册事件处理函数
  return _createClass(Socket, [{
    key: "on",
    value: function on(event, handler) {
      if (!this.eventHandlers[event]) {
        this.eventHandlers[event] = [];
      }
      this.eventHandlers[event].push(handler);
    }

    // 触发事件
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      if (this.eventHandlers[event]) {
        this.eventHandlers[event].forEach(function (handler) {
          return handler.apply(void 0, args);
        });
      }
    }

    // 心跳
  }, {
    key: "heartbeat",
    value: function heartbeat() {
      var _this = this;
      var check = function check() {
        var _this$socket2;
        if (((_this$socket2 = _this.socket) === null || _this$socket2 === void 0 ? void 0 : _this$socket2.readyState) === WebSocket.OPEN) {
          _this.socket.send("ping");
        } else {
          _this.reconnecting = false;
          _this.reconnect();
        }
      };
      check();
      this.interval = setInterval(check, 1000 * 60);
    }

    // 连接 WebSocket
  }, {
    key: "connect",
    value: function connect() {
      var _this2 = this;
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        return;
      }
      this.socket = new WebSocket(this.url);
      this.socket.onopen = function (event) {
        _this2.reconnecting = false;
        _this2.emit("open", event);
        _this2.sendCache();
        _this2.heartbeat();
      };
      this.socket.onmessage = function (event) {
        _this2.emit("message", event.data);
      };
      this.socket.onerror = function (event) {
        _this2.emit("error", event);
        if (!_this2.reconnecting) {
          _this2.reconnect();
        }
      };
      this.socket.onclose = function (event) {
        _this2.emit("close", event);
        if (!_this2.reconnecting) {
          _this2.reconnect(1000);
        }
      };
    }
  }, {
    key: "sendCache",
    value: function sendCache() {
      if (this.cache) {
        this.socket.send(this.cache);
        this.cache = null;
      }
    }

    // 发送消息
  }, {
    key: "send",
    value: function send(func, params, caller) {
      var reqBody = {
        MethodCall: {
          caller: caller,
          function: func
        }
      };
      if (params) {
        reqBody.MethodCall.params = handleParams(params);
      }
      var data = JSON.stringify(reqBody);
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(data);
      } else {
        this.cache = data;
        this.reconnecting = false;
        // 1000 毫秒 重连
        this.reconnect(1000);
      }
    }

    // 关闭连接
  }, {
    key: "close",
    value: function close() {
      if (this.socket) {
        clearInterval(this.interval);
        this.socket.close();
      }
    }

    // 重连
  }, {
    key: "reconnect",
    value: function reconnect() {
      var _this3 = this;
      var reconnectInterval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.reconnectInterval;
      // 1. 状态锁防止重复重连
      if (this.reconnecting) return;
      // 2. 清除心跳定时器
      clearInterval(this.interval);
      // 3. 设置重连标识
      this.reconnecting = true;
      // 4. 清除未执行的旧定时器
      clearTimeout(this.timeout);
      // 5. 创建新重连定时器
      this.timeout = setTimeout(function () {
        _this3.connect();
        _this3.reconnecting = false;
      }, reconnectInterval);
    }
  }]);
}(); // 初始化 WebSocket 实例
var socket = null;

// 监听来自主线程的消息
self.onmessage = function (event) {
  var _event$data = event.data,
    action = _event$data.action,
    url = _event$data.url,
    func = _event$data.func,
    params = _event$data.params,
    caller = _event$data.caller;
  switch (action) {
    case "start":
      if (!socket) {
        socket = new Socket(url);
        socket.on("open", function () {
          self.postMessage({
            action: "open"
          });
        });
        socket.on("message", function (data) {
          if (data == "pong") return;
          self.postMessage({
            action: "message",
            data: data
          });
        });
        socket.on("close", function () {
          return self.postMessage({
            action: "close"
          });
        });
      }
      break;
    case "send":
      if (socket) socket.send(func, params, caller);
      break;
    case "close":
      if (socket) socket.close();
      break;
  }
};
