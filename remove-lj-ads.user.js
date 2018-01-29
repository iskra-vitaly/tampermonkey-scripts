// ==UserScript==
// @name         remove-lj-ads
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  delete annoying stuff from livejournal pages
// @author       You
// @match        http://*.livejournal.com/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    let mo = window.MutationObserver || window.WebKitMutationObserver;
    var observer = new mo(function(mutations) {
        for (let m of mutations) {
            if (m.type === 'childList') {
                for (let n of m.addedNodes) {
                    if (n.id && /^begun_block/.exec(n.id)) {
                        console.log('removed ad!!!', n);
                        n.remove();
                    }
                }
            }
        }
    });

    var observerConfig = {childList: true, subtree: true };
    for (let block of document.querySelectorAll('.content-inner')) {
        observer.observe(block, observerConfig);
    }

    function clean() {
        document.querySelectorAll('.sidebar-inner, #hello-world, .b-discoverytimes-wrapper').forEach(e => e.remove());
    }

    let cleanTimer = setInterval(clean, 5000);
    clean();

    console.log('LJ ad remove activated');
})();
