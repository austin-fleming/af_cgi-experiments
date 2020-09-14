export class Target {
  constructor(config) {
    this._x = config.target.x;
    this._y = config.target.y;
    this._radius = config.target.radius;
  }

  render(CTX) {
    CTX.beginPath();
    CTX.moveTo(this._x, this._y);
    CTX.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
    CTX.closePath();
    CTX.stroke();
  }
}
