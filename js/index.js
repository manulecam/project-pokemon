// MAP IMPORT
// We create const canvas for the map setup (qSelector & dimensions)
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i +=70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
}

const boundaries = [];
const offset = {
    x: -735,
    y: -650
}

// We create map collision based on values of JSON
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
image.image.onload() = function(){}
image.src = '../Images/pelletTown.png';

// Foreground Creation
const foregroundImage = new Image();
foregroundImage.src = '../Images/foregroundImage.png';


// PLAYER CREATION
const playerDownImage = new Image();
playerDownImage.src = '../Images/playerDown.png'; // loading Player sprite to Down

const playerLeftImage = new Image();
playerLeftImage.src = '../Images/playerLeft.png'; // loading Player sprite to Left

const playerRightImage = new Image();
playerRightImage.src = '../Images/playerRight.png'; // loading Player sprite to Right

const playerUpImage = new Image();
playerUpImage.src = '../Images/playerUp.png'; // loading Player sprite to Up


// Drawing image
image.onload = () => {
    c.drawImage(image, -735, -600)
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

// Creating Sprites
const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
        
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

// Foreground
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
},
    image: foregroundImage
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

// We create constant for the movables
const movables = [background, ...boundaries, foreground]

// We create a function that detect collisions of 2 rectangules
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
    })

    // We draw player and foreground
    player.draw()
    foreground.draw()

    let moving = true
    player.moving = false
    
    // If player is moving with W, do things
    if(keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up
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
            moving = false
            break
            }
        }
        if(moving) movables.forEach(movable => (movable.position.y += 3))
    }        

            // If player is moving with A, do things 
    else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.image = player.sprites.left
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
        moving = false
        break
        }
    }
    if(moving) movables.forEach(movable => (movable.position.x += 3))}

    // If player is moving with D, do things
    else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.image = player.sprites.right
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
            moving = false
            break
            }
        }
        if(moving) movables.forEach(movable => (movable.position.x -= 3))
    }

    // If player is moving with S, do things
    else if (keys.s.pressed && lastKey === 's') {
        player.moving = true
        player.image = player.sprites.down
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
            moving = false
            break
            }
        }
        if(moving) movables.forEach(movable => (movable.position.y -= 3))}
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