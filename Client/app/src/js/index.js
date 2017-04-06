// Fixing wrong url
//  https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061

import L from '../../../www/lib/leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/images/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/images/marker-icon.png',
  shadowUrl: 'assets/leafletimages/marker-shadow.png',
});