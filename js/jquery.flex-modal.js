/*! jQuery FlexModal - v1.0.0
 * https://github.com/floriancapelle/jquery-flex-modal
 * Licensed MIT
 */
(function(n, t) {
    typeof define == "function" && define.amd ? define(["jquery"], t) : t(jQuery)
})(this, function(n) {
    "use strict";

    function p() {
        var i = n("body");
        u = n('<aside class="flex-modal"><\/aside>');
        i.append(u);
        i.on("click." + t, function(t) {
            var i = n(t.target),
                u;
            i.is(r.triggerSelector) && (u = typeof r.triggerTargetKey == "function" ? r.triggerTargetKey().call(i, t) : i.data(r.triggerTargetKey), e(u))
        });
        n(document).on("keydown." + t, function(t) {
            t.keyCode === 27 && u.children("." + r.visibilityToggleClass).each(function() {
                var t = n(this);
                t.data("options").closeOnEscKey === !0 && f(t.attr("id"))
            })
        });
        u.on("click." + t, function(t) {
            var i = n(t.target);
            if (i.hasClass(h)) {
                if (i.children(".do_not_close").length == 1) return;
                f(i.attr("id"));
                n("body").removeClass("open")
            } else(i.hasClass(c) || i.closest("." + c).length) && (f(i.closest("." + v).attr("id")), n("body").removeClass("open"), n("body, html").removeClass("noscroll"))
        })
    }

    function l(t, f) {
        var e, c;
        if ((t = t || "", t = o(t), e = n("#" + t), !e.length) || (c = e.html(), c === undefined)) return !1;
        var s = n(y),
            v = s.children("." + h),
            l = n.extend(!0, {}, r.modalOptions, e.data());
        return s.attr("id", t), s.data("options", l), v.append(c), l.closeBtnMarkup && v.append(n(l.closeBtnMarkup)), s.addClass(e.attr("class").replace(a, "")), e.remove(), u.append(s), f && f.call(s[0], i), !0
    }

    function e(h) {
        var c, a;
        if (h = h || "", h = o(h), c = u.children("#" + h), !c.length) return l(h) === !0 && e(h), i;
        a = c.data("options");
        a.autoCloseOthers === !0 && u.children("." + r.visibilityToggleClass).each(function() {
            f(n(this).attr("id"))
        });
        c.on("transitionend.open." + t + " webkitTransitionEnd.open." + t, function(n) {
            c.is(n.target) && (c.trigger("afterOpen." + t, i), c.off(".open." + t))
        });
        return c.addClass(s), c.width(), c.addClass(r.visibilityToggleClass), c.trigger("open." + t, i), n("body, html").addClass("noscroll"), i
    }

    function f(n) {
        var f;
        if (n === undefined) f = u.children();
        else if (n = o(n), f = u.children("#" + n), !f.length) return i;
        f.on("transitionend.close." + t + " webkitTransitionEnd.close." + t, function(n) {
            f.is(n.target) && (f.trigger("afterClose." + t, i), f.off(".close." + t))
        });
        return f.removeClass(s), f.removeClass(r.visibilityToggleClass), f.trigger("close." + t, i), i
    }

    function o(n) {
        return n.slice(0, 1) === "#" ? n.slice(1) : n
    }
    var i = {},
        r = {
            triggerSelector: "[data-modal-target]",
            triggerTargetKey: "modalTarget",
            visibilityToggleClass: "flex-modal-item--visible",
            modalOptions: {
                closeBtnMarkup: "",
                autoCloseOthers: !0,
                closeOnOverlayClick: !0,
                closeOnEscKey: !0
            }
        },
        u, t = "flexModal",
        a = "flex-modal-hide",
        v = "flex-modal-item",
        s = "flex-modal-item--ready",
        h = "flex-modal-item__content",
        c = "quick_close",
        y = '<article class="flex-modal-item"><div class="flex-modal-item__content"><\/div><\/article>';
    n.extend(i, {
        config: r,
        add: l,
        open: e,
        close: f
    });
    n(function() {
        p();
        n.flexModal = i
    })
});