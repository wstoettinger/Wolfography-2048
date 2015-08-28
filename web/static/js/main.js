'use strict';

window.initialize = function () {

  window.loadScript();

  $('.menu-toggle').click($('.menu'), function (e) {
    var m = e.data;
    m.toggleClass('expanded'); // add expanded
    m.toggleClass('right'); // remove right (on mobile)
    e.stopPropagation();
  });

  $('.dropdown-toggle').click(function (e) {
    var t = $(this);
    var isExpanded = t.hasClass('expanded');

    // close other dropdowns
    $('.dropdown-toggle').removeClass('expanded');
    $('.dropdown').removeClass('expanded');

    if (!isExpanded) {
      // expand parents (again)
      var p = t.parents('.dropdown');
      p.addClass('expanded');
      p.prev('.dropdown-toggle').addClass('expanded');

      // expand current element
      t.addClass('expanded');
      t.next('.dropdown').addClass('expanded');
    }
    e.stopPropagation();
  });

  /* Clicks within the dropdown won't make
   it past the dropdown itself */
  $(".dropdown").click(function (e) {
    e.stopPropagation();
  });

  $(".menu").click(function (e) {
    e.stopPropagation();
  });

  /* Anything that gets to the document
   will hide the dropdown */
  $(document).click(function () {
    $('.menu').removeClass('expanded');
    $(".dropdown-toggle").removeClass('expanded');
    $(".dropdown").removeClass('expanded');
  });

}

window.loadScript = function () {
  var sheet = document.createElement('link');
  sheet.rel = 'stylesheet';
  if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i))
    sheet.href = '/static/css/client_touch.css';
  else
    sheet.href = '/static/css/client_pointer.css';
  document.body.appendChild(sheet);
}

window.onload = initialize;