/*
* jquery.peek.js - A jQuery plugin to peek into content and expand it 
* (c) 2015 Erik Montes
* MIT license
*/

;(function ($, window, document, undefined) {

	$.fn.peek = (function (options) {

		var defaults = {
        	peekHeight: 100,
        	collapseButtonHTML: 'v',
        	expandButtonHTML: '^',
        };

        var settings = $.extend({}, defaults, options);

		return this.each(function () {

			var $this = $(this);

			var trueHeight = $this.outerHeight(); 
			var trueWidth = $this.innerWidth();
			var marginLeft = $this.css('margin-left');
			var marginRight = $this.css('margin-right');
			var peekHeight = settings.peekHeight;

			$this.css({'position': 'relative', 'overflow': 'hidden'})
				 .height(peekHeight)
				 .data('peek-state', 'enabled');

			var $peekWrapper = $('<div class="peek" />')
									.width(trueWidth)
									.css({'clear': 'both',
									      'margin-left': marginLeft,
									      'margin-right': marginRight});

			var $blurLayer = $('<div class="peek-blur peek-blur-gradient" />')
							  	.css({'bottom': 0,
									  'height': '50px',
									  'position': 'absolute',
									  'width': '100%'});

			var $btnWrapper = $('<div class="peek-btn-wrapper" />')
								.css({'text-align': 'center'});

			var $triggerButton = $('<button class="peek-btn">' + settings.collapseButtonHTML + '</button>')
									.on('click', function () {

										if ($this.data('peek-state') === 'enabled') {
											$this.animate({height: trueHeight + 50}).data('peek-state', 'disabled');
											$(this).html(settings.expandButtonHTML);
											$blurLayer.removeClass('peek-blur-gradient');
										} else {
											$this.animate({height: peekHeight}).data('peek-state', 'enabled');
											$(this).html(settings.collapseButtonHTML);
											$blurLayer.addClass('peek-blur-gradient');
										}
									});

			$btnWrapper.append($triggerButton);
			$peekWrapper.append($btnWrapper);
			$this.append($blurLayer);
			$this.after($peekWrapper);
		});

	});
})(jQuery, window, document);