(function () {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var p = n[i] = {exports: {}};
                e[i][0].call(p.exports, function (r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }

        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o
    }

    return r
})()({
    1: [function (require, module, exports) {
        !function () {
            var t = Array.prototype.forEach, e = Object.prototype.hasOwnProperty, n = Array.prototype.slice, i = 0;
            var r, s = {
                keys: Object.keys || function (t) {
                    if ("object" != typeof t && "function" != typeof t || null === t) throw new TypeError("keys() called on a non-object");
                    var e, n = [];
                    for (e in t) t.hasOwnProperty(e) && (n[n.length] = e);
                    return n
                }, uniqueId: function (t) {
                    var e = ++i + "";
                    return t ? t + e : e
                }, has: function (t, n) {
                    return e.call(t, n)
                }, each: function (e, n, i) {
                    if (null != e) if (t && e.forEach === t) e.forEach(n, i); else if (e.length === +e.length) for (var r = 0, s = e.length; r < s; r++) n.call(i, e[r], r, e); else for (var o in e) this.has(e, o) && n.call(i, e[o], o, e)
                }, once: function (t) {
                    var e, n = !1;
                    return function () {
                        return n ? e : (n = !0, e = t.apply(this, arguments), t = null, e)
                    }
                }
            };
            r = {
                on: function (t, e, n) {
                    return c(this, "on", t, [e, n]) && e ? (this._events || (this._events = {}), (this._events[t] || (this._events[t] = [])).push({callback: e, context: n, ctx: n || this}), this) : this
                }, once: function (t, e, n) {
                    if (!c(this, "once", t, [e, n]) || !e) return this;
                    var i = this, r = s.once(function () {
                        i.off(t, r), e.apply(this, arguments)
                    });
                    return r._callback = e, this.on(t, r, n)
                }, off: function (t, e, n) {
                    var i, r, o, l, f, a, h, u;
                    if (!this._events || !c(this, "off", t, [e, n])) return this;
                    if (!t && !e && !n) return this._events = {}, this;
                    for (f = 0, a = (l = t ? [t] : s.keys(this._events)).length; f < a; f++) if (t = l[f], o = this._events[t]) {
                        if (this._events[t] = i = [], e || n) for (h = 0, u = o.length; h < u; h++) r = o[h], (e && e !== r.callback && e !== r.callback._callback || n && n !== r.context) && i.push(r);
                        i.length || delete this._events[t]
                    }
                    return this
                }, trigger: function (t) {
                    if (!this._events) return this;
                    var e = n.call(arguments, 1);
                    if (!c(this, "trigger", t, e)) return this;
                    var i = this._events[t], r = this._events.all;
                    return i && l(i, e), r && l(r, arguments), this
                }, stopListening: function (t, e, n) {
                    var i = this._listeners;
                    if (!i) return this;
                    var r = !e && !n;
                    for (var s in "object" == typeof e && (n = this), t && ((i = {})[t._listenerId] = t), i) i[s].off(e, n, this), r && delete this._listeners[s];
                    return this
                }
            };
            var o = /\s+/, c = function (t, e, n, i) {
                if (!n) return !0;
                if ("object" == typeof n) {
                    for (var r in n) t[e].apply(t, [r, n[r]].concat(i));
                    return !1
                }
                if (o.test(n)) {
                    for (var s = n.split(o), c = 0, l = s.length; c < l; c++) t[e].apply(t, [s[c]].concat(i));
                    return !1
                }
                return !0
            }, l = function (t, e) {
                var n, i = -1, r = t.length, s = e[0], o = e[1], c = e[2];
                switch (e.length) {
                    case 0:
                        for (; ++i < r;) (n = t[i]).callback.call(n.ctx);
                        return;
                    case 1:
                        for (; ++i < r;) (n = t[i]).callback.call(n.ctx, s);
                        return;
                    case 2:
                        for (; ++i < r;) (n = t[i]).callback.call(n.ctx, s, o);
                        return;
                    case 3:
                        for (; ++i < r;) (n = t[i]).callback.call(n.ctx, s, o, c);
                        return;
                    default:
                        for (; ++i < r;) (n = t[i]).callback.apply(n.ctx, e)
                }
            };
            s.each({listenTo: "on", listenToOnce: "once"}, function (t, e) {
                r[e] = function (e, n, i) {
                    return (this._listeners || (this._listeners = {}))[e._listenerId || (e._listenerId = s.uniqueId("l"))] = e, "object" == typeof n && (i = this), e[t](n, i, this), this
                }
            }), r.bind = r.on, r.unbind = r.off, r.mixin = function (t) {
                return s.each(["on", "once", "off", "trigger", "stopListening", "listenTo", "listenToOnce", "bind", "unbind"], function (e) {
                    t[e] = this[e]
                }, this), t
            }, "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = r), exports.BackboneEvents = r) : "function" == typeof define && "object" == typeof define.amd ? define(function () {
                return r
            }) : this.BackboneEvents = r
        }();

    }, {}],
    2: [function (require, module, exports) {
        module.exports = require("./backbone-events-standalone");

    }, {"./backbone-events-standalone": 1}],
    3: [function (require, module, exports) {
        (function (global) {
            "use strict";
            var scheduleDrain, draining, Mutation = global.MutationObserver || global.WebKitMutationObserver;
            if (Mutation) {
                var called = 0, observer = new Mutation(nextTick), element = global.document.createTextNode("");
                observer.observe(element, {characterData: !0}), scheduleDrain = function () {
                    element.data = called = ++called % 2
                }
            } else if (global.setImmediate || void 0 === global.MessageChannel) scheduleDrain = "document" in global && "onreadystatechange" in global.document.createElement("script") ? function () {
                var e = global.document.createElement("script");
                e.onreadystatechange = function () {
                    nextTick(), e.onreadystatechange = null, e.parentNode.removeChild(e), e = null
                }, global.document.documentElement.appendChild(e)
            } : function () {
                setTimeout(nextTick, 0)
            }; else {
                var channel = new global.MessageChannel;
                channel.port1.onmessage = nextTick, scheduleDrain = function () {
                    channel.port2.postMessage(0)
                }
            }
            var queue = [];

            function nextTick() {
                var e, n;
                draining = !0;
                for (var a = queue.length; a;) {
                    for (n = queue, queue = [], e = -1; ++e < a;) n[e]();
                    a = queue.length
                }
                draining = !1
            }

            function immediate(e) {
                1 !== queue.push(e) || draining || scheduleDrain()
            }

            module.exports = immediate;

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    4: [function (require, module, exports) {
        "function" == typeof Object.create ? module.exports = function (t, e) {
            t.super_ = e, t.prototype = Object.create(e.prototype, {constructor: {value: t, enumerable: !1, writable: !0, configurable: !0}})
        } : module.exports = function (t, e) {
            t.super_ = e;
            var o = function () {
            };
            o.prototype = e.prototype, t.prototype = new o, t.prototype.constructor = t
        };

    }, {}],
    5: [function (require, module, exports) {
        (function (global) {
            (function () {
                var t = "function" == typeof define && define.amd, e = {function: !0, object: !0}, r = e[typeof exports] && exports && !exports.nodeType && exports, n = e[typeof window] && window || this, o = r && e[typeof module] && module && !module.nodeType && "object" == typeof global && global;

                function c(t, r) {
                    t || (t = n.Object()), r || (r = n.Object());
                    var o = t.Number || n.Number, i = t.String || n.String, a = t.Object || n.Object, l = t.Date || n.Date, f = t.SyntaxError || n.SyntaxError, u = t.TypeError || n.TypeError, s = t.Math || n.Math, h = t.JSON || n.JSON;
                    "object" == typeof h && h && (r.stringify = h.stringify, r.parse = h.parse);
                    var p, g, y, b = a.prototype, j = b.toString, d = new l(-0xc782b5b800cec);
                    try {
                        d = -109252 == d.getUTCFullYear() && 0 === d.getUTCMonth() && 1 === d.getUTCDate() && 10 == d.getUTCHours() && 37 == d.getUTCMinutes() && 6 == d.getUTCSeconds() && 708 == d.getUTCMilliseconds()
                    } catch (t) {
                    }

                    function v(t) {
                        if (v[t] !== y) return v[t];
                        var e;
                        if ("bug-string-char-index" == t) e = "a" != "a"[0]; else if ("json" == t) e = v("json-stringify") && v("json-parse"); else {
                            var n, c = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                            if ("json-stringify" == t) {
                                var a = r.stringify, f = "function" == typeof a && d;
                                if (f) {
                                    (n = function () {
                                        return 1
                                    }).toJSON = n;
                                    try {
                                        f = "0" === a(0) && "0" === a(new o) && '""' == a(new i) && a(j) === y && a(y) === y && a() === y && "1" === a(n) && "[1]" == a([n]) && "[null]" == a([y]) && "null" == a(null) && "[null,null,null]" == a([y, j, null]) && a({a: [n, !0, !1, null, "\0\b\n\f\r\t"]}) == c && "1" === a(null, n) && "[\n 1,\n 2\n]" == a([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == a(new l(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == a(new l(864e13)) && '"-000001-01-01T00:00:00.000Z"' == a(new l(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == a(new l(-1))
                                    } catch (t) {
                                        f = !1
                                    }
                                }
                                e = f
                            }
                            if ("json-parse" == t) {
                                var u = r.parse;
                                if ("function" == typeof u) try {
                                    if (0 === u("0") && !u(!1)) {
                                        var s = 5 == (n = u(c)).a.length && 1 === n.a[0];
                                        if (s) {
                                            try {
                                                s = !u('"\t"')
                                            } catch (t) {
                                            }
                                            if (s) try {
                                                s = 1 !== u("01")
                                            } catch (t) {
                                            }
                                            if (s) try {
                                                s = 1 !== u("1.")
                                            } catch (t) {
                                            }
                                        }
                                    }
                                } catch (t) {
                                    s = !1
                                }
                                e = s
                            }
                        }
                        return v[t] = !!e
                    }

                    if (!v("json")) {
                        var C = v("bug-string-char-index");
                        if (!d) var S = s.floor, O = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], A = function (t, e) {
                            return O[e] + 365 * (t - 1970) + S((t - 1969 + (e = +(e > 1))) / 4) - S((t - 1901 + e) / 100) + S((t - 1601 + e) / 400)
                        };
                        if ((p = b.hasOwnProperty) || (p = function (t) {
                            var e, r = {};
                            return (r.__proto__ = null, r.__proto__ = {toString: 1}, r).toString != j ? p = function (t) {
                                var e = this.__proto__, r = t in (this.__proto__ = null, this);
                                return this.__proto__ = e, r
                            } : (e = r.constructor, p = function (t) {
                                var r = (this.constructor || e).prototype;
                                return t in this && !(t in r && this[t] === r[t])
                            }), r = null, p.call(this, t)
                        }), g = function (t, r) {
                            var n, o, c, i = 0;
                            for (c in (n = function () {
                                this.valueOf = 0
                            }).prototype.valueOf = 0, o = new n) p.call(o, c) && i++;
                            return n = o = null, i ? g = 2 == i ? function (t, e) {
                                var r, n = {}, o = "[object Function]" == j.call(t);
                                for (r in t) o && "prototype" == r || p.call(n, r) || !(n[r] = 1) || !p.call(t, r) || e(r)
                            } : function (t, e) {
                                var r, n, o = "[object Function]" == j.call(t);
                                for (r in t) o && "prototype" == r || !p.call(t, r) || (n = "constructor" === r) || e(r);
                                (n || p.call(t, r = "constructor")) && e(r)
                            } : (o = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], g = function (t, r) {
                                var n, c, i = "[object Function]" == j.call(t), a = !i && "function" != typeof t.constructor && e[typeof t.hasOwnProperty] && t.hasOwnProperty || p;
                                for (n in t) i && "prototype" == n || !a.call(t, n) || r(n);
                                for (c = o.length; n = o[--c]; a.call(t, n) && r(n)) ;
                            }), g(t, r)
                        }, !v("json-stringify")) {
                            var w = {92: "\\\\", 34: '\\"', 8: "\\b", 12: "\\f", 10: "\\n", 13: "\\r", 9: "\\t"}, T = function (t, e) {
                                return ("000000" + (e || 0)).slice(-t)
                            }, _ = function (t) {
                                for (var e = '"', r = 0, n = t.length, o = !C || n > 10, c = o && (C ? t.split("") : t); r < n; r++) {
                                    var i = t.charCodeAt(r);
                                    switch (i) {
                                        case 8:
                                        case 9:
                                        case 10:
                                        case 12:
                                        case 13:
                                        case 34:
                                        case 92:
                                            e += w[i];
                                            break;
                                        default:
                                            if (i < 32) {
                                                e += "\\u00" + T(2, i.toString(16));
                                                break
                                            }
                                            e += o ? c[r] : t.charAt(r)
                                    }
                                }
                                return e + '"'
                            }, N = function (t, e, r, n, o, c, i) {
                                var a, l, f, s, h, b, d, v, C, O, w, U, J, m, x, M;
                                try {
                                    a = e[t]
                                } catch (t) {
                                }
                                if ("object" == typeof a && a) if ("[object Date]" != (l = j.call(a)) || p.call(a, "toJSON")) "function" == typeof a.toJSON && ("[object Number]" != l && "[object String]" != l && "[object Array]" != l || p.call(a, "toJSON")) && (a = a.toJSON(t)); else if (a > -1 / 0 && a < 1 / 0) {
                                    if (A) {
                                        for (h = S(a / 864e5), f = S(h / 365.2425) + 1970 - 1; A(f + 1, 0) <= h; f++) ;
                                        for (s = S((h - A(f, 0)) / 30.42); A(f, s + 1) <= h; s++) ;
                                        h = 1 + h - A(f, s), d = S((b = (a % 864e5 + 864e5) % 864e5) / 36e5) % 24, v = S(b / 6e4) % 60, C = S(b / 1e3) % 60, O = b % 1e3
                                    } else f = a.getUTCFullYear(), s = a.getUTCMonth(), h = a.getUTCDate(), d = a.getUTCHours(), v = a.getUTCMinutes(), C = a.getUTCSeconds(), O = a.getUTCMilliseconds();
                                    a = (f <= 0 || f >= 1e4 ? (f < 0 ? "-" : "+") + T(6, f < 0 ? -f : f) : T(4, f)) + "-" + T(2, s + 1) + "-" + T(2, h) + "T" + T(2, d) + ":" + T(2, v) + ":" + T(2, C) + "." + T(3, O) + "Z"
                                } else a = null;
                                if (r && (a = r.call(e, t, a)), null === a) return "null";
                                if ("[object Boolean]" == (l = j.call(a))) return "" + a;
                                if ("[object Number]" == l) return a > -1 / 0 && a < 1 / 0 ? "" + a : "null";
                                if ("[object String]" == l) return _("" + a);
                                if ("object" == typeof a) {
                                    for (m = i.length; m--;) if (i[m] === a) throw u();
                                    if (i.push(a), w = [], x = c, c += o, "[object Array]" == l) {
                                        for (J = 0, m = a.length; J < m; J++) U = N(J, a, r, n, o, c, i), w.push(U === y ? "null" : U);
                                        M = w.length ? o ? "[\n" + c + w.join(",\n" + c) + "\n" + x + "]" : "[" + w.join(",") + "]" : "[]"
                                    } else g(n || a, function (t) {
                                        var e = N(t, a, r, n, o, c, i);
                                        e !== y && w.push(_(t) + ":" + (o ? " " : "") + e)
                                    }), M = w.length ? o ? "{\n" + c + w.join(",\n" + c) + "\n" + x + "}" : "{" + w.join(",") + "}" : "{}";
                                    return i.pop(), M
                                }
                            };
                            r.stringify = function (t, r, n) {
                                var o, c, i, a;
                                if (e[typeof r] && r) if ("[object Function]" == (a = j.call(r))) c = r; else if ("[object Array]" == a) {
                                    i = {};
                                    for (var l, f = 0, u = r.length; f < u; l = r[f++], ("[object String]" == (a = j.call(l)) || "[object Number]" == a) && (i[l] = 1)) ;
                                }
                                if (n) if ("[object Number]" == (a = j.call(n))) {
                                    if ((n -= n % 1) > 0) for (o = "", n > 10 && (n = 10); o.length < n; o += " ") ;
                                } else "[object String]" == a && (o = n.length <= 10 ? n : n.slice(0, 10));
                                return N("", ((l = {})[""] = t, l), c, i, o, "", [])
                            }
                        }
                        if (!v("json-parse")) {
                            var U, J, m = i.fromCharCode, x = {92: "\\", 34: '"', 47: "/", 98: "\b", 116: "\t", 110: "\n", 102: "\f", 114: "\r"}, M = function () {
                                throw U = J = null, f()
                            }, F = function () {
                                for (var t, e, r, n, o, c = J, i = c.length; U < i;) switch (o = c.charCodeAt(U)) {
                                    case 9:
                                    case 10:
                                    case 13:
                                    case 32:
                                        U++;
                                        break;
                                    case 123:
                                    case 125:
                                    case 91:
                                    case 93:
                                    case 58:
                                    case 44:
                                        return t = C ? c.charAt(U) : c[U], U++, t;
                                    case 34:
                                        for (t = "@", U++; U < i;) if ((o = c.charCodeAt(U)) < 32) M(); else if (92 == o) switch (o = c.charCodeAt(++U)) {
                                            case 92:
                                            case 34:
                                            case 47:
                                            case 98:
                                            case 116:
                                            case 110:
                                            case 102:
                                            case 114:
                                                t += x[o], U++;
                                                break;
                                            case 117:
                                                for (e = ++U, r = U + 4; U < r; U++) (o = c.charCodeAt(U)) >= 48 && o <= 57 || o >= 97 && o <= 102 || o >= 65 && o <= 70 || M();
                                                t += m("0x" + c.slice(e, U));
                                                break;
                                            default:
                                                M()
                                        } else {
                                            if (34 == o) break;
                                            for (o = c.charCodeAt(U), e = U; o >= 32 && 92 != o && 34 != o;) o = c.charCodeAt(++U);
                                            t += c.slice(e, U)
                                        }
                                        if (34 == c.charCodeAt(U)) return U++, t;
                                        M();
                                    default:
                                        if (e = U, 45 == o && (n = !0, o = c.charCodeAt(++U)), o >= 48 && o <= 57) {
                                            for (48 == o && ((o = c.charCodeAt(U + 1)) >= 48 && o <= 57) && M(), n = !1; U < i && ((o = c.charCodeAt(U)) >= 48 && o <= 57); U++) ;
                                            if (46 == c.charCodeAt(U)) {
                                                for (r = ++U; r < i && ((o = c.charCodeAt(r)) >= 48 && o <= 57); r++) ;
                                                r == U && M(), U = r
                                            }
                                            if (101 == (o = c.charCodeAt(U)) || 69 == o) {
                                                for (43 != (o = c.charCodeAt(++U)) && 45 != o || U++, r = U; r < i && ((o = c.charCodeAt(r)) >= 48 && o <= 57); r++) ;
                                                r == U && M(), U = r
                                            }
                                            return +c.slice(e, U)
                                        }
                                        if (n && M(), "true" == c.slice(U, U + 4)) return U += 4, !0;
                                        if ("false" == c.slice(U, U + 5)) return U += 5, !1;
                                        if ("null" == c.slice(U, U + 4)) return U += 4, null;
                                        M()
                                }
                                return "$"
                            }, k = function (t) {
                                var e, r;
                                if ("$" == t && M(), "string" == typeof t) {
                                    if ("@" == (C ? t.charAt(0) : t[0])) return t.slice(1);
                                    if ("[" == t) {
                                        for (e = []; "]" != (t = F()); r || (r = !0)) r && ("," == t ? "]" == (t = F()) && M() : M()), "," == t && M(), e.push(k(t));
                                        return e
                                    }
                                    if ("{" == t) {
                                        for (e = {}; "}" != (t = F()); r || (r = !0)) r && ("," == t ? "}" == (t = F()) && M() : M()), "," != t && "string" == typeof t && "@" == (C ? t.charAt(0) : t[0]) && ":" == F() || M(), e[t.slice(1)] = k(F());
                                        return e
                                    }
                                    M()
                                }
                                return t
                            }, D = function (t, e, r) {
                                var n = E(t, e, r);
                                n === y ? delete t[e] : t[e] = n
                            }, E = function (t, e, r) {
                                var n, o = t[e];
                                if ("object" == typeof o && o) if ("[object Array]" == j.call(o)) for (n = o.length; n--;) D(o, n, r); else g(o, function (t) {
                                    D(o, t, r)
                                });
                                return r.call(t, e, o)
                            };
                            r.parse = function (t, e) {
                                var r, n;
                                return U = 0, J = "" + t, r = k(F()), "$" != F() && M(), U = J = null, e && "[object Function]" == j.call(e) ? E(((n = {})[""] = r, n), "", e) : r
                            }
                        }
                    }
                    return r.runInContext = c, r
                }

                if (!o || o.global !== o && o.window !== o && o.self !== o || (n = o), r && !t) c(n, r); else {
                    var i = n.JSON, a = n.JSON3, l = !1, f = c(n, n.JSON3 = {
                        noConflict: function () {
                            return l || (l = !0, n.JSON = i, n.JSON3 = a, i = a = null), f
                        }
                    });
                    n.JSON = {parse: f.parse, stringify: f.stringify}
                }
                t && define(function () {
                    return f
                })
            }).call(this);

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    6: [function (require, module, exports) {
        "use strict";
        var immediate = require("immediate");

        function INTERNAL() {
        }

        var handlers = {}, REJECTED = ["REJECTED"], FULFILLED = ["FULFILLED"], PENDING = ["PENDING"];

        function Promise(e) {
            if ("function" != typeof e) throw new TypeError("resolver must be a function");
            this.state = PENDING, this.queue = [], this.outcome = void 0, e !== INTERNAL && safelyResolveThenable(this, e)
        }

        function QueueItem(e, t, r) {
            this.promise = e, "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r && (this.onRejected = r, this.callRejected = this.otherCallRejected)
        }

        function unwrap(e, t, r) {
            immediate(function () {
                var n;
                try {
                    n = t(r)
                } catch (t) {
                    return handlers.reject(e, t)
                }
                n === e ? handlers.reject(e, new TypeError("Cannot resolve promise with itself")) : handlers.resolve(e, n)
            })
        }

        function getThen(e) {
            var t = e && e.then;
            if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t) return function () {
                t.apply(e, arguments)
            }
        }

        function safelyResolveThenable(e, t) {
            var r = !1;

            function n(t) {
                r || (r = !0, handlers.reject(e, t))
            }

            function o(t) {
                r || (r = !0, handlers.resolve(e, t))
            }

            var i = tryCatch(function () {
                t(o, n)
            });
            "error" === i.status && n(i.value)
        }

        function tryCatch(e, t) {
            var r = {};
            try {
                r.value = e(t), r.status = "success"
            } catch (e) {
                r.status = "error", r.value = e
            }
            return r
        }

        function resolve(e) {
            return e instanceof this ? e : handlers.resolve(new this(INTERNAL), e)
        }

        function reject(e) {
            var t = new this(INTERNAL);
            return handlers.reject(t, e)
        }

        function all(e) {
            var t = this;
            if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
            var r = e.length, n = !1;
            if (!r) return this.resolve([]);
            for (var o = new Array(r), i = 0, s = -1, u = new this(INTERNAL); ++s < r;) l(e[s], s);
            return u;

            function l(e, s) {
                t.resolve(e).then(function (e) {
                    o[s] = e, ++i !== r || n || (n = !0, handlers.resolve(u, o))
                }, function (e) {
                    n || (n = !0, handlers.reject(u, e))
                })
            }
        }

        function race(e) {
            var t = this;
            if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
            var r = e.length, n = !1;
            if (!r) return this.resolve([]);
            for (var o, i = -1, s = new this(INTERNAL); ++i < r;) o = e[i], t.resolve(o).then(function (e) {
                n || (n = !0, handlers.resolve(s, e))
            }, function (e) {
                n || (n = !0, handlers.reject(s, e))
            });
            return s
        }

        module.exports = Promise, Promise.prototype.finally = function (e) {
            if ("function" != typeof e) return this;
            var t = this.constructor;
            return this.then(function (r) {
                return t.resolve(e()).then(function () {
                    return r
                })
            }, function (r) {
                return t.resolve(e()).then(function () {
                    throw r
                })
            })
        }, Promise.prototype.catch = function (e) {
            return this.then(null, e)
        }, Promise.prototype.then = function (e, t) {
            if ("function" != typeof e && this.state === FULFILLED || "function" != typeof t && this.state === REJECTED) return this;
            var r = new this.constructor(INTERNAL);
            this.state !== PENDING ? unwrap(r, this.state === FULFILLED ? e : t, this.outcome) : this.queue.push(new QueueItem(r, e, t));
            return r
        }, QueueItem.prototype.callFulfilled = function (e) {
            handlers.resolve(this.promise, e)
        }, QueueItem.prototype.otherCallFulfilled = function (e) {
            unwrap(this.promise, this.onFulfilled, e)
        }, QueueItem.prototype.callRejected = function (e) {
            handlers.reject(this.promise, e)
        }, QueueItem.prototype.otherCallRejected = function (e) {
            unwrap(this.promise, this.onRejected, e)
        }, handlers.resolve = function (e, t) {
            var r = tryCatch(getThen, t);
            if ("error" === r.status) return handlers.reject(e, r.value);
            var n = r.value;
            if (n) safelyResolveThenable(e, n); else {
                e.state = FULFILLED, e.outcome = t;
                for (var o = -1, i = e.queue.length; ++o < i;) e.queue[o].callFulfilled(t)
            }
            return e
        }, handlers.reject = function (e, t) {
            e.state = REJECTED, e.outcome = t;
            for (var r = -1, n = e.queue.length; ++r < n;) e.queue[r].callRejected(t);
            return e
        }, Promise.resolve = resolve, Promise.reject = reject, Promise.all = all, Promise.race = race;

    }, {"immediate": 3}],
    7: [function (require, module, exports) {
        var MAX_SAFE_INTEGER = 9007199254740991, argsTag = "[object Arguments]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", reIsUint = /^(?:0|[1-9]\d*)$/;

        function apply(r, e, t) {
            switch (t.length) {
                case 0:
                    return r.call(e);
                case 1:
                    return r.call(e, t[0]);
                case 2:
                    return r.call(e, t[0], t[1]);
                case 3:
                    return r.call(e, t[0], t[1], t[2])
            }
            return r.apply(e, t)
        }

        function baseTimes(r, e) {
            for (var t = -1, n = Array(r); ++t < r;) n[t] = e(t);
            return n
        }

        function overArg(r, e) {
            return function (t) {
                return r(e(t))
            }
        }

        var objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, objectToString = objectProto.toString, propertyIsEnumerable = objectProto.propertyIsEnumerable, nativeKeys = overArg(Object.keys, Object), nativeMax = Math.max,
            nonEnumShadows = !propertyIsEnumerable.call({valueOf: 1}, "valueOf");

        function arrayLikeKeys(r, e) {
            var t = isArray(r) || isArguments(r) ? baseTimes(r.length, String) : [], n = t.length, o = !!n;
            for (var a in r) !e && !hasOwnProperty.call(r, a) || o && ("length" == a || isIndex(a, n)) || t.push(a);
            return t
        }

        function assignValue(r, e, t) {
            var n = r[e];
            hasOwnProperty.call(r, e) && eq(n, t) && (void 0 !== t || e in r) || (r[e] = t)
        }

        function baseKeys(r) {
            if (!isPrototype(r)) return nativeKeys(r);
            var e = [];
            for (var t in Object(r)) hasOwnProperty.call(r, t) && "constructor" != t && e.push(t);
            return e
        }

        function baseRest(r, e) {
            return e = nativeMax(void 0 === e ? r.length - 1 : e, 0), function () {
                for (var t = arguments, n = -1, o = nativeMax(t.length - e, 0), a = Array(o); ++n < o;) a[n] = t[e + n];
                n = -1;
                for (var i = Array(e + 1); ++n < e;) i[n] = t[n];
                return i[e] = a, apply(r, this, i)
            }
        }

        function copyObject(r, e, t, n) {
            t || (t = {});
            for (var o = -1, a = e.length; ++o < a;) {
                var i = e[o], s = n ? n(t[i], r[i], i, t, r) : void 0;
                assignValue(t, i, void 0 === s ? r[i] : s)
            }
            return t
        }

        function createAssigner(r) {
            return baseRest(function (e, t) {
                var n = -1, o = t.length, a = o > 1 ? t[o - 1] : void 0, i = o > 2 ? t[2] : void 0;
                for (a = r.length > 3 && "function" == typeof a ? (o--, a) : void 0, i && isIterateeCall(t[0], t[1], i) && (a = o < 3 ? void 0 : a, o = 1), e = Object(e); ++n < o;) {
                    var s = t[n];
                    s && r(e, s, n, a)
                }
                return e
            })
        }

        function isIndex(r, e) {
            return !!(e = null == e ? MAX_SAFE_INTEGER : e) && ("number" == typeof r || reIsUint.test(r)) && r > -1 && r % 1 == 0 && r < e
        }

        function isIterateeCall(r, e, t) {
            if (!isObject(t)) return !1;
            var n = typeof e;
            return !!("number" == n ? isArrayLike(t) && isIndex(e, t.length) : "string" == n && e in t) && eq(t[e], r)
        }

        function isPrototype(r) {
            var e = r && r.constructor;
            return r === ("function" == typeof e && e.prototype || objectProto)
        }

        function eq(r, e) {
            return r === e || r != r && e != e
        }

        function isArguments(r) {
            return isArrayLikeObject(r) && hasOwnProperty.call(r, "callee") && (!propertyIsEnumerable.call(r, "callee") || objectToString.call(r) == argsTag)
        }

        var isArray = Array.isArray;

        function isArrayLike(r) {
            return null != r && isLength(r.length) && !isFunction(r)
        }

        function isArrayLikeObject(r) {
            return isObjectLike(r) && isArrayLike(r)
        }

        function isFunction(r) {
            var e = isObject(r) ? objectToString.call(r) : "";
            return e == funcTag || e == genTag
        }

        function isLength(r) {
            return "number" == typeof r && r > -1 && r % 1 == 0 && r <= MAX_SAFE_INTEGER
        }

        function isObject(r) {
            var e = typeof r;
            return !!r && ("object" == e || "function" == e)
        }

        function isObjectLike(r) {
            return !!r && "object" == typeof r
        }

        var assign = createAssigner(function (r, e) {
            if (nonEnumShadows || isPrototype(e) || isArrayLike(e)) copyObject(e, keys(e), r); else for (var t in e) hasOwnProperty.call(e, t) && assignValue(r, t, e[t])
        });

        function keys(r) {
            return isArrayLike(r) ? arrayLikeKeys(r) : baseKeys(r)
        }

        module.exports = assign;

    }, {}],
    8: [function (require, module, exports) {
        (function (global) {
            var FUNC_ERROR_TEXT = "Expected a function", HASH_UNDEFINED = "__lodash_hash_undefined__", INFINITY = 1 / 0, funcTag = "[object Function]", genTag = "[object GeneratorFunction]", symbolTag = "[object Symbol]", reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
                reIsPlainProp = /^\w*$/, reLeadingDot = /^\./, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reEscapeChar = /\\(\\)?/g, reIsHostCtor = /^\[object .+?Constructor\]$/,
                freeGlobal = "object" == typeof global && global && global.Object === Object && global, freeSelf = "object" == typeof self && self && self.Object === Object && self, root = freeGlobal || freeSelf || Function("return this")();

            function getValue(t, e) {
                return null == t ? void 0 : t[e]
            }

            function isHostObject(t) {
                var e = !1;
                if (null != t && "function" != typeof t.toString) try {
                    e = !!(t + "")
                } catch (t) {
                }
                return e
            }

            var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype, coreJsData = root["__core-js_shared__"], maskSrcKey = function () {
                    var t = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
                    return t ? "Symbol(src)_1." + t : ""
                }(), funcToString = funcProto.toString, hasOwnProperty = objectProto.hasOwnProperty, objectToString = objectProto.toString,
                reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Symbol = root.Symbol, splice = arrayProto.splice, Map = getNative(root, "Map"),
                nativeCreate = getNative(Object, "create"), symbolProto = Symbol ? Symbol.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;

            function Hash(t) {
                var e = -1, r = t ? t.length : 0;
                for (this.clear(); ++e < r;) {
                    var a = t[e];
                    this.set(a[0], a[1])
                }
            }

            function hashClear() {
                this.__data__ = nativeCreate ? nativeCreate(null) : {}
            }

            function hashDelete(t) {
                return this.has(t) && delete this.__data__[t]
            }

            function hashGet(t) {
                var e = this.__data__;
                if (nativeCreate) {
                    var r = e[t];
                    return r === HASH_UNDEFINED ? void 0 : r
                }
                return hasOwnProperty.call(e, t) ? e[t] : void 0
            }

            function hashHas(t) {
                var e = this.__data__;
                return nativeCreate ? void 0 !== e[t] : hasOwnProperty.call(e, t)
            }

            function hashSet(t, e) {
                return this.__data__[t] = nativeCreate && void 0 === e ? HASH_UNDEFINED : e, this
            }

            function ListCache(t) {
                var e = -1, r = t ? t.length : 0;
                for (this.clear(); ++e < r;) {
                    var a = t[e];
                    this.set(a[0], a[1])
                }
            }

            function listCacheClear() {
                this.__data__ = []
            }

            function listCacheDelete(t) {
                var e = this.__data__, r = assocIndexOf(e, t);
                return !(r < 0) && (r == e.length - 1 ? e.pop() : splice.call(e, r, 1), !0)
            }

            function listCacheGet(t) {
                var e = this.__data__, r = assocIndexOf(e, t);
                return r < 0 ? void 0 : e[r][1]
            }

            function listCacheHas(t) {
                return assocIndexOf(this.__data__, t) > -1
            }

            function listCacheSet(t, e) {
                var r = this.__data__, a = assocIndexOf(r, t);
                return a < 0 ? r.push([t, e]) : r[a][1] = e, this
            }

            function MapCache(t) {
                var e = -1, r = t ? t.length : 0;
                for (this.clear(); ++e < r;) {
                    var a = t[e];
                    this.set(a[0], a[1])
                }
            }

            function mapCacheClear() {
                this.__data__ = {hash: new Hash, map: new (Map || ListCache), string: new Hash}
            }

            function mapCacheDelete(t) {
                return getMapData(this, t).delete(t)
            }

            function mapCacheGet(t) {
                return getMapData(this, t).get(t)
            }

            function mapCacheHas(t) {
                return getMapData(this, t).has(t)
            }

            function mapCacheSet(t, e) {
                return getMapData(this, t).set(t, e), this
            }

            function assocIndexOf(t, e) {
                for (var r = t.length; r--;) if (eq(t[r][0], e)) return r;
                return -1
            }

            function baseGet(t, e) {
                for (var r = 0, a = (e = isKey(e, t) ? [e] : castPath(e)).length; null != t && r < a;) t = t[toKey(e[r++])];
                return r && r == a ? t : void 0
            }

            function baseIsNative(t) {
                return !(!isObject(t) || isMasked(t)) && (isFunction(t) || isHostObject(t) ? reIsNative : reIsHostCtor).test(toSource(t))
            }

            function baseToString(t) {
                if ("string" == typeof t) return t;
                if (isSymbol(t)) return symbolToString ? symbolToString.call(t) : "";
                var e = t + "";
                return "0" == e && 1 / t == -INFINITY ? "-0" : e
            }

            function castPath(t) {
                return isArray(t) ? t : stringToPath(t)
            }

            function getMapData(t, e) {
                var r = t.__data__;
                return isKeyable(e) ? r["string" == typeof e ? "string" : "hash"] : r.map
            }

            function getNative(t, e) {
                var r = getValue(t, e);
                return baseIsNative(r) ? r : void 0
            }

            function isKey(t, e) {
                if (isArray(t)) return !1;
                var r = typeof t;
                return !("number" != r && "symbol" != r && "boolean" != r && null != t && !isSymbol(t)) || (reIsPlainProp.test(t) || !reIsDeepProp.test(t) || null != e && t in Object(e))
            }

            function isKeyable(t) {
                var e = typeof t;
                return "string" == e || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t
            }

            function isMasked(t) {
                return !!maskSrcKey && maskSrcKey in t
            }

            Hash.prototype.clear = hashClear, Hash.prototype.delete = hashDelete, Hash.prototype.get = hashGet, Hash.prototype.has = hashHas, Hash.prototype.set = hashSet, ListCache.prototype.clear = listCacheClear, ListCache.prototype.delete = listCacheDelete, ListCache.prototype.get = listCacheGet, ListCache.prototype.has = listCacheHas, ListCache.prototype.set = listCacheSet, MapCache.prototype.clear = mapCacheClear, MapCache.prototype.delete = mapCacheDelete, MapCache.prototype.get = mapCacheGet, MapCache.prototype.has = mapCacheHas, MapCache.prototype.set = mapCacheSet;
            var stringToPath = memoize(function (t) {
                t = toString(t);
                var e = [];
                return reLeadingDot.test(t) && e.push(""), t.replace(rePropName, function (t, r, a, o) {
                    e.push(a ? o.replace(reEscapeChar, "$1") : r || t)
                }), e
            });

            function toKey(t) {
                if ("string" == typeof t || isSymbol(t)) return t;
                var e = t + "";
                return "0" == e && 1 / t == -INFINITY ? "-0" : e
            }

            function toSource(t) {
                if (null != t) {
                    try {
                        return funcToString.call(t)
                    } catch (t) {
                    }
                    try {
                        return t + ""
                    } catch (t) {
                    }
                }
                return ""
            }

            function memoize(t, e) {
                if ("function" != typeof t || e && "function" != typeof e) throw new TypeError(FUNC_ERROR_TEXT);
                var r = function () {
                    var a = arguments, o = e ? e.apply(this, a) : a[0], n = r.cache;
                    if (n.has(o)) return n.get(o);
                    var i = t.apply(this, a);
                    return r.cache = n.set(o, i), i
                };
                return r.cache = new (memoize.Cache || MapCache), r
            }

            function eq(t, e) {
                return t === e || t != t && e != e
            }

            memoize.Cache = MapCache;
            var isArray = Array.isArray;

            function isFunction(t) {
                var e = isObject(t) ? objectToString.call(t) : "";
                return e == funcTag || e == genTag
            }

            function isObject(t) {
                var e = typeof t;
                return !!t && ("object" == e || "function" == e)
            }

            function isObjectLike(t) {
                return !!t && "object" == typeof t
            }

            function isSymbol(t) {
                return "symbol" == typeof t || isObjectLike(t) && objectToString.call(t) == symbolTag
            }

            function toString(t) {
                return null == t ? "" : baseToString(t)
            }

            function get(t, e, r) {
                var a = null == t ? void 0 : baseGet(t, e);
                return void 0 === a ? r : a
            }

            module.exports = get;

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    9: [function (require, module, exports) {
        (function (global) {
            var LARGE_ARRAY_SIZE = 200, HASH_UNDEFINED = "__lodash_hash_undefined__", INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, argsTag = "[object Arguments]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", symbolTag = "[object Symbol]",
                reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reIsHostCtor = /^\[object .+?Constructor\]$/, reIsUint = /^(?:0|[1-9]\d*)$/, freeGlobal = "object" == typeof global && global && global.Object === Object && global, freeSelf = "object" == typeof self && self && self.Object === Object && self,
                root = freeGlobal || freeSelf || Function("return this")();

            function apply(e, t, r) {
                switch (r.length) {
                    case 0:
                        return e.call(t);
                    case 1:
                        return e.call(t, r[0]);
                    case 2:
                        return e.call(t, r[0], r[1]);
                    case 3:
                        return e.call(t, r[0], r[1], r[2])
                }
                return e.apply(t, r)
            }

            function arrayIncludes(e, t) {
                return !!(e ? e.length : 0) && baseIndexOf(e, t, 0) > -1
            }

            function arrayIncludesWith(e, t, r) {
                for (var a = -1, n = e ? e.length : 0; ++a < n;) if (r(t, e[a])) return !0;
                return !1
            }

            function arrayMap(e, t) {
                for (var r = -1, a = e ? e.length : 0, n = Array(a); ++r < a;) n[r] = t(e[r], r, e);
                return n
            }

            function arrayPush(e, t) {
                for (var r = -1, a = t.length, n = e.length; ++r < a;) e[n + r] = t[r];
                return e
            }

            function baseFindIndex(e, t, r, a) {
                for (var n = e.length, o = r + (a ? 1 : -1); a ? o-- : ++o < n;) if (t(e[o], o, e)) return o;
                return -1
            }

            function baseIndexOf(e, t, r) {
                if (t != t) return baseFindIndex(e, baseIsNaN, r);
                for (var a = r - 1, n = e.length; ++a < n;) if (e[a] === t) return a;
                return -1
            }

            function baseIsNaN(e) {
                return e != e
            }

            function baseTimes(e, t) {
                for (var r = -1, a = Array(e); ++r < e;) a[r] = t(r);
                return a
            }

            function baseUnary(e) {
                return function (t) {
                    return e(t)
                }
            }

            function cacheHas(e, t) {
                return e.has(t)
            }

            function getValue(e, t) {
                return null == e ? void 0 : e[t]
            }

            function isHostObject(e) {
                var t = !1;
                if (null != e && "function" != typeof e.toString) try {
                    t = !!(e + "")
                } catch (e) {
                }
                return t
            }

            function overArg(e, t) {
                return function (r) {
                    return e(t(r))
                }
            }

            var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype, coreJsData = root["__core-js_shared__"], maskSrcKey = function () {
                    var e = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
                    return e ? "Symbol(src)_1." + e : ""
                }(), funcToString = funcProto.toString, hasOwnProperty = objectProto.hasOwnProperty, objectToString = objectProto.toString,
                reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Symbol = root.Symbol, getPrototype = overArg(Object.getPrototypeOf, Object),
                propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : void 0, nativeGetSymbols = Object.getOwnPropertySymbols, nativeMax = Math.max, Map = getNative(root, "Map"),
                nativeCreate = getNative(Object, "create");

            function Hash(e) {
                var t = -1, r = e ? e.length : 0;
                for (this.clear(); ++t < r;) {
                    var a = e[t];
                    this.set(a[0], a[1])
                }
            }

            function hashClear() {
                this.__data__ = nativeCreate ? nativeCreate(null) : {}
            }

            function hashDelete(e) {
                return this.has(e) && delete this.__data__[e]
            }

            function hashGet(e) {
                var t = this.__data__;
                if (nativeCreate) {
                    var r = t[e];
                    return r === HASH_UNDEFINED ? void 0 : r
                }
                return hasOwnProperty.call(t, e) ? t[e] : void 0
            }

            function hashHas(e) {
                var t = this.__data__;
                return nativeCreate ? void 0 !== t[e] : hasOwnProperty.call(t, e)
            }

            function hashSet(e, t) {
                return this.__data__[e] = nativeCreate && void 0 === t ? HASH_UNDEFINED : t, this
            }

            function ListCache(e) {
                var t = -1, r = e ? e.length : 0;
                for (this.clear(); ++t < r;) {
                    var a = e[t];
                    this.set(a[0], a[1])
                }
            }

            function listCacheClear() {
                this.__data__ = []
            }

            function listCacheDelete(e) {
                var t = this.__data__, r = assocIndexOf(t, e);
                return !(r < 0) && (r == t.length - 1 ? t.pop() : splice.call(t, r, 1), !0)
            }

            function listCacheGet(e) {
                var t = this.__data__, r = assocIndexOf(t, e);
                return r < 0 ? void 0 : t[r][1]
            }

            function listCacheHas(e) {
                return assocIndexOf(this.__data__, e) > -1
            }

            function listCacheSet(e, t) {
                var r = this.__data__, a = assocIndexOf(r, e);
                return a < 0 ? r.push([e, t]) : r[a][1] = t, this
            }

            function MapCache(e) {
                var t = -1, r = e ? e.length : 0;
                for (this.clear(); ++t < r;) {
                    var a = e[t];
                    this.set(a[0], a[1])
                }
            }

            function mapCacheClear() {
                this.__data__ = {hash: new Hash, map: new (Map || ListCache), string: new Hash}
            }

            function mapCacheDelete(e) {
                return getMapData(this, e).delete(e)
            }

            function mapCacheGet(e) {
                return getMapData(this, e).get(e)
            }

            function mapCacheHas(e) {
                return getMapData(this, e).has(e)
            }

            function mapCacheSet(e, t) {
                return getMapData(this, e).set(e, t), this
            }

            function SetCache(e) {
                var t = -1, r = e ? e.length : 0;
                for (this.__data__ = new MapCache; ++t < r;) this.add(e[t])
            }

            function setCacheAdd(e) {
                return this.__data__.set(e, HASH_UNDEFINED), this
            }

            function setCacheHas(e) {
                return this.__data__.has(e)
            }

            function arrayLikeKeys(e, t) {
                var r = isArray(e) || isArguments(e) ? baseTimes(e.length, String) : [], a = r.length, n = !!a;
                for (var o in e) !t && !hasOwnProperty.call(e, o) || n && ("length" == o || isIndex(o, a)) || r.push(o);
                return r
            }

            function assocIndexOf(e, t) {
                for (var r = e.length; r--;) if (eq(e[r][0], t)) return r;
                return -1
            }

            function baseDifference(e, t, r, a) {
                var n = -1, o = arrayIncludes, s = !0, i = e.length, c = [], u = t.length;
                if (!i) return c;
                r && (t = arrayMap(t, baseUnary(r))), a ? (o = arrayIncludesWith, s = !1) : t.length >= LARGE_ARRAY_SIZE && (o = cacheHas, s = !1, t = new SetCache(t));
                e:for (; ++n < i;) {
                    var l = e[n], h = r ? r(l) : l;
                    if (l = a || 0 !== l ? l : 0, s && h == h) {
                        for (var f = u; f--;) if (t[f] === h) continue e;
                        c.push(l)
                    } else o(t, h, a) || c.push(l)
                }
                return c
            }

            function baseFlatten(e, t, r, a, n) {
                var o = -1, s = e.length;
                for (r || (r = isFlattenable), n || (n = []); ++o < s;) {
                    var i = e[o];
                    t > 0 && r(i) ? t > 1 ? baseFlatten(i, t - 1, r, a, n) : arrayPush(n, i) : a || (n[n.length] = i)
                }
                return n
            }

            function baseGetAllKeys(e, t, r) {
                var a = t(e);
                return isArray(e) ? a : arrayPush(a, r(e))
            }

            function baseIsNative(e) {
                return !(!isObject(e) || isMasked(e)) && (isFunction(e) || isHostObject(e) ? reIsNative : reIsHostCtor).test(toSource(e))
            }

            function baseKeysIn(e) {
                if (!isObject(e)) return nativeKeysIn(e);
                var t = isPrototype(e), r = [];
                for (var a in e) ("constructor" != a || !t && hasOwnProperty.call(e, a)) && r.push(a);
                return r
            }

            function basePick(e, t) {
                return basePickBy(e = Object(e), t, function (t, r) {
                    return r in e
                })
            }

            function basePickBy(e, t, r) {
                for (var a = -1, n = t.length, o = {}; ++a < n;) {
                    var s = t[a], i = e[s];
                    r(i, s) && (o[s] = i)
                }
                return o
            }

            function baseRest(e, t) {
                return t = nativeMax(void 0 === t ? e.length - 1 : t, 0), function () {
                    for (var r = arguments, a = -1, n = nativeMax(r.length - t, 0), o = Array(n); ++a < n;) o[a] = r[t + a];
                    a = -1;
                    for (var s = Array(t + 1); ++a < t;) s[a] = r[a];
                    return s[t] = o, apply(e, this, s)
                }
            }

            function getAllKeysIn(e) {
                return baseGetAllKeys(e, keysIn, getSymbolsIn)
            }

            function getMapData(e, t) {
                var r = e.__data__;
                return isKeyable(t) ? r["string" == typeof t ? "string" : "hash"] : r.map
            }

            function getNative(e, t) {
                var r = getValue(e, t);
                return baseIsNative(r) ? r : void 0
            }

            Hash.prototype.clear = hashClear, Hash.prototype.delete = hashDelete, Hash.prototype.get = hashGet, Hash.prototype.has = hashHas, Hash.prototype.set = hashSet, ListCache.prototype.clear = listCacheClear, ListCache.prototype.delete = listCacheDelete, ListCache.prototype.get = listCacheGet, ListCache.prototype.has = listCacheHas, ListCache.prototype.set = listCacheSet, MapCache.prototype.clear = mapCacheClear, MapCache.prototype.delete = mapCacheDelete, MapCache.prototype.get = mapCacheGet, MapCache.prototype.has = mapCacheHas, MapCache.prototype.set = mapCacheSet, SetCache.prototype.add = SetCache.prototype.push = setCacheAdd, SetCache.prototype.has = setCacheHas;
            var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray, getSymbolsIn = nativeGetSymbols ? function (e) {
                for (var t = []; e;) arrayPush(t, getSymbols(e)), e = getPrototype(e);
                return t
            } : stubArray;

            function isFlattenable(e) {
                return isArray(e) || isArguments(e) || !!(spreadableSymbol && e && e[spreadableSymbol])
            }

            function isIndex(e, t) {
                return !!(t = null == t ? MAX_SAFE_INTEGER : t) && ("number" == typeof e || reIsUint.test(e)) && e > -1 && e % 1 == 0 && e < t
            }

            function isKeyable(e) {
                var t = typeof e;
                return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e
            }

            function isMasked(e) {
                return !!maskSrcKey && maskSrcKey in e
            }

            function isPrototype(e) {
                var t = e && e.constructor;
                return e === ("function" == typeof t && t.prototype || objectProto)
            }

            function nativeKeysIn(e) {
                var t = [];
                if (null != e) for (var r in Object(e)) t.push(r);
                return t
            }

            function toKey(e) {
                if ("string" == typeof e || isSymbol(e)) return e;
                var t = e + "";
                return "0" == t && 1 / e == -INFINITY ? "-0" : t
            }

            function toSource(e) {
                if (null != e) {
                    try {
                        return funcToString.call(e)
                    } catch (e) {
                    }
                    try {
                        return e + ""
                    } catch (e) {
                    }
                }
                return ""
            }

            function eq(e, t) {
                return e === t || e != e && t != t
            }

            function isArguments(e) {
                return isArrayLikeObject(e) && hasOwnProperty.call(e, "callee") && (!propertyIsEnumerable.call(e, "callee") || objectToString.call(e) == argsTag)
            }

            var isArray = Array.isArray;

            function isArrayLike(e) {
                return null != e && isLength(e.length) && !isFunction(e)
            }

            function isArrayLikeObject(e) {
                return isObjectLike(e) && isArrayLike(e)
            }

            function isFunction(e) {
                var t = isObject(e) ? objectToString.call(e) : "";
                return t == funcTag || t == genTag
            }

            function isLength(e) {
                return "number" == typeof e && e > -1 && e % 1 == 0 && e <= MAX_SAFE_INTEGER
            }

            function isObject(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }

            function isObjectLike(e) {
                return !!e && "object" == typeof e
            }

            function isSymbol(e) {
                return "symbol" == typeof e || isObjectLike(e) && objectToString.call(e) == symbolTag
            }

            function keysIn(e) {
                return isArrayLike(e) ? arrayLikeKeys(e, !0) : baseKeysIn(e)
            }

            var omit = baseRest(function (e, t) {
                return null == e ? {} : (t = arrayMap(baseFlatten(t, 1), toKey), basePick(e, baseDifference(getAllKeysIn(e), t)))
            });

            function stubArray() {
                return []
            }

            module.exports = omit;

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    10: [function (require, module, exports) {
        var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};

        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined")
        }

        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined")
        }

        function runTimeout(e) {
            if (cachedSetTimeout === setTimeout) return setTimeout(e, 0);
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, setTimeout(e, 0);
            try {
                return cachedSetTimeout(e, 0)
            } catch (t) {
                try {
                    return cachedSetTimeout.call(null, e, 0)
                } catch (t) {
                    return cachedSetTimeout.call(this, e, 0)
                }
            }
        }

        function runClearTimeout(e) {
            if (cachedClearTimeout === clearTimeout) return clearTimeout(e);
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, clearTimeout(e);
            try {
                return cachedClearTimeout(e)
            } catch (t) {
                try {
                    return cachedClearTimeout.call(null, e)
                } catch (t) {
                    return cachedClearTimeout.call(this, e)
                }
            }
        }

        !function () {
            try {
                cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout
            } catch (e) {
                cachedSetTimeout = defaultSetTimout
            }
            try {
                cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout
            }
        }();
        var currentQueue, queue = [], draining = !1, queueIndex = -1;

        function cleanUpNextTick() {
            draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue())
        }

        function drainQueue() {
            if (!draining) {
                var e = runTimeout(cleanUpNextTick);
                draining = !0;
                for (var t = queue.length; t;) {
                    for (currentQueue = queue, queue = []; ++queueIndex < t;) currentQueue && currentQueue[queueIndex].run();
                    queueIndex = -1, t = queue.length
                }
                currentQueue = null, draining = !1, runClearTimeout(e)
            }
        }

        function Item(e, t) {
            this.fun = e, this.array = t
        }

        function noop() {
        }

        process.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            queue.push(new Item(e, t)), 1 !== queue.length || draining || runTimeout(drainQueue)
        }, Item.prototype.run = function () {
            this.fun.apply(null, this.array)
        }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, process.emit = noop, process.prependListener = noop, process.prependOnceListener = noop, process.listeners = function (e) {
            return []
        }, process.binding = function (e) {
            throw new Error("process.binding is not supported")
        }, process.cwd = function () {
            return "/"
        }, process.chdir = function (e) {
            throw new Error("process.chdir is not supported")
        }, process.umask = function () {
            return 0
        };

    }, {}],
    11: [function (require, module, exports) {
        "use strict";
        var undef, has = Object.prototype.hasOwnProperty;

        function decode(e) {
            return decodeURIComponent(e.replace(/\+/g, " "))
        }

        function querystring(e) {
            for (var n, r = /([^=?&]+)=?([^&]*)/g, t = {}; n = r.exec(e);) {
                var o = decode(n[1]), i = decode(n[2]);
                o in t || (t[o] = i)
            }
            return t
        }

        function querystringify(e, n) {
            n = n || "";
            var r, t, o = [];
            for (t in "string" != typeof n && (n = "?"), e) has.call(e, t) && ((r = e[t]) || null !== r && r !== undef && !isNaN(r) || (r = ""), o.push(encodeURIComponent(t) + "=" + encodeURIComponent(r)));
            return o.length ? n + o.join("&") : ""
        }

        exports.stringify = querystringify, exports.parse = querystring;

    }, {}],
    12: [function (require, module, exports) {
        "use strict";
        module.exports = function (e, t) {
            if (t = t.split(":")[0], !(e = +e)) return !1;
            switch (t) {
                case"http":
                case"ws":
                    return 80 !== e;
                case"https":
                case"wss":
                    return 443 !== e;
                case"ftp":
                    return 21 !== e;
                case"gopher":
                    return 70 !== e;
                case"file":
                    return !1
            }
            return 0 !== e
        };

    }, {}],
    13: [function (require, module, exports) {
        (function (global) {
            "use strict";
            var transportList = require("./transport-list");
            module.exports = require("./main")(transportList), "_sockjs_onload" in global && setTimeout(global._sockjs_onload, 1);

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"./main": 26, "./transport-list": 28}],
    14: [function (require, module, exports) {
        "use strict";
        var inherits = require("inherits"), Event = require("./event");

        function CloseEvent() {
            Event.call(this), this.initEvent("close", !1, !1), this.wasClean = !1, this.code = 0, this.reason = ""
        }

        inherits(CloseEvent, Event), module.exports = CloseEvent;

    }, {"./event": 16, "inherits": 4}],
    15: [function (require, module, exports) {
        "use strict";
        var inherits = require("inherits"), EventTarget = require("./eventtarget");

        function EventEmitter() {
            EventTarget.call(this)
        }

        inherits(EventEmitter, EventTarget), EventEmitter.prototype.removeAllListeners = function (t) {
            t ? delete this._listeners[t] : this._listeners = {}
        }, EventEmitter.prototype.once = function (t, e) {
            var r = this, n = !1;
            this.on(t, function i() {
                r.removeListener(t, i), n || (n = !0, e.apply(this, arguments))
            })
        }, EventEmitter.prototype.emit = function () {
            var t = arguments[0], e = this._listeners[t];
            if (e) {
                for (var r = arguments.length, n = new Array(r - 1), i = 1; i < r; i++) n[i - 1] = arguments[i];
                for (var o = 0; o < e.length; o++) e[o].apply(this, n)
            }
        }, EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener, EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener, module.exports.EventEmitter = EventEmitter;

    }, {"./eventtarget": 17, "inherits": 4}],
    16: [function (require, module, exports) {
        "use strict";

        function Event(t) {
            this.type = t
        }

        Event.prototype.initEvent = function (t, e, n) {
            return this.type = t, this.bubbles = e, this.cancelable = n, this.timeStamp = +new Date, this
        }, Event.prototype.stopPropagation = function () {
        }, Event.prototype.preventDefault = function () {
        }, Event.CAPTURING_PHASE = 1, Event.AT_TARGET = 2, Event.BUBBLING_PHASE = 3, module.exports = Event;

    }, {}],
    17: [function (require, module, exports) {
        "use strict";

        function EventTarget() {
            this._listeners = {}
        }

        EventTarget.prototype.addEventListener = function (t, e) {
            t in this._listeners || (this._listeners[t] = []);
            var s = this._listeners[t];
            -1 === s.indexOf(e) && (s = s.concat([e])), this._listeners[t] = s
        }, EventTarget.prototype.removeEventListener = function (t, e) {
            var s = this._listeners[t];
            if (s) {
                var i = s.indexOf(e);
                -1 === i || (s.length > 1 ? this._listeners[t] = s.slice(0, i).concat(s.slice(i + 1)) : delete this._listeners[t])
            }
        }, EventTarget.prototype.dispatchEvent = function () {
            var t = arguments[0], e = t.type, s = 1 === arguments.length ? [t] : Array.apply(null, arguments);
            if (this["on" + e] && this["on" + e].apply(this, s), e in this._listeners) for (var i = this._listeners[e], n = 0; n < i.length; n++) i[n].apply(this, s)
        }, module.exports = EventTarget;

    }, {}],
    18: [function (require, module, exports) {
        "use strict";
        var inherits = require("inherits"), Event = require("./event");

        function TransportMessageEvent(e) {
            Event.call(this), this.initEvent("message", !1, !1), this.data = e
        }

        inherits(TransportMessageEvent, Event), module.exports = TransportMessageEvent;

    }, {"./event": 16, "inherits": 4}],
    19: [function (require, module, exports) {
        "use strict";
        var JSON3 = require("json3"), iframeUtils = require("./utils/iframe");

        function FacadeJS(t) {
            this._transport = t, t.on("message", this._transportMessage.bind(this)), t.on("close", this._transportClose.bind(this))
        }

        FacadeJS.prototype._transportClose = function (t, s) {
            iframeUtils.postMessage("c", JSON3.stringify([t, s]))
        }, FacadeJS.prototype._transportMessage = function (t) {
            iframeUtils.postMessage("t", t)
        }, FacadeJS.prototype._send = function (t) {
            this._transport.send(t)
        }, FacadeJS.prototype._close = function () {
            this._transport.close(), this._transport.removeAllListeners()
        }, module.exports = FacadeJS;

    }, {"./utils/iframe": 59, "json3": 5}],
    20: [function (require, module, exports) {
        (function (process) {
            "use strict";
            var urlUtils = require("./utils/url"), eventUtils = require("./utils/event"), JSON3 = require("json3"), FacadeJS = require("./facade"), InfoIframeReceiver = require("./info-iframe-receiver"), iframeUtils = require("./utils/iframe"), loc = require("./location"), debug = function () {
            };
            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:iframe-bootstrap")), module.exports = function (e, r) {
                var a, i = {};
                r.forEach(function (e) {
                    e.facadeTransport && (i[e.facadeTransport.transportName] = e.facadeTransport)
                }), i[InfoIframeReceiver.transportName] = InfoIframeReceiver, e.bootstrap_iframe = function () {
                    var r;
                    iframeUtils.currentWindowId = loc.hash.slice(1);
                    eventUtils.attachEvent("message", function (t) {
                        if (t.source === parent && (void 0 === a && (a = t.origin), t.origin === a)) {
                            var n;
                            try {
                                n = JSON3.parse(t.data)
                            } catch (e) {
                                return void debug("bad json", t.data)
                            }
                            if (n.windowId === iframeUtils.currentWindowId) switch (n.type) {
                                case"s":
                                    var o;
                                    try {
                                        o = JSON3.parse(n.data)
                                    } catch (e) {
                                        debug("bad json", n.data);
                                        break
                                    }
                                    var s = o[0], c = o[1], f = o[2], u = o[3];
                                    if (debug(s, c, f, u), s !== e.version) throw new Error('Incompatible SockJS! Main site uses: "' + s + '", the iframe: "' + e.version + '".');
                                    if (!urlUtils.isOriginEqual(f, loc.href) || !urlUtils.isOriginEqual(u, loc.href)) throw new Error("Can't connect to different domain from within an iframe. (" + loc.href + ", " + f + ", " + u + ")");
                                    r = new FacadeJS(new i[c](f, u));
                                    break;
                                case"m":
                                    r._send(n.data);
                                    break;
                                case"c":
                                    r && r._close(), r = null
                            }
                        }
                    }), iframeUtils.postMessage("s")
                }
            };

        }).call(this, require('_process'))
    }, {"./facade": 19, "./info-iframe-receiver": 22, "./location": 25, "./utils/event": 58, "./utils/iframe": 59, "./utils/url": 64, "_process": 10, "debug": 66, "json3": 5}],
    21: [function (require, module, exports) {
        (function (process) {
            "use strict";
            var EventEmitter = require("events").EventEmitter, inherits = require("inherits"), JSON3 = require("json3"), objectUtils = require("./utils/object"), debug = function () {
            };

            function InfoAjax(e, t) {
                EventEmitter.call(this);
                var i = this, n = +new Date;
                this.xo = new t("GET", e), this.xo.once("finish", function (e, t) {
                    var s, r;
                    if (200 === e) {
                        if (r = +new Date - n, t) try {
                            s = JSON3.parse(t)
                        } catch (e) {
                            debug("bad json", t)
                        }
                        objectUtils.isObject(s) || (s = {})
                    }
                    i.emit("finish", s, r), i.removeAllListeners()
                })
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:info-ajax")), inherits(InfoAjax, EventEmitter), InfoAjax.prototype.close = function () {
                this.removeAllListeners(), this.xo.close()
            }, module.exports = InfoAjax;

        }).call(this, require('_process'))
    }, {"./utils/object": 61, "_process": 10, "debug": 66, "events": 15, "inherits": 4, "json3": 5}],
    22: [function (require, module, exports) {
        "use strict";
        var inherits = require("inherits"), EventEmitter = require("events").EventEmitter, JSON3 = require("json3"), XHRLocalObject = require("./transport/sender/xhr-local"), InfoAjax = require("./info-ajax");

        function InfoReceiverIframe(e) {
            var r = this;
            EventEmitter.call(this), this.ir = new InfoAjax(e, XHRLocalObject), this.ir.once("finish", function (e, i) {
                r.ir = null, r.emit("message", JSON3.stringify([e, i]))
            })
        }

        inherits(InfoReceiverIframe, EventEmitter), InfoReceiverIframe.transportName = "iframe-info-receiver", InfoReceiverIframe.prototype.close = function () {
            this.ir && (this.ir.close(), this.ir = null), this.removeAllListeners()
        }, module.exports = InfoReceiverIframe;

    }, {"./info-ajax": 21, "./transport/sender/xhr-local": 49, "events": 15, "inherits": 4, "json3": 5}],
    23: [function (require, module, exports) {
        (function (process, global) {
            "use strict";
            var EventEmitter = require("events").EventEmitter, inherits = require("inherits"), JSON3 = require("json3"), utils = require("./utils/event"), IframeTransport = require("./transport/iframe"), InfoReceiverIframe = require("./info-iframe-receiver"), debug = function () {
            };

            function InfoIframe(e, r) {
                var i = this;
                EventEmitter.call(this);
                var t = function () {
                    var t = i.ifr = new IframeTransport(InfoReceiverIframe.transportName, r, e);
                    t.once("message", function (e) {
                        if (e) {
                            var r;
                            try {
                                r = JSON3.parse(e)
                            } catch (r) {
                                return debug("bad json", e), i.emit("finish"), void i.close()
                            }
                            var t = r[0], n = r[1];
                            i.emit("finish", t, n)
                        }
                        i.close()
                    }), t.once("close", function () {
                        i.emit("finish"), i.close()
                    })
                };
                global.document.body ? t() : utils.attachEvent("load", t)
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:info-iframe")), inherits(InfoIframe, EventEmitter), InfoIframe.enabled = function () {
                return IframeTransport.enabled()
            }, InfoIframe.prototype.close = function () {
                this.ifr && this.ifr.close(), this.removeAllListeners(), this.ifr = null
            }, module.exports = InfoIframe;

        }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"./info-iframe-receiver": 22, "./transport/iframe": 34, "./utils/event": 58, "_process": 10, "debug": 66, "events": 15, "inherits": 4, "json3": 5}],
    24: [function (require, module, exports) {
        (function (process) {
            "use strict";
            var EventEmitter = require("events").EventEmitter, inherits = require("inherits"), urlUtils = require("./utils/url"), XDR = require("./transport/sender/xdr"), XHRCors = require("./transport/sender/xhr-cors"), XHRLocal = require("./transport/sender/xhr-local"),
                XHRFake = require("./transport/sender/xhr-fake"), InfoIframe = require("./info-iframe"), InfoAjax = require("./info-ajax"), debug = function () {
                };

            function InfoReceiver(e, i) {
                debug(e);
                var r = this;
                EventEmitter.call(this), setTimeout(function () {
                    r.doXhr(e, i)
                }, 0)
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:info-receiver")), inherits(InfoReceiver, EventEmitter), InfoReceiver._getReceiver = function (e, i, r) {
                return r.sameOrigin ? new InfoAjax(i, XHRLocal) : XHRCors.enabled ? new InfoAjax(i, XHRCors) : XDR.enabled && r.sameScheme ? new InfoAjax(i, XDR) : InfoIframe.enabled() ? new InfoIframe(e, i) : new InfoAjax(i, XHRFake)
            }, InfoReceiver.prototype.doXhr = function (e, i) {
                var r = this, t = urlUtils.addPath(e, "/info");
                debug("doXhr", t), this.xo = InfoReceiver._getReceiver(e, t, i), this.timeoutRef = setTimeout(function () {
                    debug("timeout"), r._cleanup(!1), r.emit("finish")
                }, InfoReceiver.timeout), this.xo.once("finish", function (e, i) {
                    debug("finish", e, i), r._cleanup(!0), r.emit("finish", e, i)
                })
            }, InfoReceiver.prototype._cleanup = function (e) {
                debug("_cleanup"), clearTimeout(this.timeoutRef), this.timeoutRef = null, !e && this.xo && this.xo.close(), this.xo = null
            }, InfoReceiver.prototype.close = function () {
                debug("close"), this.removeAllListeners(), this._cleanup(!1)
            }, InfoReceiver.timeout = 8e3, module.exports = InfoReceiver;

        }).call(this, require('_process'))
    }, {"./info-ajax": 21, "./info-iframe": 23, "./transport/sender/xdr": 46, "./transport/sender/xhr-cors": 47, "./transport/sender/xhr-fake": 48, "./transport/sender/xhr-local": 49, "./utils/url": 64, "_process": 10, "debug": 66, "events": 15, "inherits": 4}],
    25: [function (require, module, exports) {
        (function (global) {
            "use strict";
            module.exports = global.location || {origin: "http://localhost:80", protocol: "http:", host: "localhost", port: 80, href: "http://localhost/", hash: ""};

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    26: [function (require, module, exports) {
        (function (process, global) {
            "use strict";
            require("./shims");
            var transports, URL = require("url-parse"), inherits = require("inherits"), JSON3 = require("json3"), random = require("./utils/random"), escape = require("./utils/escape"), urlUtils = require("./utils/url"), eventUtils = require("./utils/event"),
                transport = require("./utils/transport"), objectUtils = require("./utils/object"), browser = require("./utils/browser"), log = require("./utils/log"), Event = require("./event/event"), EventTarget = require("./event/eventtarget"), loc = require("./location"),
                CloseEvent = require("./event/close"), TransportMessageEvent = require("./event/trans-message"), InfoReceiver = require("./info-receiver"), debug = function () {
                };

            function SockJS(t, e, r) {
                if (!(this instanceof SockJS)) return new SockJS(t, e, r);
                if (arguments.length < 1) throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
                EventTarget.call(this), this.readyState = SockJS.CONNECTING, this.extensions = "", this.protocol = "", (r = r || {}).protocols_whitelist && log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead."), this._transportsWhitelist = r.transports, this._transportOptions = r.transportOptions || {};
                var s = r.sessionId || 8;
                if ("function" == typeof s) this._generateSessionId = s; else {
                    if ("number" != typeof s) throw new TypeError("If sessionId is used in the options, it needs to be a number or a function.");
                    this._generateSessionId = function () {
                        return random.string(s)
                    }
                }
                this._server = r.server || random.numberString(1e3);
                var o = new URL(t);
                if (!o.host || !o.protocol) throw new SyntaxError("The URL '" + t + "' is invalid");
                if (o.hash) throw new SyntaxError("The URL must not contain a fragment");
                if ("http:" !== o.protocol && "https:" !== o.protocol) throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + o.protocol + "' is not allowed.");
                var n = "https:" === o.protocol;
                if ("https:" === loc.protocol && !n) throw new Error("SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS");
                e ? Array.isArray(e) || (e = [e]) : e = [];
                var i = e.sort();
                i.forEach(function (t, e) {
                    if (!t) throw new SyntaxError("The protocols entry '" + t + "' is invalid.");
                    if (e < i.length - 1 && t === i[e + 1]) throw new SyntaxError("The protocols entry '" + t + "' is duplicated.")
                });
                var a = urlUtils.getOrigin(loc.href);
                this._origin = a ? a.toLowerCase() : null, o.set("pathname", o.pathname.replace(/\/+$/, "")), this.url = o.href, debug("using url", this.url), this._urlInfo = {
                    nullOrigin: !browser.hasDomain(), sameOrigin: urlUtils.isOriginEqual(this.url, loc.href), sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
                }, this._ir = new InfoReceiver(this.url, this._urlInfo), this._ir.once("finish", this._receiveInfo.bind(this))
            }

            function userSetCode(t) {
                return 1e3 === t || t >= 3e3 && t <= 4999
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:main")), inherits(SockJS, EventTarget), SockJS.prototype.close = function (t, e) {
                if (t && !userSetCode(t)) throw new Error("InvalidAccessError: Invalid code");
                if (e && e.length > 123) throw new SyntaxError("reason argument has an invalid length");
                if (this.readyState !== SockJS.CLOSING && this.readyState !== SockJS.CLOSED) {
                    this._close(t || 1e3, e || "Normal closure", !0)
                }
            }, SockJS.prototype.send = function (t) {
                if ("string" != typeof t && (t = "" + t), this.readyState === SockJS.CONNECTING) throw new Error("InvalidStateError: The connection has not been established yet");
                this.readyState === SockJS.OPEN && this._transport.send(escape.quote(t))
            }, SockJS.version = require("./version"), SockJS.CONNECTING = 0, SockJS.OPEN = 1, SockJS.CLOSING = 2, SockJS.CLOSED = 3, SockJS.prototype._receiveInfo = function (t, e) {
                if (debug("_receiveInfo", e), this._ir = null, t) {
                    this._rto = this.countRTO(e), this._transUrl = t.base_url ? t.base_url : this.url, t = objectUtils.extend(t, this._urlInfo), debug("info", t);
                    var r = transports.filterToEnabled(this._transportsWhitelist, t);
                    this._transports = r.main, debug(this._transports.length + " enabled transports"), this._connect()
                } else this._close(1002, "Cannot connect to server")
            }, SockJS.prototype._connect = function () {
                for (var t = this._transports.shift(); t; t = this._transports.shift()) {
                    if (debug("attempt", t.transportName), t.needBody && (!global.document.body || void 0 !== global.document.readyState && "complete" !== global.document.readyState && "interactive" !== global.document.readyState)) return debug("waiting for body"), this._transports.unshift(t), void eventUtils.attachEvent("load", this._connect.bind(this));
                    var e = this._rto * t.roundTrips || 5e3;
                    this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), e), debug("using timeout", e);
                    var r = urlUtils.addPath(this._transUrl, "/" + this._server + "/" + this._generateSessionId()), s = this._transportOptions[t.transportName];
                    debug("transport url", r);
                    var o = new t(r, this._transUrl, s);
                    return o.on("message", this._transportMessage.bind(this)), o.once("close", this._transportClose.bind(this)), o.transportName = t.transportName, void (this._transport = o)
                }
                this._close(2e3, "All transports failed", !1)
            }, SockJS.prototype._transportTimeout = function () {
                debug("_transportTimeout"), this.readyState === SockJS.CONNECTING && (this._transport && this._transport.close(), this._transportClose(2007, "Transport timed out"))
            }, SockJS.prototype._transportMessage = function (t) {
                debug("_transportMessage", t);
                var e, r = this, s = t.slice(0, 1), o = t.slice(1);
                switch (s) {
                    case"o":
                        return void this._open();
                    case"h":
                        return this.dispatchEvent(new Event("heartbeat")), void debug("heartbeat", this.transport)
                }
                if (o) try {
                    e = JSON3.parse(o)
                } catch (t) {
                    debug("bad json", o)
                }
                if (void 0 !== e) switch (s) {
                    case"a":
                        Array.isArray(e) && e.forEach(function (t) {
                            debug("message", r.transport, t), r.dispatchEvent(new TransportMessageEvent(t))
                        });
                        break;
                    case"m":
                        debug("message", this.transport, e), this.dispatchEvent(new TransportMessageEvent(e));
                        break;
                    case"c":
                        Array.isArray(e) && 2 === e.length && this._close(e[0], e[1], !0)
                } else debug("empty payload", o)
            }, SockJS.prototype._transportClose = function (t, e) {
                debug("_transportClose", this.transport, t, e), this._transport && (this._transport.removeAllListeners(), this._transport = null, this.transport = null), userSetCode(t) || 2e3 === t || this.readyState !== SockJS.CONNECTING ? this._close(t, e) : this._connect()
            }, SockJS.prototype._open = function () {
                debug("_open", this._transport.transportName, this.readyState), this.readyState === SockJS.CONNECTING ? (this._transportTimeoutId && (clearTimeout(this._transportTimeoutId), this._transportTimeoutId = null), this.readyState = SockJS.OPEN, this.transport = this._transport.transportName, this.dispatchEvent(new Event("open")), debug("connected", this.transport)) : this._close(1006, "Server lost session")
            }, SockJS.prototype._close = function (t, e, r) {
                debug("_close", this.transport, t, e, r, this.readyState);
                var s = !1;
                if (this._ir && (s = !0, this._ir.close(), this._ir = null), this._transport && (this._transport.close(), this._transport = null, this.transport = null), this.readyState === SockJS.CLOSED) throw new Error("InvalidStateError: SockJS has already been closed");
                this.readyState = SockJS.CLOSING, setTimeout(function () {
                    this.readyState = SockJS.CLOSED, s && this.dispatchEvent(new Event("error"));
                    var o = new CloseEvent("close");
                    o.wasClean = r || !1, o.code = t || 1e3, o.reason = e, this.dispatchEvent(o), this.onmessage = this.onclose = this.onerror = null, debug("disconnected")
                }.bind(this), 0)
            }, SockJS.prototype.countRTO = function (t) {
                return t > 100 ? 4 * t : 300 + t
            }, module.exports = function (t) {
                return transports = transport(t), require("./iframe-bootstrap")(SockJS, t), SockJS
            };

        }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "./event/close": 14,
        "./event/event": 16,
        "./event/eventtarget": 17,
        "./event/trans-message": 18,
        "./iframe-bootstrap": 20,
        "./info-receiver": 24,
        "./location": 25,
        "./shims": 27,
        "./utils/browser": 56,
        "./utils/escape": 57,
        "./utils/event": 58,
        "./utils/log": 60,
        "./utils/object": 61,
        "./utils/random": 62,
        "./utils/transport": 63,
        "./utils/url": 64,
        "./version": 65,
        "_process": 10,
        "debug": 66,
        "inherits": 4,
        "json3": 5,
        "url-parse": 69
    }],
    27: [function (require, module, exports) {
        "use strict";
        var defineProperty, ArrayPrototype = Array.prototype, ObjectPrototype = Object.prototype, FunctionPrototype = Function.prototype, StringPrototype = String.prototype, array_slice = ArrayPrototype.slice, _toString = ObjectPrototype.toString, isFunction = function (t) {
            return "[object Function]" === ObjectPrototype.toString.call(t)
        }, isArray = function (t) {
            return "[object Array]" === _toString.call(t)
        }, isString = function (t) {
            return "[object String]" === _toString.call(t)
        }, supportsDescriptors = Object.defineProperty && function () {
            try {
                return Object.defineProperty({}, "x", {}), !0
            } catch (t) {
                return !1
            }
        }();
        defineProperty = supportsDescriptors ? function (t, r, e, n) {
            !n && r in t || Object.defineProperty(t, r, {configurable: !0, enumerable: !1, writable: !0, value: e})
        } : function (t, r, e, n) {
            !n && r in t || (t[r] = e)
        };
        var defineProperties = function (t, r, e) {
            for (var n in r) ObjectPrototype.hasOwnProperty.call(r, n) && defineProperty(t, n, r[n], e)
        }, toObject = function (t) {
            if (null == t) throw new TypeError("can't convert " + t + " to object");
            return Object(t)
        };

        function toInteger(t) {
            var r = +t;
            return r != r ? r = 0 : 0 !== r && r !== 1 / 0 && r !== -1 / 0 && (r = (r > 0 || -1) * Math.floor(Math.abs(r))), r
        }

        function ToUint32(t) {
            return t >>> 0
        }

        function Empty() {
        }

        defineProperties(FunctionPrototype, {
            bind: function (t) {
                var r = this;
                if (!isFunction(r)) throw new TypeError("Function.prototype.bind called on incompatible " + r);
                for (var e = array_slice.call(arguments, 1), n = Math.max(0, r.length - e.length), i = [], o = 0; o < n; o++) i.push("$" + o);
                var s = Function("binder", "return function (" + i.join(",") + "){ return binder.apply(this, arguments); }")(function () {
                    if (this instanceof s) {
                        var n = r.apply(this, e.concat(array_slice.call(arguments)));
                        return Object(n) === n ? n : this
                    }
                    return r.apply(t, e.concat(array_slice.call(arguments)))
                });
                return r.prototype && (Empty.prototype = r.prototype, s.prototype = new Empty, Empty.prototype = null), s
            }
        }), defineProperties(Array, {isArray: isArray});
        var boxedString = Object("a"), splitString = "a" !== boxedString[0] || !(0 in boxedString), properlyBoxesContext = function (t) {
            var r = !0, e = !0;
            return t && (t.call("foo", function (t, e, n) {
                "object" != typeof n && (r = !1)
            }), t.call([1], function () {
                e = "string" == typeof this
            }, "x")), !!t && r && e
        };
        defineProperties(ArrayPrototype, {
            forEach: function (t) {
                var r = toObject(this), e = splitString && isString(this) ? this.split("") : r, n = arguments[1], i = -1, o = e.length >>> 0;
                if (!isFunction(t)) throw new TypeError;
                for (; ++i < o;) i in e && t.call(n, e[i], i, r)
            }
        }, !properlyBoxesContext(ArrayPrototype.forEach));
        var hasFirefox2IndexOfBug = Array.prototype.indexOf && -1 !== [0, 1].indexOf(1, 2);
        defineProperties(ArrayPrototype, {
            indexOf: function (t) {
                var r = splitString && isString(this) ? this.split("") : toObject(this), e = r.length >>> 0;
                if (!e) return -1;
                var n = 0;
                for (arguments.length > 1 && (n = toInteger(arguments[1])), n = n >= 0 ? n : Math.max(0, e + n); n < e; n++) if (n in r && r[n] === t) return n;
                return -1
            }
        }, hasFirefox2IndexOfBug);
        var string_split = StringPrototype.split;
        2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 4 !== "test".split(/(?:)/, -1).length || "".split(/.?/).length || ".".split(/()()/).length > 1 ? function () {
            var t = void 0 === /()??/.exec("")[1];
            StringPrototype.split = function (r, e) {
                var n = this;
                if (void 0 === r && 0 === e) return [];
                if ("[object RegExp]" !== _toString.call(r)) return string_split.call(this, r, e);
                var i, o, s, p, c = [], l = (r.ignoreCase ? "i" : "") + (r.multiline ? "m" : "") + (r.extended ? "x" : "") + (r.sticky ? "y" : ""), a = 0;
                for (r = new RegExp(r.source, l + "g"), n += "", t || (i = new RegExp("^" + r.source + "$(?!\\s)", l)), e = void 0 === e ? -1 >>> 0 : ToUint32(e); (o = r.exec(n)) && !((s = o.index + o[0].length) > a && (c.push(n.slice(a, o.index)), !t && o.length > 1 && o[0].replace(i, function () {
                    for (var t = 1; t < arguments.length - 2; t++) void 0 === arguments[t] && (o[t] = void 0)
                }), o.length > 1 && o.index < n.length && ArrayPrototype.push.apply(c, o.slice(1)), p = o[0].length, a = s, c.length >= e));) r.lastIndex === o.index && r.lastIndex++;
                return a === n.length ? !p && r.test("") || c.push("") : c.push(n.slice(a)), c.length > e ? c.slice(0, e) : c
            }
        }() : "0".split(void 0, 0).length && (StringPrototype.split = function (t, r) {
            return void 0 === t && 0 === r ? [] : string_split.call(this, t, r)
        });
        var string_substr = StringPrototype.substr, hasNegativeSubstrBug = "".substr && "b" !== "0b".substr(-1);
        defineProperties(StringPrototype, {
            substr: function (t, r) {
                return string_substr.call(this, t < 0 && (t = this.length + t) < 0 ? 0 : t, r)
            }
        }, hasNegativeSubstrBug);

    }, {}],
    28: [function (require, module, exports) {
        "use strict";
        module.exports = [require("./transport/websocket"), require("./transport/xhr-streaming"), require("./transport/xdr-streaming"), require("./transport/eventsource"), require("./transport/lib/iframe-wrap")(require("./transport/eventsource")), require("./transport/htmlfile"), require("./transport/lib/iframe-wrap")(require("./transport/htmlfile")), require("./transport/xhr-polling"), require("./transport/xdr-polling"), require("./transport/lib/iframe-wrap")(require("./transport/xhr-polling")), require("./transport/jsonp-polling")];

    }, {"./transport/eventsource": 32, "./transport/htmlfile": 33, "./transport/jsonp-polling": 35, "./transport/lib/iframe-wrap": 38, "./transport/websocket": 50, "./transport/xdr-polling": 51, "./transport/xdr-streaming": 52, "./transport/xhr-polling": 53, "./transport/xhr-streaming": 54}],
    29: [function (require, module, exports) {
        (function (process, global) {
            "use strict";
            var EventEmitter = require("events").EventEmitter, inherits = require("inherits"), utils = require("../../utils/event"), urlUtils = require("../../utils/url"), XHR = global.XMLHttpRequest, debug = function () {
            };

            function AbstractXHRObject(t, e, i, r) {
                debug(t, e);
                var s = this;
                EventEmitter.call(this), setTimeout(function () {
                    s._start(t, e, i, r)
                }, 0)
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:browser:xhr")), inherits(AbstractXHRObject, EventEmitter), AbstractXHRObject.prototype._start = function (t, e, i, r) {
                var s = this;
                try {
                    this.xhr = new XHR
                } catch (t) {
                }
                if (!this.xhr) return debug("no xhr"), this.emit("finish", 0, "no xhr support"), void this._cleanup();
                e = urlUtils.addQuery(e, "t=" + +new Date), this.unloadRef = utils.unloadAdd(function () {
                    debug("unload cleanup"), s._cleanup(!0)
                });
                try {
                    this.xhr.open(t, e, !0), this.timeout && "timeout" in this.xhr && (this.xhr.timeout = this.timeout, this.xhr.ontimeout = function () {
                        debug("xhr timeout"), s.emit("finish", 0, ""), s._cleanup(!1)
                    })
                } catch (t) {
                    return debug("exception", t), this.emit("finish", 0, ""), void this._cleanup(!1)
                }
                if (r && r.noCredentials || !AbstractXHRObject.supportsCORS || (debug("withCredentials"), this.xhr.withCredentials = !0), r && r.headers) for (var n in r.headers) this.xhr.setRequestHeader(n, r.headers[n]);
                this.xhr.onreadystatechange = function () {
                    if (s.xhr) {
                        var t, e, i = s.xhr;
                        switch (debug("readyState", i.readyState), i.readyState) {
                            case 3:
                                try {
                                    e = i.status, t = i.responseText
                                } catch (t) {
                                }
                                debug("status", e), 1223 === e && (e = 204), 200 === e && t && t.length > 0 && (debug("chunk"), s.emit("chunk", e, t));
                                break;
                            case 4:
                                e = i.status, debug("status", e), 1223 === e && (e = 204), 12005 !== e && 12029 !== e || (e = 0), debug("finish", e, i.responseText), s.emit("finish", e, i.responseText), s._cleanup(!1)
                        }
                    }
                };
                try {
                    s.xhr.send(i)
                } catch (t) {
                    s.emit("finish", 0, ""), s._cleanup(!1)
                }
            }, AbstractXHRObject.prototype._cleanup = function (t) {
                if (debug("cleanup"), this.xhr) {
                    if (this.removeAllListeners(), utils.unloadDel(this.unloadRef), this.xhr.onreadystatechange = function () {
                    }, this.xhr.ontimeout && (this.xhr.ontimeout = null), t) try {
                        this.xhr.abort()
                    } catch (t) {
                    }
                    this.unloadRef = this.xhr = null
                }
            }, AbstractXHRObject.prototype.close = function () {
                debug("close"), this._cleanup(!0)
            }, AbstractXHRObject.enabled = !!XHR;
            var axo = ["Active"].concat("Object").join("X");
            !AbstractXHRObject.enabled && axo in global && (debug("overriding xmlhttprequest"), XHR = function () {
                try {
                    return new global[axo]("Microsoft.XMLHTTP")
                } catch (t) {
                    return null
                }
            }, AbstractXHRObject.enabled = !!new XHR);
            var cors = !1;
            try {
                cors = "withCredentials" in new XHR
            } catch (t) {
            }
            AbstractXHRObject.supportsCORS = cors, module.exports = AbstractXHRObject;

        }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"../../utils/event": 58, "../../utils/url": 64, "_process": 10, "debug": 66, "events": 15, "inherits": 4}],
    30: [function (require, module, exports) {
        (function (global) {
            module.exports = global.EventSource;

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    31: [function (require, module, exports) {
        (function (global) {
            "use strict";
            var Driver = global.WebSocket || global.MozWebSocket;
            module.exports = Driver ? function (e) {
                return new Driver(e)
            } : void 0;

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    32: [function (require, module, exports) {
        "use strict";
        var inherits = require("inherits"), AjaxBasedTransport = require("./lib/ajax-based"), EventSourceReceiver = require("./receiver/eventsource"), XHRCorsObject = require("./sender/xhr-cors"), EventSourceDriver = require("eventsource");

        function EventSourceTransport(e) {
            if (!EventSourceTransport.enabled()) throw new Error("Transport created when disabled");
            AjaxBasedTransport.call(this, e, "/eventsource", EventSourceReceiver, XHRCorsObject)
        }

        inherits(EventSourceTransport, AjaxBasedTransport), EventSourceTransport.enabled = function () {
            return !!EventSourceDriver
        }, EventSourceTransport.transportName = "eventsource", EventSourceTransport.roundTrips = 2, module.exports = EventSourceTransport;

    }, {"./lib/ajax-based": 36, "./receiver/eventsource": 41, "./sender/xhr-cors": 47, "eventsource": 30, "inherits": 4}],
    33: [function (require, module, exports) {
        "use strict";
        var inherits = require("inherits"), HtmlfileReceiver = require("./receiver/htmlfile"), XHRLocalObject = require("./sender/xhr-local"), AjaxBasedTransport = require("./lib/ajax-based");

        function HtmlFileTransport(e) {
            if (!HtmlfileReceiver.enabled) throw new Error("Transport created when disabled");
            AjaxBasedTransport.call(this, e, "/htmlfile", HtmlfileReceiver, XHRLocalObject)
        }

        inherits(HtmlFileTransport, AjaxBasedTransport), HtmlFileTransport.enabled = function (e) {
            return HtmlfileReceiver.enabled && e.sameOrigin
        }, HtmlFileTransport.transportName = "htmlfile", HtmlFileTransport.roundTrips = 2, module.exports = HtmlFileTransport;

    }, {"./lib/ajax-based": 36, "./receiver/htmlfile": 42, "./sender/xhr-local": 49, "inherits": 4}],
    34: [function (require, module, exports) {
        (function (process) {
            "use strict";
            var inherits = require("inherits"), JSON3 = require("json3"), EventEmitter = require("events").EventEmitter, version = require("../version"), urlUtils = require("../utils/url"), iframeUtils = require("../utils/iframe"), eventUtils = require("../utils/event"),
                random = require("../utils/random"), debug = function () {
                };

            function IframeTransport(e, t, r) {
                if (!IframeTransport.enabled()) throw new Error("Transport created when disabled");
                EventEmitter.call(this);
                var s = this;
                this.origin = urlUtils.getOrigin(r), this.baseUrl = r, this.transUrl = t, this.transport = e, this.windowId = random.string(8);
                var i = urlUtils.addPath(r, "/iframe.html") + "#" + this.windowId;
                debug(e, t, i), this.iframeObj = iframeUtils.createIframe(i, function (e) {
                    debug("err callback"), s.emit("close", 1006, "Unable to load an iframe (" + e + ")"), s.close()
                }), this.onmessageCallback = this._message.bind(this), eventUtils.attachEvent("message", this.onmessageCallback)
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:transport:iframe")), inherits(IframeTransport, EventEmitter), IframeTransport.prototype.close = function () {
                if (debug("close"), this.removeAllListeners(), this.iframeObj) {
                    eventUtils.detachEvent("message", this.onmessageCallback);
                    try {
                        this.postMessage("c")
                    } catch (e) {
                    }
                    this.iframeObj.cleanup(), this.iframeObj = null, this.onmessageCallback = this.iframeObj = null
                }
            }, IframeTransport.prototype._message = function (e) {
                if (debug("message", e.data), urlUtils.isOriginEqual(e.origin, this.origin)) {
                    var t;
                    try {
                        t = JSON3.parse(e.data)
                    } catch (t) {
                        return void debug("bad json", e.data)
                    }
                    if (t.windowId === this.windowId) switch (t.type) {
                        case"s":
                            this.iframeObj.loaded(), this.postMessage("s", JSON3.stringify([version, this.transport, this.transUrl, this.baseUrl]));
                            break;
                        case"t":
                            this.emit("message", t.data);
                            break;
                        case"c":
                            var r;
                            try {
                                r = JSON3.parse(t.data)
                            } catch (e) {
                                return void debug("bad json", t.data)
                            }
                            this.emit("close", r[0], r[1]), this.close()
                    } else debug("mismatched window id", t.windowId, this.windowId)
                } else debug("not same origin", e.origin, this.origin)
            }, IframeTransport.prototype.postMessage = function (e, t) {
                debug("postMessage", e, t), this.iframeObj.post(JSON3.stringify({windowId: this.windowId, type: e, data: t || ""}), this.origin)
            }, IframeTransport.prototype.send = function (e) {
                debug("send", e), this.postMessage("m", e)
            }, IframeTransport.enabled = function () {
                return iframeUtils.iframeEnabled
            }, IframeTransport.transportName = "iframe", IframeTransport.roundTrips = 2, module.exports = IframeTransport;

        }).call(this, require('_process'))
    }, {"../utils/event": 58, "../utils/iframe": 59, "../utils/random": 62, "../utils/url": 64, "../version": 65, "_process": 10, "debug": 66, "events": 15, "inherits": 4, "json3": 5}],
    35: [function (require, module, exports) {
        (function (global) {
            "use strict";
            var inherits = require("inherits"), SenderReceiver = require("./lib/sender-receiver"), JsonpReceiver = require("./receiver/jsonp"), jsonpSender = require("./sender/jsonp");

            function JsonPTransport(e) {
                if (!JsonPTransport.enabled()) throw new Error("Transport created when disabled");
                SenderReceiver.call(this, e, "/jsonp", jsonpSender, JsonpReceiver)
            }

            inherits(JsonPTransport, SenderReceiver), JsonPTransport.enabled = function () {
                return !!global.document
            }, JsonPTransport.transportName = "jsonp-polling", JsonPTransport.roundTrips = 1, JsonPTransport.needBody = !0, module.exports = JsonPTransport;

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"./lib/sender-receiver": 40, "./receiver/jsonp": 43, "./sender/jsonp": 45, "inherits": 4}],
    36: [function (require, module, exports) {
        (function (process) {
            "use strict";
            var inherits = require("inherits"), urlUtils = require("../../utils/url"), SenderReceiver = require("./sender-receiver"), debug = function () {
            };

            function createAjaxSender(e) {
                return function (r, n, t) {
                    debug("create ajax sender", r, n);
                    var i = {};
                    "string" == typeof n && (i.headers = {"Content-type": "text/plain"});
                    var s = urlUtils.addPath(r, "/xhr_send"), a = new e("POST", s, n, i);
                    return a.once("finish", function (e) {
                        if (debug("finish", e), a = null, 200 !== e && 204 !== e) return t(new Error("http status " + e));
                        t()
                    }), function () {
                        debug("abort"), a.close(), a = null;
                        var e = new Error("Aborted");
                        e.code = 1e3, t(e)
                    }
                }
            }

            function AjaxBasedTransport(e, r, n, t) {
                SenderReceiver.call(this, e, r, createAjaxSender(t), n, t)
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:ajax-based")), inherits(AjaxBasedTransport, SenderReceiver), module.exports = AjaxBasedTransport;

        }).call(this, require('_process'))
    }, {"../../utils/url": 64, "./sender-receiver": 40, "_process": 10, "debug": 66, "inherits": 4}],
    37: [function (require, module, exports) {
        (function (process) {
            "use strict";
            var inherits = require("inherits"), EventEmitter = require("events").EventEmitter, debug = function () {
            };

            function BufferedSender(e, t) {
                debug(e), EventEmitter.call(this), this.sendBuffer = [], this.sender = t, this.url = e
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:buffered-sender")), inherits(BufferedSender, EventEmitter), BufferedSender.prototype.send = function (e) {
                debug("send", e), this.sendBuffer.push(e), this.sendStop || this.sendSchedule()
            }, BufferedSender.prototype.sendScheduleWait = function () {
                debug("sendScheduleWait");
                var e, t = this;
                this.sendStop = function () {
                    debug("sendStop"), t.sendStop = null, clearTimeout(e)
                }, e = setTimeout(function () {
                    debug("timeout"), t.sendStop = null, t.sendSchedule()
                }, 25)
            }, BufferedSender.prototype.sendSchedule = function () {
                debug("sendSchedule", this.sendBuffer.length);
                var e = this;
                if (this.sendBuffer.length > 0) {
                    var t = "[" + this.sendBuffer.join(",") + "]";
                    this.sendStop = this.sender(this.url, t, function (t) {
                        e.sendStop = null, t ? (debug("error", t), e.emit("close", t.code || 1006, "Sending error: " + t), e.close()) : e.sendScheduleWait()
                    }), this.sendBuffer = []
                }
            }, BufferedSender.prototype._cleanup = function () {
                debug("_cleanup"), this.removeAllListeners()
            }, BufferedSender.prototype.close = function () {
                debug("close"), this._cleanup(), this.sendStop && (this.sendStop(), this.sendStop = null)
            }, module.exports = BufferedSender;

        }).call(this, require('_process'))
    }, {"_process": 10, "debug": 66, "events": 15, "inherits": 4}],
    38: [function (require, module, exports) {
        (function (global) {
            "use strict";
            var inherits = require("inherits"), IframeTransport = require("../iframe"), objectUtils = require("../../utils/object");
            module.exports = function (r) {
                function e(e, t) {
                    IframeTransport.call(this, r.transportName, e, t)
                }

                return inherits(e, IframeTransport), e.enabled = function (e, t) {
                    if (!global.document) return !1;
                    var n = objectUtils.extend({}, t);
                    return n.sameOrigin = !0, r.enabled(n) && IframeTransport.enabled()
                }, e.transportName = "iframe-" + r.transportName, e.needBody = !0, e.roundTrips = IframeTransport.roundTrips + r.roundTrips - 1, e.facadeTransport = r, e
            };

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"../../utils/object": 61, "../iframe": 34, "inherits": 4}],
    39: [function (require, module, exports) {
        (function (process) {
            "use strict";
            var inherits = require("inherits"), EventEmitter = require("events").EventEmitter, debug = function () {
            };

            function Polling(e, i, t) {
                debug(i), EventEmitter.call(this), this.Receiver = e, this.receiveUrl = i, this.AjaxObject = t, this._scheduleReceiver()
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:polling")), inherits(Polling, EventEmitter), Polling.prototype._scheduleReceiver = function () {
                debug("_scheduleReceiver");
                var e = this, i = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);
                i.on("message", function (i) {
                    debug("message", i), e.emit("message", i)
                }), i.once("close", function (t, l) {
                    debug("close", t, l, e.pollIsClosing), e.poll = i = null, e.pollIsClosing || ("network" === l ? e._scheduleReceiver() : (e.emit("close", t || 1006, l), e.removeAllListeners()))
                })
            }, Polling.prototype.abort = function () {
                debug("abort"), this.removeAllListeners(), this.pollIsClosing = !0, this.poll && this.poll.abort()
            }, module.exports = Polling;

        }).call(this, require('_process'))
    }, {"_process": 10, "debug": 66, "events": 15, "inherits": 4}],
    40: [function (require, module, exports) {
        (function (process) {
            "use strict";
            var inherits = require("inherits"), urlUtils = require("../../utils/url"), BufferedSender = require("./buffered-sender"), Polling = require("./polling"), debug = function () {
            };

            function SenderReceiver(e, l, r, i, s) {
                var o = urlUtils.addPath(e, l);
                debug(o);
                var n = this;
                BufferedSender.call(this, e, r), this.poll = new Polling(i, o, s), this.poll.on("message", function (e) {
                    debug("poll message", e), n.emit("message", e)
                }), this.poll.once("close", function (e, l) {
                    debug("poll close", e, l), n.poll = null, n.emit("close", e, l), n.close()
                })
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:sender-receiver")), inherits(SenderReceiver, BufferedSender), SenderReceiver.prototype.close = function () {
                BufferedSender.prototype.close.call(this), debug("close"), this.removeAllListeners(), this.poll && (this.poll.abort(), this.poll = null)
            }, module.exports = SenderReceiver;

        }).call(this, require('_process'))
    }, {"../../utils/url": 64, "./buffered-sender": 37, "./polling": 39, "_process": 10, "debug": 66, "inherits": 4}],
    41: [function (require, module, exports) {
        (function (process) {
            "use strict";
            var inherits = require("inherits"), EventEmitter = require("events").EventEmitter, EventSourceDriver = require("eventsource"), debug = function () {
            };

            function EventSourceReceiver(e) {
                debug(e), EventEmitter.call(this);
                var t = this, r = this.es = new EventSourceDriver(e);
                r.onmessage = function (e) {
                    debug("message", e.data), t.emit("message", decodeURI(e.data))
                }, r.onerror = function (e) {
                    debug("error", r.readyState, e);
                    var n = 2 !== r.readyState ? "network" : "permanent";
                    t._cleanup(), t._close(n)
                }
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:receiver:eventsource")), inherits(EventSourceReceiver, EventEmitter), EventSourceReceiver.prototype.abort = function () {
                debug("abort"), this._cleanup(), this._close("user")
            }, EventSourceReceiver.prototype._cleanup = function () {
                debug("cleanup");
                var e = this.es;
                e && (e.onmessage = e.onerror = null, e.close(), this.es = null)
            }, EventSourceReceiver.prototype._close = function (e) {
                debug("close", e);
                var t = this;
                setTimeout(function () {
                    t.emit("close", null, e), t.removeAllListeners()
                }, 200)
            }, module.exports = EventSourceReceiver;

        }).call(this, require('_process'))
    }, {"_process": 10, "debug": 66, "events": 15, "eventsource": 30, "inherits": 4}],
    42: [function (require, module, exports) {
        (function (process, global) {
            "use strict";
            var inherits = require("inherits"), iframeUtils = require("../../utils/iframe"), urlUtils = require("../../utils/url"), EventEmitter = require("events").EventEmitter, random = require("../../utils/random"), debug = function () {
            };

            function HtmlfileReceiver(e) {
                debug(e), EventEmitter.call(this);
                var i = this;
                iframeUtils.polluteGlobalNamespace(), this.id = "a" + random.string(6), e = urlUtils.addQuery(e, "c=" + decodeURIComponent(iframeUtils.WPrefix + "." + this.id)), debug("using htmlfile", HtmlfileReceiver.htmlfileEnabled);
                var t = HtmlfileReceiver.htmlfileEnabled ? iframeUtils.createHtmlfile : iframeUtils.createIframe;
                global[iframeUtils.WPrefix][this.id] = {
                    start: function () {
                        debug("start"), i.iframeObj.loaded()
                    }, message: function (e) {
                        debug("message", e), i.emit("message", e)
                    }, stop: function () {
                        debug("stop"), i._cleanup(), i._close("network")
                    }
                }, this.iframeObj = t(e, function () {
                    debug("callback"), i._cleanup(), i._close("permanent")
                })
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:receiver:htmlfile")), inherits(HtmlfileReceiver, EventEmitter), HtmlfileReceiver.prototype.abort = function () {
                debug("abort"), this._cleanup(), this._close("user")
            }, HtmlfileReceiver.prototype._cleanup = function () {
                debug("_cleanup"), this.iframeObj && (this.iframeObj.cleanup(), this.iframeObj = null), delete global[iframeUtils.WPrefix][this.id]
            }, HtmlfileReceiver.prototype._close = function (e) {
                debug("_close", e), this.emit("close", null, e), this.removeAllListeners()
            }, HtmlfileReceiver.htmlfileEnabled = !1;
            var axo = ["Active"].concat("Object").join("X");
            if (axo in global) try {
                HtmlfileReceiver.htmlfileEnabled = !!new global[axo]("htmlfile")
            } catch (e) {
            }
            HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled, module.exports = HtmlfileReceiver;

        }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"../../utils/iframe": 59, "../../utils/random": 62, "../../utils/url": 64, "_process": 10, "debug": 66, "events": 15, "inherits": 4}],
    43: [function (require, module, exports) {
        (function (process, global) {
            "use strict";
            var utils = require("../../utils/iframe"), random = require("../../utils/random"), browser = require("../../utils/browser"), urlUtils = require("../../utils/url"), inherits = require("inherits"), EventEmitter = require("events").EventEmitter, debug = function () {
            };

            function JsonpReceiver(e) {
                debug(e);
                var t = this;
                EventEmitter.call(this), utils.polluteGlobalNamespace(), this.id = "a" + random.string(6);
                var r = urlUtils.addQuery(e, "c=" + encodeURIComponent(utils.WPrefix + "." + this.id));
                global[utils.WPrefix][this.id] = this._callback.bind(this), this._createScript(r), this.timeoutId = setTimeout(function () {
                    debug("timeout"), t._abort(new Error("JSONP script loaded abnormally (timeout)"))
                }, JsonpReceiver.timeout)
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:receiver:jsonp")), inherits(JsonpReceiver, EventEmitter), JsonpReceiver.prototype.abort = function () {
                if (debug("abort"), global[utils.WPrefix][this.id]) {
                    var e = new Error("JSONP user aborted read");
                    e.code = 1e3, this._abort(e)
                }
            }, JsonpReceiver.timeout = 35e3, JsonpReceiver.scriptErrorTimeout = 1e3, JsonpReceiver.prototype._callback = function (e) {
                debug("_callback", e), this._cleanup(), this.aborting || (e && (debug("message", e), this.emit("message", e)), this.emit("close", null, "network"), this.removeAllListeners())
            }, JsonpReceiver.prototype._abort = function (e) {
                debug("_abort", e), this._cleanup(), this.aborting = !0, this.emit("close", e.code, e.message), this.removeAllListeners()
            }, JsonpReceiver.prototype._cleanup = function () {
                if (debug("_cleanup"), clearTimeout(this.timeoutId), this.script2 && (this.script2.parentNode.removeChild(this.script2), this.script2 = null), this.script) {
                    var e = this.script;
                    e.parentNode.removeChild(e), e.onreadystatechange = e.onerror = e.onload = e.onclick = null, this.script = null
                }
                delete global[utils.WPrefix][this.id]
            }, JsonpReceiver.prototype._scriptError = function () {
                debug("_scriptError");
                var e = this;
                this.errorTimer || (this.errorTimer = setTimeout(function () {
                    e.loadedOkay || e._abort(new Error("JSONP script loaded abnormally (onerror)"))
                }, JsonpReceiver.scriptErrorTimeout))
            }, JsonpReceiver.prototype._createScript = function (e) {
                debug("_createScript", e);
                var t, r = this, i = this.script = global.document.createElement("script");
                if (i.id = "a" + random.string(8), i.src = e, i.type = "text/javascript", i.charset = "UTF-8", i.onerror = this._scriptError.bind(this), i.onload = function () {
                    debug("onload"), r._abort(new Error("JSONP script loaded abnormally (onload)"))
                }, i.onreadystatechange = function () {
                    if (debug("onreadystatechange", i.readyState), /loaded|closed/.test(i.readyState)) {
                        if (i && i.htmlFor && i.onclick) {
                            r.loadedOkay = !0;
                            try {
                                i.onclick()
                            } catch (e) {
                            }
                        }
                        i && r._abort(new Error("JSONP script loaded abnormally (onreadystatechange)"))
                    }
                }, void 0 === i.async && global.document.attachEvent) if (browser.isOpera()) (t = this.script2 = global.document.createElement("script")).text = "try{var a = document.getElementById('" + i.id + "'); if(a)a.onerror();}catch(x){};", i.async = t.async = !1; else {
                    try {
                        i.htmlFor = i.id, i.event = "onclick"
                    } catch (e) {
                    }
                    i.async = !0
                }
                void 0 !== i.async && (i.async = !0);
                var o = global.document.getElementsByTagName("head")[0];
                o.insertBefore(i, o.firstChild), t && o.insertBefore(t, o.firstChild)
            }, module.exports = JsonpReceiver;

        }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"../../utils/browser": 56, "../../utils/iframe": 59, "../../utils/random": 62, "../../utils/url": 64, "_process": 10, "debug": 66, "events": 15, "inherits": 4}],
    44: [function (require, module, exports) {
        (function (process) {
            "use strict";
            var inherits = require("inherits"), EventEmitter = require("events").EventEmitter, debug = function () {
            };

            function XhrReceiver(e, i) {
                debug(e), EventEmitter.call(this);
                var t = this;
                this.bufferPosition = 0, this.xo = new i("POST", e, null), this.xo.on("chunk", this._chunkHandler.bind(this)), this.xo.once("finish", function (e, i) {
                    debug("finish", e, i), t._chunkHandler(e, i), t.xo = null;
                    var r = 200 === e ? "network" : "permanent";
                    debug("close", r), t.emit("close", null, r), t._cleanup()
                })
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:receiver:xhr")), inherits(XhrReceiver, EventEmitter), XhrReceiver.prototype._chunkHandler = function (e, i) {
                if (debug("_chunkHandler", e), 200 === e && i) for (var t = -1; ; this.bufferPosition += t + 1) {
                    var r = i.slice(this.bufferPosition);
                    if (-1 === (t = r.indexOf("\n"))) break;
                    var n = r.slice(0, t);
                    n && (debug("message", n), this.emit("message", n))
                }
            }, XhrReceiver.prototype._cleanup = function () {
                debug("_cleanup"), this.removeAllListeners()
            }, XhrReceiver.prototype.abort = function () {
                debug("abort"), this.xo && (this.xo.close(), debug("close"), this.emit("close", null, "user"), this.xo = null), this._cleanup()
            }, module.exports = XhrReceiver;

        }).call(this, require('_process'))
    }, {"_process": 10, "debug": 66, "events": 15, "inherits": 4}],
    45: [function (require, module, exports) {
        (function (process, global) {
            "use strict";
            var form, area, random = require("../../utils/random"), urlUtils = require("../../utils/url"), debug = function () {
            };

            function createIframe(e) {
                debug("createIframe", e);
                try {
                    return global.document.createElement('<iframe name="' + e + '">')
                } catch (o) {
                    var r = global.document.createElement("iframe");
                    return r.name = e, r
                }
            }

            function createForm() {
                debug("createForm"), (form = global.document.createElement("form")).style.display = "none", form.style.position = "absolute", form.method = "POST", form.enctype = "application/x-www-form-urlencoded", form.acceptCharset = "UTF-8", (area = global.document.createElement("textarea")).name = "d", form.appendChild(area), global.document.body.appendChild(form)
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:sender:jsonp")), module.exports = function (e, r, o) {
                debug(e, r), form || createForm();
                var a = "a" + random.string(8);
                form.target = a, form.action = urlUtils.addQuery(urlUtils.addPath(e, "/jsonp_send"), "i=" + a);
                var t = createIframe(a);
                t.id = a, t.style.display = "none", form.appendChild(t);
                try {
                    area.value = r
                } catch (e) {
                }
                form.submit();
                var n = function (e) {
                    debug("completed", a, e), t.onerror && (t.onreadystatechange = t.onerror = t.onload = null, setTimeout(function () {
                        debug("cleaning up", a), t.parentNode.removeChild(t), t = null
                    }, 500), area.value = "", o(e))
                };
                return t.onerror = function () {
                    debug("onerror", a), n()
                }, t.onload = function () {
                    debug("onload", a), n()
                }, t.onreadystatechange = function (e) {
                    debug("onreadystatechange", a, t.readyState, e), "complete" === t.readyState && n()
                }, function () {
                    debug("aborted", a), n(new Error("Aborted"))
                }
            };

        }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"../../utils/random": 62, "../../utils/url": 64, "_process": 10, "debug": 66}],
    46: [function (require, module, exports) {
        (function (process, global) {
            "use strict";
            var EventEmitter = require("events").EventEmitter, inherits = require("inherits"), eventUtils = require("../../utils/event"), browser = require("../../utils/browser"), urlUtils = require("../../utils/url"), debug = function () {
            };

            function XDRObject(e, t, r) {
                debug(e, t);
                var i = this;
                EventEmitter.call(this), setTimeout(function () {
                    i._start(e, t, r)
                }, 0)
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:sender:xdr")), inherits(XDRObject, EventEmitter), XDRObject.prototype._start = function (e, t, r) {
                debug("_start");
                var i = this, n = new global.XDomainRequest;
                t = urlUtils.addQuery(t, "t=" + +new Date), n.onerror = function () {
                    debug("onerror"), i._error()
                }, n.ontimeout = function () {
                    debug("ontimeout"), i._error()
                }, n.onprogress = function () {
                    debug("progress", n.responseText), i.emit("chunk", 200, n.responseText)
                }, n.onload = function () {
                    debug("load"), i.emit("finish", 200, n.responseText), i._cleanup(!1)
                }, this.xdr = n, this.unloadRef = eventUtils.unloadAdd(function () {
                    i._cleanup(!0)
                });
                try {
                    this.xdr.open(e, t), this.timeout && (this.xdr.timeout = this.timeout), this.xdr.send(r)
                } catch (e) {
                    this._error()
                }
            }, XDRObject.prototype._error = function () {
                this.emit("finish", 0, ""), this._cleanup(!1)
            }, XDRObject.prototype._cleanup = function (e) {
                if (debug("cleanup", e), this.xdr) {
                    if (this.removeAllListeners(), eventUtils.unloadDel(this.unloadRef), this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null, e) try {
                        this.xdr.abort()
                    } catch (e) {
                    }
                    this.unloadRef = this.xdr = null
                }
            }, XDRObject.prototype.close = function () {
                debug("close"), this._cleanup(!0)
            }, XDRObject.enabled = !(!global.XDomainRequest || !browser.hasDomain()), module.exports = XDRObject;

        }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"../../utils/browser": 56, "../../utils/event": 58, "../../utils/url": 64, "_process": 10, "debug": 66, "events": 15, "inherits": 4}],
    47: [function (require, module, exports) {
        "use strict";
        var inherits = require("inherits"), XhrDriver = require("../driver/xhr");

        function XHRCorsObject(r, e, i, s) {
            XhrDriver.call(this, r, e, i, s)
        }

        inherits(XHRCorsObject, XhrDriver), XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS, module.exports = XHRCorsObject;

    }, {"../driver/xhr": 29, "inherits": 4}],
    48: [function (require, module, exports) {
        "use strict";
        var EventEmitter = require("events").EventEmitter, inherits = require("inherits");

        function XHRFake() {
            var t = this;
            EventEmitter.call(this), this.to = setTimeout(function () {
                t.emit("finish", 200, "{}")
            }, XHRFake.timeout)
        }

        inherits(XHRFake, EventEmitter), XHRFake.prototype.close = function () {
            clearTimeout(this.to)
        }, XHRFake.timeout = 2e3, module.exports = XHRFake;

    }, {"events": 15, "inherits": 4}],
    49: [function (require, module, exports) {
        "use strict";
        var inherits = require("inherits"), XhrDriver = require("../driver/xhr");

        function XHRLocalObject(r, e, i) {
            XhrDriver.call(this, r, e, i, {noCredentials: !0})
        }

        inherits(XHRLocalObject, XhrDriver), XHRLocalObject.enabled = XhrDriver.enabled, module.exports = XHRLocalObject;

    }, {"../driver/xhr": 29, "inherits": 4}],
    50: [function (require, module, exports) {
        (function (process) {
            "use strict";
            var utils = require("../utils/event"), urlUtils = require("../utils/url"), inherits = require("inherits"), EventEmitter = require("events").EventEmitter, WebsocketDriver = require("./driver/websocket"), debug = function () {
            };

            function WebSocketTransport(e, t, s) {
                if (!WebSocketTransport.enabled()) throw new Error("Transport created when disabled");
                EventEmitter.call(this), debug("constructor", e);
                var r = this, o = urlUtils.addPath(e, "/websocket");
                o = "https" === o.slice(0, 5) ? "wss" + o.slice(5) : "ws" + o.slice(4), this.url = o, this.ws = new WebsocketDriver(this.url, [], s), this.ws.onmessage = function (e) {
                    debug("message event", e.data), r.emit("message", e.data)
                }, this.unloadRef = utils.unloadAdd(function () {
                    debug("unload"), r.ws.close()
                }), this.ws.onclose = function (e) {
                    debug("close event", e.code, e.reason), r.emit("close", e.code, e.reason), r._cleanup()
                }, this.ws.onerror = function (e) {
                    debug("error event", e), r.emit("close", 1006, "WebSocket connection broken"), r._cleanup()
                }
            }

            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:websocket")), inherits(WebSocketTransport, EventEmitter), WebSocketTransport.prototype.send = function (e) {
                var t = "[" + e + "]";
                debug("send", t), this.ws.send(t)
            }, WebSocketTransport.prototype.close = function () {
                debug("close");
                var e = this.ws;
                this._cleanup(), e && e.close()
            }, WebSocketTransport.prototype._cleanup = function () {
                debug("_cleanup");
                var e = this.ws;
                e && (e.onmessage = e.onclose = e.onerror = null), utils.unloadDel(this.unloadRef), this.unloadRef = this.ws = null, this.removeAllListeners()
            }, WebSocketTransport.enabled = function () {
                return debug("enabled"), !!WebsocketDriver
            }, WebSocketTransport.transportName = "websocket", WebSocketTransport.roundTrips = 2, module.exports = WebSocketTransport;

        }).call(this, require('_process'))
    }, {"../utils/event": 58, "../utils/url": 64, "./driver/websocket": 31, "_process": 10, "debug": 66, "events": 15, "inherits": 4}],
    51: [function (require, module, exports) {
        "use strict";
        var inherits = require("inherits"), AjaxBasedTransport = require("./lib/ajax-based"), XdrStreamingTransport = require("./xdr-streaming"), XhrReceiver = require("./receiver/xhr"), XDRObject = require("./sender/xdr");

        function XdrPollingTransport(r) {
            if (!XDRObject.enabled) throw new Error("Transport created when disabled");
            AjaxBasedTransport.call(this, r, "/xhr", XhrReceiver, XDRObject)
        }

        inherits(XdrPollingTransport, AjaxBasedTransport), XdrPollingTransport.enabled = XdrStreamingTransport.enabled, XdrPollingTransport.transportName = "xdr-polling", XdrPollingTransport.roundTrips = 2, module.exports = XdrPollingTransport;

    }, {"./lib/ajax-based": 36, "./receiver/xhr": 44, "./sender/xdr": 46, "./xdr-streaming": 52, "inherits": 4}],
    52: [function (require, module, exports) {
        "use strict";
        var inherits = require("inherits"), AjaxBasedTransport = require("./lib/ajax-based"), XhrReceiver = require("./receiver/xhr"), XDRObject = require("./sender/xdr");

        function XdrStreamingTransport(r) {
            if (!XDRObject.enabled) throw new Error("Transport created when disabled");
            AjaxBasedTransport.call(this, r, "/xhr_streaming", XhrReceiver, XDRObject)
        }

        inherits(XdrStreamingTransport, AjaxBasedTransport), XdrStreamingTransport.enabled = function (r) {
            return !r.cookie_needed && !r.nullOrigin && (XDRObject.enabled && r.sameScheme)
        }, XdrStreamingTransport.transportName = "xdr-streaming", XdrStreamingTransport.roundTrips = 2, module.exports = XdrStreamingTransport;

    }, {"./lib/ajax-based": 36, "./receiver/xhr": 44, "./sender/xdr": 46, "inherits": 4}],
    53: [function (require, module, exports) {
        "use strict";
        var inherits = require("inherits"), AjaxBasedTransport = require("./lib/ajax-based"), XhrReceiver = require("./receiver/xhr"), XHRCorsObject = require("./sender/xhr-cors"), XHRLocalObject = require("./sender/xhr-local");

        function XhrPollingTransport(r) {
            if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) throw new Error("Transport created when disabled");
            AjaxBasedTransport.call(this, r, "/xhr", XhrReceiver, XHRCorsObject)
        }

        inherits(XhrPollingTransport, AjaxBasedTransport), XhrPollingTransport.enabled = function (r) {
            return !r.nullOrigin && (!(!XHRLocalObject.enabled || !r.sameOrigin) || XHRCorsObject.enabled)
        }, XhrPollingTransport.transportName = "xhr-polling", XhrPollingTransport.roundTrips = 2, module.exports = XhrPollingTransport;

    }, {"./lib/ajax-based": 36, "./receiver/xhr": 44, "./sender/xhr-cors": 47, "./sender/xhr-local": 49, "inherits": 4}],
    54: [function (require, module, exports) {
        (function (global) {
            "use strict";
            var inherits = require("inherits"), AjaxBasedTransport = require("./lib/ajax-based"), XhrReceiver = require("./receiver/xhr"), XHRCorsObject = require("./sender/xhr-cors"), XHRLocalObject = require("./sender/xhr-local"), browser = require("../utils/browser");

            function XhrStreamingTransport(r) {
                if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) throw new Error("Transport created when disabled");
                AjaxBasedTransport.call(this, r, "/xhr_streaming", XhrReceiver, XHRCorsObject)
            }

            inherits(XhrStreamingTransport, AjaxBasedTransport), XhrStreamingTransport.enabled = function (r) {
                return !r.nullOrigin && (!browser.isOpera() && XHRCorsObject.enabled)
            }, XhrStreamingTransport.transportName = "xhr-streaming", XhrStreamingTransport.roundTrips = 2, XhrStreamingTransport.needBody = !!global.document, module.exports = XhrStreamingTransport;

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"../utils/browser": 56, "./lib/ajax-based": 36, "./receiver/xhr": 44, "./sender/xhr-cors": 47, "./sender/xhr-local": 49, "inherits": 4}],
    55: [function (require, module, exports) {
        (function (global) {
            "use strict";
            global.crypto && global.crypto.getRandomValues ? module.exports.randomBytes = function (r) {
                var o = new Uint8Array(r);
                return global.crypto.getRandomValues(o), o
            } : module.exports.randomBytes = function (r) {
                for (var o = new Array(r), t = 0; t < r; t++) o[t] = Math.floor(256 * Math.random());
                return o
            };

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    56: [function (require, module, exports) {
        (function (global) {
            "use strict";
            module.exports = {
                isOpera: function () {
                    return global.navigator && /opera/i.test(global.navigator.userAgent)
                }, isKonqueror: function () {
                    return global.navigator && /konqueror/i.test(global.navigator.userAgent)
                }, hasDomain: function () {
                    if (!global.document) return !0;
                    try {
                        return !!global.document.domain
                    } catch (r) {
                        return !1
                    }
                }
            };

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    57: [function (require, module, exports) {
        "use strict";
        var extraLookup, JSON3 = require("json3"),
            extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,
            unrollLookup = function (u) {
                var f, a = {}, e = [];
                for (f = 0; f < 65536; f++) e.push(String.fromCharCode(f));
                return u.lastIndex = 0, e.join("").replace(u, function (u) {
                    return a[u] = "\\u" + ("0000" + u.charCodeAt(0).toString(16)).slice(-4), ""
                }), u.lastIndex = 0, a
            };
        module.exports = {
            quote: function (u) {
                var f = JSON3.stringify(u);
                return extraEscapable.lastIndex = 0, extraEscapable.test(f) ? (extraLookup || (extraLookup = unrollLookup(extraEscapable)), f.replace(extraEscapable, function (u) {
                    return extraLookup[u]
                })) : f
            }
        };

    }, {"json3": 5}],
    58: [function (require, module, exports) {
        (function (global) {
            "use strict";
            var random = require("./random"), onUnload = {}, afterUnload = !1, isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime;
            module.exports = {
                attachEvent: function (a, o) {
                    void 0 !== global.addEventListener ? global.addEventListener(a, o, !1) : global.document && global.attachEvent && (global.document.attachEvent("on" + a, o), global.attachEvent("on" + a, o))
                }, detachEvent: function (a, o) {
                    void 0 !== global.addEventListener ? global.removeEventListener(a, o, !1) : global.document && global.detachEvent && (global.document.detachEvent("on" + a, o), global.detachEvent("on" + a, o))
                }, unloadAdd: function (a) {
                    if (isChromePackagedApp) return null;
                    var o = random.string(8);
                    return onUnload[o] = a, afterUnload && setTimeout(this.triggerUnloadCallbacks, 0), o
                }, unloadDel: function (a) {
                    a in onUnload && delete onUnload[a]
                }, triggerUnloadCallbacks: function () {
                    for (var a in onUnload) onUnload[a](), delete onUnload[a]
                }
            };
            var unloadTriggered = function () {
                afterUnload || (afterUnload = !0, module.exports.triggerUnloadCallbacks())
            };
            isChromePackagedApp || module.exports.attachEvent("unload", unloadTriggered);

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"./random": 62}],
    59: [function (require, module, exports) {
        (function (process, global) {
            "use strict";
            var eventUtils = require("./event"), JSON3 = require("json3"), browser = require("./browser"), debug = function () {
            };
            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:utils:iframe")), module.exports = {
                WPrefix: "_jp", currentWindowId: null, polluteGlobalNamespace: function () {
                    module.exports.WPrefix in global || (global[module.exports.WPrefix] = {})
                }, postMessage: function (e, o) {
                    global.parent !== global ? global.parent.postMessage(JSON3.stringify({windowId: module.exports.currentWindowId, type: e, data: o || ""}), "*") : debug("Cannot postMessage, no parent window.", e, o)
                }, createIframe: function (e, o) {
                    var t, n, r = global.document.createElement("iframe"), l = function () {
                        debug("unattach"), clearTimeout(t);
                        try {
                            r.onload = null
                        } catch (e) {
                        }
                        r.onerror = null
                    }, i = function () {
                        debug("cleanup"), r && (l(), setTimeout(function () {
                            r && r.parentNode.removeChild(r), r = null
                        }, 0), eventUtils.unloadDel(n))
                    }, u = function (e) {
                        debug("onerror", e), r && (i(), o(e))
                    };
                    return r.src = e, r.style.display = "none", r.style.position = "absolute", r.onerror = function () {
                        u("onerror")
                    }, r.onload = function () {
                        debug("onload"), clearTimeout(t), t = setTimeout(function () {
                            u("onload timeout")
                        }, 2e3)
                    }, global.document.body.appendChild(r), t = setTimeout(function () {
                        u("timeout")
                    }, 15e3), n = eventUtils.unloadAdd(i), {
                        post: function (e, o) {
                            debug("post", e, o), setTimeout(function () {
                                try {
                                    r && r.contentWindow && r.contentWindow.postMessage(e, o)
                                } catch (e) {
                                }
                            }, 0)
                        }, cleanup: i, loaded: l
                    }
                }, createHtmlfile: function (e, o) {
                    var t, n, r, l = ["Active"].concat("Object").join("X"), i = new global[l]("htmlfile"), u = function () {
                        clearTimeout(t), r.onerror = null
                    }, a = function () {
                        i && (u(), eventUtils.unloadDel(n), r.parentNode.removeChild(r), r = i = null, CollectGarbage())
                    }, d = function (e) {
                        debug("onerror", e), i && (a(), o(e))
                    };
                    i.open(), i.write('<html><script>document.domain="' + global.document.domain + '";<\/script></html>'), i.close(), i.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
                    var c = i.createElement("div");
                    return i.body.appendChild(c), r = i.createElement("iframe"), c.appendChild(r), r.src = e, r.onerror = function () {
                        d("onerror")
                    }, t = setTimeout(function () {
                        d("timeout")
                    }, 15e3), n = eventUtils.unloadAdd(a), {
                        post: function (e, o) {
                            try {
                                setTimeout(function () {
                                    r && r.contentWindow && r.contentWindow.postMessage(e, o)
                                }, 0)
                            } catch (e) {
                            }
                        }, cleanup: a, loaded: u
                    }
                }
            }, module.exports.iframeEnabled = !1, global.document && (module.exports.iframeEnabled = ("function" == typeof global.postMessage || "object" == typeof global.postMessage) && !browser.isKonqueror());

        }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"./browser": 56, "./event": 58, "_process": 10, "debug": 66, "json3": 5}],
    60: [function (require, module, exports) {
        (function (global) {
            "use strict";
            var logObject = {};
            ["log", "debug", "warn"].forEach(function (o) {
                var l;
                try {
                    l = global.console && global.console[o] && global.console[o].apply
                } catch (o) {
                }
                logObject[o] = l ? function () {
                    return global.console[o].apply(global.console, arguments)
                } : "log" === o ? function () {
                } : logObject.log
            }), module.exports = logObject;

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    61: [function (require, module, exports) {
        "use strict";
        module.exports = {
            isObject: function (t) {
                var e = typeof t;
                return "function" === e || "object" === e && !!t
            }, extend: function (t) {
                if (!this.isObject(t)) return t;
                for (var e, r, n = 1, o = arguments.length; n < o; n++) for (r in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                return t
            }
        };

    }, {}],
    62: [function (require, module, exports) {
        "use strict";
        var crypto = require("crypto"), _randomStringChars = "abcdefghijklmnopqrstuvwxyz012345";
        module.exports = {
            string: function (r) {
                for (var n = _randomStringChars.length, t = crypto.randomBytes(r), o = [], e = 0; e < r; e++) o.push(_randomStringChars.substr(t[e] % n, 1));
                return o.join("")
            }, number: function (r) {
                return Math.floor(Math.random() * r)
            }, numberString: function (r) {
                var n = ("" + (r - 1)).length;
                return (new Array(n + 1).join("0") + this.number(r)).slice(-n)
            }
        };

    }, {"crypto": 55}],
    63: [function (require, module, exports) {
        (function (process) {
            "use strict";
            var debug = function () {
            };
            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:utils:transport")), module.exports = function (e) {
                return {
                    filterToEnabled: function (t, r) {
                        var a = {main: [], facade: []};
                        return t ? "string" == typeof t && (t = [t]) : t = [], e.forEach(function (e) {
                            e && ("websocket" !== e.transportName || !1 !== r.websocket ? t.length && -1 === t.indexOf(e.transportName) ? debug("not in whitelist", e.transportName) : e.enabled(r) ? (debug("enabled", e.transportName), a.main.push(e), e.facadeTransport && a.facade.push(e.facadeTransport)) : debug("disabled", e.transportName) : debug("disabled from server", "websocket"))
                        }), a
                    }
                }
            };

        }).call(this, require('_process'))
    }, {"_process": 10, "debug": 66}],
    64: [function (require, module, exports) {
        (function (process) {
            "use strict";
            var URL = require("url-parse"), debug = function () {
            };
            "production" !== process.env.NODE_ENV && (debug = require("debug")("sockjs-client:utils:url")), module.exports = {
                getOrigin: function (r) {
                    if (!r) return null;
                    var t = new URL(r);
                    if ("file:" === t.protocol) return null;
                    var e = t.port;
                    return e || (e = "https:" === t.protocol ? "443" : "80"), t.protocol + "//" + t.hostname + ":" + e
                }, isOriginEqual: function (r, t) {
                    var e = this.getOrigin(r) === this.getOrigin(t);
                    return debug("same", r, t, e), e
                }, isSchemeEqual: function (r, t) {
                    return r.split(":")[0] === t.split(":")[0]
                }, addPath: function (r, t) {
                    var e = r.split("?");
                    return e[0] + t + (e[1] ? "?" + e[1] : "")
                }, addQuery: function (r, t) {
                    return r + (-1 === r.indexOf("?") ? "?" + t : "&" + t)
                }
            };

        }).call(this, require('_process'))
    }, {"_process": 10, "debug": 66, "url-parse": 69}],
    65: [function (require, module, exports) {
        module.exports = "1.3.0";

    }, {}],
    66: [function (require, module, exports) {
        (function (process) {
            "use strict";

            function _typeof(e) {
                return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                } : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function useColors() {
                return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type && !window.process.__nwjs) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
            }

            function formatArgs(e) {
                if (e[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff), this.useColors) {
                    var o = "color: " + this.color;
                    e.splice(1, 0, o, "color: inherit");
                    var t = 0, C = 0;
                    e[0].replace(/%[a-zA-Z%]/g, function (e) {
                        "%%" !== e && "%c" === e && (C = ++t)
                    }), e.splice(C, 0, o)
                }
            }

            function log() {
                var e;
                return "object" === ("undefined" == typeof console ? "undefined" : _typeof(console)) && console.log && (e = console).log.apply(e, arguments)
            }

            function save(e) {
                try {
                    e ? exports.storage.setItem("debug", e) : exports.storage.removeItem("debug")
                } catch (e) {
                }
            }

            function load() {
                var e;
                try {
                    e = exports.storage.getItem("debug")
                } catch (e) {
                }
                return !e && "undefined" != typeof process && "env" in process && (e = process.env.DEBUG), e
            }

            function localstorage() {
                try {
                    return localStorage
                } catch (e) {
                }
            }

            exports.log = log, exports.formatArgs = formatArgs, exports.save = save, exports.load = load, exports.useColors = useColors, exports.storage = localstorage(), exports.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], module.exports = require("./common")(exports);
            var formatters = module.exports.formatters;
            formatters.j = function (e) {
                try {
                    return JSON.stringify(e)
                } catch (e) {
                    return "[UnexpectedJSONParseError]: " + e.message
                }
            };

        }).call(this, require('_process'))
    }, {"./common": 67, "_process": 10}],
    67: [function (require, module, exports) {
        "use strict";

        function setup(e) {
            function n(e) {
                for (var n = 0, t = 0; t < e.length; t++) n = (n << 5) - n + e.charCodeAt(t), n |= 0;
                return r.colors[Math.abs(n) % r.colors.length]
            }

            function r(e) {
                var a;

                function i() {
                    if (i.enabled) {
                        for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++) n[t] = arguments[t];
                        var s = i, o = Number(new Date), c = o - (a || o);
                        s.diff = c, s.prev = a, s.curr = o, a = o, n[0] = r.coerce(n[0]), "string" != typeof n[0] && n.unshift("%O");
                        var u = 0;
                        n[0] = n[0].replace(/%([a-zA-Z%])/g, function (e, t) {
                            if ("%%" === e) return e;
                            u++;
                            var a = r.formatters[t];
                            if ("function" == typeof a) {
                                var i = n[u];
                                e = a.call(s, i), n.splice(u, 1), u--
                            }
                            return e
                        }), r.formatArgs.call(s, n), (s.log || r.log).apply(s, n)
                    }
                }

                return i.namespace = e, i.enabled = r.enabled(e), i.useColors = r.useColors(), i.color = n(e), i.destroy = t, i.extend = s, "function" == typeof r.init && r.init(i), r.instances.push(i), i
            }

            function t() {
                var e = r.instances.indexOf(this);
                return -1 !== e && (r.instances.splice(e, 1), !0)
            }

            function s(e, n) {
                return r(this.namespace + (void 0 === n ? ":" : n) + e)
            }

            return r.debug = r, r.default = r, r.coerce = function (e) {
                if (e instanceof Error) return e.stack || e.message;
                return e
            }, r.disable = function () {
                r.enable("")
            }, r.enable = function (e) {
                var n;
                r.save(e), r.names = [], r.skips = [];
                var t = ("string" == typeof e ? e : "").split(/[\s,]+/), s = t.length;
                for (n = 0; n < s; n++) t[n] && ("-" === (e = t[n].replace(/\*/g, ".*?"))[0] ? r.skips.push(new RegExp("^" + e.substr(1) + "$")) : r.names.push(new RegExp("^" + e + "$")));
                for (n = 0; n < r.instances.length; n++) {
                    var a = r.instances[n];
                    a.enabled = r.enabled(a.namespace)
                }
            }, r.enabled = function (e) {
                if ("*" === e[e.length - 1]) return !0;
                var n, t;
                for (n = 0, t = r.skips.length; n < t; n++) if (r.skips[n].test(e)) return !1;
                for (n = 0, t = r.names.length; n < t; n++) if (r.names[n].test(e)) return !0;
                return !1
            }, r.humanize = require("ms"), Object.keys(e).forEach(function (n) {
                r[n] = e[n]
            }), r.instances = [], r.names = [], r.skips = [], r.formatters = {}, r.selectColor = n, r.enable(r.load()), r
        }

        module.exports = setup;

    }, {"ms": 68}],
    68: [function (require, module, exports) {
        var s = 1e3, m = 60 * s, h = 60 * m, d = 24 * h, w = 7 * d, y = 365.25 * d;

        function parse(e) {
            if (!((e = String(e)).length > 100)) {
                var r = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
                if (r) {
                    var a = parseFloat(r[1]);
                    switch ((r[2] || "ms").toLowerCase()) {
                        case"years":
                        case"year":
                        case"yrs":
                        case"yr":
                        case"y":
                            return a * y;
                        case"weeks":
                        case"week":
                        case"w":
                            return a * w;
                        case"days":
                        case"day":
                        case"d":
                            return a * d;
                        case"hours":
                        case"hour":
                        case"hrs":
                        case"hr":
                        case"h":
                            return a * h;
                        case"minutes":
                        case"minute":
                        case"mins":
                        case"min":
                        case"m":
                            return a * m;
                        case"seconds":
                        case"second":
                        case"secs":
                        case"sec":
                        case"s":
                            return a * s;
                        case"milliseconds":
                        case"millisecond":
                        case"msecs":
                        case"msec":
                        case"ms":
                            return a;
                        default:
                            return
                    }
                }
            }
        }

        function fmtShort(e) {
            var r = Math.abs(e);
            return r >= d ? Math.round(e / d) + "d" : r >= h ? Math.round(e / h) + "h" : r >= m ? Math.round(e / m) + "m" : r >= s ? Math.round(e / s) + "s" : e + "ms"
        }

        function fmtLong(e) {
            var r = Math.abs(e);
            return r >= d ? plural(e, r, d, "day") : r >= h ? plural(e, r, h, "hour") : r >= m ? plural(e, r, m, "minute") : r >= s ? plural(e, r, s, "second") : e + " ms"
        }

        function plural(s, e, r, a) {
            var n = e >= 1.5 * r;
            return Math.round(s / r) + " " + a + (n ? "s" : "")
        }

        module.exports = function (s, e) {
            e = e || {};
            var r = typeof s;
            if ("string" === r && s.length > 0) return parse(s);
            if ("number" === r && !1 === isNaN(s)) return e.long ? fmtLong(s) : fmtShort(s);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(s))
        };

    }, {}],
    69: [function (require, module, exports) {
        (function (global) {
            "use strict";
            var required = require("requires-port"), qs = require("querystringify"), protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i, slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, rules = [["#", "hash"], ["?", "query"], function (e) {
                return e.replace("\\", "/")
            }, ["/", "pathname"], ["@", "auth", 1], [NaN, "host", void 0, 1, 1], [/:(\d+)$/, "port", void 0, 1], [NaN, "hostname", void 0, 1, 1]], ignore = {hash: 1, query: 1};

            function lolcation(e) {
                var o, t = ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}).location || {}, r = {}, s = typeof (e = e || t);
                if ("blob:" === e.protocol) r = new Url(unescape(e.pathname), {}); else if ("string" === s) for (o in r = new Url(e, {}), ignore) delete r[o]; else if ("object" === s) {
                    for (o in e) o in ignore || (r[o] = e[o]);
                    void 0 === r.slashes && (r.slashes = slashes.test(e.href))
                }
                return r
            }

            function extractProtocol(e) {
                var o = protocolre.exec(e);
                return {protocol: o[1] ? o[1].toLowerCase() : "", slashes: !!o[2], rest: o[3]}
            }

            function resolve(e, o) {
                for (var t = (o || "/").split("/").slice(0, -1).concat(e.split("/")), r = t.length, s = t[r - 1], a = !1, n = 0; r--;) "." === t[r] ? t.splice(r, 1) : ".." === t[r] ? (t.splice(r, 1), n++) : n && (0 === r && (a = !0), t.splice(r, 1), n--);
                return a && t.unshift(""), "." !== s && ".." !== s || t.push(""), t.join("/")
            }

            function Url(e, o, t) {
                if (!(this instanceof Url)) return new Url(e, o, t);
                var r, s, a, n, l, i, c = rules.slice(), h = typeof o, p = this, u = 0;
                for ("object" !== h && "string" !== h && (t = o, o = null), t && "function" != typeof t && (t = qs.parse), o = lolcation(o), r = !(s = extractProtocol(e || "")).protocol && !s.slashes, p.slashes = s.slashes || r && o.slashes, p.protocol = s.protocol || o.protocol || "", e = s.rest, s.slashes || (c[3] = [/(.*)/, "pathname"]); u < c.length; u++) "function" != typeof (n = c[u]) ? (a = n[0], i = n[1], a != a ? p[i] = e : "string" == typeof a ? ~(l = e.indexOf(a)) && ("number" == typeof n[2] ? (p[i] = e.slice(0, l), e = e.slice(l + n[2])) : (p[i] = e.slice(l), e = e.slice(0, l))) : (l = a.exec(e)) && (p[i] = l[1], e = e.slice(0, l.index)), p[i] = p[i] || r && n[3] && o[i] || "", n[4] && (p[i] = p[i].toLowerCase())) : e = n(e);
                t && (p.query = t(p.query)), r && o.slashes && "/" !== p.pathname.charAt(0) && ("" !== p.pathname || "" !== o.pathname) && (p.pathname = resolve(p.pathname, o.pathname)), required(p.port, p.protocol) || (p.host = p.hostname, p.port = ""), p.username = p.password = "", p.auth && (n = p.auth.split(":"), p.username = n[0] || "", p.password = n[1] || ""), p.origin = p.protocol && p.host && "file:" !== p.protocol ? p.protocol + "//" + p.host : "null", p.href = p.toString()
            }

            function set(e, o, t) {
                var r = this;
                switch (e) {
                    case"query":
                        "string" == typeof o && o.length && (o = (t || qs.parse)(o)), r[e] = o;
                        break;
                    case"port":
                        r[e] = o, required(o, r.protocol) ? o && (r.host = r.hostname + ":" + o) : (r.host = r.hostname, r[e] = "");
                        break;
                    case"hostname":
                        r[e] = o, r.port && (o += ":" + r.port), r.host = o;
                        break;
                    case"host":
                        r[e] = o, /:\d+$/.test(o) ? (o = o.split(":"), r.port = o.pop(), r.hostname = o.join(":")) : (r.hostname = o, r.port = "");
                        break;
                    case"protocol":
                        r.protocol = o.toLowerCase(), r.slashes = !t;
                        break;
                    case"pathname":
                    case"hash":
                        if (o) {
                            var s = "pathname" === e ? "/" : "#";
                            r[e] = o.charAt(0) !== s ? s + o : o
                        } else r[e] = o;
                        break;
                    default:
                        r[e] = o
                }
                for (var a = 0; a < rules.length; a++) {
                    var n = rules[a];
                    n[4] && (r[n[1]] = r[n[1]].toLowerCase())
                }
                return r.origin = r.protocol && r.host && "file:" !== r.protocol ? r.protocol + "//" + r.host : "null", r.href = r.toString(), r
            }

            function toString(e) {
                e && "function" == typeof e || (e = qs.stringify);
                var o, t = this, r = t.protocol;
                r && ":" !== r.charAt(r.length - 1) && (r += ":");
                var s = r + (t.slashes ? "//" : "");
                return t.username && (s += t.username, t.password && (s += ":" + t.password), s += "@"), s += t.host + t.pathname, (o = "object" == typeof t.query ? e(t.query) : t.query) && (s += "?" !== o.charAt(0) ? "?" + o : o), t.hash && (s += t.hash), s
            }

            Url.prototype = {set: set, toString: toString}, Url.extractProtocol = extractProtocol, Url.location = lolcation, Url.qs = qs, module.exports = Url;

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"querystringify": 11, "requires-port": 12}],
    70: [function (require, module, exports) {
        module.exports = {sockjsUrl: "https://api.scaledrone.com/v3/socket", websocketUrl: "wss://api.scaledrone.com/v3/websocket", websocketOptions: {origin: "http://websocket.org"}, dbUrl: "https://api.scaledrone.com/db/v1", isBrowser: !0, SockJS: !0, type: "websocket"};

    }, {}],
    71: [function (require, module, exports) {
        "use strict";
        var config = require("./config");
        config.SockJS && (config.SockJS = require("sockjs-client")), config.WS && (config.WS = require("ws"));
        var Promise = require("lie"), Events = require("backbone-events-standalone"), Room = require("./room.js"), assign = require("lodash.assign"), get = require("lodash.get"), omit = require("lodash.omit"), sockEvents = require("./sock_events.js"), _require = require("./utils"),
            isString = _require.isString, isFunction = _require.isFunction, wrapError = _require.wrapError, hasListeners = _require.hasListeners, warn = _require.warn, States = {CLOSED: 0, OPEN: 1, HANDSHAKEN: 2, AUTHENTICATED: 3}, ABNORMAL_CLOSURE = 1006, isNode = config.isNode,
            isBrowser = config.isBrowser, isBrowserLite = config.isBrowserLite, isReactNative = config.isReactNative, reconnectAttempt = 0;

        function Scaledrone(e, t) {
            var r = this;
            if (!e) throw new Error("No Channel ID is defined");
            if (!isString(e)) throw new Error("Channel ID must be of type string");
            t = assign({}, {
                autoReconnect: !0, url: null, originalInstance: this, data: null, debug: !1
            }, t), this.args = arguments, this.args[1] = t, this.originalInstance = t.originalInstance, this.readyState = States.CLOSED, this.callbackId = 0, this.callbacks = {}, this.rooms = {}, this.disconnected = !1, this.connection = getConnection(t), this.emitter = Events.mixin({}), sockEvents(this.connection, this.emitter, {debug: t.debug}), this.autoReconnect = t.autoReconnect, this.innerEmitter = Events.mixin({}), this.eventPromises = this.createEventPromises(), this.emitter.on("open", function () {
                r.readyState = States.OPEN, r._sendMessage("handshake", {channel: e, version: 2, client_data: t.data}, {}, function (e, t) {
                    e || (r.clientId = t.client_id, r.readyState = States.HANDSHAKEN, r.requireAuth = t.require_auth), r._trigger("open", e)
                })
            }), this.emitter.on("message", function (e) {
                var t = JSON.parse(e.data), n = omit(t, ["callback", "error"]);
                if (-1 === ["observable_members", "observable_member_join", "observable_member_leave"].indexOf(t.type)) {
                    if (null != t.callback) {
                        var i = t.callback, o = r.callbacks[i];
                        if (isFunction(o)) return o(wrapError(t.error), n), void delete r.callbacks[i]
                    }
                    if (t.error) r.trigger("error", wrapError(t.error)); else {
                        if ("publish" === t.type) {
                            var s = r.rooms[t.room];
                            if (!s) return;
                            var c = {data: t.message, id: t.id, timestamp: t.timestamp}, a = t.client_id;
                            t.client_id && (c.clientId = a);
                            var u = void 0;
                            return s._observable && a && (u = s._getCacheMember(a), c.member = u), s.trigger("message", c), void s.trigger("data", t.message, u)
                        }
                        if ("history_message" !== t.type) ; else {
                            var l = r.rooms[t.room];
                            if (!l) return;
                            l._handleHistoryMessage(t)
                        }
                    }
                } else {
                    var d = r.rooms[t.room];
                    if (!d) return;
                    var g = t.type.slice("observable_".length);
                    d.trigger(g, t.data)
                }
            }), this.emitter.on("close", function (e) {
                r.autoReconnect && get(e, "code") === ABNORMAL_CLOSURE && -1 === get(e, "reason", "").indexOf("exceeded") ? (r.disconnected || r.trigger("disconnect"), reconnect(r, t, e)) : r.trigger("close", e)
            }), this.emitter.on("error", function (e) {
                return r.trigger("error", e)
            }), this.emitter.on("disconnect", function () {
                return r.disconnected = !0
            }), this.emitter.on("reconnect", function () {
                return r.disconnected = !1
            }), this.emitter.on("authenticate", function (e) {
                return r._trigger("authenticate", e)
            })
        }

        function reconnect(e, t, r) {
            var n = e.originalInstance;
            if (reconnectAttempt > 25) n.trigger("close", r); else {
                var i = 1e3 * reconnectAttempt++ * (Math.random() + .5);
                setTimeout(function () {
                    var t = n.args, r = new Scaledrone(t[0], t[1]);
                    r.innerEmitter.on("open", function () {
                        for (var t in reconnectAttempt = 0, r.emitter = n.emitter, e.connection.old = !0, n.connection = r.connection, sockEvents(r.connection, n.emitter), n.rooms) r.subscribe(t);
                        n.trigger("reconnect")
                    })
                }, i)
            }
        }

        function getConnection(e) {
            return "sockjs" !== e.type && supportsWebsockets() ? isNode ? new config.WS(e.url || config.websocketUrl, config.websocketOptions) : new WebSocket(e.url || config.websocketUrl) : new config.SockJS(e.url || config.sockjsUrl, null, {transports: ["xdr", "websocket-streaming", "xhr-streaming", "iframe-eventsource", "iframe-htmlfile", "xdr-polling", "xhr-polling", "iframe-xhr-polling", "jsonp-polling"]})
        }

        function supportsWebsockets() {
            return !!isBrowserLite || (!(!isNode || "sockjs" === config.type) || (!!(isBrowser && "WebSocket" in window && 2 === window.WebSocket.CLOSING) || !!isReactNative))
        }

        Events.mixin(Scaledrone.prototype), Scaledrone.prototype._trigger = function (e, t) {
            hasListeners(this, e) ? this.trigger(e, t) : t && this.trigger("error", t), this.innerEmitter.trigger(e, t)
        }, Scaledrone.prototype._sendMessage = function (e, t) {
            var r = this, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i = arguments[3], o = assign({type: e}, t);
            if (i) {
                var s = this.callbackId++;
                o.callback = s, this.callbacks[s] = i
            }
            (n.waitForPromise || Promise.resolve()).then(function () {
                return r.connection.send(JSON.stringify(o))
            })
        }, Scaledrone.prototype.subscribe = function (e) {
            var t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).historyCount;
            if (!e) throw new Error("Room name is not defined");
            if (!isString(e)) throw new Error("Room name must be of type string");
            var r = new Room(e, {historyCount: t}, this);
            return this.rooms[e] = r, this._sendMessage("subscribe", {room: e, history: t, history_count: t}, {waitForPromise: this.eventPromises.fullyConnected}, function (e) {
                return r._trigger("open", e)
            }), r
        }, Scaledrone.prototype.unsubscribe = function (e) {
            if (!e) throw new Error("Room name is not defined");
            if (!isString(e)) throw new Error("Room name must be of type string");
            this._sendMessage("unsubscribe", {room: e}, {waitForPromise: this.eventPromises.fullyConnected})
        }, Scaledrone.prototype.publish = function (e) {
            if (!e) throw new Error("No options defined");
            if (!e.room) throw new Error("No room defined");
            if (!e.message) throw new Error("No message defined");
            if (this.readyState === States.CLOSED) throw new Error("Connection is closed");
            var t = {waitForPromise: this.eventPromises.fullyConnected};
            this.requireAuth && this.readyState !== States.AUTHENTICATED && (warn("Messages can be sent after authenticating"), t = {}), this._sendMessage("publish", {room: e.room, message: e.message}, t)
        }, Scaledrone.prototype.authenticate = function (e) {
            var t = this;
            if (!e) throw new Error("No token defined");
            this._sendMessage("authenticate", {token: e}, {waitForPromise: this.eventPromises.open}, function (r) {
                t.readyState = States.AUTHENTICATED, t.token = e, t.emitter.trigger("authenticate", r)
            })
        }, Scaledrone.prototype.close = function () {
            this.connection.close()
        }, Scaledrone.prototype.createEventPromises = function () {
            var e = this;
            return {
                fullyConnected: new Promise(function (t, r) {
                    e.innerEmitter.once("open", function (n) {
                        n ? r(n) : e.requireAuth ? e.innerEmitter.once("authenticate", function (e) {
                            e ? r(e) : t()
                        }) : t()
                    })
                }), open: new Promise(function (t, r) {
                    e.innerEmitter.once("open", function (e) {
                        e ? r(e) : t()
                    })
                })
            }
        }, isBrowser ? (window.ScaleDrone = window.Scaledrone = Scaledrone, module && (module.exports = Scaledrone)) : module.exports = Scaledrone;

    }, {"./config": 70, "./room.js": 72, "./sock_events.js": 73, "./utils": 74, "backbone-events-standalone": 2, "lie": 6, "lodash.assign": 7, "lodash.get": 8, "lodash.omit": 9, "sockjs-client": 13, "ws": undefined}],
    72: [function (require, module, exports) {
        "use strict";
        var Events = require("backbone-events-standalone"), _require = require("./utils"), hasListeners = _require.hasListeners;

        function Room(e, s, t) {
            var i = this, r = s.historyCount;
            this.name = e, this._history = {messages: [], nextIndex: 0}, this._historyCount = r, this.scaledrone = t, this._observable = isObservable(e), this._observable && (this._cache = [], this.on("members", function (e) {
                return i._cache = e.slice(0)
            }), this.on("member_join", function (e) {
                return i._cache.unshift(e)
            }))
        }

        function isObservable(e) {
            return e && "observable-" === e.substring(0, 11)
        }

        Events.mixin(Room.prototype), Room.prototype.unsubscribe = function () {
            this.off(), this.scaledrone.unsubscribe(this.name)
        }, Room.prototype._getCacheMember = function (e) {
            if ("string" != typeof e) return null;
            for (var s = 0; s < this._cache.length; s++) {
                var t = this._cache[s];
                if (t.id === e) return t
            }
            return null
        }, Room.prototype._trigger = function (e, s) {
            hasListeners(this, e) ? this.trigger(e, s) : s && this.scaledrone.trigger("error", s)
        }, Room.prototype._handleHistoryMessage = function (e) {
            var s = this;
            this._history.messages[e.index] = e, this._history.messages[this._history.nextIndex] && function e() {
                var t = s._history.messages[s._history.nextIndex];
                s._history.nextIndex++;
                var i = t.message, r = t.client_id, n = {data: i, timestamp: t.timestamp, id: t.id};
                r && (n.clientId = r), s.trigger("history_message", n), s._history.messages[s._history.nextIndex] && e()
            }()
        }, module.exports = Room;

    }, {"./utils": 74, "backbone-events-standalone": 2}],
    73: [function (require, module, exports) {
        "use strict";
        module.exports = function (o, e) {
            var n = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).debug;
            o.onopen = function (r) {
                o.old || (n && console.log("[SCALEDRONE DEBUGGER]: open", r), e.trigger("open", r))
            }, o.onmessage = function (r) {
                o.old || (n && console.log("[SCALEDRONE DEBUGGER]: message", r), e.trigger("message", r))
            }, o.onclose = function (r) {
                o.old || (n && console.log("[SCALEDRONE DEBUGGER]: close", r), e.trigger("close", r))
            }, o.onerror = function (r) {
                o.old || (n && console.log("[SCALEDRONE DEBUGGER]: error", r), e.trigger("error", r))
            }
        };

    }, {}],
    74: [function (require, module, exports) {
        "use strict";
        exports.wrapError = function (n) {
            return n ? n instanceof Error ? n : new Error(n) : n
        }, exports.isFunction = function (n) {
            return "function" == typeof n
        }, exports.isString = function (n) {
            return "string" == typeof n
        }, exports.hasListeners = function (n, r) {
            return !(!n._events || !n._events[r])
        }, exports.warn = function () {
            console && console.warn && console.warn.apply(console, arguments)
        };

    }, {}]
}, {}, [71]);
