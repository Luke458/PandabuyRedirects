// ==UserScript==
// @name        Taobao-Pandabuy Redirect
// @namespace   global
// @description replace peace of string
// @match     http*://*.taobao.com/*
// @version     1
// @grant       none
// ==/UserScript==
// desc: Automatically redirect Taobao pages to Pandabuy.

var url = location.href;

if (location.href.search("item.taobao.com/")>0){
  url = url.replace("item.taobao.com/item.htm?id=","www.pandabuy.com/product?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D");
  location.href=url;
}
