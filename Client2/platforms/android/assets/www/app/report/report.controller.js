
angular.module('bird.controllers', [])

.controller('ReportController', function($scope, Image, $state, $http, $ionicLoading, $timeout){

    console.log(Image.getImage());
    $scope.reportPhoto = Image.getImage();
    $scope.getDatetime = new Date();

    $scope.show = function() {
        $ionicLoading.show({
        template: 'Je melding word afgehandeld...',
        duration: 3000
        }).then(function(){
        console.log("The loading indicator is now displayed");
        });
    };
    $scope.hide = function(){
        $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
        
        });
    };

    $scope.sendReport = function(){
        
        $ionicLoading.show();

        // Make request api 

        // var req = {
        // method: 'POST',
        // url: 'http://example.com',
        // headers: {
        // 'Content-Type': undefined
        // },
        // data: { test: 'test' }
        // }

        // $http(req).then(
        //     function(res){
        //         $ionicLoading.hide();
        //         $state.go('success');
        //     }, 
        //     function(err){
               
        //     });
        
    };

})