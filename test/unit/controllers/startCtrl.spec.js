describe('StartCtrl', function ()
{
    'use strict';

    var startCtrl;
    var $localStorageMock;
    var $locationMock;
    var $uibModalMock;
    var $sessionStorageMock;
    var CurrenciesServiceMock;

    var $scope;
    var $q;
    var deferred;
    var $httpBackend;

    beforeEach(module('cinkciarzTraining'));

    beforeEach(inject(function($controller, _$rootScope_, _$q_, _$httpBackend_,_$localStorage_,_$location_, _$uibModal_, _$sessionStorage_, CurrenciesService){
        $localStorageMock = _$localStorage_;
        $locationMock = _$location_;
        $uibModalMock = _$uibModal_;
        $sessionStorageMock = _$sessionStorage_;
        CurrenciesServiceMock = CurrenciesService;
        $httpBackend = _$httpBackend_;

        $q = _$q_;
        $scope = _$rootScope_.$new();

        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();

        spyOn(CurrenciesServiceMock, 'getCurrencies').and.returnValue(deferred.promise);
        // spyOn(startCtrl, 'getCurrencies');

        startCtrl = $controller('StartController', {
            $localStorage: $localStorageMock,
            $location: $locationMock,
            $uibModal: $uibModalMock,
            $sessionStorage: $sessionStorageMock,
            CurrenciesService: CurrenciesServiceMock
        });

    }));

    describe('initialization', function ()
    {

        it('should sessionStorage.isRandom set to false', function ()
        {
            expect($sessionStorageMock.isRandom).toBeFalsy();
        });


        it('should call CurrenciesService.getCurrencies function', function ()
        {
            expect(CurrenciesServiceMock.getCurrencies).toHaveBeenCalled();
        });

        /*it('should set $sessionStorage.rates', function ()
        {
            deferred.resolve([
                {
                    code: 'usd',
                    sell: ''
                }
            ]);

            $scope.$apply();

            expect($sessionStorageMock.rates).not.toBe(undefined);
        });*/
    });
});
