// ==UserScript==
// @name         Weidian to Pandabuy Redirect
// @namespace    global
// @description  Automatically convert Weidian store and item links to Pandabuy store and item links.
// @match        *://weidian.com/*
// @match        *://*.weidian.com/*
// @version      17
// @grant        none
// ==/UserScript==

var WeidianToPandabuyRedirect = {};

WeidianToPandabuyRedirect.extractShopId = function(url) {
    var userId = WeidianToPandabuyRedirect.getParameterByName("userid", url);
    if (userId) return userId;

    var matchSubdomain = url.match(/shop(\d+)\.v\.weidian\.com/);
    return matchSubdomain ? matchSubdomain[1] : null;
};

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
    var shopId = WeidianToPandabuyRedirect.extractShopId(url);

    if (url.includes("item.html") && shopId) {
        var itemId = WeidianToPandabuyRedirect.getParameterByName("itemID", url);
        if (itemId) {
            var pandabuyItemUrl = `https://www.pandabuy.com/product?ra=500&url=${encodeURIComponent(url)}&utm_source=url&utm_medium=pdb&utm_campaign=normal`;
            window.location.replace(pandabuyItemUrl);
        }
    } else if (shopId) {
        var pandabuyStoreUrl = `https://www.pandabuy.com/shopdetail?ra=806&t=wd&id=${shopId}`;
        window.location.replace(pandabuyStoreUrl);
    }
};

WeidianToPandabuyRedirect.performRedirection();
