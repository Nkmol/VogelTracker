import TemplateUrl from'./picture.html';

const PictureComponent = {
    bindings: {

    },
    controller: class PictureController {
        constructor($cordovaCamera, $ionicPlatform, $state) {
            'ngInject'
            
            this.$cordovaCamera = $cordovaCamera;
            this.$ionicPlatform = $ionicPlatform
            this.$state = $state;
        }

        $onInit() {
            this.$ionicPlatform.ready(() => {
                if(typeof Camera !== 'undefined') {
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
                }
            }, false);
        }

        takePicture() {
            this.$cordovaCamera.getPicture(this.options)
                .then(img => {
                    this.$state.go('app.report', {img: img});
                });
        }
    },
    template: TemplateUrl
}

export default PictureComponent;
