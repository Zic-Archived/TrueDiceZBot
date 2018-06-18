// ==UserScript==
// @name         TrueDice ZBot
// @namespace    https://www.facebook.com/zickieloox
// @version      1.5
// @description  An auto bot for truedice.io
// @author       @zickieloox - fb.com/zickieloox
// @homepage     https://m.me/zickieloox
// @match        https://truedice.io*
// @updateURL    https://vnzic.com/truedice/truedicezbot1.js
// @grant        GM_addStyle
// @grant        GM_getResourceURL
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-idle
// ==/UserScript==

(function() {

  $.ajax({
    url: 'https://vnzic.com/truedice/truedicezbotv1.js?v=' + Date.now(),
    dataType: 'script',
    async: false
  }).done(function(data) {
    console.log('Guns are loaded!');
    return;
  }).fail(function() {
      alert('Phiên bản hiện tại đã lỗi thời! Vui lòng liên hệ tác giả để cập nhật lên phiên bản mới nhất');
      location.reload();
  });

})();