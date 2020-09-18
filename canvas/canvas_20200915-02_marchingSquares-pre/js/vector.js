/* 
Vectors
*/

export const getVector2D = (x, y) =>
    Object({
        x: x,
        y: y,
    })

export const getVector3D = (x, y, z) =>
    Object({
        x: x,
        y: y,
        z: z,
    })

/* 
Thresholds
*/
const get2ChannelThresholdBoolean = (gate) => (Math.random() > gate ? true : false)

const get2ChannelThresholdFloat = (gate) => (Math.random() > gate ? 1 : 0.25)

const get4ChannelThresholdFloat = (gate1, gate2, gate3) => {
    const randomNumber = Math.random()
    return randomNumber > gate3 ? 1 : randomNumber > gate2 ? 0.75 : randomNumber > gate1 ? 0.5 : 0.25
}

const getRandomThresholdVector3D = (x, y, gate) => getVector3D(x, y, get2ChannelThresholdFloat(gate))

const getRandomThresholdVector3DBool = (x, y, gate) => getVector3D(x, y, get2ChannelThresholdBoolean(gate))

/* 
Fields
*/
const getColumns = (width, resolution) => width / resolution + 1

const getRows = (height, resolution) => height / resolution + 1

export const getVector3DFloatField = (width, height, resolution, gate = 0.5) => {
    const columns = getColumns(width, resolution)
    const rows = getRows(height, resolution)

    return [...Array(columns)].map((column, colIndex) => {
        return [...Array(rows)].map((index, rowIndex) => {
            const x = colIndex * resolution
            const y = rowIndex * resolution

            return getRandomThresholdVector3D(x, y, gate)
        })
    })
}

export const getVector3DBoolField = (width, height, resolution, gate = 0.5) => {
    const columns = getColumns(width, resolution)
    const rows = getRows(height, resolution)

    return [...Array(columns)].map((column, colIndex) => {
        return [...Array(rows)].map((index, rowIndex) => {
            const x = colIndex * resolution
            const y = rowIndex * resolution

            return getRandomThresholdVector3DBool(x, y, gate)
        })
    })
}

const getColorFromFloat = (float) => `rgb(${255 * float},${255 * float},${255 * float})`

export const renderFloatField = (CTX, field, diameter) => {
    field.map((column) =>
        column.map((vector) => {
            CTX.fillStyle = getColorFromFloat(vector.z)
            CTX.beginPath()
            CTX.arc(vector.x, vector.y, diameter, 0, Math.PI * 2)
            CTX.closePath()
            CTX.fill()
        })
    )
}

export const renderBoolField = (CTX, field, diameter) => {
    field.map((column) =>
        column.map((vector) => {
            if (vector.z) {
                CTX.fillStyle = getColorFromFloat(vector.z)
                CTX.beginPath()
                CTX.arc(vector.x, vector.y, diameter, 0, Math.PI * 2)
                CTX.closePath()
                CTX.fill()
            }
        })
    )
}

/* export const renderBoolField = (field, diameter) => {
    stroke(slot * 255)
    strokeWeight(diameter)

    field.map((column) =>
        column.map((vector) => {
            if (slot.z) {
                point(vector.x, vector.y)
            }
        })
    )
} */
