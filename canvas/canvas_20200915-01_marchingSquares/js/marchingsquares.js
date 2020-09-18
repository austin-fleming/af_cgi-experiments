import { getVector3D, getVector2D } from './vector.js'

const getState = (a, b, c, d) => a * 8 + b * 4 + c * 2 + d * 1

const getStateBool = (a, b, c, d) => {
    const nA = a ? a * 8 : 0
    const nB = b ? b * 4 : 0
    const nC = c ? c * 2 : 0
    const nD = d ? d * 1 : 0

    return nA + nB + nC + nD
}

const renderLine = (context, v1, v2) => {
    context.beginPath()
    context.moveTo(v1.x, v1.y)
    context.lineTo(v2.x, v2.y)
    context.stroke()
}

const renderState = (context, state, a, b, c, d) => {
    switch (state) {
        case 0:
            break
        case 1:
            renderLine(context, c, d)
            break
        case 2:
            renderLine(context, b, c)
            break
        case 3:
            renderLine(context, b, d)
            break
        case 4:
            renderLine(context, a, b)
            break
        case 5:
            renderLine(context, a, d)
            renderLine(context, b, c)
            break
        case 6:
            renderLine(context, a, c)
            break
        case 7:
            renderLine(context, a, d)
            break
        case 8:
            renderLine(context, a, d)
            break
        case 9:
            renderLine(context, a, c)
            break
        case 10:
            renderLine(context, a, b)
            renderLine(context, c, d)
            break
        case 11:
            renderLine(context, a, b)
            break
        case 12:
            renderLine(context, b, d)
            break
        case 13:
            renderLine(context, b, c)
            break
        case 14:
            renderLine(context, c, d)
            break
        case 15:
            break
        default:
            console.log(`skipped ${state}`)
            break
    }
}

export const setState = (context, field, resolution) => {
    context.strokeStyle = '#ffffff'
    const offset = resolution * 0.5
    let rectA
    let rectB
    let rectC
    let rectD
    let state
    for (let iX = 0; iX < field.length - 2; iX++) {
        for (let iY = 0; iY < field[iX].length - 2; iY++) {
            rectA = getVector2D(field[iX][iY].x, field[iX][iY].y)
            rectB = getVector2D(field[iX + 1][iY].x, field[iX + 1][iY].y)
            rectC = getVector2D(field[iX + 1][iY + 1].x, field[iX + 1][iY + 1].y)
            rectD = getVector2D(field[iX][iY + 1].x, field[iX][iY + 1].y)

            console.log('----------')
            console.log(rectA)
            console.log(field[iX][iY].z)
            console.log(rectB)
            console.log(field[iX + 1][iY].z)
            console.log(rectC)
            console.log(field[iX + 1][iY + 1].z)
            console.log(rectD)
            console.log(field[iX][iY + 1].z)
            console.log('----------')

            state = getStateBool(
                Math.ceil(field[iX][iY].z),
                Math.ceil(field[iX + 1][iY].z),
                Math.ceil(field[iX + 1][iY + 1].z),
                Math.ceil(field[iX][iY + 1].z)
            )

            renderState(context, state, rectA, rectB, rectC, rectD)
        }
    }
}
