angular.module('bird.controllers', [])

.controller('HomeController', function($scope, $cordovaCamera, Image){

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