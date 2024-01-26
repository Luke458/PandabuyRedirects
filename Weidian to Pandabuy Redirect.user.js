// ==UserScript==
// @name         Weidian to Pandabuy
// @namespace    global
// @description  Automatically convert Weidian store and item links to Pandabuy store and item links.
// @match        *://weidian.com/*
// @match        *://*.weidian.com/*
// @version      18
// @grant        none
// ==/UserScript==

var WeidianToPandabuyRedirect = {};

WeidianToPandabuyRedirect.getParameterByName = function(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

WeidianToPandabuyRedirect.performRedirection = function() {
    var url = location.href;

    if (url.includes("item.html")) {
        // Handle item links
        var itemId = WeidianToPandabuyRedirect.getParameterByName("itemID", url);
        if (itemId) {
            var pandabuyItemUrl = `https://www.pandabuy.com/product?ra=982&url=${encodeURIComponent(url)}&spider_token=adc1`;
            window.location.replace(pandabuyItemUrl);
        }
    } else {
        // Extract shopId from the subdomain
        var matchSubdomain = url.match(/shop(\d+)\.v\.weidian\.com/);
        var shopId = matchSubdomain ? matchSubdomain[1] : null;

        if (shopId) {
            // Handle store links
            var pandabuyStoreUrl = `https://www.pandabuy.com/shopdetail?ra=806&t=wd&id=${shopId}`;
            window.location.replace(pandabuyStoreUrl);
        }
    }
};

WeidianToPandabuyRedirect.performRedirection();
