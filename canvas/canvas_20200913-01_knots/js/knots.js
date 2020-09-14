/* 
pulled from:
paulbourke.net/geometry/knots
*/

/* 
knot type 4
*/

export const getType4Coordinates = (beta) => {
  // 0 < beta < pi
  const r = 0.8 + 1.6 * Math.sin(6 * beta);
  const theta = 2 * beta;
  const phi = 0.6 * Math.PI * Math.sin(12 * beta);

  return Object({
    x: r * Math.cos(phi) * Math.cos(theta),
    y: r * Math.cos(phi) * Math.sin(theta),
    z: r * Math.sin(phi),
  });
};

/* 
knot type 5
*/
export const getType5Coordinates = (beta) => {
  // 0 < beta < pi
  const r = 1.2 * 0.6 * Math.sin(0.5 * Math.PI + 6 * beta);
  const theta = 4 * beta;
  const phi = 0.2 * Math.PI * Math.sin(6 * beta);

  return Object({
    x: r * Math.cos(phi) * Math.cos(theta),
    y: r * Math.cos(phi) * Math.sin(theta),
    z: r * Math.sin(phi),
  });
};

/* 
knot type trefoil
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
