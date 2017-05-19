 class OverViewController
 {

    constructor(OverviewService, $rootScope) {
        'ngInject';
        this.OverviewService = OverviewService;
        this.$rootScope = $rootScope;
        this.list = [];
        this.populateList();
    }

    populateList () {
        this.OverviewService.getReports().then(res => {
                console.log(res.data);
                res.data.forEach(report => 
                    this.list.push({
                        description: report.description,
                        date: report.date,
                        image: report.image[0]
                    })
                 )
        });
        
        console.log(this.list.length);
        this.$rootScope.$broadcast('scroll.infiniteScrollComplete');    
    }

    moreDataCanBeLoaded () {
        return (this.list.length > 49) ? false : true;
    }  

    $onChanges(changes) {
        this.loadMore();
    }

 }
 
export default OverViewController;