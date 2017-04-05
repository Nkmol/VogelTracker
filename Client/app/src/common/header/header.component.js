import TemplateUrl from './header.html'

const HeaderComponent = {
    controller: class HeaderController {
        constructor($state) {
            'ngInject'
            this.$state = $state;
        }

        go(state) {
            this.$state.go(state);
        }
    },
    template: TemplateUrl 
};

export default HeaderComponent;