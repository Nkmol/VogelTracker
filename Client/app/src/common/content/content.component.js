import templateUrl from './content.html'

const MenuComponent = {
    template: templateUrl,
    controller: class MenuComponent {
        constructor($localStorage) {
            'ngInject';
        }

        $onInit() {

        }
    }
};

export default MenuComponent;