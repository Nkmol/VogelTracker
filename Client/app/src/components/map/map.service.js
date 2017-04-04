class MapService {
    constructor($http, Config) {
        'ngInject'
        this.$http = $http;
        this.Config = Config;
    }

    getMarkers() {
        console.log(`${this.Config.url}/reports`);
        return this.$http.get(`${this.Config.url}/reports`);
    }
}

export default MapService;