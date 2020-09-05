/* 
Cartesian:

C2 - C3
|    |
C1 - C4

Isometric:

    I2
  /    \
I1      I3
  \    /
    I4
*/

export class CartRect {
    // pt1 is lower left then moves clockwise
    constructor(originX, originY, width, height, context) {
        this._context = context;
        this.pt1 = {};
        this.pt2 = {};
        this.pt3 = {};
        this.pt4 = {};
        this._generatePoints(originX, originY, width, height);
        this._isCartesian = true;
    }

    _generatePoints(_originX, _originY, _width, _height) {
        this.pt1 = {
            x: _originX,
            y: _originY
        },
        this.pt2 = {
            x: _originX,
            y: _originY + _height
        }
        this.pt3 = {
            x: _originX + _width,
            y: _originY + _height
        }
        this.pt4 = {
            x: _originX + _width,
            y: _originY
        }
    }

    stroke (color) {
        this._context.strokeStyle = color;
        this._context.beginPath();
        this._context.moveTo(this.pt1.x, this.pt1.y);
        this._context.lineTo(this.pt2.x, this.pt2.y);
        this._context.lineTo(this.pt3.x, this.pt3.y);
        this._context.lineTo(this.pt4.x, this.pt4.y);
        this._context.closePath();
        this._context.stroke();
    }

    labelPoints (color, fontStyle) {
        let textOffset = -8;
        this._context.font = fontStyle;
        this._context.fillStyle = color;
        this._context.fillText(`pt1`, this.pt1.x + textOffset, this.pt1.y + textOffset);
        this._context.fillText(`pt2`, this.pt2.x + textOffset, this.pt2.y + textOffset);
        this._context.fillText(`pt3`, this.pt3.x + textOffset, this.pt3.y + textOffset);
        this._context.fillText(`pt4`, this.pt4.x + textOffset, this.pt4.y + textOffset);
    }

    generateIsoRect () {
        if (!this._isCartesian) {
            return {pt1: this.pt1, pt2: this.pt2, pt3: this.pt3, pt4: this.pt4}
        } else {
            return {
                pt1: this._cartPointToIso(this.pt1),
                pt2: this._cartPointToIso(this.pt2),
                pt3: this._cartPointToIso(this.pt3),
                pt4: this._cartPointToIso(this.pt4)
            }
        }
    }

    convertToIsoRect () {
        if (!this._isCartesian) throw 'rectangle is already isometric';
        this._isCartesian = false;

        this.pt1 = this._cartPointToIso(this.pt1),
        this.pt2 = this._cartPointToIso(this.pt2),
        this.pt3 = this._cartPointToIso(this.pt3),
        this.pt4 = this._cartPointToIso(this.pt4)
    }

    convertToCartRect() {
        if (this._isCartesian) throw 'rectangle is already cartesian';
        this._isCartesian = true;

        this.pt1 = this._isoPointToCart(this.pt1),
        this.pt2 = this._isoPointToCart(this.pt2),
        this.pt3 = this._isoPointToCart(this.pt3),
        this.pt4 = this._isoPointToCart(this.pt4)
    }

    checkIsCartesian() {
        return this._isCartesian;
    }

    _cartPointToIso (point) {
        return {
            x: (point.x - point.y),
            y: ((point.y + point.x) / 2)
        }
    }

    _isoPointToCart (point) {
        return {
            x: (((2 * point.y) + point.x) / 2),
            y: (((2 * point.y) - point.x) / 2)
        }
    }
}




export class SimpleVector {
    constructor(x, y, zScale) {
        this.x = x;
        this.y = y;
        this.z = zScale;
    }
}


export class ProjectableVector {
    constructor(x, y, zScale = 0, isCartesian = true) {
        this.x = x;
        this.y = y;
        this.zScale = zScale;
        this._isCartesian = isCartesian;
    }

    checkIsCartesian() {
        return this._isCartesian;
    }

    convertToIso () {
        if (!this._isCartesian) throw 'Vector is already isometric'; // guard from  double conversion
        this._isCartesian = false;

        this.x = (this.x - this.y);
        this.y = ((this.y + this.x) / 2);
    }

    convertToCart () {
        if (this._isCartesian) throw 'Vector is already cartesian'; // guard from double conversion
        this._isCartesian = true;

        this.x = (((2 * this.y) + this.x) / 2);
        this.y = (((2 * this.y) - this.x) / 2);
    }

    label (CTX, color, fontStyle) {
        let textOffset = -8;
        CTX.font = fontStyle;
        CTX.fillStyle = color;
        CTX.fillText(`pt`, this.x + textOffset, this.y + textOffset);
    }

    draw (CTX, color, radius, isFilled = true, isStroked = false) {
        CTX.fillStyle = color;
        CTX.strokeStyle  = color;
        
        CTX.beginPath();
        CTX.arc(this.x, this.y, radius, 0, Math.PI*2);

        if (isFilled) CTX.fill();
        if (isStroked) CTX.stroke();
    }
} 









