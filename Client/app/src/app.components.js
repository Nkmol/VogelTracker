// Define controller
class AppController {
    constructor() {
        'ngInject'
    }
}

// Define template
let AppTemplate = '<section ui-view></section>';

// Define component
const AppComponent = {
    template: AppTemplate,
    controller: AppController
};

export default AppComponent;