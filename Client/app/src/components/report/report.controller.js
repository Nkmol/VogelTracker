class ReportController {

    constructor(ReportService, $ionicLoading, $state, $window, $ionicPlatform, $cordovaGeolocation
        , $stateParams, $rootScope, $cordovaFileTransfer) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$stateParams = $stateParams;
        this.ReportService = ReportService;
        this.$ionicLoading = $ionicLoading;
        this.$ionicPlatform = $ionicPlatform;
        this.$stateParams = $stateParams;
        this.$cordovaGeolocation = $cordovaGeolocation;
        this.birds = [];
        this.selectedvalue = null;
        this.selectables2 = null;

        ReportService.getBirds()
            .then(res => 
                res.data.forEach(bird => 
                    this.birds.push({
                        name: bird.name,
                        id: bird._id
                    })
                 )
            );

        this.$cordovaFileTransfer = $cordovaFileTransfer;      
    }

    $onInit() {
        this.getDatetime = new Date();
        this.reportPhoto = "/assets/img/bird-silhouette.png"
        this.$rootScope.$on('photo-taken', this.pictureTaken.bind(this));

        this.newReport = {
            bird_id: '58d4e0e6d41c6761f4564163',
            user_id: '58e27bc39cd9c4000493b05c',
            date: this.getDatetime,
            description: '',
            lat: 4.4,
            long: 4.3,
            image: []
        }
    }


    showBird(newValue, oldValue) {
        let found = this.birds.find(x => x.name == newValue);
        this.selectedvalue = newValue;
        this.newReport.bird_id = found.id;
    }

    $onChanges(changes) {

    }

    upload() {
        let uploadOptions = {
            params : { 'upload_preset': 'd0tmj15t'}
        };

        return this.$cordovaFileTransfer.upload("https://api.cloudinary.com/v1_1/dady313cq/image/upload"
                ,this.reportPhoto, uploadOptions)
            .then( result => {
                this.newReport.image.push(JSON.parse(result.response).url);
            }, err => {
                console.log("ERROR: " + JSON.stringify(err));
            }, progress => {
                // constant progress updates
            });
    }

    sendReport() {
        this.$ionicLoading.show();
        let posOptions = {maximumAge: 0, timeout: 10000, enableHighAccuracy:true};
        console.log('start');
        this.$cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(position => {
                this.newReport.lat = position.coords.latitude;
                this.newReport.long = position.coords.longitude;
            })
            .catch(err => console.log(err))
            .then(() => this.upload())
            .then(() => this.ReportService.createReport(this.newReport))
            .then(res => {
                
            })
            .then(() => this.$ionicLoading.hide());
    }

    pictureTaken(event, args) {
        this.reportPhoto = "data:image/jpeg;base64," + args.img;
    }
}

export default ReportController;