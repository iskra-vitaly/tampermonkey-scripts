// ==UserScript==
// @name         remove-lj-ads
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*.livejournal.com/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    let mo = window.MutationObserver || window.WebKitMutationObserver;
//    console.log('window.MutationObserver=', mo);
    var observer = new mo(function(mutations) {
        for (let m of mutations) {
//            console.log('mutation', m);
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