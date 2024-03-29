var Swapper = function(f, d) {
    function e(h, i, c, b) {
        e._swapper(h, i, c, b)
    }
    if (f && f.fn) {
        f.extend(f.fn, {
            swapper: function(g, c, b) {
                g = f(g)[0];
                this.forEach(function(h) {
                    e._swapper(h, g, c, b)
                });
                return this
            }
        })
    }
    if (d && d.fn) {
        d.fn.swapper = function(g, c, b) {
            g = d(g)[0];
            this.each(function() {
                e._swapper(this, g, c, b)
            });
            return this
        }
    }
    return e
}(window.Zepto, window.jQuery);
Swapper._os = function(i, k) {
    var l, h, g;
    if (g = /\bCPU.*OS (\d+(_\d+)?)/i.exec(i)) {
        l = "ios";
        h = g[1].replace("_", ".")
    } else {
        if (g = /\bAndroid (\d+(\.\d+)?)/.exec(i)) {
            l = "android";
            h = g[1]
        }
    }
    var j = {
        name: l,
        version: h && k(h)
    };
    j[l] = true;
    return j
}(navigator.userAgent, parseFloat);
Swapper._isNode = function(d, c) {
    return function(b) {
        if (!b) {
            return false
        }
        try {
            return (b instanceof d) || (b instanceof c)
        } catch (e) {}
        if (typeof b !== "object") {
            return false
        }
        if (typeof b.nodeType !== "number") {
            return false
        }
        if (typeof b.nodeName !== "string") {
            return false
        }
        return true
    }
}(Node, HTMLElement);
Swapper._isInDOM = function(b) {
    return function(e, d) {
        if (!d && !b(e)) {
            throw TypeError("element must be a DOM node, got " + e)
        }
        while (e = e.parentNode) {
            if (e === document) {
                return true
            }
        }
        return false
    }
}(Swapper._isNode);
Swapper._insertBefore = function() {
    return function(d, c) {
        c.parentNode.insertBefore(d, c)
    }
}();
Swapper._insertAfter = function() {
    return function(e, f) {
        var d = f.parentNode;
        if (d.lastchild === f) {
            d.appendChild(e)
        } else {
            d.insertBefore(e, f.nextSibling)
        }
    }
}();
Swapper._removeNode = function() {
    return function(b) {
        if (b.parentNode) {
            b.parentNode.removeChild(b)
        }
    }
}();
Swapper._setTransform = function() {
    return function(c, d) {
        c.style["-webkit-transform"] = d;
        c.style["-moz-transform"] = d;
        c.style["-ms-transform"] = d;
        c.style["-o-transform"] = d;
        c.style.transform = d
    }
}();
Swapper._setTransition = function() {
    return function(d, c) {
        if (c) {
            d.style["-webkit-transition"] = "-webkit-" + c;
            d.style["-moz-transition"] = "-moz-" + c;
            d.style["-ms-transition"] = "-ms-" + c;
            d.style["-o-transition"] = "-o-" + c;
            d.style.transition = c
        } else {
            d.style["-webkit-transition"] = "";
            d.style["-moz-transition"] = "";
            d.style["-ms-transition"] = "";
            d.style["-o-transition"] = "";
            d.style.transition = ""
        }
    }
}();
Swapper._getStyles = function(b) {
    return function(g, f) {
        var e;
        if (f) {
            e = g.style
        } else {
            e = b.defaultView.getComputedStyle(g, null)
        }
        return {
            "-webkit-transition": e["-webkit-transition"],
            "-moz-transition": e["-moz-transition"],
            "-ms-transition": e["-ms-transition"],
            "-o-transition": e["-o-transition"],
            transition: e.transition,
            display: e.display,
            opacity: e.opacity,
            top: e.top,
            left: e.left,
            height: e.height,
            width: e.width,
            position: e.position
        }
    }
}(document);
Swapper._easings = {
    linear: "linear",
    ease: "ease",
    "ease-in": "ease-in",
    "ease-out": "ease-out",
    "ease-in-out": "ease-in-out",
    "step-start": "step-start",
    "step-end": "step-end"
};
Swapper._transitions = {
    fade: [{
        fade: true
    }, {
        fade: true
    }],
    "fade-on": [{
        fade: true
    }, {}],
    "fade-off": [{}, {
        fade: true
    }, true],
    "scale-in": [{
        transform: "scale(0.01)"
    }, {}],
    "scale-out": [{}, {
        transform: "scale(0.01)"
    }, true],
    "rotate-left": [{
        transform: "rotateY(-180deg) perspective(360px)",
        fade: true
    }, {
        transform: "rotateY( 180deg) perspective(360px)",
        fade: true
    }],
    "rotate-right": [{
        transform: "rotateY( 180deg) perspective(360px)",
        fade: true
    }, {
        transform: "rotateY(-180deg) perspective(360px)",
        fade: true
    }],
    "cube-left": [{
        transform: "translate3d( 50%,0,0) rotateY(-90deg) perspective(360px)"
    }, {
        transform: "translate3d(-50%,0,0) rotateY( 90deg) perspective(360px)"
    }],
    "cube-right": [{
        transform: "translate3d(-50%,0,0) rotateY( 90deg) perspective(360px)"
    }, {
        transform: "translate3d( 50%,0,0) rotateY(-90deg) perspective(360px)"
    }],
    "swap-left": [{
        transform: "translate3d( 65%,0,0) rotateY( 90deg) perspective(360px)"
    }, {
        transform: "translate3d(-65%,0,0) rotateY(-90deg) perspective(360px)"
    }],
    "swap-right": [{
        transform: "translate3d(-65%,0,0) rotateY(-90deg) perspective(360px)"
    }, {
        transform: "translate3d( 65%,0,0) rotateY( 90deg) perspective(360px)"
    }],
    "explode-in": [{
        fade: true,
        transform: "scale(1.25)"
    }, {}],
    "explode-out": [{}, {
        fade: true,
        transform: "scale(1.25)"
    }, true],
    "implode-in": [{}, {
        fade: true,
        transform: "scale(0.60)"
    }, true],
    "implode-out": [{
        fade: true,
        transform: "scale(0.80)"
    }, {}],
    "slide-left": [{
        transform: "translate3d( 100%,0,0)"
    }, {
        transform: "translate3d(-100%,0,0)"
    }],
    "slide-right": [{
        transform: "translate3d(-100%,0,0)"
    }, {
        transform: "translate3d( 100%,0,0)"
    }],
    "slide-up": [{
        transform: "translate3d(0, 100%,0)"
    }, {
        transform: "translate3d(0,-100%,0)"
    }],
    "slide-down": [{
        transform: "translate3d(0,-100%,0)"
    }, {
        transform: "translate3d(0, 100%,0)"
    }],
    "slideon-left": [{
        transform: "translate3d(-100%,0,0)"
    }, {}],
    "slideoff-left": [{}, {
        transform: "translate3d(-100%,0,0)"
    }, true],
    "slideon-right": [{
        transform: "translate3d(100%,0,0)"
    }, {}],
    "slideoff-right": [{}, {
        transform: "translate3d(100%,0,0)"
    }, true],
    "slideon-up": [{
        transform: "translate3d(0,-100%,0)"
    }, {}],
    "slideoff-up": [{}, {
        transform: "translate3d(0,-100%,0)"
    }, true],
    "slideon-down": [{
        transform: "translate3d(0,100%,0)"
    }, {}],
    "slideoff-down": [{}, {
        transform: "translate3d(0,100%,0)"
    }, true],
    "slideon-left-ios": [{
        transform: "translate3d(100%,0,0)"
    }, {
        transform: "translate3d(-30%,0,0)"
    }],
    "slideoff-right-ios": [{
        transform: "translate3d(-30%,0,0)"
    }, {
        transform: "translate3d(100%,0,0)"
    }, true],
    "glideon-right": [{
        transform: "translate3d(110%,0,0)"
    }, {
        transform: "translate3d(-20%,0,0)"
    }],
    "glideoff-right": [{
        transform: "translate3d(-20%,0,0)"
    }, {
        transform: "translate3d(110%,0,0)"
    }, true],
    "glideon-left": [{
        transform: "translate3d(-110%,0,0)"
    }, {
        transform: "translate3d(20%,0,0)"
    }],
    "glideoff-left": [{
        transform: "translate3d(20%,0,0)"
    }, {
        transform: "translate3d(-110%,0,0)"
    }, true],
    "glideon-down": [{
        transform: "translate3d(0,110%,0)"
    }, {
        transform: "translate3d(0,-20%,0)"
    }],
    "glideoff-down": [{
        transform: "translate3d(0,-20%,0)"
    }, {
        transform: "translate3d(0,110%,0)"
    }, true],
    "glideon-up": [{
        transform: "translate3d(0,-110%,0)"
    }, {
        transform: "translate3d(0,20%,0)"
    }],
    "glideoff-up": [{
        transform: "translate3d(0,20%,0)"
    }, {
        transform: "translate3d(0,-110%,0)"
    }, true],
    "android-l-in": [{
        transform: "translate3d(0,6%,0)",
        fade: true
    }, {}],
    "android-l-out": [{}, {
        transform: "translate3d(0,6%,0)",
        fade: true
    }, true]
};
Swapper._validate = function(j, i, k) {
    return {
        element: l,
        options: g,
        callback: h
    };

    function l(b) {
        if (!j(b)) {
            throw TypeError("element must be a DOM node, got " + b)
        }
    }

    function g(b) {
        switch (typeof b) {
            case "string":
                b = {
                    transition: b
                };
                break;
            case "undefined":
                b = {};
                break;
            case "object":
                break;
            default:
                throw TypeError("options must be an object if defined, got " + b)
        }
        switch (typeof b.transition) {
            case "string":
                if (!(b.transition in i) && (b.transition !== "instant")) {
                    throw TypeError(b.transition + " is not a valid transition")
                }
                break;
            case "undefined":
                break;
            default:
                throw TypeError("transition must be a string if defined, got " + b.transition)
        }
        switch (typeof b.duration) {
            case "number":
                if (b.duration < 0) {
                    throw TypeError("duration must be a non-negative integer, got " + b.duration)
                }
                break;
            case "undefined":
                break;
            default:
                throw TypeError("duration must be a number if defined, got " + b.duration)
        }
        switch (typeof b.easing) {
            case "string":
                if (!(b.easing in k) && (b.easing.substr(0, 13) !== "cubic-bezier(")) {
                    throw TypeError(b.easing + " is not a valid easing")
                }
                break;
            case "undefined":
                break;
            default:
                throw TypeError("easing must be a string if defined, got " + b.easing)
        }
        return b
    }

    function h(b) {
        switch (typeof b) {
            case "undefined":
                b = function() {};
                break;
            case "function":
                break;
            default:
                throw TypeError("callback must be a function if defined, got " + b)
        }
        return b
    }
}(Swapper._isNode, Swapper._transitions, Swapper._easings);
Swapper._swapper = function(Z, I, ae, af, U, H, ad, ac, aa, O, Y, S, X, N) {
    var aj = "translate3d(0,0,0) scale(1)",
        M = "fade",
        F = "ease-in-out";
    var T = (Z.ios && (Math.floor(Z.version) === 5));

    function Q(d, e, c, b) {
        S.element(d);
        S.element(e);
        if (typeof c === "function") {
            b = c;
            c = {}
        }
        c = S.options(c);
        b = S.callback(b);
        if (d._swapper) {
            throw Error("elem1 is currently being swapped")
        } else {
            if (e._swapper) {
                throw Error("elem2 is currently being swapped")
            }
        }
        if (!ae(d, true)) {
            throw Error("elem1 must be in the DOM to be swapped")
        }
        d._swapper = true;
        e._swapper = true;
        H(e);
        V(d, e, c, function() {
            d._swapper = false;
            e._swapper = false;
            b()
        })
    }

    function V(c, d, b, e) {
        if (b.transition === "instant") {
            U(d, c);
            H(c);
            e();
            return
        }
        var f = O[b.transition || M],
            g = b.easing || F,
            h = b.duration || 300;
        if (g.substr(0, 13) !== "cubic-bezier(") {
            g = Y[g]
        }
        U(d, c);
        var i = aa(c),
            j = aa(d),
            k = aa(c, true),
            l = aa(d, true);
        P(c, d, i, j);
        if (f[2]) {
            af(d, c)
        }
        d.style.opacity = "0";
        K(c, d);
        setTimeout(function() {
            d.style.opacity = j.opacity;
            ai(c, d, f);
            setTimeout(function() {
                W(c, d, h, g);
                setTimeout(function() {
                    G(c, d, f);
                    R(c, d, i, j, f, h, function() {
                        H(c);
                        L(c, d, h, g);
                        setTimeout(function() {
                            J(c, d, k, l, f);
                            ag(c, d, k, l);
                            setTimeout(function() {
                                ah(c, d, k, l);
                                e()
                            }, 0)
                        }, 0)
                    })
                }, 0)
            }, 50)
        }, 0)
    }

    function P(e, f, c, d) {
        var b = e.getBoundingClientRect();
        if (c.display !== "none") {
            if (T) {
                f.style.position = "absolute"
            } else {
                f.style.position = "fixed"
            }
            f.style.top = b.top + "px";
            f.style.left = b.left + "px"
        }
        f.style.height = d.height || c.height;
        f.style.width = d.width || c.width
    }

    function ag(d, e, b, c) {
        e.style.position = c.position;
        e.style.top = c.top;
        e.style.left = c.left;
        e.style.height = c.height;
        e.style.width = c.width
    }

    function ai(c, d, b) {
        ad(c, aj);
        ad(d, b[0].transform || aj);
        if (b[0].fade) {
            d.style.opacity = "0"
        }
        if (b[1].fade) {
            c.style.opacity = "1"
        }
    }

    function G(c, d, b) {
        ad(c, b[1].transform || aj);
        ad(d, aj);
        if (b[0].fade) {
            d.style.opacity = "1"
        }
        if (b[1].fade) {
            c.style.opacity = "0"
        }
    }

    function J(e, f, c, d, b) {
        ad(e, "");
        ad(f, "");
        if (b[0].fade) {
            f.style.opacity = d.opacity
        }
        if (b[1].fade) {
            e.style.opacity = c.opacity
        }
    }

    function W(e, f, d, b) {
        var c = "transform " + (d / 1000) + "s " + b + ",opacity " + (d / 1000) + "s " + b;
        ac(e, c);
        ac(f, c)
    }

    function L(d, e, c, b) {
        ac(d, "");
        ac(e, "")
    }

    function K(b, c) {
        ac(b, "");
        ac(c, "")
    }

    function ah(d, e, b, c) {
        d.style["-webkit-transition"] = b["-webkit-transition"];
        d.style["-moz-transition"] = b["-moz-transition"];
        d.style["-ms-transition"] = b["-ms-transition"];
        d.style["-o-transition"] = b["-o-transition"];
        d.style.transition = b.transition;
        e.style["-webkit-transition"] = c["-webkit-transition"];
        e.style["-moz-transition"] = c["-moz-transition"];
        e.style["-ms-transition"] = c["-ms-transition"];
        e.style["-o-transition"] = c["-o-transition"];
        e.style.transition = c.transition
    }

    function ab(c, b) {
        if (c.display === "none") {
            return false
        }
        if (b.fade) {
            return true
        }
        if (!b.transform) {
            return false
        } else {
            if (b.transform === aj) {
                return false
            } else {
                return true
            }
        }
    }

    function R(b, e, k, m, h, j, f) {
        var l;
        if (ab(m, h[0])) {
            l = e;
            c()
        } else {
            if (ab(k, h[1])) {
                l = b;
                c()
            } else {
                setTimeout(g, j)
            }
        }

        function c() {
            l.addEventListener("webkitTransitionEnd", g, false);
            l.addEventListener("transitionend", g, false);
            l.addEventListener("oTransitionEnd", g, false);
            l.addEventListener("otransitionend", g, false);
            l.addEventListener("MSTransitionEnd", g, false);
            l.addEventListener("transitionend", g, false)
        }

        function d() {
            l.removeEventListener("webkitTransitionEnd", g);
            l.removeEventListener("transitionend", g);
            l.removeEventListener("oTransitionEnd", g);
            l.removeEventListener("otransitionend", g);
            l.removeEventListener("MSTransitionEnd", g);
            l.removeEventListener("transitionend", g)
        }
        var i = false;

        function g(n) {
            if (i || !n || !n.target || (n.target !== l)) {
                return
            }
            i = true;
            if (l) {
                d()
            }
            f()
        }
    }
    return Q
}(Swapper._os, Swapper._isNode, Swapper._isInDOM, Swapper._insertBefore, Swapper._insertAfter, Swapper._removeNode, Swapper._setTransform, Swapper._setTransition, Swapper._getStyles, Swapper._transitions, Swapper._easings, Swapper._validate, window, document);
var Clickable = function(f, d) {
    function e() {
        e._enableClicking.apply(this, arguments)
    }
    e.touchable = function() {
        return e._os.touchable
    };
    e.sticky = function() {
        e._enableStickyClick.apply(this, arguments)
    };
    if (d && d.fn) {
        d.fn.clickable = function(b) {
            this.each(function() {
                e._enableClicking(this, b)
            });
            return this
        };
        d.fn.stickyClick = function(b) {
            this.each(function() {
                e._enableStickyClick(this, b)
            });
            return this
        }
    }
    if (f && f.fn) {
        f.extend(f.fn, {
            clickable: function(b) {
                this.forEach(function(c) {
                    e._enableClicking(c, b)
                });
                return this
            },
            stickyClick: function(b) {
                this.forEach(function(c) {
                    e._enableStickyClick(c, b)
                });
                return this
            }
        })
    }
    return e
}(window.Zepto, window.jQuery);
Clickable._os = function(i, k) {
    var l, h, g;
    if (g = /\bCPU.*OS (\d+(_\d+)?)/i.exec(i)) {
        l = "ios";
        h = g[1].replace("_", ".")
    } else {
        if (g = /\bAndroid (\d+(\.\d+)?)/.exec(i)) {
            l = "android";
            h = g[1]
        }
    }
    var j = {
        name: l,
        version: h && k(h),
        touchable: !!l
    };
    j[l] = true;
    return j
}(navigator.userAgent, parseFloat);
Clickable._trimString = function(d) {
    var c = /^\s+|\s+$/g;
    return function(b) {
        return d(b).replace(c, "")
    }
}(String);
Clickable._isDOMNode = function(d, c) {
    return function(b) {
        if (!b) {
            return false
        }
        try {
            return (b instanceof d) || (b instanceof c)
        } catch (e) {}
        if (typeof b !== "object") {
            return false
        }
        if (typeof b.nodeType !== "number") {
            return false
        }
        if (typeof b.nodeName !== "string") {
            return false
        }
        return true
    }
}(Node, HTMLElement);
Clickable._isInDOM = function() {
    return function(b) {
        while (b = b.parentNode) {
            if (b === document) {
                return true
            }
        }
        return false
    }
}();
Clickable._bindEvents = function() {
    return function(f, d) {
        for (var e in d) {
            if (f.addEventListener) {
                f.addEventListener(e, d[e], false)
            } else {
                if (f.attachEvent) {
                    f.attachEvent("on" + e, d[e])
                }
            }
        }
    }
}();
Clickable._unbindEvents = function() {
    return function(f, d) {
        for (var e in d) {
            if (f.removeEventListener) {
                f.removeEventListener(e, d[e])
            }
        }
    }
}();
Clickable._addClass = function() {
    return function(c, d) {
        c.className += " " + d
    }
}();
Clickable._removeClass = function(b) {
    return function(e, d) {
        e.className = b(e.className.replace(new RegExp("\\b" + d + "\\b"), ""))
    }
}(Clickable._trimString);
Clickable._enableClicking = function(y, r, F, A, D, v, s) {
    var x = "active",
        t = "data-clickable-class",
        z = 40;
    var q = false,
        u = !!y.ios;

    function E(f, c) {
        if (!r(f)) {
            throw TypeError("element " + f + " must be a DOM element")
        }
        if (f._clickable) {
            return
        }
        f._clickable = true;
        switch (typeof c) {
            case "undefined":
                c = x;
                break;
            case "string":
                break;
            default:
                throw TypeError("active class " + c + " must be a string")
        }
        var S = false,
            Z = false,
            o, R, j, h, V;
        f.setAttribute(t, c);
        f.style["-webkit-tap-highlight-color"] = "rgba(255,255,255,0)";
        p();
        return;

        function e(H, G) {
            S = true;
            j = +new Date();
            o = H;
            R = G;
            h = w(f);
            if (h) {
                V = h.scrollTop;
                h.addEventListener("scroll", aa, true)
            }
        }

        function l() {
            if (h) {
                h.removeEventListener("scroll", aa)
            }
            h = null;
            V = null;
            o = null;
            R = null;
            S = false
        }

        function aa() {
            Y()
        }

        function b() {
            return S
        }

        function T() {
            v(f, c)
        }

        function X() {
            s(f, c)
        }

        function p() {
            A(f, {
                click: k
            });
            if (!y.touchable) {
                A(f, {
                    mousedown: W,
                    mousemove: U,
                    mouseout: U,
                    mouseup: g
                });
                return
            }
            if (y.ios) {
                A(f, {
                    DOMNodeInsertedIntoDocument: d,
                    DOMNodeRemovedFromDocument: i
                });
                if (F(f)) {
                    d()
                }
            } else {
                d()
            }
        }

        function d() {
            A(f, {
                touchstart: n,
                touchmove: m,
                touchcancel: Y,
                touchend: Q
            })
        }

        function i() {
            D(f, {
                touchstart: n,
                touchmove: m,
                touchcancel: Y,
                touchend: Q
            })
        }

        function k(G) {
            G = G || window.event;
            if (!f.disabled && Z) {
                Z = false;
                setTimeout(function() {
                    q = false
                }, 0)
            } else {
                if (G.stopImmediatePropagation) {
                    G.stopImmediatePropagation()
                }
                G.preventDefault();
                G.stopPropagation();
                G.cancelBubble = true;
                G.returnValue = false;
                return false
            }
        }

        function W(G) {
            Z = false;
            if (f.disabled || !B(G.target, f)) {
                G.preventDefault();
                l();
                return
            }
            e(G.clientX, G.clientY);
            T()
        }

        function U(G) {
            G.preventDefault();
            l();
            Z = false;
            X()
        }

        function g(G) {
            if (f.disabled) {
                G.preventDefault();
                l();
                Z = false;
                return
            }
            if (!b()) {
                G.preventDefault();
                Z = false
            } else {
                Z = true
            }
            l();
            X()
        }

        function n(H) {
            Z = false;
            if (q || f.disabled || (H.touches.length !== 1) || !B(H.target, f)) {
                l();
                return
            }
            q = true;
            var G = H.changedTouches[0];
            e(G.clientX, G.clientY);
            if (h) {
                if (h._isScrolling || (V < 0) || (h.scrollHeight < V)) {
                    l();
                    return
                }
            }
            var G = j;
            setTimeout(function() {
                if (b() && (G === j)) {
                    T()
                }
            }, z)
        }

        function Y(G) {
            Z = false;
            l();
            if (G) {
                q = false
            }
            if (f.disabled) {
                return
            }
            X()
        }

        function m(G) {
            var H = document.elementFromPoint(G.touches[0].pageX, G.touches[0].pageY);
            if (f !== H) {
                Y(G)
            }
        }

        function Q(H) {
            var L = b(),
                K = h,
                J = V,
                M = o,
                G = R;
            Y();
            if (!L || f.disabled) {
                q = false;
                return
            }
            if (K) {
                if (K._isScrolling || (K.scrollTop !== J)) {
                    return
                }
            }
            if (!H.stopImmediatePropagation) {
                Z = true;
                return
            }
            var I = +new Date() - j;
            if (I > z) {
                Z = true;
                C(f, M, G)
            } else {
                T();
                setTimeout(function() {
                    X();
                    Z = true;
                    C(f, M, G)
                }, 1)
            }
        }
    }

    function B(b, c) {
        do {
            if (b === c) {
                return true
            } else {
                if (b._clickable) {
                    return false
                }
            }
        } while (b = b.parentNode);
        return false
    }

    function C(c, e, b) {
        var d = document.createEvent("MouseEvents");
        d.initMouseEvent("click", true, true, window, 1, e || 0, b || 0, e || 0, b || 0, false, false, false, false, 0, null);
        c.dispatchEvent(d)
    }

    function w(b) {
        if (!y.ios || (y.version < 5)) {
            return
        }
        while (b = b.parentNode) {
            if (b._scrollable) {
                if (b._iScroll) {
                    return
                }
                return b
            }
        }
    }
    return E
}(Clickable._os, Clickable._isDOMNode, Clickable._isInDOM, Clickable._bindEvents, Clickable._unbindEvents, Clickable._addClass, Clickable._removeClass);
Clickable._enableStickyClick = function(h, l, i) {
    var k = "data-clickable-class";

    function j(b, c, d) {
        if (!l(b)) {
            throw TypeError("button must be a DOM element, got " + b)
        }
        switch (typeof c) {
            case "string":
                break;
            case "function":
                d = c;
                c = undefined;
                break;
            default:
                throw TypeError("button active class must be a string if defined, got " + c)
        }
        if (typeof d !== "function") {
            throw TypeError("sticky click handler must be a function, got " + d)
        }
        i(b, c);
        b.addEventListener("click", g(b, d), false)
    }

    function g(c, d) {
        var b = false,
            e = c.getAttribute(k);
        return function() {
            if (b) {
                return
            }
            b = true;
            var p = false,
                q;
            c.disabled = true;
            c.className += " " + e;
            try {
                q = d.call(c, f)
            } catch (o) {
                if (window.console && window.console.error) {
                    if ((typeof o === "object") && o.stack) {
                        window.console.error(o.stack)
                    } else {
                        window.console.error(o + "")
                    }
                }
                f()
            }
            if (q === false) {
                f()
            }

            function f() {
                if (p) {
                    return
                }
                p = true;
                b = false;
                if (c.disabled) {
                    c.disabled = false;
                    c.className = h(c.className.replace(new RegExp("\\b" + e + "\\b", "g"), ""))
                }
            }
        }
    }
    return j
}(Clickable._trimString, Clickable._isDOMNode, Clickable._enableClicking);
var iScroll = function(u, f) {
    function C(b) {
        if ("" === v) {
            return b
        }
        b = b.charAt(0).toUpperCase() + b.substr(1);
        return v + b
    }
    var t = Math,
        s = f.createElement("div").style,
        v;
    a: {
        for (var z = ["t", "webkitT", "MozT", "msT", "OT"], h, j = 0, x = z.length; j < x; j++) {
            if (h = z[j] + "ransform", h in s) {
                v = z[j].substr(0, z[j].length - 1);
                break a
            }
        }
        v = !1
    }
    var y = v ? "-" + v.toLowerCase() + "-" : "",
        B = C("transform"),
        D = C("transitionProperty"),
        K = C("transitionDuration"),
        G = C("transformOrigin"),
        I = C("transitionTimingFunction"),
        A = C("transitionDelay"),
        E = /android/gi.test(navigator.appVersion),
        l = /iphone|ipad/gi.test(navigator.appVersion),
        z = /hp-tablet/gi.test(navigator.appVersion),
        m = C("perspective") in s,
        w = "ontouchstart" in u && !z,
        o = !!v,
        J = C("transition") in s,
        F = "onorientationchange" in u ? "orientationchange" : "resize",
        M = w ? "touchstart" : "mousedown",
        n = w ? "touchmove" : "mousemove",
        p = w ? "touchend" : "mouseup",
        q = w ? "touchcancel" : "mouseup",
        N = "Moz" == v ? "DOMMouseScroll" : "mousewheel",
        O;
    O = !1 === v ? !1 : {
        "": "transitionend",
        webkit: "webkitTransitionEnd",
        Moz: "transitionend",
        O: "oTransitionEnd",
        ms: "MSTransitionEnd"
    }[v];
    var L = u.requestAnimationFrame || u.webkitRequestAnimationFrame || u.mozRequestAnimationFrame || u.oRequestAnimationFrame || u.msRequestAnimationFrame || function(b) {
            return setTimeout(b, 1)
        },
        r = u.cancelRequestAnimationFrame || u.webkitCancelAnimationFrame || u.webkitCancelRequestAnimationFrame || u.mozCancelRequestAnimationFrame || u.oCancelRequestAnimationFrame || u.msCancelRequestAnimationFrame || clearTimeout,
        H = m ? " translateZ(0)" : "",
        z = function(e, d) {
            var b = this,
                c;
            b.wrapper = "object" == typeof e ? e : f.getElementById(e);
            b.wrapper.style.overflow = "hidden";
            b.scroller = b.wrapper.children[0];
            b.options = {
                hScroll: !0,
                vScroll: !0,
                x: 0,
                y: 0,
                bounce: !0,
                bounceLock: !1,
                momentum: !0,
                lockDirection: !0,
                useTransform: !0,
                useTransition: !1,
                topOffset: 0,
                checkDOMChanges: !1,
                handleClick: !0,
                hScrollbar: !0,
                vScrollbar: !0,
                fixedScrollbar: E,
                hideScrollbar: l,
                fadeScrollbar: l && m,
                scrollbarClass: "",
                zoom: !1,
                zoomMin: 1,
                zoomMax: 4,
                doubleTapZoom: 2,
                wheelAction: "scroll",
                snap: !1,
                snapThreshold: 1,
                onRefresh: null,
                onBeforeScrollStart: function(g) {
                    g.preventDefault()
                },
                onScrollStart: null,
                onBeforeScrollMove: null,
                onScrollMove: null,
                onBeforeScrollEnd: null,
                onScrollEnd: null,
                onTouchEnd: null,
                onDestroy: null,
                onZoomStart: null,
                onZoom: null,
                onZoomEnd: null
            };
            for (c in d) {
                b.options[c] = d[c]
            }
            b.x = b.options.x;
            b.y = b.options.y;
            b.options.useTransform = o && b.options.useTransform;
            b.options.hScrollbar = b.options.hScroll && b.options.hScrollbar;
            b.options.vScrollbar = b.options.vScroll && b.options.vScrollbar;
            b.options.zoom = b.options.useTransform && b.options.zoom;
            b.options.useTransition = J && b.options.useTransition;
            b.options.zoom && E && (H = "");
            b.scroller.style[D] = b.options.useTransform ? y + "transform" : "top left";
            b.scroller.style[K] = "0";
            b.scroller.style[G] = "0 0";
            b.options.useTransition && (b.scroller.style[I] = "cubic-bezier(0.33,0.66,0.66,1)");
            b.options.useTransform ? b.scroller.style[B] = "translate(" + b.x + "px," + b.y + "px)" + H : b.scroller.style.cssText += ";position:absolute;top:" + b.y + "px;left:" + b.x + "px";
            b.options.useTransition && (b.options.fixedScrollbar = !0);
            b.refresh();
            b._bind(F, u);
            b._bind(M);
            w || (b._bind("mouseout", b.wrapper), "none" != b.options.wheelAction && b._bind(N));
            b.options.checkDOMChanges && (b.checkDOMTime = setInterval(function() {
                b._checkDOMChanges()
            }, 500))
        };
    z.prototype = {
        enabled: !0,
        x: 0,
        y: 0,
        steps: [],
        scale: 1,
        currPageX: 0,
        currPageY: 0,
        pagesX: [],
        pagesY: [],
        aniTime: null,
        wheelZoomCount: 0,
        handleEvent: function(b) {
            switch (b.type) {
                case M:
                    if (!w && 0 !== b.button) {
                        break
                    }
                    this._start(b);
                    break;
                case n:
                    this._move(b);
                    break;
                case p:
                case q:
                    this._end(b);
                    break;
                case F:
                    this._resize();
                    break;
                case N:
                    this._wheel(b);
                    break;
                case "mouseout":
                    this._mouseout(b);
                    break;
                case O:
                    this._transitionEnd(b)
            }
        },
        _checkDOMChanges: function() {
            !this.moved && (!this.zoomed && !(this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) && this.refresh()
        },
        _scrollbar: function(c) {
            var b;
            this[c + "Scrollbar"] ? (this[c + "ScrollbarWrapper"] || (b = f.createElement("div"), this.options.scrollbarClass ? b.className = this.options.scrollbarClass + c.toUpperCase() : b.style.cssText = "position:absolute;z-index:100;" + ("h" == c ? "height:7px;bottom:1px;left:2px;right:" + (this.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (this.hScrollbar ? "7" : "2") + "px;top:2px;right:1px"), b.style.cssText += ";pointer-events:none;" + y + "transition-property:opacity;" + y + "transition-duration:" + (this.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (this.options.hideScrollbar ? "0" : "1"), this.wrapper.appendChild(b), this[c + "ScrollbarWrapper"] = b, b = f.createElement("div"), this.options.scrollbarClass || (b.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + y + "background-clip:padding-box;" + y + "box-sizing:border-box;" + ("h" == c ? "height:100%" : "width:100%") + ";" + y + "border-radius:3px;border-radius:3px"), b.style.cssText += ";pointer-events:none;" + y + "transition-property:" + y + "transform;" + y + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + y + "transition-duration:0;" + y + "transform: translate(0,0)" + H, this.options.useTransition && (b.style.cssText += ";" + y + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), this[c + "ScrollbarWrapper"].appendChild(b), this[c + "ScrollbarIndicator"] = b), "h" == c ? (this.hScrollbarSize = this.hScrollbarWrapper.clientWidth, this.hScrollbarIndicatorSize = t.max(t.round(this.hScrollbarSize * this.hScrollbarSize / this.scrollerW), 8), this.hScrollbarIndicator.style.width = this.hScrollbarIndicatorSize + "px", this.hScrollbarMaxScroll = this.hScrollbarSize - this.hScrollbarIndicatorSize, this.hScrollbarProp = this.hScrollbarMaxScroll / this.maxScrollX) : (this.vScrollbarSize = this.vScrollbarWrapper.clientHeight, this.vScrollbarIndicatorSize = t.max(t.round(this.vScrollbarSize * this.vScrollbarSize / this.scrollerH), 8), this.vScrollbarIndicator.style.height = this.vScrollbarIndicatorSize + "px", this.vScrollbarMaxScroll = this.vScrollbarSize - this.vScrollbarIndicatorSize, this.vScrollbarProp = this.vScrollbarMaxScroll / this.maxScrollY), this._scrollbarPos(c, !0)) : this[c + "ScrollbarWrapper"] && (o && (this[c + "ScrollbarIndicator"].style[B] = ""), this[c + "ScrollbarWrapper"].parentNode.removeChild(this[c + "ScrollbarWrapper"]), this[c + "ScrollbarWrapper"] = null, this[c + "ScrollbarIndicator"] = null)
        },
        _resize: function() {
            var b = this;
            setTimeout(function() {
                b.refresh()
            }, E ? 200 : 0)
        },
        _pos: function(c, b) {
            this.zoomed || (c = this.hScroll ? c : 0, b = this.vScroll ? b : 0, this.options.useTransform ? this.scroller.style[B] = "translate(" + c + "px," + b + "px) scale(" + this.scale + ")" + H : (c = t.round(c), b = t.round(b), this.scroller.style.left = c + "px", this.scroller.style.top = b + "px"), this.x = c, this.y = b, this._scrollbarPos("h"), this._scrollbarPos("v"))
        },
        _scrollbarPos: function(d, c) {
            var b = "h" == d ? this.x : this.y;
            this[d + "Scrollbar"] && (b *= this[d + "ScrollbarProp"], 0 > b ? (this.options.fixedScrollbar || (b = this[d + "ScrollbarIndicatorSize"] + t.round(3 * b), 8 > b && (b = 8), this[d + "ScrollbarIndicator"].style["h" == d ? "width" : "height"] = b + "px"), b = 0) : b > this[d + "ScrollbarMaxScroll"] && (this.options.fixedScrollbar ? b = this[d + "ScrollbarMaxScroll"] : (b = this[d + "ScrollbarIndicatorSize"] - t.round(3 * (b - this[d + "ScrollbarMaxScroll"])), 8 > b && (b = 8), this[d + "ScrollbarIndicator"].style["h" == d ? "width" : "height"] = b + "px", b = this[d + "ScrollbarMaxScroll"] + (this[d + "ScrollbarIndicatorSize"] - b))), this[d + "ScrollbarWrapper"].style[A] = "0", this[d + "ScrollbarWrapper"].style.opacity = c && this.options.hideScrollbar ? "0" : "1", this[d + "ScrollbarIndicator"].style[B] = "translate(" + ("h" == d ? b + "px,0)" : "0," + b + "px)") + H)
        },
        _start: function(e) {
            var d = w ? e.touches[0] : e,
                b, c;
            if (this.enabled) {
                this.options.onBeforeScrollStart && this.options.onBeforeScrollStart.call(this, e);
                (this.options.useTransition || this.options.zoom) && this._transitionTime(0);
                this.zoomed = this.animating = this.moved = !1;
                this.dirY = this.dirX = this.absDistY = this.absDistX = this.distY = this.distX = 0;
                this.options.zoom && (w && 1 < e.touches.length) && (c = t.abs(e.touches[0].pageX - e.touches[1].pageX), b = t.abs(e.touches[0].pageY - e.touches[1].pageY), this.touchesDistStart = t.sqrt(c * c + b * b), this.originX = t.abs(e.touches[0].pageX + e.touches[1].pageX - 2 * this.wrapperOffsetLeft) / 2 - this.x, this.originY = t.abs(e.touches[0].pageY + e.touches[1].pageY - 2 * this.wrapperOffsetTop) / 2 - this.y, this.options.onZoomStart && this.options.onZoomStart.call(this, e));
                if (this.options.momentum && (this.options.useTransform ? (b = getComputedStyle(this.scroller, null)[B].replace(/[^0-9\-.,]/g, "").split(","), c = 1 * b[4], b = 1 * b[5]) : (c = 1 * getComputedStyle(this.scroller, null).left.replace(/[^0-9-]/g, ""), b = 1 * getComputedStyle(this.scroller, null).top.replace(/[^0-9-]/g, "")), c != this.x || b != this.y)) {
                    this.options.useTransition ? this._unbind(O) : r(this.aniTime), this.steps = [], this._pos(c, b)
                }
                this.absStartX = this.x;
                this.absStartY = this.y;
                this.startX = this.x;
                this.startY = this.y;
                this.pointX = d.pageX;
                this.pointY = d.pageY;
                this.startTime = e.timeStamp || Date.now();
                this.options.onScrollStart && this.options.onScrollStart.call(this, e);
                this._bind(n);
                this._bind(p);
                this._bind(q)
            }
        },
        _move: function(g) {
            var e = w ? g.touches[0] : g,
                i = e.pageX - this.pointX,
                k = e.pageY - this.pointY,
                b = this.x + i,
                c = this.y + k,
                d = g.timeStamp || Date.now();
            this.options.onBeforeScrollMove && this.options.onBeforeScrollMove.call(this, g);
            if (this.options.zoom && w && 1 < g.touches.length) {
                b = t.abs(g.touches[0].pageX - g.touches[1].pageX), c = t.abs(g.touches[0].pageY - g.touches[1].pageY), this.touchesDist = t.sqrt(b * b + c * c), this.zoomed = !0, e = 1 / this.touchesDistStart * this.touchesDist * this.scale, e < this.options.zoomMin ? e = 0.5 * this.options.zoomMin * Math.pow(2, e / this.options.zoomMin) : e > this.options.zoomMax && (e = 2 * this.options.zoomMax * Math.pow(0.5, this.options.zoomMax / e)), this.lastScale = e / this.scale, b = this.originX - this.originX * this.lastScale + this.x, c = this.originY - this.originY * this.lastScale + this.y, this.scroller.style[B] = "translate(" + b + "px," + c + "px) scale(" + e + ")" + H, this.options.onZoom && this.options.onZoom.call(this, g)
            } else {
                this.pointX = e.pageX;
                this.pointY = e.pageY;
                if (0 < b || b < this.maxScrollX) {
                    b = this.options.bounce ? this.x + i / 2 : 0 <= b || 0 <= this.maxScrollX ? 0 : this.maxScrollX
                }
                if (c > this.minScrollY || c < this.maxScrollY) {
                    c = this.options.bounce ? this.y + k / 2 : c >= this.minScrollY || 0 <= this.maxScrollY ? this.minScrollY : this.maxScrollY
                }
                this.distX += i;
                this.distY += k;
                this.absDistX = t.abs(this.distX);
                this.absDistY = t.abs(this.distY);
                6 > this.absDistX && 6 > this.absDistY || (this.options.lockDirection && (this.absDistX > this.absDistY + 5 ? (c = this.y, k = 0) : this.absDistY > this.absDistX + 5 && (b = this.x, i = 0)), this.moved = !0, this._pos(b, c), this.dirX = 0 < i ? -1 : 0 > i ? 1 : 0, this.dirY = 0 < k ? -1 : 0 > k ? 1 : 0, 300 < d - this.startTime && (this.startTime = d, this.startX = this.x, this.startY = this.y), this.options.onScrollMove && this.options.onScrollMove.call(this, g))
            }
        },
        _end: function(R) {
            if (!(w && 0 !== R.touches.length)) {
                var Q = this,
                    b = w ? R.changedTouches[0] : R,
                    c, d, e = {
                        dist: 0,
                        time: 0
                    },
                    i = {
                        dist: 0,
                        time: 0
                    },
                    g = (R.timeStamp || Date.now()) - Q.startTime,
                    P = Q.x,
                    k = Q.y;
                Q._unbind(n);
                Q._unbind(p);
                Q._unbind(q);
                Q.options.onBeforeScrollEnd && Q.options.onBeforeScrollEnd.call(Q, R);
                if (Q.zoomed) {
                    P = Q.scale * Q.lastScale, P = Math.max(Q.options.zoomMin, P), P = Math.min(Q.options.zoomMax, P), Q.lastScale = P / Q.scale, Q.scale = P, Q.x = Q.originX - Q.originX * Q.lastScale + Q.x, Q.y = Q.originY - Q.originY * Q.lastScale + Q.y, Q.scroller.style[K] = "200ms", Q.scroller.style[B] = "translate(" + Q.x + "px," + Q.y + "px) scale(" + Q.scale + ")" + H, Q.zoomed = !1, Q.refresh(), Q.options.onZoomEnd && Q.options.onZoomEnd.call(Q, R)
                } else {
                    if (Q.moved) {
                        if (300 > g && Q.options.momentum) {
                            e = P ? Q._momentum(P - Q.startX, g, -Q.x, Q.scrollerW - Q.wrapperW + Q.x, Q.options.bounce ? Q.wrapperW : 0) : e;
                            i = k ? Q._momentum(k - Q.startY, g, -Q.y, 0 > Q.maxScrollY ? Q.scrollerH - Q.wrapperH + Q.y - Q.minScrollY : 0, Q.options.bounce ? Q.wrapperH : 0) : i;
                            P = Q.x + e.dist;
                            k = Q.y + i.dist;
                            if (0 < Q.x && 0 < P || Q.x < Q.maxScrollX && P < Q.maxScrollX) {
                                e = {
                                    dist: 0,
                                    time: 0
                                }
                            }
                            if (Q.y > Q.minScrollY && k > Q.minScrollY || Q.y < Q.maxScrollY && k < Q.maxScrollY) {
                                i = {
                                    dist: 0,
                                    time: 0
                                }
                            }
                        }
                        e.dist || i.dist ? (e = t.max(t.max(e.time, i.time), 10), Q.options.snap && (i = P - Q.absStartX, g = k - Q.absStartY, t.abs(i) < Q.options.snapThreshold && t.abs(g) < Q.options.snapThreshold ? Q.scrollTo(Q.absStartX, Q.absStartY, 200) : (i = Q._snap(P, k), P = i.x, k = i.y, e = t.max(i.time, e))), Q.scrollTo(t.round(P), t.round(k), e)) : Q.options.snap ? (i = P - Q.absStartX, g = k - Q.absStartY, t.abs(i) < Q.options.snapThreshold && t.abs(g) < Q.options.snapThreshold ? Q.scrollTo(Q.absStartX, Q.absStartY, 200) : (i = Q._snap(Q.x, Q.y), (i.x != Q.x || i.y != Q.y) && Q.scrollTo(i.x, i.y, i.time))) : Q._resetPos(200)
                    } else {
                        w && (Q.doubleTapTimer && Q.options.zoom ? (clearTimeout(Q.doubleTapTimer), Q.doubleTapTimer = null, Q.options.onZoomStart && Q.options.onZoomStart.call(Q, R), Q.zoom(Q.pointX, Q.pointY, 1 == Q.scale ? Q.options.doubleTapZoom : 1), Q.options.onZoomEnd && setTimeout(function() {
                            Q.options.onZoomEnd.call(Q, R)
                        }, 200)) : this.options.handleClick && (Q.doubleTapTimer = setTimeout(function() {
                            Q.doubleTapTimer = null;
                            for (c = b.target; 1 != c.nodeType;) {
                                c = c.parentNode
                            }
                            "SELECT" != c.tagName && ("INPUT" != c.tagName && "TEXTAREA" != c.tagName) && (d = f.createEvent("MouseEvents"), d.initMouseEvent("click", !0, !0, R.view, 1, b.screenX, b.screenY, b.clientX, b.clientY, R.ctrlKey, R.altKey, R.shiftKey, R.metaKey, 0, null), d._fake = !0, c.dispatchEvent(d))
                        }, Q.options.zoom ? 250 : 0))), Q._resetPos(200)
                    }
                    Q.options.onTouchEnd && Q.options.onTouchEnd.call(Q, R)
                }
            }
        },
        _resetPos: function(d) {
            var c = 0 <= this.x ? 0 : this.x < this.maxScrollX ? this.maxScrollX : this.x,
                b = this.y >= this.minScrollY || 0 < this.maxScrollY ? this.minScrollY : this.y < this.maxScrollY ? this.maxScrollY : this.y;
            if (c == this.x && b == this.y) {
                if (this.moved && (this.moved = !1, this.options.onScrollEnd && this.options.onScrollEnd.call(this)), this.hScrollbar && this.options.hideScrollbar && ("webkit" == v && (this.hScrollbarWrapper.style[A] = "300ms"), this.hScrollbarWrapper.style.opacity = "0"), this.vScrollbar && this.options.hideScrollbar) {
                    "webkit" == v && (this.vScrollbarWrapper.style[A] = "300ms"), this.vScrollbarWrapper.style.opacity = "0"
                }
            } else {
                this.scrollTo(c, b, d || 0)
            }
        },
        _wheel: function(e) {
            var d = this,
                b, c;
            if ("wheelDeltaX" in e) {
                b = e.wheelDeltaX / 12, c = e.wheelDeltaY / 12
            } else {
                if ("wheelDelta" in e) {
                    b = c = e.wheelDelta / 12
                } else {
                    if ("detail" in e) {
                        b = c = 3 * -e.detail
                    } else {
                        return
                    }
                }
            }
            if ("zoom" == d.options.wheelAction) {
                if (c = d.scale * Math.pow(2, 1 / 3 * (c ? c / Math.abs(c) : 0)), c < d.options.zoomMin && (c = d.options.zoomMin), c > d.options.zoomMax && (c = d.options.zoomMax), c != d.scale) {
                    !d.wheelZoomCount && d.options.onZoomStart && d.options.onZoomStart.call(d, e), d.wheelZoomCount++, d.zoom(e.pageX, e.pageY, c, 400), setTimeout(function() {
                        d.wheelZoomCount--;
                        !d.wheelZoomCount && d.options.onZoomEnd && d.options.onZoomEnd.call(d, e)
                    }, 400)
                }
            } else {
                b = d.x + b, c = d.y + c, 0 < b ? b = 0 : b < d.maxScrollX && (b = d.maxScrollX), c > d.minScrollY ? c = d.minScrollY : c < d.maxScrollY && (c = d.maxScrollY), 0 > d.maxScrollY && d.scrollTo(b, c, 0)
            }
        },
        _mouseout: function(c) {
            var b = c.relatedTarget;
            if (b) {
                for (; b = b.parentNode;) {
                    if (b == this.wrapper) {
                        return
                    }
                }
            }
            this._end(c)
        },
        _transitionEnd: function(b) {
            b.target == this.scroller && (this._unbind(O), this._startAni())
        },
        _startAni: function() {
            var g = this,
                e = g.x,
                i = g.y,
                k = Date.now(),
                b, c, d;
            g.animating || (g.steps.length ? (b = g.steps.shift(), b.x == e && b.y == i && (b.time = 0), g.animating = !0, g.moved = !0, g.options.useTransition) ? (g._transitionTime(b.time), g._pos(b.x, b.y), g.animating = !1, b.time ? g._bind(O) : g._resetPos(0)) : (d = function() {
                var P = Date.now(),
                    Q;
                if (P >= k + b.time) {
                    g._pos(b.x, b.y);
                    g.animating = false;
                    g.options.onAnimationEnd && g.options.onAnimationEnd.call(g);
                    g._startAni()
                } else {
                    P = (P - k) / b.time - 1;
                    c = t.sqrt(1 - P * P);
                    P = (b.x - e) * c + e;
                    Q = (b.y - i) * c + i;
                    g._pos(P, Q);
                    if (g.animating) {
                        g.aniTime = L(d)
                    }
                }
            }, d()) : g._resetPos(400))
        },
        _transitionTime: function(b) {
            b += "ms";
            this.scroller.style[K] = b;
            this.hScrollbar && (this.hScrollbarIndicator.style[K] = b);
            this.vScrollbar && (this.vScrollbarIndicator.style[K] = b)
        },
        _momentum: function(g, e, i, b, c) {
            var e = t.abs(g) / e,
                d = e * e / 0.0012;
            0 < g && d > i ? (i += c / (6 / (0.0006 * (d / e))), e = e * i / d, d = i) : 0 > g && d > b && (b += c / (6 / (0.0006 * (d / e))), e = e * b / d, d = b);
            return {
                dist: d * (0 > g ? -1 : 1),
                time: t.round(e / 0.0006)
            }
        },
        _offset: function(d) {
            for (var c = -d.offsetLeft, b = -d.offsetTop; d = d.offsetParent;) {
                c -= d.offsetLeft, b -= d.offsetTop
            }
            d != this.wrapper && (c *= this.scale, b *= this.scale);
            return {
                left: c,
                top: b
            }
        },
        _snap: function(g, e) {
            var b, c, d;
            d = this.pagesX.length - 1;
            b = 0;
            for (c = this.pagesX.length; b < c; b++) {
                if (g >= this.pagesX[b]) {
                    d = b;
                    break
                }
            }
            d == this.currPageX && (0 < d && 0 > this.dirX) && d--;
            g = this.pagesX[d];
            c = (c = t.abs(g - this.pagesX[this.currPageX])) ? 500 * (t.abs(this.x - g) / c) : 0;
            this.currPageX = d;
            d = this.pagesY.length - 1;
            for (b = 0; b < d; b++) {
                if (e >= this.pagesY[b]) {
                    d = b;
                    break
                }
            }
            d == this.currPageY && (0 < d && 0 > this.dirY) && d--;
            e = this.pagesY[d];
            b = (b = t.abs(e - this.pagesY[this.currPageY])) ? 500 * (t.abs(this.y - e) / b) : 0;
            this.currPageY = d;
            d = t.round(t.max(c, b)) || 200;
            return {
                x: g,
                y: e,
                time: d
            }
        },
        _bind: function(d, c, b) {
            (c || this.scroller).addEventListener(d, this, !!b)
        },
        _unbind: function(d, c, b) {
            (c || this.scroller).removeEventListener(d, this, !!b)
        },
        destroy: function() {
            this.scroller.style[B] = "";
            this.vScrollbar = this.hScrollbar = !1;
            this._scrollbar("h");
            this._scrollbar("v");
            this._unbind(F, u);
            this._unbind(M);
            this._unbind(n);
            this._unbind(p);
            this._unbind(q);
            this.options.hasTouch || (this._unbind("mouseout", this.wrapper), this._unbind(N));
            this.options.useTransition && this._unbind(O);
            this.options.checkDOMChanges && clearInterval(this.checkDOMTime);
            this.options.onDestroy && this.options.onDestroy.call(this)
        },
        refresh: function() {
            var e, d, b, c = 0;
            d = 0;
            this.scale < this.options.zoomMin && (this.scale = this.options.zoomMin);
            this.wrapperW = this.wrapper.clientWidth || 1;
            this.wrapperH = this.wrapper.clientHeight || 1;
            this.minScrollY = -this.options.topOffset || 0;
            this.scrollerW = t.round(this.scroller.offsetWidth * this.scale);
            this.scrollerH = t.round((this.scroller.offsetHeight + this.minScrollY) * this.scale);
            this.maxScrollX = this.wrapperW - this.scrollerW;
            this.maxScrollY = this.wrapperH - this.scrollerH + this.minScrollY;
            this.dirY = this.dirX = 0;
            this.options.onRefresh && this.options.onRefresh.call(this);
            this.hScroll = this.options.hScroll && 0 > this.maxScrollX;
            this.vScroll = this.options.vScroll && (!this.options.bounceLock && !this.hScroll || this.scrollerH > this.wrapperH);
            this.hScrollbar = this.hScroll && this.options.hScrollbar;
            this.vScrollbar = this.vScroll && this.options.vScrollbar && this.scrollerH > this.wrapperH;
            e = this._offset(this.wrapper);
            this.wrapperOffsetLeft = -e.left;
            this.wrapperOffsetTop = -e.top;
            if ("string" == typeof this.options.snap) {
                this.pagesX = [];
                this.pagesY = [];
                b = this.scroller.querySelectorAll(this.options.snap);
                e = 0;
                for (d = b.length; e < d; e++) {
                    c = this._offset(b[e]), c.left += this.wrapperOffsetLeft, c.top += this.wrapperOffsetTop, this.pagesX[e] = c.left < this.maxScrollX ? this.maxScrollX : c.left * this.scale, this.pagesY[e] = c.top < this.maxScrollY ? this.maxScrollY : c.top * this.scale
                }
            } else {
                if (this.options.snap) {
                    for (this.pagesX = []; c >= this.maxScrollX;) {
                        this.pagesX[d] = c, c -= this.wrapperW, d++
                    }
                    this.maxScrollX % this.wrapperW && (this.pagesX[this.pagesX.length] = this.maxScrollX - this.pagesX[this.pagesX.length - 1] + this.pagesX[this.pagesX.length - 1]);
                    d = c = 0;
                    for (this.pagesY = []; c >= this.maxScrollY;) {
                        this.pagesY[d] = c, c -= this.wrapperH, d++
                    }
                    this.maxScrollY % this.wrapperH && (this.pagesY[this.pagesY.length] = this.maxScrollY - this.pagesY[this.pagesY.length - 1] + this.pagesY[this.pagesY.length - 1])
                }
            }
            this._scrollbar("h");
            this._scrollbar("v");
            this.zoomed || (this.scroller.style[K] = "0", this._resetPos(200))
        },
        scrollTo: function(g, e, b, c) {
            var d = g;
            this.stop();
            d.length || (d = [{
                x: g,
                y: e,
                time: b,
                relative: c
            }]);
            g = 0;
            for (e = d.length; g < e; g++) {
                d[g].relative && (d[g].x = this.x - d[g].x, d[g].y = this.y - d[g].y), this.steps.push({
                    x: d[g].x,
                    y: d[g].y,
                    time: d[g].time || 0
                })
            }
            this._startAni()
        },
        scrollToElement: function(d, c) {
            var b;
            if (d = d.nodeType ? d : this.scroller.querySelector(d)) {
                b = this._offset(d), b.left += this.wrapperOffsetLeft, b.top += this.wrapperOffsetTop, b.left = 0 < b.left ? 0 : b.left < this.maxScrollX ? this.maxScrollX : b.left, b.top = b.top > this.minScrollY ? this.minScrollY : b.top < this.maxScrollY ? this.maxScrollY : b.top, c = void 0 === c ? t.max(2 * t.abs(b.left), 2 * t.abs(b.top)) : c, this.scrollTo(b.left, b.top, c)
            }
        },
        scrollToPage: function(d, c, b) {
            b = void 0 === b ? 400 : b;
            this.options.onScrollStart && this.options.onScrollStart.call(this);
            if (this.options.snap) {
                d = "next" == d ? this.currPageX + 1 : "prev" == d ? this.currPageX - 1 : d, c = "next" == c ? this.currPageY + 1 : "prev" == c ? this.currPageY - 1 : c, d = 0 > d ? 0 : d > this.pagesX.length - 1 ? this.pagesX.length - 1 : d, c = 0 > c ? 0 : c > this.pagesY.length - 1 ? this.pagesY.length - 1 : c, this.currPageX = d, this.currPageY = c, d = this.pagesX[d], c = this.pagesY[c]
            } else {
                if (d *= -this.wrapperW, c *= -this.wrapperH, d < this.maxScrollX && (d = this.maxScrollX), c < this.maxScrollY) {
                    c = this.maxScrollY
                }
            }
            this.scrollTo(d, c, b)
        },
        disable: function() {
            this.stop();
            this._resetPos(0);
            this.enabled = !1;
            this._unbind(n);
            this._unbind(p);
            this._unbind(q)
        },
        enable: function() {
            this.enabled = !0
        },
        stop: function() {
            this.options.useTransition ? this._unbind(O) : r(this.aniTime);
            this.steps = [];
            this.animating = this.moved = !1
        },
        zoom: function(g, e, b, c) {
            var d = b / this.scale;
            this.options.useTransform && (this.zoomed = !0, c = void 0 === c ? 200 : c, g = g - this.wrapperOffsetLeft - this.x, e = e - this.wrapperOffsetTop - this.y, this.x = g - g * d + this.x, this.y = e - e * d + this.y, this.scale = b, this.refresh(), this.x = 0 < this.x ? 0 : this.x < this.maxScrollX ? this.maxScrollX : this.x, this.y = this.y > this.minScrollY ? this.minScrollY : this.y < this.maxScrollY ? this.maxScrollY : this.y, this.scroller.style[K] = c + "ms", this.scroller.style[B] = "translate(" + this.x + "px," + this.y + "px) scale(" + b + ")" + H, this.zoomed = !1)
        },
        isReady: function() {
            return !this.moved && !this.zoomed && !this.animating
        }
    };
    s = null;
    return z
}(window, document);
var Scrollable = function(j, k) {
    function i() {
        i._enableScrolling.apply(this, arguments)
    }
    i.node = function() {
        return i._getScrollableNode.apply(this, arguments)
    };
    i.infinite = function() {
        return i._enableInfiniteScrolling.apply(this, arguments)
    };
    if (j && j.fn) {
        j.extend(j.fn, {
            scrollable: function(b) {
                this.forEach(function(c) {
                    i._enableScrolling(c, b)
                });
                return this
            },
            scrollableNode: function() {
                return j(this.map(function() {
                    return i._getScrollableNode(this)
                }))
            },
            scrollableInfinite: function(c, b) {
                var d;
                this.forEach(function(e) {
                    var f = i._enableInfiniteScrolling(e, c, b);
                    if (!d) {
                        d = f
                    }
                });
                return d
            }
        });
        var n = j.fn.scrollTop,
            l = j.fn.scrollLeft;
        j.fn.scrollTop = function(b) {
            if (typeof b === "undefined") {
                var d = this[0],
                    c = i._isDOMNode(d);
                if (c && d._scrollTop) {
                    return d._scrollTop()
                } else {
                    if (n) {
                        return n.apply(this, arguments)
                    } else {
                        if (c) {
                            return d.scrollTop
                        } else {
                            return null
                        }
                    }
                }
            }
            this.forEach(function(f) {
                var e = i._isDOMNode(f);
                if (e && f._scrollTop) {
                    f._scrollTop(b)
                } else {
                    if (n) {
                        n.call(j(f), b)
                    } else {
                        if (e) {
                            f.scrollTop = b
                        }
                    }
                }
            });
            return this
        };
        j.fn.scrollLeft = function(b) {
            if (typeof b === "undefined") {
                var d = this[0],
                    c = i._isDOMNode(d);
                if (c && d._scrollLeft) {
                    return d._scrollLeft()
                } else {
                    if (n) {
                        return l.apply(this, arguments)
                    } else {
                        if (c) {
                            return d.scrollLeft
                        } else {
                            return null
                        }
                    }
                }
            }
            this.forEach(function(f) {
                var e = i._isDOMNode(f);
                if (e && f._scrollLeft) {
                    f._scrollLeft(b)
                } else {
                    if (l) {
                        l.call(j(f), b)
                    } else {
                        if (e) {
                            f.scrollLeft = b
                        }
                    }
                }
            });
            return this
        }
    }
    if (k && k.fn) {
        k.fn.scrollable = function(b) {
            this.each(function() {
                i._enableScrolling(this, b)
            });
            return this
        };
        k.fn.scrollableNode = function() {
            return k(this.map(function() {
                return i._getScrollableNode(this)
            }))
        };
        k.fn.scrollableInfinite = function(c, b) {
            var d;
            this.each(function() {
                var e = i._enableInfiniteScrolling(this, c, b);
                if (!d) {
                    d = e
                }
            });
            return d
        };
        var o = k.fn.scrollTop,
            m = k.fn.scrollLeft;
        k.fn.scrollTop = function(b) {
            if (typeof b === "undefined") {
                var c = this[0];
                if (i._isDOMNode(c) && c._scrollTop) {
                    return c._scrollTop()
                } else {
                    return o.apply(this, arguments)
                }
            }
            this.each(function() {
                if (i._isDOMNode(this) && this._scrollTop) {
                    this._scrollTop(b)
                } else {
                    o.call(k(this), b)
                }
            });
            return this
        };
        k.fn.scrollLeft = function(b) {
            if (typeof b === "undefined") {
                var c = this[0];
                if (i._isDOMNode(c) && c._scrollLeft) {
                    return c._scrollLeft()
                } else {
                    return m.apply(this, arguments)
                }
            }
            this.each(function() {
                if (i._isDOMNode(this) && this._scrollLeft) {
                    this._scrollLeft(b)
                } else {
                    m.call(k(this), b)
                }
            });
            return this
        }
    }
    return i
}(window.Zepto, window.jQuery);
Scrollable._os = function(i, k) {
    var l, h, m;
    if (m = /\bCPU.*OS (\d+(_\d+)?)/i.exec(i)) {
        l = "ios";
        h = m[1].replace("_", ".")
    } else {
        if (m = /\bAndroid (\d+(\.\d+)?)/.exec(i)) {
            l = "android";
            h = m[1]
        }
    }
    var j = {
        name: l,
        version: h && k(h),
        mobile: !!l
    };
    j[l] = true;
    return j
}(navigator.userAgent, parseFloat);
Scrollable._isArray = function(c) {
    return function(b) {
        if (c) {
            return c(b)
        } else {
            return Object.prototype.toString.call(b) !== "[object Array]"
        }
    }
}(Array.isArray);
Scrollable._isDOMNode = function(d, e) {
    return function(b) {
        if (!b) {
            return false
        }
        try {
            return (b instanceof d) || (b instanceof e)
        } catch (c) {}
        if (typeof b !== "object") {
            return false
        }
        if (typeof b.nodeType !== "number") {
            return false
        }
        if (typeof b.nodeName !== "string") {
            return false
        }
        return true
    }
}(Node, HTMLElement);
Scrollable._isjQueryElem = function(c) {
    if (typeof c !== "object" || c === null) {
        return false
    } else {
        return (c.val && c.addClass && c.css && c.html && c.show)
    }
};
Scrollable._findInArray = function(c) {
    return function(j, h, b) {
        if (c) {
            return c.call(j, h, b)
        }
        for (var i = b || 0, k = j.length; i < k; i++) {
            if ((i in j) && (j[i] === h)) {
                return i
            }
        }
        return -1
    }
}(Array.prototype.indexOf);
Scrollable._forEachInArray = function(c) {
    return function(j, b, i) {
        if (c) {
            return c.call(j, b, i)
        }
        for (var h = 0, k = j.length; h < k; h++) {
            if (h in j) {
                b.call(i, j[h], h, j)
            }
        }
    }
}(Array.prototype.forEach);
Scrollable._onReady = function(q, p, k) {
    var l = [],
        m = false;
    o(n);
    return function(b) {
        if (m) {
            b()
        } else {
            l.push(b)
        }
    };

    function n() {
        if (m) {
            return
        }
        m = true;
        k(l, function(b) {
            setTimeout(b, 0)
        })
    }

    function j(b) {
        try {
            q.documentElement.doScroll("left")
        } catch (c) {
            setTimeout(function() {
                j(b)
            }, 1);
            return
        }
        b()
    }

    function o(b) {
        if (q.readyState === "complete") {
            setTimeout(b, 0);
            return
        }
        if (q.addEventListener) {
            q.addEventListener("DOMContentLoaded", b, false);
            p.addEventListener("load", b, false)
        } else {
            if (q.attachEvent) {
                q.attachEvent("onreadystatechange", b);
                p.attachEvent("onload", b);
                var d = false;
                try {
                    d = (p.frameElement === null)
                } catch (c) {}
                if (q.documentElement.doScroll && d) {
                    setTimeout(function() {
                        j(b)
                    }, 0)
                }
            }
        }
    }
}(document, window, Scrollable._forEachInArray);
Scrollable._scrollWatcher = function(d) {
    return e;

    function e(t) {
        var s = false,
            x = false,
            q = t.scrollTop;
        t.addEventListener("touchstart", u);
        t.addEventListener("touchmove", y);
        t.addEventListener("touchcancel", v);
        t.addEventListener("touchend", b);
        t.addEventListener("scroll", r);
        c();
        t._resetScrolling = w;
        return;

        function c() {
            t._isScrolling = (x || s)
        }

        function w() {
            x = false;
            s = false;
            c()
        }

        function p(f, g, h) {
            if ((f.touches.length <= g) && ((typeof h === "undefined") || (f.changedTouches.length <= h))) {
                return false
            }
            f.preventDefault();
            w();
            return true
        }

        function u(f) {
            if (p(f, 1)) {
                return
            }
            w()
        }

        function y(f) {
            if (p(f, 1)) {
                return
            }
            s = true;
            q = t.scrollTop;
            c()
        }

        function v(f) {
            if (p(f, 0, 1)) {
                return
            }
            w()
        }

        function b(g) {
            if (p(g, 0, 1)) {
                return
            }
            var f;
            if (s) {
                f = Math.abs(t.scrollTop - q);
                if (f > 5) {
                    x = true
                }
                s = false;
                c()
            }
        }

        function r() {
            if (!s && x) {
                w()
            }
        }
    }
}(Scrollable._os);
Scrollable._enableScrolling = function(C, t, x, D, E, s, v, u) {
    var y = z();
    return r;

    function z() {
        if ((C.ios && (C.version >= 5)) || (C.android && (C.version >= 4))) {
            return true
        } else {
            return false
        }
    }

    function r(b, c) {
        if (!t(b)) {
            throw b + " is not a DOM element"
        }
        if (b._scrollable) {
            return
        }
        b._scrollable = true;
        var d;
        b._scrollTop = function(f, e) {
            if (typeof f === "undefined") {
                return d ? Math.max(parseInt(-d.y), 0) : b.scrollTop
            }
            if (!d && (!C.mobile || y)) {
                b.scrollTop = f;
                e && e();
                return
            }
            x(function() {
                d.scrollTo(d.x, Math.min(-f, 0), 1);
                e && e()
            })
        };
        b._scrollLeft = function(e) {
            if (typeof e === "undefined") {
                return d ? Math.max(parseInt(-d.x), 0) : b.scrollLeft
            }
            if (!d && (!C.mobile || y)) {
                b.scrollLeft = e;
                return
            }
            x(function() {
                d.scrollTo(Math.min(-e, 0), d.y, 1)
            })
        };
        b.style.overflow = "scroll";
        if (!c) {
            if (!C.mobile) {
                return
            }
            if (y) {
                b.style["-webkit-overflow-scrolling"] = "touch";
                if (C.ios) {
                    E(b)
                }
                return
            }
        }
        F(b, function(e) {
            d = e
        })
    }

    function F(c, b) {
        c._iScroll = true;
        w(c);
        var d = B(c);
        x(function() {
            var e = new s(c, {
                checkDOMChanges: true,
                useTransform: true,
                useTransition: true,
                hScrollbar: false,
                vScrollbar: false,
                bounce: !!C.ios,
                onScrollMove: d,
                onBeforeScrollEnd: d,
                onScrollEnd: function() {
                    c._iScrolling = false;
                    d()
                },
                onBeforeScrollStart: A,
                onScrollStart: function() {
                    c._iScrolling = true
                }
            });
            c._iScroll = e;
            b(e)
        })
    }

    function w(c) {
        var b = u.createElement("div"),
            d = Array.prototype.slice.call(c.childNodes || []);
        D(d, function(e) {
            var f = c.removeChild(e);
            b.appendChild(f)
        });
        c.appendChild(b);
        c.style.position = "relative";
        b.style["min-height"] = "100%";
        b.style["min-width"] = "100%"
    }

    function B(c) {
        var d, b;
        return function() {
            var e = c._scrollTop(),
                f = c._scrollLeft();
            if ((e === d) && (f === b)) {
                return
            }
            d = e;
            b = f;
            G(c)
        }
    }

    function G(b) {
        if (b.dispatchEvent) {
            var c = u.createEvent("MouseEvents");
            c.initMouseEvent("scroll", false, false, v, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            b.dispatchEvent(c)
        }
    }

    function A(b) {
        var c = b.target;
        while (c.nodeType !== 1) {
            c = c.parentNode
        }
        if ((c.tagName !== "SELECT") && (c.tagName !== "INPUT") && (c.tagName !== "TEXTAREA")) {
            b.preventDefault()
        }
    }
}(Scrollable._os, Scrollable._isDOMNode, Scrollable._onReady, Scrollable._forEachInArray, Scrollable._scrollWatcher, iScroll, window, document);
Scrollable._getScrollableNode = function(c) {
    return function(b) {
        if (c(b) && b._iScroll) {
            return b.childNodes[0]
        } else {
            return b
        }
    }
}(Scrollable._isDOMNode);
Scrollable._enableInfiniteScrolling = function(v, q, w, u, t, p, y, o) {
    var x = 320;
    return s;

    function s(f, V, g) {
        if (w(f)) {
            if (f.length) {
                var O = f.length - 1;
                for (var N = 0; N < O; N++) {
                    s(f[N], V, g)
                }
                return s(f[O], V, g)
            } else {
                return
            }
        }
        if (!q(f)) {
            throw f + " is not a DOM element"
        }
        if (!g && typeof V === "function") {
            g = V;
            V = {}
        }
        if (g) {
            if (V.downGenerator) {
                throw Error("Two downGenerator functions specified")
            }
            V.downGenerator = g
        }
        if ((typeof V !== "object") || (V === null)) {
            throw TypeError("options must be an object if defined, got " + V)
        }
        if (!V.downGenerator && !V.upGenerator) {
            throw Error("No generators specified. What are you even scrolling?")
        }
        if (typeof V.autoStart === "undefined") {
            V.autoStart = true
        }
        if (V.downGenerator && typeof V.downGenerator !== "function") {
            throw "downGenerator " + downGenerator + " is not a function"
        }
        if (V.upGenerator && typeof V.upGenerator !== "function") {
            throw "upGenerator " + upGenerator + " is not a function"
        }
        if (V.scroller && !q(V.scroller)) {
            throw TypeError("options.scroller must be a DOM node, got " + V.scroller)
        }
        var h = V.scroller || A(f),
            P = V.loading,
            R = V.triggerRadius,
            i = false,
            e = !V.upGenerator,
            m = !V.downGenerator,
            U = false,
            c = false,
            T, d, k;
        if (w(h)) {
            h = h[0]
        }
        if (w(P)) {
            P = P[0]
        }
        if (P === null) {
            P = undefined
        }
        if (typeof P !== "undefined") {
            if (V.downGenerator) {
                T = z([P])[0];
                if (V.downGenerator) {
                    d = T.cloneNode(true)
                }
            } else {
                d = z([P])[0]
            }
        }
        if (R === null) {
            R = undefined
        }
        switch (typeof R) {
            case "undefined":
                R = x;
            case "number":
                break;
            default:
                throw TypeError("trigger radius must be a number if defined, got " + R)
        }
        if (!h) {
            p(f);
            h = f
        }
        if (T) {
            y(f).appendChild(T)
        }
        Q();
        if (V.autoStart) {
            X()
        }
        var j = {
            layout: X,
            forceLayout: l,
            isEnabled: b,
            enable: Q,
            disable: n,
            destroy: W
        };
        if (!h._infinites) {
            h._infinites = []
        }
        h._infinites.push(j);
        return j;

        function b() {
            return i
        }

        function Q() {
            if (i) {
                return
            }
            if (U) {
                throw Error("cannot enable infinite scroller that has been destroyed")
            }
            i = true;
            h.addEventListener("scroll", X, false)
        }

        function n() {
            if (!i) {
                return
            }
            i = false;
            h.removeEventListener("scroll", X)
        }

        function X() {
            if (!i || c || U) {
                return
            }
            var B = Y(h, R);
            if (!B) {
                return
            }
            var C = (B === "up");
            if (C && (f._isScrolling || f._iScrolling)) {
                if (k) {
                    clearTimeout(k)
                }
                k = setTimeout(function() {
                    X()
                }, 100);
                return
            }
            c = true;
            S(C, function(D) {
                c = false;
                if (D) {
                    X()
                } else {
                    W(C)
                }
            })
        }

        function l(B) {
            if (!i || U || c) {
                return
            }
            c = true;
            if (typeof B === "undefined") {
                B = !V.downGenerator
            }
            S(B, function(C) {
                c = false;
                if (C) {
                    X()
                } else {
                    W(B)
                }
            })
        }

        function S(D, B) {
            var C = D ? V.upGenerator : V.downGenerator;
            var G = C(F);
            if (typeof G !== "undefined") {
                F(G)
            }

            function F(J, ab) {
                if (U || (e && D) || (m && !D)) {
                    return
                }
                var M = D ? d : T;
                var K = J && J.length && !ab;
                if (J) {
                    if (!u(J) && !w(J)) {
                        J = [J]
                    }
                    J = z(J);
                    var aa = y(f);
                    var H = h.scrollHeight;
                    t(J, function(Z) {
                        E(aa, Z)
                    });
                    if (M) {
                        E(aa, M)
                    }
                    var I = h.scrollHeight;
                    if (D) {
                        var L = I - H;
                        h._scrollTop(h._scrollTop() + L, function() {
                            if (!!v.ios && !h._iScroll) {
                                r(J)
                            }
                            B(K)
                        })
                    } else {
                        B(K)
                    }
                } else {
                    B(K)
                }
            }

            function E(H, I) {
                if (D) {
                    H.insertBefore(I, H.firstChild)
                } else {
                    H.appendChild(I)
                }
            }
        }

        function W(B) {
            if (U) {
                return
            }
            if (B) {
                e = true;
                if (d && d.parentNode) {
                    d.parentNode.removeChild(d)
                }
            } else {
                m = true;
                if (T && T.parentNode) {
                    T.parentNode.removeChild(T)
                }
            }
            U = (m || !V.downGenerator) && (e || !V.upGenerator);
            if (U) {
                n()
            }
        }

        function Y(F, G) {
            var C = F;
            while (C !== document.documentElement) {
                if (C.parentNode) {
                    C = C.parentNode
                } else {
                    return false
                }
            }
            var E = F.clientHeight,
                B = (F._scrollTop ? F._scrollTop() : F.scrollTop),
                D = F.scrollHeight;
            if (!m && D - B - E <= G) {
                return "down"
            } else {
                if (!e && B < G) {
                    return "up"
                } else {
                    return false
                }
            }
        }
    }

    function A(b) {
        do {
            if (b._scrollable) {
                return b
            }
            b = b.parentNode
        } while (b)
    }

    function z(c) {
        var b = [];
        t(c, function(e) {
            switch (typeof e) {
                case "undefined":
                    return;
                case "string":
                    var d = document.createElement("div");
                    d.innerHTML = e;
                    if (d.childNodes) {
                        t(z(d.childNodes), function(f) {
                            b.push(f)
                        })
                    }
                    return;
                case "object":
                    if (e === null) {
                        return
                    } else {
                        if (q(e)) {
                            b.push(e);
                            return
                        } else {
                            if (w(e)) {
                                t(e, function(f) {
                                    b.push(f)
                                });
                                return
                            }
                        }
                    }
                default:
                    throw TypeError("expected an element, got " + e)
            }
        });
        return b
    }

    function r(b) {
        t(b, function(c) {
            var d = c.style.webkitTransform;
            c.style.webkitTransform = "translate3d(0,0,0)";
            setTimeout(function() {
                c.style.webkitTransform = d
            }, 0)
        })
    }
}(Scrollable._os, Scrollable._isDOMNode, Scrollable._isjQueryElem, Scrollable._isArray, Scrollable._forEachInArray, Scrollable._enableScrolling, Scrollable._getScrollableNode, window.jQuery);
window.App = function(c) {
    var d = {
        noConflict: b
    };
    return d;

    function b() {
        if (window.App === d) {
            window.App = c
        }
        return d
    }
}(window.App);
App._Utils = function(m, o, d) {
    var n = function(x) {
        var v = /([^&=]+)=([^&]+)/g,
            t = /\+/g;
        var s = {},
            r, u, w;
        if (x) {
            x = x.replace(t, "%20");
            while ((r = v.exec(x))) {
                u = decodeURIComponent(r[1]);
                w = decodeURIComponent(r[2]);
                s[u] = w
            }
        }
        return s
    }(m.location.href.split("?")[1]);
    var f = function(w) {
        var u = false,
            t, r, s;
        if (n._app_platform === "android") {
            u = true;
            t = "android";
            r = "5.0"
        } else {
            if (n._app_platform === "ios") {
                u = true;
                t = "ios";
                r = "8.1"
            } else {
                if (s = /\bCPU.*OS (\d+(_\d+)?)/i.exec(w)) {
                    t = "ios";
                    r = s[1].replace("_", ".")
                } else {
                    if (s = /\bAndroid (\d+(\.\d+)?)/.exec(w)) {
                        t = "android";
                        r = s[1]
                    }
                }
            }
        }
        var v = {
            faked: u,
            name: t,
            versionString: r,
            version: r && parseFloat(r)
        };
        v[t] = true;
        if (v.ios) {
            o.body.className += " app-ios app-ios-" + parseInt(r)
        } else {
            if (v.android) {
                o.body.className += " app-android app-android-" + parseInt(r)
            }
        }
        if (v.faked || !v.ios) {
            o.body.className += " app-no-scrollbar"
        }
        return v
    }(navigator.userAgent);
    var l = function(r) {
        if (r) {
            return function(s, u, t) {
                return r.call(s, u, t)
            }
        } else {
            return function(t, w, u) {
                for (var v = 0, s = t.length; v < s; v++) {
                    if (v in t) {
                        w.call(u, t[v], v, t)
                    }
                }
            }
        }
    }(Array.prototype.forEach);

    function j(r) {
        if (Array.isArray) {
            return Array.isArray(r)
        } else {
            return Object.prototype.toString.call(r) !== "[object Array]"
        }
    }

    function p(s) {
        if (!s) {
            return false
        }
        try {
            return (s instanceof Node) || (s instanceof HTMLElement)
        } catch (r) {}
        if (typeof s !== "object") {
            return false
        }
        if (typeof s.nodeType !== "number") {
            return false
        }
        if (typeof s.nodeName !== "string") {
            return false
        }
        return true
    }

    function c(r) {
        if (typeof r !== "object" || r === null) {
            return false
        } else {
            return (r.val && r.addClass && r.css && r.html && r.show)
        }
    }

    function k(s) {
        if (o.readyState === "complete") {
            setTimeout(function() {
                s()
            }, 0);
            return
        }
        m.addEventListener("load", r, false);

        function r() {
            m.removeEventListener("load", r);
            setTimeout(function() {
                s()
            }, 0)
        }
    }
    var q = function() {
        var t;
        return s;

        function s(v) {
            if (t) {
                t.push(v)
            } else {
                t = [v];
                r()
            }
        }

        function r() {
            if (typeof kik === "object" && typeof kik.browser === "object" && kik.browser.background && typeof kik.browser.once === "function") {
                kik.browser.once("foreground", u)
            } else {
                u()
            }
        }

        function u() {
            var v = t.shift();
            if (v) {
                k(function() {
                    var w = false;

                    function x() {
                        if (w) {
                            return
                        }
                        w = true;
                        setTimeout(r, 0)
                    }
                    v(x)
                })
            } else {
                t = null
            }
        }
    }();

    function h(s, r) {
        s.style["-webkit-transform"] = r;
        s.style["-moz-transform"] = r;
        s.style["-ms-transform"] = r;
        s.style["-o-transform"] = r;
        s.style.transform = r
    }

    function e(r, s) {
        if (s) {
            r.style["-webkit-transition"] = "-webkit-" + s;
            r.style["-moz-transition"] = "-moz-" + s;
            r.style["-ms-transition"] = "-ms-" + s;
            r.style["-o-transition"] = "-o-" + s;
            r.style.transition = s
        } else {
            r.style["-webkit-transition"] = "";
            r.style["-moz-transition"] = "";
            r.style["-ms-transition"] = "";
            r.style["-o-transition"] = "";
            r.style.transition = ""
        }
    }

    function i(s, t) {
        var r;
        if (t) {
            r = s.style
        } else {
            r = o.defaultView.getComputedStyle(s, null)
        }
        return {
            display: r.display,
            opacity: r.opacity,
            paddingRight: r.paddingRight,
            paddingLeft: r.paddingLeft,
            marginRight: r.marginRight,
            marginLeft: r.marginLeft,
            borderRightWidth: r.borderRightWidth,
            borderLeftWidth: r.borderLeftWidth,
            top: r.top,
            left: r.left,
            height: r.height,
            width: r.width,
            position: r.position
        }
    }

    function g(s) {
        var r = i(s);
        return (r.display !== "none" && r.opacity !== "0")
    }

    function b(v, u, y, x) {
        if (typeof v.length !== "number") {
            v = [v]
        }
        var t = v.map(function(z) {
            return z.elem.style.opacity
        });
        r(function() {
            w(function() {
                s(function() {
                    x()
                })
            })
        });

        function r(z) {
            l(v, function(A) {
                if (typeof A.transitionStart !== "undefined") {
                    h(A.elem, A.transitionStart)
                }
                if (typeof A.opacityStart !== "undefined") {
                    A.elem.style.opacity = A.opacityStart + ""
                }
            });
            setTimeout(function() {
                l(v, function(C) {
                    var A = C.easing || y,
                        B = "transform " + (u / 1000) + "s " + A + ", opacity " + (u / 1000) + "s " + A;
                    e(C.elem, B)
                });
                setTimeout(z, 0)
            }, 0)
        }

        function w(C) {
            l(v, function(D) {
                if (typeof D.transitionEnd !== "undefined") {
                    h(D.elem, D.transitionEnd)
                }
                if (typeof D.opacityEnd !== "undefined") {
                    D.elem.style.opacity = D.opacityEnd + ""
                }
            });
            var B = v[v.length - 1];
            B.elem.addEventListener("webkitTransitionEnd", A, false);
            B.elem.addEventListener("transitionend", A, false);
            B.elem.addEventListener("onTransitionEnd", A, false);
            B.elem.addEventListener("ontransitionend", A, false);
            B.elem.addEventListener("MSTransitionEnd", A, false);
            B.elem.addEventListener("transitionend", A, false);
            var z = false;

            function A(D) {
                if (z || (D.target !== B.elem)) {
                    return
                }
                z = true;
                l(v, function(E) {
                    B.elem.removeEventListener("webkitTransitionEnd", A);
                    B.elem.removeEventListener("transitionend", A);
                    B.elem.removeEventListener("onTransitionEnd", A);
                    B.elem.removeEventListener("ontransitionend", A);
                    B.elem.removeEventListener("MSTransitionEnd", A);
                    B.elem.removeEventListener("transitionend", A)
                });
                C()
            }
        }

        function s(z) {
            l(v, function(A) {
                e(A.elem, "")
            });
            setTimeout(function() {
                l(v, function(B, A) {
                    h(B.elem, "");
                    B.elem.style.opacity = t[A]
                });
                z()
            }, 0)
        }
    }
    d.platform = f.name;
    d.platformVersion = f.version;
    d.queue = q;
    return {
        query: n,
        os: f,
        ready: k,
        forEach: l,
        isArray: j,
        isNode: p,
        isjQueryElem: c,
        setTransform: h,
        setTransition: e,
        animate: b,
        getStyles: i,
        isVisible: g
    }
}(window, document, App);
App._Events = function(g) {
    var b = "__appjsCustomEventing";
    var e = c();
    return {
        init: f,
        fire: d
    };

    function c() {
        try {
            var j = document.createElement("div"),
                h = document.createEvent("CustomEvent");
            h.initEvent("fooBarFace", false, true);
            j.dispatchEvent(h);
            return true
        } catch (i) {
            return false
        }
    }

    function f(k, l) {
        if (e) {
            return
        }
        if (k[b]) {
            g.forEach(l, k[b].addEventType);
            return
        }
        k[b] = {
            fire: h,
            addEventType: i,
            addEventListener: k.addEventListener,
            removeEventListener: k.removeEventListener
        };
        var j = {};
        g.forEach(l, function(m) {
            j[m] = []
        });

        function i(m) {
            if (l.indexOf(m) !== -1) {
                return
            }
            l.push(m);
            j[m] = []
        }

        function h(n) {
            if (l.indexOf(n) === -1) {
                return false
            }
            var o = false,
                m = {
                    preventDefault: function() {
                        o = true
                    }
                };
            g.forEach(j[n], function(p) {
                setTimeout(function() {
                    if (p.call(k, m) === false) {
                        o = true
                    }
                }, 0)
            });
            return !o
        }
        k.addEventListener = function(m, n) {
            if (l.indexOf(m) === -1) {
                k[b].addEventListener.apply(this, arguments);
                return
            }
            var o = j[m];
            if (o.indexOf(n) === -1) {
                o.push(n)
            }
        };
        k.removeEventListener = function(n, o) {
            if (l.indexOf(n) === -1) {
                k[b].removeEventListener.apply(this, arguments);
                return
            }
            var p = j[n],
                m = p.indexOf(o);
            if (m !== -1) {
                p.splice(m, 1)
            }
        }
    }

    function d(j, i) {
        if (j[b]) {
            return j[b].fire(i)
        } else {
            var h = document.createEvent("CustomEvent");
            h.initEvent(i, false, true);
            return j.dispatchEvent(h)
        }
    }
}(App._Utils);
App._Metrics = function(f, e) {
    var b = false;
    e.enableGoogleAnalytics = function() {
        g()
    };
    return {
        watchPage: c
    };

    function g() {
        b = true
    }

    function d(h, i) {
        if (!b) {
            return
        }
        var j = "/" + h;
        if (typeof i !== "undefined") {
            j += "/" + i
        }
        if (typeof f.ga === "function") {
            f.ga("send", "pageview", j);
            return
        }
        if (!f._gaq) {
            f._gaq = []
        }
        if (typeof f._gaq.push === "function") {
            f._gaq.push(["_trackPageview", j])
        }
    }

    function c(k, i, h) {
        var j;
        if ((typeof h === "object") && (typeof h.id !== "undefined")) {
            j = h.id + ""
        }
        k.addEventListener("appShow", function() {
            d(i, j)
        }, false)
    }
}(window, App);
App._Dialog = function(f, j, m, d, e) {
    var g = "app-dialog-visible";
    var i, l;
    d.dialog = function(o, q) {
        if ((typeof o !== "object") || (o === null)) {
            throw TypeError("dialog options must be an object, got " + o)
        }
        switch (typeof o.text) {
            case "undefined":
            case "string":
                break;
            default:
                if (!e.isNode(o.text)) {
                    throw TypeError("dialog text must be a string if defined, got " + o.text)
                }
        }
        for (var p in o) {
            if ((p === "theme") || (p === "title") || (p.substr(p.length - 6) === "Button")) {
                switch (typeof o[p]) {
                    case "undefined":
                    case "string":
                        break;
                    default:
                        throw TypeError("dialog button (" + p + ") must be a string if defined, got " + o[p])
                }
            }
        }
        switch (typeof q) {
            case "undefined":
                q = function() {};
            case "function":
                break;
            default:
                throw TypeError("callback must be a function if defined, got " + q)
        }
        return k(o, q)
    };
    d.dialog.close = function(o) {
        return c(o || false)
    };
    d.dialog.status = function() {
        return h()
    };
    return d.dialog;

    function n(p, v) {
        var o = j.createElement("div");
        o.className += " app-dialog-container";
        if (!e.os.android || (e.os.version >= 4)) {
            o.addEventListener("touchstart", function(w) {
                if (w.target === o) {
                    w.preventDefault()
                }
            }, false)
        }
        var r = j.createElement("div");
        r.className = "app-dialog";
        if (p.theme) {
            r.className += " " + p.theme
        }
        o.appendChild(r);
        if (p.title) {
            var u = j.createElement("div");
            u.className = "title";
            u.textContent = p.title;
            r.appendChild(u)
        }
        if (p.text || p.rawText) {
            var t = j.createElement("div");
            t.className = "text";
            if (e.isNode(p.text)) {
                t.appendChild(p.text)
            } else {
                if (p.rawText) {
                    t.innerHTML = p.rawText
                } else {
                    t.textContent = p.text
                }
            }
            r.appendChild(t)
        }
        if (p.rawHTML) {
            r.appendChild(p.rawHTML)
        }
        if (p.okButton) {
            var q = j.createElement("div");
            q.className = "button ok last";
            if (!p.cancelButton) {
                q.className += " first"
            }
            q.setAttribute("data-button", "ok");
            q.textContent = p.okButton;
            m(q);
            q.addEventListener("click", s, false);
            r.appendChild(q)
        }
        if (p.cancelButton) {
            var q = j.createElement("div");
            q.className = "button cancel first";
            if (!p.okButton) {
                q.className += " last"
            }
            q.setAttribute("data-button", "cancel");
            q.textContent = p.cancelButton;
            m(q);
            q.addEventListener("click", s, false);
            r.appendChild(q)
        }

        function s() {
            var w = this.getAttribute("data-button");
            if (w === "cancel") {
                w = false
            }
            v(w)
        }
        return o
    }

    function k(q, u, s) {
        if (l && !s) {
            l.push([q, u]);
            return
        }
        l = l || [];
        var t = false,
            r = n(q, p),
            o = r.firstChild;
        i = p;
        e.ready(function() {
            j.body.appendChild(r);
            setTimeout(function() {
                r.className += " enabled";
                j.body.className += " " + g
            }, 50)
        });

        function p(v) {
            if (t) {
                return
            }
            t = true;
            i = null;
            r.className = r.className.replace(/\benabled\b/g, "") + " closing";
            if (v) {
                r.className += " closing-success"
            } else {
                r.className += " closing-fail"
            }
            j.body.className = j.body.className.replace(new RegExp("\\b" + g + "\\b", "g"), "");
            setTimeout(function() {
                b();
                u(v)
            }, 0);
            setTimeout(function() {
                try {
                    r.parentNode.removeChild(r)
                } catch (w) {}
            }, 600);
            return true
        }
    }

    function c(o) {
        if (i) {
            return i(o || false)
        }
    }

    function h() {
        return !!i
    }

    function b() {
        if (!l) {
            return
        }
        if (!l.length) {
            l = null;
            return
        }
        var o = l.shift();
        o.push(true);
        k.apply(f, o)
    }
}(window, document, Clickable, App, App._Utils);
App._Form = function(e, b, d, f) {
    d.form = function(g, h) {
        if (f.isjQueryElem(g)) {
            g.each(function() {
                d.form(this, h)
            });
            return
        }
        if (!f.isNode(g)) {
            throw TypeError("form must be a DOM node, got " + g)
        }
        if (typeof h !== "function") {
            throw TypeError("callback must be a function, got " + h)
        }
        c(g, h)
    };
    return {};

    function c(j, m) {
        var l = (j.nodeName === "FORM"),
            h = false,
            i;
        if (l) {
            var k = b.createElement("input");
            k.style.display = "none";
            k.type = "submit";
            j.appendChild(k);
            j.addEventListener("submit", function(n) {
                n.preventDefault();
                g()
            }, false);
            i = j.querySelectorAll(".app-submit")
        } else {
            i = [j]
        }
        f.forEach(i, function(n) {
            if (n.nodeName === "TEXTAREA") {
                isText = true
            } else {
                if (n.nodeName !== "INPUT") {
                    isText = false
                } else {
                    switch ((n.type || "").toLowerCase()) {
                        case "button":
                        case "submit":
                        case "reset":
                        case "hidden":
                            isText = false;
                            break;
                        default:
                            isText = true;
                            break
                    }
                }
            }
            if (isText) {
                n.addEventListener("keydown", function(o) {
                    if (o.which === 13) {
                        o.preventDefault();
                        g()
                    }
                }, false)
            } else {
                n.addEventListener("click", function(o) {
                    o.preventDefault();
                    g()
                }, false)
            }
        });

        function g() {
            if (h) {
                return
            }
            h = true;
            j.disabled = true;
            var p = {},
                o = l ? j.querySelectorAll("[name]") : [j],
                n = false;
            if (l) {
                f.forEach(j.querySelectorAll("[name]"), function(q) {
                    p[q.name] = q.value
                })
            } else {
                p.value = j.value;
                if (j.name) {
                    p[j.name] = j.value
                }
            }
            f.forEach(o, function(q) {
                q.disabled = true;
                if (q.blur) {
                    q.blur()
                }
            });
            if (l && j.blur) {
                j.blur()
            }
            m.call(this, p, function() {
                if (n) {
                    return
                }
                n = true;
                f.forEach(o, function(q) {
                    q.disabled = false
                });
                h = false;
                j.disabled = false
            })
        }
    }
}(window, document, App, App._Utils);
App._Scroll = function(d, c, m) {
    var p = {
            APP_CONTENT: "app-content",
            APP_SCROLLABLE: "app-scrollable",
            APP_SCROLLHACK: "app-scrollhack",
            NO_SCROLL: "data-no-scroll",
            SCROLLABLE: "data-scrollable",
            LAST_SCROLL: "data-last-scroll",
            SCROLL_STYLE: "data-scroll-style",
            TOUCH_SCROLL: "-webkit-overflow-scrolling"
        },
        h = "__appjsPageManager";
    c.infiniteScroll = function(v, t, w) {
        if (m.isjQueryElem(v)) {
            if (v.length) {
                var s = v.length - 1;
                for (var u = 0; u < s; u++) {
                    c.infiniteScroll(v[u], t, w)
                }
                return c.infiniteScroll(v[s], t, w)
            } else {
                return
            }
        }
        if (!m.isNode(v)) {
            throw TypeError("infinite scroll container must be a DOM node, got " + v)
        }
        return i(v, t, w)
    };
    return {
        setup: l,
        disable: o,
        saveScrollPosition: f,
        saveScrollStyle: j,
        restoreScrollPosition: g,
        restoreScrollStyle: b
    };

    function l(s) {
        m.forEach(s.querySelectorAll("." + p.APP_CONTENT), function(t) {
            if (t.getAttribute(p.NO_SCROLL) === null) {
                q(t)
            }
        });
        m.forEach(s.querySelectorAll("[" + p.SCROLLABLE + "]"), function(t) {
            q(t)
        })
    }

    function q(t) {
        var s = !!window.APP_FORCE_ISCROLL;
        d(t, s);
        t.className += " " + p.APP_SCROLLABLE;
        if (!s && m.os.ios && m.os.version < 6) {
            t.className += " " + p.APP_SCROLLHACK
        }
    }

    function o(s) {
        m.forEach(s.querySelectorAll("*"), function(t) {
            t.style[p.TOUCH_SCROLL] = ""
        })
    }

    function n(t) {
        var s = [];
        if (t) {
            m.forEach(t.querySelectorAll("." + p.APP_SCROLLABLE), function(u) {
                if (u._scrollable) {
                    s.push(u)
                }
            })
        }
        return s
    }

    function f(s) {
        m.forEach(n(s), function(t) {
            if (t._iScroll) {
                return
            }
            var u = t._scrollTop();
            t.setAttribute(p.LAST_SCROLL, u + "")
        })
    }

    function j(s) {
        m.forEach(n(s), function(u) {
            if (u._iScroll) {
                return
            }
            var t = u.style[p.TOUCH_SCROLL] || "";
            u.style[p.TOUCH_SCROLL] = "";
            u.setAttribute(p.SCROLL_STYLE, t)
        })
    }

    function g(s, t) {
        m.forEach(n(s), function(u) {
            if (u._iScroll) {
                return
            }
            var v = parseInt(u.getAttribute(p.LAST_SCROLL));
            if (v) {
                if (!t) {
                    setTimeout(function() {
                        u._scrollTop(v)
                    }, 0)
                } else {
                    u._scrollTop(v)
                }
            }
        })
    }

    function b(s) {
        m.forEach(n(s), function(u) {
            if (u._iScroll) {
                return
            }
            var t = u.getAttribute(p.SCROLL_STYLE) || "";
            if (t) {
                u.style[p.TOUCH_SCROLL] = t
            }
        });
        g(s, true)
    }

    function i(v, u, x) {
        var w = u.page || e(v),
            t = r(w);
        if (!w || !t) {
            throw Error("could not find parent app-page")
        }
        if (!u) {
            u = {}
        }
        if (typeof u.scroller === "undefined") {
            u.scroller = k(v)
        }
        u.autoStart = false;
        var s = d.infinite(v, u, x);
        s.forceLayout();
        s.disable();
        t.ready(function() {
            scrollReady = true;
            try {
                s.enable()
            } catch (y) {
                return
            }
            s.layout();
            w.addEventListener("appShow", function() {
                s.layout()
            });
            w.addEventListener("appDestroy", function() {
                s.destroy()
            })
        });
        return s
    }

    function e(t) {
        var s = t;
        do {
            if (/\bapp\-page\b/.test(s.className)) {
                return s
            }
        } while (s = s.parentNode)
    }

    function k(t) {
        var s = t;
        do {
            if (s._scrollable || /\bapp\-content\b/.test(s.className)) {
                return s
            }
        } while (s = s.parentNode)
    }

    function r(s) {
        if (s) {
            return s[h]
        }
    }
}(Scrollable, App, App._Utils);
(function(k, d, i) {
    var g = {};
    if (d.platform === "ios" && d.platformVersion >= 5 && !i.os.faked && (typeof kik !== "object" || kik === null || !kik.enabled)) {
        h()
    }
    return;

    function h() {
        k.addEventListener("touchstart", function(m) {
            var l = c(m);
            if (l && !l._iScroll) {
                if ((l.scrollHeight - l.clientHeight > 1) && ((l.scrollTop <= 0) || (l.scrollTop + l.clientHeight >= l.scrollHeight))) {
                    e(m)
                }
            }
        });
        k.addEventListener("touchmove", function(m) {
            var l = c(m);
            if (!l) {
                m.preventDefault()
            } else {
                if (l._iScroll) {
                    m.preventDefault()
                } else {
                    if (m.changedTouches) {
                        if (m.changedTouches.length === 1) {
                            b(m)
                        }
                        j(m)
                    }
                }
            }
        });
        k.addEventListener("touchcancel", function(l) {
            f(l)
        });
        k.addEventListener("touchend", function(l) {
            f(l)
        })
    }

    function c(m) {
        var l = m.target;
        if (l) {
            do {
                if (l._scrollable) {
                    break
                }
            } while (l = l.parentNode)
        }
        return l
    }

    function b(o) {
        var n = c(o),
            p = o.changedTouches[0],
            m = g[p.identifier],
            l = p.pageY;
        if (n && typeof m !== "undefined") {
            if (n.scrollTop <= 0) {
                if (m > l) {
                    delete g[p.identifier]
                } else {
                    o.preventDefault()
                }
            } else {
                if (n.scrollTop + n.clientHeight >= n.scrollHeight) {
                    if (m < l) {
                        delete g[p.identifier]
                    } else {
                        o.preventDefault()
                    }
                } else {
                    delete g[p.identifier]
                }
            }
        }
    }

    function e(o) {
        if (o.changedTouches) {
            for (var n = 0, m = o.changedTouches.length; n < m; n++) {
                g[o.changedTouches[n].identifier] = o.changedTouches[n].pageY
            }
        }
    }

    function j(o) {
        if (o.changedTouches) {
            for (var n = 0, m = o.changedTouches.length; n < m; n++) {
                if (o.changedTouches[n].identifier in g) {
                    g[o.changedTouches[n].identifier] = o.changedTouches[n].pageY
                }
            }
        }
    }

    function f(p) {
        if (p.changedTouches) {
            for (var n = 0, m = p.changedTouches.length; n < m; n++) {
                delete g[p.changedTouches[n].identifier]
            }
        }
        if (p.touches) {
            var o = [];
            for (var n = 0, m = p.touches.length; n < m; n++) {
                o.push(p.touches[n].identifier + "")
            }
            for (var q in g) {
                if (o.indexOf(q) === -1) {
                    delete g[q]
                }
            }
        }
    }
})(document, App, App._Utils);
App._Pages = function(M, e, o, T, J, K, U, G, q) {
    var A = "data-page",
        s = "app-page",
        m = "app-loaded",
        z = "app-ios-statusbar",
        S = "app-android-statusbar",
        j = "__appjsFlushReadyQueue",
        I = "__appjsPageManager",
        b = {
            SHOW: "show",
            HIDE: "hide",
            BACK: "back",
            FORWARD: "forward",
            BEFORE_BACK: "beforeBack",
            READY: "ready",
            DESTROY: "destroy",
            LAYOUT: "layout",
            ONLINE: "online",
            OFFLINE: "offline"
        };
    var x = false,
        F = !!M.APP_FORCE_ISCROLL,
        c = {},
        w = {},
        t = {},
        Q = false;
    h();
    if (M.APP_ENABLE_STATUSBAR || M.APP_ENABLE_IOS_STATUSBAR) {
        i()
    }
    J.add = function(W, X) {
        if (typeof W !== "string") {
            X = W;
            W = undefined
        }
        if (!K.isNode(X)) {
            throw TypeError("page template node must be a DOM node, got " + X)
        }
        r(X, W)
    };
    J.controller = function(W, X, Y) {
        if (typeof W !== "string") {
            throw TypeError("page name must be a string, got " + W)
        }
        if (typeof X !== "function") {
            throw TypeError("page controller must be a function, got " + X)
        }
        switch (typeof Y) {
            case "undefined":
                Y = function() {};
                break;
            case "function":
                break;
            default:
                throw TypeError("page cleanup handler must be a function, got " + Y)
        }
        if (X) {
            L(W, X)
        }
        if (Y) {
            y(W, Y)
        }
    };
    J.populator = J.controller;
    J.generate = function(W, X) {
        if (typeof W !== "string") {
            throw TypeError("page name must be a string, got " + W)
        }
        switch (typeof X) {
            case "undefined":
                X = {};
                break;
            case "object":
                break;
            default:
                throw TypeError("page arguments must be an object if defined, got " + X)
        }
        return O(W, X)
    };
    J.destroy = function(W) {
        if (!K.isNode(W)) {
            throw TypeError("page node must be a DOM node, got " + W)
        }
        return g(W)
    };
    J._layout = C;
    J._enableStatusBar = i;
    J._enableIOSStatusBar = i;
    return {
        EVENTS: b,
        has: P,
        createManager: B,
        startGeneration: d,
        finishGeneration: n,
        fire: E,
        startDestruction: D,
        finishDestruction: l,
        fixContent: f,
        populateBackButton: p
    };

    function v() {
        if (x) {
            return
        }
        x = true;
        var X = e.getElementsByClassName(s);
        for (var W = X.length; W--;) {
            r(X[W])
        }
        e.body.className += " " + m
    }

    function r(X, W) {
        if (!W) {
            W = X.getAttribute(A)
        }
        if (!W) {
            throw TypeError("page name was not specified")
        }
        X.setAttribute(A, W);
        if (X.parentNode) {
            X.parentNode.removeChild(X)
        }
        c[W] = X.cloneNode(true)
    }

    function P(W) {
        v();
        return (W in c)
    }

    function V(W) {
        if (!P(W)) {
            throw TypeError(W + " is not a known page")
        }
        return c[W].cloneNode(true)
    }

    function L(W, X) {
        w[W] = X
    }

    function y(W, X) {
        t[W] = X
    }

    function N(W, Z, aa, Y) {
        var X = w[W];
        if (!X) {
            return
        }
        for (var ab in X) {
            Z[ab] = X[ab]
        }
        for (var ab in X.prototype) {
            Z[ab] = X.prototype[ab]
        }
        Z.page = aa;
        Z.args = Y;
        X.call(Z, aa, Y)
    }

    function k(W, Y, aa, X) {
        var Z = t[W];
        if (Z) {
            Z.call(Y, aa, X)
        }
        E(Y, aa, b.DESTROY)
    }

    function B(Y) {
        var W = {
            restored: Y,
            showing: false,
            online: navigator.onLine
        };
        var X = [];
        W.ready = function(Z) {
            if (typeof Z !== "function") {
                throw TypeError("ready must be called with a function, got " + Z)
            }
            if (X) {
                X.push(Z)
            } else {
                Z.call(W)
            }
        };
        W[j] = function() {
            K.ready(function() {
                if (!X) {
                    return
                }
                var Z = X.slice();
                X = null;
                if (K.isNode(W.page)) {
                    E(W, W.page, b.READY)
                }
                K.forEach(Z, function(aa) {
                    aa.call(W)
                })
            })
        };
        return W
    }

    function O(W, Y) {
        var X = {},
            Z = d(W, X, Y);
        n(W, X, Z, Y);
        return Z
    }

    function g(X) {
        var W = X.getAttribute(A);
        D(W, {}, X, {});
        l(W, {}, X, {})
    }

    function d(W, Z, Y) {
        var aa = V(W);
        var ab = [];
        for (var X in b) {
            ab.push(H(b[X]))
        }
        U.init(aa, ab);
        G.watchPage(aa, W, Y);
        aa[I] = Z;
        f(aa);
        K.forEach(aa.querySelectorAll(".app-button"), u);
        aa.addEventListener("DOMNodeInserted", function(ad) {
            var ac = ad.srcElement;
            if (ac.classList && ac.classList.contains("app-button")) {
                u(ac)
            }
        });
        N(W, Z, aa, Y);
        aa.addEventListener(H(b.SHOW), function() {
            setTimeout(function() {
                if (typeof Z[j] === "function") {
                    Z[j]()
                }
            }, 0)
        }, false);
        return aa
    }

    function u(W) {
        if (W.getAttribute("data-no-click") !== null || W._clickable) {
            return
        }
        o(W);
        W.addEventListener("click", function() {
            var ae = W.getAttribute("data-target"),
                aa = W.getAttribute("data-target-args"),
                X = (W.getAttribute("data-back") !== null),
                ad = (W.getAttribute("data-manual-back") !== null),
                Y;
            try {
                Y = JSON.parse(aa)
            } catch (ac) {}
            if ((typeof Y !== "object") || (Y === null)) {
                Y = {}
            }
            if (!X && !ae) {
                return
            }
            if (X && ad) {
                return
            }
            var ab = W.getAttribute("data-clickable-class");
            if (ab) {
                W.disabled = true;
                W.classList.add(ab)
            }
            if (X) {
                J.back(Z)
            } else {
                if (ae) {
                    J.load(ae, Y, {}, Z)
                }
            }

            function Z() {
                if (ab) {
                    W.disabled = false;
                    W.classList.remove(ab)
                }
            }
        }, false)
    }

    function E(X, Z, Y) {
        var W = H(Y),
            aa = R(Y),
            ab = true;
        if (!U.fire(Z, W)) {
            ab = false
        }
        if (typeof X[aa] === "function") {
            if (X[aa]() === false) {
                ab = false
            }
        }
        return ab
    }

    function H(W) {
        return "app" + W[0].toUpperCase() + W.slice(1)
    }

    function R(W) {
        return "on" + W[0].toUpperCase() + W.slice(1)
    }

    function n(W, Y, Z, X) {
        q.setup(Z)
    }

    function D(W, Y, Z, X) {
        if (!K.os.ios || K.os.version < 6) {
            q.disable(Z)
        }
        if (typeof Y.reply === "function") {
            Y._appNoBack = true;
            Y.reply()
        }
    }

    function l(W, Y, Z, X) {
        k(W, Y, Z, X)
    }

    function h() {
        M.addEventListener("orientationchange", C);
        M.addEventListener("resize", C);
        M.addEventListener("load", C);
        setTimeout(C, 0);
        M.addEventListener("online", function() {
            if (J._Stack) {
                K.forEach(J._Stack.get(), function(W) {
                    W[2].online = true;
                    E(W[2], W[3], b.ONLINE)
                })
            }
        }, false);
        M.addEventListener("offline", function() {
            if (J._Stack) {
                K.forEach(J._Stack.get(), function(W) {
                    W[2].online = false;
                    E(W[2], W[3], b.OFFLINE)
                })
            }
        }, false)
    }

    function C() {
        f();
        var W;
        if (J._Stack) {
            W = J._Stack.getCurrent()
        }
        if (W) {
            E(W[2], W[3], b.LAYOUT)
        }
        setTimeout(f, 0);
        setTimeout(f, 10);
        setTimeout(f, 100)
    }

    function f(ab) {
        if (!ab) {
            if (J._Navigation) {
                ab = J._Navigation.getCurrentNode()
            }
            if (!ab) {
                return
            }
        }
        var Y = ab.querySelector(".app-topbar"),
            Z = ab.querySelector(".app-content"),
            W = M.innerHeight;
        if (!Z) {
            return
        }
        if (!Y) {
            Z.style.height = W + "px";
            return
        }
        var aa = e.defaultView.getComputedStyle(Y, null),
            X = K.os.android ? 56 : 44;
        if (Q) {
            X += K.os.android ? 24 : 20
        }
        if (aa.height) {
            X = (parseInt(aa.height) || 0);
            if ((aa.boxSizing || aa.webkitBoxSizing) !== "border-box") {
                X += (parseInt(aa.paddingBottom) || 0) + (parseInt(aa.paddingTop) || 0);
                X += (parseInt(aa.borderBottomWidth) || 0) + (parseInt(aa.borderTopWidth) || 0)
            }
        }
        Z.style.height = (W - X) + "px"
    }

    function p(aa, ab) {
        if (!ab) {
            return
        }
        var Y = aa.querySelector(".app-topbar .left.app-button"),
            X = ab.querySelector(".app-topbar .app-title");
        if (!Y || !X || (Y.getAttribute("data-autotitle") === null)) {
            return
        }
        var W = X.textContent,
            Z = Y.textContent;
        if (!W || Z) {
            return
        }
        if (W.length > 13) {
            W = W.substr(0, 12) + ".."
        }
        Y.textContent = W
    }

    function i() {
        if (Q) {
            return
        }
        Q = true;
        if (K.os.android) {
            e.body.className += " " + S
        } else {
            e.body.className += " " + z
        }
        K.ready(function() {
            setTimeout(C, 6)
        })
    }
}(window, document, Clickable, Scrollable, App, App._Utils, App._Events, App._Metrics, App._Scroll);
App._Stack = function(k, o, q, c, x, r) {
    var e = "__APP_JS_STACK__" + k.location.pathname,
        i = "__APP_JS_TIME__" + k.location.pathname;
    var j = [];
    q.getStack = function() {
        return b()
    };
    q.getPage = function(y) {
        var z = j.length - 1;
        switch (typeof y) {
            case "undefined":
                y = z;
                break;
            case "number":
                if (Math.abs(y) > z) {
                    throw TypeError("absolute index cannot be greater than stack size, got " + y)
                }
                if (y < 0) {
                    y = z + y
                }
                break;
            default:
                throw TypeError("page index must be a number if defined, got " + y)
        }
        return g(y)
    };
    q.removeFromStack = function(A, z) {
        var y = j.length - 1;
        switch (typeof A) {
            case "undefined":
                A = 0;
                break;
            case "number":
                if (Math.abs(A) > y) {
                    throw TypeError("absolute start index cannot be greater than stack size, got " + A)
                }
                if (A < 0) {
                    A = y + A
                }
                break;
            default:
                throw TypeError("start index must be a number if defined, got " + A)
        }
        switch (typeof z) {
            case "undefined":
                z = y;
                break;
            case "number":
                if (Math.abs(z) > y) {
                    throw TypeError("absolute end index cannot be greater than stack size, got " + z)
                }
                if (z < 0) {
                    z = y + z
                }
                break;
            default:
                throw TypeError("end index must be a number if defined, got " + z)
        }
        if (A > z) {
            throw TypeError("start index cannot be greater than end index")
        }
        l(A, z)
    };
    q.addToStack = function(z, y) {
        var A = j.length - 1;
        switch (typeof z) {
            case "undefined":
                z = 0;
                break;
            case "number":
                if (Math.abs(z) > A) {
                    throw TypeError("absolute index cannot be greater than stack size, got " + z)
                }
                if (z < 0) {
                    z = A + z
                }
                break;
            default:
                throw TypeError("index must be a number if defined, got " + z)
        }
        if (!c.isArray(y)) {
            throw TypeError("added pages must be an array, got " + y)
        }
        y = y.slice();
        c.forEach(y, function(C, B) {
            if (typeof C === "string") {
                C = [C, {}]
            } else {
                if (c.isArray(C)) {
                    C = C.slice()
                } else {
                    throw TypeError("page description must be an array (page name, arguments), got " + C)
                }
            }
            if (typeof C[0] !== "string") {
                throw TypeError("page name must be a string, got " + C[0])
            }
            switch (typeof C[1]) {
                case "undefined":
                    C[1] = {};
                case "object":
                    break;
                default:
                    throw TypeError("page arguments must be an object if defined, got " + C[1])
            }
            switch (typeof C[2]) {
                case "undefined":
                    C[2] = {};
                case "object":
                    break;
                default:
                    throw TypeError("page options must be an object if defined, got " + C[2])
            }
            y[B] = C
        });
        w(z, y)
    };
    q.saveStack = function() {
        n()
    };
    q.destroyStack = function() {
        s()
    };
    q.restore = m();
    return {
        get: b,
        getCurrent: t,
        getPage: g,
        pop: v,
        push: h,
        size: d,
        save: n,
        destroy: s
    };

    function n() {
        try {
            var z = [];
            for (var A = 0, y = j.length; A < y; A++) {
                if (j[A][4].restorable === false) {
                    break
                }
                z.push([j[A][0], j[A][3], j[A][2]])
            }
            localStorage[e] = JSON.stringify(z);
            localStorage[i] = +new Date() + ""
        } catch (B) {}
    }

    function s() {
        delete localStorage[e];
        delete localStorage[i]
    }

    function b() {
        return j.slice().map(f)
    }

    function d() {
        return j.length
    }

    function t() {
        var y = j[j.length - 1];
        if (y) {
            return f(y)
        }
    }

    function v() {
        var y = j.pop();
        if (y) {
            return f(y)
        }
    }

    function h(y) {
        j.push([y[0], y[3], y[4], y[1], y[2]])
    }

    function g(y) {
        var z = j[y];
        if (z) {
            return z[1]
        }
    }

    function f(A) {
        var y = {};
        for (var z in A[3]) {
            y[z] = A[3][z]
        }
        return [A[0], y, A[4], A[1], A[2]]
    }

    function u(z, y) {
        var A = j.splice(z, y - z);
        c.forEach(A, function(B) {
            r.startDestruction(B[0], B[4], B[1], B[3]);
            r.finishDestruction(B[0], B[4], B[1], B[3])
        })
    }

    function l(z, y) {
        q._Navigation.enqueue(function(A) {
            u(z, y);
            A()
        })
    }

    function p(z, y, A) {
        var C = [],
            B;
        c.forEach(y, function(E) {
            var D = r.createManager(true),
                F = r.startGeneration(E[0], D, E[1]);
            if (!E[2].transition && D.transition) {
                E[2].transition = D.transition
            }
            r.populateBackButton(F, B);
            r.finishGeneration(E[0], D, F, E[1]);
            x.saveScrollPosition(F);
            x.saveScrollStyle(F);
            C.push([E[0], F, E[2], E[1], D]);
            B = F
        });
        C.unshift(0);
        C.unshift(z);
        Array.prototype.splice.apply(j, C)
    }

    function w(z, y) {
        q._Navigation.enqueue(function(A) {
            p(z, y);
            A()
        })
    }

    function m(z) {
        var y, B;
        try {
            y = JSON.parse(localStorage[e]);
            storedTime = parseInt(localStorage[i]);
            B = y.pop()
        } catch (A) {
            return
        }
        if (!B) {
            return
        }
        return function(C, E) {
            switch (typeof C) {
                case "function":
                    E = C;
                case "undefined":
                    C = {};
                case "object":
                    if (C !== null) {
                        break
                    }
                default:
                    throw TypeError("restore options must be an object if defined, got " + C)
            }
            switch (typeof E) {
                case "undefined":
                    E = function() {};
                case "function":
                    break;
                default:
                    throw TypeError("restore callback must be a function if defined, got " + E)
            }
            if (+new Date() - storedTime >= C.maxAge) {
                throw TypeError("restore content is too old")
            }
            if (!r.has(B[0])) {
                throw TypeError(B[0] + " is not a known page")
            }
            c.forEach(y, function(F) {
                if (!r.has(F[0])) {
                    throw TypeError(F[0] + " is not a known page")
                }
            });
            try {
                p(0, y, true)
            } catch (D) {
                u(0, j.length);
                throw Error("failed to restore stack")
            }
            n();
            try {
                q.load(B[0], B[1], B[2], E)
            } catch (D) {
                u(0, j.length);
                throw Error("failed to restore stack")
            }
        }
    }
}(window, document, App, App._Utils, App._Scroll, App._Pages);
App._Transitions = function(n, w, A, x, e, D, y, t) {
    var c = "app-transition",
        h = "slide-left",
        z = "android-l-in",
        f = "fade-on",
        u = "instant",
        v = {
            instant: "instant",
            fade: "fade",
            "fade-on": "fade-off",
            "fade-off": "fade-on",
            "scale-in": "scale-out",
            "scale-out": "scale-in",
            "rotate-left": "rotate-right",
            "rotate-right": "rotate-left",
            "cube-left": "cube-right",
            "cube-right": "cube-left",
            "swap-left": "swap-right",
            "swap-right": "swap-left",
            "explode-in": "explode-out",
            "explode-out": "explode-in",
            "implode-in": "implode-out",
            "implode-out": "implode-in",
            "slide-left": "slide-right",
            "slide-right": "slide-left",
            "slide-up": "slide-down",
            "slide-down": "slide-up",
            "slideon-left": "slideoff-left",
            "slideon-right": "slideoff-right",
            "slideon-up": "slideoff-up",
            "slideon-down": "slideoff-down",
            "slideoff-left": "slideon-left",
            "slideoff-right": "slideon-right",
            "slideoff-up": "slideon-up",
            "slideoff-down": "slideon-down",
            "slideon-left-ios": "slideoff-right-ios",
            "glideon-right": "glideoff-right",
            "glideoff-right": "slideon-right",
            "glideon-left": "glideoff-left",
            "glideoff-left": "slideon-left",
            "glideon-down": "glideoff-down",
            "glideoff-down": "slideon-down",
            "glideon-up": "glideoff-up",
            "glideoff-up": "slideon-up",
            "android-l-in": "android-l-out",
            "android-l-out": "android-l-in"
        },
        b = 10;
    var o = false,
        m, q, d;
    if (e.os.ios) {
        k(h)
    } else {
        if (e.os.android) {
            if (e.os.version >= 4) {
                k(z)
            } else {
                if ((e.os.version < 2.3) || /LT15a/i.test(navigator.userAgent)) {
                    k(u)
                } else {
                    k(f)
                }
            }
        }
    }
    r();
    x.setDefaultTransition = function(F) {
        if (typeof F === "object") {
            switch (e.os.name) {
                case "android":
                    if ((e.os.version < 4) && F.androidFallback) {
                        F = F.androidFallback
                    } else {
                        F = F.android
                    }
                    break;
                case "ios":
                    if ((e.os.version < 5) && F.iosFallback) {
                        F = F.iosFallback
                    } else {
                        F = F.ios
                    }
                    break;
                default:
                    F = F.fallback;
                    break
            }
            if (!F) {
                return
            }
        }
        if (typeof F !== "string") {
            throw TypeError("transition must be a string if defined, got " + F)
        }
        if (!(F in v)) {
            throw TypeError("invalid transition type, got " + F)
        }
        k(F)
    };
    x.getDefaultTransition = function() {
        return m
    };
    x.getReverseTransition = function() {
        return q
    };
    x.enableDragTransition = function() {
        j()
    };
    return {
        REVERSE_TRANSITION: v,
        run: i,
        enableDrag: p,
        disableDrag: l
    };

    function k(F) {
        m = F;
        q = v[m]
    }

    function g(F) {
        if (!e.os.ios) {
            return false
        } else {
            if (F === "slide-left") {
                return true
            } else {
                if (F === "slide-right") {
                    return true
                } else {
                    return false
                }
            }
        }
    }

    function i(K, J, H, L, G) {
        if (!H.transition) {
            H.transition = (G ? q : m)
        }
        var F = (e.os.ios && (e.os.version >= 7) && {
            "slideon-down": 1,
            "slideoff-down": 1
        }[H.transition]);
        if (!H.duration) {
            if (!e.os.ios) {
                H.duration = 180
            } else {
                if (e.os.version < 7) {
                    H.duration = 325
                } else {
                    if (F) {
                        H.duration = 475
                    } else {
                        H.duration = 425
                    }
                }
            }
        }
        if (!H.easing) {
            if (e.os.ios) {
                if (F) {
                    H.easing = "cubic-bezier(0.4,0.6,0.05,1)"
                } else {
                    if (H.transition === "slideon-left-ios" || H.transition === "slideoff-right-ios") {
                        if (e.os.version < 7) {
                            H.easing = "ease-in-out"
                        } else {
                            H.easing = "cubic-bezier(0.4,0.6,0.2,1)"
                        }
                    }
                }
            } else {
                if (e.os.android) {
                    if (H.transition === "android-l-in") {
                        H.easing = "ease-out"
                    } else {
                        if (H.transition === "android-l-out") {
                            H.easing = "ease-in"
                        }
                    }
                }
            }
        }
        w.body.className += " " + c;
        if (H.transition === "instant") {
            A(K, J, H, function() {
                setTimeout(I, 0)
            })
        } else {
            if (g(H.transition)) {
                s(K, J, H, I)
            } else {
                A(K, J, H, I)
            }
        }

        function I() {
            w.body.className = w.body.className.replace(new RegExp("\\b" + c + "\\b"), "");
            L()
        }
    }

    function s(I, H, O, N) {
        var K = (O.transition === "slide-left"),
            F = K ? H : I,
            L = B(H, I, K);
        if (!L) {
            A(I, H, O, N);
            return
        }
        var M = F.style.position,
            J = F.style.zIndex,
            G = F.style.background;
        F.style.position = "fixed";
        F.style.zIndex = "4000";
        F.style.background = "none";
        if (K) {
            I.parentNode.insertBefore(H, I)
        } else {
            if (I.nextSibling) {
                I.parentNode.insertBefore(H, I.nextSibling)
            } else {
                I.parentNode.appendChild(H)
            }
        }
        if (x._Pages) {
            x._Pages.fixContent(I);
            x._Pages.fixContent(H)
        }
        if (e.os.version < 7) {
            O.easing = "ease-in-out"
        } else {
            O.easing = "cubic-bezier(0.4,0.6,0.2,1)"
        }
        e.animate(L, O.duration, O.easing, function() {
            I.parentNode.removeChild(I);
            F.style.position = M;
            F.style.zIndex = J;
            F.style.background = G;
            N()
        })
    }

    function B(J, L, O) {
        var H = L.querySelector(".app-topbar"),
            P = L.querySelector(".app-topbar .app-title"),
            G = L.querySelector(".app-topbar .left.app-button"),
            M = L.querySelector(".app-content"),
            I = J.querySelector(".app-topbar"),
            F = J.querySelector(".app-topbar .app-title"),
            Q = J.querySelector(".app-topbar .left.app-button"),
            K = J.querySelector(".app-content"),
            N = [];
        if (!H || !I || !M || !K || !e.isVisible(H) || !e.isVisible(I)) {
            return
        }
        if (G && (G.getAttribute("data-noslide") !== null)) {
            G = undefined
        }
        if (Q && (Q.getAttribute("data-noslide") !== null)) {
            Q = undefined
        }
        if (O) {
            N.push({
                opacityStart: 0,
                opacityEnd: 1,
                elem: I
            })
        } else {
            N.push({
                opacityStart: 1,
                opacityEnd: 0,
                elem: H
            })
        }
        if (P) {
            N.push({
                transitionStart: "translate3d(0,0,0)",
                transitionEnd: "translate3d(" + C(Q, O) + "px,0,0)",
                elem: P
            })
        }
        if (F) {
            N.push({
                transitionStart: "translate3d(" + C(G, !O) + "px,0,0)",
                transitionEnd: "translate3d(0,0,0)",
                elem: F
            })
        }
        if (e.os.version >= 5) {
            if (G) {
                N.push({
                    transitionStart: "translate3d(0,0,0)",
                    transitionEnd: "translate3d(" + E(G, Q, !O) + "px,0,0)",
                    elem: G
                })
            }
            if (Q) {
                N.push({
                    transitionStart: "translate3d(" + E(Q, G, O) + "px,0,0)",
                    transitionEnd: "translate3d(0,0,0)",
                    elem: Q
                })
            }
        }
        if (e.os.version < 7) {
            N.push({
                transitionStart: "translate3d(0,0,0)",
                transitionEnd: "translate3d(" + (O ? -100 : 100) + "%,0,0)",
                elem: M
            }, {
                transitionStart: "translate3d(" + (O ? 100 : -100) + "%,0,0)",
                transitionEnd: "translate3d(0,0,0)",
                elem: K
            })
        } else {
            N.push({
                transitionStart: "translate3d(0,0,0)",
                transitionEnd: "translate3d(" + (O ? -30 : 100) + "%,0,0)",
                elem: M
            }, {
                transitionStart: "translate3d(" + (O ? 100 : -30) + "%,0,0)",
                transitionEnd: "translate3d(0,0,0)",
                elem: K
            })
        }
        return N
    }

    function E(I, H, G) {
        var J = I.textContent.length * (e.os.version < 7 ? 10 : 12),
            F = H ? (H.textContent.length * 15) : 0;
        if (!G) {
            return (F - n.innerWidth) / 2
        } else {
            return (n.innerWidth - J) / 2
        }
    }

    function C(F, G) {
        var H = 0;
        if (F && (e.os.version >= 5)) {
            H = F.textContent.length * (e.os.version < 7 ? 10 : 12)
        }
        if (!G) {
            return (n.innerWidth / 2)
        } else {
            return (H - n.innerWidth) / 2
        }
    }

    function j() {
        o = true
    }

    function r() {
        var H = w.querySelectorAll("meta");
        for (var G = 0, F = H.length; G < F; G++) {
            if ((H[G].name === "app-drag-transition") && (H[G].content === "true")) {
                j();
                return
            }
        }
    }

    function p() {
        if (!o || !e.os.ios || (e.os.version < 7)) {
            return
        }
        var R = t.get().slice(-2),
            J = R[0],
            aa = R[1],
            L, ac, N, U, af;
        if (!J || !aa) {
            return
        }
        var I = aa[3],
            Q = aa[3].querySelector(".app-topbar"),
            Z = aa[3].querySelector(".app-topbar .app-title"),
            H = aa[3].querySelector(".app-topbar .left.app-button"),
            ab = aa[3].querySelector(".app-content"),
            W = J[3],
            M = J[3].querySelector(".app-topbar"),
            ae = J[3].querySelector(".app-topbar .app-title"),
            V = J[3].querySelector(".app-topbar .left.app-button"),
            T = J[3].querySelector(".app-content");
        if (!I || !Q || !ab || !W || !M || !T) {
            return
        }
        var ah = ["slide-left", "slideon-left-ios"];
        if ((ah.indexOf(aa[4].transition) === -1) && (aa[4].transition || ah.indexOf(m) === -1)) {
            return
        } else {
            if ((aa[4].transition === "slide-left") || (!aa[4].transition && "slide-left" === m)) {
                af = true
            }
        }
        var S = aa[3].style.position,
            O = aa[3].style.zIndex,
            Y = aa[3].style.background;
        aa[3].style.position = "fixed";
        aa[3].style.zIndex = "4000";
        aa[3].style.background = "none";
        if (aa[3].nextSibling) {
            aa[3].parentNode.insertBefore(J[3], aa[3].nextSibling)
        } else {
            aa[3].parentNode.appendChild(J[3])
        }
        y.fixContent(W);
        D.restoreScrollPosition(W);
        n.addEventListener("touchstart", F, false);
        n.addEventListener("touchmove", ad, false);
        n.addEventListener("touchcancel", X, false);
        n.addEventListener("touchend", X, false);
        var ag = false;
        d = function() {
            K();
            G()
        };

        function K() {
            n.removeEventListener("touchstart", F);
            n.removeEventListener("touchmove", ad);
            n.removeEventListener("touchcancel", X);
            n.removeEventListener("touchend", X)
        }

        function G() {
            aa[3].style.position = S;
            aa[3].style.zIndex = O;
            aa[3].style.background = Y;
            if (J[3].parentNode) {
                J[3].parentNode.removeChild(J[3])
            }
        }

        function F(ai) {
            if (L || N || U) {
                return
            }
            var aj = (ai.touches && ai.touches[0]);
            if (!aj || (aj.pageX > b)) {
                return
            }
            if (!y.fire(aa[2], aa[3], y.EVENTS.BEFORE_BACK)) {
                return
            }
            ai.preventDefault();
            x._Navigation.enqueue(function(ak) {
                N = ak
            }, true);
            w.body.className += " " + c;
            L = ac = {
                x: aj.pageX,
                y: aj.pageY
            };
            Q.style.webkitTransition = "all 0s linear";
            if (Z) {
                Z.style.webkitTransition = "all 0s linear"
            }
            if (H) {
                H.style.webkitTransition = "all 0s linear"
            }
            ab.style.webkitTransition = "all 0s linear";
            M.style.webkitTransition = "all 0s linear";
            if (ae) {
                ae.style.webkitTransition = "all 0s linear"
            }
            if (V) {
                V.style.webkitTransition = "all 0s linear"
            }
            T.style.webkitTransition = "all 0s linear"
        }

        function ad(aj) {
            if (L && aj.touches && aj.touches[0] && !U) {
                if (ac) {
                    ag = (ac.x < aj.touches[0].pageX)
                }
                ac = {
                    x: aj.touches[0].pageX,
                    y: aj.touches[0].pageY
                };
                var ai = Math.min(Math.max(0, (ac.x - L.x) / n.innerWidth), 1);
                P(ai)
            }
        }

        function X(al) {
            if (!L || !N || U) {
                return
            }
            K();
            ac = (al.touches && al.touches[0]) || ac;
            var ak = 0;
            if (ac) {
                progress = (ac.x - L.x) / n.innerWidth
            }
            var ai = ((progress < 0.1 && !ag) || (0.9 < progress && ag));
            if (!ai) {
                Q.style.webkitTransitionDuration = "0.15s";
                if (Z) {
                    Z.style.webkitTransitionDuration = "0.15s"
                }
                if (H) {
                    H.style.webkitTransitionDuration = "0.15s"
                }
                ab.style.webkitTransitionDuration = "0.15s";
                M.style.webkitTransitionDuration = "0.15s";
                if (ae) {
                    ae.style.webkitTransitionDuration = "0.15s"
                }
                if (V) {
                    V.style.webkitTransitionDuration = "0.15s"
                }
                T.style.webkitTransitionDuration = "0.15s"
            }
            if (ag) {
                y.fire(aa[2], aa[3], y.EVENTS.BACK);
                P(1)
            } else {
                P(0)
            }
            L = ac = null;
            if (!ai) {
                aa[3].addEventListener("webkitTransitionEnd", aj, false)
            } else {
                aj()
            }

            function aj() {
                aa[3].removeEventListener("webkitTransitionEnd", aj);
                if (ag) {
                    if (aa[3].parentNode) {
                        aa[3].parentNode.removeChild(aa[3])
                    }
                } else {
                    if (J[3].parentNode) {
                        J[3].parentNode.removeChild(J[3])
                    }
                }
                aa[3].style.position = S;
                aa[3].style.zIndex = O;
                aa[3].style.background = Y;
                Q.style.webkitTransition = "";
                Q.style.webkitTransform = "";
                if (Z) {
                    Z.style.webkitTransition = "";
                    Z.style.webkitTransform = ""
                }
                if (H) {
                    H.style.webkitTransition = "";
                    H.style.webkitTransform = ""
                }
                ab.style.webkitTransition = "";
                ab.style.webkitTransform = "";
                M.style.webkitTransition = "";
                M.style.webkitTransform = "";
                if (ae) {
                    ae.style.webkitTransition = "";
                    ae.style.webkitTransform = ""
                }
                if (V) {
                    V.style.webkitTransition = "";
                    V.style.webkitTransform = ""
                }
                T.style.webkitTransition = "";
                T.style.webkitTransform = "";
                w.body.className = w.body.className.replace(new RegExp("\\b" + c + "\\b"), "");
                if (ag) {
                    y.startDestruction(aa[0], aa[2], aa[3], aa[1]);
                    y.fixContent(W);
                    D.restoreScrollStyle(W);
                    aa[2].showing = false;
                    y.fire(aa[2], aa[3], y.EVENTS.HIDE);
                    J[2].showing = true;
                    y.fire(J[2], W, y.EVENTS.SHOW);
                    y.finishDestruction(aa[0], aa[2], aa[3], aa[1]);
                    t.pop();
                    x._Navigation.update()
                }
                d = null;
                N()
            }
        }

        function P(ai) {
            if (af) {
                Q.style.opacity = 1 - ai;
                if (Z) {
                    Z.style.webkitTransform = "translate3d(" + (ai * n.innerWidth / 2) + "px,0,0)"
                }
                if (H) {
                    H.style.webkitTransform = "translate3d(" + (ai * (n.innerWidth - H.textContent.length * 12) / 2) + "px,0,0)"
                }
                if (ae) {
                    ae.style.webkitTransform = "translate3d(" + ((1 - ai) * (n.innerWidth - H.textContent.length * 12) / -2) + "px,0,0)"
                }
                if (V) {
                    V.style.webkitTransform = "translate3d(" + ((1 - ai) * -150) + "%,0,0)"
                }
            } else {
                Q.style.webkitTransform = "translate3d(" + (ai * 100) + "%,0,0)";
                M.style.webkitTransform = "translate3d(" + ((1 - ai) * -30) + "%,0,0)"
            }
            ab.style.webkitTransform = "translate3d(" + (ai * 100) + "%,0,0)";
            T.style.webkitTransform = "translate3d(" + ((1 - ai) * -30) + "%,0,0)"
        }
    }

    function l() {
        if (d) {
            d();
            d = null
        }
    }
}(window, document, Swapper, App, App._Utils, App._Scroll, App._Pages, App._Stack);
App._Navigation = function(i, l, o, g, u, p, k, d) {
    var n = [],
        f = false,
        m, e;
    o.current = function() {
        return m
    };
    o.load = function(v, x, w, y) {
        if (typeof v !== "string") {
            throw TypeError("page name must be a string, got " + v)
        }
        switch (typeof x) {
            case "function":
                w = x;
                x = {};
            case "string":
                y = w;
                w = x;
            case "undefined":
                x = {};
            case "object":
                break;
            default:
                throw TypeError("page arguments must be an object if defined, got " + x)
        }
        switch (typeof w) {
            case "function":
                y = w;
            case "undefined":
                w = {};
            case "object":
                break;
            case "string":
                w = {
                    transition: w
                };
                break;
            default:
                throw TypeError("options must be an object if defined, got " + w)
        }
        switch (typeof y) {
            case "undefined":
                y = function() {};
            case "function":
                break;
            default:
                throw TypeError("callback must be a function if defined, got " + y)
        }
        return h(v, x, w, y)
    };
    o.back = function(v, w) {
        switch (typeof v) {
            case "function":
                w = v;
            case "undefined":
                v = undefined;
            case "string":
                break;
            default:
                throw TypeError("pageName must be a string if defined, got " + v)
        }
        switch (typeof w) {
            case "undefined":
                w = function() {};
            case "function":
                break;
            default:
                throw TypeError("callback must be a function if defined, got " + w)
        }
        return c(v, w)
    };
    o.pick = function(v, y, x, w, z) {
        if (typeof v !== "string") {
            throw TypeError("page name must be a string, got " + v)
        }
        switch (typeof y) {
            case "function":
                x = y;
                y = {};
            case "string":
                z = w;
                w = x;
                x = y;
            case "undefined":
                y = {};
            case "object":
                break;
            default:
                throw TypeError("page arguments must be an object if defined, got " + y)
        }
        switch (typeof x) {
            case "function":
                z = w;
                w = x;
            case "undefined":
                x = {};
            case "object":
                break;
            case "string":
                x = {
                    transition: x
                };
                break;
            default:
                throw TypeError("options must be an object if defined, got " + x)
        }
        if (typeof w !== "function") {
            throw TypeError("callback must be a function, got " + w)
        }
        switch (typeof z) {
            case "undefined":
                z = w;
                w = function() {};
            case "function":
                break;
            default:
                throw TypeError("callback must be a function, got " + z)
        }
        return q(v, y, x, w, z)
    };
    return {
        getCurrentNode: s,
        update: t,
        enqueue: r
    };

    function r(w, v) {
        if (f) {
            n.push(w);
            return false
        }
        f = true;
        if (!v) {
            d.disableDrag()
        }
        w(function() {
            k.save();
            f = false;
            if (!b()) {
                d.enableDrag()
            }
        });
        return true
    }

    function b() {
        if (n.length) {
            r(n.shift());
            return true
        } else {
            return false
        }
    }

    function s() {
        return e
    }

    function t() {
        var v = k.getCurrent();
        m = v[0];
        e = v[3]
    }

    function h(v, x, w, z, y) {
        r(function(B) {
            var E = e,
                I = p.createManager(false);
            if (y) {
                y(I)
            }
            var F = p.startGeneration(v, I, x),
                K = k.getCurrent(),
                G = K && K[3],
                C = K && K[2];
            if (!w.transition && I.transition) {
                w.transition = I.transition
            }
            p.populateBackButton(F, E || G);
            if (!m) {
                o.restore = null;
                l.body.appendChild(F);
                p.fire(I, F, p.EVENTS.LAYOUT);
                D();
                H()
            } else {
                u.saveScrollPosition(e);
                var A = {};
                for (var J in w) {
                    A[J] = w[J]
                }
                j(function(L) {
                    d.run(e, F, A, function() {
                        p.fixContent(F);
                        L();
                        H()
                    });
                    p.fire(I, F, p.EVENTS.LAYOUT)
                });
                D()
            }

            function D() {
                m = v;
                e = F;
                k.push([v, x, I, F, w]);
                if (E && C) {
                    p.fire(C, E, p.EVENTS.FORWARD)
                }
            }

            function H() {
                u.saveScrollStyle(E);
                p.finishGeneration(v, I, F, x);
                B();
                z();
                if (E && C) {
                    C.showing = false;
                    p.fire(C, E, p.EVENTS.HIDE)
                }
                I.showing = true;
                p.fire(I, F, p.EVENTS.SHOW)
            }
        });
        if (!p.has(v)) {
            return false
        }
    }

    function c(C, B) {
        if (g.status() && g.close() && !C) {
            B();
            return
        }
        var w = k.get().map(function(D) {
            return D[0]
        });
        if (!w.length) {
            throw Error(C + " is not currently in the stack, cannot go back to it")
        }
        if (C) {
            var x = -1;
            for (var y = w.length - 1; y >= 0; y--) {
                if (w[y] === C) {
                    x = y;
                    break
                }
            }
            if (x === -1) {
                throw Error(C + " is not currently in the stack, cannot go back to it")
            }
            if (x !== w.length - 2) {
                o.removeFromStack(x + 1)
            }
        }
        var A = w.length,
            z = false;
        var v = r(function(K) {
            if (k.size() < 2) {
                K();
                B();
                return
            }
            var J = k.getCurrent();
            if (!p.fire(J[2], J[3], p.EVENTS.BEFORE_BACK)) {
                z = true;
                K();
                B();
                return
            } else {
                k.pop()
            }
            var H = k.getCurrent(),
                D = H[0],
                G = H[3],
                E = J[4];
            p.fire(J[2], J[3], p.EVENTS.BACK);
            p.fixContent(G);
            p.startDestruction(J[0], J[2], J[3], J[1]);
            u.restoreScrollPosition(G);
            var I = {};
            for (var F in E) {
                if (F === "transition") {
                    I[F] = d.REVERSE_TRANSITION[E[F]] || E[F]
                } else {
                    I[F] = E[F]
                }
            }
            j(function(L) {
                d.run(e, G, I, function() {
                    p.fixContent(G);
                    u.restoreScrollStyle(G);
                    L();
                    J[2].showing = false;
                    p.fire(J[2], J[3], p.EVENTS.HIDE);
                    H[2].showing = true;
                    p.fire(H[2], G, p.EVENTS.SHOW);
                    setTimeout(function() {
                        p.finishDestruction(J[0], J[2], J[3], J[1]);
                        K();
                        B()
                    }, 0)
                }, true);
                p.fixContent(G);
                p.fire(H[2], G, p.EVENTS.LAYOUT)
            });
            m = D;
            e = G
        });
        if (z || (v && (A < 2))) {
            return false
        }
    }

    function q(v, y, x, w, A) {
        var z = false;
        h(v, y, x, w, function(B) {
            B.restorable = false;
            B.reply = function() {
                if (!z) {
                    z = true;
                    if (!B._appNoBack) {
                        c(undefined, function() {})
                    }
                    A.apply(o, arguments)
                }
            }
        })
    }

    function j(v) {
        var x = false;
        var w = l.createElement("div");
        w.className = "app-clickblocker";
        l.body.appendChild(w);
        w.addEventListener("touchstart", function(y) {
            y.preventDefault()
        }, false);
        v(function() {
            if (x) {
                return
            }
            x = true;
            l.body.removeChild(w)
        })
    }
}(window, document, App, App._Dialog, App._Scroll, App._Pages, App._Stack, App._Transitions);
(function(b, c, d) {
    if (c.platform !== "android" || c.platformVersion < 5) {
        return
    }
    d.ready(function() {
        setTimeout(function() {
            var e = [].slice.call(b.body.childNodes);
            e.forEach(function(f) {
                b.body.removeChild(f)
            });
            e.forEach(function(f) {
                b.body.appendChild(f)
            })
        }, 200)
    })
})(document, App, App._Utils);

