$(document).ready(function () {

	/*Header menu*/
	$(".nav li").find("ul:first").hide();
	$(".nav li").hover(function () {
		$(this).find("ul:first").fadeIn();
	}, function () {
		$(this).find("ul:first").hide();
	});

	// Всплывающее окно АКТЕРЫ
	$("body").on("click", ".actors", function () {
		var _id = $(this).attr("data-perfomans-id");
		var _date = $(this).attr("data-date");
		GetActorsByPerfomanceID(_id, _date);
		$(window).scrollTop();
	});

	/* Появление и исчезновение затенения фона */
	$(".shadow").css("height", $(document).height());
	$(".shadow").click(function () {
		$(".shadow, .popup_actors").fadeOut();
		$(".shadow, .popup").fadeOut();
		$(".shadow, .popup_comment").fadeOut();
		$(".shadow, #popup_seatDesc").fadeOut();
	});

});

function GetEventByID(_perfomans) {
	$.ajax({
		url : "/ajax.php",
		dataType : "html",
		type : "POST",
		data : {
			"action" : "get_event_by_id",
			"perfomans" : _perfomans,
		},
		success : function (data) {
			$(".popup").empty().html(data);
			//            var _top = $(window).scrollTop();
			//            $(".popup").css({"top": _top + 100 + "px"});
			$(".shadow, .popup").fadeIn();
			//            console.log(data);
			//            $("body,html").animate({scrollTop: 0}, 500);
		},
		error : function (textStatus) {
			console.log(textStatus);
		}
	});
}

function GetActorsByPerfomanceID(_perfomans, _date) {
	console.log(_date);
	console.log(_perfomans);
	$.ajax({
		url : "/ajax.php",
		dataType : "html",
		type : "POST",
		data : {
			"action" : "get_actors_by_perfomanceid",
			"perfomans" : _perfomans,
			"date" : _date,
		},
		success : function (data) {
			$(".popup_actors").empty().html(data);
			$(".shadow, .popup_actors").fadeIn();
			//console.log(data);
		},
		error : function (textStatus) {
			console.log(textStatus);
		}
	});
}
mih_NEEDTOEXIT = false;

function ajaxCalendar(_date, _perfomans) {

	/* Код постера спектакля для заставки */
	var PosterHtml = "";
	/* Время показа постера */
	var PosterDelay = 1;

	// Постер ведёт на заказ билетов
	//var mihdata = "<div class="calendar_slides"><a href="/tickets/?ID=5964&from=poster"><img src="/upload/medialibrary/images/Poster_UO_24.09.2015.jpg" alt=""></a></div>";

	// Постер ведёт на страницу спектакля
	//var mihdata = "<div class="calendar_slides"><a href="/performance/boris-godunov/?from=poster"><img src="/upload/medialibrary/images/Poster_BG_22-23.12.2015=.jpg" alt=""></a></div>";
	//var mihdata = "<div class="calendar_slides"><a href="/performance/serdtse-ne-kamen/?from=poster"><img src="/upload/medialibrary/images/Poster_SNK_31.12.2015.jpg" alt=""></a></div>";
	//mihdata = "<div class="calendar_slides"><a href="/performance/komediya_oshibok/?from=poster"><img src="/upload/medialibrary/images/Poster_KO_31.12.2015.jpg" alt=""></a></div>";
	//var mihdata = "<div class="calendar_slides"><a href="/performance/yubileynyy-vecher-s-teatrom/?from=poster"><img src="/upload/medialibrary/images/Poster_07.12.2015.2.jpg" alt=""></a></div>";
	//var mihdata = "<div class="calendar_slides"><a href="/performance/yubileynyy-vecher-s-teatrom/?from=poster"><img src="/upload/medialibrary/images/Poster_07.12.2015.jpg" alt=""></a></div>";
	//var mihdata = "<div class="calendar_slides"><a href="/performance/vse-o-zhenshchinakh/?from=poster"><img src="/upload/medialibrary/images/Poster_VOJ_31.10.2015_.jpg" alt=""></a></div>";
	console.log($(".posterLeft").attr("poster-href"));
	console.log($(".posterLeft").attr("poster-img"));
	var PosterImg = $.trim($(".posterLeft").attr("poster-img"));
	var PosterHref = $.trim($(".posterLeft").attr("poster-href"));
	if (PosterImg != "") {
		PosterHtml = "<div class=" calendar_slides ">";
		if (PosterHref != "") {
			PosterHtml += "<a href=" "+PosterHref+" ">";
		}
		PosterHtml += "<img src=" "+PosterImg+" ">";
		if (PosterHref != "") {
			PosterHtml += "</a>";
		}
		PosterDelay = 4000;
	}
	$(".posterLeft").empty().html(PosterHtml);
	//

	$(".buyTicket").attr("href", "http://www.ticketland.ru/teatry/teatr-et-cetera-p-r-aleksandra-kalyagina/");
	//$(".buyTicket").attr("href", "/tickets/?ID=6039");


	$(".day_num").on("click", function (e) {
		mih_NEEDTOEXIT = true;
		return;
	});
	if (mih_NEEDTOEXIT)
		return;
	setTimeout(function () {
		//-mih


		if (mih_NEEDTOEXIT)
			return;
		$(".posterLeft img").fadeToggle("slow");

		setTimeout(function () {

			if (mih_NEEDTOEXIT)
				return;

			$.ajax({
				url : "/ajax.php",
				dataType : "html",
				type : "POST",
				data : {
					"action" : "get_news_for_day",
					"date" : _date,
					"perfomans" : _perfomans,
				},
				success : function (data) {
					$(".posterLeft").empty().html(data);
					var $frame = $(".calendar_slides");
					var $wrap = $frame.parent();
					// Call Sly on frame
					$frame.sly({
						horizontal : 1,
						itemNav : "basic",
						smart : 1,
						activateMiddle : 1,
						mouseDragging : 0,
						touchDragging : 1,
						releaseSwing : 1,
						scrollSource : null,
						startAt : 0,
						scrollBy : 0,
						speed : 300,
						elasticBounds : 1,
						easing : "easeOutExpo",
						dragHandle : 1,
						dynamicHandle : 1,
						clickBar : 1,
						cycleBy : "items", // Enable automatic cycling by "items" or "pages".
						cycleInterval : 5000, // Delay between cycles in milliseconds.
						pauseOnHover : 0, // Pause cycling when mouse hovers over the FRAME.
						pagesBar : $wrap.find(".pages"), // Selector or DOM element for pages bar container.
						activatePageOn : "click", // Event used to activate page. Can be: click, mouseenter, ...
						// Buttons
						prevPage : $wrap.find(".prev"),
						nextPage : $wrap.find(".next")
					});
					//
					//console.log($("div").find("[data-date="" + _date + ""]").val());
					//$("div").find("[data-date="" + _date + ""]").click();
					//$(".has_action").click();
					//
					var buyTicket_PerfomaneID = _perfomans.substring(0, _perfomans.indexOf(","));
					$(".buyTicket").attr("href", "/tickets/?ID=" + buyTicket_PerfomaneID);

				},
				error : function (textStatus) {
					console.log(textStatus);
				}
			});

		}, 600);

		//mih
	}, PosterDelay); // Время показа постера
	//-mih

}

function ajaxCalendarFirst(_date, _perfomans) {
	if (typeof _perfomans === "undefined") {
		_perfomans = 6317;
	}
	$.ajax({
		url : "/ajax.php",
		dataType : "html",
		type : "POST",
		data : {
			"action" : "get_news_for_day",
			"date" : _date,
			"perfomans" : _perfomans
		},
		success : function (data) {
			$(".posterLeft").empty().html(data);
			$(".slidee").prepend(mih_current_slidee);
			$(".prev").addClass("disabled");
			$(".next").addClass("disabled");
			var $frame = $(".calendar_slides");
			var $wrap = $frame.parent();
			// Call Sly on frame
			$frame.sly({
				horizontal : 1,
				itemNav : "basic",
				smart : 1,
				activateMiddle : 1,
				mouseDragging : 0,
				touchDragging : 1,
				releaseSwing : 1,
				scrollSource : null,
				startAt : 0,
				scrollBy : 0,
				speed : 300, //100
				elasticBounds : 1,
				easing : "easeOutExpo",
				dragHandle : 1,
				dynamicHandle : 1,
				clickBar : 1,
				cycleBy : "items", // Enable automatic cycling by "items" or "pages".
				cycleInterval : 200, //300 5000, // Delay between cycles in milliseconds.
				pauseOnHover : 0, // Pause cycling when mouse hovers over the FRAME.
				pagesBar : $wrap.find(".pages"), // Selector or DOM element for pages bar container.
				activatePageOn : "click" // Event used to activate page. Can be: click, mouseenter, ...
				// Buttons
				//prevPage: $wrap.find(".prev"),
				//nextPage: $wrap.find(".next")
			});

			setTimeout(function () {
				$(".posterLeft").empty().html(data);
				var $frame = $(".calendar_slides");
				var $wrap = $frame.parent();
				// Call Sly on frame
				$frame.sly({
					horizontal : 1,
					itemNav : "basic",
					smart : 1,
					activateMiddle : 1,
					mouseDragging : 0,
					touchDragging : 1,
					releaseSwing : 1,
					scrollSource : null,
					startAt : 0,
					scrollBy : 0,
					speed : 300,
					elasticBounds : 1,
					easing : "easeOutExpo",
					dragHandle : 1,
					dynamicHandle : 1,
					clickBar : 1,
					cycleBy : "items", // Enable automatic cycling by "items" or "pages".
					cycleInterval : 5000, //5000, // Delay between cycles in milliseconds.
					pauseOnHover : 0, // Pause cycling when mouse hovers over the FRAME.
					pagesBar : $wrap.find(".pages"), // Selector or DOM element for pages bar container.
					activatePageOn : "click", // Event used to activate page. Can be: click, mouseenter, ...
					// Buttons
					prevPage : $wrap.find(".prev"),
					nextPage : $wrap.find(".next")
				});

			}, 400);
			var buyTicket_PerfomaneID = _perfomans.substring(0, _perfomans.indexOf(","));
			$(".buyTicket").attr("href", "/tickets/?ID=" + buyTicket_PerfomaneID);
		},

		error : function (textStatus) {
			console.log(textStatus);
		}
	});

}

// parse a date in yyyy-mm-dd format
function parseDate(input) {
	var parts = input.split(".");
	// new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
	return new Date(parts[2], parts[1] - 1, parts[0]); // Note: months are 0-based
}

function hasActionDayClick() {
	if (has_action_counter == TopDays_hasAction.length - 1) {
		$(TopDays_hasAction[0]).click();
		has_action_counter = -1;
	} else {
		$(TopDays_hasAction[has_action_counter + 1]).click();
		has_action_counter++;
	}
}

function hasActionDayClick_and_setTimeOutForNextClick() {
	console.log()
	hasActionDayClick("has_action_counter " + has_action_counter);
	if (has_action_counter < TopDays_hasAction.length - 1)
		setTimeout(
			if (has_action_counter < 0)
				return; else
				hasActionDayClick_and_setTimeOutForNextClick(has_action_counter + 1, TopDays_hasAction.length - 1); , 5000 * PerfCount);
}

$(document).ready(function () {

	// Глобальная переменная, в которой храниться код текущего слайда
	mih_current_slidee = "";

	// Сколько спектаклей в этот день
	var PerfCount = 1;

	var TopDays_hasAction = [];
	// Получаем текущую дату
	var current_date = $(".days_numbers .today").attr("data-date");

	// Заглушка на летние месяцы.
	//current_date = "01.09.2015";


	var counter_date = 0;
	$(".has_action").each(function (z) {
		if ((new Date(parseDate($(this).attr("data-date"))) >= new Date(parseDate(current_date))) && !$(this).hasClass("hide_this") && (counter_date < 5)) {
			//console.log("date ",$(this).attr("data-date"));
			TopDays_hasAction[counter_date] = this;
			counter_date++;
		}
	});

	var i = 0;
	has_action_counter = 0;

	// Для остановки слайдера 5 спектаклей при нажатии "Актеры"
	$(".actors").live("click", function (e) {
		has_action_counter = -1;
	});

	console.log("TopDays_hasAction.length " + TopDays_hasAction.length);
	if (TopDays_hasAction.length >= 2) {
		setTimeout(function () {
			hasActionDayClick_and_setTimeOutForNextClick();
		}, 6000);
	}

	$("body").on("click", ".has_action", function () {
		if ($(this).hasClass("active")) {
			return false;
		}
		//Получаем текущий активный день
		mih_current_slidee = $(".slidee").html();
		//console.log(".day.active", mih_current_active_day);
		$(".day.active").removeClass("active");
		$(this).addClass("active");
		var _date = $(this).attr("data-date");
		var _perfomans = $(this).attr("data-perfomans-id");
		ajaxCalendarFirst(_date, _perfomans);
		PerfCount = _perfomans.match(/,/g) || []).length;
		console.log("Количество спектаклей " + PerfCount);

		//mih
		//var _soldOut = $(this).attr("data-soldOut");
		//ajaxCalendarFirst_mih(_date, _perfomans, _soldOut)
		//mih
	});
	$.fn.serializeObject = function () {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function () {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || "");
			} else {
				o[this.name] = this.value || "";
			}
		});
		return o;
	};

	//wright us
	$(".write_us_form").submit(function (e) {

		e.preventDefault();

		var form = $(this);
		var obj = form.serializeObject();

		var send = 1;

		var fields = form.find("input, textarea");

		$.each(fields, function (index, val) {
			var val = $(val);
			var value_f = val.val();

			if (val.attr("name") == "name") {
				if (value_f.length < 2 || value_f == "Имя") {
					val.addClass("error");
					send = 0;
				} else {
					val.removeClass("error");
				}
			}
			if (val.attr("name") == "email") {
				if (!isValidEmailAddress(value_f)) {
					val.addClass("error");
					send = 0;
				} else {
					val.removeClass("error");
				}
			}
			if (val.attr("name") == "message") {
				if (value_f.length < 3 || value_f == "Сообщение" || value_f == "Текст письма") {
					val.addClass("error");
					send = 0;
				} else {
					val.removeClass("error");
				}
			}
		});

		if (send === 1) {

			$.ajax({
				dataType : "json",
				url : "/ajax_form.php",
				type : "post",
				data : {
					data : obj
				},
			}).done(function (data) {

				if (data.result === "ok") {
					ShowSuccess("Ваше сообщение удачно отправлено.<br/> В течение некоторого времени<br/> Вам ответят наши менеджеры", "Спасибо");
				}

			});
			return false;
		}
	});

	$("body").on({
		click : function () {
			HideSuccess();
		}
	}, ".wrap_button");

	var mr_input = ".write_us_form input, .write_us_form textarea";
	$(mr_input).focus(function () {
		$(this).removeClass("error");
	});

});

//success message
function ShowSuccess(text, btn_text) {

	var _top = $(document).scrollTop();
	_top = _top + 100;

	var html_popup = '<div class="modal_win" style="top:' + _top + 'px"><p class="text">' + text + '</p><p class="wrap_button"><span>' + btn_text + '</span></p></div>';

	$("body").append(html_popup);
}

function HideSuccess() {
	$(".modal_win").remove();
	$(".write_us_form input, .write_us_form textarea").not("input[type=button],input[type=submit],button,input[name=type]").val("");
}

//email validation
function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}

//скрипты страницы заказа билета
$(document).ready(function () {
	var mih;
	if ($(".ticketForm").length) {

		var NeedToSelect = $("select#sb_spectacles option[isneedtoselect]").attr("isneedtoselect");
		if (NeedToSelect) {

			$("select#sb_spectacles option[isneedtoselect]").attr("selected", "selected");

			$(".ticketForm table select#sb_spectacles").selectbox({
				onOpen : function (inst) {
					$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");
					$("#sbHolder_" + $("#" + inst.id).attr("sb")).removeClass("error");
				},
				onChange : function (val, inst) {
					$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");
					mih = $("option:selected", this).attr("id");

					//
					$.ajax({
						type : "POST",
						data : {
							action : "getSpecShedule",
							select_spectacle : val
						},
						url : "/ajax.php",
						success : function (data) {
							$(".sb_datetime_box").html(data);
							//console.log("sb_datetime_box_");
							$("#sb_datetime").selectbox({
								onOpen : function (inst) {
									$("#sbHolder_" + $("#" + inst.id).attr("sb")).removeClass("error");
									$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");
								},
								onChange : function (val, inst) {
									$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");
								},
								effect : "slide"
							});
							$(".sb_datetime_box .sbOptions").find("li:eq(0)").css({
								"display" : "none"
							});
						}
					});
					//console.log("sb_datetime_box-");


					$.ajax({
						type : "POST",
						data : {
							action : "getSpecPrice",
							VarMih : mih
						},
						url : "/ajax.php",
						success : function (data) {
							$(".sb_prices_box").html(data);
							//console.log("sb_prices_box_-", mih);
							$("#sb_prices").selectbox({
								onOpen : function (inst) {
									$("#sbHolder_" + $("#" + inst.id).attr("sb")).removeClass("error");
									$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");
								},
								onChange : function (val, inst) {
									$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");
								},
								effect : "slide"
							});
							$(".sb_prices_box .sbOptions").find("li:eq(0)").css({
								"display" : "none"
							});
						}
					});
					//

				},
				effect : "slide"
			});

			mih = $("select#sb_spectacles option:selected").attr("id");
			//console.log("mih", mih);

			$.ajax({
				type : "POST",
				data : {
					action : "getSpecShedule",
					select_spectacle : NeedToSelect
				},
				url : "/ajax.php",
				success : function (data) {
					$(".sb_datetime_box").html(data);
					//console.log("sb_datetime_box_");
					$("#sb_datetime").selectbox({
						onOpen : function (inst) {
							$("#sbHolder_" + $("#" + inst.id).attr("sb")).removeClass("error");
							$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");
						},
						onChange : function (val, inst) {
							$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");
						},
						effect : "slide"
					});
					$(".sb_datetime_box .sbOptions").find("li:eq(0)").css({
						"display" : "none"
					});
				}
			});
			//console.log("sb_datetime_box");


			$.ajax({
				type : "POST",
				data : {
					action : "getSpecPrice",
					VarMih : mih
				},
				url : "/ajax.php",
				success : function (data) {
					$(".sb_prices_box").html(data);
					//console.log("sb_prices_box_", mih);
					$("#sb_prices").selectbox({
						onOpen : function (inst) {
							$("#sbHolder_" + $("#" + inst.id).attr("sb")).removeClass("error");
							$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");
						},
						onChange : function (val, inst) {
							$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");
						},
						effect : "slide"
					});
					$(".sb_prices_box .sbOptions").find("li:eq(0)").css({
						"display" : "none"
					});
				}
			});
			//console.log("sb_prices_box", mih);

			$(".sb_spectacles_box .sbOptions").find("li:eq(0)").css({
				"display" : "none"
			});
		} else {

			$(".ticketForm table select").selectbox({
				onOpen : function (inst) {
					$("#sbHolder_" + $("#" + inst.id).attr("sb")).removeClass("error");
					$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");
				},
				onChange : function (val, inst) {
					$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");

					if (inst.id === "sb_spectacles") {

						$(".sb_spectacles_box .sbOptions").find("li:eq(0)").css({
							"display" : "none"
						});

						mih = $("option:selected", this).attr("id");

						//
						$.ajax({
							type : "POST",
							data : {
								action : "getSpecShedule",
								select_spectacle : val
							},
							url : "/ajax.php",
							success : function (data) {
								$(".sb_datetime_box").html(data);
								//console.log("sb_datetime_box_");
								$("#sb_datetime").selectbox({
									onOpen : function (inst) {
										$("#sbHolder_" + $("#" + inst.id).attr("sb")).removeClass("error"); //
										$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");
									},
									onChange : function (val, inst) {
										$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");
									},
									effect : "slide"
								});
								$(".sb_datetime_box .sbOptions").find("li:eq(0)").css({
									"display" : "none"
								});
							}
						});
						//console.log("sb_datetime_box-");


						$.ajax({
							type : "POST",
							data : {
								action : "getSpecPrice",
								VarMih : mih
							},
							url : "/ajax.php",
							success : function (data) {
								$(".sb_prices_box").html(data);
								//console.log("sb_prices_box_-", mih);
								$("#sb_prices").selectbox({
									onOpen : function (inst) {
										$("#sbHolder_" + $("#" + inst.id).attr("sb")).removeClass("error"); //
										$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");
									},
									onChange : function (val, inst) {
										$("option:selected", this).attr("selected", true).siblings().removeAttr("selected");
									},
									effect : "slide"
								});
								$(".sb_prices_box .sbOptions").find("li:eq(0)").css({
									"display" : "none"
								});
							}
						});
						//
					}
				},
				effect : "slide"
			});

			$(".sb_spectacles_box .sbOptions").find("li:eq(0)").css({
				"display" : "none"
			});
		}

		$(".ticketForm table select").selectbox({
			effect : "slide"
		});

		var i = 1;
		$(".orderTickets .birthday .sbHolder").each(function () {
			$(this).addClass("cl" + i);
			i++;
		});
		$(".orderTickets table p input").styler();

		$(".orderTickets input").focus(function () {
			$(this).removeClass("error");
		});

		$(".ticketForm").submit(function (event) {
			errState = 0;
			event.preventDefault();
			// проверка выбранности спектакля
			if (parseInt($("#sb_spectacles").val()) === 0) {
				$("#sbHolder_" + $("#sb_spectacles").attr("sb")).addClass("error");
				errState = 1;
			}
			// проверка выбранности даты и времени
			if (parseInt($("#sb_datetime").val()) === 0) {
				$("#sbHolder_" + $("#sb_datetime").attr("sb")).addClass("error");
				errState = 1;
			}
			// проверка выбранности цены билета
			if (parseInt($("#sb_prices").val()) === 0) {
				$("#sbHolder_" + $("#sb_prices").attr("sb")).addClass("error");
				errState = 1;
			}
			// проверка количетсва билетов
			var patternNumber = /^\d+$/;
			if (!patternNumber.test($(".numberOfTickets").val()) || $(".numberOfTickets").val() == 0 || $(".numberOfTickets").val() > 500) {
				$(".numberOfTickets").addClass("error");
				errState = 1;
			}
			// проверка имени
			if ($(".fullName").val().length === 0) {
				$(".fullName").addClass("error");
				errState = 1;
			}
			// проверка телефона
			var patternPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
			if (!patternPhone.test($(".contactPhone").val())) {
				$(".contactPhone").addClass("error");
				errState = 1;
			}
			// проверка почты
			var patternEMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
			if (!patternEMail.test($(".contactEMail").val())) {
				$(".contactEMail").addClass("error");
				errState = 1;
			}

			if (errState === 1) {
				//mih
				$("body,html").animate({
					scrollTop : 620
				}, 500);
				//$(".sbHolder error").animate({scrollTop: 0}, 500);
				//
				event.preventDefault();
				return false;
			}
			var formData = $(".ticketForm").serializeArray();
			formData[0]["value"] = $("#sb_spectacles option:selected").attr("id");
			//formData[0]["value"] = $("#sb_spectacles option:selected").val();
			formData[1]["value"] = $("#sb_datetime option:selected").text();
			//formData[1]["value"] = formData;
			//formData["ID_SPEC"] = $("#sb_datetime").val();
			//formData["ID_SPEC"] = $("#sb_spectacles option:selected").val();
			$.ajax({
				type : "POST",
				data : {
					action : "sendTicket",
					formData : formData
				},
				url : "/ajax.php",
				success : function (data) {
					if (data === "ok") {
						ShowSuccess("Ваша заявка принята.<br/> В течение некоторого времени<br/> Вам ответят наши менеджеры<audio src=" / upload / medialibrary / Ring.mp3 " autoplay></audio>", "Спасибо");
					}
				}
			});
			return true;
		});

	}
});

function createSelectbox(sb_name) {
	$("#" + sb_name).selectbox({
		onOpen : function (inst) {
			$(this).parent().find(".sbOptions li:eq(0)").css({
				"display" : "none"
			});
		},
		onChange : function (val, inst) {
			if (val != 0) { // require a URL
				window.location = val; // redirect
			}
			return false;
		},
		effect : "slide"
	});

	// Несущественное исправление DOM
	$("." + sb_name + "_box li a").each(function () {
		$(this).attr("href", $(this).attr("rel"));
	});

}

$(document).ready(function () {
	if ($(".sb_actors_box").length) {
		createSelectbox("sb_actors");
	}
	if ($(".sb_archive_box").length) {
		createSelectbox("sb_archive");
	}
	if ($(".sb_boss_box").length) {
		createSelectbox("sb_boss");
	}
	if ($(".sb_creators_box").length) {
		createSelectbox("sb_creators");
	}
	if ($(".sb_performance_box").length) {
		createSelectbox("sb_performance");
	}
	if ($(".sb_performance_box_arkhiv-tekushchego-repertuara").length) {
		createSelectbox("sb_performance_arkhiv-tekushchego-repertuara");
	}
	if ($(".sb_performance_box_arkhiv-spektakley").length) {
		createSelectbox("sb_performance_arkhiv-spektakley");
	}
	if ($(".sb_news_box").length) {
		createSelectbox("sb_news");
	}

	if ($("#popup_seatDesc").length) {
		//$(".shadow").css("height", "2000");
	}

	if ($(".creatorsPage").length) {
		var MaxHeight = 0;
		$(".content").css("width", "1190px");

		$(".creatorsColumn").each(function () {
			if (MaxHeight < parseInt($(this).css("height")))
				MaxHeight = parseInt($(this).css("height"));
		});

		$(".creatorsColumn").each(function () {
			$(this).css("height", MaxHeight + "px");
		});
	}

	//************** Страница СПЕКТАКЛИ *****************//
	if ($(".performance").length) {

		// Кнопка Отзывы
		$(".comment-panel").click(function () {
			$(".shadow").fadeIn();
			$(".popup_comment").css("display", "block").animate({
				top : 0,
				opacity : 1
			}, 500);

			$("html, body").animate({
				scrollTop : 300
			}, 500);
			return false;
		});

		// : скрыть-показать фото
		$(".performance .rightWrap .show-hide-panel").addClass("show");
		$(".performance .rightWrap .show-hide-panel.show").live("click", function () {
			$(".performance .rightWrap .show-hide-panel").removeClass("show");
			$(".performance .rightWrap .show-hide-panel").addClass("hide");
			$(".performance .rightWrap ul li.hidden").addClass("canbehidden");
			$(".performance .rightWrap ul li.canbehidden").removeClass("hidden");
		});
		$(".performance .rightWrap .show-hide-panel.hide").live("click", function () {
			$(".performance .rightWrap .show-hide-panel").removeClass("hide");
			$(".performance .rightWrap .show-hide-panel").addClass("show");
			$(".performance .rightWrap ul li.canbehidden").addClass("hidden");
			$(".performance .rightWrap ul li.hidden").removeClass("canbehidden");
		});

		// : отзывы
		$(".comment_usForm").submit(function (event) {
			errState = 0;
			event.preventDefault();
			// проверка имени
			if ($(".COMMENTS").val().length === 0) {
				$(".COMMENTS").addClass("error");
				errState = 1;
			}
			// проверка имени
			if ($(".FULLNAME").val().length === 0) {
				$(".FULLNAME").addClass("error");
				errState = 1;
			}
			// проверка почты
			var patternEMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
			if (!patternEMail.test($(".CONTACTEMAIL").val())) {
				$(".CONTACTEMAIL").addClass("error");
				errState = 1;
			}

			if (errState === 1) {
				//mih
				/*
				$("body,html").animate({
				scrollTop: 620
				}, 500);
				 */
				event.preventDefault();
				return false;
			} else {
				var formData = $(".comment_usForm").serializeArray();
				$.ajax({
					type : "POST",
					data : {
						action : "comment_us",
						formData : formData
					},
					url : "/ajax.php",
					success : function (data) {
						if (data === "ok") {
							ShowSuccess("Ваш отзыв принят.<br/> В течение некоторого времени<br/>он появится на странице.", "Спасибо");
						}
					}
				});
				return true;
			}
		});
	}
	//************** ****************** *****************//

});

$(".pageHalls").ready(function () {
	$(document).on({
		"mouseenter mouseover" : function () {
			$(".efrHall .label").html("ряд <div id=" label_row ">" + $(this).attr("row") + "</div>, место <div id=" label_seat ">" + $(this).attr("seat") + "</div>");
		},
		mouseleave : function () {
			$(".efrHall .label").html("");
		}
	}, ".efrHall .element.seat");
	$(document).on({
		"mouseenter mouseover" : function () {
			$(".efrHall .label").text("сцена");
		},
		mouseleave : function () {
			$(".efrHall .label").text("");
		}
	}, ".efrHall .element.stage");
	$(document).on({
		"mouseenter mouseover" : function () {
			$(".efrHall .label").html("ряд <div id=" label_row ">" + $(this).text() + "</div>");
		},
		mouseleave : function () {
			$(".efrHall .label").html("");
		}
	}, ".efrHall .element.rowNumber");
	$(document).on({
		"mouseenter mouseover" : function () {
			$(".efrHall .label").text($(".efrHall .choose .element.rowLabel").text());
		},
		mouseleave : function () {
			$(".efrHall .label").text("");
		}
	}, ".efrHall .element.rowLabel");

	$(".efrHall .choose .element").click(function () {
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});
	$(".efrHall .plan .row .element").click(function () {
		if ($(".efrHall .choose .element.stage").hasClass("active")) {
			$(this).removeClass().addClass("element stage").empty();
		} else if ($(".efrHall .choose .element.blank").hasClass("active")) {
			$(this).removeClass().addClass("element blank").empty();
		} else if ($(".efrHall .choose .element.seat").hasClass("active")) {
			var seatNumber = $(".efrHall .choose .element.seat.active").attr("seat");
			var rowNumber = $(".efrHall .choose .element.seat.active").attr("row");
			$(this).removeClass().addClass("element seat");
			if ($(".efrHall .choose .element.seat.active").hasClass("typeA")) {
				$(this).addClass("typeA");
			} else if ($(".efrHall .choose .element.seat.active").hasClass("typeB")) {
				$(this).addClass("typeB");
			}
			$(this).text(seatNumber).attr({
				seat : seatNumber
			}).attr({
				row : rowNumber
			});
		} else if ($(".efrHall .choose .element.rowLabel").hasClass("active")) {
			var rowLabel = $(".efrHall .choose .element.rowLabel.active").text();
			$(this).removeClass().addClass("element rowLabel").text(rowLabel).attr({
				rowLabel : rowLabel
			});
		} else if ($(".efrHall .choose .element.rowNumber").hasClass("active")) {
			var rowNumber = $(".efrHall .choose .element.rowNumber.active").text();
			$(this).removeClass().addClass("element rowNumber").text(rowNumber).attr({
				row : rowNumber
			});
		}
	});
});
