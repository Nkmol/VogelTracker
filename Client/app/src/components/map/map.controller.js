class MapController {
    constructor(MapService, $ionicPopup, $localStorage, $state) {
        'ngInject';
        this.MapService = MapService;
        this.$ionicPopup = $ionicPopup;
        this.$localStorage = $localStorage;
        this.$state = $state;
    }

    $onInit() {
        this.markers = {}
        this.MapService.getReports()
            .then(res => {
                res.data.forEach(report => {
                    this.markers[report._id] = {
                        lat: report.lat,
                        lng: report.long,
                        message: `
                            <h3>${report.bird_id.name}</h3>
                            <b>Submitted by: ${report.user_id.username}</b> 
                            <p>${report.description}</p>
                            <hr />
                            <span> ${new Date(report.date).toDateString()}
                        `
                    }
                })
            });
    }

    $onChanges(changes) {

    }
}

export default MapController;