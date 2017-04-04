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
}

export default MapController;