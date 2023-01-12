// MAP IMPORT
// We create const canvas for the map setup (qSelector & dimensions)
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = []
for (let i = 0; i < collisions.length; i +=70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.0)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: -735,
    y: -650
}

collisionsMap.forEach((row, i) =>  {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                }
            })
        )
    })
})

// We creates an image and we put the map
c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

// MAP CREATION
const image = new Image();
image.src = './images/pelletTown.png';

// PLAYER CREATION
const playerImage = new Image();
playerImage.src = './images/playerDown.png';


// Drawing image
image.onload = () => {
    c.drawImage(image, -735, -600);
    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - playerImage.width / 4 / 2,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
    )
}

// Drawing sprites
class Sprite {
    constructor({position, velocity, image, frames = { max: 1 } }) {
        this.position = position
        this.image = image
        this.frames = frames

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
    }

    draw() {
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
    }
}

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

// Starter positions
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
},
    image: image
})

// Keys pressed false at begin 
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const movables = [background, ...boundaries]

function rectangularCollision({rectangle1, rectangle2}) {
    return(
        rectangle1.position.x + player.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + player.height >= rectangle2.position.y
    )
}

// Creating a animation for each sprite move
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
    boundary.draw()

    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: boundary
        })
    )
    {console.log('colliding')}

    })
    player.draw()

    if (player.position.x + player.widht >= boundaries){
        console.log('colidindo')
    }

    let moving = true
    // Conditioning the moviment to press of keys
    if(keys.w.pressed && lastKey === 'w') {
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                })
            )
            {
                console.log('colliding')
            moving = false
            break
            }
        }

        if(moving)
        movables.forEach(movable => (
            movable.position.y += 3
            ))
    } else if (keys.a.pressed && lastKey === 'a') {
    for(let i = 0; i < boundaries.length; i++)  {
        const boundary = boundaries[i]
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                    x: boundary.position.x + 3,
                    y: boundary.position.y
                }
            }
        })
        )
        {
            console.log('colliding')
        moving = false
        break
        }
    }

    if(moving)
        movables.forEach(movable => (
            movable.position.x += 3
        ))}
    else if (keys.d.pressed && lastKey === 'd') {
        for(let i = 0; i < boundaries.length; i++)  {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                }
            })
            )
            {
                console.log('colliding')
            moving = false
            break
            }
        }
    
        if(moving)
        movables.forEach(movable => (
            movable.position.x -= 3
        ))
    }
    else if (keys.s.pressed && lastKey === 's') {
        for(let i = 0; i < boundaries.length; i++)  {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                }
            })
            )
            {
                console.log('colliding')
            moving = false
            break
            }
        }
    
        if(moving)
        movables.forEach(movable => (
            movable.position.y -= 3
        ))}
}


// Run animate
animate()

// We create a Listener of keys
let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;

        case'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;

        case's':
            keys.s.pressed = true;
            lastKey = 's';
            break;

        case'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    }
})

// Receive input of pressed keys
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case'w':
            keys.w.pressed = false;
            break

        case'a':
            keys.a.pressed = false;
            break

        case's':
            keys.s.pressed = false;
            break

        case'd':
            keys.d.pressed = false;
            break
    }
})