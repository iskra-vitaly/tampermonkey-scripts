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
    function jq(wnd) {
        if (wnd.jQuery) {
            console.log("jquery found in", wnd.location);
            return wnd.jQuery;
        } else {
            let parent = wnd.parent;
            if (parent && parent != wnd) {
                return jq(parent);
            } else {
                console.log("jquery not found in", wnd.location);
                return null;
            }
        }
    }

    let $ = jq(window);
    let mo = window.MutationObserver || window.WebKitMutationObserver;
    console.log('LJ ad remove');
    console.log('window.MutationObserver=', mo);
    var observer = new mo(function(mutations) {
        for (let m of mutations) {
            console.log('mutation', m);
            if (m.type === 'childList') {
                for (let n of m.addedNodes) {
                    if (n.id && /^begun_block/.exec(n.id)) {
                        n.remove();
                    }
                }
            }
        }
    });

    // configuration of the observer:
    var config = {childList: true, subtree: true };

    // pass in the target node, as well as the observer options

    $('.content-inner').each(function(i, el){observer.observe(el, config);});

    $('.sidebar-inner').remove();
})();