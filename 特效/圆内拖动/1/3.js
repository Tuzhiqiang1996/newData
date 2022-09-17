!(function (t) {
    var e = 11,
      i = 1 / (e - 1),
      n = "function" == typeof Float32Array;
    function s(t, e) {
      return 1 - 3 * e + 3 * t;
    }
    function a(t, e) {
      return 3 * e - 6 * t;
    }
    function o(t) {
      return 3 * t;
    }
    function r(t, e, i) {
      return ((s(e, i) * t + a(e, i)) * t + o(e)) * t;
    }
    function l(t, e, i) {
      return 3 * s(e, i) * t * t + 2 * a(e, i) * t + o(e);
    }
    function c(t) {
      return t;
    }
    function d(t, s, a, o) {
      if (
        ((this.mX1 = isNaN(t) ? 0.1 : t),
        (this.mY1 = isNaN(s) ? 0.57 : s),
        (this.mX2 = isNaN(a) ? 0.1 : a),
        (this.mY2 = isNaN(o) ? 1 : o),
        !(0 <= this.mX1 && this.mX1 <= 1 && 0 <= this.mX2 && this.mX2 <= 1))
      )
        throw new Error("bezier x values must be in [0, 1] range");
      if (this.mX1 === this.mY1 && this.mX2 === this.mY2) return c;
      this.sampleValues = n ? new Float32Array(e) : new Array(e);
      for (var l = 0; l < e; ++l)
        this.sampleValues[l] = r(l * i, this.mX1, this.mX2);
    }
    (d.prototype = {
      _getTForX: function (t) {
        for (
          var n = this.sampleValues, s = 0, a = 1, o = e - 1;
          a !== o && n[a] <= t;
          ++a
        )
          s += i;
        var c = s + ((t - n[--a]) / (n[a + 1] - n[a])) * i,
          d = l(c, this.mX1, this.mX2);
        return d >= 0.001
          ? (function (t, e, i, n) {
              for (var s = 0; s < 4; ++s) {
                var a = l(e, i, n);
                if (0 === a) return e;
                e -= (r(e, i, n) - t) / a;
              }
              return e;
            })(t, c, this.mX1, this.mX2)
          : 0 === d
          ? c
          : (function (t, e, i, n, s) {
              var a,
                o,
                l = 0;
              do {
                (a = r((o = e + (i - e) / 2), n, s) - t) > 0 ? (i = o) : (e = o);
              } while (Math.abs(a) > 1e-7 && ++l < 10);
              return o;
            })(t, s, s + i, this.mX1, this.mX2);
      },
      getPbyT: function (t) {
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : r(this._getTForX(t), this.mY1, this.mY2);
      },
    }),
      (t.Bezier = d);
  })(window),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery")))
        : (t.UCD = e(t.jQuery));
    })(this, function (t) {
      var e,
        i,
        n,
        s,
        a = window.UCD || (window.UCD = { Core: t }),
        o = document,
        r = (Array.prototype.slice, Object.prototype.hasOwnProperty),
        l = Object.prototype.toString,
        c = 0,
        d =
          ((a.uuid = function (t) {
            return (t || "") + ++c;
          }),
          ".ucd.drag"),
        u = (a.Events = {
          isPad: "ontouchstart" in window,
          mouse: {
            DOWN: "mousedown",
            MOVE: "mousemove",
            UP: "mouseup",
            getEvent: function (t) {
              return t;
            },
          },
          touch: {
            DOWN: "touchstart",
            MOVE: "touchmove",
            UP: "touchend",
            getEvent: function (t) {
              var e =
                t.originalEvent &&
                t.originalEvent.touches &&
                t.originalEvent.touches.length
                  ? t.originalEvent.touches
                  : t.changedTouches;
              return e && e.length ? e[0] : t;
            },
          },
        });
      t.extend(u, u.isPad ? u.touch : u.mouse),
        (a.bindDragEvent = function (e, i, n) {
          var s = t(e),
            a = t(document);
          return (
            s.on(u.DOWN + d, n, function (t) {
              var e,
                n = this,
                s = Array.prototype.slice.apply(arguments),
                o = u.getEvent(t),
                r = o.pageX,
                l = o.pageY,
                c = 0,
                h = 0;
              s.length > 1 && (e = s.splice(1)),
                i.onDragStart && i.onDragStart.call(n, t, e),
                a
                  .on(u.MOVE + d, function (e) {
                    (e = u.getEvent(e)),
                      (c = e.pageX - r),
                      (h = e.pageY - l),
                      i.onDragging && i.onDragging.call(n, t, c, h);
                  })
                  .on(u.UP + d, function (e) {
                    a.off(u.MOVE + d + " " + u.UP + d),
                      i.onDragEnd && i.onDragEnd.call(n, t, c, h);
                  });
            }),
            u.DOWN + d
          );
        }),
        (a.NS_SVG = "http://www.w3.org/2000/svg"),
        (a.NS_XLINK = "http://www.w3.org/1999/xlink"),
        (a.support = {}),
        (a.support.SVG =
          !!o.createElementNS &&
          !!o.createElementNS(a.NS_SVG, "svg").createSVGRect),
        (a.support.SMIL =
          !!o.createElementNS &&
          /SVGAnimate/.test(l.call(o.createElementNS(a.NS_SVG, "animate")))),
        (a.support.VML = !a.support.SVG),
        (e = a.support),
        (i = (function (t) {
          t = t.toLowerCase();
          var e =
            /(chrome)[ \/]([\w.]+)/.exec(t) ||
            /(webkit)[ \/]([\w.]+)/.exec(t) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) ||
            /(msie) ([\w.]+)/.exec(t) ||
            (t.indexOf("compatible") < 0 &&
              /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)) ||
            [];
          return { browser: e[1] || "", version: e[2] || "0" };
        })(navigator.userAgent)),
        (n = {}),
        i.browser && ((n[i.browser] = !0), (n.version = i.version)),
        n.chrome ? (n.webkit = !0) : n.webkit && (n.safari = !0),
        (e.browser = n),
        (e[i.browser] = !0),
        (a.detectFeature = function (t) {
          var e = (document.body || document.documentElement).style;
          if ("string" == typeof e[t]) return !0;
          var i = ["Moz", "webkit", "Webkit", "ms"];
          t = t.charAt(0).toUpperCase() + t.substr(1);
          for (var n = 0; n < i.length; n++)
            if ("string" == typeof e[i[n] + t]) return !0;
          return !1;
        }),
        (a.support.csstransition = a.detectFeature("transition")),
        (t.cleanData =
          ((s = t.cleanData),
          function (e) {
            var i, n, a;
            for (a = 0; null != (n = e[a]); a++)
              try {
                (i = t._data(n, "events")) &&
                  i.remove &&
                  t(n).triggerHandler("remove");
              } catch (t) {}
            s(e);
          }));
      var h = /\${(\w+)}/g,
        p = /(.)^/,
        f = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        m = /\\|'|\r|\n|\u2028|\u2029/g,
        v = function (t) {
          return "\\" + f[t];
        };
      !(function (t, e) {
        function i(e, i) {
          var n = t.extend(
            {},
            {
              type: "tap",
              longtapTime: 800,
              selector: "",
              callback: t.noop,
              change: t.noop,
            },
            i
          );
          (this.element = t(e)), (this.options = n), this.init();
        }
        (i.prototype = {
          constructor: i,
          init: function () {
            var t = this.options;
            (this.$el = this.element),
              (this.longtapTime = t.longtapTime),
              (this.touchType = t.type),
              (this.timeStamp = 0),
              (this.state = { moves: !0, leave: !0, longTouch: !0 }),
              (this.callback = t.callback),
              (this.change = t.change),
              this.bindEvents();
          },
          bindEvents: function () {
            var t = this.options;
            this.element.on(t.type, t.selector, t.callback),
              e.bindDragEvent(
                this.$el,
                {
                  onDragStart: this.start.bind(this),
                  onDragging: this.move.bind(this),
                  onDragEnd: this.end.bind(this),
                },
                this.options.selector
              );
          },
          start: function (e, i) {
            var n = Date.now(),
              s = t(e.currentTarget),
              a = s.attr("disabled") || s.closest("[disabled]").length,
              o = s.hasClass("ucd-disabled") || s.closest(".ucd-disabled").length;
            if (!(a || o || (e.touches && e.touches.length > 1)))
              return e.isTrigger && i
                ? (i[0] === this.touchType && this.callback(e),
                  void (this.invalid = !0))
                : void (n - this.timeStamp < 350
                    ? (this.invalid = !0)
                    : ((this.timeStamp = n),
                      s.addClass("ucd-touching"),
                      (this.state.leave = !0),
                      (this.state.longTouch = !0),
                      (this.time = setTimeout(
                        function () {
                          this.state.leave &&
                            this.state.moves &&
                            ("longtap" == this.touchType && this.callback(e),
                            (this.state.longTouch = !1));
                        }.bind(this),
                        this.longtapTime
                      ))));
            this.invalid = !0;
          },
          end: function (e, i, n) {
            t(e.currentTarget).removeClass("ucd-touching"),
              this.invalid || (e.touches && e.touches.length > 1)
                ? (this.invalid = !1)
                : (clearTimeout(this.time),
                  Math.abs(i) > 10 || Math.abs(n) > 100
                    ? ("swipe" == this.touchType &&
                        this.callback.call(e.target, e),
                      Math.abs(i) > Math.abs(n)
                        ? (i > 10 &&
                            "swiperight" == this.touchType &&
                            this.callback.call(e.target, e),
                          i < -10 &&
                            "swipeleft" == this.touchType &&
                            this.callback.call(e.target, e))
                        : (n > 10 &&
                            "swipedown" == this.touchType &&
                            this.callback.call(e.target, e),
                          n < -10 &&
                            "swipeup" == this.touchType &&
                            this.callback.call(e.target, e)))
                    : this.state.longTouch &&
                      this.state.moves &&
                      ("tap" == this.touchType && this.callback.call(e.target, e),
                      (this.state.leave = !1)),
                  (this.state.moves = !0));
          },
          move: function (t, e, i) {
            if (
              !this.invalid &&
              (Math.abs(e) < 3 && Math.abs(i) < 3
                ? (this.state.moves = !0)
                : ((this.state.moves = !1), clearTimeout(this.time)),
              -1 != this.touchType.indexOf("swipe") &&
                "function" == typeof this.change)
            ) {
              var n = this.change;
              "swipe" == this.touchType
                ? n(t, e, i)
                : "swipeleft" == this.touchType && e < -3
                ? n(t, Math.abs(e))
                : "swiperight" == this.touchType && e > 3 && n(t, Math.abs(e));
            }
          },
        }),
          t.fn.extend({
            tap: function (t, e) {
              new i(this, { callback: t, type: "tap", selector: e });
            },
            longtap: function (t, e, n) {
              new i(this, {
                callback: t,
                type: "longtap",
                longtapTime: e || 800,
                selector: n,
              });
            },
            swipe: function (t, e, n) {
              new i(this, { callback: t, change: e, type: "swipe", selector: n });
            },
            swipeleft: function (t, e, n) {
              new i(this, {
                callback: t,
                change: e,
                type: "swipeleft",
                selector: n,
              });
            },
            swiperight: function (t, e, n) {
              new i(this, {
                callback: t,
                change: e,
                type: "swiperight",
                selector: n,
              });
            },
          }),
          (e.TouchSwipe = i);
      })(t, a);
      var g = {
        init: function (t) {
          if (t === a) throw "UCD组件必须用new实例化创建";
          t &&
            t.$element &&
            t.$element.on("remove", function (t) {
              component._destroy(t);
            });
        },
        register: function (t) {
          if (a[t.name]) throw t.name + "此名字已被注册，请换成别的名字";
          return t;
        },
        defined: function (t) {
          return void 0 !== t;
        },
        ascend: function (t, e) {
          return t - e;
        },
        descend: function (t, e) {
          return e - t;
        },
        keys: function (t) {
          var e = [];
          for (var i in t) r.call(t, i) && e.push(i);
          return e;
        },
        toArray: function (t, e) {
          var i = [];
          for (var n in t) r.call(t, n) && i.push(e(t[n], n, t));
          return i;
        },
        identity: function (t) {
          return t;
        },
        property: function (t) {
          return function (e) {
            return e[t];
          };
        },
        format: function (t, e) {
          return t.replace(h, function (t, i) {
            var n = e[i];
            return void 0 === n ? t : n;
          });
        },
        templateSettings: {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        },
        template: function (e, i) {
          i = t.extend({}, g.templateSettings, i);
          var n,
            s = new RegExp(
              [
                (i.escape || p).source,
                (i.interpolate || p).source,
                (i.evaluate || p).source,
              ].join("|") + "|$",
              "g"
            ),
            a = 0,
            o = "__p+='";
          e.replace(s, function (t, i, n, s, r) {
            return (
              (o += e.slice(a, r).replace(m, v)),
              (a = r + t.length),
              i
                ? (o += "'+\n((__t=(" + i + "))==null?'':util.escape(__t))+\n'")
                : n
                ? (o += "'+\n((__t=(" + n + "))==null?'':__t)+\n'")
                : s && (o += "';\n" + s + "\n__p+='"),
              t
            );
          }),
            (o += "';\n"),
            i.variable || (o = "with(obj||{}){\n" + o + "}\n"),
            (o =
              "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
              o +
              "return __p;\n");
          try {
            n = new Function(i.variable || "obj", "_", o);
          } catch (t) {
            throw ((t.source = o), t);
          }
          var r = function (t) {
              return n.call(this, t, g);
            },
            l = i.variable || "obj";
          return (r.source = "function(" + l + "){\n" + o + "}"), r;
        },
        range: function (t, e, i, n) {
          i = i || 1;
          for (var s, a = [], o = t; o < e; o += i)
            (s = n ? n(o, t, e, i) : o), a.push(s);
          return a;
        },
        indexOf: function (t, e, i) {
          i = i || t;
          for (var n = 0, s = t ? t.length : 0; n < s; n++)
            if (e.call(i, t[n], n, t)) return n;
          return -1;
        },
        each: function (t, e, i) {
          i = i || t;
          for (
            var n = 0, s = t ? t.length : 0;
            n < s && !1 !== e.call(i, t[n], n, t);
            n++
          );
          return t;
        },
        filter: function (t, e, i) {
          i = i || t;
          for (var n = [], s = 0, a = t ? t.length : 0; s < a; s++)
            e.call(i, t[s], s, t) && n.push(t[s]);
          return n;
        },
        map: function (t, e, i) {
          i = i || t;
          for (var n = [], s = 0, a = t ? t.length : 0; s < a; s++)
            n.push(e.call(i, t[s], s, t));
          return n;
        },
        generate: function (t, e, i) {
          for (var n = [], s = 0; s < t; s++) n.push(e.call(i, s, t));
          return n;
        },
        debounce: function (t, e, i) {
          var n;
          return function () {
            var s = this,
              a = arguments;
            i && !n && t.apply(s, a),
              clearTimeout(n),
              (n = setTimeout(function () {
                (n = null), i || t.apply(s, a);
              }, e));
          };
        },
        checkRangeByStep: function (t, e, i) {
          var n = [],
            s = t.min,
            a = t.max,
            o = e[0];
          return (
            void 0 === s || void 0 === a
              ? (void 0 === s
                  ? (n[0] = o)
                  : ((s - o) % i == 0 && (s += i),
                    (n[0] = Math.ceil((s - o) / i) * i + o)),
                void 0 === a
                  ? (n[1] = e[1])
                  : ((a - o) % i == 0 && (a -= i),
                    (n[1] = Math.floor((a - o) / i) * i + o)))
              : (n = [
                  Math.ceil((s - o) / i) * i + o,
                  Math.floor((a - o) / i) * i + o,
                ]),
            n
          );
        },
      };
      return (a.util = g), a;
    }),
    (function (t) {
      function e(t) {
        return "[object Object]" === Object.prototype.toString.call(t);
      }
      function i(t, e) {
        (this.comp = t),
          (this.id = t.id),
          (this.isolate = e),
          (this.comp.profile =
            this.comp.profile || this.comp.$dom.data("profile")),
          this._init();
      }
      function n(t, e, i) {
        var s = Object.prototype.toString.call(t);
        if (s !== Object.prototype.toString.call(e)) return !1;
        if ("[object Array]" === s) {
          if (t.length !== e.length) return !1;
          for (var a in t) if (!n(t[a], e[a], i)) return !1;
        } else if ("[object Object]" === s) {
          if (i && Object.keys(t).length !== Object.keys(e).length) return !1;
          for (var a in t) if (!n(t[a], e[a], i)) return !1;
        } else if (t !== e) return !1;
        return !0;
      }
      function s(t, e) {
        var i = !0;
        return (
          t &&
            t.length &&
            t.forEach(function (t) {
              i &&
                e.forEach(function (e) {
                  var n;
                  i &&
                    ((n = t),
                    "[object RegExp]" === Object.prototype.toString.call(n) &&
                      t.test(e) &&
                      (i = !1),
                    (function (t) {
                      return (
                        "[object String]" === Object.prototype.toString.call(t)
                      );
                    })(t) &&
                      t === e &&
                      (i = !1));
                });
            }),
          i
        );
      }
      Array.isArray ||
        (Array.isArray = function (t) {
          return "[object Array]" === Object.prototype.toString.call(t);
        }),
        Object.keys ||
          (Object.keys = function (t) {
            if (t !== Object(t))
              throw new TypeError("Object.keys called on a non-object");
            var e,
              i = [];
            for (e in t) Object.prototype.hasOwnProperty.call(t, e) && i.push(e);
            return i;
          }),
        Object.values ||
          (Object.values = function (t) {
            if (t !== Object(t))
              throw new TypeError("Object.values called on a non-object");
            var e = [];
            return (
              Object.keys(t).map(function (i) {
                e.push(t[i]);
              }),
              e
            );
          }),
        Array.prototype.includes ||
          Object.defineProperty(Array.prototype, "includes", {
            value: function (t, e) {
              if (null == this)
                throw new TypeError('"this" is null or not defined');
              var i = Object(this),
                n = i.length >>> 0;
              if (0 === n) return !1;
              var s,
                a,
                o = 0 | e,
                r = Math.max(o >= 0 ? o : n - Math.abs(o), 0);
              for (; r < n; ) {
                if (
                  (s = i[r]) === (a = t) ||
                  ("number" == typeof s &&
                    "number" == typeof a &&
                    isNaN(s) &&
                    isNaN(a))
                )
                  return !0;
                r++;
              }
              return !1;
            },
          }),
        Array.prototype.reduce ||
          Object.defineProperty(Array.prototype, "reduce", {
            value: function (t) {
              if (null === this)
                throw new TypeError(
                  "Array.prototype.reduce called on null or undefined"
                );
              if ("function" != typeof t)
                throw new TypeError(t + " is not a function");
              var e,
                i = Object(this),
                n = i.length >>> 0,
                s = 0;
              if (arguments.length >= 2) e = arguments[1];
              else {
                for (; s < n && !(s in i); ) s++;
                if (s >= n)
                  throw new TypeError(
                    "Reduce of empty array with no initial value"
                  );
                e = i[s++];
              }
              for (; s < n; ) s in i && (e = t(e, i[s], s, i)), s++;
              return e;
            },
          }),
        !Array.prototype.overlap &&
          Object.defineProperties(Array.prototype, {
            overlap: {
              value: function (t) {
                var e = !1;
                return (
                  this.length &&
                    t.length &&
                    this.filter(function (i) {
                      t.includes(i) && (e ? e.push(i) : (e = [i]));
                    }),
                  e
                );
              },
            },
          }),
        (i.prototype = {
          constructor: i,
          reactive: function (t) {
            var e = this;
            if (Array.isArray(t))
              t.forEach(function (t) {
                e.reactive(t);
              });
            else {
              t.$dom;
              if ("function" != typeof t.attr) throw "ui中的属性值可为: function";
              this._reps.push(t);
            }
          },
          _init: function () {
            var t = this.comp;
            "function" == typeof t.init && t.init(t.$dom, t.$dom[0]),
              "function" == typeof t.bind && t.bind(t.data);
            var e = t.ui;
            if (e) {
              (this._reps = []), (this._bis = []);
              var i = Object.keys(e).map(function (i) {
                return { $dom: t.$dom.find(i), attr: e[i] };
              });
              this.reactive(i);
            }
            this.callback(!0), this.render(!0);
          },
          destroy: function () {
            this.comp.remove && this.comp.remove();
          },
          updateComponent: function (t) {
            this.setCompData(t), this.render(t), this.callback(t);
          },
          render: function (t) {
            var e = this;
            this._reps &&
              this._reps.forEach(function (i) {
                var n = i.$dom,
                  s = i.attr.call(e.comp, e.getCompData(), t, n);
                void 0 !== s &&
                  null !== s &&
                  s !== i.html &&
                  (n.html(s), (i.html = s));
              });
          },
          callback: function (t) {
            "function" == typeof this.getCompBind() &&
              this.getCompBind().call(this.comp, this.getCompData(), t);
          },
          getCompDom: function () {
            return this.comp.$dom;
          },
          getCompProfile: function () {
            return this.comp.profile;
          },
          getCompBind: function () {
            return this.comp.bind;
          },
          getCompData: function () {
            return this.comp.data;
          },
          setCompData: function (t) {
            var i = this,
              n = a.settings.replaces;
            Object.keys(t).forEach(function (s) {
              e(t[s]) && e(i.comp.data[s]) && !n.includes(s)
                ? $.extend(!0, i.comp.data[s], t[s])
                : (i.comp.data[s] = t[s]);
            });
          },
          getCompKey: function () {
            return this.comp._key;
          },
        });
      var a = {
        _componets: {},
        _key: [],
        _compMap: {},
        _cached: {},
        settings: { replaces: [] },
        init: function (t) {
          $.extend(!0, this.settings, t);
        },
        syncComp: function (t) {
          var e = this;
          (e._compMap = {}),
            Object.keys(this._componets).forEach(function (i) {
              t.includes(i) || e.removeComp(i);
            });
        },
        getComp: function (t) {
          return this._componets[t];
        },
        removeComp: function (t) {
          this._componets[t].destroy(), delete this._componets[t];
        },
        add: function (t) {
          (this._compMap = {}),
            this.syncComp(Object.keys(window.D.jsonData)),
            (function (t) {
              t._key = Object.keys(t.data);
            })(t),
            (this._componets[t.id] = new i(t, this._isolate));
        },
        update: function (t) {
          var e = this,
            i = this.settings;
          if ("object" != typeof t) throw "data should be an object";
          if (
            !s(i.unfiltered, Object.keys(t)) ||
            (function (t, e, i) {
              for (var s in ((i = i || []), t))
                if (Object.prototype.hasOwnProperty.call(t, s)) {
                  if (void 0 === e[s]) return !0;
                  if (!n(t[s], e[s], i.includes(s))) return !0;
                }
              return !1;
            })(t, this._cached, i.replaces)
          ) {
            $.extend(this._cached, t);
            var a = e.getComponents(t);
            Object.keys(a).forEach(function (t) {
              e.getComp(t).updateComponent(a[t]);
            });
          }
        },
        clearCache: function () {
          this._cached = {};
        },
        getComponents: function (t) {
          var e = this,
            i = {};
          return (
            Object.keys(t).forEach(function (n) {
              e._compMap[n]
                ? e._compMap[n].forEach(function (e) {
                    (i[e] = i[e] || {}), (i[e][n] = t[n]);
                  })
                : Object.keys(e._componets).forEach(function (s) {
                    e._componets[s].getCompKey().includes(n) &&
                      ((i[s] = i[s] || {}),
                      (i[s][n] = t[n]),
                      (e._compMap[n] = e._compMap[n] || []),
                      e._compMap[n].push(s));
                  });
            }),
            i
          );
        },
        util: {
          isChanged: function (t, e) {
            return t !== e && (!t || !e || !n(t, e, !0));
          },
          getIn: function (t, e, i) {
            var n = t.reduce(function (t, e) {
              return t && t[e] ? t[e] : void 0;
            }, e);
            return i && (n = n && n(i)), n;
          },
          eo: function (t, e) {
            var i = t;
            return void 0 === t && (i = e), i;
          },
          handleString: function (t, e) {
            return (
              (e =
                e ||
                function (t) {
                  return "";
                }),
              "string" == typeof t
                ? e(t)
                : t
                ? (Object.keys(t).forEach(function (i) {
                    t[i] = UCD.binds.util.handleString(t[i], e);
                  }),
                  t)
                : void 0
            );
          },
          setRemove: function (t, e) {
            const i = t.indexOf(e);
            if (i > -1) return t.splice(i, 1), i;
          },
          setHas: function (t, e) {
            return t.indexOf(e) > -1;
          },
          setAdd: function (t, e) {
            return -1 === t.indexOf(e) && t.push(e), t;
          },
          isObject: e,
        },
      };
      t.binds = a;
    })(UCD),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.Bounce = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      window.Bounce = window.Bounce || {};
      var i = !!(
          "ontouchstart" in window ||
          (window.DocumentTouch && document instanceof DocumentTouch)
        ),
        n = i ? "touchstart" : "mousedown",
        s = i ? "touchmove" : "mousemove",
        a = i ? "touchend" : "mouseup",
        o = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      function r(e) {
        var i = (this.opts = t.extend(
          {},
          {
            container: document.documentElement,
            topOff: !0,
            topBounceOff: !0,
            bottomOff: !1,
            bottomBounceOff: !1,
            isInner: !1,
            onMove: null,
            onStart: null,
            onEnd: null,
            frequency: 90,
            horizontal: !1,
          },
          e
        ));
        (i.container = t(i.container)[0]),
          (i.target = t(i.target)[0]),
          i.onMove &&
            "function" == typeof i.onMove &&
            ((i.frequency = i.frequency - 0),
            (i.frequency = i.frequency ? i.frequency : 1),
            (i.frequency = i.frequency > 100 ? 100 : i.frequency),
            (i.tgap = 1e3 / i.frequency),
            (this._curPos = 0)),
          this._init();
      }
      return (
        (r.instances = []),
        (r.prototype = {
          constructor: r,
          _init: function () {
            if (i) {
              var t = this.opts;
              t.container === document.documentElement &&
                (document.body.style.overflow = "hidden"),
                (this._isOff = !1),
                (this.state = {
                  startX: null,
                  endX: null,
                  startY: null,
                  endY: null,
                  scrollTop: null,
                  scrolledTop: null,
                  scrolledBottom: null,
                  dis: null,
                  scrolling: null,
                  stime: null,
                  strans: null,
                  diff: null,
                  animation: null,
                }),
                (t.target.style.transform = "translate3d(0,0,0)"),
                (this.bezier = new window.Bezier()),
                this._bindEvents(),
                r.instances.push(this);
            }
          },
          _bindEvents: function () {
            var t = this.opts,
              e = this._touchstart.bind(this);
            (this._move = this._touchmove.bind(this)),
              (this._end = this._touchend.bind(this)),
              (this._cancel = this._touchend.bind(this)),
              t.container.addEventListener(n, e, { passive: !o }),
              window.addEventListener("beforeunload", function () {
                t.container.removeEventListener(n, e, { passive: !o });
              });
          },
          setTransform: function (t) {
            var e = this.opts,
              i = e.target;
            e.horizontal
              ? (i.style.transform = "translate3d(" + t + "px,0,0)")
              : (i.style.transform = "translate3d(0," + t + "px,0)");
          },
          getTransform: function (t) {
            var e = this.opts,
              i = e.target;
            return e.horizontal
              ? i.style.transform.match(/-?[0-9]\d*(\.\d+)?/g)[1] - 0
              : i.style.transform.match(/-?[0-9]\d*(\.\d+)?/g)[2] - 0;
          },
          on: function () {
            this._isOff = !1;
          },
          off: function () {
            this._isOff = !0;
          },
          _start: function () {
            if (!this.started) {
              (this.started = !0), (this.ended = !1);
              var t = this.opts;
              t.onStartMoving &&
                "function" == typeof t.onStartMoving &&
                t.onStartMoving.call(null),
                window.Bounce &&
                  window.Bounce.particlesFirst &&
                  window.Bounce.particlesFirst.stop(),
                window.Bounce &&
                  window.Bounce.particlesClone &&
                  window.Bounce.particlesClone.stop();
            }
          },
          _stop: function (t) {
            if (!this.ended) {
              (this.started = !1), (this.ended = !0);
              var e = this.opts;
              e.onMove && "function" == typeof e.onMove && e.onMove.call(null, t),
                e.onEnd && "function" == typeof e.onEnd && e.onEnd.call(null, t),
                window.Bounce &&
                  window.Bounce.particlesFirst &&
                  "none" !== window.Bounce.particlesFirst.dom.style.display &&
                  window.Bounce.particlesFirst.start(),
                window.Bounce &&
                  window.Bounce.particlesClone &&
                  "none" !== window.Bounce.particlesClone.dom.style.display &&
                  window.Bounce.particlesClone.start();
            }
          },
          _touchstart: function (t) {
            o && t.preventDefault();
            var e = this.state,
              i = this.opts,
              n = i.target,
              r = i.container;
            i.onStart && "function" == typeof i.onStart && i.onStart(),
              e.scrolling ||
                ((e.endX = e.startX = t.touches[0].pageX),
                (e.endY = e.startY = t.touches[0].pageY),
                i.horizontal
                  ? ((e.diff =
                      r.offsetWidth -
                      (n.offsetLeft - r.offsetLeft) -
                      n.scrollWidth),
                    i.isInner && (e.diff = r.offsetWidth - n.scrollWidth))
                  : ((e.diff =
                      r.offsetHeight -
                      (n.offsetTop - r.offsetTop) -
                      n.scrollHeight),
                    i.isInner && (e.diff = r.offsetHeight - n.scrollHeight)),
                e.diff > 0 && (e.diff = 0),
                (e.strans = this.getTransform()),
                (this.lPos = this.lastPos = e.strans),
                (e.ltime = e.stime = Date.now()),
                e.animation && window.cancelAnimationFrame(e.animation),
                e._transit && window.cancelAnimationFrame(e._transit),
                this.interval &&
                  (clearInterval(this.interval), (this.interval = null)),
                r.addEventListener(s, this._move, { passive: !0 }),
                r.addEventListener(a, this._end, { passive: !0 }),
                r.addEventListener("touchcancel", this._end, { passive: !0 }));
          },
          _touchmove: function (t) {
            if (!this._isOff && !window._isDrag) {
              var e = this.state,
                i = this.opts;
              (e.endY = t.touches[0].pageY),
                (e.endX = t.touches[0].pageX),
                (e.scrolling = !0);
              var n = 0;
              i.horizontal
                ? ((e.dis = e.endX - e.startX),
                  (n = e.strans + e.endX - e.startX))
                : ((e.dis = e.endY - e.startY),
                  (n = e.strans + e.endY - e.startY)),
                (e.scrolledTop = n >= 0),
                e.scrolledTop || (e.scrolledBottom = n <= e.diff);
              var s = 0;
              if (
                ((s = e.scrolledTop
                  ? i.topOff
                    ? 0
                    : 0.3 * n
                  : e.scrolledBottom
                  ? i.bottomOff
                    ? e.diff
                    : e.diff + 0.3 * (n - e.diff)
                  : n),
                (this._curPos = s),
                this.setTransform(s),
                this.started || this._curPos === this.lPos || this._start(),
                (this.lPos = this._curPos),
                !this.interval)
              ) {
                var a = this;
                this.interval = setInterval(function () {
                  a._curPos === a.lastPos
                    ? a._stop(a.lastPos)
                    : (a.lastPos = a._curPos);
                }, 1e3);
              }
              if (i.onMove && "function" == typeof i.onMove) {
                var o = Date.now();
                o - e.ltime > i.tgap && (i.onMove.call(null, s), (e.ltime = o));
              }
            }
          },
          _touchend: function (t) {
            var e = this.state,
              i = this.opts.container;
            if (!this._isOff && !window._isDrag) {
              var n = this.getTransform();
              if (n >= 0)
                0 !== n ? this._transition(n, 0, 600) : this._stop(0),
                  (this._curPos = 0);
              else if (n <= e.diff)
                n !== e.diff ? this._transition(n, e.diff, 600) : this._stop(n),
                  (this._curPos = e.diff);
              else {
                var o = Date.now() - e.stime;
                o < 300 && e.dis ? this._buffer(e.dis / (o + 1)) : this._stop(n);
              }
            }
            (e.scrolling = !1),
              (e.scrolledTop = !1),
              (e.scrolledBottom = !1),
              (e.dis = 0),
              clearInterval(this.interval),
              (this.interval = null),
              this.on(),
              (window._isDrag = !1),
              i.removeEventListener(s, this._move, { passive: !0 }),
              i.removeEventListener(a, this._end, { passive: !0 }),
              i.removeEventListener("touchcancel", this._end, { passive: !0 });
          },
          _transition: function (t, e, i) {
            var n, s, a;
            i = i || 300;
            var o = this.opts,
              r = this,
              l = this.state;
            l._transit = window.requestAnimationFrame(function c(d) {
              if (
                (n || (n = d),
                s || (s = d),
                (elapsed = d - n),
                i < elapsed && (elapsed = i),
                (r._curPos = a = t + (e - t) * r.bezier.getPbyT(elapsed / i)),
                r.setTransform(a),
                d - s > o.tgap && (o.onMove.call(null, a), (s = d)),
                elapsed === i)
              )
                return window.cancelAnimationFrame(l._transit), void r._stop(a);
              l._transit = window.requestAnimationFrame(c);
            });
          },
          _buffer: function (t) {
            var e,
              i = this.state,
              n = this.opts,
              s = this.getTransform(),
              a = t,
              o = 0,
              r = this;
            i.animation = window.requestAnimationFrame(function l(c) {
              (a = t - (t / 64) * ++o), e || ((e = c - 16), (i.ltime = c));
              var d = s + (c - e) * a;
              if (
                ((d <= i.diff || d >= 0) && (t /= 1.8),
                n.topBounceOff && d > 0 && (d = 0),
                n.bottomBounceOff && d < i.diff && (d = i.diff),
                (r._curPos = d),
                r.setTransform(d),
                a * t < 0 || Math.abs(t) < 0.1)
              )
                return (
                  0 === d || d === i.diff
                    ? n.onMove && "function" == typeof n.onMove && r._stop(d)
                    : d > 0
                    ? r._transition(d, 0, 300)
                    : d < i.diff
                    ? r._transition(d, i.diff, 300)
                    : r._stop(d),
                  void window.cancelAnimationFrame(i.animation)
                );
              if (n.onMove && "function" == typeof n.onMove) {
                var u = c;
                u - i.ltime > n.tgap && (n.onMove.call(null, d), (i.ltime = u));
              }
              (s = d), (e = c), (i.animation = window.requestAnimationFrame(l));
            });
          },
        }),
        r
      );
    }),
    (function (t) {
      try {
        var e =
          parent.U &&
          parent.U.outer &&
          parent.U.outer.ns &&
          !("ontouchstart" in window);
      } catch (t) {
        e = !1;
      }
      var i = 0,
        n = !1,
        s = 0,
        a = null,
        o = null,
        r = { map: {} },
        l = {};
      function c(t, e) {
        "string" != typeof e && (e = JSON.stringify(e)),
          window.localStorage && localStorage.setItem(t, e);
      }
      function d(t, e) {
        try {
          var i = localStorage.getItem(t);
          i ? e && (i = JSON.parse(i)) : (i = !1);
        } catch (t) {
          console.log(t), (i = !1);
        }
        return i;
      }
      function u(t, s, r, l) {
        $.ajax({
          url: t,
          async: !!l,
          cache: !1,
          dataType: "json",
          success: function (t, i) {
            Object.keys(t).forEach(function (e) {
              s[e] = t[e];
            }),
              c(o, t),
              (function (t) {
                c(a, t);
              })(r.language),
              l || (!e && h.util.initLang(s), r.callback());
          },
          error: function (e, a, o) {
            var c = o || "国际化文件获取异常, 命名: xx.zh.json";
            console.log(c),
              ++i <= 3 && !n
                ? u(t, s, r, l)
                : (console.log("资源获取失败"),
                  l || (h.util.initLang(s), r.callback()));
          },
        });
      }
      function h(t) {
        (this.opts = $.extend(
          {},
          {
            name: "lamp",
            path: "",
            language: "zh",
            pre: "index",
            hooker: null,
            callback: function () {},
          },
          t
        )),
          this._init();
      }
      function p(t) {
        if (t.en) {
          var e = t.en,
            i = t.zh;
          try {
            !(function t(e, i) {
              Object.keys(e).forEach(function (n) {
                "_status" !== n &&
                  ("string" == typeof e[n]
                    ? ((e._profile = e._profile || {}),
                      (i._profile = i._profile || {}),
                      e._status && e._status[n]
                        ? (e._profile[n] = i._profile[n] = "-" + e._status[n])
                        : (e._profile[n] = i._profile[n] = "-hide"))
                    : e[n] && (t(e[n], i[n]), delete e[n]._status));
              });
            })(e, i),
              delete e._status;
          } catch (t) {
            console.warn("请对齐中英文国际化信息");
          }
        }
      }
      function f(t) {
        t &&
          (p(t),
          t._profile &&
            (function (t, e) {
              e = t._profile;
              var i = "";
              Object.keys(e).forEach(function (n) {
                void 0 !== t[n] &&
                  ((i = n + "_" + e[n]), (t[i] = t[n]), delete t[n]);
              }),
                delete t._profile;
            })(t, t._profile),
          Object.keys(t).forEach(function (e) {
            "object" == typeof t[e] && f(t[e]);
          }));
      }
      (h.prototype = {
        constructor: h,
        _init: function () {
          clearTimeout(s);
          var t = this.opts;
          (i = 0),
            (o = t.name + "i18n"),
            (a = t.name + "Lang"),
            !t.path.match(/\/$/) && (t.path += "/");
          var r,
            l = t.path + t.pre + "." + t.language + ".json";
          r = t.hooker ? JSON.parse(JSON.stringify(t.hooker)) : {};
          var c = d(a),
            p = d(o, !0);
          if (!p || c !== t.language || e) u(l, r, t);
          else {
            for (var f in p) r[f] = p[f];
            h.util.initLang(r), t.callback(), u(l, r, t, !0);
          }
          s = setTimeout(function () {
            n = !0;
          }, 1e4);
        },
      }),
        (h.util = {
          setLang: function (t) {
            UCD.binds.util.eo;
            var e = t.id,
              i = t.attr,
              n = t.info || null,
              s = t.title;
            if (n) {
              if (!n.zh) return console.warn(e + ": 国际化信息缺失");
              !s ||
                (l[e] && l[e].attr !== i) ||
                ((l[e] = { attr: i, title: s }), (n.zh["tit_-title"] = s)),
                f(n);
            }
            i ? h.util._setInfo(e, i, n) : h.util._setInfo(e, n);
          },
          initLang: function (t) {
            Object.keys(r).forEach(function (e) {
              (r[e] = {}), "map" === e && (r[e] = t);
            });
          },
          _setInfo: function (t, e, i) {
            var n = UCD.binds.util.eo,
              s = !0;
            void 0 === i && ((i = e), (s = !1)),
              i
                ? Object.keys(i).forEach(function (a) {
                    var o = "zh" === a ? "map" : "map" + a,
                      l = (r[o] && h.util._regroup(r[o], !0)) || {};
                    (l[t] = s ? l[t] || {} : n(i[a], "")),
                      s && (l[t][e] = n(i[a], "")),
                      (r[o] = h.util._getFlatten(l));
                  })
                : Object.keys(r).forEach(function (i) {
                    var n = (r[i] && h.util._regroup(r[i], !0)) || {};
                    s ? n[t] && delete n[t][e] : delete n[t],
                      (r[i] = h.util._getFlatten(n));
                  });
          },
          _filterS: function (t) {
            return (
              "string" == typeof t
                ? (t = t.replace(/[\s\uFEFF\xA0]+$/g, ""))
                : t &&
                  Object.keys(t).forEach(function (e) {
                    t[e] = h.util._filterS(t[e]);
                  }),
              t
            );
          },
          _getByParams: function (t, e) {
            var i = "";
            return (
              "string" == typeof t
                ? (i = t.replace(/\{\{([^{}]*)\}\}/g, function (t, i) {
                    return void 0 === e[i]
                      ? (console.warn("请传入template参数: " + i), i)
                      : e[i];
                  }))
                : t &&
                  (Object.keys(t).forEach(function (i) {
                    t[i] = h.util._getByParams(t[i], e);
                  }),
                  (i = t)),
              i
            );
          },
          getLang: function (t, e, i) {
            var n = UCD.binds.util.getIn,
              s = h.util._getByParams,
              a = "",
              o = {},
              l = $.extend(!0, {}, r.map),
              c = !1;
            return (
              l &&
                (Object.keys(l).forEach(function (e) {
                  e.match(/^\$/) &&
                    null != l[e] &&
                    (t === e ? ((a = l[e]), (c = !0)) : delete l[e]);
                }),
                (o = h.util._regroup(h.util._getPurifiedInfo(t, l)) || {})),
              c
                ? h.util._filterS(a)
                : ((a =
                    "object" == typeof i
                      ? s(n([t, e], o), i)
                      : "string" == typeof i
                      ? n(["map" + ("zh" === i ? "" : i)], r) || {}
                      : "object" == typeof e
                      ? s(n([t], o), e)
                      : n("string" == typeof e ? [t, e] : [t], o)),
                  h.util._filterS(a))
            );
          },
          _getPurifiedInfo: function (t, e) {
            var i = !1;
            e || ((e = t), (i = !0));
            var n = {};
            return (
              Object.keys(e).forEach(function (s) {
                (i || -1 !== s.indexOf(t)) && (n[s.replace(/_.*$/, "")] = e[s]);
              }),
              n
            );
          },
          _getFlatten: function (t) {
            var e = {};
            return (
              (function t(i, n) {
                "object" != typeof i
                  ? (e[n] = i)
                  : i &&
                    Object.keys(i).forEach(function (e) {
                      t(i[e], n ? n + "." + e : e);
                    });
              })(t, ""),
              e
            );
          },
          _regroup: function (t, e) {
            var i = {},
              n = this;
            return (
              t &&
                Object.keys(t).forEach(function (s) {
                  var a = s.match(/(^[^_]+)_?/)[1],
                    o = "";
                  e && (o = UCD.binds.util.getIn([0], s.match(/_.+$/))),
                    (a = a.split(".")),
                    e && (a[a.length - 1] += o || ""),
                    n._setVal(i, a, t[s]);
                }),
              i
            );
          },
          _setVal: function (t, e, i) {
            var n = e.length;
            e.reduce(function (t, s, a) {
              if (((s = Number(s) ? s - 0 : s), a < n - 1))
                return (t[s] = t[s] || (isNaN(Number(e[a + 1])) ? {} : []));
              t[s] = i;
            }, t);
          },
        }),
        (t.i18n = h);
    })(UCD),
    (function (t, e) {
      var i = e.fx.prototype.cur,
        n = e.fn.animate,
        s = function (t) {
          var e = t.css("transform"),
            i = 0,
            n = 0,
            s = 1,
            a = 1,
            o = e.match("matrix3d");
          if ("none" !== e && o) {
            var r = e.split("(")[1].split(")")[0].split(","),
              l = Math.PI,
              c = parseFloat(r[8]),
              d = Math.round((180 * Math.asin(c)) / l),
              u = Math.cos((d * l) / 180),
              h = parseFloat(r[9]),
              p = Math.round((180 * Math.asin(-h / u)) / l),
              f = parseFloat(r[0]),
              m = Math.round((180 * Math.acos(f / u)) / l);
            (i = p),
              (n = d),
              (s = Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2])),
              (a = Math.sqrt(r[4] * r[4] + r[5] * r[5] + r[6] * r[6]));
          } else if ("none" !== e && !o) {
            (p = (r = (r = (r = e.split("(")[1]).split(")")[0]).split(","))[0]),
              (d = r[1]),
              (m = r[2]);
            var v = r[3],
              g = Math.atan2(d, p);
            g < 0 && (g += 2 * Math.PI),
              (i = Math.round(g * (180 / Math.PI))),
              (s = Math.sqrt(p * p + d * d)),
              (a = Math.sqrt(m * m + v * v));
          }
          return { rotateX: i, rotateY: n, scaleX: s, scaleY: a };
        };
      function a(t) {
        var e = t.data("_ARS_data");
        if (!e) {
          var i = s(t);
          (e = {
            rotateUnits: "deg",
            rotateX: i.rotateX,
            rotateY: i.rotateY,
            scaleX: i.scaleX,
            scaleY: i.scaleY,
          }),
            t.data("_ARS_data", e);
        }
        return e;
      }
      function o(t, e, i) {
        "rotate" == i
          ? t.css(
              "transform",
              "perspective(600px) rotateY(" + e.rotateY + e.rotateUnits + ")"
            )
          : "scaleX" == i && t.css("transform", "scaleX(" + e.scaleX + ")");
      }
      (e.fn.rotate = function (t) {
        var i,
          n = e(this),
          s = a(n);
        return void 0 === t
          ? s.rotateY + s.rotateUnits
          : ((i = t.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/)) &&
              (i[3] && (s.rotateUnits = i[3]),
              (s.rotateY = i[1]),
              o(n, s, "rotate")),
            this);
      }),
        (e.fn.scaleX = function (t) {
          var i = e(this),
            n = a(i);
          return void 0 === t
            ? n.scaleX
            : ((n.scaleX = t), o(i, n, "scaleX"), this);
        }),
        (e.fx.prototype.cur = function () {
          return "rotate" == this.prop
            ? parseFloat(e(this.elem).rotate())
            : "scaleX" == this.prop
            ? parseFloat(e(this.elem).scaleX())
            : i.apply(this, arguments);
        }),
        (e.fx.step.rotate = function (t) {
          var i = a(e(t.elem));
          e(t.elem).rotate(t.now + i.rotateUnits);
        }),
        (e.fx.step.scaleX = function (t) {
          e(t.elem).scaleX(t.now);
        }),
        (e.fn.animate = function (t) {
          if (void 0 !== t.rotate) {
            var i = t.rotate.toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);
            i && i[5] && (a(e(this)).rotateUnits = i[5]), (t.rotate = i[1]);
          }
          return n.apply(this, arguments);
        }),
        (e.i18n = e.i18n || {}),
        (e.i18n.map = e.i18n.map || {}),
        (e.i18n.properties = e.i18n.properties || e.noop);
    })(UCD, jQuery),
    (function (t) {
      function e(t) {
        "string" == typeof t && (t = { container: $(t) });
        var i = (this.opts = $.extend(
          {},
          {
            container: "",
            viewport: window,
            effect: "fadeIn",
            selector: ".lazy-load",
            cssClass: "loading",
            eventtype: "scroll.lazy",
            pad: 50,
            placeholder:
              "data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=",
          },
          t
        ));
        if (((i.container = $(i.container)), !i.container.length))
          throw "params: {container: dom// 需懒加载图片的组件 }";
        (this.$elements = i.container.find(i.selector)),
          (this._uid = "lazyload" + e.id++),
          this._init();
      }
      (e.id = 0),
        (e.prototype = {
          constructor: e,
          _init: function () {
            var t = this.opts,
              e = $(t.viewport),
              i = this,
              n = $(window);
            (this._cnt = this.$elements.length),
              (this._lcnt = 0),
              (this.task = []),
              (this.loaded = !1),
              $(function () {
                setTimeout(function () {
                  i._refresh();
                });
              }),
              n.on("pageshow." + this._uid, function (t) {
                setTimeout(function () {
                  i._refresh() && n.off("pageshow." + i._uid);
                });
              }),
              n.on("resize." + this._uid, function () {
                i._refresh() && n.off("resize." + i._uid);
              }),
              e.on("scroll." + this._uid, function () {
                i._refresh() && e.off("scroll." + i._uid);
              }),
              t.container.on("removed", function (t) {
                e.off("scroll." + i._uid),
                  n.off("resize." + i._uid),
                  n.off("pageshow." + i._uid),
                  delete s[i._uid];
              });
            var s = window.lazyloads || (window.lazyloads = {});
            (s[this._uid] = this._refresh.bind(this)),
              i._refresh(!0),
              (this.thr = setInterval(function () {
                i.task.length && (i.refresh(i.task[0]), i.task[0] && i.refresh()),
                  (i.task = []),
                  i.loaded && clearInterval(i.thr);
              }, 200));
          },
          _refresh: function (t) {
            return this.task.push(t), this.loaded;
          },
          refresh: function (t) {
            var e = this.$elements,
              i = this;
            try {
              e.each(function () {
                var e = $(this);
                (t || i._inView(e)) && i._toggle(e, t);
              });
            } catch (t) {
              console.warn(t);
            }
            return (
              (this.loaded = this._loaded()),
              this.loaded && delete lazyloads[this._uid],
              this.loaded
            );
          },
          _loaded: function () {
            return this._lcnt >= this._cnt;
          },
          _toggle: function (t, e) {
            var i = this.opts,
              n = t[0],
              s = !t.is("img"),
              a = t.data("image"),
              o = this;
            if (
              (e &&
                ((a = i.placeholder), t.addClass(i.cssClass), (n.isLoading = !0)),
              !a || !a.length)
            )
              throw (
                (!e && n.isLoading && o._lcnt++,
                "data-image attribute is missing on: ." +
                  t.attr("class").split(" ").join("."))
              );
            n.isLoading &&
              $("<img/>")
                .on("load", function () {
                  if (
                    n.isLoading &&
                    (!e && t.hide(),
                    s
                      ? t.css("background-image", 'url("' + a + '")')
                      : t.attr("src", a),
                    !e)
                  ) {
                    (n.loaded = !0), o._lcnt++;
                    var r = $.grep(o.$elements, function (t) {
                      return !t.loaded;
                    });
                    (o.$elements = $(r)),
                      t.removeClass(i.cssClass),
                      (n.isLoading = !1),
                      t[i.effect]();
                  }
                })
                .bind("error", function () {
                  throw (!e && n.isLoading && o._lcnt++, "failed to load: " + a);
                })
                .attr("src", a);
          },
          _inView: function (t) {
            var e = this.opts,
              i = e.pad,
              n = $(window),
              s = e.viewport,
              a = e.viewport !== window,
              o =
                (a
                  ? $(s).offset().top + $(s).height()
                  : (window.innerHeight ? window.innerHeight : n.height()) +
                    n.scrollTop()) <=
                $(t).offset().top - i,
              r =
                (a
                  ? $(s).offset().left + $(s).width()
                  : n.width() + n.scrollLeft()) <=
                $(t).offset().left - i;
            return !o && !r;
          },
        }),
        (e.trigger = function () {
          var t = window.lazyloads;
          if (t)
            for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && t[e]();
        }),
        ($.event.special.removed = {
          remove: function (t) {
            "removed" === t.type && t.handler && t.handler();
          },
        }),
        (t.lazyload = e);
    })(UCD),
    (function (t) {
      var e = "ontouchstart" in window,
        i = e ? "touchmove" : "mousemove",
        n = e ? "touchend" : "mouseup",
        s = "gesturechange",
        a = "gestureend",
        o = function (t) {
          return e && (t.originalEvent.touches || t.touches);
        },
        r = {
          isPad: e,
          target: [],
          _lock: !1,
          startX: null,
          endX: null,
          moveX: null,
          startY: null,
          endY: null,
          moveY: null,
          startTime: null,
          endTime: null,
          moveTime: null,
          startTarget: null,
          endTarget: null,
          mtStartY: null,
          mtLastY: null,
          mtLastMoveTime: null,
          mtLastMoveStart: null,
          mtStopInertiaMove: !1,
          direction: "",
          CLICK: e ? "touchstart" : "mousedown",
          START: e ? "touchstart" : "mousedown",
          MOVE: i,
          END: n,
          GESTURESTART: "gesturestart",
          GESTURECHANGE: s,
          GESTUREEND: a,
          isIn: function (t, e) {
            if (isNaN(e.left) || isNaN(e.top)) return !1;
            var i = $(t),
              n = i.outerWidth(),
              s = i.outerHeight(),
              a = i.offset();
            return (
              e.left >= a.left &&
              e.left <= a.left + n &&
              e.top >= a.top &&
              e.top <= a.top + s
            );
          },
          lock: function () {
            r._lock = !0;
          },
          unLock: function () {
            r._lock = !1;
          },
          active: function (t) {
            $(t).data("TOUCHABLE", !0);
          },
          forbid: function (t) {
            $(t).data("TOUCHABLE", !1);
          },
          available: function (t) {
            return $(t).data("TOUCHABLE");
          },
          exceptDom: [],
          except: function (t) {
            "string" != $.type(t) && (t = $(t)[0]),
              r.isExceptDom(t) ||
                (r.exceptDom.push(t),
                $(t).live(r.START, function () {
                  return !1;
                }));
          },
          timestamp: function () {
            return new Date().getTime();
          },
          removeFromExcept: function (t) {
            "string" != $.type(t) && (t = $(t)[0]),
              (r.exceptDom = $.grep(r.exceptDom, function (e) {
                return e != t;
              }));
          },
          isExceptDom: function (t) {
            "string" != $.type(t) && (t = $(t)[0]);
            var e = !1;
            return (
              $.each(r.exceptDom, function () {
                var i;
                if (
                  ("string" == $.type(this) && (i = "" + this),
                  (i = $(i)),
                  0 != $(t).closest(i).length &&
                    -1 == $.inArray($(t)[0], r.target))
                )
                  return (e = !0), !1;
              }),
              e
            );
          },
          init: function (t) {
            var l = (r.$target = $(t.target));
            if (0 != l.length) {
              var c = l[0];
              if (-1 == $.inArray(c, r.target)) {
                var d = t.onTouchStart,
                  u = t.onTouch,
                  h = t.onTouchEnd;
                r.target.push(c);
                var p = !1;
                l.unbind(r.START).bind(r.START, function (t) {
                  if (p || r._lock) r._lock = !1;
                  else {
                    var s,
                      l = this;
                    if (
                      ((function (t, s) {
                        var l = e ? o(t) : t;
                        e && (l = l[0]);
                        var c = t.target;
                        r.isExceptDom(c) ||
                          r._lock ||
                          ($(":focus:not('body')").blur(),
                          (r.$target = $(s || c)),
                          r.lock(),
                          (r.startX = r.endX = r.moveX = l.pageX),
                          (r.startY = r.endY = r.moveY = l.pageY),
                          (r.startTime = r.endTime = r.moveTime = r.timestamp()),
                          (r.startTarget = r.endTarget = r.moveTarget = c),
                          (r.mtLastY = r.mtStartY = l.pageY),
                          (r.mtLastMoveStart = r.mtLastY),
                          (r.mtLastMoveTime = r.timestamp()),
                          (r.mtStopInertiaMove = !0),
                          $(document)
                            .unbind(".touch")
                            .unbind(a, v)
                            .bind(a, v)
                            .unbind(i + ".touch")
                            .unbind(n + ".touch")
                            .bind(i + ".touch", f)
                            .bind(n + ".touch", m),
                          $.isFunction(d) && d.call(r, l));
                      })(t, this),
                      $.each(r.target, function () {
                        if ($.contains(this, l)) return (s = !0), !1;
                      }),
                      s)
                    )
                      return !1;
                  }
                }),
                  e &&
                    l.unbind("gesturestart").bind("gesturestart", function () {
                      p = !1;
                    }),
                  $.isFunction(t.callback) && t.callback.call(r);
              }
            }
            function f(t) {
              var i = e ? o(t) : t;
              if (i.length && i.length > 3)
                return (
                  $(this)
                    .trigger(a)
                    .trigger(n + ".touch", t),
                  void (e && t.preventDefault())
                );
              e && (i = i[0]),
                (r.moveX = r.endX),
                (r.moveY = r.endY),
                (r.moveTime = r.endTime),
                (r.endX = i.pageX),
                (r.endY = i.pageY),
                (r.endTime = r.timestamp()),
                (r.moveTarget = r.endTarget),
                (r.endTarget = t.target),
                (parent.clickable = !1),
                $.isFunction(u) && u.call(r, r, i);
            }
            function m(t) {
              r.unLock(),
                p ||
                  ((r.endTime = new Date().getTime()),
                  $.isFunction(h) && h.call(r, t),
                  (r.startX = null),
                  (r.endX = null),
                  (r.moveX = null),
                  (r.startY = null),
                  (r.endY = null),
                  (r.moveY = null),
                  (r.startTime = null),
                  (r.endTime = null),
                  (r.moveTime = null),
                  (r.startTarget = null),
                  (r.moveTarget = null),
                  (r.endTarget = null),
                  (parent.clickable = !0),
                  (p = !1),
                  $(document)
                    .unbind(".touch")
                    .unbind(s)
                    .unbind(a)
                    .unbind(i + ".touch")
                    .unbind(n + ".touch"),
                  e && t.preventDefault());
            }
            function v() {
              p = !1;
            }
          },
        };
      t.Touch = r;
    })(UCD),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./UCD.js")))
        : (t.UCD.SwitchCard = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(i) {
        (this.opts = t.extend(
          {},
          {
            container: document.body,
            type: "icon",
            label: "",
            iconShow: !0,
            iconName: "",
            active: 0,
            subtitle: "",
            longtap: !1,
            maxWidth: !0,
            droplist: null,
            change: t.noop,
            onClick: t.noop,
            onLongPress: t.noop,
          },
          i
        )),
          (this.$element = t(this.opts.container)),
          this._create(),
          e.util.init(this);
      }
      return (
        (i.prototype = {
          constructor: i,
          toggleActive: function (t) {
            (this.opts.active = t ? 1 : 0),
              this.$element.toggleClass("active", !!t),
              t &&
                this.$element.find(".card-text").length > 0 &&
                D.sdk.utils.patchFontSize(
                  this.$element,
                  1,
                  ".card-inner .card-text",
                  9
                ),
              "switch" == this.opts.type &&
                this.$element
                  .find(".ti-switch")
                  .toggleClass("ti-switch-on", !!t)
                  .toggleClass("ti-switch-off", !t);
          },
          setSubtitle: function (t) {
            this.$subtitle.text(t),
              this.$subtitle
                .attr("style", "")
                .css(D.sdk.utils.setFontSize(this.$subtitle, 1, 9));
          },
          open: function () {
            var i = this;
            this._updatePosition(),
              t(".ucd-droplist-option").removeClass("active"),
              this.$dropdown.show(),
              (this.state.open = !0),
              t(document).on(e.Events.DOWN, function (t) {
                i._tryClose(t);
              });
          },
          close: function () {
            var t = this;
            setTimeout(function () {
              t.$dropdown.hide(), (t.state.open = !1);
            }, 100);
          },
          getSelected: function (e) {
            return this.$dropdown
              .find(".selected")
              .map(function () {
                return e ? t(this).text() : t(this).data("value");
              })
              .toArray();
          },
          select: function (e) {
            if (t.isNumeric(e) && this.selected !== e && this.$dropdown) {
              var i = this.$dropdown.find(
                ".ucd-droplist-option[data-value=" + e + "]"
              );
              i.length
                ? (i.addClass("selected").siblings().removeClass("selected"),
                  this._updateValue(!1, null, this))
                : this.unselect();
            }
          },
          unselect: function () {
            (this.selected = null),
              this.$dropdown
                .find(".ucd-droplist-option.selected")
                .removeClass("selected"),
              this.setSubtitle("");
          },
          disable: function (t) {
            this.$element.toggleClass("ucd-disabled disabled", !1 !== t);
          },
          _create: function () {
            var i = this.opts,
              n = this,
              s = e.util.template(
                '<div class="card-inner">  <% if(iconShow && (type == "icon"||type == "select")) { %> <i class="card-icon <%= iconName %>"></i> <% } %>  <% if(type == "switch") { %> <div role="radio" class="ti-switch ti-switch-off"><div class="ti-switch-content"><div class="ti-switch-content-box"></div><span class="ti-switch-left"></span><span class="ti-switch-right"></span></div></div> <% } %>  <p class="card-status"><%= label %></p>  <p class="card-text"><%= subtitle %></p></div><% if(type == "select") { %><div class="ucd-droplist-content clearfix" style="display: none;">  <div class="ucd-droplist-wrapper">  <% for(var i = 0, len = droplist ? droplist.length : 0; i < len; i++) { %>    <div class="ucd-droplist-option" data-value="<%= droplist[i].value %>"><span><%= droplist[i].label %></span></div>  <% } %>  </div></div><% } %>'
              )(i),
              a = this.$element,
              o = a.attr("id");
            a.addClass("ucd-grid-card ui-grid-card").html(s),
              (this.$subtitle = this.$element.find(".card-text")),
              "select" == i.type &&
                (this.toggleActive(1),
                (this.state = { open: !1 }),
                (this.$dropdown = a
                  .children(".ucd-droplist-content")
                  .attr("data-for", o)),
                t("body")
                  .children(".ucd-droplist-content[data-for=" + o + "]")
                  .remove(),
                this.$dropdown.appendTo(t("body")),
                this.$dropdown.find(".ucd-droplist-option").tap(function (t) {
                  n._selectOption(t, n);
                }),
                this.$dropdown.on(
                  "touchstart",
                  ".ucd-droplist-option",
                  function (t) {
                    n._onTouchstart(t, n);
                  }
                ),
                a.on("touchmove", function (t) {
                  n._onDropTouchmove(t, n);
                }),
                i.droplist.length && n.select(i.droplist[0].value),
                (this.bounce = new e.Bounce({
                  container: this.$dropdown[0],
                  target: this.$dropdown.find(".ucd-droplist-wrapper")[0],
                  isInner: !0,
                }))),
              "switch" == i.type
                ? a.tap(function (t) {
                    n._onClick(t, n);
                  }, ".ti-switch")
                : a.tap(function (t) {
                    n._onClick(t, n);
                  }),
              i.longtap &&
                a.longtap(function (t) {
                  n._onLongPress(t, n);
                }),
              i.disabled && this.disable();
          },
          _onDropTouchmove: function (t, e) {
            e.state.open && e.close();
          },
          _onTouchstart: function (t) {
            for (var i = e.Bounce.instances, n = 0, s = i.length; n < s; n++) {
              i[n].opts.target.className.match("ucd-droplist-wrapper") ||
                "function" != typeof i[n].off ||
                i[n].off();
            }
          },
          _onClick: function (t, e) {
            var i = e.opts,
              n = e.$dropdown;
            if (-1 == t.target.className.indexOf("stopPropagation"))
              return (
                n && n.length
                  ? e.state.open
                    ? e.close()
                    : e.open()
                  : i.onClick.call(null, i.active ? 0 : 1),
                !1
              );
          },
          _onLongPress: function (t, e) {
            return e.opts.onLongPress(t), !1;
          },
          _updatePosition: function () {
            var e = this.$element,
              i = this.$dropdown,
              n = parseInt(t("html").css("font-size")),
              s = 0.2222 * n,
              a = 2 * n,
              o = e.offset().top,
              r = e.offset().left,
              l = e.width(),
              c = e.height(),
              d = i.height(),
              u = o - t(document).scrollTop() - s - a > d,
              h = e.closest(".main-page-content").width(),
              p = (h - s) / 2,
              f = l;
            this.opts.maxWidth && h && f > p && (f = p),
              i.css({ display: "block", width: "auto", opacity: 0 });
            var m = i[0].clientWidth;
            m > l && (m = l),
              !e.parent().hasClass("grid-col2") && m > p && (f = m + 4),
              i.css({ width: f }),
              this.$dropdown.find(".ucd-droplist-option span").length > 0 &&
                D.sdk.utils.patchFontSize(
                  this.$dropdown,
                  2,
                  ".ucd-droplist-option span",
                  12
                ),
              i.css({
                top: u ? o - d - s : o + c + s,
                left: r,
                width: f,
                opacity: 1,
              });
          },
          _selectOption: function (e, i) {
            this.opts;
            var n = t(e.target).closest(".ucd-droplist-option");
            if (n.is(":disabled") || n.is(".disabled")) return !1;
            n.addClass("selected"),
              n.siblings(".selected").removeClass("selected"),
              i._updateValue(e.ctrlKey, !0, i);
          },
          _updateValue: function (t, e, i) {
            var n = i.getSelected();
            i.setSubtitle(i.getSelected(!0)),
              (i.selected = n[0]),
              !0 === e && i.opts.change.call(null, i.selected),
              t || i.close();
          },
          _tryClose: function (e) {
            var i = t(e.target),
              n = i.closest(".ucd-droplist-content"),
              s = i.closest(".ucd-grid-card");
            (this.$dropdown && n.is(this.$dropdown)) ||
              s.is(this.$element) ||
              this.close();
          },
        }),
        e.util.register(i)
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./UCD.js")))
        : (t.UCD.DroplistCard = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(i) {
        (this.opts = t.extend(
          {},
          {
            container: document.body,
            label: "",
            iconName: "",
            subtitle: "",
            maxWidth: !0,
            data: null,
            change: t.noop,
            onClick: t.noop,
          },
          i
        )),
          (this.$element = t(this.opts.container)),
          this._create(),
          e.util.init(this);
      }
      return (
        (i.prototype = {
          constructor: i,
          setSubtitle: function (t) {
            this.$subtitle.text(t),
              this.$subtitle
                .attr({ style: "", class: "card-text" })
                .css(D.sdk.utils.setFontSize(this.$subtitle, 1, 9));
          },
          setEnable: function (t) {
            var e = this.opts.data,
              i = this.selected,
              n = [];
            if (!1 === t) n = n.concat(e);
            else
              for (var s = 0; s < e.length; s++) {
                var a = e[s];
                -1 != t.indexOf(a.value) && n.push(a);
              }
            this.state.open && this.close(!0),
              this._setData(n),
              (!1 !== t && -1 == t.indexOf(i)) ||
                ((this.selected = null), this.select(i));
          },
          open: function () {
            var i = this;
            this._updatePosition(),
              t(".ucd-droplist-option").removeClass("active"),
              this.$dropdown.show(),
              (this.state.open = !0),
              t(document).on(e.Events.DOWN, function (t) {
                i._tryClose(t);
              });
          },
          close: function (t) {
            var e = function () {
              this.$dropdown.hide(), (this.state.open = !1);
            }.bind(this);
            t ? e() : setTimeout(e, 100);
          },
          getSelected: function (e) {
            return this.$dropdown
              .find(".selected")
              .map(function () {
                return e ? t(this).text() : t(this).data("value");
              })
              .toArray();
          },
          select: function (e) {
            if (t.isNumeric(e) && this.selected !== e) {
              var i = this.$dropdown.find(
                ".ucd-droplist-option[data-value=" + e + "]"
              );
              i.length
                ? (i.addClass("selected").siblings().removeClass("selected"),
                  this._updateValue(!1, null))
                : this.unselect();
            }
          },
          unselect: function () {
            (this.selected = null),
              this.$dropdown
                .find(".ucd-droplist-option.selected")
                .removeClass("selected"),
              this.setSubtitle("");
          },
          disable: function (t) {
            this.$element.toggleClass("ucd-disabled disabled", !1 !== t);
          },
          _setData: function (t) {
            for (var e = "", i = 0; i < t.length; i++) {
              var n = t[i];
              e +=
                '<div class="ucd-droplist-option" data-value="' +
                n.value +
                '"><span>' +
                n.label +
                "</span></div>";
            }
            this.$wrapper.html(e);
          },
          _create: function () {
            var i = this.opts,
              n = this,
              s = e.util.template(
                '<div class="card-inner">  <i class="card-icon <%= iconName %>"></i>  <p class="card-status"><%= label %></p>  <p class="card-text"><%= subtitle %></p></div><div class="ucd-droplist-content clearfix" style="display: none;">  <div class="ucd-droplist-wrapper">  <% for(var i = 0, len = data ? data.length : 0; i < len; i++) { %>    <div class="ucd-droplist-option" data-value="<%= data[i].value %>"><span><%= data[i].label %></span></div>  <% } %>  </div></div>'
              )(i),
              a = this.$element,
              o = a.attr("id");
            a.addClass("ucd-grid-card ui-grid-card").html(s),
              t("body")
                .children(".ucd-droplist-content[data-for=" + o + "]")
                .remove(),
              (this.$subtitle = this.$element.find(".card-text")),
              (this.state = { open: !1 }),
              (this.$wrapper = a.find(".ucd-droplist-wrapper")),
              (this.$dropdown = a
                .children(".ucd-droplist-content")
                .attr("data-for", o)
                .appendTo(t("body"))),
              this.$dropdown.on(
                "touchstart",
                ".ucd-droplist-option",
                function (t) {
                  n._onTouchstart.call(n, t);
                }
              ),
              a.on("touchmove", function (t) {
                n._onDropTouchmove.call(n, t);
              }),
              i.data.length && this.select(i.data[0].value),
              (this.bounce = new e.Bounce({
                container: this.$dropdown[0],
                target: this.$dropdown.find(".ucd-droplist-wrapper")[0],
                isInner: !0,
              })),
              a.tap(function (t) {
                n._onClick.call(n, t);
              }),
              this.$dropdown.tap(function (t) {
                n._selectOption.call(n, t);
              }, ".ucd-droplist-option"),
              i.disabled && this.disable();
          },
          _onDropTouchmove: function (t) {
            this.state.open && this.close();
          },
          _onTouchstart: function (t) {
            for (var i = e.Bounce.instances, n = 0, s = i.length; n < s; n++) {
              i[n].opts.target.className.match("ucd-droplist-wrapper") ||
                "function" != typeof i[n].off ||
                i[n].off();
            }
          },
          _onClick: function (t) {
            var e = this.$dropdown;
            if (-1 == t.target.className.indexOf("stopPropagation"))
              return (
                e && e.length && (this.state.open ? this.close() : this.open()),
                !1
              );
          },
          _updatePosition: function () {
            var e = this.$element,
              i = this.$dropdown,
              n = parseInt(t("html").css("font-size")),
              s = 0.2222 * n,
              a = 2 * n,
              o = e.offset().top,
              r = e.offset().left,
              l = e.width(),
              c = e.height(),
              d = i.height(),
              u = o - t(document).scrollTop() - s - a > d,
              h = e.closest(".main-page-content").width(),
              p = (h - s) / 2,
              f = l;
            this.opts.maxWidth && h && f > p && (f = p),
              i.css({ display: "block", width: "auto", opacity: 0 });
            var m = i[0].clientWidth;
            m > l && (m = l),
              !e.parent().hasClass("grid-col2") && m > p && (f = m + 4),
              i.css({ width: f }),
              this.$dropdown.find(".ucd-droplist-option span").length > 0 &&
                D.sdk.utils.patchFontSize(
                  this.$dropdown,
                  2,
                  ".ucd-droplist-option span",
                  12
                ),
              i.css({
                top: u ? o - d - s : o + c + s,
                left: r,
                width: f,
                opacity: 1,
              });
          },
          _selectOption: function (e) {
            this.opts;
            var i = t(e.target).closest(".ucd-droplist-option");
            if (i.is(":disabled") || i.is(".disabled")) return !1;
            i.addClass("selected"),
              i.siblings(".selected").removeClass("selected"),
              this._updateValue(e.ctrlKey, !0);
          },
          _updateValue: function (t, e) {
            var i = this.getSelected();
            this.setSubtitle(this.getSelected(!0)),
              (this.selected = i[0]),
              !0 === e && this.opts.change.call(null, this.selected),
              t || this.close();
          },
          _tryClose: function (e) {
            var i = t(e.target),
              n = i.closest(".ucd-droplist-content"),
              s = i.closest(".ucd-grid-card");
            (this.$dropdown && n.is(this.$dropdown)) ||
              s.is(this.$element) ||
              this.close();
          },
        }),
        e.util.register(i)
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.RangeSlider = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(i) {
        (this.opts = t.extend(
          {},
          {
            disabled: !1,
            value: 0,
            range: { min: 0, max: 100 },
            step: null,
            showTip: !1,
            onFormatTip: Math.round,
            container: t("body"),
          },
          i
        )),
          (this.$element = t(this.opts.container)),
          this._create(),
          e.util.init(this);
      }
      function n(t, e) {
        t.$element.toggleClass("ucd-disabled disabled", !1 !== e);
      }
      function s(t) {
        return t.$element
          .find(".ucd-rangeslider-wrap")
          [t.opts.vertical ? "height" : "width"]();
      }
      function a(t, i) {
        return (function (t, i) {
          var n = p(t, i, e.util.property("percent"));
          if (e.util.defined(n[0]) && e.util.defined(n[1])) {
            var s = t[n[0]],
              a = t[n[1]];
            if (s.percent <= i && i <= a.percent)
              return u(i, s.percent, a.percent, s.value, a.value);
          } else {
            var o = t[n.value];
            if (i >= o.percent || i <= o.percent) return o.value;
          }
          throw new Error("invalid range or percent" + n + ", " + i);
        })(t._transformedRange, i);
      }
      function o(t, i) {
        return (function (t, i) {
          var n = p(t, i, e.util.property("value"));
          if (e.util.defined(n[0]) && e.util.defined(n[1])) {
            var s = t[n[0]],
              a = t[n[1]];
            if (s.value <= i && i <= a.value)
              return u(i, s.value, a.value, s.percent, a.percent);
          } else {
            var o = t[n.value];
            if (i >= o.value || i <= o.value) return o.percent;
          }
          throw new Error("invalid range or value" + n + ", " + i);
        })(t._transformedRange, i);
      }
      function r(e, i, n, s, a, r) {
        t.isNumeric(s) || (s = o(e, n)),
          (e._value = n),
          (function (t, e, i, n) {
            var s = t.opts;
            e.css(t.opts.vertical ? "height" : "width", i + "%"),
              s.showTip &&
                s.onFormatTip &&
                e.find(".ucd-rangeslider-tip").html(s.onFormatTip.call(t, n));
          })(e, i, s, n),
          a && e.opts.change && e.opts.change.call(null, e.$element, n);
      }
      function l(e, i, n, s) {
        var l = e.opts,
          c = a(e, n);
        if (d(e._value, c)) return !1;
        if (t.isNumeric(l.step)) {
          var u = Math.round((c - l.range.min) / l.step) * l.step + l.range.min;
          d(u, c) || ((n = o(e, u)), (c = u));
        }
        if (d(e._value, c)) return !1;
        r(e, i, c, n, !0);
      }
      function c(t) {
        return t.$element.find(".ucd-rangeslider-bar");
      }
      function d(t, e) {
        return !isNaN(t) && !isNaN(e) && Math.abs(t - e) < 1e-6;
      }
      function u(t, e, i, n, s) {
        return d(i, e) ? e : n + ((s - n) * (t - e)) / (i - e);
      }
      function h(t) {
        return e.util
          .toArray(t, function (t, e) {
            return {
              percent: "min" === e ? 0 : "max" === e ? 100 : parseInt(e, 10),
              value: t,
            };
          })
          .sort(function (t, i) {
            return e.util.ascend(t.percent, i.percent);
          });
      }
      function p(t, e, i) {
        for (
          var n, s, a, o, r, l = 0, c = t ? t.length : 0;
          l < c &&
          ((o = t[l]),
          (r = i ? i(o) : o) <= e ? (s = l) : r >= e && (a = l),
          isNaN(a));

        )
          l++;
        if (((n = [s, a]), isNaN(s))) n.value = a;
        else if (isNaN(a)) n.value = s;
        else {
          var d = i ? i(t[s]) : t[s],
            u = i ? i(t[a]) : t[a];
          n.value = Math.abs(e - d) < Math.abs(e - u) ? s : a;
        }
        return n;
      }
      return (
        (i.prototype = {
          constructor: i,
          setValue: function (e) {
            if (((e = parseFloat(e, 10)), !isNaN(e))) {
              !(function (e, i, n) {
                var s = n.opts;
                if (d(n._value, i)) return !1;
                t.isNumeric(s.step) &&
                  (i =
                    Math.round((i - s.range.min) / s.step) * s.step +
                    s.range.min);
                if (d(n._value, i)) return !1;
                r(n, e, i);
              })(c(this), e, this);
            }
          },
          getValue: function () {
            return this._value;
          },
          disable: function (t) {
            n(this, t);
          },
          setEnable: function (t) {
            var e = this._value;
            (t =
              !1 === t
                ? this.defaultRange
                : (function (t, e, i) {
                    var n = [],
                      s = t.min,
                      a = t.max,
                      o = e[0];
                    void 0 === s || void 0 === a
                      ? (void 0 === s
                          ? (n[0] = o)
                          : ((s - o) % i == 0 && (s += i),
                            (n[0] = Math.ceil((s - o) / i) * i + o)),
                        void 0 === a
                          ? (n[1] = e[1])
                          : ((a - o) % i == 0 && (a -= i),
                            (n[1] = Math.floor((a - o) / i) * i + o)))
                      : (n = [
                          Math.ceil((s - o) / i) * i + o,
                          Math.floor((a - o) / i) * i + o,
                        ]);
                    return n;
                  })(t, this.defaultRange, this.opts.step)),
              (this.opts.range = { min: t[0], max: t[1] }),
              (this._transformedRange = h(this.opts.range)),
              (this._value = null),
              this.setValue(e);
          },
          getRange: function () {
            return [this.opts.range.min, this.opts.range.max];
          },
          _create: function () {
            var i = this.opts,
              a = this.$element;
            a
              .html(
                '<div class="ucd-rangeslider"> <div class="ucd-rangeslider-wrap">      <div class="ucd-rangeslider-bar">        <div class="ucd-rangeslider-handle"><span class="ucd-handle-circle"></span></div>      </div>    </div> </div>'
              )
              .toggleClass("ucd-rangeslider-inside", 1 == i.inside)
              .toggleClass("ucd-rangeslider-vertical", 1 == i.vertical),
              i.showTip &&
                a
                  .find(".ucd-rangeslider-handle")
                  .append('<div class="ucd-rangeslider-tip"></div>'),
              i.create && i.create.call(null, null, this, i.range),
              (this._transformedRange = h(i.range)),
              (this.defaultRange = [i.range.min, i.range.max]);
            var o = a.find(".ucd-rangeslider-wrap"),
              r = a.find(".ucd-rangeslider-handle"),
              u = this;
            if (
              (o.tap(function (e) {
                !(function (e, i) {
                  if (
                    e._isDragging ||
                    -1 != i.target.className.indexOf("ucd-rangeslider-handle")
                  )
                    return;
                  var n,
                    a,
                    o = t(i.target);
                  n = i.touches
                    ? i.touches[0][e.opts.vertical ? "clientY" : "clientX"] -
                      Math.round(
                        t(i.target).offset()[e.opts.vertical ? "top" : "left"]
                      )
                    : i[e.opts.vertical ? "offsetY" : "offsetX"];
                  if (
                    o.closest(".ucd-disabled").length ||
                    o.closest("[disabled]").length
                  )
                    return !1;
                  if (
                    o.is(".ucd-rangeslider-wrap") ||
                    o.is(".ucd-rangeslider-bar")
                  ) {
                    o.is(".ucd-rangeslider-bar") &&
                      ((a = o.position()[e.opts.vertical ? "top" : "left"]) < 0
                        ? n < -a
                          ? (n = 0)
                          : (n += a)
                        : n < a
                        ? (n = 0)
                        : (n -= a));
                    var r = s(e),
                      d = (100 * n) / r;
                    l(e, c(e), d, i);
                  }
                })(u, e);
              }),
              r.on(e.Events.DOWN, function (i) {
                !(function (i, n) {
                  var a = t(n.target),
                    o = t(document),
                    r = ".ucd.rangeslider",
                    c = a.closest(".ucd-rangeslider-bar"),
                    u = e.Events.getEvent(n),
                    h = u.pageX,
                    p = u.pageY,
                    f = h,
                    m = p;
                  (function (e, i, n) {
                    n.stopPropagation(),
                      e.$element.addClass("ucd-rangeslider-drag"),
                      i.addClass("ucd-rangeslider-active"),
                      (e._beforeDrag = i[e.opts.vertical ? "height" : "width"]()),
                      t(n.target).trigger("onDragStart", e, n);
                  })(i, c, n),
                    o
                      .on(e.Events.MOVE + r, function (t) {
                        var n = e.Events.getEvent(t);
                        (f = n.pageX - h),
                          (m = n.pageY - p),
                          (function (t, e, i, n, a) {
                            if (
                              (i.stopPropagation(),
                              t.$element.closest(".ucd-disabled").length ||
                                t.$element.closest("[disabled]").length)
                            )
                              return !1;
                            (t._isDragging = !0),
                              (function (t, e, i, n) {
                                var a = s(t),
                                  o = d(0, a) ? 0 : (100 * i) / a;
                                o < 0 ? (o = 0) : o > 100 && (o = 100);
                                l(t, e, o, n);
                              })(
                                t,
                                e,
                                t._beforeDrag + (t.opts.vertical ? a : n),
                                i
                              );
                          })(i, c, t, f, m);
                      })
                      .on(e.Events.UP + r, function (n) {
                        a.off(e.Events.MOVE + r + " " + e.Events.UP + r),
                          o.off(e.Events.MOVE + r + " " + e.Events.UP + r),
                          (function (e, i, n) {
                            if (
                              (n.stopPropagation(),
                              e.$element.closest(".ucd-disabled").length ||
                                e.$element.closest("[disabled]").length)
                            )
                              return !1;
                            e.$element.removeClass("ucd-rangeslider-drag"),
                              i.removeClass("ucd-rangeslider-active"),
                              setTimeout(
                                function () {
                                  e._isDragging = !1;
                                }.bind(e),
                                100
                              ),
                              e.opts.change &&
                                e.opts.change.call(null, e.$element, e._value),
                              t(n.target).trigger("onDragEnd", e, n);
                          })(i, c, n);
                      });
                })(u, i);
              }),
              t.isNumeric(i.value) && this.setValue(i.value),
              i.disabled && n(u, i.disabled),
              i.hasModal)
            ) {
              a.after('<div class="set-modal"></div>'),
                a.siblings(".card-text").addClass("input-modal");
              var p = !!navigator.userAgent.match(
                /\(i[^;]+;( U;)? CPU.+Mac OS X/
              );
              if (!u.isSetModalDialog) {
                var f = [
                  '<div class="insulateNew">' +
                    (i.langInfo.setBrightness ||
                      i.langInfo.settemperature ||
                      "") +
                    "</div>",
                  '<div class="input-wrap-box">',
                  '   <input class="nameInput" type="text" placeholder="' +
                    i.langInfo.cctholder +
                    '" maxlength="' +
                    (i.langInfo.setBrightness ? 3 : 4) +
                    '"/>',
                  '   <div class="clearContImg"></div>',
                  "</div>",
                  '<span class="tips-warning reg-string">' +
                    i.langInfo.errortip +
                    "</span>",
                  '<span class="tips-warning reg-null">' +
                    i.langInfo.errortip +
                    "</span>",
                ];
                t(
                  ".ucd-createname.set-modal." +
                    (i.langInfo.setBrightness
                      ? "brightness"
                      : i.langInfo.settemperature && "cct")
                ).remove(),
                  (u.isSetModalDialog = new e.Dialog({
                    dialogClassName:
                      "ucd-createname switch-light set-modal " +
                      (i.langInfo.setBrightness
                        ? "brightness"
                        : i.langInfo.settemperature && "cct"),
                    buttons: [
                      {
                        className: "btn-cancel",
                        label: i.langInfo.cancel,
                        handler: function () {
                          var t = u.isSetModalDialog.element.find(
                            ".clearContImg"
                          );
                          u.isSetModalDialog.element.find(".nameInput").val(""),
                            t.removeClass("none").addClass("block"),
                            u.isSetModalDialog.element.hide();
                        },
                      },
                      {
                        className: "btn-ok",
                        label: i.langInfo.commit,
                        handler: function () {
                          var t,
                            e = u.isSetModalDialog.element.find(".clearContImg"),
                            n =
                              "" +
                              u.isSetModalDialog.element.find(".nameInput").val(),
                            s = new RegExp(/"|{|}|\/|\\|&|<|>|'|`/);
                          (t =
                            !isNaN(Number(n)) &&
                            Number(n) <= i.range.max &&
                            Number(n) >= i.range.min &&
                            n.length &&
                            !n.match(/[^0-9]/)),
                            s.test(n)
                              ? u.isSetModalDialog.element
                                  .find(".ucd-dialog-content")
                                  .addClass("reg-string")
                                  .removeClass("reg-null")
                              : n.match(/^[ ]+$/) || !t
                              ? u.isSetModalDialog.element
                                  .find(".ucd-dialog-content")
                                  .addClass("reg-null")
                                  .removeClass("reg-string")
                              : (u.isSetModalDialog.element.hide(),
                                i.change(u.isSetModalDialog.$content, n)),
                            e.removeClass("none").addClass("block"),
                            u.isSetModalDialog.element.find(".nameInput").blur();
                        },
                      },
                    ],
                    content: f.join(""),
                  })),
                  u.isSetModalDialog.element.hide(),
                  u.isSetModalDialog.element
                    .find(".clearContImg")
                    .tap(function () {
                      t(this).removeClass("block").addClass("none"),
                        u.isSetModalDialog.$content.removeClass(
                          "reg-string reg-null"
                        ),
                        p
                          ? u.isSetModalDialog.element
                              .find(".nameInput")
                              .focus()
                              .val("")
                          : setTimeout(function () {
                              u.isSetModalDialog.element
                                .find(".nameInput")
                                .focus()
                                .val("");
                            }, 200);
                    }),
                  p
                    ? u.isSetModalDialog.element
                        .find(".nameInput")
                        .tap(function () {
                          t(this).focus().val(),
                            u.isSetModalDialog.$content.removeClass(
                              "reg-string reg-null"
                            );
                        })
                    : u.isSetModalDialog.element
                        .find(".nameInput")
                        .focus(function () {
                          u.isSetModalDialog.$content.removeClass(
                            "reg-string reg-null"
                          );
                        });
              }
              function m() {
                u.isSetModalDialog.element.show(),
                  u.isSetModalDialog.$content.removeClass("reg-string reg-null");
                var t = u.$element
                  .siblings(".card-text.input-modal")
                  .text()
                  .split(/\k|\K|\%/)[0];
                u.isSetModalDialog.element.find(".nameInput").focus().val(t);
              }
              a.siblings(".set-modal").tap(function () {
                p
                  ? m()
                  : setTimeout(function () {
                      m();
                    }, 200);
              });
            } else
              a.siblings(".card-text").removeClass("input-modal"),
                a.siblings(".set-modal").remove(),
                u.isSetModalDialog && u.isSetModalDialog.element.remove();
          },
        }),
        e.util.register(i)
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.Spinner = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(i) {
        (this.opts = t.extend(
          {},
          {
            container: document.body,
            value: 0,
            range: { min: 0, max: 100 },
            step: 1,
            title: "",
            unit: "",
            custom: !1,
            onclick: t.noop,
          },
          i
        )),
          (this.$element = t(this.opts.container)),
          this._create(),
          e.util.init(this);
      }
      return (
        (i.prototype = {
          constructor: i,
          setTitle: function (t) {
            this.$element.find(".ui-spinner-title").text(t);
          },
          setValue: function (t) {
            (this.opts.value = this._value = this._checkValue(Number(t))),
              this.opts.custom ||
                (this.opts.unit
                  ? this.$element
                      .find(".ui-spinner-value")
                      .html(
                        "<em>" +
                          t +
                          '</em><span class="ui-spinner-units">' +
                          this.opts.unit +
                          "</span>"
                      )
                  : this.$element.find(".ui-spinner-value").text(t));
          },
          getValue: function () {
            return this._value;
          },
          setEnable: function (t) {
            var e,
              i,
              n,
              s,
              a,
              o,
              r,
              l = this._value;
            !1 === t
              ? (t = this.defaultRange)
              : ((e = t),
                (i = this.defaultRange),
                (n = this.opts.step),
                (s = []),
                (a = e.min),
                (o = e.max),
                (r = i[0]),
                void 0 === a || void 0 === o
                  ? (void 0 === a
                      ? (s[0] = r)
                      : ((a - r) % n == 0 && (a += n),
                        (s[0] = Math.ceil((a - r) / n) * n + r)),
                    void 0 === o
                      ? (s[1] = i[1])
                      : ((o - r) % n == 0 && (o -= n),
                        (s[1] = Math.floor((o - r) / n) * n + r)))
                  : (s = [
                      Math.ceil((a - r) / n) * n + r,
                      Math.floor((o - r) / n) * n + r,
                    ]),
                (t = s)),
              (this.opts.range = { min: t[0], max: t[1] }),
              (this._value = null),
              this.setValue(l);
          },
          getRange: function () {
            return [this.opts.range.min, this.opts.range.max];
          },
          _create: function () {
            var t = this.opts,
              e = this.$element;
            e.html(
              '<div class="ucd-spinner">    <div class="ui-button-icon ui-icon-l ui-icon-reduce" data-type="reduce"></div>    <div class="ui-button-icon ui-icon-r ui-icon-increase" data-type="increase"></div>    <div class="ucd-spinner-info"><p class="ui-spinner-value card-text"></p><p class="ui-spinner-title"></p></div></div>'
            ),
              (this.defaultRange = [t.range.min, t.range.max]),
              (this.$buttons = e.find(".ui-button-icon")),
              this.setTitle(t.title),
              this.setValue(t.value),
              e.find(".ui-button-icon").tap(this._onClick.bind(this)),
              t.disabled && this.disable();
          },
          _onClick: function (e) {
            var i = "increase" == t(e.target).attr("data-type") ? 1 : 0;
            0 == i
              ? this.setValue(Number(this.opts.value - this.opts.step))
              : this.setValue(Number(this.opts.value + this.opts.step)),
              this.opts.onclick.call(null, i, this._value);
          },
          _checkValue: function (t) {
            var e = this.opts.range.min,
              i = this.opts.range.max;
            return (
              (t = t > i ? i : t < e ? e : t),
              this.$buttons.removeClass("ucd-disabled"),
              t == e
                ? this.$buttons.eq(0).addClass("ucd-disabled")
                : t == i && this.$buttons.eq(1).addClass("ucd-disabled"),
              t
            );
          },
        }),
        e.util.register(i)
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.EnumCards = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(i) {
        (this.opts = t.extend(
          {},
          {
            container: t("body"),
            type: "tap",
            label: "Label",
            items: [],
            onchange: t.noop,
            pressStart: t.noop,
            pressEnd: t.noop,
          },
          i
        )),
          (this.$element = t(this.opts.container)),
          this._create(),
          (self = this),
          e.util.init(self);
      }
      return (
        (i.prototype = {
          constructor: i,
          select: function (t) {
            -1 != this._items.indexOf(t) &&
              ((this._value = t),
              this.$element
                .find(".card-enums-item[data-value=" + t + "]")
                .addClass("active")
                .siblings()
                .removeClass("active"));
          },
          unselect: function () {
            (this._value = null),
              this.$element.find(".card-enums-item").removeClass("active");
          },
          _create: function () {
            var i = this.opts,
              n = this.$element,
              s = e.util.template(
                "tap" === i.type
                  ? '<div class="card-enums clearfix">  <% for(var i = 0, len = items ? items.length : 0; i < len; i++) { %>    <div class="card-enums-item" data-index="<%= i %>" data-value="<%= items[i].value %>">      <div class="card-enums-inner"><i class="icon-enum <%= items[i].iconName %>"></i><p class="card-enums-label"><%= items[i].label %></p></div>    </div>  <% } %></div>'
                  : '<div class="card-enums-longtap card-inner">  <div class="card-enums-item card-layout-right" data-value="<%= items[2].value %>" data-leave="<%= items[1].value %>">    <i class="icon-enum <%= items[2].iconName %>"></i></div>  <div class="card-enums-item card-layout-left" data-value="<%= items[0].value %>" data-leave="<%= items[1].value %>">    <i class="icon-enum <%= items[0].iconName %>"></i></div>  <div class="card-layout-center"><%= label %></div></div>'
              )(i),
              a = (n.attr("id"), this._onDown),
              o = this._onUp,
              r = this._onClick,
              l = this;
            n.attr("data-type", i.type).html(s),
              (this._items = i.items.map(function (t) {
                return t.value;
              })),
              "tap" === i.type
                ? ((this.$enumsItem = this.$element.find(".card-enums-item")),
                  this.$enumsItem.on(e.Events.DOWN, function (t) {
                    r(l, t);
                  }))
                : ((this.$poplayer = t("<div></div>").css({
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    "z-index": 9999,
                  })),
                  (this.$enumsItem = this.$element.find(".card-enums-item")),
                  this.$enumsItem.on(e.Events.DOWN, function (t) {
                    a(l, t);
                  }),
                  this.$enumsItem.on(e.Events.UP, function (t) {
                    o(l, t);
                  })),
              e.bindDragEvent({});
          },
          _onDown: function (i, n) {
            var s = t(n.target).closest(".card-enums-item"),
              a = s.attr("data-value");
            !s.length ||
              s.hasClass("ucd-disable") ||
              s.hasClass("active") ||
              (s.find(".icon-enum").addClass("active"),
              e.Events.isPad && i.$poplayer.appendTo(t("body")),
              (a = Number(a)),
              i.opts.pressStart.call(null, a));
          },
          _onUp: function (i, n) {
            var s = t(n.target).closest(".card-enums-item"),
              a = s.attr("data-leave");
            s.length &&
              !s.hasClass("ucd-disable") &&
              (s.find(".icon-enum").removeClass("active"),
              e.Events.isPad && i.$poplayer.remove(),
              (a = Number(a)),
              i.opts.pressEnd.call(null, a));
          },
          _onClick: function (e, i) {
            var n = t(i.target).closest(".card-enums-item"),
              s = n.attr("data-value");
            if (n.hasClass("ucd-disable") || n.hasClass("active")) return !1;
            (s = Number(s)), e.opts.onchange.call(null, s);
          },
        }),
        i
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./UCD.js")))
        : (t.UCD.Banner = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(i) {
        var n = parseFloat(t("html").css("font-size"));
        this.opts = t.extend(
          !0,
          {
            container: t("body"),
            banner: {
              backgroundOnImg: "",
              backgroundOffImg: "",
              backgroundOnColor: "",
              backgroundOffColor: "",
              logoLight: "",
              logoDark: "",
              showLogoDark: !0,
              setContent: "",
              logoText: "",
            },
            infomation: {
              backgroundOn: "",
              backgroundOff: "",
              switchPosition: !0,
              switchIsIcon: !0,
              switchIconOpen: "",
              switchIconOff: "",
              switchIconRecover: "",
              switchDefText: "",
              instructionsStatusOn: "",
              instructionsStatusOff: "",
              instructionsText: "",
              midConTop: "",
              midConBottom: "",
              setContent: "",
            },
            needParticles: !1,
            particlesData: {
              dom: t("#Purifying-canvas"),
              switch: 1,
              windSpeed: 3,
              maxRadius: 8,
              canWidth: parseInt(t("body").css("width")) - 0.8888 * n,
              canHeight: 2.1111 * n,
            },
            uniqueClass: "",
            active: !1,
            HWRatio: 906 / 1440,
            clickFunction: function (t) {},
          },
          i
        );
        var s = this.opts.container;
        s && ((this.$element = s), this._create(s), e.util.init(this));
      }
      return (
        (i.prototype = {
          getParticlesObj: function () {
            return this.particlesObj;
          },
          upDateModule: function (e, i) {
            if ("object" == typeof i) {
              var n = t(i);
              for (var s in (t.extend(!0, this.opts, e), e))
                switch (s) {
                  case "banner":
                    var a = e.banner;
                    for (var o in a)
                      switch (o) {
                        case "backgroundOnColor":
                          this.opts.active &&
                            n
                              .find(".ui-common-banner .ui-banner-area")
                              .css({ background: a.backgroundOnColor });
                          break;
                        case "setContent":
                          n
                            .find(".ui-banner-area .banner-box .banner-model")
                            .siblings(':not(".banner-logo, .banner-logo-text")')
                            .remove(),
                            n
                              .find(".ui-banner-area .banner-box .banner-model")
                              .after(a.setContent);
                          break;
                        case "showLogoDark":
                          if (a.logoText) {
                            var r = a.showLogoDark ? "logo-dark" : "logo-light";
                            n.find(
                              ".ui-banner-area .banner-box .banner-logo-text"
                            )
                              .removeClass("logo-dark logo-light")
                              .addClass(r);
                          } else {
                            var l = a.showLogoDark
                              ? this.opts.banner.logoDark
                              : this.opts.banner.logoLight;
                            n.find(
                              ".ui-banner-area .banner-box .banner-logo"
                            ).css({ "background-image": "url(" + l + ")" });
                          }
                          break;
                        case "logoText":
                          n.find(
                            ".ui-banner-area .banner-box .banner-logo-text"
                          ).text(this.opts.banner.logoText);
                      }
                    break;
                  case "infomation":
                    var c = e.infomation;
                    for (var o in c)
                      switch (o) {
                        case "backgroundOn":
                          this.opts.active &&
                            n
                              .find(".ui-common-banner > .ui-banner-info")
                              .css({ background: c.backgroundOn });
                          break;
                        case "switchDefText":
                          n.find(
                            ".ui-common-banner .ui-banner-info .banner-quality"
                          ).html(c.switchDefText);
                          break;
                        case "instructionsText":
                          n.find(
                            ".ui-common-banner .banner-instructions .banner-text"
                          ).html(c.instructionsText);
                          break;
                        case "instructionsStatusOn":
                          this.opts.active &&
                            n
                              .find(
                                ".ui-common-banner .banner-instructions .banner-status"
                              )
                              .html(c.instructionsStatusOn);
                          break;
                        case "midConTop":
                          n.find(
                            ".ui-common-banner .banner-time .js-time-time"
                          ).html(c.midConTop);
                          break;
                        case "midConBottom":
                          n.find(
                            ".ui-common-banner .banner-time .js-time-text"
                          ).html(c.midConBottom);
                          break;
                        case "setContent":
                          var d = "";
                          n.find(".bannerInfoSetContent").remove();
                          var u = t(c.setContent);
                          if (u.length) {
                            u.addClass("bannerInfoSetContent");
                            for (s = 0; s < u.length; s++)
                              d += u.get(s).outerHTML;
                          }
                          n.find(".ui-banner-info").prepend(d);
                      }
                    break;
                  case "uniqueClass":
                    n.find(".ui-common-banner").addClass(
                      e.uniqueClass.uniqueClass
                    );
                    break;
                  case "active":
                    if (this.opts.active) {
                      n
                        .find(".ui-common-banner")
                        .removeClass("off")
                        .addClass("active"),
                        n
                          .find(".ui-common-banner .ui-banner-area")
                          .css({
                            background: this.opts.banner.backgroundOnColor,
                          }),
                        n
                          .find(".ui-common-banner .banner-box .banner-model")
                          .css({
                            "background-image":
                              "url(" + this.opts.banner.backgroundOnImg + ")",
                          });
                      var h = this.opts.infomation.switchIconOpen
                        ? "url(" + this.opts.infomation.switchIconOpen + ")"
                        : "";
                      n
                        .find(".ui-common-banner .banner-switch")
                        .css({ "background-image": h }),
                        n
                          .find(
                            ".ui-common-banner .ui-banner-info .banner-status"
                          )
                          .html(this.opts.infomation.instructionsStatusOn),
                        n
                          .find(".ui-common-banner > .ui-banner-info")
                          .css({ background: this.opts.infomation.backgroundOn }),
                        n
                          .find(".ui-banner-area")
                          .parent()
                          .removeClass("off")
                          .addClass("active");
                    } else {
                      n
                        .find(".ui-common-banner")
                        .removeClass("active")
                        .addClass("off"),
                        n
                          .find(
                            ".ui-common-banner .ui-banner-area .banner-instructions"
                          )
                          .css({
                            background: this.opts.banner.backgroundOffColor,
                          }),
                        n
                          .find(".ui-common-banner .banner-box .banner-model")
                          .css({
                            "background-image":
                              "url(" + this.opts.banner.backgroundOffImg + ")",
                          });
                      h = this.opts.infomation.switchIconOff
                        ? "url(" + this.opts.infomation.switchIconOff + ")"
                        : "";
                      n
                        .find(".ui-common-banner .banner-switch")
                        .css({ "background-image": h }),
                        n
                          .find(
                            ".ui-common-banner .ui-banner-info .banner-status"
                          )
                          .html(this.opts.infomation.instructionsStatusOff),
                        n
                          .find(".ui-common-banner > .ui-banner-info")
                          .css({
                            background: this.opts.infomation.backgroundOff,
                          }),
                        n
                          .find(".ui-banner-area")
                          .parent()
                          .removeClass("active")
                          .addClass("off");
                    }
                }
            } else console.error("第二个参数必须为dom对象或jquery对象!");
          },
          resize: function () {
            var e = t(".ui-banner-area"),
              i = t(window).width() * this.opts.HWRatio;
            e.toggleClass("banner-ratio", 1 == this.opts.HWRatio), e.height(i);
          },
          _createComponentHtml: function (e) {
            var i,
              n,
              s = e.active ? e.banner.backgroundOnImg : e.banner.backgroundOffImg,
              a = e.active
                ? e.banner.backgroundOnColor
                : e.banner.backgroundOffColor,
              o = (o = e.banner.showLogoDark
                ? e.banner.logoDark
                : e.banner.logoLight)
                ? "undefined" === o
                  ? ""
                  : o
                : "",
              r = e.banner.showLogoDark ? "logo-dark" : "logo-light",
              l = (e.active, ""),
              c = e.needParticles
                ? '<canvas id="Purifying-canvas" width="' +
                  e.particlesData.canWidth +
                  '" height="' +
                  e.particlesData.canHeight +
                  '">您的浏览器版本还不支持canvas</canvas>'
                : "",
              d = e.active
                ? e.infomation.switchIconOpen
                : e.infomation.switchIconOff,
              u = e.active
                ? e.infomation.instructionsStatusOn
                : e.infomation.instructionsStatusOff,
              h = e.active
                ? e.infomation.backgroundOn
                : e.infomation.backgroundOff,
              p = "";
            if (t(e.infomation.setContent).length)
              for (
                var f = t(e.infomation.setContent).addClass(
                    "bannerInfoSetContent"
                  ),
                  m = 0;
                m < f.length;
                m++
              )
                p += f.get(m).outerHTML;
            e.infomation.switchIsIcon
              ? (i =
                  '<div class="banner-switch" style="' +
                  (d
                    ? "background-image: url(" + d + ")"
                    : 'background-image: ""') +
                  '"></div>')
              : (i =
                  '<div class="banner-quality">' +
                  e.infomation.switchDefText +
                  "</div>");
            return (
              (n = e.banner.logoText
                ? '<div class="banner-logo-text ' +
                  r +
                  '">' +
                  e.banner.logoText +
                  "</div>"
                : '<div class="banner-logo" style="background: url(' +
                  o +
                  ') center center/auto 100% no-repeat;"></div>'),
              (i = e.infomation.switchPosition ? i : ""),
              [
                '<div class="ui-common-banner ' + e.uniqueClass + " " + l + '">',
                '    <div class="ui-banner-area" style="background: ' + a + '">',
                '       <div class="banner-box">',
                '           <div class="banner-model" style="background: url(' +
                  s +
                  ') center center/100% 100% no-repeat"></div>',
                e.banner.setContent,
                n,
                "       </div>",
                "    </div>",
                '    <div class="ui-banner-info" style="background: ' + h + ';">',
                p,
                c,
                i,
                '       <div class="banner-instructions">',
                '           <p class="banner-status">' + u + "</p>",
                '           <p class="banner-text">' +
                  e.infomation.instructionsText +
                  "</p>",
                "       </div>",
                '       <div class="banner-time">',
                '           <p class="time js-time-time">' +
                  e.infomation.midConTop +
                  "</p>",
                '           <p class="text js-time-text">',
                e.infomation.midConBottom,
                "           </p>",
                "       </div>",
                "    </div>",
                "</div>",
              ]
            );
          },
          _createEvent: function (i) {
            var n = this.opts;
            if (n.needParticles) {
              n.particlesData.dom = i.find("#Purifying-canvas");
              var s = new e.Particles(n.particlesData);
              (this.particlesObj = s), s.start();
            }
            i.find(".banner-switch").tap(function () {
              n.clickFunction.call(null, n.active ? 0 : 1);
            }),
              setTimeout(function () {
                var e = t(".ui-banner-area"),
                  i = t(window).width() * n.HWRatio;
                e.toggleClass("banner-ratio", 1 == n.HWRatio), e.height(i);
              }, 0),
              n.active
                ? i
                    .find(".ui-common-banner")
                    .removeClass("off")
                    .addClass("active")
                : i
                    .find(".ui-common-banner")
                    .removeClass("active")
                    .addClass("off");
          },
          _create: function (t) {
            var e = this.opts,
              i = this._createComponentHtml(e);
            t.append(i.join("")), this._createEvent(t);
          },
        }),
        e.util.register(i)
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.Particles = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      var i, n, s, a, o, r, l, c;
      function d(d) {
        if (d.dom[0]) {
          this.opts = t.extend(
            !0,
            {
              dom: t("#canvas"),
              switch: 0,
              windSpeed: 1,
              canWidth: 100,
              canHeight: 50,
              isStroke: !1,
              maxRadius: 5,
              quantity: 30,
              inhale: !1,
              opacity: 0.8,
            },
            d
          );
          var u = parseFloat(t("html").css("font-size"));
          (this.can = t(d.dom)[0]),
            (this.open = d.switch || 0),
            (this.windSpeed = d.windSpeed || 1),
            (this.$element = d.dom),
            (this.dom = this.can),
            (this.cObj = this.can.getContext("2d")),
            (i = d.canWidth || parseInt(t("body").css("width")) - 0.8888 * u),
            (n = d.canHeight || 2.1111 * u),
            (s = i / 2),
            (a = n / 2),
            5e6,
            d.isStroke || !1,
            (o = d.maxRadius || 5),
            d.inhale || !1,
            (r = d.quantity || 30),
            (l = d.opacity || 0.8),
            (c = this),
            this.cObj.translate(s, a),
            this._create(r),
            e.util.init(this);
        }
      }
      return (
        (d.prototype = {
          clone: function (t) {
            if (t[0]) {
              var e,
                i = t[0].getContext("2d");
              return {
                dom: t[0],
                stop: function () {
                  cancelAnimationFrame(e);
                },
                start: function () {
                  e && cancelAnimationFrame(e), (e = requestAnimationFrame(n));
                },
              };
            }
            function n() {
              i.clearRect(0, 0, 1e3, 1e3),
                i.drawImage(c.dom, 0, 0),
                (e = requestAnimationFrame(n));
            }
          },
          start: function () {
            if (!this.isStart) {
              var t = this;
              (t.interval = requestAnimationFrame(function e() {
                t._drawPoint(t._moveAction(t, t.pObj)),
                  (t.interval = requestAnimationFrame(e));
              })),
                (this.isStart = !0);
            }
          },
          stop: function () {
            cancelAnimationFrame(c.interval), (this.isStart = !1);
          },
          _creatPoint: function (t) {
            for (var e = [], r = 0; r < t; r++) {
              var c = {
                x: s + -i * Math.random(),
                y: a + -n * Math.random(),
                r: o * Math.random(),
                d: Math.random() > 0.5 ? 1 : -1,
                o: l * Math.random(),
              };
              e.push(c);
            }
            return e;
          },
          _rectarr: function (t, e, i, n, s, a, o, r) {
            if (this.opts.inhale) {
              (s = 0.3 * a),
                (t < -o || t > o || e < -r) &&
                  ((t = 0.8 * o - 2 * o * 0.8 * Math.random()), (e = r)),
                (n = t < 0 ? Math.abs(n) : -Math.abs(n));
              Math.abs(0.5 * n * s * (1 - 0.5 * Math.random()) + t);
              var l = [n * s + t, e - s * Math.abs((2 * r - e) / t), i];
            } else {
              (t = t < -o ? o : t > o ? -o : t), (e = e < -r ? r : e);
              l = [
                0.5 * n * s * (1 - 0.5 * Math.random()) + t,
                e - a * (1 - 0.5 * Math.random()) * 0.5,
                i,
              ];
            }
            return l;
          },
          _moveAction: function (t, e) {
            for (
              var i = [], n = t.open ? t.windSpeed : 0, o = t.open ? 1 : 0, r = 0;
              r < e.length;
              r++
            ) {
              var l = this._rectarr(e[r].x, e[r].y, e[r].r, e[r].d, o, n, s, a);
              (e[r].x = l[0]), (e[r].y = l[1]);
              var c = { x: e[r].x, y: e[r].y, r: e[r].r, o: e[r].o };
              i.push(c);
            }
            return i;
          },
          _drawPoint: function (t) {
            (this.can.width = 0),
              (this.can.height = 0),
              (this.can.width = i),
              (this.can.height = n),
              this.cObj.translate(s, a);
            for (var e = 0; e < t.length; e++)
              this.cObj.save(),
                this.cObj.translate(t[e].x, t[e].y),
                this.cObj.beginPath(),
                (this.cObj.fillStyle = "rgba(255, 255, 255, " + t[e].o + ")"),
                this.cObj.arc(0, 0, t[e].r, 0, 2 * Math.PI, !1),
                (this.cObj.strokeStyle = "rgba(255, 255, 255, 0.8)"),
                this.opts.isStroke && this.cObj.stroke(),
                this.cObj.fill(),
                this.cObj.restore();
          },
          _create: function (t) {
            (this.pObj = this._creatPoint(t)), this._drawPoint(this.pObj);
          },
        }),
        e.util.register(d)
      );
    }),
    (function (t, e) {
      "function" == typeof define && define.amd
        ? define(["jquery", "./core.js"], e)
        : "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.Colors = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      e = window.UCD || (window.UCD = { Core: t });
      var i = {
          rgb: { r: [0, 255], g: [0, 255], b: [0, 255] },
          hsv: { h: [0, 360], s: [0, 100], v: [0, 100] },
          alpha: { alpha: [0, 1] },
        },
        n = {
          colors2str: function (t, e) {
            var i = !1 !== e && Math.round(100 * t.alpha) / 100,
              n = "number" == typeof i && !1 !== e && (e || 1 !== i),
              s = t.result.rgb,
              a = s.r + ", " + s.g + ", " + s.b;
            return "rgb" + (n ? "a" : "") + "(" + a + (n ? ", " + e : "") + ")";
          },
          str2Colors: function (t) {
            var e = {},
              n = t.replace(/(?:#|\)|%)/g, "").split("("),
              s = (n[1] || "").split(/,\s*/),
              a = n[1] ? n[0].substr(0, 3) : "rgb";
            if (((e.type = a), (e[a] = {}), n[1]))
              for (var o = 3; o--; ) {
                var r = a[o] || a.charAt(o);
                e[a][r] = +s[o] / i[a][r][1];
              }
            return (e.alpha = s[3] ? +s[3] : 1), e;
          },
          rgb2hsv: function (t) {
            var e,
              i,
              n,
              s,
              a,
              o = t.r,
              r = t.g,
              l = t.b,
              c = Math.max(o, r, l),
              d = c - Math.min(o, r, l),
              u = function (t) {
                return (c - t) / 6 / d + 0.5;
              };
            return (
              0 == d
                ? (s = a = 0)
                : ((a = d / c),
                  (e = u(o)),
                  (i = u(r)),
                  (n = u(l)),
                  o === c
                    ? (s = n - i)
                    : r === c
                    ? (s = 1 / 3 + e - n)
                    : l === c && (s = 2 / 3 + i - e),
                  s < 0 ? (s += 1) : s > 1 && (s -= 1)),
              { h: s, s: a, v: c }
            );
          },
          hsv2rgb: function (t) {
            var e, i, n, a, o, r, l, c;
            switch (
              (1 === arguments.length && ((s = t.s), (v = t.v), (h = t.h)),
              (a = Math.floor(6 * h)),
              (o = 6 * h - a),
              (r = v * (1 - s)),
              (l = v * (1 - o * s)),
              (c = v * (1 - (1 - o) * s)),
              a % 6)
            ) {
              case 0:
                (e = v), (i = c), (n = r);
                break;
              case 1:
                (e = l), (i = v), (n = r);
                break;
              case 2:
                (e = r), (i = v), (n = c);
                break;
              case 3:
                (e = r), (i = l), (n = v);
                break;
              case 4:
                (e = c), (i = r), (n = v);
                break;
              case 5:
                (e = v), (i = r), (n = l);
            }
            return { r: e, g: i, b: n };
          },
        };
      function a(t, e) {
        var s,
          a = i,
          o = e.result,
          r = "",
          l = "";
        if ("alpha" !== t)
          for (var c in a)
            if (!a[c][c])
              for (r in (t !== c &&
                ((l = "rgb" == c ? "hsv" : "rgb"), (e[c] = n[l + "2" + c](e[l]))),
              o[c] || (o[c] = {}),
              (s = e[c])))
                o[c][r] = Math.round(s[r] * a[c][r][1]);
        return e;
      }
      function o(t, e, i) {
        return t > i ? i : t < e ? e : t;
      }
      function r(t, e, s, r) {
        if ("string" == typeof e) {
          var l = n.str2Colors(e);
          (t[(s = l.type)] = l[s]), (r = void 0 !== r ? r : l.alpha);
        } else if (e) for (var c in (t[s] || (t[s] = {}), e)) t[s][c] = o(e[c] / i[s][c][1], 0, 1);
        return void 0 !== r && (t.alpha = o(+r, 0, 1)), a(s, t);
      }
      var l = function (t) {
        (this.colors = { result: {} }),
          (this.options = { color: "rgb(204, 82, 37)" }),
          this.init(t || {});
      };
      return (
        (l.prototype.init = function (t) {
          var e = this.options;
          for (var i in t) void 0 !== t[i] && (e[i] = t[i]);
          this.colors = r(this.colors, e.color, void 0, !0);
        }),
        (l.prototype.setColor = function (t, e, i) {
          return t
            ? r(this.colors, t, e, void 0)
            : (void 0 !== i && (this.colors.alpha = o(i, 0, 1)),
              a(e, this.colors));
        }),
        (l.prototype.getColor = function (t) {
          return (function (t, e) {
            var i = e,
              n = 0;
            if (t) {
              for (t = t.split("."); i[t[n]]; ) i = i[t[n++]];
              t.length !== n && (i = void 0);
            }
            return i;
          })(t ? "result." + t : t, this.colors);
        }),
        (l.prototype.toString = function (t, e) {
          return n.colors2str(this.colors, e);
        }),
        (l.prototype.colorTemperature2rgb = function (t) {
          var e,
            i,
            n,
            s = t / 100;
          return (
            s <= 66
              ? (e = 255)
              : ((e = s - 60),
                (e = o(
                  (e = 329.698727466 * Math.pow(e, -0.1332047592)),
                  0,
                  255
                ))),
            s <= 66
              ? ((i = s),
                (i = o(
                  (i = 99.4708025861 * Math.log(i) - 161.1195681661),
                  0,
                  255
                )))
              : ((i = s - 60),
                (i = o(
                  (i = 288.1221695283 * Math.pow(i, -0.0755148492)),
                  0,
                  255
                ))),
            s >= 66
              ? (n = 255)
              : s <= 19
              ? (n = 0)
              : ((n = s - 10),
                (n = o(
                  (n = 138.5177312231 * Math.log(n) - 305.0447927307),
                  0,
                  255
                ))),
            { red: Math.floor(e), blue: Math.floor(n), green: Math.floor(i) }
          );
        }),
        (l.prototype.needMixBlack = function () {
          var t = this.getColor("rgb");
          return 1 - (0.2126 * t.r + 0.7152 * t.g + 0.0722 * t.b) / 255 < 0.4;
        }),
        (e.Colors = l),
        e.Colors
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.InfoScroller = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(e) {
        (this.opts = t.extend(
          {},
          {
            container: t("body"),
            options: {
              data: [
                {
                  sid: "inputTds",
                  enums: {
                    erduarr: [{ label: "极好", value: 0 }],
                    erduinfo: 0,
                    erdutext: "水质状态",
                    key: "level",
                  },
                  integer: {
                    divisor: !1,
                    hasunit: !1,
                    info: 100,
                    key: "tds",
                    max: "65535",
                    min: "0",
                    percent: !1,
                    text: "自来水质",
                    unit: "",
                  },
                },
              ],
            },
          },
          e
        )),
          (this.$element = t(this.opts.container)),
          this._create();
      }
      function n(t) {
        return ("00" + t).slice(-2);
      }
      return (
        (i.prototype = {
          constructor: i,
          _create: function () {
            var i = this.opts,
              n = i.options.data,
              s = this.$element;
            s.addClass("PurifyInfo").append('<div class="params-con"></div>');
            var a,
              o = "",
              r = t('<div class="params"></div>'),
              l = !1;
            if (((window.conwidth = s.width()), n.length <= 3))
              a = parseFloat(conwidth / n.length);
            else {
              var c = (a = parseFloat(conwidth / 3)) * n.length;
              l = !0;
            }
            (i.domSort = {}), (i.fulldata = {});
            for (var d = 0; d < n.length; d++) {
              var u = (d + 1) % 3 ? "" : " no-separator-class",
                h = n[d].sid,
                p = n[d].integer,
                f = n[d].enums;
              if (((i.fulldata[h] = {}), (i.fulldata[h].data = n[d]), p && !f)) {
                i.fulldata[h].type = 1;
                var m = p.percent ? "%" : "",
                  v = p.unit;
                (v = m ? "" : v),
                  (o +=
                    '<div class="params-item filter-element ' +
                    u +
                    '">    <p class="result">        <span class="val" sid=' +
                    h +
                    " key=" +
                    p.key +
                    ">" +
                    p.info +
                    m +
                    '</span>        <span class="unit">' +
                    v +
                    '</span>    </p>    <p class="param-name">    <span class="param-leftper"><span class="label-text">' +
                    p.text +
                    "</span></span>    </p></div>");
              } else if (!p && f)
                (i.fulldata[h].type = 2),
                  (o +=
                    '<div class="params-item filter-element ' +
                    u +
                    '">    <p class="result eru">        <span class="val eru" sid=' +
                    h +
                    ">" +
                    f.erduarr[0].label +
                    '</span>    </p>    <p class="param-name">    <span class="param-leftper"><span class="label-text">' +
                    f.erutext +
                    "</span></span>    </p></div>");
              else if (p && f) {
                i.fulldata[h].type = 3;
                (m = p.percent ? "%" : ""), (v = p.unit);
                (v = m ? "" : v),
                  (o +=
                    '<div class="params-item filter-element ' +
                    u +
                    '">    <p class="result eru">        <span class="val eru" sid=' +
                    h +
                    " key=" +
                    p.key +
                    ">" +
                    f.erduarr[0].label +
                    '</span>    </p>    <p class="param-name">    <span class="param-leftper"><span class="label-text">' +
                    p.text +
                    '</span>: <span class="val">' +
                    p.info +
                    m +
                    '</span><span class="unit">' +
                    v +
                    "</span></span>    </p></div>");
              }
            }
            var g = s.children(".params-con");
            if (
              (g.append(r.append(o)),
              1 == n.length &&
                (g.addClass("alone"),
                3 == i.fulldata[h].type &&
                  g
                    .find(".params-item")
                    .empty()
                    .replaceWith(
                      '<div class="params-item"><p class="result"><span class="val eru" sid=' +
                        h +
                        "  key=" +
                        p.key +
                        ">" +
                        f.erduarr[0].label +
                        '</span></p><div class="param-name"><span class="param-leftper"><div class="detail-num"><span class="val error">' +
                        p.info +
                        m +
                        '</span><span class="unit">' +
                        v +
                        '</span></div><div class="detail-name">' +
                        p.text +
                        "</div></span></div></div>"
                    )),
              n.length || s.addClass("noitem"),
              c && g.children(".params").width(c),
              s
                .find(".params")
                .children(".params-item")
                .each(function (i, s) {
                  n[i].iconClass &&
                    t(s)
                      .find(".param-leftper")
                      .after("<span class=" + n[i].iconClass + "></span>"),
                    t(s).addClass("linese").width(a),
                    t(s).on(e.Events.DOWN, n[i].handler);
                }),
              l)
            ) {
              var b = (function () {
                  for (
                    var t = navigator.userAgent,
                      e = [
                        "Android",
                        "iPhone",
                        "SymbianOS",
                        "Windows Phone",
                        "iPad",
                        "iPod",
                      ],
                      i = !0,
                      n = 0;
                    n < e.length;
                    n++
                  )
                    if (t.indexOf(e[n]) > 0) {
                      i = !1;
                      break;
                    }
                  return i;
                })(),
                w = t('<div class="swipe-btn-list"></div>'),
                y = "";
              for (d = 0; d < Math.ceil(n.length / 3); d++) y += "<li></li>";
              g.append(w.append(y));
              var _ = g.children(".params"),
                x = g.find(".swipe-btn-list li");
              x.eq(0).addClass("now");
              var C = 0,
                D = function (t) {
                  (_[0].style.transform = "translateX(" + t + "px)"),
                    (_[0].style.webkitTransform = "translateX(" + t + "px)");
                },
                k = 0,
                O = 0,
                T = 0,
                M = !1,
                $ = Math.ceil(n.length / 3) - 1;
              g
                .off(e.Events.DOWN)
                .off(e.Events.UP)
                .on(e.Events.DOWN, function (t) {
                  window.Bounce &&
                    window.Bounce.lampBounceObj &&
                    window.Bounce.lampBounceObj.off(),
                    t.originalEvent.targetTouches &&
                      (t = t.originalEvent.targetTouches[0]),
                    (k = t.pageX),
                    g
                      .on(e.Events.MOVE, function (t) {
                        t.originalEvent.targetTouches &&
                          (t = t.originalEvent.targetTouches[0]),
                          (O = t.pageX),
                          (T = O - k),
                          (_[0].style.transition = "none"),
                          (_[0].style.webkitTransition = "none"),
                          D(-C * conwidth + T),
                          (M = !0);
                      })
                      .on(e.Events.UP, function (t) {
                        M && Math.abs(T) > conwidth / 4 && (T > 0 ? C-- : C++),
                          (_[0].style.transition = "all 0.3s"),
                          (_[0].style.webkitTransition = "all 0.3s"),
                          C > $ ? (C = $) : C <= 0 && (C = 0),
                          D(-C * conwidth),
                          x.removeClass("now"),
                          x.eq(C).addClass("now"),
                          (k = 0),
                          (O = 0),
                          (T = 0),
                          (M = !1);
                      });
                }),
                b &&
                  (g.off(e.Events.DOWN).off(e.Events.UP),
                  x.tap(function (e) {
                    var i = t(e.target).index();
                    x.removeClass("now"),
                      x.eq(i).addClass("now"),
                      D(-i * conwidth);
                  }));
            }
            t(window).resize(function () {
              setTimeout(function () {
                !(function (e) {
                  var i,
                    n = e,
                    s = n.options.data,
                    a = t(n.container);
                  if (((conwidth = a.width()), s.length <= 3))
                    i = parseFloat(conwidth / s.length);
                  else var o = (i = parseFloat(conwidth / 3)) * s.length;
                  var r = a.children(".params-con");
                  o && r.children(".params").width(o),
                    a
                      .find(".params")
                      .children(".params-item")
                      .each(function (e, n) {
                        t(n).width(i);
                      }),
                    r.find(".params").css("transform", "translateX(0px)"),
                    (window.newconwidth = conwidth),
                    t(".swipe-btn-list").length &&
                      (t(".swipe-btn-list").find("li").removeClass("now"),
                      t(".swipe-btn-list").find("li").eq(0).addClass("now"));
                })(i);
              }, 200);
            });
          },
          setContent: function (e, i, n) {
            var s = t("body").hasClass("mode-dark"),
              a = {
                "#000000": "#ffffffdb",
                "#71C2FF": "#71C2FF",
                "#75D4FB": "#75D4FB",
                "#3CCBA0": "#3CCBA0",
                "#FCD434": "#FCD434",
                "#FFB626": "#FFB626",
                "#F76644": "#F76644",
                "#EE2864": "#EE2864",
                "#C82D73": "#C82D73",
              },
              o = this.opts,
              r = t(o.container),
              l = r.find(".unit"),
              c = o.fulldata[e] && o.fulldata[e].type,
              d = o.fulldata[e] && o.fulldata[e].data;
            for (key in o.fulldata) {
              var u = o.fulldata[key];
              if (u.data.sids && u.data.sids == e) {
                e = u.data.sid;
                (c = o.fulldata[e] && o.fulldata[e].type),
                  (d = o.fulldata[e] && o.fulldata[e].data);
              }
            }
            if (1 == c) {
              var h =
                  d.integer.max || 0 == d.integer.max
                    ? parseInt(d.integer.max)
                    : void 0,
                p =
                  d.integer.min || 0 == d.integer.min
                    ? parseInt(d.integer.min)
                    : void 0,
                f = d.integer.percent,
                m = (g = d.integer.divisor)
                  ? parseFloat((parseInt(i.info) / parseInt(g)).toFixed(3))
                  : i.info,
                v = i.info;
              (b =
                (void 0 != h && h < Number(v)) || (void 0 != p && p > Number(v))),
                (newmin = g ? p / g : p),
                (newmax = g ? h / g : h),
                newmin === newmax && (f = !1),
                (m = f
                  ? parseFloat(
                      (((m - newmin) / (newmax - newmin)) * 100).toFixed(3)
                    ) + "%"
                  : m),
                (m = n ? "- -" : m),
                r
                  .find("[sid=" + e + "]")
                  .toggleClass("error", b)
                  .text(m)
                  .toggleClass("gray", n),
                r
                  .find("[sid=" + e + "]")
                  .parent(".result")
                  .toggleClass("error", b),
                n ? l.hide() : l.show();
            } else if (2 == c) {
              (w = d.enums.erduarr).map(function (t, o) {
                if (i.erduinfo == t.value) {
                  var l = s ? a[t.color] : t.color;
                  r
                    .find("[sid=" + e + "]")
                    .text(n ? "- -" : t.label)
                    .css("color", l)
                    .toggleClass("gray", n),
                    r
                      .find("[sid=" + e + "]")
                      .parent()
                      .css("color", l);
                }
              });
            } else if (3 == c) {
              var g, b;
              (h =
                d.integer.max || 0 == d.integer.max
                  ? parseInt(d.integer.max)
                  : void 0),
                (p =
                  d.integer.min || 0 == d.integer.min
                    ? parseInt(d.integer.min)
                    : void 0),
                (f = d.integer.percent),
                (m = (g = d.integer.divisor)
                  ? parseFloat((parseInt(i.info) / parseInt(g)).toFixed(3))
                  : i.info),
                (v = i.info);
              (b =
                (void 0 != h && h < Number(v)) || (void 0 != p && p > Number(v))),
                (newmin = g ? p / g : p),
                (newmax = g ? h / g : h),
                newmin === newmax && (f = !1),
                (m = f
                  ? parseFloat(
                      (((m - newmin) / (newmax - newmin)) * 100).toFixed(3)
                    ) + "%"
                  : m);
              var w = d.enums.erduarr;
              m = n ? "" : m;
              var y = r.find("[sid=" + e + "]"),
                _ = y.closest(".params-item").find(".param-name .val");
              w.map(function (t, e) {
                if (i.erduinfo == t.value) {
                  var o = s ? a[t.color] : t.color;
                  y
                    .text(n ? "- -" : t.label)
                    .css("color", o)
                    .toggleClass("gray", n),
                    y.parent().css("color", o);
                }
              }),
                _.toggleClass("error", b).text(m),
                n ? l.hide() : l.show();
            }
            var x = r.find("[sid=" + e + "]").parents(".params-item");
            x.find(".result").length > 0 &&
              (x.find(".result").attr("style", ""),
              D.sdk.utils.patchFontSize(x, 2, ".result", 14)),
              x.find(".param-leftper").length > 0 &&
                D.sdk.utils.patchFontSize(x, 2, ".param-leftper", 9);
          },
          setChart: function (e, i) {
            var n = this.opts,
              s = t(n.container),
              a = e.sid,
              o = e.key,
              r = a + "_" + o,
              l = s
                .find("[key=" + o + "][sid=" + r + "]")
                .closest(".params-item");
            e.data.length > 0 && l.data("chart", e), i && i();
          },
          chartPage: function (e, i, s, a) {
            var o,
              r = e.integer.unit,
              l = e.datatype,
              c = e.integer.text,
              d = e.integer.text,
              u = e.integer.divisor ? parseInt(e.integer.divisor) : 1,
              h = isNaN(e.line) ? "" : e.line,
              p = e.section ? e.section : [0, 1, 2, 3],
              f = e.sid + "_" + e.integer.key;
            (markLine = {}),
              (emphasis = {}),
              (o = e.type ? (1 == e.type ? "bar" : "line") : "bar");
            var m = [
                { key: "max", label: a.max },
                { key: "min", label: a.min },
                { key: "avg", label: a.avg },
                { key: "add", label: a.add },
              ],
              v = [];
            p.map(function (t, e) {
              v.push(m[parseInt(t)]);
            });
            var g = "<ul>";
            if (v.length > 0) {
              g = '<div class="title">' + a.total + '</div><ul class="info">';
              v.length < 4
                ? v.map(function (t, e) {
                    g +=
                      '<li style="width: ' +
                      100 / v.length +
                      '%" key="' +
                      t.key +
                      '"><div class="gray"></div><div class="info-title">' +
                      t.label +
                      "</div></li>";
                  })
                : v.map(function (t, e) {
                    g +=
                      '<li style="width: ' +
                      100 / 3 +
                      '%" key="' +
                      t.key +
                      '"><div class="gray"></div><div class="info-title">' +
                      t.label +
                      "</div></li>";
                  });
            }
            g += "</ul>";
            var b = t(
              '<div class="echarts-wrap"><div class="chart-header"><i class="back-icon"></i><span class="text">' +
                c +
                '</span></div><ul class="chart-tab col-2"><li class="active">' +
                a.week +
                '</li><li class="">' +
                a.month +
                '</li></ul><ul class="echarts-tip clearfix col-2"><li><div class="title"></div><div class="subtitle"></div></li></ul><div class="echarts-box"></div><div class="chart-footer">' +
                g +
                '</div><div class="bottom-tip-wrap"><div class="bottom-tip"></div></div></div>'
            );
            if (h || 0 === h) {
              markLine = {
                data: [{ name: "", yAxis: h }],
                lineStyle: { color: "red", type: "solid" },
                symbol: "none",
                label: { position: "start" },
                silent: !0,
              };
              var w = 4 * (h + "").length;
              if ((h + "").length >= 8) w = parseInt(4.5 * (h + "").length);
            }
            "bar" == o &&
              (emphasis = { itemStyle: { color: "rgb(0, 125, 254)" } });
            var y = (function (t) {
                for (var e = { data: [], htmldata: [] }, i = 0; i < t; i++) {
                  var s = new Date(
                      new Date().setDate(new Date().getDate() - i)
                    ).toLocaleDateString(),
                    a = s.replace(/(\d+)\/(\d+)\/(\d+)/, function (t, e, i, s) {
                      if (e.length < 4) {
                        var a = e;
                        (e = s), (s = i), (i = a);
                      }
                      return e + n(i) + n(s);
                    });
                  e.data.unshift(a);
                  var o = a.substring(a.length - 4),
                    r = o.slice(0, 2) + "/" + o.slice(2);
                  e.htmldata.unshift(r);
                }
                return e;
              })(30),
              _ = [],
              x = [];
            if (s) {
              y.data.map(function (t, e) {
                var n = !0;
                i.map(function (e, i) {
                  if (t == e.time) {
                    n = !1;
                    var s = Math.round(e.avg) ? Math.round(e.avg) : 1e-5,
                      a = parseInt(e.sum) ? parseInt(e.sum) : 1e-5;
                    _.push({
                      value: s / u,
                      max: parseInt(e.max) / u,
                      min: parseInt(e.min) / u,
                      avg: Math.round(e.avg) / u,
                      add: parseInt(e.sum) / u,
                    }),
                      x.push({
                        value: a / u,
                        max: parseInt(e.max) / u,
                        min: parseInt(e.min) / u,
                        avg: Math.round(e.avg) / u,
                        add: parseInt(e.sum) / u,
                      });
                  }
                }),
                  n &&
                    (_.push({ value: 1e-5, max: 0, min: 0, avg: 0, add: 0 }),
                    x.push({ value: 1e-5, max: 0, min: 0, avg: 0, add: 0 }));
              });
              var C = 0,
                k = 0;
              _.map(function (t, e) {
                1e-5 == t.value && C++;
              }),
                30 == C &&
                  _.map(function (t, e) {
                    t.value = 0;
                  }),
                x.map(function (t, e) {
                  1e-5 == t.value && k++;
                }),
                30 == k &&
                  x.map(function (t, e) {
                    t.value = 0;
                  });
            } else
              i.map(function (t, e) {
                _.push({
                  value: parseInt(t.avg) / u,
                  max: parseInt(t.max) / u,
                  min: parseInt(t.min) / u,
                  avg: parseInt(t.avg) / u,
                  add: parseInt(parseInt(t.max) - parseInt(t.min)) / u,
                }),
                  x.push({
                    value: parseInt(parseInt(t.max) - parseInt(t.min)),
                    max: parseInt(t.max),
                    min: parseInt(t.min),
                    avg: parseInt(t.avg),
                    add: parseInt(parseInt(t.max) - parseInt(t.min)),
                  });
              });
            var O = [];
            (1 == l ? _ : x).map(function (t, e) {
              O.push({
                name: y.htmldata[e],
                value: t.value,
                info: y.htmldata[e],
                unit: r,
                max: t.max,
                min: t.min,
                avg: t.avg,
                add: t.add,
              });
            });
            var T = O.slice(-7),
              M = [
                {
                  name: d,
                  type: o,
                  markLine: markLine,
                  data: T,
                  itemStyle: { barBorderRadius: [10, 10, 0, 0] },
                  barWidth: 7,
                  emphasis: emphasis,
                },
              ],
              $ = y.htmldata,
              S = {
                color: ["rgba(0, 125, 254,.5)"],
                xAxis: {
                  type: "category",
                  axisLine: { lineStyle: { color: "#eaeaea" } },
                  axisTick: { show: !1 },
                  axisLabel: { color: "#999" },
                  data: y.htmldata.slice(-7),
                },
                tooltip: {
                  trigger: "axis",
                  formatter: function (e) {
                    e.map(function (e, i) {
                      if (1 == l) var n = e.data.avg;
                      else n = e.data.add;
                      var s = t(".echarts-wrap[key=" + f + "]").find(
                          ".echarts-tip li"
                        ),
                        a = e.seriesName + "(" + e.axisValue + ")",
                        o =
                          '<span class="number">' +
                          n +
                          "</span><span>" +
                          e.data.unit +
                          "</span>";
                      t(".echarts-wrap[key=" + f + "]")
                        .find(".info li")
                        .each(function (i, n) {
                          var s = t(n).attr("key");
                          t(n).find(".gray").text(e.data[s]);
                        }),
                        s.eq(i).find(".title").text(a),
                        s.eq(i).find(".subtitle").html(o);
                    });
                  },
                },
                yAxis: {
                  type: "value",
                  nameTextStyle: { color: "#999" },
                  splitNumber: 4,
                  nameGap: 20,
                  axisLine: { lineStyle: { color: "#eaeaea" }, show: !1 },
                  axisTick: { alignWithLabel: !0, show: !1 },
                  axisLabel: { color: "#999" },
                },
                grid: {
                  left: "2%",
                  right: "2%",
                  bottom: "6%",
                  top: "15%",
                  containLabel: !0,
                  id: "ss",
                },
                series: M,
              };
            if (
              (window.hilink && hilink.setTitleVisible(!1, "resultCallback"),
              t(".echarts-wrap[key=" + f + "]").length > 0)
            ) {
              var E = t(".echarts-wrap[key=" + f + "]");
              E.find(".chart-tab li").removeClass("active"),
                E.find(".chart-tab li").eq(0).addClass("active"),
                setTimeout(function () {
                  E.show(), P.resize();
                }, 200);
              var I = E.find(".echarts-box")[0];
              (P = echarts.init(I)).setOption(S);
              var j = P.convertToPixel({ gridId: "ss" }, [0, 0]);
              h && ((S.series[0].markLine.data[0].x = j[0] + w), P.setOption(S)),
                P.dispatchAction({
                  type: "showTip",
                  seriesIndex: 0,
                  dataIndex: 6,
                });
            } else {
              var P;
              t("body").append(b),
                b.attr("key", f),
                D.sdk.utils.patchFontSize(b, 1, ".chart-header .text", 14),
                (P = echarts.init(b.find(".echarts-box")[0])).setOption(S);
              j = P.convertToPixel({ gridId: "ss" }, [0, 0]);
              h && ((S.series[0].markLine.data[0].x = j[0] + w), P.setOption(S)),
                P.dispatchAction({
                  type: "showTip",
                  seriesIndex: 0,
                  dataIndex: 6,
                });
              (e = S.series[0].data)[e.length - 1];
              b.find(".back-icon").tap(function (t) {
                b.hide(),
                  window.hilink && hilink.setTitleVisible(!0, "resultCallback");
              }),
                b.find(".chart-tab li").tap(function (e) {
                  b.find(".chart-tab li").removeClass("active"),
                    t(e.target).addClass("active"),
                    0 == t(e.target).index()
                      ? ((S.series[0].type = o),
                        P.setOption(S),
                        P.dispatchAction({
                          type: "showTip",
                          seriesIndex: 0,
                          dataIndex: 6,
                        }))
                      : (P.setOption({ series: { data: O }, xAxis: { data: $ } }),
                        P.dispatchAction({
                          type: "showTip",
                          seriesIndex: 0,
                          dataIndex: 29,
                        }));
                }),
                t(window).resize(function () {
                  P.resize();
                });
            }
          },
        }),
        (i.util = {
          getContent: function (t, e) {
            return (function (t, e) {
              var i,
                n = t.sid,
                s = t.integer,
                a = t.enums,
                o = "",
                r = {};
              if (
                (a &&
                  a.erduarr.map(function (t, e) {
                    a.erduinfo == t.value && ((r.color = t.color), (i = t.label));
                  }),
                s && !a)
              ) {
                var l = s.max || 0 == s.max ? parseInt(s.max) : void 0,
                  c = s.min || 0 == s.min ? parseInt(s.min) : void 0,
                  d = s.percent,
                  u = (v = s.divisor) ? c / v : c,
                  h = v ? l / v : l,
                  p = s.unit;
                u === h && (d = !1);
                var f = v
                    ? parseFloat((parseInt(s.info) / parseInt(v)).toFixed(3))
                    : s.info,
                  m = s.info;
                (void 0 != l && l < Number(m)) || (void 0 != c && c > Number(m))
                  ? (flagclass = "error")
                  : (flagclass = ""),
                  (f = d
                    ? parseFloat((((f - u) / (h - u)) * 100).toFixed(3)) + "%"
                    : f),
                  (p = d ? "" : p),
                  (r.type = 1),
                  1 == e && ((f = "- -"), (p = ""), (o = "white")),
                  (r.dom =
                    '<div class="params-item filter-element">    <p class="result">        <span class="val ' +
                    flagclass +
                    " " +
                    o +
                    '" sid=' +
                    n +
                    ">" +
                    f +
                    '</span>        <span class="unit">' +
                    p +
                    '</span>    </p>    <p class="param-name">    <span class="param-leftper"><span class="label-text">' +
                    s.text +
                    "</span></span>    </p></div>");
              } else if (!s && a)
                (r.type = 2),
                  (r.dom =
                    '<div class="params-item filter-element">    <p class="result">        <span class="val eru ' +
                    o +
                    '" sid=' +
                    n +
                    ">" +
                    (e ? "- -" : i) +
                    '</span>    </p>    <p class="param-name">    <span class="param-leftper"><span class="label-text">' +
                    a.erutext +
                    "</span></span>    </p></div>");
              else if (s && a) {
                var v;
                (l = s.max || 0 == s.max ? parseInt(s.max) : ""),
                  (c = s.min || 0 == s.min ? parseInt(s.min) : ""),
                  (d = s.percent),
                  (u = (v = s.divisor) ? c / v : c) === (h = v ? l / v : l) &&
                    (d = !1),
                  (f = v
                    ? parseFloat((parseInt(s.info) / parseInt(v)).toFixed(3))
                    : s.info),
                  (m = s.info),
                  (void 0 != l && l < Number(m)) || (void 0 != c && c > Number(m))
                    ? (flagclass = "error")
                    : (flagclass = ""),
                  (f = d
                    ? parseFloat((((f - u) / (h - u)) * 100).toFixed(3)) + "%"
                    : f),
                  (p = s.unit),
                  (p = d ? "" : p),
                  (r.type = 3),
                  1 == e && ((f = ""), (p = "")),
                  (r.dom =
                    '<div class="params-item filter-element">    <p class="result">        <span class="val eru ' +
                    o +
                    '" sid=' +
                    n +
                    ">" +
                    (e ? "- -" : i) +
                    '</span>    </p>    <p class="param-name">    <span class="param-leftper"><span class="label-text">' +
                    s.text +
                    '</span>: <span class="val ' +
                    flagclass +
                    '">' +
                    f +
                    '</span><span class="unit">' +
                    p +
                    "</span></span>    </p></div>");
              }
              return r;
            })(t, e);
          },
        }),
        e.util.register(i)
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.Scroller = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      var i = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        n = "ontouchstart" in window,
        s = n ? "touchstart" : "mousedown",
        a = n ? "touchmove" : "mousemove",
        o = n ? "touchend" : "mouseup",
        r = 0;
      function l(t, e) {
        if (!t) return "";
        for (var i = [], n = 0, s = t.length; n < s; n++)
          i.push(
            e
              ? e(t[n].item, "ucd-scroller-item")
              : '<li class="ucd-scroller-item">' + t[n].item + "</li>"
          );
        return i.join("");
      }
      function c(t, e) {
        var i = window.getComputedStyle(t);
        return (i && i.getPropertyValue(e)) || 0;
      }
      function d(t) {
        var e,
          i = [],
          n = t && t.length,
          s = 0;
        if (!n) return [];
        for (var a = 0; a < n; a++) {
          e = t[a];
          for (var o = s; o < t[a]._colCount + s + 1; o++)
            (i[o] = e && e.option && e.option[e.selected % e.option.length]),
              (e = e && e.option && e.option[e.selected % e.option.length]);
          s = t[a]._colCount + s + 1;
        }
        return i;
      }
      function u(t, e) {
        for (var i = t.option[t.selected], n = 0; n < e; n++)
          i =
            i &&
            i.option &&
            i.option.length &&
            i.option[i.selected % i.option.length];
        return i;
      }
      function h(t) {
        return (t = t[0]).style.transform
          ? t.style.transform.split(",")[1].replace(/[^\d|\.|\-]/g, "") - 0
          : ((t.style.transform = "translate3d(0,0,0)"), 0);
      }
      function p(t, e) {
        return t > 0 ? 0 : -Math.round(t / e);
      }
      function f(e) {
        (this.opts = t.extend(
          {},
          {
            cssClass: "",
            selected: 0,
            timeConstant: 200,
            isover: !1,
            circular: !1,
            gapHeight: 1.2,
          },
          e
        )),
          (this.uid = r++),
          (this.element = t(
            '<div class="ucd-scroller-wrapper ' +
              this.opts.cssClass +
              '"><div class="ucd-scroller"></div></div>'
          ).appendTo("body")),
          this._create();
      }
      return (
        (f.prototype = {
          constructor: f,
          _create: function () {
            this.cdata = [];
            var i = this.opts;
            (this.curCols = []),
              (this.optArr = []),
              (this._states = []),
              (this.$outerbox = this.element.find(".ucd-scroller")),
              (this.fontSize = document.documentElement.style.fontSize),
              0 === parseInt(this.fontSize) &&
                ((this.fontSize =
                  D && D.sdk && D.sdk.isUnfold && D.sdk.isUnfold()
                    ? 38.3
                    : (n
                        ? document.documentElement.clientWidth ||
                          window.screen.width
                        : window.innerWidth) / 10),
                (document.documentElement.style.fontSize = this.fontSize + "px")),
              this._setScroller(),
              (this.resetScroller = e.util
                .debounce(this._setScroller, 200)
                .bind(this)),
              t(window)
                .off(".scroller" + this.uid)
                .on(
                  "resize.scroller" + this.uid,
                  function () {
                    this.resetScroller();
                  }.bind(this)
                ),
              t(
                '<div class="upfilter"></div><div class="downfilter"></div>'
              ).insertBefore(t(this.$outerbox.find(".ucd-scroller-row")[0])),
              (this.cdata = this.optArr && this.optArr.length && d(this.optArr)),
              i.appendDom &&
                t.isFunction(i.appendDom) &&
                i.appendDom
                  .call(this, this.opts)
                  .insertBefore(t(this.$outerbox.find(".ucd-scroller-row")[0])),
              this.element[0].addEventListener(s, function (t) {
                t.stopPropagation();
              }),
              this.element[0].addEventListener(
                o,
                function (t) {
                  t.target === t.currentTarget && this.hide();
                }.bind(this)
              ),
              this.element.find(".btn-layer .btn").length > 0 &&
                D.sdk.utils.patchFontSize(this.element, 1, ".btn-layer .btn", 14),
              this.element.find(".pop-title").length > 0 &&
                D.sdk.utils.patchFontSize(this.element, 2, ".pop-title", 14),
              this.element.find(".pop-date").length > 0 &&
                D.sdk.utils.patchFontSize(this.element, 2, ".pop-date", 9),
              this.hide(!0);
          },
          _setScroller: function (t) {
            var e = this.opts,
              i = this._states;
            (this._curSIndex = 0),
              this.$outerbox.find(".ucd-scroller-row").remove();
            var n =
              i &&
              i.length &&
              i.map(function (t) {
                return t.lastIndex;
              });
            if (e.options && e.options.length)
              for (var s = e.options.length, a = 0; a < s; a++) this._init(a);
            else this._init(0);
            (n =
              n ||
              i.map(function (t) {
                return t.lastIndex;
              })),
              this.selectVal(n),
              t && t();
          },
          _init: function (e) {
            this.optArr[e] = t.extend({}, this.opts, {
              option:
                (this.opts.options && this.opts.options[e]) || this.opts.option,
            });
            var i = this._getOpts(e),
              n = (this.element, this._states),
              s = this;
            i.option &&
              i.option.length &&
              (s._createRow(e),
              (s._start = []),
              (s._move = []),
              (s._end = []),
              (s.$cols = s.$outerbox.find(".ucd-scroller-col")),
              (i.gapHeight = parseFloat(
                c(s.$cols.eq(e).find("li")[0], "height")
              )),
              s.curCols &&
                s.curCols.each(function (a, o) {
                  (n[a + s._curSIndex] = t.extend(n[a + s._curSIndex] || {}, {
                    index: a + s._curSIndex,
                    stop: !1,
                    min: i.gapHeight - t(o).children("ul").height(),
                    max: 0,
                  })),
                    s._bindDrag(t(o), e);
                }),
              s._scrollToValue(s.$cols.eq(e), i.selected, 0, e),
              this.opts.circular &&
                s.curCols &&
                s.curCols.each(function (e, n) {
                  var a = h(t(n).children());
                  (a = s._insertBlock(10, !0, a, t(n), e, i)),
                    (a = s._insertBlock(10, !1, a, t(n), e, i));
                }),
              (s._curSIndex += i._colCount + 1));
          },
          _getOpts: function (t) {
            return this.optArr[t];
          },
          _createRow: function (e) {
            var i = this._getOpts(e),
              n = [],
              s = i.option;
            if (s && s.length) {
              var a;
              (i._colCount = (function (t) {
                var e = 0;
                return (
                  t.option &&
                    t.option.length &&
                    (function t(i, n) {
                      i.option &&
                        i.option.forEach(function (i) {
                          n > e && (e = n),
                            i.option && i.option.length && t(i, n + 1);
                        });
                    })(t, 0),
                  e
                );
              })(i)),
                (i._colSPos = (function (t, e) {
                  for (var i = e, n = 0, s = 0; s < i; s++)
                    n += t[s]._colCount + 1;
                  return n;
                })(this.optArr, e)),
                (i._rowdom = []),
                n.push(
                  '<div class="ucd-scroller-row"><div class="ucd-scroller-col"><ul>'
                ),
                (i._rowdom[0] = l(s, i.render[e])),
                n.push(i._rowdom[0]),
                n.push("</ul></div>");
              for (var o = 1; o <= i._colCount; o++)
                (a = u(i, o - 1)),
                  n.push('<div class="ucd-scroller-col"><ul>'),
                  (i._rowdom[e] = l(a && a.option, i.render[o + e])),
                  n.push(i._rowdom[e]),
                  n.push("</ul></div>");
              n.push("</div>");
              var r = t(n.join(""));
              this.$outerbox.append(r),
                (this.curCols = r.find(".ucd-scroller-col"));
            }
          },
          show: function () {
            var e = this.opts.onshow;
            e && t.isFunction(e) && e.apply(null, this.cdata),
              this.element.show(),
              this.element.find(".pop-date").length > 0 &&
                D.sdk.utils.setFontSize(this.element.find(".pop-date"), 2, 9);
          },
          hide: function (e) {
            if (!e) {
              var i = this.opts.onhide;
              i && t.isFunction(i) && i.apply(null, this.cdata);
            }
            this.element.hide();
          },
          _offsetAdjust: function (t, e, i, n) {
            var s,
              a,
              o = e.gapHeight * e.option.length,
              r = Math.ceil(Math.abs(t.target - t.startOffset) / o),
              l = 5 * -o,
              c = 15 * -o;
            return t.target > l
              ? ((s = Math.max(r, 5)),
                (a = !1),
                this._movedata(s, a, t.lastOffset, i, n, e))
              : t.target < c
              ? ((s = Math.max(r, 5)),
                (a = !0),
                this._movedata(s, a, t.lastOffset, i, n, e))
              : 0;
          },
          _movedata: function (t, e, i, n, s, a) {
            var o,
              r = n.children("ul"),
              l = i || h(r),
              c = l;
            return (
              e
                ? ((c = this._insertBlock(t, !1, l, n, s, a)),
                  (o = this._removeBlock(t, !0, c, n, s, a)))
                : ((c = this._removeBlock(t, !1, l, n, s, a)),
                  (o = this._insertBlock(t, !0, c, n, s, a))),
              o - l
            );
          },
          _insertBlock: function (e, i, n, s, a, o) {
            var r,
              l = s.children("ul"),
              c = n || h(l),
              d = o.option.length,
              u = t("<div></div>"),
              p = e;
            if (i) {
              for (; p > 0; ) u.append(t(o._rowdom[a])), p--;
              l.prepend(u.children());
              var f = d * e;
              (r = c - o.gapHeight * f), this._scrollTo(l, r), (o.selected += f);
            } else {
              for (; p > 0; ) u.append(t(o._rowdom[a])), p--;
              l.append(u.children());
            }
            return r || c;
          },
          _removeBlock: function (t, e, i, n, s, a) {
            var o,
              r = n.children("ul"),
              l = i || h(r),
              c = a.option.length;
            if (
              ((function (t, e, i) {
                var n = t[0],
                  s = n.childNodes;
                if (i) for (var a = 0; a < e; a++) n.removeChild(s[0]);
                else {
                  var o = s.length - e - 1;
                  for (a = s.length - 1; a > o; a--) n.removeChild(s[a]);
                }
              })(r, c * t, e),
              e)
            ) {
              var d = c * t;
              (o = l + a.gapHeight * d), this._scrollTo(r, o), (a.selected -= d);
            }
            return o || l;
          },
          selectVal: function (t) {
            for (
              var e,
                i,
                n,
                s,
                a = this.optArr,
                o = this.$cols,
                r = a.length,
                l = 0,
                c = 0;
              c < r;
              c++
            ) {
              for (e = l + ((n = a[c])._colCount || 0) + 1, s = l; s < e; s++)
                n.option &&
                  n.option.length &&
                  ((n.selected = parseInt(isNaN(t[s]) ? n.selected || 0 : t[s])),
                  this.opts.circular
                    ? (n.selected += n.option && 10 * n.option.length)
                    : ((i = n.option && n.option.length - 1),
                      (n.selected = n.selected < 0 ? 0 : n.selected),
                      (n.selected = n.selected > i ? i : n.selected)),
                  (n = n.option[n.selected]));
              (n = a[c]),
                o && o.eq(l) && this._scrollToValue(o.eq(l), n.selected, 0, c),
                (l = e);
            }
            this.cdata = d(this.optArr);
          },
          setOption: function (t, e) {
            t.option && ((this.opts.option = t.option), delete this.opts.options),
              void 0 !== t.circular && (this.opts.circular = t.circular),
              this._states &&
                this._states.forEach(function (t) {
                  t.lastIndex = 0;
                }),
              this.opts.options &&
                ((this.opts.options = t.options), delete this.opts.option),
              this.resetScroller(e);
          },
          _scrollToValue: function (t, e, i, n) {
            var s,
              a,
              o,
              r = this._getOpts(n),
              c = this._states[i + r._colSPos],
              d = t.children();
            ((o = i ? u(r, i - 1) : r).selected = o.selected || 0),
              (a = o.option && o.option.length),
              (s = e < 0 ? 0 : e),
              (c.lastIndex = s),
              (o.selected = s),
              this._scrollTo(d, -s * r.gapHeight),
              d
                .children("li")
                .eq(s)
                .addClass("active")
                .siblings(".active")
                .removeClass("active");
            var h = u(r, i),
              p = "",
              f = i + r._colSPos + 1,
              m = this.$cols.eq(f);
            if (h && h.option && h.option.length)
              p = "<ul>" + l(h.option, r.render[f]) + "</ul>";
            r._colCount && m && m.html(p),
              h &&
                h.option &&
                h.option.length &&
                m &&
                this._scrollToValue(m, h.selected || 0, i + 1, n);
          },
          _scroll: function (t, e, i, n, s, a, o) {
            var r = o ? a.gapHeight : 0;
            (s.offset = e),
              a.circular ||
                (s.offset = (function (t, e, i, n, s) {
                  return t < e - s
                    ? ((n.isover = !0), e - s)
                    : t > i + s
                    ? ((n.isover = !0), i + s)
                    : t;
                })(e, s.min, s.max, s, r)),
              this._scrollTo(t.children(), s.offset);
          },
          _scrollTo: function (t, e) {
            t.css("transform", "translate3D(0, " + e + "px, 0)");
          },
          _selectItem: function (t, e, i, n) {
            var s = p(e, i.gapHeight);
            n.lastIndex !== s &&
              ((n.lastIndex = s),
              t
                .children("li")
                .eq(s)
                .addClass("active")
                .siblings(".active")
                .removeClass("active"));
          },
          _bindDrag: function (t, e) {
            var n = this._getOpts(e),
              a = t.index(),
              o = a + n._colSPos;
            (this._start[o] = this._onDragStart.bind(this, t, e, a)),
              t[0].removeEventListener(s, this._start[o], { passive: !i }),
              t[0].addEventListener(s, this._start[o], { passive: !i });
          },
          _onDragStart: function (e, n, s, r) {
            i && r.preventDefault();
            var l = this._getOpts(n),
              d = l.beforeScroll;
            d && t.isFunction(d) && d.apply(null, l),
              this.element.addClass("ucd-scroller-drag"),
              e.addClass("ucd-scroller-active");
            var u = e.children("ul");
            if (u.length) {
              var p = u.children(),
                f = s + l._colSPos,
                m = this._states[f];
              return (
                (window._isDrag = !0),
                (m.isover = !1),
                (m.stop = !0),
                (m.startYPos = m.lastYPos = r.touches
                  ? r.touches[0].pageY
                  : r.pageY),
                (m.velocity = 0),
                (m.amplitude = 0),
                (m.startOffset = m.offset = h(u)),
                (m.trackOffset = m.offset),
                (m.dragstarttime = m.timestamp = Date.now()),
                (l.gapHeight = parseFloat(c(p[0], "height"))),
                (m.min = l.gapHeight - u.height()),
                (u[0].style.transition = "none"),
                (this._move[f] = this._onDragging.bind(this, e, n, s)),
                (this._end[f] = this._onDragEnd.bind(this, e, n, s)),
                e[0].addEventListener(a, this._move[f], { passive: !i }),
                e[0].addEventListener(o, this._end[f], { passive: !i }),
                !1
              );
            }
          },
          _onDragging: function (t, e, n, s) {
            i && s.preventDefault();
            var a = this._getOpts(e),
              o = this._states[n + a._colSPos];
            o.stop = !0;
            var r = s.touches ? s.touches[0].pageY : s.pageY,
              l = r - o.lastYPos;
            return (
              (o.timestamp = Date.now()),
              (l > 2 || l < -2) &&
                ((o.lastYPos = r),
                this._scroll(t, o.offset + l, e, n, o, a, !0),
                o.draggingtime || (o.draggingtime = o.timestamp),
                o.timestamp - o.draggingtime > 100 &&
                  (this._selectItem(t.children(), o.offset + l, a, o),
                  (o.draggingtime = o.timestamp))),
              (o.trackOffset = o.offset),
              !1
            );
          },
          _onDragEnd: function (e, n, s, r) {
            i && r.preventDefault();
            var l = this._getOpts(n),
              c = l.afterScroll,
              f = (s = e.index()) + l._colSPos,
              m = this._states[f],
              v = e.children("ul");
            u(l, s - 1);
            (m.draggingtime = 0),
              (m.dragendtime = m.timestamp = Date.now()),
              (m.dragtime = m.dragendtime - m.dragstarttime);
            var g = (1e3 * (m.trackOffset - m.startOffset)) / (1 + m.dragtime);
            (m.velocity = g),
              (m.velocity = m.velocity > 800 ? 800 : m.velocity),
              (m.velocity = m.velocity < -800 ? -800 : m.velocity),
              (m.lastOffset = h(v)),
              this.element.removeClass("ucd-scroller-drag"),
              e.removeClass("ucd-scroller-active");
            var b = this,
              w = l.timeConstant;
            if (
              ((m.target = m.offset),
              Math.abs(m.velocity) > 150 &&
                m.dragtime < 200 &&
                ((m.amplitude = 0.2 * m.velocity),
                (m.target = m.offset + m.amplitude)),
              (m.target = Math.round(m.target / l.gapHeight) * l.gapHeight),
              this.opts.circular)
            ) {
              var y = this._offsetAdjust(m, l, e, s);
              (m.target += y), (m.offset += y);
            }
            (m.amplitude = m.target - m.offset), (m.stop = !1);
            var _ = 0,
              x = !1;
            if (
              (m.startOffset !== m.lastOffset &&
                (m.timer = requestAnimationFrame(function i(a) {
                  _ || (_ = a - 16);
                  if (x) return;
                  var o = a - _;
                  var r = -m.amplitude * Math.pow(1.8, -o / w);
                  var f;
                  if (m.stop) return void cancelAnimationFrame(m.timer);
                  Math.abs(r) > 1
                    ? (Math.abs(r) < 10 && (w /= 1.1),
                      b._scroll(e, m.target + r, n, s, m, l),
                      b._selectItem(v, m.target + r, l, m),
                      (m.timer = requestAnimationFrame(i)))
                    : (b._scroll(e, m.target, n, s, m, l), (x = !0));
                  m.isover && (x = !0);
                  if (x) {
                    (f = p(h(v), l.gapHeight)),
                      (m.lastIndex = f),
                      b._scrollToValue(e, f, s, n);
                    u(l, s);
                    e
                      .children("ul")
                      .children("li")
                      .eq(f)
                      .addClass("active")
                      .siblings(".active")
                      .removeClass("active"),
                      (b.cdata = d(b.optArr)),
                      c && t.isFunction(c) && c.apply(null, b.cdata),
                      cancelAnimationFrame(m.timer);
                  }
                  if (!m.amplitude) return;
                })),
              e[0].removeEventListener(a, this._move[f], { passive: !i }),
              e[0].removeEventListener(o, this._end[f], { passive: !i }),
              (m.lastOffset = h(v)),
              m.startOffset === m.lastOffset)
            ) {
              var C = t(r.target).closest(".ucd-scroller-item").index();
              if (-1 === C) return;
              return (
                (v[0].style.transition =
                  "transform 300ms cubic-bezier(.1, .57, .1, 1)"),
                this._scrollToValue(e, C, s, n),
                (m.lastIndex = C),
                cancelAnimationFrame(m.timer),
                (this.cdata = d(this.optArr)),
                void (c && t.isFunction(c) && c.apply(null, this.cdata))
              );
            }
            return !1;
          },
        }),
        f
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.ModeList = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(i) {
        (this.opts = t.extend(
          !0,
          {
            themes: "default",
            title: "默认卡片",
            sign: !1,
            signtit: "已选中",
            data: [],
            container: t("body"),
          },
          i
        )),
          (this.$element = t(this.opts.container)),
          this._create(),
          e.util.init(this);
      }
      function n(e, i) {
        if (e.$element.closest(".ucd-disabled").length) return !1;
        var n,
          s = t(i.target),
          a = s.closest(".ucd-modelist-item"),
          o = s.closest(".ucd-modelist-section"),
          r = a.index(),
          l = a.attr("data-id"),
          c = e.opts;
        return a.is(".selected")
          ? void 0
          : (o.is(".ucd-modelist-inactive") || e.select(l),
            (n = t.extend(!0, {}, c.data[r].data)),
            c.onclick &&
              c.onclick.call(null, i, r, { id: c.data[r].id, data: n }),
            !1);
      }
      return (
        (i.prototype = {
          constructor: i,
          resetAudio: function (t) {
            var e;
            if (
              this.audios &&
              this.audios.current &&
              ((e = this.audios.current).stop(), this.audios && this.audios[t])
            ) {
              e = this.audios.current = this.audios[t];
              try {
                e.load(),
                  e.play(),
                  this.$element
                    .find('.ucd-modelist-item[data-id="' + t + '"]')
                    .addClass("music-play"),
                  (this.audioStatus = "play"),
                  (this.selected = t);
              } catch (t) {
                console.log(JSON.stringify(t));
              }
            }
          },
          playAudio: function (t) {
            var e;
            if (this.audios && this.audios.current) {
              e = this.audios.current;
              try {
                t ? e.play() : e.pause(),
                  (this.audioStatus = t ? "play" : "pause");
              } catch (t) {
                console.log(JSON.stringify(t));
              }
            }
          },
          select: function (t, e) {
            e ||
              (e = this.$element.find('.ucd-modelist-item[data-id="' + t + '"]'));
            var i = e,
              n = i.index(),
              s = this.opts,
              a = i.siblings();
            i.is(".selected") ||
              (("default" !== s.themes || s.sign) &&
                (i.addClass("selected"), a.removeClass("selected")),
              s.button &&
                (a.find(".ucd-modelist-button").text(s.button.off),
                i.find(".ucd-modelist-button").text(s.button.on)),
              "tile" === s.themes &&
                this.audios.current &&
                (a.removeClass("music-play music-pause"),
                this.resetAudio(s.data[n].id)));
          },
          selectByValue: function (t) {
            var e = this.$element.find(
                '.ucd-modelist-item[data-value="' + t + '"]'
              ),
              i = e.attr("data-id");
            this.select(i, e);
          },
          unselect: function () {
            var t = this.$element.find(".ucd-modelist-item.selected"),
              e = this.opts;
            0 != t.length &&
              (t.removeClass("selected music-play music-pause"),
              e.button && t.find(".ucd-modelist-button").text(e.button.off),
              "tile" === e.themes && this.audios.current && this.playAudio(!1));
          },
          _create: function () {
            var t = new RegExp(/^\.\/sdk/);
            this.opts.data.map(function (e, i) {
              if (e.image)
                if ("object" == typeof e.image) D.sdk.utils.setURLData(e.image);
                else if ("string" == typeof e.image && !t.test(e.image)) {
                  var n =
                    ((s = e.image),
                    (a = s.split("/")),
                    -1 !== s.indexOf("/custom/") || -1 !== s.indexOf("/download/")
                      ? (s = "../resource/" + a[a.length - 1])
                      : -1 !== s.indexOf("/system/") &&
                        (s = "../../common/" + a[a.length - 1]),
                    s);
                  (e.image = []),
                    (e.image[0] = n),
                    D.sdk.utils.setURLData(e.image);
                }
              var s, a;
            });
            var i = this.opts,
              s = this.$element,
              a = e.util.template(
                '<% if(title) { %> <header class="ucd-modelist-header"><%= title %></header> <% } %><ul class="ucd-modelist-section clearfix">  <% for(var i = 0, len = data ? data.length : 0; i < len; i++) { %>    <li class="ucd-modelist-item" data-id="<%= data[i].id %>" data-value="<%= data[i].value %>">      <div class="ucd-modelist-image"><% if(signtit) { %> <div class="ucd-modelist-select"><%= signtit %></div> <% } %>        <img class="lazy-load" data-image="<%= typeof(data[i].image) == "string" ? data[i].image : data[i].image[0] %>" src="<%= data[i].image %>"  />        <% if(data[i].audio) { %> <i class="icon-play"></i><i class="icon-dynamic"></i> <% } %>      </div>      <div class="ucd-modelist-info">        <% if(button) { %> <span class="ucd-modelist-button"><%= button.off %></span> <% } %>        <% if(data[i].info) { %> <p class="ucd-modelist-label <%= data[i].audio ? "icon-music" : "" %>"><%= data[i].info.label %></p> <% } %>        <% if(data[i].info) { %> <p class="ucd-modelist-desc"><%= data[i].info.text %></p> <% } %>      </div>    </li>  <% } %></ul>'
              )({
                title: i.title,
                signtit: i.signtit,
                data: i.data,
                button: i.button,
              });
            s.html(a).addClass("ucd-modelist ucd-modelist-" + i.themes),
              i.sign && s.addClass("image-sign"),
              new e.lazyload({
                container: s,
                effect: "fadeIn",
                placeholder:
                  "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
              });
            var o = s.find(".ucd-modelist-image"),
              r = s.find(".ucd-modelist-button"),
              l = this;
            "default" === i.themes
              ? o.tap(function (t) {
                  n(l, t);
                })
              : (r.tap(function (t) {
                  n(l, t);
                }),
                s.on(e.Events.DOWN, ".selected .icon-play", function (t) {
                  !(function (t) {
                    if (t.$element.closest(".ucd-disabled").length) return !1;
                    var e = "play" == t.audioStatus;
                    t.$element
                      .find('.ucd-modelist-item[data-id="' + t.selected + '"]')
                      .toggleClass("music-play", !e)
                      .toggleClass("music-pause", e),
                      t.playAudio(!e);
                  })(l);
                }),
                (function (t) {
                  if (t.$element.closest(".ucd-disabled").length) return !1;
                  var i = (t.audios = {});
                  e.util.each(t.opts.data, function (e, n) {
                    e.audio &&
                      ((i[e.id] = new Howl({
                        src: [e.audio],
                        loop: !0,
                        preload: !1,
                      })),
                      i.current ||
                        ((i.current = i[e.id]), (t.audioStatus = "ready")));
                  });
                })(l)),
              i.create && i.create && i.create.call(null, null, l),
              i.disabled &&
                (function (t, e) {
                  t.$element.toggleClass("ucd-disabled disabled", !1 !== e);
                })(l, i.disabled);
          },
        }),
        e.util.register(i)
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.Dialog = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(e) {
        (this.opts = t.extend(
          {},
          {
            dialogClassName: null,
            content: null,
            buttons: [{ className: "btn-ok", label: "确定", handler: t.noop }],
            maskclick: t.noop,
          },
          e
        )),
          this._create();
      }
      return (
        (i.prototype = {
          constructor: i,
          _create: function () {
            var i = this.opts;
            (this.element = $el = t(
              '<div class="ucd-dialog">    <div class="ucd-mask"></div>    <div class="ucd-container"></div></div>'
            )),
              i.dialogClassName && $el.addClass(i.dialogClassName);
            var n = $el.find(".ucd-container"),
              s = t('<div class="ucd-dialog-content"></div>').appendTo(n),
              a = t('<div class="ucd-dialog-footer"></div>').appendTo(n);
            (this.$content = s),
              this.setContent(i.content),
              i.buttons &&
                i.buttons.length &&
                t.each(i.buttons, function (t, e) {
                  a.append(
                    '<span class="ucd-dialog-btn ' +
                      e.className +
                      '">' +
                      e.label +
                      "</span>"
                  ),
                    a.find("." + e.className).tap(e.handler);
                }),
              i.maskclick &&
                "function" == typeof i.maskclick &&
                $el.find(".ucd-mask").tap(i.maskclick),
              $el.appendTo("body"),
              $el.find(".ucd-mask").on(e.Events.MOVE, function (t) {
                window.Bounce &&
                  window.Bounce.lampBounceObj &&
                  window.Bounce.lampBounceObj.off();
              }),
              $el.find(".insulateNew").length > 0 &&
                D.sdk.utils.patchFontSize($el, 2, ".insulateNew", 14);
          },
          setContent: function (t) {
            return this.$content.html(t), this;
          },
          show: function () {
            this.element.show();
          },
          hide: function () {
            this.element.hide();
          },
        }),
        e.util.register(i)
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.StatusInfo = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(e) {
        (this._settings = t.extend(
          !0,
          {
            container: document.body,
            options: {
              title: "滤网状态",
              data: [
                {
                  name: "PP棉滤芯",
                  unit: "天",
                  label: "预计剩余天数",
                  iconClass: "specific-icon",
                  leftPer: 80,
                  leftTime: 100,
                  hasper: !0,
                  hastime: !0,
                },
              ],
              detailclick: t.noop,
            },
          },
          e
        )),
          this._create();
      }
      function n(e) {
        if (e)
          return (e =
            "string" == typeof e &&
            -1 == e.indexOf("#") &&
            -1 == e.indexOf(".") &&
            -1 == e.indexOf(":") &&
            0 == t(e).length
              ? t("#" + e)
              : t(e));
      }
      return (
        (i.prototype = {
          setcontent: function (t, e) {
            var i = n(this._settings.container),
              s = this._settings.options.langInfo,
              a = i.find("[sid=" + t + "]");
            if (e.hastime) {
              var o,
                r,
                l = a.find(".label .num").next();
              parseInt(e.timemax) >= parseInt(e.leftTime) &&
                parseInt(e.leftTime) >= parseInt(e.timemin) &&
                (o = e.leftTime),
                parseInt(e.leftTime) > parseInt(e.timemax) && (o = e.timemax),
                parseInt(e.timemin) > parseInt(e.leftTime) && (o = e.timemin),
                (r = e.isDay ? Math.floor(parseInt(o) / 24) : o),
                a.find(".label .num").text(r),
                l.text(e.unit),
                r <= 1 &&
                  (e.unit == s.day && l.text(s.singleday),
                  e.unit == s.hour && l.text(s.singlehour));
            }
            if (e.hasper) {
              var c = parseInt(e.leftPer),
                d = "";
              (d = c <= 10 ? "small" : c > 10 && c <= 20 ? "middle" : "large"),
                parseInt(e.permax) >= parseInt(e.leftPer) &&
                  parseInt(e.leftPer) >= parseInt(e.permin) &&
                  a
                    .find(".detail .text")
                    .text(e.leftPer + "%")
                    .removeClass()
                    .addClass("text " + d),
                parseInt(e.leftPer) > parseInt(e.permax) &&
                  a
                    .find(".detail .text")
                    .text(e.permax + "%")
                    .removeClass()
                    .addClass("text " + d),
                parseInt(e.permin) > parseInt(e.leftPer) &&
                  a
                    .find(".detail .text")
                    .text(e.permin + "%")
                    .removeClass()
                    .addClass("text " + d);
            }
          },
          _create: function () {
            !(function (e) {
              for (
                var i,
                  s,
                  a,
                  o = e._settings,
                  r = o.options,
                  l = n(o.container),
                  c = "",
                  d = t(
                    '<div class="statusInfo"><div class="status-title">' +
                      r.title +
                      '</div><div class="status-content"></div></div>'
                  ),
                  u = 0;
                u < r.data.length;
                u++
              )
                r.data[u].leftPer,
                  (i = r.data[u].hastime ? "" : "no-leftitme"),
                  (s = r.data[u].hasper ? "" : "no-per"),
                  (a = r.data[u].hasreset ? "" : "no-reset"),
                  (c +=
                    '<div class="status-item ' +
                    i +
                    " " +
                    s +
                    " " +
                    a +
                    '" sid=' +
                    r.data[u].sid +
                    '><div class="desc"><div class="info">' +
                    r.data[u].name +
                    '</div><div class="label"><span class="label-text">' +
                    r.data[u].label +
                    ' </span><span class="num">' +
                    Math.floor(parseInt(r.data[u].leftTime) / 24) +
                    "</span> <span>" +
                    r.data[u].unit +
                    '</span></div></div><div class="detail"><span class="text">' +
                    r.data[u].leftPer +
                    '%</span><span class="' +
                    r.data[u].iconClass +
                    '"></span></div></div>');
              d.find(".status-content").append(c),
                l.append(d),
                l
                  .find(".status-item")
                  .children(".detail")
                  .tap(function (e) {
                    var i = t(e.target).closest(".status-item"),
                      n =
                        (i.find(".info").text(),
                        t(e.target).closest(".status-item").index()),
                      s = (i.attr("sid"), r.data[n]);
                    i.hasClass("no-leftitme") ||
                      (s.leftTime = parseInt(i.find(".num").text())),
                      i.hasClass("no-per") ||
                        (s.leftPer = parseInt(
                          i.find(".detail").children(".text").text()
                        )),
                      i.hasClass("no-reset") || (s.hasreset = !0),
                      r.detailclick(s);
                  });
            })(this);
          },
        }),
        e.util.register(i)
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.SvgView = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(i) {
        i.progress = i.progress > 100 ? 100 : i.progress < 0 ? 0 : i.progress;
        var n = (this.opts = t.extend(
            !0,
            {
              container: document.body,
              progress: 50,
              strokeWidth: 10,
              width: 200,
              height: 150,
              x: 120,
              y: 130,
              R: 90,
              strokelinecap: "round",
              color: "#FFF",
              initCallback: t.noop,
            },
            i
          )),
          s = t(i.container);
        s.length &&
          ((this.$element = s), this._create(s, n, i), e.util.init(this));
      }
      function n(e) {
        var i = {
            startAngle: 45,
            endAngle: 315,
            x: 120,
            y: 130,
            R: 90,
            strokelinecap: "round",
            strokeWidth: 10,
            color: "#FFF",
            transform: "rotate(90, " + (e.x || 120) + ", " + (e.y || 130) + ")",
          },
          n = new s((e = t.extend(!0, i, e)).x, e.y, e.R, e.startAngle),
          o = new s(e.x, e.y, e.R, e.endAngle),
          r = document.createElementNS("http://www.w3.org/2000/svg", "path");
        return (
          a(r, {
            d:
              "M" +
              n.x +
              "," +
              n.y +
              "A" +
              e.R +
              "," +
              e.R +
              ",0," +
              +(e.endAngle - e.startAngle > 180) +
              ",1," +
              o.x +
              "," +
              o.y,
            fill: "none",
            stroke: e.color || "#CCC",
            "stroke-width": e.strokeWidth || 1,
          }),
          e.strokelinecap && r.setAttribute("stroke-linecap", e.strokelinecap),
          e.strokeDasharray &&
            r.setAttribute("stroke-dasharray", e.strokeDasharray),
          e.transform && r.setAttribute("transform", e.transform),
          r
        );
      }
      function s(t, e, i, n) {
        var s = ((360 - n) * Math.PI) / 180;
        return { x: t + i * Math.cos(s), y: e - i * Math.sin(s) };
      }
      function a(t, e) {
        for (var i in e) t.setAttribute(i, e[i]);
      }
      return (
        (i.prototype = {
          _create: function (e, i, s) {
            var o = this;
            (o.svg = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg"
            )),
              a(o.svg, {
                version: "1.1",
                width: s.width || "240px",
                height: s.height || "240px",
              }),
              o.svg.appendChild(
                (function (t) {
                  var e, i;
                  t <= 10
                    ? ((e = "#EB1D14"), (i = "#F7803C"))
                    : t <= 20
                    ? ((e = "#F5C44A"), (i = "#E3773A"))
                    : ((e = "#6885F6"), (i = "#52A1F7"));
                  var n = document.createElementNS(
                      "http://www.w3.org/2000/svg",
                      "defs"
                    ),
                    s = document.createElementNS(
                      "http://www.w3.org/2000/svg",
                      "linearGradient"
                    ),
                    o = document.createElementNS(
                      "http://www.w3.org/2000/svg",
                      "stop"
                    ),
                    r = document.createElementNS(
                      "http://www.w3.org/2000/svg",
                      "stop"
                    );
                  return (
                    a(s, {
                      id: "grad",
                      x1: "0%",
                      y1: "0%",
                      x2: "100%",
                      y2: "100%",
                    }),
                    a(o, {
                      offset: "0%",
                      style: "stop-color:" + e + ";stop-opacity:1",
                    }),
                    a(r, {
                      offset: "100%",
                      style: "stop-color:" + i + ";stop-opacity:1",
                    }),
                    s.appendChild(o),
                    s.appendChild(r),
                    n.appendChild(s),
                    n
                  );
                })(s.progress)
              ),
              o.svg.appendChild(n(i));
            var r = 2.7,
              l = 0;
            o.svg.appendChild(
              n(t.extend(!0, i, { endAngle: 45 + r * l, color: "url(#grad)" }))
            ),
              e.find("svg").remove(),
              e.append(t(o.svg));
            var c = t(
              ".filter-element-pop .filter-element-body .progress-arc-val-con .num"
            );
            !(function e() {
              o.svg.replaceChild(
                n(t.extend(!0, i, { endAngle: 45 + r * l, color: "url(#grad)" })),
                o.svg.lastChild
              ),
                c.text(l),
                ++l <= s.progress
                  ? window.setTimeout(function () {
                      e();
                    }, 15)
                  : s.initCallback &&
                    t.isFunction(s.initCallback) &&
                    s.initCallback();
            })();
          },
        }),
        e.util.register(i)
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.DialogTip = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(i) {
        (this.opts = t.extend({}, { dialogClassName: null, content: null }, i)),
          (this.$element = t(
            '<div class="ucd-dialog DialogTip"><a class="ucd-container"></a></div>'
          )),
          this._create(),
          e.util.init(this);
      }
      return (
        (i.prototype = {
          constructor: i,
          setContent: function (t) {
            return this.$content.html(t), this;
          },
          show: function () {
            this.$element.show();
          },
          hide: function () {
            this.$element.hide();
          },
          _create: function () {
            var e = this.opts,
              i = this.$element;
            e.dialogClassName && i.addClass(e.dialogClassName);
            var n = i.find(".ucd-container"),
              s =
                (t('<span class="ucd-dialog-warnIcon"></span>').appendTo(n),
                t('<span class="ucd-dialog-content"></span>').appendTo(n));
            t('<span class="ucd-dialog-linkIcon"></span>').appendTo(n);
            (this.$content = s), this.setContent(e.content), i.appendTo("body");
          },
        }),
        e.util.register(i)
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.Warning = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(i) {
        (this.opts = t.extend(
          {},
          {
            container: t("<div></div>"),
            hasPage: !1,
            warnDesc: "",
            warnReason: "",
            warnSolution: "",
            warnTel: "",
            warnLink: "",
            infoLabel: {
              pageTitle: "故障信息",
              reason: "故障原因",
              solution: "解决办法",
              tel: "服务电话",
              link: "购买链接",
            },
          },
          i
        )),
          this._create(),
          e.util.init(this);
      }
      return (
        (i.prototype = {
          constructor: i,
          _create: function () {
            var e = this.opts;
            (this.container = t('<div class="ucd-warning"></div>').appendTo(
              e.container
            )),
              e.hasPage
                ? (this._warnInfo(e.warnDesc, !0), this._warnPage())
                : this._warnInfo(e.warnDesc, !1),
              e.container.appendTo(t("body"));
          },
          _warnInfo: function (e, i) {
            var n =
              '<div class="ucd-warning-info"><div class="ucd-warning-icon"></div><p class="ucd-warning-text">' +
              e +
              "</p>";
            i && (n += '<div class="ucd-warning-arrow"></div>'),
              (n += "</div>"),
              (this.info = t(n).appendTo(this.container)),
              (window.warnInfoHeightCallback = function (e) {
                var i = JSON.parse(e).statusBarHeight;
                t("body")
                  .find(".ucd-warning-info")
                  .css({ "margin-top": i - 28 });
              }),
              window.hilink &&
                hilink.getStatusBarHeight("warnInfoHeightCallback");
          },
          _warnPage: function () {
            var e = t(
              '<div class="ucd-warning-page"><div class="ucd-warningPage-header"><span class="ucd-warningPage-bak icon"><i></i></span><div class="ucd-warningPage-title">' +
                this.opts.infoLabel.pageTitle +
                "</div></div></div>"
            );
            (this.page = e.appendTo(this.container)),
              ($pageWrap = t('<div class="ucd-warningPage-wrap"></div>')),
              (this.pageWrap = $pageWrap.appendTo(this.page));
            var i = t(
              '<div class="ucd-warningPage-content"><div class="ucd-warningPage-container"><div class="ucd-warningPage-img"></div></div></div>'
            );
            this.pageContent = i.appendTo($pageWrap);
            var n = t('<p class="ucd-warningPage-desc"></p>');
            this.desc = n.appendTo(
              this.pageContent.children(".ucd-warningPage-container")
            );
            var s = t(
              '<div class="ucd-warningPage-text"><p class="ucd-warningPage-cap">' +
                this.opts.infoLabel.reason +
                '</p><p class="ucd-warningPage-reason"></p></div>'
            );
            this.reason = s.appendTo(i);
            var a = t(
              '<div class="ucd-warningPage-text"><p class="ucd-warningPage-cap">' +
                this.opts.infoLabel.solution +
                "</p></div>"
            );
            this.solution = a.appendTo(i);
            var o = t(
              '<div class="ucd-warningPage-text"><p class="ucd-warningPage-cap">' +
                this.opts.infoLabel.tel +
                '</p><p class="ucd-warningPage-tel"></p></div>'
            );
            this.tel = o.appendTo(i);
            var r = t(
              '<div class="ucd-warningPage-text"><p class="ucd-warningPage-cap">' +
                this.opts.infoLabel.link +
                '</p><p class="ucd-warningPage-link"></p></div>'
            );
            (this.link = r.appendTo(i)),
              (window.warnPageHeightCallback = function (e) {
                var i = JSON.parse(e).statusBarHeight;
                t("body")
                  .find(".ucd-warning-page")
                  .css({ "padding-top": i - 28 });
              }),
              window.hilink &&
                hilink.getStatusBarHeight("warnPageHeightCallback"),
              this._setPage(),
              this._initEvent(),
              this.showPage(!1);
          },
          _initEvent: function () {
            var e = this,
              i = e.info,
              n = e.page.find(".ucd-warningPage-bak");
            i.tap(function () {
              e.info.children(".ucd-warning-arrow")[0] &&
                (e.showPage(!0),
                t(".GeneralWarn .ucd-warning-page").length > 0 &&
                  window.D.sdk.utils.patchFontSize(
                    t(".GeneralWarn .ucd-warningPage-header"),
                    1,
                    ".ucd-warningPage-title",
                    14
                  ),
                window.history.pushState({}, "a", window.location.href));
            }),
              n.tap(function () {
                e.showPage(!1), window.history.back();
              }),
              e.link.children(".ucd-warningPage-link").tap(function () {
                window.location.replace(e.opts.warnLink);
              }),
              window.addEventListener("popstate", function () {
                e.showPage(!1);
              });
          },
          _setPage: function () {
            var i = this.opts,
              n = i.warnDesc,
              s = i.warnReason,
              a = i.warnSolution,
              o = i.warnTel,
              r = i.warnLink;
            new e.Bounce({
              container: this.pageWrap[0],
              target: this.pageContent[0],
              onStart: function () {},
              onMove: function () {},
              isInner: !0,
              topOff: !0,
              bottomOff: !0,
            }),
              this.desc.text(n),
              this.reason.children(".ucd-warningPage-reason").text(s),
              this.tel.children(".ucd-warningPage-tel").text(o),
              this.link.children(".ucd-warningPage-link").text(r),
              this.solution.children(".ucd-warningPage-solution").remove();
            var l = "";
            a.split("@").map(function (e, i) {
              e &&
                t.trim(e) &&
                (l += '<p class="ucd-warningPage-solution">' + e + "</p>");
            }),
              t(l).appendTo(this.solution),
              s && t.trim(s) ? this.reason.show() : this.reason.hide(),
              l ? this.solution.show() : this.solution.hide(),
              o && t.trim(o) ? this.tel.show() : this.tel.hide(),
              r && t.trim(r) ? this.link.show() : this.link.hide();
          },
          _showTitle: function (t) {
            setTimeout(function () {
              (window.warnTitleCallback = function () {}),
                window.hilink && hilink.setTitleVisible(t, "warnTitleCallback");
            }, 10);
          },
          showPage: function (i) {
            i
              ? this.info.children(".ucd-warning-arrow")[0] &&
                (this._showTitle(!1), this.page && this.page.show())
              : (this.page &&
                  "block" == this.page.css("display") &&
                  this._showTitle(!0),
                this.page && this.page.hide()),
              this.container
                .children(t(".ucd-warning-page"))
                .on(e.Events.MOVE, function (t) {
                  window.Bounce &&
                    window.Bounce.lampBounceObj &&
                    window.Bounce.lampBounceObj.off();
                });
          },
          update: function (e) {
            var i = this;
            this.opts = t.extend(!0, this.opts, e);
            var n,
              s = this.opts.hasPage,
              a = this.info.children(".ucd-warning-arrow");
            this.info.children(".ucd-warning-text").text(this.opts.warnDesc),
              s
                ? a[0]
                  ? this.page && "block" == this.page.css("display")
                    ? (n = this.page.find(".ucd-warningPage-bak")).tap(
                        function () {
                          i._setPage(),
                            n.off(),
                            n.tap(function () {
                              i.showPage(!1), window.history.back();
                            });
                        }
                      )
                    : this._setPage()
                  : (t('<div class="ucd-warning-arrow"></div>').appendTo(
                      this.info
                    ),
                    this._warnPage())
                : a[0] &&
                  (this.page && "block" == this.page.css("display")
                    ? (n = this.page.find(".ucd-warningPage-bak")).tap(
                        function () {
                          a.remove(), i.page.remove(), i._showTitle(!0);
                        }
                      )
                    : (a.remove(), this.page && this.page.remove()));
          },
          show: function () {
            this.container.show();
          },
          hide: function () {
            this.showPage(!1), this.container.hide();
          },
          setZIndex(t) {
            this.info.css("z-index", t);
          },
        }),
        e.util.register(i)
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.ListArray = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(i) {
        (this.defultOptions = {
          container: t(".xxx"),
          class: "",
          priorityType: "",
          type: "text",
          data: [{}],
          exportData: [],
          editable: !0,
          handler: t.noop,
        }),
          "text" == i.priorityType && (this.defultOptions.data = [{}]),
          (this.opts = t.extend(!0, {}, this.defultOptions, i)),
          (this.class = this.opts.class || this.defultOptions.class),
          this._isBoolean(this.opts.editable) ||
            (console.log("配置editable应为Bool类型，请重新配置"),
            (this.opts.editable = !1)),
          this._createList(),
          e.util.init(this);
      }
      return (
        (i.prototype = {
          constructor: i,
          _isBoolean: function (t) {
            return (
              !0 === t ||
              !1 === t ||
              ("object" == typeof t &&
                null !== t &&
                Object.prototype.toString.call(t) === boolTag)
            );
          },
          _createList: function () {
            var i = this.opts.data || this.defultOptions.data,
              n = t.extend([], i),
              s = this.opts.editable,
              a = this.opts.type || this.defultOptions.type,
              o = "";
            o =
              "text" ==
              (this.opts.priorityType || this.defultOptions.tpriorityTypeype)
                ? '<div class="ucd-list"><% if(list){ %><% for(var i = 0, len = list ? list.length : 0; i < len; i++) { %><div class="ucd-list-item"   data-key=<%= list[i].sid %>><div class="text-box"  style="width:100%"><span class="text"><%= list[i].name %></span><% if( editable == true){ %><span class="edit"></span><% } %></div></div><% } %><% } %></div>'
                : '<div class="ucd-list"><% if(list){ %><% for(var i = 0, len = list ? list.length : 0; i < len; i++) { %><div class="ucd-list-item"   data-key=<%= list[i].sid %>><% if(type == "text"){ %><span class="text"> <%= list[i].text %> </span><% } else{ %><i class="icon icon-type-defult icon-type-img"  type=<%= list[i].image.filter(function(item){ return item.includes("_off")})%>  style="background-image:url(<%= list[i].image.filter(function(item){ return item.includes("_off")})%>)"></i><i class="icon icon-type-dark icon-type-img"  type=<%= list[i].image.filter(function(item){ return item.includes("_DarkOff")})%> style="background-image:url( <%= list[i].image.filter(function(item){ return item.includes("_DarkOff")})%>)"></i><% } %><div class="text-box"><span class="text"><%= list[i].name %></span><% if( editable == true){ %><span class="edit"></span><% } %></div></div><% } %><% } %></div>';
            var r = e.util.template(o)({ list: n || [], editable: s, type: a });
            this.opts.container.html(r),
              this.opts.container.find(".ucd-list").addClass(this.class),
              this._Edit();
          },
          _Edit: function () {
            var e = this,
              i = "",
              n = {},
              s = {};
            t(".ucd-list .ucd-list-item").tap(function (a) {
              (i = t(this).closest(".ucd-list-item").data("key")),
                (n = e.opts.data.filter(function (t) {
                  return t.sid == i;
                })),
                e.opts.exportData.map(function (t) {
                  s[t] = n[0][t];
                }),
                e.opts.handler(s);
            });
          },
          updataUI: function (t) {
            var e = this;
            e.opts.data &&
              e.opts.data.map(function (i) {
                t.map(function (t) {
                  i.sid == t.sid &&
                    ((i.name = t.name),
                    (e.opts.container
                      .find(".ucd-list-item[data-key =" + i.sid + "]")
                      .find(".text-box .text")[0].innerText = i.name));
                });
              });
          },
        }),
        e.util.register(i)
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.DialogInput = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(e) {
        var i = {
          class: "",
          content: null,
          title: "标题",
          value: "输入框内容",
          placeholder: "输入框默认内容",
          tip: "校验提示",
          tipDefult: "",
          rule: /"|{|}|\/|\\|&|<|>|'|`/,
          maxLen: 16,
          buttons: [{ className: "btn-ok", label: "确定", handler: t.noop }],
          maskclick: t.noop,
        };
        (this.defultOptions = i),
          (this.opts = t.extend(!0, {}, i, e)),
          (this.verifyPass = !0),
          (this.class = this.opts.class
            ? this.opts.class
            : this.defultOptions.class
            ? this.defultOptions.class
            : "ucd-dialog-input"),
          this._create();
      }
      return (
        (i.prototype = {
          constructor: i,
          _create: function () {
            var i = this,
              n = this.opts,
              s = this.defultOptions;
            (this.element = $el = t(
              '<div class="ucd-dialog-input">    <div class="ucd-mask"></div>    <div class="ucd-container"></div></div>'
            )),
              $el.addClass(this.class);
            var a = $el.find(".ucd-container"),
              o = t('<div class="ucd-dialog-content"></div>').appendTo(a),
              r = t('<div class="ucd-dialog-footer"></div>').appendTo(a);
            if (((this.$content = o), "Input" == n.content)) {
              var l =
                '<div class="dialog-main"><div class="dialog-title">' +
                (n.title || s.title) +
                '</div> <div class="dialog-input"><div class="dialog-input-defult"></div><div class="dialog-input-verify">' +
                (n.tip || s.tip) +
                '</div><div class="dialog-input-verify-defult">' +
                (n.tipDefult || s.tipDefult) +
                '</div><input class="dialog-input-value" type="text" /><div class="icon"></div></div ></div >';
              this.setContent(l);
            } else this.setContent(n.content);
            (n.buttons &&
              n.buttons.length &&
              t.each(n.buttons, function (e, n) {
                r.append(
                  '<span class="ucd-dialog-input-btn ' +
                    n.className +
                    '">' +
                    n.label +
                    "</span>"
                ),
                  n.handler &&
                    "function" == typeof n.handler &&
                    r.find("." + n.className).tap(function () {
                      var e = t("." + i.class)
                          .find(".ucd-container .dialog-input")
                          .find("input"),
                        s = e && t.trim(e.val()),
                        a = i.modify(s);
                      n.handler(a);
                    });
              }),
            n.maskclick &&
              "function" == typeof n.maskclick &&
              $el.find(".ucd-mask").tap(n.maskclick),
            $el.appendTo("body"),
            $el.find(".ucd-mask").on(e.Events.MOVE, function (t) {
              window.Bounce &&
                window.Bounce.lampBounceObj &&
                window.Bounce.lampBounceObj.off();
            }),
            "" == this.opts.tipDefult
              ? t("." + this.class)
                  .find(".ucd-dialog-footer")
                  .addClass("top-low-class")
              : t("." + this.class)
                  .find(".ucd-dialog-footer")
                  .removeClass("top-low-class"),
            "Input" == n.content) &&
              (t("." + this.class)
                .find(".dialog-input-verify")
                .hide(),
              t("." + this.class)
                .find(".dialog-input .dialog-input-defult")
                .text(this.opts.placeholder || this.defultOptions.placeholder),
              (this.verifyPass = !0),
              this._dialogClear(),
              this._inputChange(),
              this._dialogInputFocus(n.value || s.value),
              t("." + this.class)
                .find(".ucd-container .dialog-input")
                .find("input")
                .tap(function () {
                  var e = t("." + i.class)
                    .find(".ucd-container .dialog-input")
                    .find("input")
                    .val();
                  i._dialogInputFocus(e);
                }));
          },
          setContent: function (t) {
            return this.$content.html(t), this;
          },
          show: function () {
            this.element.show();
          },
          hide: function () {
            this.element.hide();
          },
          _dialogClear: function () {
            var e = this,
              i = t(".dialog-main .icon"),
              n = t("." + this.class)
                .find(".ucd-container .dialog-input")
                .find("input");
            i.tap(function () {
              if (
                (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
                  ? (n.val("").focus(), e._inputDefultVal(n.val()))
                  : setTimeout(function () {
                      n.val("").focus(), e._inputDefultVal(n.val());
                    }, 10),
                (e.verifyPass = !0),
                e.verifyPass)
              ) {
                "" == e.opts.tipDefult
                  ? t("." + e.class)
                      .find(".ucd-dialog-footer")
                      .addClass("top-low-class")
                  : t("." + e.class)
                      .find(".ucd-dialog-footer")
                      .removeClass("top-low-class");
                var i = t(".dialog-input-verify"),
                  s = t(".dialog-input-verify-defult");
                i.hide(),
                  s.show(),
                  t("." + e.class)
                    .find(".dialog-input")
                    .removeClass("color-warn");
              }
            });
          },
          _inputDefultVal: function (e) {
            var i = t("." + this.class).find(".dialog-input .icon"),
              n = t("." + this.class).find(".dialog-input .dialog-input-defult");
            this._notEmpty(e)
              ? (i.show(), n.hide())
              : (i.hide(), n.css("display", "-webkit-box"));
          },
          _getVal: function (t, e) {
            if (!(this._checkLength(t, e) > e)) return t;
            for (
              var i = Math.floor(e / 2), n = t.length, s = "", a = i;
              a <= n;
              a++
            ) {
              var o = t.substr(0, a);
              if (this._checkLength(o) > e) return s;
              s = o;
            }
          },
          _inputChange: function () {
            var e = this;
            t("." + this.class)
              .find(".dialog-input input")
              .on("input porpertychange", function () {
                var i = t(this).val();
                e._inputDefultVal(i), e._checkSpecialChar(i);
              });
          },
          _checkSpecialChar: function (e) {
            var i = t("." + this.class).find(".dialog-input-verify"),
              n = t(".dialog-input-verify-defult"),
              s = this.opts.rule || /"|{|}|\/|\\|&|<|>|'|`/,
              a = this._checkLength(e),
              o = "",
              r = t("." + this.class).find(".dialog-input input"),
              l = this.opts.maxLen ? this.opts.maxLen : this.defultOptions.maxLen;
            a >= l && ((o = this._getVal(e, l)), r.val(o), (e = o)),
              "" == this.opts.tipDefult
                ? t("." + this.class)
                    .find(".ucd-dialog-footer")
                    .addClass("top-low-class")
                : t("." + this.class)
                    .find(".ucd-dialog-footer")
                    .removeClass("top-low-class"),
              s.test(e) || this._isEmojiCharacter2(e) || this._isEmojiCharacter(e)
                ? (i.show(),
                  n.hide(),
                  (this.verifyPass = !1),
                  t("." + this.class)
                    .find(".dialog-input")
                    .addClass("color-warn"),
                  t("." + this.class)
                    .find(".ucd-dialog-footer")
                    .removeClass("top-low-class"))
                : (i.hide(),
                  n.show(),
                  (this.verifyPass = !0),
                  t("." + this.class)
                    .find(".dialog-input")
                    .removeClass("color-warn"),
                  "" == this.opts.tipDefult
                    ? t("." + this.class)
                        .find(".ucd-dialog-footer")
                        .addClass("top-low-class")
                    : t("." + this.class)
                        .find(".ucd-dialog-footer")
                        .removeClass("top-low-class"));
          },
          _isEmojiCharacter: function (t) {
            for (var e = 0; e < t.length; e++) {
              var i = t.charCodeAt(e);
              if (55296 <= i && i <= 56319) {
                if (t.length > 1) {
                  var n =
                    1024 * (i - 55296) + (t.charCodeAt(e + 1) - 56320) + 65536;
                  if (118784 <= n && n <= 128895) return !0;
                }
              } else if (t.length > 1) {
                if (8419 == t.charCodeAt(e + 1)) return !0;
              } else {
                if (8448 <= i && i <= 10239) return !0;
                if (11013 <= i && i <= 11015) return !0;
                if (10548 <= i && i <= 10549) return !0;
                if (12951 <= i && i <= 12953) return !0;
                if (
                  169 == i ||
                  174 == i ||
                  12349 == i ||
                  12336 == i ||
                  11093 == i ||
                  11036 == i ||
                  11035 == i ||
                  11088 == i
                )
                  return !0;
              }
            }
          },
          _isEmojiCharacter2: function (t) {
            return /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi.test(
              t
            );
          },
          _checkLength: function (t) {
            var e, i;
            for (i = 0, e = 0; e < t.length; e++)
              t.charCodeAt(e) >= 0 && t.charCodeAt(e) <= 255
                ? (i += 1)
                : (i += 2);
            return i;
          },
          _notEmpty: function (t) {
            return (
              (this._bool = !1), (this._bool = null != t && "" != t), this._bool
            );
          },
          _dialogInputFocus: function (e) {
            var i = this,
              n = t("." + this.class)
                .find(".ucd-container .dialog-input")
                .find("input");
            !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
              ? (n.val(e).focus(), i._inputDefultVal(e))
              : setTimeout(function () {
                  n.val("").val(e).focus(), i._inputDefultVal(e);
                }, 10);
          },
          modify: function (e) {
            if (this.verifyPass) {
              var i = t("." + this.class)
                  .find(".ucd-container .dialog-input")
                  .find("input"),
                n = i && t.trim(i.val()),
                s = this.opts.placeholder
                  ? this.opts.placeholder
                  : this.opts.value;
              return i.blur(), this._notEmpty(e) && "" != e ? n : s;
            }
            return t("." + this.class).show(), !1;
          },
          updataFn: function (e, i, n, s, a, o) {
            (this.opts.placeholder = i),
              (this.opts.value = e),
              (this.opts.title = n),
              (this.opts.tip = s),
              (this.opts.rule = o),
              t("." + this.class)
                .find(".dialog-input .dialog-input-defult")
                .text(i || this.opts.placeholder)
                .hide(),
              t("." + this.class)
                .find(".dialog-input .dialog-input-value")
                .val(e || this.opts.value),
              t("." + this.class)
                .find(".dialog-title")
                .text(n || this.opts.title),
              t("." + this.class)
                .find(".dialog-input-verify")
                .text(s || this.opts.tip),
              t("." + this.class)
                .find(".dialog-input-verify-defult")
                .text(a || this.opts.tipDefult),
              a || "" == this.opts.tipDefult
                ? t("." + this.class)
                    .find(".ucd-dialog-footer")
                    .addClass("top-low-class")
                : t("." + this.class)
                    .find(".ucd-dialog-footer")
                    .removeClass("top-low-class"),
              this._checkSpecialChar(e);
          },
        }),
        e.util.register(i)
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.Calendar = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function n(e) {
        this.defultOptions = {
          optionalDate: [],
          container: "xxx",
          defultTime: "",
          limit: 100,
          buttons: [],
          maskclick: t.noop,
        };
        var i = new Date();
        (this.defultOptions.year =
          e.defultTime && e.defultTime.split("-")[0]
            ? parseInt(e.defultTime.split("-")[0])
            : i.getFullYear()),
          (this.defultOptions.month =
            e.defultTime && e.defultTime.split("-")[1]
              ? parseInt(e.defultTime.split("-")[1])
              : i.getMonth() + 1),
          (this.defultOptions.date =
            e.defultTime && e.defultTime.split("-")[2]
              ? parseInt(e.defultTime.split("-")[2])
              : i.getDate()),
          (this.opts = t.extend(!0, {}, this.defultOptions, e)),
          (this.opts.year = this.defultOptions.year),
          (this.opts.month = this.defultOptions.month),
          (this.opts.date = this.defultOptions.date),
          (this.opts.limit = Number(this.opts.limit)),
          (this.canClick = !0),
          (this.activeYMD = {}),
          this._create();
      }
      return (
        (n.prototype = {
          constructor: n,
          _create: function () {
            var e = this,
              i = t("." + this.opts.container),
              n =
                '<div class="ucd-calender"><div class="ucd-calender-mask"></div><div class="ucd-calender-content"><div class="ucd-calebder-header"><div class="ucd-calebder-select"><div class="ucd-calebder-select-icon prev"></div><div class="ucd-calebder-select-time"><span class="ucd-calebder-select-y">' +
                this.opts.year +
                '年</span><span class="ucd-calebder-select-m">' +
                this.opts.month +
                '月</span></div><div class="ucd-calebder-select-icon next"></div></div><div class="ucd-calebder-goto-today"><span class="zh-show">今天</span> <span class="en-show">Today</span></div></div><div class="ucd-calebder-body"><div class="ucd-calebder-listDate-show"><div class="ucd-calebder-day-list"><div><span class="zh-show">日</span><span class="en-show">Sun</span></div><div><span class="zh-show">一</span><span  class="en-show">Mon</span></div><div><span class="zh-show">二</span><span  class="en-show">Tue</span></div><div><span class="zh-show">三</span><span  class="en-show">Wed</span></div><div><span class="zh-show">四</span><span  class="en-show">Thu</span></div><div><span class="zh-show">五</span><span  class="en-show">Fri</span></div><div><span class="zh-show">六</span><span  class="en-show">Sat</span></div></div><div class="ucd-calebder-date"><div class="ucd-calebder-date-box clone-dom-first"></div><div class="ucd-calebder-date-box original-dom"></div><div class="ucd-calebder-date-box clone-dom-second"></div></div></div><div class="ucd-calebder-year-select"><div class="ucd-calebder-year-box"></div></div><div class="ucd-calebder-month-select"><div class="ucd-calebder-month-box"><div data-month="1"> <span class="zh-show">一月</span><span  class="en-show">Jan</span></div><div data-month="2"> <span class="zh-show">二月</span><span  class="en-show">Feb</span></div><div data-month="3"> <span class="zh-show">三月</span><span  class="en-show">Mar</span></div><div data-month="4"> <span class="zh-show">四月</span><span  class="en-show">Apr</span></div><div data-month="5"> <span class="zh-show">五月</span><span  class="en-show">May</span></div><div data-month="6"> <span class="zh-show">六月</span><span  class="en-show">Jun</span></div><div data-month="7"> <span class="zh-show">七月</span><span  class="en-show">Jul</span></div><div data-month="8"> <span class="zh-show">八月</span><span  class="en-show">Aug</span></div><div data-month="9"> <span class="zh-show">九月</span><span  class="en-show">Sep</span></div><div data-month="10"> <span class="zh-show">十月</span><span  class="en-show">Oct</span></div><div data-month="11"> <span class="zh-show">十一月</span><span  class="en-show">Nov</span></div><div data-month="12"> <span class="zh-show">十二月</span><span  class="en-show">Dec</span></div></div></div></div><div class="ucd-calebder-footer"></div></div></div>';
            i.html(n),
              t("." + this.opts.container)
                .find(".ucd-calebder-date-box.clone-dom-first")
                .css(
                  "left",
                  -t("." + this.opts.container)
                    .find(".ucd-calebder-date")
                    .width()
                ),
              t("." + this.opts.container)
                .find(".ucd-calebder-date-box.clone-dom-second")
                .css(
                  "left",
                  t("." + this.opts.container)
                    .find(".ucd-calebder-date")
                    .width()
                ),
              (this.element = i.find(".ucd-calender"));
            var s = i.find(".ucd-calebder-footer");
            this.opts.buttons &&
              this.opts.buttons.length &&
              t.each(this.opts.buttons, function (t, i) {
                s.append(
                  '<span class="ucd-calebder-footer-btn ' +
                    i.className +
                    '">' +
                    i.label +
                    "</span>"
                ),
                  i.handler &&
                    "function" == typeof i.handler &&
                    s.find("." + i.className).tap(function () {
                      var t = e.activeYMD.year,
                        n =
                          e.activeYMD.month < 10
                            ? "0" + e.activeYMD.month
                            : e.activeYMD.month,
                        s =
                          e.activeYMD.date < 10
                            ? "0" + e.activeYMD.date
                            : e.activeYMD.date,
                        a = {};
                      (a.year = t), (a.month = n), (a.date = s), i.handler(a);
                    });
              }),
              this._maskClick(),
              this.updataUI(
                this.defultOptions.year,
                this.defultOptions.month,
                e.defultOptions.date,
                this.opts.optionalDate
              ),
              (e.activeYMD.date = this.defultOptions.date),
              (e.activeYMD.month = this.defultOptions.month),
              (e.activeYMD.year = this.defultOptions.year),
              this._changeYMD(),
              t("." + this.opts.container).on("touchstart", function () {
                window.Bounce &&
                  window.Bounce.lampBounceObj &&
                  window.Bounce.lampBounceObj.off();
              }),
              this._touchEvent();
          },
          btnDisable: function (e) {
            t("." + this.opts.container)
              .find("." + e)
              .addClass("disable");
          },
          _touchEvent: function () {
            var e,
              i,
              n = !0,
              s = this;
            t(".ucd-calebder-body").on("touchstart", function (t) {
              var i = t.originalEvent.targetTouches[0];
              i.pageX;
              (e = i.pageX), (n = !0);
            }),
              t(".ucd-calebder-body").on("touchmove", function (a) {
                var o = a.originalEvent.targetTouches[0];
                o.pageX;
                if (((i = o.pageX), n))
                  if (i - e > 50) {
                    if (
                      ((n = !1),
                      t("." + s.opts.container)
                        .find(".ucd-calebder-select-icon.prev")
                        .hasClass("disable"))
                    )
                      return;
                    s.canClick &&
                      ((s.canClick = !1),
                      s._prevMonthFn(),
                      s._selectMonthBox(!1),
                      s._selectYearBox(!1),
                      s._calenderDateBox(!0),
                      setTimeout(function () {
                        s.canClick = !0;
                      }, 600));
                  } else if (i - e < -50) {
                    if (
                      ((n = !1),
                      t("." + s.opts.container)
                        .find(".ucd-calebder-select-icon.next")
                        .hasClass("disable"))
                    )
                      return;
                    s.canClick &&
                      ((s.canClick = !1),
                      s._nextMonthFn(),
                      s._selectMonthBox(!1),
                      s._selectYearBox(!1),
                      s._calenderDateBox(!0),
                      setTimeout(function () {
                        s.canClick = !0;
                      }, 600));
                  }
              }),
              t(".ucd-calebder-body").on("touchend", function (t) {
                var e = t.originalEvent.changedTouches[0];
                e.pageX;
                e.pageX;
              });
          },
          show: function () {
            this.element.show();
          },
          hide: function () {
            var t = this.element;
            this._selectMonthBox(!1),
              this._selectYearBox(!1),
              this._calenderDateBox(!0),
              t.hide();
          },
          _maskClick: function () {
            var e = this;
            t("." + this.opts.container)
              .find(".ucd-calender-mask")
              .tap(function () {
                e.opts.maskclick();
              });
          },
          _getMonthDate: function (t, e) {
            var i = [];
            t || e || ((t = this.opts.year), (e = this.opts.month));
            var n = new Date(t, e - 1, 1),
              s = n.getDay();
            0 === s && (s = 7), (t = n.getFullYear()), (e = n.getMonth() + 1);
            for (
              var a = new Date(t, e - 1, 0).getDate(),
                o = s - 1,
                r = new Date(t, e, 0).getDate(),
                l = t - 1,
                c = t + 1,
                d = 0;
              d < 42;
              d++
            ) {
              var u = d - o,
                h = u,
                p = e;
              u <= 0
                ? (0 == (p = e - 1) ? ((p = 12), (t = l)) : (t = this.opts.year),
                  (h = a + u))
                : u > r
                ? (13 === (p = e + 1) ? ((p = 1), (t = c)) : (t = this.opts.year),
                  (h -= r),
                  (t = this.opts.year))
                : ((h = h), (p = e), (t = this.opts.year)),
                i.push({ date: u, month: p, year: t, showDate: h });
            }
            return { days: i };
          },
          activeToday: function () {
            (this.opts.date = this.defultOptions.date),
              (this.opts.month = this.defultOptions.month),
              (this.opts.year = this.defultOptions.year),
              (this.activeYMD.year = this.defultOptions.year),
              (this.activeYMD.month = this.defultOptions.month),
              (this.activeYMD.date = this.defultOptions.date),
              this.updataUI(
                this.defultOptions.year,
                this.defultOptions.month,
                this.defultOptions.date,
                this.opts.optionalDate
              );
            var e = t("." + this.opts.container).find(
              ".ucd-calebder-date-box.original-dom > div.today"
            );
            e.addClass("active"),
              e.hasClass("no-data") && this.btnDisable("btn-ok");
          },
          _changeYMD: function () {
            var e = this,
              i = t("." + this.opts.container).find(".ucd-calebder-goto-today"),
              n = t("." + this.opts.container).find(
                ".ucd-calebder-month-box >div"
              );
            i.tap(function () {
              e._calenderDateBox(!0),
                e._selectMonthBox(!1),
                e._selectYearBox(!1),
                e._setCalebderTime(e.defultOptions.year, e.defultOptions.month),
                e.activeToday(),
                t("." + e.opts.container)
                  .find(".ucd-calebder-date")
                  .removeAttr("style");
            }),
              n.tap(function () {
                var i = t(this).closest("div").data("month");
                (e.opts.month = i),
                  e.updataUI(e.opts.year, i, 0, e.opts.optionalDate),
                  e._selectYearBox(!1),
                  e._selectMonthBox(!1),
                  e._calenderDateBox(!0);
              }),
              this._GotoPrevMonth(),
              this._GotoNextMonth(),
              this._createYear(
                this.opts.limit ? this.opts.limit : this.defultOptions.limit
              );
          },
          _createYear: function (e) {
            var n = this,
              s = [],
              a = t("." + this.opts.container).find(".ucd-calebder-year-box");
            for (s.push(this.opts.year), i = 1; i <= e; i++)
              s.push(this.opts.year + i), s.unshift(this.opts.year - i);
            s.map(function (t) {
              a.append('<div data-year="' + t + '">' + t + "</div>");
            }),
              t("." + this.opts.container)
                .find(".ucd-calebder-year-box > div")
                .tap(function () {
                  var e = parseInt(t(this).text());
                  (n.opts.year = e),
                    n.updataUI(e, n.opts.month, 0, n.opts.optionalDate),
                    n._selectYearBox(!1),
                    n._selectMonthBox(!1),
                    n._calenderDateBox(!0);
                });
          },
          _setCalebderTime: function (e, i) {
            t("." + this.opts.container)
              .find(".ucd-calebder-select-time")
              .html(
                '<span class="ucd-calebder-select-y"><span>' +
                  e +
                  '</span><span class="zh-show">年</span></span><span class="ucd-calebder-select-m"><span class="zh-show"><span>' +
                  i +
                  '</span>月</span ><span class="en-show" style="margin-left: 0.2rem"> ' +
                  [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ][i - 1] +
                  "</span ></span>"
              );
            var n = t(".ucd-calebder-select-icon.next");
            e >= this.defultOptions.year && i == this.defultOptions.month
              ? n.addClass("disable")
              : n.removeClass("disable");
          },
          _calenderDateBox: function (e) {
            var i = t("." + this.opts.container).find(
              ".ucd-calebder-listDate-show"
            );
            e ? i.fadeIn(200) : i.hide();
          },
          _selectYearBox: function (e) {
            var i = t("." + this.opts.container).find(
              ".ucd-calebder-year-select"
            );
            e ? i.fadeIn(100) : i.hide();
          },
          _selectMonthBox: function (e) {
            var i = t("." + this.opts.container).find(
              ".ucd-calebder-month-select"
            );
            e ? i.fadeIn(100) : i.hide();
          },
          _selectYear: function () {
            var e = this;
            t("." + this.opts.container)
              .find(".ucd-calebder-select-time .ucd-calebder-select-y")
              .tap(function () {
                e._YearMonthClass(e.opts.year, e.opts.month),
                  e._selectYearBox(!0),
                  e._calenderDateBox(!1),
                  e._selectMonthBox(!1),
                  setTimeout(function () {
                    var i = t("." + e.opts.container).find(
                      ".ucd-calebder-year-box >div[data-year =" +
                        e.opts.year +
                        "]"
                    )[0].offsetTop;
                    t(".ucd-calebder-year-box ")[0].scrollTop = i - 100;
                  }, 100);
              });
          },
          _selectMonth: function () {
            var e = this;
            t("." + this.opts.container)
              .find(".ucd-calebder-select-time .ucd-calebder-select-m")
              .tap(function () {
                e._YearMonthClass(e.opts.year, e.opts.month),
                  e._selectMonthBox(!0),
                  e._selectYearBox(!1),
                  e._calenderDateBox(!1);
              });
          },
          _YearMonthClass: function (e, i) {
            var n = t(".ucd-calebder-year-box > div[data-year =" + e + "]"),
              s = t(".ucd-calebder-month-box > div[data-month =" + i + "]");
            n.addClass("active").siblings().removeClass("active"),
              s.addClass("active").siblings().removeClass("active");
          },
          _GotoPrevMonth: function () {
            var e = this,
              i = t("." + this.opts.container).find(
                ".ucd-calebder-select-icon.prev"
              );
            i.tap(function () {
              i.hasClass("disable") ||
                (e.canClick &&
                  ((e.canClick = !1),
                  e._prevMonthFn(),
                  e._selectMonthBox(!1),
                  e._selectYearBox(!1),
                  e._calenderDateBox(!0),
                  setTimeout(function () {
                    e.canClick = !0;
                  }, 600)));
            });
          },
          _prevMonthFn: function () {
            (this.opts.month -= 1),
              0 == this.opts.month &&
                ((this.opts.month = 12), (this.opts.year -= 1)),
              this.updataUI(
                this.opts.year,
                this.opts.month,
                this.activeYMD.date,
                this.opts.optionalDate
              ),
              this._calenderAnimate("prev");
          },
          _GotoNextMonth: function () {
            var e = this,
              i = t("." + this.opts.container).find(
                ".ucd-calebder-select-icon.next"
              );
            i.tap(function () {
              i.hasClass("disable") ||
                (e.canClick &&
                  ((e.canClick = !1),
                  e._nextMonthFn(),
                  e._selectMonthBox(!1),
                  e._selectYearBox(!1),
                  e._calenderDateBox(!0),
                  setTimeout(function () {
                    e.canClick = !0;
                  }, 600)));
            });
          },
          _nextMonthFn: function () {
            (this.opts.month += 1),
              13 == this.opts.month &&
                ((this.opts.month = 1), (this.opts.year += 1)),
              this.updataUI(
                this.opts.year,
                this.opts.month,
                this.activeYMD.date,
                this.opts.optionalDate
              ),
              this._calenderAnimate("next");
          },
          _calenderAnimate: function (e) {
            var i,
              n = t("." + this.opts.container).find(".ucd-calebder-date"),
              s = n.width();
            n.css("transition", "0s"),
              "next" == e
                ? (i = "translateX(" + s + "px)")
                : "prev" == e && (i = "translateX(-" + s + "px)"),
              n.css("transform", i),
              setTimeout(function () {
                n.css("transition", "0.3s"),
                  n.css("transform", "translateX(0px)");
              }, 0);
          },
          _handleData: function (t, e, i, n, s, a) {
            e.html("");
            var o = this,
              r = a.date,
              l = a.month,
              c = a.year;
            t.map(function (t) {
              var i,
                a = Number(t.year),
                d = Number(t.month),
                u = Number(t.showDate),
                h =
                  String(a) +
                  String(d < 10 ? "0" + d : d) +
                  String(u < 10 ? "0" + u : u);
              c == t.year
                ? (d == l &&
                    (i =
                      (l < n && n < 13) ||
                      (t.showDate > r && t.month == l) ||
                      d > l
                        ? '<div data-times="' +
                          h +
                          '"  class="no-data after-today ">' +
                          t.showDate +
                          "</div>"
                        : '<div data-times="' +
                          h +
                          '"  class="no-data  ">' +
                          t.showDate +
                          "</div>"),
                  d == n
                    ? ((i =
                        t.showDate == r && d == l
                          ? '<div data-times="' +
                            h +
                            '"  class="no-data this-month today active  ">' +
                            t.showDate +
                            "</div>"
                          : (l < n && n < 13) ||
                            (t.showDate > r && t.month == l) ||
                            d > l
                          ? '<div data-times="' +
                            h +
                            '"  class="no-data after-today ">' +
                            t.showDate +
                            "</div>"
                          : '<div data-times="' +
                            h +
                            '"  class="no-data this-month "  >' +
                            t.showDate +
                            "</div>"),
                      (t.showDate == r && d == l) ||
                        n > l ||
                        (o.activeYMD.date &&
                          t.showDate == o.activeYMD.date &&
                          d == o.activeYMD.month &&
                          (i =
                            '<div data-times="' +
                            h +
                            '"  class="no-data active ">' +
                            t.showDate +
                            "</div>")))
                    : (i =
                        d > n
                          ? a == s
                            ? '<div data-times="' +
                              h +
                              '"  class="no-data not-this-month next-month " >' +
                              t.showDate +
                              "</div>"
                            : '<div data-times="' +
                              h +
                              '"  class="no-data not-this-month last-month " >' +
                              t.showDate +
                              "</div>"
                          : a == s
                          ? '<div data-times="' +
                            h +
                            '"  class="no-data not-this-month last-month " >' +
                            t.showDate +
                            "</div>"
                          : '<div data-times="' +
                            h +
                            '"  class="no-data not-this-month next-month " >' +
                            t.showDate +
                            "</div>"))
                : c > t.year
                ? (d == l &&
                    (i =
                      ((l < n && n < 13) || (t.showDate > r && t.month),
                      '<div data-times="' +
                        h +
                        '"  class="no-data">' +
                        t.showDate +
                        "</div>")),
                  d == n
                    ? ((i =
                        (l < n && n < 13) ||
                        (t.showDate > r && t.month == l) ||
                        d > l
                          ? '<div data-times="' +
                            h +
                            '"  class="no-data">' +
                            t.showDate +
                            "</div>"
                          : '<div data-times="' +
                            h +
                            '"  class="no-data this-month "  >' +
                            t.showDate +
                            "</div>"),
                      o.activeYMD.date &&
                        t.showDate == o.activeYMD.date &&
                        d == o.activeYMD.month &&
                        (i =
                          '<div data-times="' +
                          h +
                          '"  class="no-data active ">' +
                          t.showDate +
                          "</div>"))
                    : (i =
                        d > n
                          ? a < s
                            ? '<div data-times="' +
                              h +
                              '"  class="no-data not-this-month last-month  " >' +
                              t.showDate +
                              "</div>"
                            : '<div data-times="' +
                              h +
                              '"  class="no-data not-this-month next-month  " >' +
                              t.showDate +
                              "</div>"
                          : a > s
                          ? '<div data-times="' +
                            h +
                            '"  class="no-data not-this-month next-month " >' +
                            t.showDate +
                            "</div>"
                          : '<div data-times="' +
                            h +
                            '"  class="no-data not-this-month last-month " >' +
                            t.showDate +
                            "</div>"))
                : c < t.year &&
                  (d == l &&
                    (i =
                      (l < n && n < 13) ||
                      (t.showDate > r && t.month == l) ||
                      d > l
                        ? '<div data-times="' +
                          h +
                          '"  class="no-data after-today ">' +
                          t.showDate +
                          "</div>"
                        : '<div data-times="' +
                          h +
                          '"  class="no-data  after-today">' +
                          t.showDate +
                          "</div>"),
                  d == n
                    ? ((i =
                        t.showDate == r && d == l
                          ? '<div data-times="' +
                            h +
                            '"  class="no-data this-month today active  after-today ">' +
                            t.showDate +
                            "</div>"
                          : (l < n && n < 13) ||
                            (t.showDate > r && t.month == l) ||
                            d > l
                          ? '<div data-times="' +
                            h +
                            '"  class="no-data after-today ">' +
                            t.showDate +
                            "</div>"
                          : '<div data-times="' +
                            h +
                            '"  class="no-data this-month after-today"  >' +
                            t.showDate +
                            "</div>"),
                      (t.showDate == r && d == l) ||
                        n > l ||
                        (o.activeYMD.date &&
                          t.showDate == o.activeYMD.date &&
                          d == o.activeYMD.month &&
                          (i =
                            '<div data-times="' +
                            h +
                            '"  class="no-data active after-today">' +
                            t.showDate +
                            "</div>")))
                    : (i =
                        d > n
                          ? a == s
                            ? '<div data-times="' +
                              h +
                              '"  class="no-data not-this-month after-today next-month " >' +
                              t.showDate +
                              "</div>"
                            : '<div data-times="' +
                              h +
                              '"  class="no-data not-this-month last-month  " >' +
                              t.showDate +
                              "</div>"
                          : a == s
                          ? '<div data-times="' +
                            h +
                            '"  class="no-data not-this-month after-today last-month " >' +
                            t.showDate +
                            "</div>"
                          : '<div data-times="' +
                            h +
                            '"  class="no-data not-this-month after-today next-month " >' +
                            t.showDate +
                            "</div>")),
                e.append(i);
            });
          },
          isSelected: function () {
            var e = !1;
            return (
              t("." + this.opts.container)
                .find(".ucd-calebder-date-box.original-dom >div")
                .each(function () {
                  t(this).hasClass("active") &&
                    !t(this).hasClass("no-data") &&
                    (e = !0);
                }),
              e
            );
          },
          updataUI: function (e, i, n, s) {
            var a = this,
              o = e || a.opts.year,
              r = i || a.opts.month,
              l = n || a.opts.date,
              c = this._getMonthDate(o, r).days,
              d = this._getMonthDate(o, r - 1).days,
              u = this._getMonthDate(o, r + 1).days,
              h = t("." + this.opts.container).find(
                ".ucd-calebder-date-box.original-dom"
              ),
              p = t("." + this.opts.container).find(
                ".ucd-calebder-date-box.clone-dom-first"
              ),
              f = t("." + this.opts.container).find(
                ".ucd-calebder-date-box.clone-dom-second"
              );
            this._handleData(c, h, l, r, o, this.defultOptions),
              this._handleData(d, p, l, r - 1, o, this.defultOptions),
              this._handleData(u, f, l, r + 1, o, this.defultOptions),
              this._setCalebderTime(o, r);
            var m = t("." + this.opts.container).find(
                ".ucd-calebder-date-box.original-dom > div"
              ),
              v = t("." + this.opts.container).find(".ucd-calebder-date"),
              g = t("." + this.opts.container).find(
                ".ucd-calebder-date-box.original-dom > .last-month"
              ).length,
              b = t("." + this.opts.container).find(
                ".ucd-calebder-date-box.original-dom > .next-month"
              ).length;
            setTimeout(function () {
              b >= 7 && g >= 7
                ? v.css({
                    "min-height": "4.51rem",
                    transform: "translateY(-1.04rem)",
                  })
                : b >= 7 && g < 7
                ? v.css({
                    "min-height": "5.55rem",
                    transform: "translateY(0rem)",
                  })
                : g >= 7 && b < 7
                ? v.css({
                    "min-height": "5.55rem",
                    transform: "translateY(-1.04rem)",
                  })
                : v.css({
                    "min-height": "6.6rem",
                    transform: "translateY(0rem)",
                  });
            }, 25),
              m.tap(function () {
                if (t(this).hasClass("no-data")) return !1;
                var e = c[t(this).index()];
                t(this).addClass("active").siblings().removeClass("active"),
                  a.isSelected() &&
                    t("." + a.opts.container)
                      .find(".btn-ok")
                      .removeClass("disable"),
                  (a.activeYMD.year = e.year),
                  (a.activeYMD.date = e.showDate),
                  (a.activeYMD.month = e.month);
              }),
              t(".ucd-calebder-date-box >div").each(function (e) {
                var i = t(this);
                s.map(function (t) {
                  i[0].dataset.times == t && i.removeClass("no-data");
                });
              });
          },
        }),
        e.util.register(n)
      );
    }),
    (function (t, e) {


      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./UCD.js")))
        : (t.UCD.ColorPicker = e(t.jQuery, t.UCD));
    })(this, function (t, e) {

      function i(i) {
        (this.opts = t.extend(
          {},
          {
            container: "#app",
            d: 255,
            label: "",
            showTip: !1,
            dots: [],
            onDragStart: t.noop,
            onDragEnd: t.noop,
          },
          i
        )),
          (this.$element = t(this.opts.container)),
          this._create(),
          e.util.init(this);
      }
      return (
        (i.prototype = {
          constructor: i,
          _create: function () {
            var t = this.opts,
              i = this.$element,
              n =
                ((this.colors = new e.Colors()),
                e.util.template(
                  '<div class="ucd-colorpicker-wrapper">  <canvas class="ucd-colorpicker-canvas"></canvas>  <div class="ucd-colorpicker-handle"></div></div><% if(showTip) { %> <p class="ucd-colorpicker-tips"><%= label %></p> <% } %><% if(dots.length) { %><ul class="ucd-colorpicker-dots clearfix">  <% for(var i = 0, len = dots ? dots.length : 0; i < len; i++) { %>    <li>      <div class="ucd-colorpicker-dot">        <% if(dots[i].color) { %> <span class="dot" style="background:rgb(<%= dots[i].color %>)"></span> <% } %>        <% if(!dots[i].color) { %> <span class="dot dot-add"></span> <% } %>      </div>    </li>  <% } %></ul><% } %>'
                )(t));
            i.addClass("ucd-colorpicker").html(n),
              i.on(
                e.Events.DOWN,
                ".ucd-colorpicker-wrapper",
                this._bindDrag.bind(this)
              ),
              i.on(
                e.Events.DOWN,
                ".ucd-colorpicker-dot",
                this._bindDotDrag.bind(this)
              ),
              this._render();
          },
          _render: function () {
            var t = (this.$canvas = this.$element.find("canvas")),
              e = t[0].getContext("2d"),
              i = this.opts.d;

              console.log(t,e,i);
              console.log(this);
            t.attr({ width: 6 * i, height: 6 * i }),
              (function (t, e, i, n, s) {
                var a = e[0] || e,
                  o = e[1] || e,
                  r = i[0] || i,
                  l = i[1] || i,
                  c = 360,
                  d = Math.PI / 180;
                for (
                  t.save(),
                    t.translate(a - r, o - l),
                    t.scale(r, l),
                    n = c / n || 360;
                  c > 0;
                  c -= n
                )
                  t.beginPath(),
                    360 !== n && t.moveTo(1, 1),
                    t.arc(1, 1, 1, (c - n / 2 - 1) * d, (c + n / 2 + 1) * d),
                    s ? s(t, c) : ((t.fillStyle = "black"), t.fill());
                t.restore();
              })(e, [3 * i, 3 * i], [3 * i - 1, 3 * i - 1], 360, function (t, e) {
                var i = t.createRadialGradient(1, 1, 1, 1, 1, 0);
                i.addColorStop(0, "hsl(" + (360 - e) + ", 100%, 50%)"),
                  i.addColorStop(1, "#FFFFFF"),
                  (t.fillStyle = i),
                  t.fill();
              });
          },
          _trigger: function (e, i, n) {
            var s,
              a,
              o = this.opts[e];
            if (
              ((n = void 0 === n ? {} : n),
              ((i = t.Event(i)).type = e.toLowerCase()),
              (i.target = this.$element[0]),
              (a = i.originalEvent))
            )
              for (s in a) s in i || (i[s] = a[s]);
            return (
              this.$element.trigger(i, n),
              !(
                (t.isFunction(o) &&
                  !1 === o.apply(this.$element[0], [i].concat(n))) ||
                i.isDefaultPrevented()
              )
            );
          },
          _bindDotDrag: function (t) {
            var i = this,
              n = this.document,
              s = ".ucd.colorpickerdot",
              a = e.Events.getEvent(t),
              o = a.pageX,
              r = a.pageY,
              l = o,
              c = r;
            i._onDotStart(t),
              n
                .on(e.Events.MOVE + s, function (t) {
                  var n = e.Events.getEvent(t);
                  (l = n.pageX), (c = n.pageY), i._onDotDragging(t, l - o, c - r);
                })
                .on(e.Events.UP + s, function (t) {
                  n.off(e.Events.MOVE + s + " " + e.Events.UP + s),
                    i._onDotEnd(t);
                });
          },
          _onDotStart: function (e) {
            e.preventDefault(), e.stopPropagation();
            var i = t(e.target),
              n = 0,
              s = this,
              a = (this.timerId = setInterval(function () {
                if (++n >= 6)
                  return (
                    s.element.addClass("ucd-long-press"),
                    i.addClass("dot-add").attr("style", ""),
                    void clearTimeout(a)
                  );
              }, 100));
            this._trigger("onDragStart", e);
          },
          _onDotDragging: function (t, e, i) {
            t.preventDefault(),
              t.stopPropagation(),
              (Math.abs(e) > 5 || Math.abs(i) > 5) && clearTimeout(this.timerId);
          },
          _onDotEnd: function (e) {
            if (
              (e.preventDefault(),
              e.stopPropagation(),
              clearTimeout(this.timerId),
              this.$element.hasClass("ucd-long-press"))
            )
              this.$element.removeClass("ucd-long-press");
            else {
              var i =
                  0 == e.target.className.indexOf("dot")
                    ? t(e.target)
                    : t(e.target.children[0]),
                n = i.css("backgroundColor"),
                s = 0,
                a = {};
              i.hasClass("dot-add")
                ? ((s = i.closest("li").index()),
                  (a = this.colors.getColor("rgb")),
                  i
                    .css(
                      "backgroundColor",
                      this.colors.toString("rgb", !1).replace(/, /g, ",")
                    )
                    .removeClass("dot-add"),
                  (this.opts.dots[s] = { color: [a.r, a.g, a.b].join(" ,") }))
                : (this.setColor(n), this._trigger("change", null, this._color)),
                this._trigger("onDragEnd", e);
            }
          },
          _bindDrag: function (i) {
            var n = this,
              s = t(document),
              a = ".ucd.colorpicker",
              o = this._getHandle(),
              r = e.Events.getEvent(i),
              l = r.pageX,
              c = r.pageY;
            n._onDragStart(o, i),
              s
                .on(e.Events.MOVE + a, function (t) {
                  var i = e.Events.getEvent(t);
                  (l = i.pageX), (c = i.pageY), n._onDragging(o, t, l, c);
                })
                .on(e.Events.UP + a, function (t) {
                  s.off(e.Events.MOVE + a + " " + e.Events.UP + a),
                    n._onDragEnd(o, t, l, c);
                });
          },
          _onDragStart: function (t, e) {
            e.preventDefault(),
              e.stopPropagation(),
              this.$element.addClass("ucd-colorpicker-drag"),
              (this.canvasOffset = this.$canvas.offset()),
              this._trigger("onDragStart", e);
          },
          _onDragging: function (t, e, i, n) {
            e.preventDefault(), e.stopPropagation(), this._onMove(t, i, n);
          },
          _onDragEnd: function (t, e, i, n) {
            e.preventDefault(),
              e.stopPropagation(),
              this._onMove(t, i, n),
              this.$element.removeClass("ucd-colorpicker-drag"),
              this._trigger("change", null, this._color),
              this._trigger("onDragEnd", e);
          },
          _onMove: function (t, e, i) {
              console.log(this);
            var n,
              s = this.canvasOffset.left,
              a = this.canvasOffset.top,
              o = this.colors,
              r = this.opts.d / 2;
            (n = (function (t, e, i, n) {
              var s, a;
              return (
                (s =
                  360 - ((180 * Math.atan2(i, e)) / Math.PI + (i < 0 ? 360 : 0))),
                (a = (Math.sqrt(e * e + i * i) / n) * 100),
                t.setColor({ h: s, s: a, v: 100 }, "hsv"),
                t.getColor("rgb")
              );
            })(o, e - s - r, i - a - r, r)),
              this._update(t, n, !0);
          },
          _updateUI: function (t, e) {
            var i = e,
              n = t.getColor(),
              s = 2 * Math.PI,
              a = this.opts.d,
              o = Math.cos(s - n.hsv.h * s),
              r = Math.sin(s - n.hsv.h * s),
              l = n.hsv.s * (a / 2),
              c = o * l + a / 2,
              d = r * l + a / 2;
            i.css({
              left: c,
              top: d,
              backgroundColor: t.toString("rgb", !1).replace(/, /g, ","),
            });
          },
          _update: function (t, e, i) {
            return (
              (!i || !1 !== this._trigger("change", null, e)) &&
              e !== this._color &&
              ((this._color = { r: e.r, g: e.g, b: e.b }),
              this._updateUI(this.colors, t),
              void (i && this._trigger("change", null, this._color)))
            );
          },
          _getHandle: function () {
            return this.$handle && this.$handle.length
              ? this.$handle
              : this.$element.find(".ucd-colorpicker-handle");
          },
          setColor: function (t, e) {
            this.colors.setColor(t, e),
              (t = this.colors.getColor("rgb")),
              this._update(this._getHandle(), t);
          },
          getColor: function () {
            return this._color;
          },
          getDots: function () {
            return this.opts.dots;
          },
        }),
        i
      );


  }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./UCD.js")))
        : (t.UCD.CircleSlider = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      var i = [
          '<div class="ucd-circle-outer"></div>',
          '<div class="ucd-circle-inner"><span class="tips"></span></div>',
          '<div class="thumb ucd-dragable"></div>',
        ].join(""),
        n = "requestAnimationFrame" in window,
        s = function (t) {
          return -(t >= 180 ? (t - 360) % 360 : t % 360);
        },
        a = function (t) {
          return t < 0 ? 360 + (t % -360) : t % 360;
        },
        o = function (t) {
          return {
            x: e.Events.isPad ? t.targetTouches[0].pageX : t.pageX || t.clientX,
            y: e.Events.isPad ? t.targetTouches[0].pageY : t.pageY || t.clientY,
          };
        };
      function r(i) {
        (this.opts = t.extend(
          {},
          {
            container: "#app",
            halfCircle: !0,
            start: -180,
            min: 0,
            max: 360,
            step: 1,
            create: t.noop,
            beforeTouch: t.noop,
            onTouch: t.noop,
            afterTouch: t.noop,
          },
          i
        )),
          (this.$element = t(this.opts.container)),
          this._create(),
          e.util.init(this);
      }
      return (
        (r.prototype = {
          constructor: r,
          _create: function () {
            this.$element
              .addClass("ucd-circle-slider ucd-dragable")
              .empty()
              .append(i);
            var t = this.$element,
              e = (this.$thumb = t.find(".thumb").hide()),
              n =
                ((this.$tips = t.find(".tips")),
                (this.$circleInner = t.find(".ucd-circle-inner"))),
              s = (this.elementSize = {
                width: t.outerWidth(!0),
                height: t.outerHeight(!0),
              }),
              a =
                ((this.thumbSize = {
                  width: e.outerWidth(!0),
                  height: e.outerHeight(!0),
                }),
                (this.circleInnerSize = {
                  width: n.width(),
                  height: n.height(),
                }));
            return (
              (this.defaultRange = [this.opts.min, this.opts.max]),
              (this.stepMoveTimer = null),
              (this.radius = s.width / 2 - (s.width / 2 - a.width / 2) / 2),
              (this.angleCurrent = 0),
              (this.valueCurrent = 0),
              (this.rate =
                (this.opts.max - this.opts.min) /
                (this.opts.halfCircle ? 180 : 360)),
              this._initEvents(),
              this
            );
          },
          _initEvents: function () {
            this.$element.on(e.Events.DOWN, this._startDrag.bind(this));
          },
          _startDrag: function (i) {
            i.preventDefault();
            var s = ".ucd.circleslider",
              a = this,
              o = t(document);
            -1 !== i.target.className.indexOf("ucd-dragable") &&
              ((this.dragging = !0),
              this.opts.beforeTouch && this.opts.beforeTouch(),
              o
                .on(e.Events.MOVE + s, this._drag.bind(this))
                .on(e.Events.UP + s, function (t) {
                  o.off(e.Events.MOVE + s + " " + e.Events.UP + s), a._endDrag(t);
                }),
              this._drag(i),
              n && this._dragAnimationLoop());
          },
          _drag: function (t) {
            var e = this.$element.offset(),
              i = e.left + this.elementSize.width / 2,
              s = e.top + this.elementSize.height / 2,
              r = { left: o(t).x - i, top: s - o(t).y };
            return (
              (this.angleCurrent = a(
                (180 * -Math.atan2(r.top, r.left)) / Math.PI - this.opts.start
              )),
              (this.valueCurrent = this._toValue(this.angleCurrent)),
              n || this._setCSS(this.angleCurrent),
              this.opts.onTouch &&
                this.opts.onTouch.call(null, this.valueCurrent),
              !1
            );
          },
          _endDrag: function (t) {
            t.preventDefault(),
              (this.dragging = !1),
              this.move(this.angleCurrent),
              this.opts.afterTouch &&
                this.opts.afterTouch.call(null, this.valueCurrent);
          },
          _toColor: function (t, e, i) {
            var n = (t - e) / (i - e),
              s = 137 + 112 * n,
              a = 18 + 235 * n;
            return (
              "rgb(" +
              Math.round(255) +
              "," +
              Math.round(s) +
              "," +
              Math.round(a) +
              ")"
            );
          },
          _setCSS: function (t) {
            var e,
              i = ((e = t + this.opts.start), s(e) * (Math.PI / 180));
            this.$thumb
              .css({
                top:
                  -Math.sin(i) * this.radius +
                  (this.elementSize.height / 2 - this.thumbSize.height / 2),
                left:
                  Math.cos(i) * this.radius +
                  (this.elementSize.width / 2 - this.thumbSize.width / 2),
                backgroundColor: this._toColor(
                  this.valueCurrent,
                  this.opts.min,
                  this.opts.max
                ),
              })
              .show(),
              this.opts.callback &&
                this.opts.callback.call(null, this.valueCurrent, this.$tips);
          },
          _dragAnimationLoop: function () {
            this.dragging &&
              (this._setCSS(this.angleCurrent),
              requestAnimationFrame(this._dragAnimationLoop.bind(this)));
          },
          _toValue: function (t) {
            var e = this.opts,
              i = e.min;
            t %= 360;
            return (
              e.halfCircle && t > 180 && (t = 360 - t),
              this._checkValue(this.rate * t + i)
            );
          },
          _stepMove: function (t, e, i) {
            var s = t,
              o = this;
            Math.abs(t) >= Math.abs(e)
              ? (s = -e)
              : n
              ? requestAnimationFrame(function () {
                  o._stepMove(s, e + t);
                })
              : (this.stepMoveTimer = setTimeout(function () {
                  o._stepMove(s, e + t, 0.9 * i);
                }, i)),
              (this.angleCurrent = a(this.angleCurrent - s)),
              (this.valueCurrent = this._toValue(this.angleCurrent)),
              this._setCSS(this.angleCurrent);
          },
          _checkValue: function (t) {
            return (
              t % this.opts.step != 0 &&
                (t = Math.round(t / this.opts.step) * this.opts.step),
              Number(
                t > this.opts.max
                  ? this.opts.max
                  : t < this.opts.min
                  ? this.opts.min
                  : t
              )
            );
          },
          move: function (t, e) {
            var i,
              n,
              s,
              a,
              o =
                ((i = t),
                (n = this.angleCurrent),
                (i %= 360) > (n %= 360)
                  ? (a = (s = i - n) - 360)
                  : (s = 360 + (a = i - n)),
                s < Math.abs(a) ? s : a),
              r = e ? Math.abs(o) : 2,
              l = o > 0 ? -r : r;
            this._stepMove(l, o, 50);
          },
          setValue: function (t) {
            this.dragging ||
              t == this.valueCurrent ||
              ((t = this._checkValue(t)),
              this.move((t - this.opts.min) / this.rate, !0));
          },
          getValue: function () {
            return this.valueCurrent;
          },
          setEnable: function (t) {
            console.log(t);
            var i = this.getValue();
            (t =
              !1 === t
                ? this.defaultRange
                : e.util.checkRangeByStep(t, this.defaultRange, this.opts.step)),
              (this.opts.min = t[0]),
              (this.opts.max = t[1]),
              (this.rate =
                (this.opts.max - this.opts.min) /
                (this.opts.halfCircle ? 180 : 360)),
              (this.valueCurrent = null),
              this.setValue(i);
          },
          getRange: function () {
            return [this.opts.min, this.opts.max];
          },
        }),
        r
      );
    }),
    (function (t, e) {
      "object" == typeof exports
        ? (module.exports = e(require("jquery"), require("./core.js")))
        : (t.UCD.DialogRadio = e(t.jQuery, t.UCD));
    })(this, function (t, e) {
      function i(i) {
        (this.opts = t.extend(
          {},
          {
            dialogClassName: null,
            label: "标题",
            radioItems: ["选项1", "选项2", "选项3"],
            buttons: [{ className: "btn-ok", label: "确定", handler: t.noop }],
            callback: null,
            maskclick: null,
          },
          i
        )),
          (this.element = null),
          this._create(),
          e.util.init(this);
      }
      return (
        (i.prototype = {
          constructor: i,
          _create: function () {
            var i = this.opts,
              n =
                '<div class="ucd-dialog-radio">  <div class="ucd-mask"></div>  <div class="ucd-container">       <div class="ucd-dialog-radio-content">           <p class="ucd-dialog-title">' +
                i.label +
                '</p>           <ul class="ucd-radio-list"></ul>       </div>       <div class="ucd-dialog-footer"></div>  </div></div>';
            t("ucd-dialog-radio");
            (this.element = $el = t(n)),
              i.dialogClassName && $el.addClass(i.dialogClassName);
            var s = $el.find(".ucd-radio-list");
            i.radioItems &&
              i.radioItems.length &&
              i.radioItems.forEach(function (e, i) {
                var n =
                  '<li class="ucd-radio-item">           <div class="text">{{text-content}}</div>           <div class="icon"></div>           </li>';
                s.append(t(n.replace("{{text-content}}", e)));
              }),
              $el.find(".ucd-radio-list>li:first-child").addClass("active");
            var a = $el.find(".ucd-container .ucd-dialog-footer");
            i.buttons &&
              i.buttons.length &&
              (i.buttons.length <= 1
                ? t.each(i.buttons, function (t, e) {
                    a.append(
                      '<span class="ucd-dialog-btn dialog-single-btn ' +
                        e.className +
                        '">' +
                        e.label +
                        "</span>"
                    ),
                      a.find("." + e.className).tap(e.handler);
                  })
                : t.each(i.buttons, function (t, e) {
                    a.append(
                      '<span class="ucd-dialog-btn ' +
                        e.className +
                        '">' +
                        e.label +
                        "</span>"
                    ),
                      a.find("." + e.className).tap(e.handler);
                  })),
              i.maskclick &&
                "function" == typeof i.maskclick &&
                $el.find(".ucd-mask").tap(i.maskclick),
              $el.appendTo("body"),
              $el.find(".ucd-mask").on(e.Events.MOVE, function (t) {
                window.Bounce &&
                  window.Bounce.lampBounceObj &&
                  window.Bounce.lampBounceObj.off();
              }),
              this.clickEvent();
          },
          show: function () {
            this.element.show();
          },
          hide: function () {
            this.element.hide();
          },
          clickEvent: function () {
            var e = this.opts;
            this.element.find(".ucd-radio-item").tap(function (i) {
              var n,
                s = t(i.target);
              (n = s.hasClass("ucd-radio-item") ? s : s.parent()) &&
                n.addClass("active").siblings().removeClass("active"),
                e.callback && "function" == typeof e.callback && e.callback();
            }),
              this.element.find(".ucd-mask").tap(function () {
                e.maskclick && "function" == typeof e.maskclick && e.maskclick();
              });
          },
          setActive: function (t) {
            var e = this.element.find(".ucd-radio-list>li").length;
            "number" == typeof t &&
              t < e &&
              t >= 0 &&
              this.element
                .find(".ucd-radio-list>li")
                .eq(t)
                .addClass("active")
                .siblings()
                .removeClass("active");
          },
          getValue: function () {
            var t = this.element.find(".ucd-radio-list>li.active");
            if (t)
              return t
                .find(".text")
                .html()
                .replace(/^\s+|\s+$/, "");
          },
          setRadio(e, i) {
            if (
              (Array.isArray(e) && (this.opts.radioItems = e),
              (i =
                i &&
                "number" == typeof i &&
                i >= 0 &&
                i < this.opts.radioItems.length
                  ? i
                  : 0),
              Array.isArray(e))
            ) {
              var n = $el.find(".ucd-radio-list");
              n.html("");
              e &&
                e.length &&
                e.forEach(function (e, i) {
                  var s =
                    '<li class="ucd-radio-item">           <div class="text">{{text-content}}</div>           <div class="icon"></div>           </li>';
                  n.append(t(s.replace("{{text-content}}", e)));
                }),
                $el
                  .find(".ucd-radio-list>li")
                  .eq(i)
                  .addClass("active")
                  .siblings()
                  .removeClass("active"),
                this.clickEvent();
            }
          },
        }),
        e.util.register(i)
      );
    });
