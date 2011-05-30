// hoverTip, Version 2.1
// Copyright (c) April 12, 2010 adardesign.com
// hoverTip is freely distributable under the terms of an MIT-style license
// This means you are free to use the code, but please leave this copyright notice intact
// everything inside the "defaults" is configurable.
// Code passes jsLint.com Code Quality Tool!!! (with some common jQuery errors!).
//Cleaned up alot.......
//changing to delegate.....
//http://jsfiddle.net/adardesign/8uUMH/
(function ($) {
   $.fn.infoTip = function (options) {
        var defaults = {
            defualtClassName:"hoverTipCont",
            hasTooltip: false,
            createToolTip: function (data, relClass, e) {
	        var data = data+="<div class='linkHelper'></div>";
                options.hasTooltip = true;
                if (!$("." + options.defualtClassName).length) {
                    return $("<div>").addClass(options.defualtClassName + " " + relClass).appendTo("body").html(function(){
					options.postiotionTip(e);
					return data;
					}).mouseleave(function (evt) {
                        if ($(evt.relatedTarget).hasClass("hoverInfo")) {
                            return false;
                        }
                        options.fadeOut();
                    });
                }
                return $("." + options.defualtClassName).removeAttr("class").addClass(options.defualtClassName + " " + relClass).empty().html(function(){
					options.postiotionTip(e);
					return data;
					})
            },
            postiotionTip: function (e) {
                var currenTip = $("." + options.defualtClassName),
                    currenTipWidth = currenTip.outerWidth(),
                    currenTipHeight = currenTip.outerHeight(),
                    scrollPos = {
                        left: $(window).scrollLeft(),
                        top: $(window).scrollTop()
                    },
                    viewportDimentions = {
                        x: $(window).width(),
                        y: $(window).height()
                    },
                    tipX = e.pageX,
                    tipY = e.pageY,
                    arrowHeight = 10;
                tipX = (tipX - scrollPos.left + currenTipWidth) >= viewportDimentions.x ? (function () {
                    currenTip.addClass("tipRight");
                    return tipX - (currenTipWidth - 20);
                }()) : (function () {
                    currenTip.removeClass("tipRight");
                    return tipX - 26;
                }());
                tipY = (tipY - scrollPos.top + currenTipHeight) >= viewportDimentions.y ? (function () {
                    currenTip.addClass("tipTop");
                    return tipY - (currenTipHeight + arrowHeight);
                }()) : (function () {
                    currenTip.removeClass("tipTop");
                    return tipY + 10;
                }());
                currenTip.css({
                    top: tipY,
                    left: tipX
                }).fadeTo(300, 1);
            },
            stopAll: function () {
                $("." + options.defualtClassName).stop(true, true);
            },
            fadeOut: function () {
                $("." + options.defualtClassName).fadeTo(300, 0, function () {
                    options.hasTooltip = false;
                    $("." + options.defualtClassName).css("display", "none");
                });
            }
        };
        var options = $.extend(defaults, options);
			// changed to $(this).selector
			$(document).delegate($(this).selector,"mouseover mouseout", function(e){
            if(e.type === "mouseover"){ 
                if (!options.hasTooltip) {
					var thisEl = $(this);
					// see if we already have data, if not add data;
					thisElTitle = thisEl.data("elTitle") || (function(){ var localTitle =  thisEl.attr("title"); thisEl.data("elTitle",localTitle); thisEl.removeAttr("title"); return localTitle})();	
				
                    // stop all animation's, create and position
                    options.stopAll();
					options.createToolTip(thisElTitle, thisEl.attr("rel"), e);
					}
				}
            else if(e.type === "mouseout"){
                if (!$(e.relatedTarget).closest("." + options.defualtClassName).length) {
                    options.stopAll();
                    options.fadeOut();
                };
		};
       return this;
    });
};
}(jQuery));