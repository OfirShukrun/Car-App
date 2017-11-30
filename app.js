var myCarApp = angular.module('myCarApp', ['ngRoute', 'ngAnimate']);

myCarApp.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {

    $locationProvider.html5Mode(true);


    $routeProvider
        .when('/home', {
            templateUrl: '/views/home.html',
        })
        .when('/contact', {
            templateUrl: '/views/contact.html',
        })
        .when('/contact-success', {
            templateUrl: '/views/contact-success.html',
        })
        .when('/directory', {
            templateUrl: '/views/directory.html',
        })
        .otherwise({
            redirectTo: '/home'
        });

}]);

myCarApp.directive('randomCar', [() => {

    return {
        restrict: 'E',
        scope: {
            cars: '=',
            title: '='
        },
        templateUrl: '/views/randomCar.html',
        transclude: true,
        replace: true,
        controller: ($scope) => {
            $scope.random = Math.floor(Math.random() * 4);
        }
    };

}]);

myCarApp.controller('carController', ['$scope', '$http', ($scope, $http) => {

    $scope.removeCar = (car) => {
        var removedCar = $scope.cars.indexOf(car);
        $scope.cars.splice(removedCar, 1);
    };

    $scope.addCar = () => {
        $scope.cars.push({
            name: $scope.newCar.name,
            color: $scope.newCar.color,
            price: parseInt($scope.newCar.price),
            available: true
        });
        name: $scope.newCar.name = "";
        color: $scope.newCar.color = "";
        price: $scope.newCar.price = "";
    };

    $scope.removeAll = () => {
        $scope.cars = [];
    };

    $http.get('/data/cars.json').then((response) => {
        $scope.cars = response.data;
    });

}]);

myCarApp.controller('contactController', ['$scope', '$location', ($scope, $location) => {
    $scope.sendMessage = () => {
        $location.path('/contact-success');
    };

}]);