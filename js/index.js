// MAP IMPORT
// We create const canvas for the map setup (qSelector & dimensions)
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
c.fillStyle = 'white';

// We creates an image and we put the map
c.fillRect(0, 0, canvas.width, canvas.height);

// MAP CREATION
const image = new Image();
image.src = './images/pelletTown.png';

image.onload = () => {
    c.drawImage(image, -750, -550);
}

