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
  3.BUTTONS
    3.1.disable_click()
    3.2.Loading
    	3.2.1.init()
    	3.2.2.show($el)
    	3.2.3.hide($el)
  4.JQUERY CHOSEN
    4.1.init()
  5.EXPAND BLOCKS
    5.1.Config
    5.2.init()
--------------------------------------------------------------------------- */

if (typeof jQuery != "undefined") {

  /* =INIT
   *
   * This method initializes all JS stuff. Usually it will be called at
   * jQuery's "document ready" function, but it can also be called after
   * an Ajax DOM update or similar…
  ------------------------------------------------------------------------- */
  function init() {
    buttons.disable_click();
    buttons.loading.init();
    chosen.init();
    expand.init();
  }

  /* =DOCUMENT READY
   *
   * When the documento is ready, call `init()` method.
  ------------------------------------------------------------------------- */
  jQuery(document).ready(function($) {
    init();
  });

  /* =BUTTONS
   *
   * Namespace for button related Javascript, as:
   *
   * - Avoiding default behaviour on disabled buttons
   * - Show loading message after clicking a button
  ------------------------------------------------------------------------- */
  var buttons = {

    /* =|disable_click()
     *
     * Attaches a "click" event handler to all disabled buttons to prevent
     * default behaviour on them (submit, anchor…).
    ----------------------------------------------------------------------- */
    disable_click : function() {
      jQuery('.button.disabled').on('click', function(event) {
        event.preventDefault();
      });
    },

    /* =|Loading
     *
     * Namespace for all loading related stuff on buttons.
    ----------------------------------------------------------------------- */
    loading : {

      /* =>init()
       *
       * This method initializes the loading stuff on all buttons with
       * `data-loading` attribute or "loading" `class`. It attaches a
       * "click" event handler on them that calls to `buttons.loading.show`
       * for the clicked button.
      --------------------------------------------------------------------- */
      init : function() {
        jQuery('.button[data-loading], .button.loading')
          .on('click', function(event) {
            buttons.loading.show(jQuery(this));
          });
      },

      /* =>show($el)
       *
       * This method takes a jQuery element as a parameter (hopefully a
       * button element), disables it and changes his text to a "loading"
       * message.
       *
       * Params:
       *
       * - $el (jQuery element) : Element on which the loading message
       *                          will be shown.
      --------------------------------------------------------------------- */
      show : function($el) {
        // 1.- Take the jQuery element, the loading text from his
        //     `data-loading` attribute (or a default message if
        //      attribute not present) and his current text.
        var $el = jQuery($el),
            lt  = $el.attr('data-loading') || 'Loading…',
            dt  = $el.text() || $el.val();

        // 2.- If all of those values are present (element,
        //     loading text and default text), disable the
        //     element, store his default text on a
        //     `data-loading-default-text` attribute and
        //     fix his width to avoid weird movements when
        //     changing his text to the "loading" one, which
        //     will be done right away.
        if ($el && lt && dt) {
          $el.addClass('disabled')
            .attr('disabled', true)
            .attr('data-loading-default-text', dt)
            .width($el.width());

          $el[0].tagName == "INPUT" ? $el.val(lt) : $el.text(lt);
        }
      },

      /* =>hide($el)
       *
       * This method takes a jQuery element as a parameter (hopefully a
       * button element), enabled it and changes his text (which will be
       * a "loading" one) to his default text (stored at a
       * `data-loading-default-text` attribute).
       *
       * Params:
       *
       * - $el (jQuery element) : Element on which the loading message will
       *                          be changed with his default text.
      --------------------------------------------------------------------- */
      hide : function($el) {
        // 1.- Take the jQuery element and his default text (stored on
        //     a `data-loading-default-text` attribute)
        var $el = jQuery($el),
            t   = $el.attr('data-loading-default-text');

        // 2.- If all of those values are present (element and text),
        //     enable the element, remove his `data-loading-default-text`
        //     attribute and restore his width. After that, set his
        //     current text with the one taken from the
        //     `data-loading-default-text` attribute.
        if ($el && t) {
          $el.removeClass('disabled')
            .attr('disabled', false)
            .removeAttr('data-loading-default-text')
            .width('auto');

          $el[0].tagName == "INPUT" ? $el.val(t) : $el.text(t);
        }
      }
    },

  }

  /* =JQUERY CHOSEN
   *
   * Namespace for jQuery Chosen stuff. Chosen is a jQuery plugin that
   * makes long, unwieldy select boxes much more user-friendly.
  ------------------------------------------------------------------------- */
  var chosen = {

    /* =|init()
     *
     * If jQuery Chosen plugin is present, attaches it to all SELECT
     * elements with a "chosen" `class`.
    ----------------------------------------------------------------------- */
    init : function() {
      if (typeof jQuery.fn.chosen == "function") {
        jQuery('select.chosen').chosen();
      }
    }

  };

  /* =EXPAND BLOCKS
   *
   * Namespace for expand blocks stuff. Expand blocks are title and
   * container HTML blocks pairs that, when you click on the title, the
   * container changes his visibility.
  ------------------------------------------------------------------------- */
  var expand = {

    /* =|Config
     *
     * Configuration for expand blocks:
     *
     * - speed (default 300) : Speed for the container's slide animation
    ----------------------------------------------------------------------- */
    conf: {
      speed: 300 // Speed of slide animation
    },

    /* =|init()
     *
     * This method prepares all expand HTML blocks found on the document.
     * It looks for a HTML structure like this:
     *
     * <div class="expand-wrapper">
     *   <div class="expand-title">Title for the expand block</div>
     *   <div class="expand-body">
     *     Content…
     *   </div>
     * </div>
     *
     * Notes:
     *
     * - You can use any HTML element you want, not
     *   neccessarily DIV elements.
     * - Title and container elements ("expand-title" and "expand-body")
     *   gets a "state-opened" `class` when the container element is
     *   visible, so you can style them as you want.
     * - If you put a "visible" `class` on the global wrapper (the
     *   "expand-wrapper" element), the expand container will be visible
     *   by default.
    ----------------------------------------------------------------------- */
    init: function() {
      jQuery('.expand-wrapper:not(.processed)').each(function(index) {
        // 1.- Sets initial state and fills global vars. By default,
        //     expand container is hidden, and global wrapper gets
        //     a "processed" `class` to mark it as processed by
        //     the Javascript and avoid double processing.
        var $wrapper = jQuery(this).addClass('processed'),
            $title   = $wrapper.find('.expand-title:first'),
            $body    = $wrapper.find('.expand-body:first').hide();

        // 2.- Binds "click" event handler for sliding up/down
        //     the "expand-body" element with every click on
        //     "expand-title" element.
        $title.on('click', $body, function(event, data) {
          var speed = (data && data.instant) ? 0 : expand.conf.speed;

          jQuery(this).toggleClass('state-opened');

          $body.slideToggle(speed).toggleClass('state-opened');

          event.preventDefault();
        });

        // 3.- Triggers "click" event on "expand-title" element
        //     to show "expand-body" element if "expand-wrapper"
        //     has "visible" `class`.
        if ($wrapper.hasClass('visible')) {
          $title.trigger('click', { instant: true });
        }
      });
    }
  };

}