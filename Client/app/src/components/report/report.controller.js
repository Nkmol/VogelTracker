class ReportController {


    constructor(ReportService, $ionicLoading, $state, $cordovaFileTransfer, $ionicPlatform, $stateParams,$cordovaGeolocation){
    'ngInject';
        this.ReportService = ReportService;
        this.$ionicLoading = $ionicLoading;
        this.$ionicPlatform = $ionicPlatform;
        this.$stateParams = $stateParams;
        this.$cordovaGeolocation = $cordovaGeolocation;
        this.birds = [];
        this.selectedvalue = null;
        this.selectables2 = null;

        ReportService.getBirds()
            .then(res => {
                res.data.forEach(bird => {
                    this.birds.push({
                        name: bird.name,
                        id: bird._id
                    })
                 })
            });

       this.$ionicPlatform.ready(() => {
              this.$cordovaFileTransfer = $cordovaFileTransfer;
       });         
    }

    $onInit() {
        this.getDatetime = new Date();
        this.reportPhoto = "data:image/jpeg;base64," + this.$stateParams.img;

        this.newReport = {
            bird_id: '58d4e0e6d41c6761f4564163',
            user_id: '58e27bc39cd9c4000493b05c',
            date: this.getDatetime,
            description: '',
            lat: 4.4,
            long: 4.3,
            image: ''
        }
    }

    showBird(newValue, oldValue){
        let found = this.birds.find(x => x.name == newValue);
        this.selectedvalue = newValue;
        this.newReport.bird_id = found.id;
    }

    $onChanges(changes) {

    }


    upload(){
         this.$ionicPlatform.ready(() =>{
            var uploadOptions = {
            params : { 'upload_preset': 'd0tmj15t'}
            };

           return this.$cordovaFileTransfer.upload("https://api.cloudinary.com/v1_1/dady313cq/image/upload", "data:image/jpeg;base64," + this.$stateParams.img, uploadOptions).then( result => {
                //console.log("SUCCESS: " + JSON.stringify(result.response));
                console.log(result.response);
                this.newReport.image = result.response.url;
            }, err => {
                console.log("ERROR: " + JSON.stringify(err));
            }, progress => {
                // constant progress updates
            });

         });

        
    }

    sendReport() {
        console.log("loading begint");
        this.$ionicLoading.show();
        var self = this;
        self.posOptions = {timeout: 10000, enableHighAccuracy: false};
        self.$cordovaGeolocation
            .getCurrentPosition(self.posOptions)
            .then( position => {
                console.log("initialiseer coordinaten");
                this.newReport.lat = position.coords.latitude;
                this.newReport.long = position.coords.longitude;
                console.log("start upload");
                var promise = this.upload();
                promise.then( () => {
                        console.log("maak rapport");
                        return this.ReportService.createReport(self.newReport)
                        .then(res => {
                                console.log(res);
                            }).then(() => this.$ionicLoading.hide());
                    });
                })

        }

}

export default ReportController;