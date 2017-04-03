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
            // this.tiles = {
            //         name: 'Mapbox Outdoors',
            //         url: 'https://api.mapbox.com/datasets/v1/nkmol/{datasetId}/features?access_token={apiKey}',
            //         type: 'xyz',
            //         options: {
            //             apiKey: 'sk.eyJ1Ijoibmttb2wiLCJhIjoiY2oxMmxvMm16MDAzajJxbXRoaGt0cmNreiJ9.UTgLBJJXZR9LL5ygA1lNoA',
            //             datasetId: 'cj125mcvm005y2wpgss87yw96'
            //         }
            //     }
        }

        $onInit() {
            this.defaults = {
                scrollWheelZoom: false
            }
        }
    }
};

export default MenuComponent;