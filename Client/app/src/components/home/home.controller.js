class HomeController {

    constructor($cordovaCamera, $ionicPlatform) {
        'ngInject';
        this.$ionicPlatform = $ionicPlatform;
        this.$cordovaCamera = $cordovaCamera;
    }


  $onInit(){
    let self = this;
        $ionicPlatform.ready(function(){
            self.options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: 1,
            saveToPhotoAlbum: true
            }; 
        });
  }


  takePicture(){
       let self = this;
        this.$cordovaCamera.getPicture(options).then(function(imageData) {
            this.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
  }
}

export default HomeController;