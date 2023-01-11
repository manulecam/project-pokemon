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
console.log(playerImage)
image.onload = () => {
    c.drawImage(image, -750, -550)
    c.drawImage(playerImage, 0, 0)
}