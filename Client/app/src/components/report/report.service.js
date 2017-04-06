class ReportService {
    constructor($http, Config) {
        'ngInject'
        this.$http = $http;
        this.Config = Config;
    }

    createReport(report) {

        console.log(report);

        return this.$http.post(`${this.Config.url}/reports/`, report)
            .then(res => {
                console.log(res);
            });
    }

    getBirds() {
        return this.$http.get(`${this.Config.url}/birds`);
    }
}

export default ReportService;