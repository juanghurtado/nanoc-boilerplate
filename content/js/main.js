/* ---------------------------------------------------------------------------
  Global javascript

  Encoding: UTF-8
  Authors:
    Juan G. Hurtado   [hello@juanghurtado.com]
------------------------------------------------------------------------------
  Table of contents
------------------------------------------------------------------------------
  1.INIT
  2.DOCUMENT READY
  3.JQUERY CHOSEN
    3.1.Init method
  4.EXPAND BLOCKS
    4.1.Config
    4.2.Init method
--------------------------------------------------------------------------- */

if (typeof jQuery != "undefined") {

  /* =INIT
  ------------------------------------------------------------------------- */
  function init() {
    jQuery('body:not(.js)').addClass('js');

    buttons.disable();
    buttons.loading.init();
    chosen.init();
    expand.init();
  }

  /* =DOCUMENT READY
  ------------------------------------------------------------------------- */
  jQuery(document).ready(function($) {
    init();
  });

  /* =BUTTONS
  ------------------------------------------------------------------------- */
  var buttons = {

    /* =|Disable
    ----------------------------------------- */
    disable : function() {
      jQuery('.button.disabled').on('click', function(event) {
        event.preventDefault();
      });
    },

    /* =|Loading
    ----------------------------------------- */
    loading : {

      init : function() {
        jQuery('.button[data-loading]').on('click', function(event) {
          buttons.loading.show(jQuery(this));
        });
      },

      show : function($el) {
        var $el = jQuery($el),
        lt = $el.attr('data-loading'),
        dt = $el.text() || $el.val();

        $el.addClass('disabled')
          .attr('disabled','disabled')
          .attr('data-loading-default-text', dt);

        $el[0].tagName == "INPUT" ? $el.val(lt) : $el.text(lt);
      },

      hide : function($el) {
        var $el = jQuery($el),
        t = $el.attr('data-loading-default-text');

        $el.removeClass('disabled')
          .attr('disabled','')
          .attr('data-loading-default-text', '');

        $el[0].tagName == "INPUT" ? $el.val(t) : $el.text(t);
      }
    },

  }

  /* =JQUERY CHOSEN
  ------------------------------------------------------------------------- */
  var chosen = {

    /* =|Init method
    ----------------------------------------- */
    init : function() {
      if (typeof jQuery.fn.chosen != "undefined") {
        jQuery('select.chosen').chosen();
      }
    }

  };

  /* =EXPAND BLOCKS
  ------------------------------------------------------------------------- */
  var expand = {

    /* =|Config
    ----------------------------------------- */
    conf: {
      speed: 300
    },

    /* =|Init method
    ----------------------------------------- */
    init: function() {
      jQuery('.expand-wrapper:not(.processed)').each(function(index) {
        // 1.- Sets initial state and fill global vars
        $wrapper = jQuery(this).addClass('processed');
        $title = $wrapper.find('.expand-title:first');
        var body = $body = $wrapper.find('.expand-body:first').hide();

        // 2.- Bind click event for sliding
        // up/down the "expand-body" element
        $title.on('click', body, function(event, data) {
          var speed = (data && data.fast) ? 0: expand.conf.speed;

          jQuery(this).toggleClass('state-opened');

          body.slideToggle(speed).toggleClass('state-opened');

          event.preventDefault();
        });

        // 3.- Trigger click to show "expand-body" element
        // if "expand-wrapper" has "visible" class
        if ($wrapper.hasClass('visible')) {
          $title.trigger('click', { fast: true });
        }
      });
    }
  };

}