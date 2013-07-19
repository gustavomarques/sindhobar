// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

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



