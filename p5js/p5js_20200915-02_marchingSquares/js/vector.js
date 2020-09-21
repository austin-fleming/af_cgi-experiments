/* 
Vectors
*/

export const getVector3D = (x, y, z) =>
    Object({
        x: x,
        y: y,
        z: z,
    })

/* 
Thresholds
*/
const get2ChannelThresholdBoolean = (gate) => {
    const randomNumber = random(1)

    return randomNumber > gate ? true : false
}

const get2ChannelThresholdFloat = (gate) => {
    const randomNumber = random(1)
    return randomNumber > gate ? 1 : 0.25
}

const get4ChannelThresholdFloat = (gate1, gate2, gate3) => {
    const randomNumber = random(1)

    return randomNumber > gate3
        ? 1
        : randomNumber > gate2
        ? 0.75
        : randomNumber > gate1
        ? 0.5
        : 0.25
}

const getRandomThresholdVector3D = (x, y, gate) =>
    getVector3D(x, y, get2ChannelThresholdFloat(gate))

/* 
Fields
*/
export const getVector3DFloatField = (
    width,
    height,
    resolution,
    gate = 0.5
) => {
    const columns = width / resolution + 1
    const rows = height / resolution + 1

    return [...Array(columns)].map((column, colIndex) => {
        return [...Array(rows)].map((index, rowIndex) =>
            getRandomThresholdVector3D(
                rowIndex * resolution,
                colIndex * resolution,
                gate
            )
        )
    })
}

export const renderFloatField = (field, diameter) => {
    strokeWeight(diameter)
    field.map((column) =>
        column.map((vector) => {
            stroke(vector.z * 255)
            point(vector.x, vector.y)
        })
    )
}

export const renderBoolField = (field, diameter) => {
    stroke(slot * 255)
    strokeWeight(diameter)

    field.map((column) =>
        column.map((vector) => {
            if (slot.z) {
                point(vector.x, vector.y)
            }
        })
    )
}
