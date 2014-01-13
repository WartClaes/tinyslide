(function ($) {
	$.fn.ultra = function(options) {

		var settings = $.extend({
    			slides : 8,
    			nextClass : 'ultra-next',
    			prevClass : 'ultra-prev',
    			rowClass : 'ultra-row',
    			arrowsEnabled : true,
        	}, options),
			$this = this,
			$parent = $this.parent(),
			$slides = $('li', $this),
			rows = buildSlider();

		function buildSlider(){
	
			var rows = 0;
	
			if($('.' + settings.rowClass).length){
				$('.' + settings.rowClass).children().unwrap();
			}
			
			for(var i = 0; i < $slides.length; i += settings.slides) {
  				$slides.slice(i, i + settings.slides).wrapAll("<div class='" + settings.rowClass +"'></div>");
  				rows++;
			}
	
			return rows;
        }

        function setSize(){
        	var rowWidth = $parent.width(),
				$row = $('.' + settings.rowClass);

			$row.width(rowWidth);
			$this.width(rowWidth * $row.length);
        }

        function addClasses(){
        	$parent.addClass('ultra-wrapper');
        	$this.addClass('ultra-slider');
        	$slides.addClass('ultra-slide');
        }

        function addArrows(){
        	$parent
        		.append('<a class="ultra-arrow ' + settings.prevClass + '" href="#">Prev</a>')
        		.append('<a class="ultra-arrow ' + settings.nextClass + '" href="#">Next</a>');

			
			var $arrows = $('.ultra-arrow'),
				$prev = $('.ultra-arrow.' + settings.prevClass),
				$next = $('.ultra-arrow.' + settings.nextClass);

			$this.attr('data-open', '1');
			$prev.hide();

			$arrows.bind('click', function(event){
				event.preventDefault();
				var $clickedArrow = $(this),
					current = parseInt($this.attr('data-open')),
					next = current + 1,
					previous = current - 1;
	
				$arrows.show();

				if($clickedArrow.hasClass(settings.prevClass) && current > 1) {
	
					$this.animate({
						marginLeft: "-" + ((previous * 100) - 100) + "%"
					});
	
					if(previous == 1) {
						$prev.hide();
					}
	
					$this.attr('data-open', previous);
	
				} else if($clickedArrow.hasClass(settings.nextClass) && current < rows) {
					$this.animate({
						marginLeft: "-" + (current * 100) + "%"
					});
	
					if(next == rows) {
						$next.hide();
					}
	
					$this.attr('data-open', next);
				}
			});
        }

        setSize();
        addClasses();

		if(settings.arrowsEnabled) {
			addArrows();
		}

		return this;
	};
}(jQuery));
/*
var tiny = {
	portfolio : function(filter){
		var rows = tiny.setSlider(filter),
			$slider = $('#slider');

		$slider.attr('data-open', '1');

		if(typeof filter === 'undefined') {
			tiny.log('set arrows');
			$slider.parent().append('<a class="arrow left" href="#">Left</a>').append('<a class="arrow right" href="#">Right</a>');

			$('.arrow.left').hide();

			$('.arrow').bind('click', function(event){
				event.preventDefault();
				var $this = $(this),
					current = parseInt($('#slider').attr('data-open')),
					next = current + 1,
					previous = current - 1;
	
				tiny.log('current: ' + current);
				tiny.log('next: ' + next);
				tiny.log('previous: ' + previous);
	
				$('.arrow').show();
	
				if($this.hasClass('left') && current > 1) {
					tiny.log('left');
	
					$slider.animate({
						marginLeft: "-" + ((previous * 100) - 100) + "%"
					});
	
					if(previous == 1) {
						tiny.log('hide left');
						$('.arrow.left').hide();
					}
	
					$slider.attr('data-open', previous);
	
				} else if($this.hasClass('right') && current < rows) {
					tiny.log('right');
					$slider.animate({
						marginLeft: "-" + (current * 100) + "%"
					});
	
					if(next == rows) {
						tiny.log('hide right');
						$('.arrow.right').hide();
					}
	
					$slider.attr('data-open', next);
				}
			});
		} else {
			$('.arrow.left').hide();

			$slider.css('margin-left', 0);
		}

		var rowWidth = $('#slider-wrapper').width(),
			$row = $('.row');

		$row.width(rowWidth);
		$slider.width(rowWidth * $row.length);

		$('#slider .grid-2 a').bind('click', function(event){
			event.preventDefault();

			var $this = $(this);
			$("#slider-wrapper").hide();
			$("#content-wrapper").load($this.attr('href'), function(){
				$('.close').on('click', function(event){
					event.preventDefault();
					$("#slider-wrapper").show();
					$("#content-wrapper").hide();
				});
			}).show();
		});
	},
	setSlider : function(filter){

		if(filter == "*" || typeof filter === 'undefined') {
			filter = "none";
		}

		var $slider = $('#slider'),
			$allSlides = $('.grid-2[data-filter]'),
			$slides = filter !== 'none' ? $('.grid-2[data-filter=' + filter + ']', $slider) : $('.grid-2[data-filter]', $slider);
			rows = 0;

		$allSlides.hide();
		$slides.show();

		if($('.row').length){
			$('.row').children().unwrap();
		}
		
		for(var i = 0; i<$slides.length; i += this.settings.slides) {
  			$slides.slice(i, i + this.settings.slides).wrapAll("<div class='row'></div>");
  			rows++;
		}

		return rows;
	}
}

$(function(){
	tiny.init({
		slides: 15
	});
});
*/