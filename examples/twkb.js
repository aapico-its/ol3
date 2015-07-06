goog.require('ol.Feature');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.format.GeoJSON');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');

var raster = new ol.layer.Tile({
  source: new ol.source.OSM()
});

function get(url, callback) {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function (oEvent) {
    callback(oReq.response);
  };

  oReq.send(null);
}

get('data/twkb/test.twkb', function(data) {
  var geojson = twkb.toGeoJSON(new Uint8Array(data));
  var format = new ol.format.GeoJSON();
  var features = format.readFeatures(geojson);
  features[0].getGeometry().transform('EPSG:4326', 'EPSG:3857');

  var vector = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: features
    })
  });

  var map = new ol.Map({
    layers: [raster, vector],
    target: 'map',
    view: new ol.View({
      center: [2952104.019976033, -3277504.823700756],
      zoom: 4
    })
  });
})


