const isUpperTriangleLit = (pt1, pt2, pt4) => {
    if (pt2.z > pt4.z) {
        if (pt4.z > pt1.z) {
            return true
        } else {
            return false
        }
    } else {
        if (pt2.z > pt1.z) {
            return true
        } else {
            return false
        }

    }
}

const isLowerTriangleLit = (pt2, pt3, pt4) => {
    if (pt2.z > pt4.z) {
        if (pt3.z > pt4.z) {
            return true
        } else {
            return false
        }
    } else {
        if (pt3.z > pt2.z) {
            return true
        } else {
            return false
        }

    }
} 

const renderUpperMeshTriangle = (pt1, pt2, pt4, lightColor, shadowColor, strokeColor = false) => {
    CTX.fillStyle = isUpperTriangleLit(pt1, pt2, pt4) ? lightColor : shadowColor;

    CTX.beginPath();
    CTX.moveTo(pt1.x, pt1.y);
    CTX.lineTo(pt2.x, pt2.y);
    CTX.lineTo(pt4.x, pt4.y);
    CTX.closePath();

    if (strokeColor) {
        CTX.lineWidth = 1;
        CTX.strokeStyle = strokeColor;
        CTX.stroke();
    }
}

const renderLowerMeshTriangle = (pt2, pt3, pt4, lightColor, shadowColor, strokeColor = false) => {
    CTX.fillStyle = isLowerTriangleLit(pt2, pt3,pt4) ? lightColor : shadowColor;

    CTX.beginPath();
    CTX.moveTo(pt1.x, pt1.y);
    CTX.lineTo(pt2.x, pt2.y);
    CTX.lineTo(pt4.x, pt4.y);
    CTX.closePath();
    CTX.fill();

    if (strokeColor) {
        CTX.lineWidth = 1;
        CTX.strokeStyle = strokeColor;
        CTX.stroke();
    }
}

const meshFieldShader = (fieldArray, indexX, indexY, lightColor = 'white', darkColor = 'black', strokeColor = false) => {
     /*
    pt1 -- pt2
    |   /   |
    pt4 -- pt3
    */
   
    const PT_1 = fieldArray[indexY][indexX];
    const PT_2 = fieldArray[indexY][indexX + 1];
    const PT_3 = fieldArray[indexY + 1][indexX + 1];
    const PT_4 = fieldArray[indexY + 1][indexX];

    renderUpperMeshTriangle(PT_1,PT_2,PT_4, lightColor, shadowColor, strokeColor);
    renderLowerMeshTriangle(PT_2, PT_3, PT_4, lightColor, shadowColor, strokeColor);
}