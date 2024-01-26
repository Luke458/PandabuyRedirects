// ==UserScript==
// @name        Taobao to Pandabuy Redirect
// @namespace   global
// @description Automatically redirect Taobao and Tmall pages to Pandabuy.
// @match       http*://*.taobao.com/*
// @match       http*://*.tmall.com/*
// @match       http*://*.tmall.hk/*
// @match       http*://*.tmall.tw/*
// @version     16
// @grant       none
// ==/UserScript==

var TaobaoPandabuyRedirect = {};

// Generic implementation of getParameterByName
TaobaoPandabuyRedirect.getParameterByName = function(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

// Generic implementation of getShopIdFromUrl
TaobaoPandabuyRedirect.getShopIdFromUrl = function(url) {
    var matches = url.match(/id=([^&]+)/);
    return matches ? matches[1] : null;
};

TaobaoPandabuyRedirect.performRedirection = function() {
    try {
        var url = window.location.href;

        // Mobile link conversion to desktop
        if (url.includes("m.intl.taobao.com/") || url.includes("h5.m.taobao.com/") || url.includes("world.taobao.com/") || url.includes("shop.m.taobao.com/")) {
            var desktopUrl = TaobaoPandabuyRedirect.getParameterByName("url", url);
            if (desktopUrl) window.location.replace(decodeURIComponent(desktopUrl));
        }

        // Item link redirection to Pandabuy
        if (url.includes("item.taobao.com/") || url.includes("detail.tmall.com/item.htm") || url.includes("detail.1688.com/offer/") || url.includes("m.intl.taobao.com/detail/detail.html")) {
            var itemId = TaobaoPandabuyRedirect.getParameterByName("id", url);
            if (itemId) {
                var pandabuyUrl = 'https://www.pandabuy.com/product?url=' + encodeURIComponent(url) + '&utm_source=url&utm_medium=pdb&utm_campaign=normal';
                window.location.replace(pandabuyUrl);
            }
        }

        // Store link redirection to Pandabuy
        if (url.includes("shop.taobao.com/") || url.includes("store.taobao.com/") || url.includes("tmall.com/shop/") || url.includes("store.1688.com/")) {
            var shopId = TaobaoPandabuyRedirect.getShopIdFromUrl(url);
            if (shopId) {
                var pandabuyStoreUrl = 'https://www.pandabuy.com/shopdetail?t=' + TaobaoPandabuyRedirect.getStoreType(url) + '&id=' + shopId;
                window.location.replace(pandabuyStoreUrl);
            }
        }
    } catch (e) {
        console.error("Error in TaobaoPandabuyRedirect: ", e);
    }
};

TaobaoPandabuyRedirect.getStoreType = function(url) {
    if (url.includes("tmall.com/shop/") || url.includes("store.taobao.com/")) {
        return "taobao";
    } else if (url.includes("store.1688.com/")) {
        return "alibaba";
    }
    return "taobao";
};

// Random delay function
TaobaoPandabuyRedirect.randomDelayRedirect = function() {
    var minDelay = 500; // Minimum delay in milliseconds (1 second)
    var maxDelay = 1000; // Maximum delay in milliseconds (5 seconds)
    var randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
    setTimeout(TaobaoPandabuyRedirect.performRedirection, randomDelay);
};

// Using an IIFE for delayed execution
(function() {
    TaobaoPandabuyRedirect.randomDelayRedirect();
})();
