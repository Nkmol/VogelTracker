// Define controller
class AppController {
    constructor() {
        'ngInject'
    }
}

// Define template
let AppTemplate = `
    <header></header>
`;

// Define component
const AppComponent = {
    template: AppTemplate,
    controller: AppController
};

export default AppComponent;