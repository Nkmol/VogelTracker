class ReportService {
    constructor($http, Config) {
        'ngInject'
        this.$http = $http;
        this.Config = Config;
    }

    createReport(report) {
        return this.$http.post(`${this.Config.url}/reports/`, report);
    }

    getBirds() {
        return this.$http.get(`${this.Config.url}/birds`);
    }

}

export default ReportService;