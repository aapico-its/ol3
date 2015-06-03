goog.provide('ol.source.MapRAID');

goog.require('ol.Attribution');
goog.require('ol.TileUrlFunction');
goog.require('ol.source.TileImage');



/**
 * @classdesc
 * Layer source for tile data from MapRAID cache dir.
 *
 * @constructor
 * @extends {ol.source.TileImage}
 * @param {Object} options MapRAID options.
 * @api stable
 */
ol.source.MapRAID = function(options) {
  var projection = goog.isDef(options.projection) ?
      options.projection : 'EPSG:3857';

  goog.base(this, {
    attributions: options.attributions,
    crossOrigin: options.crossOrigin,
    logo: options.logo,
    projection: projection,
    tileGrid: options.tileGrid,
    tileLoadFunction: options.tileLoadFunction,
    tilePixelRatio: options.tilePixelRatio,
    tileUrlFunction: this.tileUrlFunction
  });

  /**
   * @type {string}
   */
  this.url = options.url;

  /**
   * @type {string}
   */
  this.layer = options.layer;

  /**
   * @type {string}
   */
  this.gridset = options.gridset;

  /**
   * @type {string|undefined}
   */
  this.extension = goog.isDef(options.extension) ?
      options.extension : 'png';

  /**
   * @private
   * @type {ol.TileCoordTransformType}
   */
  this.tileCoordTransform_ = this.tileGrid.createTileCoordTransform({
    wrapX: options.wrapX
  });

  this.setTileUrlFunction(goog.bind(this.tileUrlFunction, this));
};
goog.inherits(ol.source.MapRAID, ol.source.TileImage);


/**
 * @param {ol.TileCoord} tileCoord Tile Coordinate.
 * @param {number} pixelRatio Pixel ratio.
 * @param {ol.proj.Projection} projection Projection.
 * @return {string|undefined} Tile URL.
 */
ol.source.MapRAID.prototype.tileUrlFunction =
    function(tileCoord, pixelRatio, projection) {
  var z = tileCoord[0];
  var x = tileCoord[1] + 1;
  var y = -tileCoord[2];

  return this.url + '/' + this.layer + '/level' +
      z + '/' + z + x + '_' + y + '.' + this.extension;
};


/**
 * @inheritDoc
 * @api
 */
ol.source.MapRAID.prototype.setTileUrlFunction = function(tileUrlFunction) {
  goog.base(this, 'setTileUrlFunction',
      ol.TileUrlFunction.withTileCoordTransform(
          this.tileCoordTransform_, tileUrlFunction));
};
