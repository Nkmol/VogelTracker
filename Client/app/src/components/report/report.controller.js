class ReportController {

    constructor(ReportService, $ionicLoading, $state, $window, $ionicPlatform, $cordovaGeolocation){
    'ngInject';
        this.ReportService = ReportService;
        this.$ionicLoading = $ionicLoading;
        this.$window = $window;

        console.log("platform ready");
        this.$cordovaGeolocation = $cordovaGeolocation;

        console.log("constructor laad");
        //console.log($window);
    }


    $onInit() {
        console.log("on init laad");
        this.getDatetime = new Date();
        this.reportPhoto = '';

        console.log("initialiseer newReport");
        this.newReport = {
            bird_id: '58e281512471d642c9778c6e',
            user_id: '58e27bc39cd9c4000493b05c',
            date: this.getDatetime,
            description: '',
            lat: 4.4,
            long: 4.3,
        }
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
                console.log(self.newReport.lat);
                console.log(self.newReport.long);

                this.$ionicLoading.show();
                return this.ReportService.createReport(self.newReport)
                .then(res => {
                        console.log(res);
                    }).then(() => this.$ionicLoading.hide());
            });

    }

}

export default ReportController;