angular.module('starter.controllers', [])

.controller('CameraController', function($scope, $cordovaCamera, Image){

    document.addEventListener("deviceready", function () {
    $scope.createReport = false;  
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 400,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true,
	    correctOrientation:true
    };

    $scope.takePicture = function (){
          $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.lastPhoto = "data:image/jpeg;base64," + imageData;
            Image.setImage("data:image/jpeg;base64," + imageData)
            $scope.createReport = true;
          }, function(err) {
            // error
          });
    }
    
    }, false);

})


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


