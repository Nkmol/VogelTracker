import PictureComponent from './picture.component';


const home = angular
    .module('picture', [
    ])
    .component('picture', PictureComponent)
    .name;

export default home;
