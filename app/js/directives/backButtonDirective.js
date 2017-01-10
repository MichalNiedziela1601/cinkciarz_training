(function ()
{
    'use strict';

    function backButtonDirective($location)
    {
        function BackController($scope)
        {
            $scope.backToMain = function ()
            {
                $location.path('/main');
            };
        }

        return {
            restrict: 'A', controller: BackController
        };

    }

    angular.module('cinkciarzTraining')
            .directive('backButton', backButtonDirective);

})();
