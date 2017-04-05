import TemplateUrl from'./picture.html';

const PictureComponent = {
    bindings: {

    },
    controller: class PictureController {
        constructor($cordovaCamera, $ionicPlatform) {
            'ngInject'
            
            this.$cordovaCamera = $cordovaCamera;
            $ionicPlatform.ready(() => {
                this.options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 100,
                    targetHeight: 100,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation:true
                }
            }, false);
        }

        takePicture() {
            this.$cordovaCamera.getPicture(this.options)
                .then(img => console.log(img));
        }
    },
    template: TemplateUrl
}

export default PictureComponent;
