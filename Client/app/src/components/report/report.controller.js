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

        // this.$window.navigator.geolocation.getCurrentPosition(
        //  function (position) {
        //      //console.log(position);
        //      this.newReport.lat = position.coords.latitude;
        //      this.newReport.long = position.coords.longitude;
        //     },
        // function (err) {
        //     deferred.reject(err);
        //     });

        this.posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
            .getCurrentPosition(this.posOptions)
            .then(function (position) {
            this.newReport.lat = position.coords.latitude
            this.newReport.long = position.coords.longitude
            }, function(err) {
            // error
            });
        
        console.log(this.newReport);

        this.$ionicLoading.show();
        return this.ReportService.createReport(this.newReport)
        .then(res => {
            console.log(res);
        }).then(() => this.$ionicLoading.hide());

        //console.log(this.ReportService.getBirds());
    }

}

export default ReportController;