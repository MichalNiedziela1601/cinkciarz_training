(function ()
{
    'use strict';

    function backButtonDirective()
    {
        return {
            restrict: 'E',
            template: '<button class="btn btn-info mar-left" ng-click="backToMain()">Powrót</button>',
            replace: true,
            controller: function($location,$scope){
                $scope.backToMain = function ()
                {
                    $location.path('/main');
                };
            }
        };

    }

    angular.module('cinkciarzTraining')
            .directive('backButton', backButtonDirective);

})();
