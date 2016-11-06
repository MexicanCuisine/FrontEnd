var burrito = burrito || {};

/**
 * Header
 * 
 * @example
 * burrito.header({
 *   key: 'value'
 * })
 */
burrito.header = (function(document, $, undefined) {

  'use strict';

  return function init(custom) {

    var options = $.extend({
      key: 'value',
    }, custom);

  }

}(document, window.jQuery));