class OverviewService {
    constructor($http, Config) {
        'ngInject'
        this.$http = $http;
        this.Config = Config;
    }

    getReports() {
        return this.$http.get(`${this.Config.url}/reports`);
    }

}

export default OverviewService;