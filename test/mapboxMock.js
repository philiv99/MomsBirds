// Minimal mapbox-gl stub so modules that import it (e.g. mapmanager.js) load
// under Jest without requiring WebGL/workers.
class Map {
  on() {}
  off() {}
  remove() {}
  flyTo() {}
  fitBounds() {}
  addControl() {}
}

module.exports = {
  __esModule: true,
  default: { accessToken: '', Map, Marker: class {}, LngLatBounds: class {} },
  accessToken: '',
  Map,
  Marker: class {},
  LngLatBounds: class {}
};
