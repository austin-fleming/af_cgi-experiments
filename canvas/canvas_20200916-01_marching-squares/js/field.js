class VectorBool {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.z = false
    }
}

export class BooleanField {
    constructor(canvas, resolution) {
        this.field
        this._initField(canvas, resolution)
    }

    render(context) {
        this.field.forEach((column) =>
            column.forEach((vector) => {
                if (vector.z) {
                    context.beginPath()
                    context.arc(vector.x, vector.y, 6, 0, Math.PI * 2)
                    context.fill()
                } else {
                    context.beginPath()
                    context.arc(vector.x, vector.y, 0.2, 0, Math.PI * 2)
                    context.fill()
                }
            })
        )
    }

    _initField(canvas, resolution) {
        const columns = this._getColumns(canvas, resolution)
        const rows = this._getRows(canvas, resolution)
        this.field = [...Array(columns)].map((column, colIndex) =>
            [...Array(rows)].map(
                (row, rowIndex) =>
                    new VectorBool(colIndex * resolution, rowIndex * resolution)
            )
        )
    }

    _getColumns(canvas, resolution) {
        return Math.floor(canvas.width / resolution + 1)
    }

    _getRows(canvas, resolution) {
        return Math.floor(canvas.height / resolution + 1)
    }
}
