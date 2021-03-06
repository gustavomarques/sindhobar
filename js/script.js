/* Author: Gustavo Marques*/



// ------------------------------------------------------------------
// Isotope
// ------------------------------------------------------------------

$.Isotope.prototype._getCenteredMasonryColumns = function () {
	this.width = this.element.width();

	var parentWidth = this.element.parent().width();

	// i.e. options.masonry && options.masonry.columnWidth
	var colW = this.options.masonry && this.options.masonry.columnWidth ||
	// or use the size of the first item
	this.$filteredAtoms.outerWidth(true) ||
	// if there's no items, use size of container
	parentWidth;

	var cols = Math.floor(parentWidth / colW);
	cols = Math.max(cols, 1);

	// i.e. this.masonry.cols = ....
	this.masonry.cols = cols;
	// i.e. this.masonry.columnWidth = ...
	this.masonry.columnWidth = colW;
};

$.Isotope.prototype._masonryReset = function () {
	// layout-specific props
	this.masonry = {};
	// FIXME shouldn't have to call this again
	this._getCenteredMasonryColumns();
	var i = this.masonry.cols;
	this.masonry.colYs = [];
	while (i--) {
		this.masonry.colYs.push(0);
	}
};

$.Isotope.prototype._masonryResizeChanged = function () {
	var prevColCount = this.masonry.cols;
	// get updated colCount
	this._getCenteredMasonryColumns();
	return (this.masonry.cols !== prevColCount);
};

$.Isotope.prototype._masonryGetContainerSize = function () {
	var unusedCols = 0,
		i = this.masonry.cols;
	// count unused columns
	while (--i) {
		if (this.masonry.colYs[i] !== 0) {
			break;
		}
		unusedCols++;
	}

	return {
		height: Math.max.apply(Math, this.masonry.colYs),
		// fit container to columns that have been used;
		width: (this.masonry.cols - unusedCols) * this.masonry.columnWidth
	};
};


$(function () {

	var $container = $('#promocaoList');

	$container.isotope({
		itemSelector: '.promocao',
		layoutMode : 'masonry',
		masonry: {
			columnWidth: 400
		}
	});

});


// ------------------------------------------------------------------
// Destaque
// ------------------------------------------------------------------


$(document).ready(function() {
	
	//slider dos destaques da home

	$("#destaque-img").after("<nav id='destaque-nav'>").cycle({
		fx: "fade",
		speed: 500,
		timeout: 5000,
		pager: "#destaque-nav",
		pagerAnchorBuilder: thumbDestaque
	});

	function thumbDestaque(idx, slide) {
		var imgThumb = $(slide).attr("data-urlThumb");
		return "<a href='#'><span></span><img src='" + imgThumb + "' width='200' height='130'/></a>";
	}
	
	//slider das páginas internas

	$("#slider-img").after("<nav id='slider-nav'>").cycle({
		fx: "fade",
		speed: 500,
		timeout: 5000,
		pager: "#slider-nav",
		pagerAnchorBuilder: thumbDestaque
	});

	function thumbDestaque(idx, slide) {
		var imgThumb = $(slide).attr("data-urlThumb");
		return "<a href='#'><span></span><img src='" + imgThumb + "' width='200' height='130'/></a>";
	}
	
	$(".tabs").tabs();
	
	$(".results").click(function(){
		$("#resultadoEnquete").modal();
	});
	
	$(".newsletterAssinar").click(function(){
		$("#obrigadoNewsletter").modal();
	});
	
	$(".promocaoEnviar").click(function(){
		$("#promocaoVoucher").modal();
	});
	
	$(".escolhaVantagens, .promocaoForm").hide();
	
	$(".escolhaOpcoes").click(function(){
		$(".escolhaVantagens").slideToggle();
	});
	
	$(".promocaoBtn").click(function(){
		$(".promocaoForm").slideToggle();
	});


// Mobile Jquery
var w = $(window).width();

	if(w <= 480) {	
		$("#navPrincipal .mobile").click(function(){
			$("#navPrincipal a").toggleClass("active");
		});
		$(".footerNav li a").hide();
		$(".footerNav li").click(function(){
			$(this).find("a").slideToggle("slow");
		});
	}

	
});