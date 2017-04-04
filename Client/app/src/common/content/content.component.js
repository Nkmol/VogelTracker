import templateUrl from './content.html'

const MenuComponent = {
    template: templateUrl,
    controller: class MenuComponent {
        constructor($localStorage) {
            'ngInject';
            this.token = $localStorage.token;
            this.markers = {
                london: {
                lat: 51.50,
                lng: -0.082,
                icon: {
                    iconSize: [80, 80],
                    iconAnchor: [40, 80],
                    popupAnchor: [0, 0],
                    shadowSize: [0, 0],
                    shadowAnchor: [0, 0]
                }
                },
                paris: {
                    message: `
                        <h1> Title of the balloon </h1>
                        <span>Sub title</span>
                        <a href="/#/register" ui-sref="register"> To register </a>
                        <img src="https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg" />
                    `,
                    lat: 48.83,
                    lng: 2.37,
                    icon: {
                        iconSize: [80, 80],
                        iconAnchor: [40, 60],
                        popupAnchor: [0, 0],
                        shadowSize: [0, 0],
                        shadowAnchor: [0, 0]
                    }
                }
            }
        }

        $onInit() {

        }
    }
};

export default MenuComponent;