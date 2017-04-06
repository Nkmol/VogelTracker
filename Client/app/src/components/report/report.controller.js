class ReportController {

    constructor(ReportService, $ionicLoading, $state, $window, $ionicPlatform, $cordovaGeolocation){
    'ngInject';
        this.ReportService = ReportService;
        this.$ionicLoading = $ionicLoading;
        this.$window = $window;
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
                })
    }

    $onInit() {
        this.getDatetime = new Date();
        this.reportPhoto = '';

        this.newReport = {
            bird_id: '58d4e0e6d41c6761f4564163',
            user_id: '58e27bc39cd9c4000493b05c',
            date: this.getDatetime,
            description: '',
            lat: 4.4,
            long: 4.3,
        }
    }

    showBird(newValue, oldValue){
        let found = this.birds.find(x => x.name == newValue);
        this.selectedvalue = newValue;
        this.newReport.bird_id = found.id;
    }

    $onChanges(changes) {

    }

    sendReport() {
        var self = this;
        self.posOptions = {timeout: 10000, enableHighAccuracy: false};
        self.$cordovaGeolocation
            .getCurrentPosition(self.posOptions)
            .then( position => {
                this.newReport.lat = position.coords.latitude;
                this.newReport.long = position.coords.longitude;
                
                this.$ionicLoading.show();
                return this.ReportService.createReport(self.newReport)
                .then(res => {
                        console.log(res);
                    }).then(() => this.$ionicLoading.hide());
            });
    }

}

export default ReportController;