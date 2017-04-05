class ReportController {

    constructor(){
    'ngInject';

        console.log("constructor laad");
    }


    $onInit() {
        console.log("on init laad");
        this.getDatetime = new Date();
        this.reportPhoto = '';

        this.newReport = {
            bird_id: '',
            user_id: '',
            date: '',
            description: '',
            lat: '',
            long: '',

        }
    }

    $onChanges(changes) {

    }

    sendReport() {
        console.log("fuck me");
    }

}