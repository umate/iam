// Generated by CoffeeScript 1.3.3
(function() {

  $(function() {
    var $menu, controlKeys, controlKeysMatch, iamNotice, initialize, input, inputMode, inputSelected, isTilde, logInByInput, logInByLink, menuLink, processInput, templateLink;
    $menu = $('#iam-menu');
    templateLink = '/iam/log_in_as/:id';
    menuLink = '/iam/menu';
    inputMode = false;
    input = '';
    controlKeys = ['alt', 'ctrl', 'shift'];
    initialize = function() {
      $('.iam-settings-header').on('click', function() {
        return $('.iam-settings').toggle();
      });
      $('#iam-menu').on('click', 'td', function() {
        var $tr, link;
        $tr = $(this).parents('tr');
        link = $tr.attr('href');
        if (link) {
          return logInByLink(link);
        }
      });
      return $.each(controlKeys, function() {
        var $checkbox, cookieName;
        $checkbox = $(".iam-" + this + "-settings input");
        cookieName = "iam-" + this + "-checked";
        $checkbox[0].checked = $.cookie(cookieName) === 'true';
        return $checkbox.on('click', function() {
          return $.cookie(cookieName, this.checked);
        });
      });
    };
    iamNotice = function(notice) {
      var $notice;
      $notice = $("<div class='iam-notice'>" + notice + "</div>");
      $('body').append($notice);
      return $notice.fadeIn(200).delay(1000).fadeOut(600);
    };
    logInByLink = function(link) {
      return $.post(link, function(data) {
        $menu.hide();
        window.location.reload();
        return iamNotice(data.notice);
      });
    };
    isTilde = function(code) {
      return String.fromCharCode(code) === 'À';
    };
    controlKeysMatch = function(e) {
      var key, keyOn, _i, _len;
      for (_i = 0, _len = controlKeys.length; _i < _len; _i++) {
        key = controlKeys[_i];
        keyOn = $.cookie("iam-" + key + "-checked") === 'true';
        if (keyOn !== e["" + key + "Key"]) {
          return false;
        }
      }
      return true;
    };
    inputSelected = function() {
      return $(document.getSelection().focusNode).find('input, textarea').length > 0;
    };
    processInput = function(input) {
      var link;
      if (input.match(/^\d+$/)) {
        link = templateLink.replace(/:id/, input);
        return logInByLink(link);
      } else {
        if (input) {
          return iamNotice("" + input + " is invalid id.");
        }
      }
    };
    logInByInput = function() {
      if (inputMode) {
        processInput(input);
        $('#iam-menu').remove();
      } else {
        $.get(menuLink, function(menu) {
          $('body').append(menu);
          return initialize();
        });
      }
      return input = '';
    };
    return $(document).on('keydown', function(e) {
      var _ref;
      if (!inputSelected() && isTilde(e.keyCode) && controlKeysMatch(e)) {
        logInByInput();
        inputMode = !inputMode;
        return $menu.toggle();
      } else {
        if ((48 <= (_ref = e.keyCode) && _ref <= 57)) {
          return input += String.fromCharCode(e.keyCode);
        }
      }
    });
  });

}).call(this);
