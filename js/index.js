// MAP IMPORT
// We create const canvas for the map setup (qSelector & dimensions)
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;


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
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

// Starter positions
const background = new Sprite({
    position: {
        x: -735,
        y: -600
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

// Creating a animation for each sprite move
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
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

    // Conditioning the moviment to press of keys
    if(keys.w.pressed && lastKey === 'w') background.position.y += 3;
    else if (keys.a.pressed && lastKey === 'a') background.position.x += 3;
    else if (keys.d.pressed && lastKey === 'd') background.position.x -= 3;
    else if (keys.s.pressed && lastKey === 's') background.position.y -= 3;
}


// Run animate
animate()

// We create a Listener of keys
let lastKey = ''
window.addEventListener('keydown', (e) => {
    console.log(e.key)
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
    console.log(keys)
})

// Receive input of pressed keys
window.addEventListener('keyup', (e) => {
    console.log(e.key)
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
    console.log(keys)
})