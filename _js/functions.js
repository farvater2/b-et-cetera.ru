$(document).ready(function() {

  /**
   * Header menu. Show/Hide top menu.
   */
  $('.nav li').find('ul:first').hide();
  $('.nav li').hover(function() {
    $(this).find('ul:first').fadeIn();
  }, function() {
    $(this).find('ul:first').hide();
  });

/**
 * Shadow-block stretch to full window size
 */
  $('.shadow').css('height', $(document).height());

/**
 * Hide shadow-block and popup-block on shadow-block click
 */
  $('.shadow').click(function() {
    $('.shadow, .popup').fadeOut();
    $('.abonPopup').animate({
      top: -300,
      opacity: 0,
    }, 200);
  });

  $('.abonementsLinks').click(function() {
    $('.shadow').fadeIn();
    $('.abonPopup').css('display', 'block').animate({
      top: -150,
      opacity: 1,
    }, 500);

    $('html, body').animate({
      scrollTop: 230,
    }, 500);
    return false;
  });

  $('.comment-panel').click(function() {
    $('.shadow').fadeIn();
    $('.popup_comment').css('display', 'block').animate({
      top: 0,
      opacity: 1,
    }, 500);

    $('html, body').animate({
      scrollTop: 300,
    }, 500);
    return false;
  });

  $('.forAudience form a').click(function() {
    let ch = false;
    if ($('#name').val() === '') {
      $('#name').addClass('error');
      ch = true;
    }
    if ($('#email').val() === '') {
      $('#email').addClass('error');
      ch = true;
    }
    if ($('#message').val() === '') {
      $('#message').addClass('error');
      ch = true;
    }
    if (ch) {
      return false;
    }
  });
  $('.forAudience form input, .forAudience form textarea').click(function() {
    $(this).removeClass('error');
  });

  if ($('.photoGallery').length > 0) {
    $('.photoGallery a').fancybox();
  }
  if ($('.promoRoll').length > 0) {
    $('.promoRoll').fancybox();
  }

  // Всплывающее окно АКТЕРЫ
  $('body').on('click', '.actors', function() {
    // $(".actors").click( function() {
    let _id = $(this).attr('data-perfomans-id');
    let _date = $(this).attr('data-date');
    console.log('_id ' + _id);
    console.log('_date ' + _date);
    // $("body").on("click", ".actors", function() {
    //    var _id = $('.slide.active').attr("data-perfomans-id");
    //    var _date = $('.calendar .day.has_action.active').attr("data-date");
    getActorsByPerfomanceID(_id, _date);
    //
    let top = $(window).scrollTop();
    // $('.popup_actors').css({
    //    top: top + 200
    // });
    //
  });

  // Всплывающее окно Подписка на новости театра
  $('body').on('click', '.mailingLabel', function() {
    $('.shadow').fadeIn();
    $('.popup_mailing').fadeIn();
    $(window).scrollTop();
  });

  // Всплывающее окно АНКЕТА
  $('body').on('click', '.questionnaireLabel', function() {
    $('.shadow').fadeIn();
    $('.popup_questionnaire').fadeIn();
    $(window).scrollTop();
  });

  $('.shadow').click(function() {
    $('.shadow, .popup_actors').fadeOut();
    $('.shadow, .popup_questionnaire').fadeOut();
    $('.shadow, .popup_mailing').fadeOut();
    $('.shadow, .popup').fadeOut();
    $('.shadow, .popup_comment').fadeOut();
    $('.shadow, .popup_index').fadeOut();
    $('.shadow, #popup_seatDesc').fadeOut();
  });
});

function GetEventByID(_perfomans) {
  $.ajax({
    url: '/ajax.php',
    dataType: 'html',
    type: 'POST',
    data: {
      'action': 'get_event_by_id',
      'perfomans': _perfomans,
    },
    success: function(data) {
      $('.popup').empty().html(data);
      //            var _top = $(window).scrollTop();
      //            $('.popup').css({"top": _top + 100 + "px"});
      $('.shadow, .popup').fadeIn();
      //            console.log(data);
      //            $('body,html').animate({scrollTop: 0}, 500);
    },
    error: function(textStatus) {
      console.log(textStatus);
    },
  });
}

/**
 * [getActorsByPerfomanceID description]
 * @param  {[type]} _perfomans [description]
 * @param  {[type]} _date      [description]
 */
function getActorsByPerfomanceID(_perfomans, _date) {
  console.log(_date);
  console.log(_perfomans);
  $.ajax({
    url: '/ajax.php',
    dataType: 'html',
    type: 'POST',
    data: {
      'action': 'get_actors_by_perfomanceid',
      'perfomans': _perfomans,
      'date': _date,
    },
    success: function(data) {
      $('.popup_actors').empty().html(data);
      $('.shadow, .popup_actors').fadeIn();
      // console.log(data);
    },
    error: function(textStatus) {
      console.log(textStatus);
    },
  });
}
mih_NEEDTOEXIT = false;

function ajaxCalendar(_date, _perfomans) {
  /* Код постера спектакля для заставки */
  let PosterHtml = '';
  /* Время показа постера */
  let PosterDelay = 1;

  // Постер ведёт на заказ билетов
  // var mihdata = '<div class="calendar_slides"><a href="/tickets/?ID=5964&from=poster"><img src="/upload/medialibrary/images/Poster_UO_24.09.2015.jpg" alt=""></a></div>';

  // Постер ведёт на страницу спектакля
  // var mihdata = '<div class="calendar_slides"><a href="/performance/boris-godunov/?from=poster"><img src="/upload/medialibrary/images/Poster_BG_22-23.12.2015=.jpg" alt=""></a></div>';
  // var mihdata = '<div class="calendar_slides"><a href="/performance/serdtse-ne-kamen/?from=poster"><img src="/upload/medialibrary/images/Poster_SNK_31.12.2015.jpg" alt=""></a></div>';
  // mihdata = '<div class="calendar_slides"><a href="/performance/komediya_oshibok/?from=poster"><img src="/upload/medialibrary/images/Poster_KO_31.12.2015.jpg" alt=""></a></div>';
  // var mihdata = '<div class="calendar_slides"><a href="/performance/yubileynyy-vecher-s-teatrom/?from=poster"><img src="/upload/medialibrary/images/Poster_07.12.2015.2.jpg" alt=""></a></div>';
  // var mihdata = '<div class="calendar_slides"><a href="/performance/yubileynyy-vecher-s-teatrom/?from=poster"><img src="/upload/medialibrary/images/Poster_07.12.2015.jpg" alt=""></a></div>';
  // var mihdata = '<div class="calendar_slides"><a href="/performance/vse-o-zhenshchinakh/?from=poster"><img src="/upload/medialibrary/images/Poster_VOJ_31.10.2015_.jpg" alt=""></a></div>';

  // Постер "Юбилей театра" 02.02.2017
  // PosterHtml = '<div class="calendar_slides"><a href="/?from=poster"><img src="/upload/medialibrary/images/Poster_25etc_02.02.2018.jpg" alt=""></a></div>';

  console.log($('.posterLeft').attr('poster-href'));
  console.log($('.posterLeft').attr('poster-img'));
  let PosterImg = $.trim($('.posterLeft').attr('poster-img'));
  let PosterHref = $.trim($('.posterLeft').attr('poster-href'));
  if (PosterImg != '') {
    PosterHtml = '<div class="calendar_slides">';
    if (PosterHref != '') {
      PosterHtml += '<a href="' + PosterHref + '">';
    }
    PosterHtml += '<img src="' + PosterImg + '">';
    if (PosterHref != '') {
      PosterHtml += '</a>';
    }
    PosterDelay = 4000;
  }
  $('.posterLeft').empty().html(PosterHtml);
  //

  $('.buyTicket').attr('href',
    'http://www.ticketland.ru/teatry/teatr-et-cetera-p-r-aleksandra-kalyagina/'
  );
  // $('.buyTicket').attr('href', '/tickets/?ID=6039');

  $('.day_num').on('click', function(e) {
    mih_NEEDTOEXIT = true;
    return;
  });
  if (mih_NEEDTOEXIT) {
return;
}
  setTimeout(function() {
    // -mih

    if (mih_NEEDTOEXIT) {
return;
}
    $('.posterLeft img').fadeToggle('slow');

    setTimeout(function() {
      if (mih_NEEDTOEXIT) {
return;
}

      $.ajax({
        url: '/ajax.php',
        dataType: 'html',
        type: 'POST',
        data: {
          'action': 'get_news_for_day',
          'date': _date,
          'perfomans': _perfomans,
        },
        success: function(data) {
          $('.posterLeft').empty().html(data);
          let $frame = $('.calendar_slides');
          let $wrap = $frame.parent();
          // Call Sly on frame
          $frame.sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateMiddle: 1,
            mouseDragging: 0,
            touchDragging: 1,
            releaseSwing: 1,
            scrollSource: null,
            startAt: 0,
            scrollBy: 0,
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
            cycleBy: 'items', // Enable automatic cycling by 'items' or 'pages'.
            cycleInterval: 5000, // Delay between cycles in milliseconds.
            pauseOnHover: 0, // Pause cycling when mouse hovers over the FRAME.
            pagesBar: $wrap.find('.pages'), // Selector or DOM element for pages bar container.
            activatePageOn: 'click', // Event used to activate page. Can be: click, mouseenter, ...
            // Buttons
            prevPage: $wrap.find('.prev'),
            nextPage: $wrap.find('.next'),
          });
          //
          // console.log($("div").find("[data-date='" + _date + "']").val());
          // $("div").find("[data-date='" + _date + "']").click();
          // $('.has_action').click();
          //
          let buyTicket_PerfomaneID = _perfomans.substring(0,
            _perfomans.indexOf(','));
          $('.buyTicket').attr('href', '/tickets/?ID=' +
            buyTicket_PerfomaneID);
        },
        error: function(textStatus) {
          console.log(textStatus);
        },
      });
    }, 600);

    // mih
  }, PosterDelay); // Время показа постера
  // -mih
}

function ajaxCalendarFirst(_date, _perfomans) {
  if (typeof _perfomans === 'undefined') {
    _perfomans = 6317;
  }
  $.ajax({
    url: '/ajax.php',
    dataType: 'html',
    type: 'POST',
    data: {
      'action': 'get_news_for_day',
      'date': _date,
      'perfomans': _perfomans,
    },
    success: function(data) {
      $('.posterLeft').empty().html(data);
      $('.slidee').prepend(mih_current_slidee);
      $('.prev').addClass('disabled');
      $('.next').addClass('disabled');
      let $frame = $('.calendar_slides');
      let $wrap = $frame.parent();
      // Call Sly on frame
      $frame.sly({
        horizontal: 1,
        itemNav: 'basic',
        smart: 1,
        activateMiddle: 1,
        mouseDragging: 0,
        touchDragging: 1,
        releaseSwing: 1,
        scrollSource: null,
        startAt: 0,
        scrollBy: 0,
        speed: 300, // 100
        elasticBounds: 1,
        easing: 'easeOutExpo',
        dragHandle: 1,
        dynamicHandle: 1,
        clickBar: 1,
        cycleBy: 'items', // Enable automatic cycling by 'items' or 'pages'.
        cycleInterval: 200, // 300 5000, // Delay between cycles in milliseconds.
        pauseOnHover: 0, // Pause cycling when mouse hovers over the FRAME.
        pagesBar: $wrap.find('.pages'), // Selector or DOM element for pages bar container.
        activatePageOn: 'click', // Event used to activate page. Can be: click, mouseenter, ...
        // Buttons
        // prevPage: $wrap.find('.prev'),
        // nextPage: $wrap.find('.next')
      });

      setTimeout(function() {
        $('.posterLeft').empty().html(data);
        let $frame = $('.calendar_slides');
        let $wrap = $frame.parent();
        // Call Sly on frame
        $frame.sly({
          horizontal: 1,
          itemNav: 'basic',
          smart: 1,
          activateMiddle: 1,
          mouseDragging: 0,
          touchDragging: 1,
          releaseSwing: 1,
          scrollSource: null,
          startAt: 0,
          scrollBy: 0,
          speed: 300,
          elasticBounds: 1,
          easing: 'easeOutExpo',
          dragHandle: 1,
          dynamicHandle: 1,
          clickBar: 1,
          cycleBy: 'items', // Enable automatic cycling by 'items' or 'pages'.
          cycleInterval: 5000, // 5000, // Delay between cycles in milliseconds.
          pauseOnHover: 0, // Pause cycling when mouse hovers over the FRAME.
          pagesBar: $wrap.find('.pages'), // Selector or DOM element for pages bar container.
          activatePageOn: 'click', // Event used to activate page. Can be: click, mouseenter, ...
          // Buttons
          prevPage: $wrap.find('.prev'),
          nextPage: $wrap.find('.next'),
        });
      }, 400);
      let buyTicket_PerfomaneID = _perfomans.substring(0, _perfomans.indexOf(
        ','));
      $('.buyTicket').attr('href', '/tickets/?ID=' +
        buyTicket_PerfomaneID);
    },

    error: function(textStatus) {
      console.log(textStatus);
    },
  });
}

// parse a date in yyyy-mm-dd format
function parseDate(input) {
  let parts = input.split('.');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[2], parts[1] - 1, parts[0]); // Note: months are 0-based
}

$(document).ready(function() {
  // Глобальная переменная, в которой храниться код текущего слайда
  mih_current_slidee = '';

  // Сколько спектаклей в этот день
  let PerfCount = 1;

  let TopDays_hasAction = [];

  // Получаем текущую дату
  // 1 способ
  // var current_date = $('.days_numbers .today').attr('data-date');

  // 2 способ
  let current_date = new Date();
  let dd = current_date.getDate();
  let mm = current_date.getMonth() + 1; // January is 0!
  let yyyy = current_date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  current_date = dd + '.' + mm + '.' + yyyy;

  // Заглушка на летние месяцы.
  // current_date = '01.09.2015';

  let counter_date = 0;
  $('.has_action').each(function(z) {
    if ((new Date(parseDate($(this).attr('data-date'))) >= new Date(
        parseDate(current_date))) && !$(this).hasClass('hide_this') &&
      (counter_date < 5)) {
      // console.log('date ',$(this).attr('data-date'));
      TopDays_hasAction[counter_date] = this;
      counter_date++;
    }
  });

  has_action_counter = 0;

  $('.has_action').on('click', function(e) {
    has_action_counter++;
  });

  // Для остановки слайдера 5 спектаклей при нажатии "Актеры"
  $('.poster').on('click', '.calendar_slides .actors', function(e) {
    has_action_counter = -1;
    console.log('actors');
  });

  if (TopDays_hasAction.length == 0) {} else if (TopDays_hasAction.length ==
    2) {
setTimeout(function() {
      if (has_action_counter == 0) {
$(TopDays_hasAction[1]).click();
} else return;
      setTimeout(function() {
        if (has_action_counter == 1) {
$(TopDays_hasAction[0]).click();
} else return;
      }, 5000 * PerfCount);
    }, 6000);
} else if (TopDays_hasAction.length == 3) {
setTimeout(function() {
      if (has_action_counter == 0) {
$(TopDays_hasAction[1]).click();
} else return;
      setTimeout(function() {
        if (has_action_counter == 1) {
$(TopDays_hasAction[2]).click();
} else return;
        setTimeout(function() {
          if (has_action_counter == 2) {
$(TopDays_hasAction[0]).click();
} else return;
        }, 5000 * PerfCount);
      }, 5000 * PerfCount);
    }, 6000);
} else if (TopDays_hasAction.length == 4) {
setTimeout(function() {
      if (has_action_counter == 0) {
$(TopDays_hasAction[1]).click();
} else return;
      setTimeout(function() {
        if (has_action_counter == 1) {
$(TopDays_hasAction[2]).click();
} else return;
        setTimeout(function() {
          if (has_action_counter == 2) {
$(TopDays_hasAction[3]).click();
} else return;
          setTimeout(function() {
            if (has_action_counter == 3) {
$(TopDays_hasAction[0]).click();
} else return;
          }, 5000 * PerfCount);
        }, 5000 * PerfCount);
      }, 5000 * PerfCount);
    }, 6000);
} else if (TopDays_hasAction.length == 5) {
setTimeout(function() {
      if (has_action_counter == 0) {
$(TopDays_hasAction[1]).click();
} else return;
      setTimeout(function() {
        if (has_action_counter == 1) {
$(TopDays_hasAction[2]).click();
} else return;
        setTimeout(function() {
          if (has_action_counter == 2) {
$(TopDays_hasAction[3]).click();
} else return;
          setTimeout(function() {
            if (has_action_counter == 3) {
$(TopDays_hasAction[4]).click();
} else return;
            setTimeout(function() {
              if (has_action_counter == 4) {
$(TopDays_hasAction[0]).click();
} else return;
            }, 5000 * PerfCount);
          }, 5000 * PerfCount);
        }, 5000 * PerfCount);
      }, 5000 * PerfCount);
    }, 6000);
} else {
setTimeout(function() {
      if (has_action_counter == 0) {
$(TopDays_hasAction[1]).click();
} else return;
      setTimeout(function() {
        if (has_action_counter == 1) {
$(TopDays_hasAction[2]).click();
} else return;
        setTimeout(function() {
          if (has_action_counter == 2) {
$(TopDays_hasAction[3]).click();
} else return;
          setTimeout(function() {
            if (has_action_counter == 3) {
$(TopDays_hasAction[4]).click();
} else return;
            setTimeout(function() {
              if (has_action_counter == 4) {
$(TopDays_hasAction[5]).click();
} else return;
              setTimeout(function() {
                if (has_action_counter == 5) {
$(TopDays_hasAction[0]).click();
} else return;
              }, 5000 * PerfCount);
            }, 5000 * PerfCount);
          }, 5000 * PerfCount);
        }, 5000 * PerfCount);
      }, 5000 * PerfCount);
    }, 6000);
}

  $('body').on('click', '.has_action', function() {
    if ($(this).hasClass('active')) {
      return false;
    }
    // Получаем текущий активный день
    mih_current_slidee = $('.slidee').html();
    // console.log('.day.active', mih_current_active_day);
    $('.day.active').removeClass('active');
    $(this).addClass('active');
    let _date = $(this).attr('data-date');
    let _perfomans = $(this).attr('data-perfomans-id');
    ajaxCalendarFirst(_date, _perfomans);
    PerfCount = (_perfomans.match(/,/g) || []).length;
    console.log('Количество спектаклей ' + (_perfomans.match(/,/g) || [])
      .length);
    // mih
    // var _soldOut = $(this).attr('data-soldOut');
    // ajaxCalendarFirst_mih(_date, _perfomans, _soldOut)
    // mih
  });
  $.fn.serializeObject = function() {
    let o = {};
    let a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

  // wright us
  $('.write_us_form').submit(function(e) {
    e.preventDefault();

    let form = $(this);
    let obj = form.serializeObject();

    let send = 1;

    let fields = form.find('input, textarea');

    $.each(fields, function(index, val) {
      var val = $(val);
      let value_f = val.val();

      if (val.attr('name') == 'name') {
        if (value_f.length < 2 || value_f == 'Имя') {
          val.addClass('error');
          send = 0;
        } else {
          val.removeClass('error');
        }
      }
      if (val.attr('name') == 'email') {
        if (!isValidEmailAddress(value_f)) {
          val.addClass('error');
          send = 0;
        } else {
          val.removeClass('error');
        }
      }
      if (val.attr('name') == 'message') {
        if (value_f.length < 3 || value_f == 'Сообщение' || value_f ==
          'Текст письма') {
          val.addClass('error');
          send = 0;
        } else {
          val.removeClass('error');
        }
      }
    });

    if (send === 1) {
      $.ajax({
        dataType: 'json',
        url: '/ajax_form.php',
        type: 'post',
        data: {
          data: obj,
        },
      }).done(function(data) {
        if (data.result === 'ok') {
          showSuccess(
            'Ваше сообщение отправлено.<br/> ' +
            'В течение некоторого времени<br/> ' +
            'Вам ответят наши менеджеры',
            'Спасибо');
        }
      });
      return false;
    }
  });

  $('body').on({
    click: function() {
      hideSuccess();
    },
  }, '.wrap_button');

  let mrInput = '.write_us_form input, .write_us_form textarea';
  $(mrInput).focus(function() {
    $(this).removeClass('error');
  });
});

// success message
function showSuccess(text, btn_text) {
  let _top = $(document).scrollTop();
  _top = _top + 100;

  let html_popup = '<div class="modal_win" style="top:' + _top +
    'px">' + '<p class="text">' + text + '</p>' +
    '<p class="wrap_button"><span>' + btn_text + '</span></p>' + '</div>';

  $('body').append(html_popup);
}

function hideSuccess() {
  $('.modal_win').remove();
  $('.write_us_form input, .write_us_form textarea').not(
    'input[type=button],input[type=submit],button,input[name=type]').val('');
}

// email validation
function isValidEmailAddress(emailAddress) {
  let pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  return pattern.test(emailAddress);
}

// скрипты страницы заказа билета
$(document).ready(function() {
  let mih;
  let mih2;
  if ($('.ticketForm').length) {
    let NeedToSelect = $('select#sb_spectacles option[isneedtoselect]').attr(
      'isneedtoselect');
    mih2 = $('select#sb_spectacles option[isneedtoselect]').attr('id');
    if (mih2 == 6590) {
      $('a.buyButton').attr('href',
        '//www.ticketland.ru/teatry/teatr-et-cetera-p-r-aleksandra-kalyagina/zakulise-kvest/?utm_term=etcetera'
      );
    }
    console.log('NeedToSelect2 ' + NeedToSelect);
    if (NeedToSelect) {
      $('select#sb_spectacles option[isneedtoselect]').attr('selected',
        'selected');

      $('.ticketForm table select#sb_spectacles').selectbox({
        onOpen: function(inst) {
          $('option:selected', this).attr('selected', true).siblings()
            .removeAttr('selected');
          $('#sbHolder_' + $('#' + inst.id).attr('sb')).removeClass(
            'error');
        },
        onChange: function(val, inst) {
          $('option:selected', this).attr('selected', true).siblings()
            .removeAttr('selected');
          mih2 = $('option:selected', this).attr('id');
          if (mih2 == 6590) {
            $('a.buyButton').attr('href',
              '//www.ticketland.ru/teatry/teatr-et-cetera-p-r-aleksandra-kalyagina/zakulise-kvest/?utm_term=etcetera'
            );
          } else {
            $('a.buyButton').attr('href',
              '//www.ticketland.ru/teatry/teatr-et-cetera-p-r-aleksandra-kalyagina/?utm_term=etcetera'
            );
          }

          //
          $.ajax({
            type: 'POST',
            data: {
              action: 'getSpecShedule',
              select_spectacle: val,
            },
            url: '/ajax.php',
            success: function(data) {
              $('.sb_datetime_box').html(data);
              // console.log("sb_datetime_box_");
              $('#sb_datetime').selectbox({
                onOpen: function(inst) {
                  $('#sbHolder_' + $('#' + inst.id).attr(
                    'sb')).removeClass('error');
                  $('option:selected', this).attr(
                    'selected', true).siblings().removeAttr(
                    'selected');
                },
                onChange: function(val, inst) {
                  $('option:selected', this).attr(
                    'selected', true).siblings().removeAttr(
                    'selected');
                },
                effect: 'slide',
              });
              $('.sb_datetime_box .sbOptions').find('li:eq(0)')
                .css({
                  'display': 'none',
                });
            },
          });
          // console.log("sb_datetime_box-");

          $.ajax({
            type: 'POST',
            data: {
              action: 'getSpecPrice',
              VarMih: mih,
            },
            url: '/ajax.php',
            success: function(data) {
              $('.sb_prices_box').html(data);
              // console.log("sb_prices_box_-", mih);
              $('#sb_prices').selectbox({
                onOpen: function(inst) {
                  $('#sbHolder_' + $('#' + inst.id).attr(
                    'sb')).removeClass('error');
                  $('option:selected', this).attr(
                    'selected', true).siblings().removeAttr(
                    'selected');
                },
                onChange: function(val, inst) {
                  $('option:selected', this).attr(
                    'selected', true).siblings().removeAttr(
                    'selected');
                },
                effect: 'slide',
              });
              $('.sb_prices_box .sbOptions').find('li:eq(0)').css({
                'display': 'none',
              });
            },
          });
          //
        },
        effect: 'slide',
      });

      mih = $('select#sb_spectacles option:selected').attr('id');
      // console.log("mih", mih);

      $.ajax({
        type: 'POST',
        data: {
          action: 'getSpecShedule',
          select_spectacle: NeedToSelect,
        },
        url: '/ajax.php',
        success: function(data) {
          $('.sb_datetime_box').html(data);
          // console.log("sb_datetime_box_");
          $('#sb_datetime').selectbox({
            onOpen: function(inst) {
              $('#sbHolder_' + $('#' + inst.id).attr('sb')).removeClass(
                'error');
              $('option:selected', this).attr('selected', true)
                .siblings().removeAttr('selected');
            },
            onChange: function(val, inst) {
              $('option:selected', this).attr('selected', true)
                .siblings().removeAttr('selected');
            },
            effect: 'slide',
          });
          $('.sb_datetime_box .sbOptions').find('li:eq(0)').css({
            'display': 'none',
          });
        },
      });
      // console.log("sb_datetime_box");

      $.ajax({
        type: 'POST',
        data: {
          action: 'getSpecPrice',
          VarMih: mih,
        },
        url: '/ajax.php',
        success: function(data) {
          $('.sb_prices_box').html(data);
          // console.log("sb_prices_box_", mih);
          $('#sb_prices').selectbox({
            onOpen: function(inst) {
              $('#sbHolder_' + $('#' + inst.id).attr('sb')).removeClass(
                'error');
              $('option:selected', this).attr('selected', true)
                .siblings().removeAttr('selected');
            },
            onChange: function(val, inst) {
              $('option:selected', this).attr('selected', true)
                .siblings().removeAttr('selected');
            },
            effect: 'slide',
          });
          $('.sb_prices_box .sbOptions').find('li:eq(0)').css({
            'display': 'none',
          });
        },
      });
      // console.log("sb_prices_box", mih);

      $('.sb_spectacles_box .sbOptions').find('li:eq(0)').css({
        'display': 'none',
      });
    } else {
      $('.ticketForm table select').selectbox({
        onOpen: function(inst) {
          $('#sbHolder_' + $('#' + inst.id).attr('sb')).removeClass(
            'error');
          $('option:selected', this).attr('selected', true).siblings()
            .removeAttr('selected');
        },
        onChange: function(val, inst) {
          $('option:selected', this).attr('selected', true).siblings()
            .removeAttr('selected');
          mih2 = $('option:selected', this).attr('id');
          if (mih2 == 6590) {
            $('a.buyButton').attr('href',
              '//www.ticketland.ru/teatry/teatr-et-cetera-p-r-aleksandra-kalyagina/zakulise-kvest/?utm_term=etcetera'
            );
          } else {
            $('a.buyButton').attr('href',
              '//www.ticketland.ru/teatry/teatr-et-cetera-p-r-aleksandra-kalyagina/?utm_term=etcetera'
            );
          }

          if (inst.id === 'sb_spectacles') {
            $('.sb_spectacles_box .sbOptions').find('li:eq(0)').css({
              'display': 'none',
            });

            mih = $('option:selected', this).attr('id');

            //
            $.ajax({
              type: 'POST',
              data: {
                action: 'getSpecShedule',
                select_spectacle: val,
              },
              url: '/ajax.php',
              success: function(data) {
                $('.sb_datetime_box').html(data);
                // console.log("sb_datetime_box_");
                $('#sb_datetime').selectbox({
                  onOpen: function(inst) {
                    $('#sbHolder_' + $('#' + inst.id).attr(
                      'sb')).removeClass('error'); //
                    $('option:selected', this).attr(
                      'selected', true).siblings().removeAttr(
                      'selected');
                  },
                  onChange: function(val, inst) {
                    $('option:selected', this).attr(
                      'selected', true).siblings().removeAttr(
                      'selected');
                  },
                  effect: 'slide',
                });
                $('.sb_datetime_box .sbOptions').find(
                  'li:eq(0)').css({
                  'display': 'none',
                });
              },
            });
            // console.log("sb_datetime_box-");

            $.ajax({
              type: 'POST',
              data: {
                action: 'getSpecPrice',
                VarMih: mih,
              },
              url: '/ajax.php',
              success: function(data) {
                $('.sb_prices_box').html(data);
                // console.log("sb_prices_box_-", mih);
                $('#sb_prices').selectbox({
                  onOpen: function(inst) {
                    $('#sbHolder_' + $('#' + inst.id).attr(
                      'sb')).removeClass('error'); //
                    $('option:selected', this).attr(
                      'selected', true).siblings().removeAttr(
                      'selected');
                  },
                  onChange: function(val, inst) {
                    $('option:selected', this).attr(
                      'selected', true).siblings().removeAttr(
                      'selected');
                  },
                  effect: 'slide',
                });
                $('.sb_prices_box .sbOptions').find('li:eq(0)')
                  .css({
                    'display': 'none',
                  });
              },
            });
            //
          }
        },
        effect: 'slide',
      });

      $('.sb_spectacles_box .sbOptions').find('li:eq(0)').css({
        'display': 'none',
      });
    }

    $('.ticketForm table select').selectbox({
      effect: 'slide',
    });

    let i = 1;
    $('.orderTickets .birthday .sbHolder').each(function() {
      $(this).addClass('cl' + i);
      i++;
    });
    $('.orderTickets table p input').styler();

    $('.orderTickets input').focus(function() {
      $(this).removeClass('error');
    });

    $('.ticketForm').submit(function(event) {
      errState = 0;
      event.preventDefault();
      // проверка выбранности спектакля
      if (parseInt($('#sb_spectacles').val()) === 0) {
        $('#sbHolder_' + $('#sb_spectacles').attr('sb')).addClass(
          'error');
        errState = 1;
      }
      // проверка выбранности даты и времени
      if (parseInt($('#sb_datetime').val()) === 0) {
        $('#sbHolder_' + $('#sb_datetime').attr('sb')).addClass('error');
        errState = 1;
      }
      // проверка выбранности цены билета
      if (parseInt($('#sb_prices').val()) === 0) {
        $('#sbHolder_' + $('#sb_prices').attr('sb')).addClass('error');
        errState = 1;
      }
      // проверка количетсва билетов
      let patternNumber = /^\d+$/;
      if (!patternNumber.test($('.numberOfTickets').val()) || $(
          '.numberOfTickets').val() == 0 || $('.numberOfTickets').val() >
        500) {
        $('.numberOfTickets').addClass('error');
        errState = 1;
      }
      // проверка имени
      if ($('.fullName').val().length === 0) {
        $('.fullName').addClass('error');
        errState = 1;
      }
      // проверка телефона
      let patternPhone =
        /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
      if (!patternPhone.test($('.contactPhone').val())) {
        $('.contactPhone').addClass('error');
        errState = 1;
      }
      // проверка почты
      let patternEMail =
        /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}$/;
      if (!patternEMail.test($('.contactEMail').val())) {
        $('.contactEMail').addClass('error');
        errState = 1;
      }

      if (errState === 1) {
        // mih
        $('body,html').animate({
          scrollTop: 620,
        }, 500);
        // $(".sbHolder error").animate({scrollTop: 0}, 500);
        //
        event.preventDefault();
        return false;
      }
      let formData = $('.ticketForm').serializeArray();
      formData[0]['value'] = $('#sb_spectacles option:selected').attr(
        'id');
      // formData[0]['value'] = $("#sb_spectacles option:selected").val();
      formData[1]['value'] = $('#sb_datetime option:selected').text();
      // formData[1]['value'] = formData;
      // formData['ID_SPEC'] = $("#sb_datetime").val();
      // formData['ID_SPEC'] = $("#sb_spectacles option:selected").val();
      $.ajax({
        type: 'POST',
        data: {
          action: 'sendTicket',
          formData: formData,
        },
        url: '/ajax.php',
        success: function(data) {
          console.log('ok: ' + data);
          if (data === 'ok') {
            showSuccess(
              'Ваша заявка принята.<br/> ' +
              'В течение некоторого времени<br/> ' +
              'Вам ответят наши менеджеры' +
              '<audio src="/upload/medialibrary/Ring.mp3" autoplay></audio>',
              'Спасибо');
          }
        },
        error: function(textStatus) {
          console.log(textStatus);
        },
      });
      return true;
    });
  }

  $('.questionnaireForm').submit(function(event) {
    event.preventDefault();
    let formData = $('.questionnaireForm').serializeArray();

    // formData[0]['value'] = $("#sb_spectacles option:selected").attr("id");
    // formData[0]['value'] = $("#sb_spectacles option:selected").val();
    // formData[1]['value'] = $("#sb_datetime option:selected").text();
    // formData[1]['value'] = formData;
    // formData['ID_SPEC'] = $("#sb_datetime").val();
    // formData['ID_SPEC'] = $("#sb_spectacles option:selected").val();

    $.ajax({
      type: 'POST',
      data: {
        action: 'sendQuestionnaire',
        formData: formData,
      },
      url: '/ajax.php',
      success: function(data) {
        if (data === 'ok') {
          $('.popup_questionnaire').fadeOut();
          showSuccess('Ваша анкета принята.', 'Спасибо');
        }
      },
    });
    return true;
  });
});

function createSelectbox(sbName) {
  $('#' + sbName).selectbox({
    onOpen: function(inst) {
      $(this).parent().find('.sbOptions li:eq(0)').css({
        'display': 'none',
      });
    },
    onChange: function(val, inst) {
      if (val != 0) { // require a URL
        window.location = val; // redirect
      }
      return false;
    },
    effect: 'slide',
  });

  // Несущественное исправление DOM
  $('.' + sbName + '_box li a').each(function() {
    $(this).attr('href', $(this).attr('rel'));
  });
}

$(document).ready(function() {
  if ($('.sb_actors_box').length) {
    createSelectbox('sb_actors');
  }
  if ($('.sb_archive_box').length) {
    createSelectbox('sb_archive');
  }
  if ($('.sb_boss_box').length) {
    createSelectbox('sb_boss');
  }
  if ($('.sb_creators_box').length) {
    createSelectbox('sb_creators');
  }
  if ($('.sb_performance_box').length) {
    createSelectbox('sb_performance');
  }
  if ($('.sb_performance_box_arkhiv-tekushchego-repertuara').length) {
    createSelectbox('sb_performance_arkhiv-tekushchego-repertuara');
  }
  if ($('.sb_performance_box_arkhiv-spektakley').length) {
    createSelectbox('sb_performance_arkhiv-spektakley');
  }
  if ($('.sb_news_box').length) {
    createSelectbox('sb_news');
  }
  if ($('.sb_press_box').length) {
    createSelectbox('sb_press');
  }

  if ($('#popup_seatDesc').length) {
    // $(".shadow").css("height", "2000");
  }

  if ($('.creatorsPage').length) {
    let MaxHeight = 0;
    $('.content').css('width', '1190px');

    $('.creatorsColumn').each(function() {
      if (MaxHeight < parseInt($(this).css('height'))) {
MaxHeight = parseInt($(this).css('height'));
}
    });

    $('.creatorsColumn').each(function() {
      $(this).css('height', MaxHeight + 'px');
    });
  }

  //* ************* Страница СПЕКТАКЛИ *****************//
  if ($('.performance').length) {
    // : скрыть-показать фото
    $('.performance .rightWrap .show-hide-panel').addClass('show');
    $('.performance .rightWrap .show-hide-panel.show').live('click',
      function() {
        $('.performance .rightWrap .show-hide-panel').removeClass('show');
        $('.performance .rightWrap .show-hide-panel').addClass('hide');
        $('.performance .rightWrap ul li.hidden').addClass('canbehidden');
        $('.performance .rightWrap ul li.canbehidden').removeClass(
          'hidden');
      });
    $('.performance .rightWrap .show-hide-panel.hide').live('click',
      function() {
        $('.performance .rightWrap .show-hide-panel').removeClass('hide');
        $('.performance .rightWrap .show-hide-panel').addClass('show');
        $('.performance .rightWrap ul li.canbehidden').addClass('hidden');
        $('.performance .rightWrap ul li.hidden').removeClass(
          'canbehidden');
      });

    // : отзывы
    $('.comment_usForm').submit(function(event) {
      errState = 0;
      event.preventDefault();
      // проверка имени
      if ($('.COMMENTS').val().length === 0) {
        $('.COMMENTS').addClass('error');
        errState = 1;
      }
      // проверка имени
      if ($('.FULLNAME').val().length === 0) {
        $('.FULLNAME').addClass('error');
        errState = 1;
      }
      // проверка почты
      let patternEMail =
        /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
      if (!patternEMail.test($('.CONTACTEMAIL').val())) {
        $('.CONTACTEMAIL').addClass('error');
        errState = 1;
      }

      if (errState === 1) {
        // mih
        /*
        $("body,html").animate({
          scrollTop: 620
        }, 500);
        */
        event.preventDefault();
        return false;
      } else {
        let formData = $('.comment_usForm').serializeArray();
        $.ajax({
          type: 'POST',
          data: {
            action: 'comment_us',
            formData: formData,
          },
          url: '/ajax.php',
          success: function(data) {
            if (data === 'ok') {
              showSuccess(
                'Ваш отзыв принят.<br/> В течение некоторого времени<br/>'
                + 'он появится на странице.',
                'Спасибо');
            }
          },
        });
        return true;
      }
    });
  }
  //* ************* ****************** *****************//
});

$('.pageHalls').ready(function() {
  $(document).on({
    'mouseenter mouseover': function() {
      $('.efrHall .label').html('ряд <div id="label_row">' + $(this).attr(
        'row') + '</div>, место <div id="label_seat">' + $(this).attr(
        'seat') + '</div>');
    },
    'mouseleave': function() {
      $('.efrHall .label').html('');
    },
  }, '.efrHall .element.seat');
  $(document).on({
    'mouseenter mouseover': function() {
      $('.efrHall .label').text('сцена');
    },
    'mouseleave': function() {
      $('.efrHall .label').text('');
    },
  }, '.efrHall .element.stage');
  $(document).on({
    'mouseenter mouseover': function() {
      $('.efrHall .label').html('ряд <div id="label_row">' + $(this).text() +
        '</div>');
    },
    'mouseleave': function() {
      $('.efrHall .label').html('');
    },
  }, '.efrHall .element.rowNumber');
  $(document).on({
    'mouseenter mouseover': function() {
      $('.efrHall .label').text($(
        '.efrHall .choose .element.rowLabel').text());
    },
    'mouseleave': function() {
      $('.efrHall .label').text('');
    },
  }, '.efrHall .element.rowLabel');

  $('.efrHall .choose .element').click(function() {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });
  $('.efrHall .plan .row .element').click(function() {
    if ($('.efrHall .choose .element.stage').hasClass('active')) {
      $(this).removeClass().addClass('element stage').empty();
    } else if ($('.efrHall .choose .element.blank').hasClass('active')) {
      $(this).removeClass().addClass('element blank').empty();
    } else if ($('.efrHall .choose .element.seat').hasClass('active')) {
      let seatNumber = $('.efrHall .choose .element.seat.active').attr(
        'seat');
      let rowNumber = $('.efrHall .choose .element.seat.active').attr(
        'row');
      $(this).removeClass().addClass('element seat');
      if ($('.efrHall .choose .element.seat.active').hasClass('typeA')) {
        $(this).addClass('typeA');
      } else if ($('.efrHall .choose .element.seat.active').hasClass(
          'typeB')) {
        $(this).addClass('typeB');
      }
      $(this).text(seatNumber).attr({
        seat: seatNumber,
      }).attr({
        row: rowNumber,
      });
    } else if ($('.efrHall .choose .element.rowLabel').hasClass(
        'active')) {
      let rowLabel = $('.efrHall .choose .element.rowLabel.active').text();
      $(this).removeClass().addClass('element rowLabel').text(rowLabel)
        .attr({
          rowLabel: rowLabel,
        });
    } else if ($('.efrHall .choose .element.rowNumber').hasClass(
        'active')) {
      let rowNumber = $('.efrHall .choose .element.rowNumber.active').text();
      $(this).removeClass().addClass('element rowNumber').text(
        rowNumber).attr({
        row: rowNumber,
      });
    }
  });
});

// VTIX
// При заказе билета в ячейку с датой спектакля дописать метку
/*
$('#vtixy-widget-container').ready(function() {
  $('.vtixy-event-leaf .mark-to-day[data-date="07.11.2017"]').html('на сцене театрального центра <a href="http://nastrastnom.ru/play/lodochnik/" target="_blank">"На Страстном"</a>');
  $('.vtixy-event-leaf .mark-to-day[data-date="08.11.2017"]').html('на сцене театрального центра <a href="http://nastrastnom.ru/play/lodochnik/" target="_blank">"На Страстном"</a>');
  $('.vtixy-event-leaf .mark-to-day[data-date="09.11.2017"]').html('на сцене театрального центра <a href="http://nastrastnom.ru/play/zemlya-elzy/" target="_blank">"На Страстном"</a>');
});
*/
