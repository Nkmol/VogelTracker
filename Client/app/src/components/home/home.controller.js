class HomeController {
    constructor($cordovaCamera, $state, $ionicPlatform) {
        'ngInject';
        this.$state = $state;
        this.$cordovaCamera = $cordovaCamera;

        $ionicPlatform.ready(function(){
            console.log("Totaal niet defined");
            //console.log(Camera);
        })
    }

    $onInit() {
        var options = {
                quality: 100,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 400,
                targetHeight: 400,
                saveToPhotoAlbum: true,
                correctOrientation:true
            };
    }

    $onChanges(changes) {

    }

    takePicture(){
        $cordovaCamera.getPicture(options).then(function(imageData) {
            //$scope.lastPhoto = "data:image/jpeg;base64," + imageData;
            //Image.setImage("data:image/jpeg;base64," + imageData)
            //$state.go('create');
            console.log(imageData)
          }, function(err) {
            // error
          });
    }
}

export default HomeController;