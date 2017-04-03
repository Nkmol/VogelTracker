import templateUrl from './content.html'

const MenuComponent = {
    template: templateUrl,
    controller: class MenuComponent {
        constructor($localStorage) {
            'ngInject';
            this.token = $localStorage.token;
        }
    }
};

export default MenuComponent;