(function($) {
	$.fn.BTPagination = function(totalRecords, opts) {
		opts = $.fn.extends($.fn.BTPagination.defaults, opts || {});

		return this.each(function() {
			var _this = $(this),
				totalPageNums = getTotalPageNums();

			function getTotalPageNums() {
				return Math.ceil(totalRecords / opts.items_per_page);
			}

			function textPreHandle() {
				var htmlspecialchars = {
					"&": "&amp;",
					"<": "&lt;",
					">": "&gt;",
					'"': "&quot;"
				};
				$.each(htmlspecialchars, function(k, v) {
					opts.prev_text = opt.prev_text.replace(k, v);
					opts.next_text = opt.next_text.replace(k, v);
				});
			}


			function clickedPageNoHindler(event, that) {
				var $activePageNo = that,
					$prev = _this.data('prev'),
					$next = _this.data('next'),
					activePageNoValue = $activePageNo.find('a').text();


				$activePageNo.siblings().not('.previous').not('.next').removeClass('active');

				if (activePageNoValue == 1) {
					$previous.addClass('disabled');
					$next.removeClass('disabled');
				} else if (activePageNoValue == totalPageNums) {
					$next.addClass('disabled');
					$previous.removeClass('disabled');
				} else {
					$previous.removeClass('disabled');
					$next.removeClass('disabled');
				}

				if (!$activePageNo.hasClass("active")) {
					opts.getItemsAjax(activePageNoValue, opts.items_per_page);
				}
				$activePageNo.addClass('active');
			}

			function initPagination() {
				var real_display_num = totalPageNums > opts.num_display_pageno ? opts.num_display_pageno : totalPageNums,
					$prev = $('<li><a href="javascript:void(0)">' + opts.prev_text + '</a></li>').addClass("previous"),
					$next = $('<li><a href="javascript:void(0)">' + opts.next_text + '</a></li>').addClass("next"),
					$pageNoWraper = $('<ul>').append($prev).append($next),
					_i, $pageElem;

				_this.data({
					'pageNoWraper': $pageNoWraper,
					'prev': $prev,
					'next': $next
				});

				for (_i = real_display_num; _i > 0; _i--) {
					$pageElem = $('<li>').append('<a href="javascript:void(0)">' + _i + '</a>')
						.insertAfter($prev)
						.bind('click', function(event) {
						clickedPageNoHindler(event, $(this));
					});
					if (_i == 1) {
						$pageElem.addClass("active");
						$prev.addClass("disabled");
					}
				}

				_this.append($pageNoWraper);
			}

			function bindClickEventOn() {
				var _i,
					len = arguments.length,
					eventHandler = arguments[len - 1];
				for (_i = len - 2; _i >= 0; i++) {
					arguments[_i].bind('click', function(event) {
						eventHandler(event, $(this));
					});
				}
			}

			function clickOnNextOrPrevEventHandler(e, that) {
				var $li = that,
					$previous = _this.data('prev'),
					$next = _this.data('next'),
					$active = $li.siblings().filter(".active"),
					$activePageNo = $active.find('a').text(),
					$activePrevPageNo = $activePageNo - 1,
					$activeNextPageNo = parseInt($activePageNo, 10) + 1;


				if ($li.hasClass("disabled")) {
					return false;
				} else if ($li.hasClass("previous")) {
					$active.removeClass('active');
					if ($active.prevAll().size() > 1) {
						$active.prev().trigger('click');
					} else {
						if ($activePrevPageNo > 0) {
							$active.nextAll().not('.next').filter(":last").remove();
							var t = $('<li>').append('<a href="javascript:void(0)">' + $activePrevPageNo + '</a>').unbind('click')
								.bind('click', function(e) {
								clickedPageNoHindler(e, $(this));
							});
							t.insertAfter($previous);
							t.trigger('click');
							if ($activePrevPageNo == 1) {
								$previous.addClass('disabled');
							}
						}
					}
					$next.removeClass('disabled');
				} else if ($li.hasClass("next")) {
					$active.removeClass('active');
					if ($active.nextAll().size() > 1) {
						$active.next().trigger('click');
					} else {
						if ($activeNextPageNo <= pageNum) {
							$active.prevAll().not('.previous').filter(':last').remove();
							var t = $('<li>').append('<a href="javascript:void(0)">' + $activeNextPageNo + '</a>').unbind('click')
								.bind('click', function(e) {
								clickedPageNoHindler(e, $(this));
							});
							t.insertBefore($next);
							t.trigger('click');
							if ($activeNextPageNo == pageNum) {
								$next.addClass('disabled');
							}
						}
					}
					$previous.removeClass('disabled');
				}
			}

			initPagination();
			bindClickEventOn(_this.data('prev'), _this.data('next'), clickOnNextOrPrevEventHandler);

		});


	};

	$.fn.BTPagination.defaults = {
		items_per_page: 10,
		num_display_pageno: 10,
		prev_text: 'Prev',
		next_text: 'Next',
		getItemsAjax: function() {
			return false;
		}
	};
})(jQuery);