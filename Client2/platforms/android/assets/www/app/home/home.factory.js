angular.module('bird.factories', [])


.factory('Image', function () {
var image = 'testetestetes';
return {
    getImage: function () {
        return image;
    },
    setImage: function (imageParam) {
        image = imageParam;
    }
};})