// Google analytics

(function (a, s, y, n, c, h, i, d, e) {
  s.className += ' ' + y;
  h.start = 1 * new Date;
  h.end   = i = function () {
    s.className = s.className.replace(RegExp(' ?' + y), '')
  };
  (a[n] = a[n] || []).hide = h;
  setTimeout(function () {
    i();
    h.end = null
  }, c);
  h.timeout = c;
})(window, document.documentElement, 'async-hide', 'dataLayer', 4000, {'GTM-5XBQNZR': true});

(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src   = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

(function () {

  function getDestinationHost(src) {
    var url  = document.createElement('a');
    url.href = src;
    return url.protocol + "//" + url.host
  }

  ga('create', 'UA-71217300-3', 'auto');
  ga('require', 'GTM-PFPJSH2');
  ga(function (tracker) {
    // Gets the client ID of the default tracker.
    var clientId = tracker.get('clientId');
    // Sends the client ID to the window inside the destination frame.
    var i, frames;
    frames = document.getElementsByTagName("iframe");
    for (i = 0; i < frames.length; ++i) {
      frames[i].contentWindow.postMessage(clientId, getDestinationHost(frames[i].src));
    }
  });
})();

(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
  var f   = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src   = '//www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-MN2NNP');
