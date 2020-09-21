function setup() {
    createCanvas(800, 800)
    background(0)
}

let x = 0
let y = 0
let spacing = 60

function draw() {
    fill('rgba(210,210,210, 0.6)')
    if (random(1) < 0.5) {
        //line(x, y, x + spacing, y + spacing)
        ellipse(x, y, 6, 6)
        ellipse(
            x + spacing * 0.25 * random(0.75, 1.25),
            y + spacing * 0.25 * random(0.75, 1.25),
            4,
            4
        )
        ellipse(
            x + spacing * 0.5 * random(0.75, 1.25),
            y + spacing * 0.5 * random(0.75, 1.25),
            4,
            4
        )
        ellipse(
            x + spacing * 0.75 * random(0.75, 1.25),
            y + spacing * 0.75 * random(0.75, 1.25),
            4,
            4
        )
        ellipse(
            x + spacing * random(0.75, 1.25),
            y + spacing * random(0.75, 1.25),
            4,
            4
        )
    } else {
        //line(x, y + spacing, x + spacing, y)

        ellipse(x, y + spacing, 6, 6)
        ellipse(
            x + spacing * 0.25 * random(0.75, 1.25),
            y + spacing * 0.75 * random(0.75, 1.25),
            4,
            4
        )
        ellipse(
            x + spacing * 0.5 * random(0.75, 1.25),
            y + spacing * 0.5 * random(0.75, 1.25),
            4,
            4
        )
        ellipse(
            x + spacing * 0.75 * random(0.75, 1.25),
            y + spacing * 0.25 * random(0.75, 1.25),
            4,
            4
        )
        ellipse(x + spacing * random(0.75, 1.25), y * random(0.75, 1.25), 4, 4)
    }

    x += spacing
    if (x > width) {
        x = 0
        y += spacing
    }
    if (y > height) {
        y = 0
        x = 0
    }
}
