/* 
pulled from:
paulbourke.net/geometry/knots
*/

/**
 * Returns a 3D point along a Type 4 Knot
 * @param {Number} beta defines point along knot. 0 < beta < PI
 * @returns {object} containing coordinates of point along knot {x: Number, y: Number, z: Number}
 */
export const getType4Coordinates = (beta) => {
  const r = 0.8 + 1.6 * Math.sin(6 * beta);
  const theta = 2 * beta;
  const phi = 0.6 * Math.PI * Math.sin(12 * beta);

  return Object({
    x: r * Math.cos(phi) * Math.cos(theta),
    y: r * Math.cos(phi) * Math.sin(theta),
    z: r * Math.sin(phi),
  });
};

/**
 * Returns a 3D point along a Type 5 Knot
 * @param {Number} beta defines point along knot. 0 < beta < PI
 * @returns {object} containing coordinates of point along knot {x: Number, y: Number, z: Number}
 */
export const getType5Coordinates = (beta) => {
  const r = 1.2 * 0.6 * Math.sin(0.5 * Math.PI + 6 * beta);
  const theta = 4 * beta;
  const phi = 0.2 * Math.PI * Math.sin(6 * beta);

  return Object({
    x: r * Math.cos(phi) * Math.cos(theta),
    y: r * Math.cos(phi) * Math.sin(theta),
    z: r * Math.sin(phi),
  });
};

/**
 * Returns a 3D point along a Trefoil Knot
 * @param {Number} u defines point along knot. 0 < u < PI*2
 * @returns {object} containing coordinates of point along knot {x: Number, y: Number, z: Number}
 */
export const getTrefoilCoordinates = (u) => {
  // 0 < u < 2pi
  const x =
    41 * Math.cos(u) -
    18 * Math.sin(u) -
    83 * Math.cos(2 * u) -
    83 * Math.sin(2 * u) -
    11 * Math.cos(3 * u) +
    27 * Math.sin(3 * u);
  const y =
    36 * Math.cos(u) +
    27 * Math.sin(u) -
    113 * Math.cos(2 * u) +
    30 * Math.sin(2 * u) +
    11 * Math.cos(3 * u) -
    27 * Math.sin(3 * u);
  const z =
    45 * Math.sin(u) -
    30 * Math.cos(2 * u) +
    113 * Math.sin(2 * u) -
    11 * Math.cos(3 * u) +
    27 * Math.sin(3 * u);

  return Object({
    x: x,
    y: y,
    z: z,
  });
};

/**
 * Returns an Isometric point from a Cartesian point
 * @param {Object} cartPoint - defines a cartesian point in space
 * @param {Number} cartPoint.x - x position of point
 * @param {Number} cartPoint.y - y position of point
 * @param {Number} [cartPoint.z = 0] - z position of point
 * @returns {Object} {x: Number, y: Number, z: Number} of isometric point, with z either being default 0 or the same as cartPoint.z
 */
export const convertCartToIso = (cartPoint) => {
  const isoX = cartPoint.x - cartPoint.y;
  const isoY = (cartPoint.x + cartPoint.y) / 2;

  return Object({
    x: isoX,
    y: isoY,
    z: typeof cartPoint.z != undefined ? cartPoint.z : 0,
  });
};

export const convertIsoToCart = (isoPoint) => {
  const cartX = (2 * isoPoint.y + isoPoint.x) / 2;
  const cartY = (2 * isoPoint.y - isoPoint.x) / 2;
  const cartZ = isoPoint.z - isoPoint.y;

  return Object({
    x: cartX,
    y: cartY,
    z: cartZ,
  });
};

//! add typdef documentation for point later
/**
 * Returns a 2D point along a circle.
 * @param {Number} h x-coordinate of origin
 * @param {Number} k y-coordinatte of origin
 * @param {Number} r radius 0 <= r <= 360
 * @param {Number} t angle of point to be returned.
 * @returns {{x: Number, y: Number}} an Object containing
 */
export const getCircleCoordinates = (h, k, r, t) => {
  const x = h + r * Math.cos(t);
  const y = k + r * Math.sin(t);

  return Object({
    x: x,
    y: y,
  });
};
