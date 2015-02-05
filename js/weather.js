angular.module('weather',[])
.directive('weather',function(){
    return {
        restrict: 'E',
        scope:{
            location:'@?'
        },
        controller: ['$scope','$http',function($scope,$http){
            //$scope.location = 'Chicago, IL';

            var getWeather = function(location){
                var req={
                    url:'http://api.openweathermap.org/data/2.5/weather',
                    params:{
                        units:'imperial'
                    }
                };

                if(Array.isArray(location)){
                    req.params.lat = location[0];
                    req.params.lon = location[1];
                }else{
                    req.params.q=location;
                }
                

                $http(req).success(function(data){
                    $scope.wDescription = data.weather[0].description;
                    $scope.wTemp = data.main.temp;
                    $scope.wPlace = data.name;
                });
            }

            if($scope.location){
                $scope.$watch('location',function(){
                    $scope.wTemp=false;
                    if(!$scope.location) return;
                    getWeather($scope.location)
                });
            }else{
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(function(position){

                        getWeather([position.coords.latitude,position.coords.longitude]);
                        console.log('WHAT IS THE POSITION?!?!??? ',position)
                    });
                }else{
                    //do something for people without GPS
                }
            }
            
        }],
        replace: true,
        template: '<div class="well"><span ng-hide="wTemp">Loading..</span><span ng-show="wTemp">It is {{wTemp}}&deg;F {{wDescription}} in {{wPlace}}.</span></div>'
    }
})