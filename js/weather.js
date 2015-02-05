angular.module('weather',[])
.directive('weather',function(){
    return {
        restrict: 'E',
        scope:{
            location:'@?'
        },
        controller: ['$scope','$http',function($scope,$http){
            //$scope.location = 'Chicago, IL';

            /* 
             * function to get the current weather using
             * either the location as a string or lat/lon
             * as an array.
             *
             * string location = "Seattle, WA"
             * array location = [44.11231,33.12131] //lat,lon
             */
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

            //if the location attribute is set...
            if($scope.location){
                //watch $scope.location and look up the weather using it
                $scope.$watch('location',function(){
                    $scope.wTemp=false;
                    if(!$scope.location) return;
                    getWeather($scope.location)
                });
            }else{
                //if there is no location attribute use geolocation
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(function(position){
                        //once we get the location pass it in to getWeather
                        getWeather([position.coords.latitude,position.coords.longitude]);
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