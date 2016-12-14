/**
 * Created by student on 14.12.16.
 */
(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .directive('backButton', backButtonDirective);

    function backButtonDirective($location)
    {
        function linkFn(scope, elem, attrs)
        {
            function goBack()
            {
                $location.path('#/');
                scope.$apply();
            }

            elem.bind('click', goBack);
        }

        return {
            restrict: 'A', link: linkFn
        };

    }

})();
