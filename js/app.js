var myApp = angular.module('TacoApp',['image-toggle','buttons','weather']);

myApp.run(function(){
    console.log('App started.')
});

myApp.controller('TacoBuilder',['$scope',function($scope){
    $scope.name="Steak Taco";
    $scope.toppings=['steak','cheese','salsa','beans'];
    console.log('controller loaded.');

    $scope.addTopping = function(){
        $scope.toppings.push($scope.newTopping);
        $scope.newTopping="";
    }

    $scope.removeTopping = function(idx){
        $scope.toppings.splice(idx,1);
    }
}]);

myApp.controller('OtherThing',['$scope',function($scope){
    console.log('loaded other thing');
    $scope.myClass="btn-warning";
    $scope.small=true;
    $scope.primary=true;
    $scope.happy=false;
    $scope.myImage="something.jpg"
    $scope.myStartingLikes=77;
    $scope.weatherCities = [];

    $scope.changeClass = function(){
        $scope.small = !$scope.small;
        $scope.primary = !$scope.primary;
    }
}]);