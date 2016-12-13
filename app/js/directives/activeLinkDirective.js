/**
 * Created by sunday on 12/4/16.
 */
(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .directive('activeLink', activeLinkDirective);

    function activeLinkDirective($location)
    {
        function linkFn(scope, elem, attrs)
        {
            var activeClass = attrs.activeLink;
            var path = elem.find('a').attr('href');
            path = path.substring(1);
            scope.location = $location;
            scope.$watch('location.path()', function (newPath)
            {
                if (path === newPath) {
                    elem.addClass(activeClass);
                } else {
                    elem.removeClass(activeClass);
                }
            });
        }

        return {
            restrict: 'A', link: linkFn
        };


    }

})();
