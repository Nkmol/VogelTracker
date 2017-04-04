class MapController {
    constructor(MapService, $ionicPopup, $localStorage, $state) {
        'ngInject';
        this.MapService = MapService;
        this.$ionicPopup = $ionicPopup;
        this.$localStorage = $localStorage;
        this.$state = $state;
    }

    $onInit() {
       
    }

    $onChanges(changes) {

    }

    getMarkers() {
        return this.MapService.getMarkers()
            .then(console.log);
    }
}

export default MapController;