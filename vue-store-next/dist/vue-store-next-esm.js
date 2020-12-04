function t(e) {
  return (t =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t &&
            "function" == typeof Symbol &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? "symbol"
            : typeof t;
        })(e);
}
function e(t, r) {
  return (e =
    Object.setPrototypeOf ||
    function (t, e) {
      return (t.__proto__ = e), t;
    })(t, r);
}
function r(t) {
  var e = (function () {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return (
        Date.prototype.toString.call(
          Reflect.construct(Date, [], function () {})
        ),
        !0
      );
    } catch (t) {
      return !1;
    }
  })();
  return function () {
    var r,
      i = o(t);
    if (e) {
      var u = o(this).constructor;
      r = Reflect.construct(i, arguments, u);
    } else r = i.apply(this, arguments);
    return n(this, r);
  };
}
function n(e, r) {
  return !r || ("object" !== t(r) && "function" != typeof r)
    ? (function (t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      })(e)
    : r;
}
function o(t) {
  return (o = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
}
function i(t) {
  return (
    (function (t) {
      if (Array.isArray(t)) return u(t);
    })(t) ||
    (function (t) {
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(t))
        return Array.from(t);
    })(t) ||
    (function (t, e) {
      if (!t) return;
      if ("string" == typeof t) return u(t, e);
      var r = Object.prototype.toString.call(t).slice(8, -1);
      "Object" === r && t.constructor && (r = t.constructor.name);
      if ("Map" === r || "Set" === r) return Array.from(t);
      if (
        "Arguments" === r ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      )
        return u(t, e);
    })(t) ||
    (function () {
      throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    })()
  );
}
function u(t, e) {
  (null == e || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n;
}
function c(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e &&
      (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function a(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = null != arguments[e] ? arguments[e] : {};
    e % 2
      ? c(Object(r), !0).forEach(function (e) {
          f(t, e, r[e]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
      : c(Object(r)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
        });
  }
  return t;
}
function f(t, e, r) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[e] = r),
    t
  );
}
function s(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function l(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(t, n.key, n);
  }
}
function p(t, e, r) {
  return e && l(t.prototype, e), r && l(t, r), t;
}
import { reactive as y } from "vue";
var b = function (t) {
    var e = {};
    return (
      Object.getOwnPropertyNames(t).forEach(function (r) {
        e[r] = Object.getOwnPropertyDescriptor(t, r);
      }),
      e
    );
  },
  h = new ((function () {
    function t() {
      s(this, t), (this.subs = []);
    }
    return (
      p(t, [
        {
          key: "addSub",
          value: function (t) {
            this.subs.push(t);
          },
        },
        {
          key: "notify",
          value: function (t) {
            for (var e = this.subs.length, r = 0; r < e; r++) this.subs[r](t);
          },
        },
        {
          key: "removeSub",
          value: function (t) {
            var e = this.subs.indexOf(t);
            this.subs.splice(e, 1);
          },
        },
        {
          key: "destroy",
          value: function () {
            this.subs.splice(0, this.subs.length);
          },
        },
      ]),
      t
    );
  })())(),
  v = function t() {
    var e = this;
    s(this, t);
    var r = (function (t) {
      for (var e = {}, r = t.length; r--; ) {
        var n = t[r];
        Object.assign(e, b(n));
      }
      return e;
    })(
      (function (t, e) {
        for (var r = [], n = t; n !== e; )
          (n = Object.getPrototypeOf(n)), r.push(n);
        return r;
      })(this, t.prototype)
    );
    Object.keys(r).forEach(function (n) {
      var o = r[n];
      void 0 !== o &&
        /^\$/.test(n) &&
        "function" == typeof o.value &&
        Object.defineProperty(
          e,
          n,
          a(
            a({}, o),
            {},
            {
              value: new Proxy(e[n], {
                apply: function (e, r, n) {
                  return (
                    t.showLog &&
                      (function (t, e) {
                        console.log(""),
                          console.log("path：", t),
                          console.log("params：", e),
                          console.log("param：", e[0] || ""),
                          console.log("");
                      })(r.path, n),
                    h.notify({ path: r.path, params: n, param: n[0] }),
                    e.call.apply(e, [r].concat(i(n)))
                  );
                },
              }),
            }
          )
        );
    });
  };
v.showLog = !1;
var O = (function (t) {
  !(function (t, r) {
    if ("function" != typeof r && null !== r)
      throw new TypeError("Super expression must either be null or a function");
    (t.prototype = Object.create(r && r.prototype, {
      constructor: { value: t, writable: !0, configurable: !0 },
    })),
      r && e(t, r);
  })(o, v);
  var n = r(o);
  function o() {
    return s(this, o), n.apply(this, arguments);
  }
  return (
    p(o, [
      {
        key: "install",
        value: function (t, e) {
          t.provide(e || "store", this),
            (t.config.globalProperties.$store = this);
        },
      },
      {
        key: "getState",
        value: function (t, e) {
          var r = this;
          Object.getOwnPropertyNames(e).forEach(function (n) {
            e[n] instanceof v
              ? r.getState(e, e[n])
              : t &&
                Object.keys(t).forEach(function (r) {
                  t[r] === e &&
                    (e.path = t.path ? "".concat(t.path, ".").concat(r) : r);
                });
          });
        },
      },
      {
        key: "init",
        value: function (t) {
          return (
            this.getState(null, this), void 0 !== t && (v.showLog = t), y(this)
          );
        },
      },
      {
        key: "addMoudles",
        value: function (t, e) {
          return e ? ((this[t] = e), this.getState(this, this[t]), this) : this;
        },
      },
      {
        key: "subscribe",
        value: function (t) {
          h.addSub(t);
        },
      },
    ]),
    o
  );
})();
export default O;
export { v as StoreOberser };
