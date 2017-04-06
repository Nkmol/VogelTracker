import TemplateUrl from'./picture.html';

const PictureComponent = {
    bindings: {

    },
    controller: class PictureController {
        constructor($cordovaCamera, $ionicPlatform, $state, $rootScope) {
            'ngInject'
            
            this.$rootScope = $rootScope;
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
                    if(!this.$state.includes('report'))
                        this.$state.go('app.report') 
                            .then(() => this.$rootScope.$broadcast('photo-taken', {img : img}))
                    else 
                        this.$rootScope.$broadcast('photo-taken', {img : img});
                });
        }
    },
    template: TemplateUrl
}

export default PictureComponent;
