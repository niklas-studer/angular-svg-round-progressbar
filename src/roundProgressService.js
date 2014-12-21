angular.module('angular-svg-round-progress').service('roundProgressService', [function(){
    var service = {};

    // credits to http://modernizr.com/ for the feature test
    service.isSupported = !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect);

    // utility function
    var polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    // credit to http://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
    service.updateState = function(value, total, R, ring, size, isSemicircle) {

        if(!size) return ring;

        var value       = value >= total ? total - 0.00001 : value,
            type        = isSemicircle ? 180 : 359.9999,
            perc        = total === 0 ? 0 : (value / total) * type,
            x           = size/2,
            start       = polarToCartesian(x, x, R, perc), // in this case x and y are the same
            end         = polarToCartesian(x, x, R, 0),
            // arcSweep = endAngle - startAngle <= 180 ? "0" : "1",
            arcSweep    = (perc <= 180 ? "0" : "1"),
            d = [
                "M", start.x, start.y,
                "A", R, R, 0, arcSweep, 0, end.x, end.y
            ].join(" ");

        return ring.attr('d', d);
    };

    // Easing functions by kirupa.
    // Source: http://www.kirupa.com/forum/showthread.php?378287-Robert-Penner-s-Easing-Equations-in-Pure-JS-(no-jQuery)
    // License: http://pastebin.com/1Jw1Tbhj

    service.animations = {
        linearEase: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * currentIteration / totalIterations + startValue;
        },

        easeInQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * (currentIteration /= totalIterations) * currentIteration + startValue;
        },

        easeOutQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
            return -changeInValue * (currentIteration /= totalIterations) * (currentIteration - 2) + startValue;
        },

        easeInOutQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
            if ((currentIteration /= totalIterations / 2) < 1) {
                return changeInValue / 2 * currentIteration * currentIteration + startValue;
            }
            return -changeInValue / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
        },

        easeInCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue;
        },

        easeOutCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
        },

        easeInOutCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
            if ((currentIteration /= totalIterations / 2) < 1) {
                return changeInValue / 2 * Math.pow(currentIteration, 3) + startValue;
            }
            return changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
        },

        easeInQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * Math.pow (currentIteration / totalIterations, 4) + startValue;
        },

        easeOutQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
            return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue;
        },

        easeInOutQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
            if ((currentIteration /= totalIterations / 2) < 1) {
                return changeInValue / 2 * Math.pow(currentIteration, 4) + startValue;
            }
            return -changeInValue / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
        },

        easeInQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * Math.pow (currentIteration / totalIterations, 5) + startValue;
        },

        easeOutQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 5) + 1) + startValue;
        },

        easeInOutQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
            if ((currentIteration /= totalIterations / 2) < 1) {
                return changeInValue / 2 * Math.pow(currentIteration, 5) + startValue;
            }
            return changeInValue / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
        },

        easeInSine: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * (1 - Math.cos(currentIteration / totalIterations * (Math.PI / 2))) + startValue;
        },

        easeOutSine: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * Math.sin(currentIteration / totalIterations * (Math.PI / 2)) + startValue;
        },

        easeInOutSine: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue;
        },

        easeInExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * Math.pow(2, 10 * (currentIteration / totalIterations - 1)) + startValue;
        },

        easeOutExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
        },

        easeInOutExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
            if ((currentIteration /= totalIterations / 2) < 1) {
                return changeInValue / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
            }
            return changeInValue / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
        },

        easeInCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * (1 - Math.sqrt(1 - (currentIteration /= totalIterations) * currentIteration)) + startValue;
        },

        easeOutCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * Math.sqrt(1 - (currentIteration = currentIteration / totalIterations - 1) * currentIteration) + startValue;
        },

        easeInOutCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
            if ((currentIteration /= totalIterations / 2) < 1) {
                return changeInValue / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
            }
            return changeInValue / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
        }
    };

    return service;    
}]);
