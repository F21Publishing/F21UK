function fnVaildEmailCheck() {
    var t = !0,
        i = "",
        n = {
            email: "",
            eventID: "",
            eventName: ""
        },
        u = getResourceData("Account", getCurrentLanguage()),
        r;
    $("#input_email").length && (r = fnReplaceTextUsingResourceData(u, "<%tooltipInvalidEmail%>"), $("#input_email").val() ? /^[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+)*@[0-9a-zA-Z-]+(\.)+([0-9a-zA-Z-]+)([\.0-9a-zA-Z-])*$/.test($("#input_email").val()) || (i = r, t = !1) : (i = r, t = !1), n.email = $("#input_email").val(), n.eventID += "1045", n.eventName += "Welcome_Entry");
    t ? executeAJAX("/Home/GetEmailCheck?email=" + n.email + "&eventid=" + n.eventID + "&eventname=" + n.eventName, "GET", "JSON", null, !0, function(n) {
        if ($(n)[0].ReturnCode == "00") $(".tooltip.signup_layer").hide(), $(".signup_slider .signup").hide(), $(".signup_slider .thank").show();
        else {
            var t = fnReplaceTextUsingResourceData(u, "<%tooltipAlreadyRegistered%>");
            $(".tooltip.signup_layer").text(t);
            $(".tooltip.signup_layer").show()
        }
    }) : $(".tooltip.signup_layer").length && ($(".tooltip.signup_layer").text(i), $(".tooltip.signup_layer").show())
}

function fncheckCount_SignUp() {
    var n = getCookie("count"),
        r = getCookie("hideCookieNotice"),
        t, i;
    r == "Y" ? ((n == null || n == "") && (n = 1, setCookie("count", n, 30)), t = ["EU", "UK"], t.indexOf(COOKIE_POSTFIX) > -1 && (i = getCookie("checkShowPopUp_" + COOKIE_POSTFIX + "_" + getCurrentLanguage()), i == "" && getCurrentLanguage() != "en-IE" && getCurrentLanguage() != "en-GB" ? ($(".signup_slider .thank").hide(), setCookie("checkShowPopUp_" + COOKIE_POSTFIX + "_" + getCurrentLanguage(), 1, 30)) : $(".signup_slider").hide())) : (n++, setCookie("count", n, 30))
}(function(n) {
    n.extend({
        home: {
            data: {
                homepageCarousel: "",
                dateNow: moment(),
                targetDate: moment("2017-08-28 00:00:00"),
                dateDiff: "",
                countdownTimer: ""
            },
            loadHomepage: function() {
                n.home.getHomepageBanner();
                var t = getResourceData("Catalog", getCurrentLanguage()),
                    i = fnReplaceTextUsingResourceData(t, "<%btnViewMore%>");
                executeAJAX("/Home/GetCarouselData", "POST", "JSON", {
                    carouselCategoryId: "homepage",
                    localeId: getCurrentLanguage()
                }, !0, function(t) {
                    n.each(t.CarouselList, function(t, r) {
                        var u = "";
                        u += '<div class="homepage_carousel row container pt_10"><div class="divided_line hp_midtitle txc t_dark"><span>' + r.CarouselTitle + "<\/span><\/div>";
                        u += '<div class="col_s_10_of_10 col_m_11_of_12 col_l_14_of_16 fc"><div id="CarouselArea' + t + '" class="owl-carousel row_container pa_0"><\/div>';
                        u += '<p class="txr pr_10 pb_20 show_desktop"><a href="' + SITE_PREFIX + "/catalog/category/f21/" + r.LinkCategoryId + '">' + i + "<\/a><\/p><\/div><\/div>";
                        n("#homepageBannerLocation").after(u);
                        n.home.getCarouselForHomepage("#CarouselArea" + t + "", r.CarouselCategoryId)
                    })
                });
                resx.links = "";
                resx.itemid = "";
                USE_MARKETING_COOKIE === "1" && certonaResx.run();
                typeof fnSendBloomreachData != "undefined" && n.isFunction(fnSendBloomreachData) && fnSendBloomreachData("home")
            },
            getHomepageBanner: function() {
                o();
                n("map").length > 0 && setTimeout(function() {
                    n("map").imageMapResize()
                }, 500);
                executeAJAX("/Catalog/GetLandingPageHTML?brand=f21&landingName=landing_forever21connected", "GET", "JSON", null, !0, function(t) {
                    n("#Forever21Connected").html(t.HTML)
                })
            },
            getCarouselForHomepage: function(n, i) {
                t(n, "f21", i)
            }
        }
    });
    var t = function(t, o, s) {
            var h = {
                owl: "",
                brand: "",
                category: "",
                page: {
                    pageNo: "",
                    pageSize: ""
                },
                filter: {
                    sizeList: [],
                    colorList: [],
                    price: {
                        minPrice: "",
                        maxPrice: ""
                    },
                    manualList: []
                },
                sort: {
                    sortType: ""
                }
            };
            h.brand = o;
            h.category = s;
            h.page.pageNo = "1";
            h.page.pageSize = "24";
            h.filter.price.minPrice = "0";
            h.filter.price.maxPrice = "250";
            r();
            executeAJAX("/Catalog/CategoryForHomepageCarousel", "POST", "JSON", h, !0, function(r) {
                if (r.ReturnCode === "00") {
                    var o = fnShuffleArray(r.CatalogProducts);
                    u(o, s);
                    fnLoadTemplate("/catalog/categoryforhomepage.html", function(r) {
                        fnRenderHTML(t, r, o, {
                            pageLink: f,
                            ItemPrice: e
                        }, function() {
                            var r;
                            r = n(t).owlCarousel({
                                loop: !0,
                                responsive: {
                                    0: {
                                        items: 3,
                                        slideBy: 3,
                                        nav: !1,
                                        dots: !1
                                    },
                                    600: {
                                        items: 3,
                                        slideBy: 3,
                                        nav: !0,
                                        dots: !1
                                    },
                                    1e3: {
                                        items: 6,
                                        slideBy: 6,
                                        nav: !0,
                                        dots: !1
                                    }
                                }
                            });
                            i(r, t)
                        })
                    })
                }
            })
        },
        i = function(t, i) {
            var r = 0;
            t.on("changed.owl.carousel", function(n) {
                n.preventDefault()
            });
            t.on("dragged.owl.carousel", function(t) {
                t.preventDefault();
                getCookie("dragging") === "true" && (t.preventDefault(), r > t.item.count && (r = t.page.size), r < -(t.item.count - t.page.size) && (r = 0), t.relatedTarget._drag.direction === "left" ? (r += t.page.size, n(i).trigger("to.owl.carousel", r)) : (r -= t.page.size, n(i).trigger("to.owl.carousel", r)))
            })
        },
        r = function() {
            var t = !1;
            n("body").on("mousedown", function(i) {
                var r = i.screenX,
                    u = i.screenY;
                t = !1;
                n("body").on("mousemove", function(n) {
                    (Math.abs(r - n.screenX) > 5 || Math.abs(u - n.screenY) > 5) && (t = !0)
                })
            });
            n("body").on("mouseup", function() {
                n("body").off("mousemove");
                setCookie("dragging", t)
            })
        },
        u = function(t, i) {
            var r = "home " + i,
                u;
            switch (i) {
                case "women-new-arrivals":
                    r = "home new arrivals";
                    break;
                case "sale_women":
                    r = "home sale";
                    break;
                case "promo-best-sellers-app":
                    r = "home best sellers"
            }
            u = [];
            n.each(t, function(n, t) {
                u.push({
                    id: t.ProductId,
                    name: t.DisplayName,
                    price: t.ListPrice,
                    originalPrice: t.OriginalPrice,
                    brand: t.Brand,
                    category: t.CategoryName
                })
            });
            try {
                _cpua.productListLoaded && typeof _cpua.productListLoaded == "function" && _cpua.productListLoaded(r, u)
            } catch (f) {}
        },
        f = function(n, t, i) {
            return i === "9000000001" ? SITE_PREFIX + "/Catalog/ECard" : SITE_PREFIX + "/Catalog/Product/" + n + "/" + t + "/" + i
        },
        e = function(n, t) {
            return t !== n ? '<span class="p_old_price">' + formatCurrency(t) + '<\/span> <span class="p_sale t_pink">' + formatCurrency(n) + "<\/span>" : formatCurrency(n)
        },
        o = function() {
            var t = [];
            try {
                _cpua.promotionsLoaded && typeof _cpua.promotionsLoaded == "function" && (n(".gtm_promo").each(function(i, r) {
                    n.grep(t, function(n) {
                        return n.id == r.dataset.promoId
                    }).length === 0 && (n(window).width() < 500 || n(window).height() < 500 ? r.dataset.promoId != null && r.dataset.promoPosition.toLowerCase().charAt(0) == "m" && t.push({
                        id: r.dataset.promoId,
                        name: r.dataset.promoName,
                        creative: function() {
                            return n(r).children().closest("img").attr("src") == null ? n(r).find("img.show_mobile").attr("src") : n(r).children().closest("img.show_mobile").attr("src")
                        }(),
                        position: r.dataset.promoPosition
                    }) : r.dataset.promoId != null && r.dataset.promoPosition.length == 2 && t.push({
                        id: r.dataset.promoId,
                        name: r.dataset.promoName,
                        creative: function() {
                            return n(r).children().closest("img").attr("src") == null ? n(r).find("img.show_desktop").attr("src") : n(r).children().closest("img.show_desktop").attr("src")
                        }(),
                        position: r.dataset.promoPosition
                    }))
                }), _cpua.promotionsLoaded(t))
            } catch (i) {}
        }
})(jQuery);