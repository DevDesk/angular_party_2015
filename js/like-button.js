angular.module('buttons',[])
.directive('likeButton', function(){
    // Runs during compile
    return {
        //<like-button>
        restrict: 'E',
        scope:{ // @ =
            likes:'=?startingValue' //starting-value
        },
        controller:['$scope',function($scope){
            if(!$scope.likes) $scope.likes=0;
            $scope.like = function(){
                $scope.likes += 1;
            }
            
        }],
        replace: true,
        template:'<button ng-click="like()" class="btn btn-success btn-xs"><i class="glyphicon glyphicon-thumbs-up"></i> {{likes}}</button>'

    };
})
.directive('dislikeButton', function(){
    // Runs during compile
    return {
        //<like-button>
        restrict: 'E',
        scope:{ // @ =
            likes:'=?startingValue'
        },
        controller:['$scope',function($scope){
            if(!$scope.likes) $scope.likes=0;
            $scope.like = function(){
                $scope.likes += 1;
            }
            
        }],
        replace: true,
        template:'<button ng-click="like()" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-thumbs-down"></i> {{likes}}</button>'

    };
});