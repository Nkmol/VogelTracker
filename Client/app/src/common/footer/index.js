import FooterComponent from './footer.component';

const footer = angular
  .module('footer', [])
  .component('footerBar', FooterComponent) // Seems that naming it 'footer' bug scrolling
  .name;

export default footer;