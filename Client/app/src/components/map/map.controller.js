class MapController {
    constructor(MapService, $ionicPopup, $localStorage, $state, $ionicLoading) {
        'ngInject';
        this.MapService = MapService;
        this.$ionicPopup = $ionicPopup;
        this.$localStorage = $localStorage;
        this.$state = $state;
        this.$ionicLoading = $ionicLoading;
    }

    $onInit() {
        this.markers = {}

        // this.$ionicLoading.show();
        this.MapService.getReports()
            .then(res => {
                res.data.forEach(report => {
                    this.markers[report._id] = {
                        lat: report.lat,
                        lng: report.long,
                        message: `
                            <h3>${report.bird_id && report.bird_id.name}</h3>
                            <b>Submitted by: ${report.user_id && report.user_id.username}</b> 
                            <p>${report.description}</p>
                            <hr />
                            <span> ${new Date(report.date).toDateString()}
                        `
                    }
                })
            })
            .then(() => this.$ionicLoading.hide())

        this.layers = {
            baselayers: {
                osm: {
                    name: 'OpenStreetMap',
                    url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibmttb2wiLCJhIjoiY2oxMmwxMW5kMDAyaDJxb2dweDNrYXJwMCJ9.rlrE9klEaYBICaYrk7roMg',
                    type: 'xyz'
                }
            }
        }
    }

    $onChanges(changes) {

    }
}

export default MapController;