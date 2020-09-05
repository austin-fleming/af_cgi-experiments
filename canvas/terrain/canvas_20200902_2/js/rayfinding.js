


class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z || 0;
    }
}


const getDen = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    return ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
}

const getT = (den, x1, y1, x3, y3, x4, y4) => {
    return ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
}

const getU = (den, x1, y1, x2, y2, x3, y3) => {
    return (((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) * -1) / den;
}

const getCollisionPoint = (line1, line2) => {
    const DEN = getDen();
    const T = getT() / DEN;
    const U = getU() / DEN;
    
}