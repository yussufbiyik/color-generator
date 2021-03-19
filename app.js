var clipboard = new ClipboardJS('.color');

// Generate new colors when space key is pressed
document.onkeyup = (key) => {
    if(key.code==="Space"){
        generateColors(4)
    }
}

// Function to convert hsl to hex code when needed (https://stackoverflow.com/a/36722579)
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

// Function to generate one random color
function generateColor(){
    let hue = Math.floor(Math.random()*358);
    let saturation = Math.floor(Math.random()*100);
    let lightness = Math.floor(Math.random()*100);
    return `${hslToHex(hue, saturation, lightness)}`;
}

// Function to generate desired number of colors and replace the background gradient and color divs with generated colors
function generateColors(numberOfColors){
    let colors = [];
    for(let i=0;i<numberOfColors;i++){
        let color = generateColor();
        let currentColor = document.querySelector(`#color${i+1}`);
        currentColor.style = `background:${color};color:${color}`;
        currentColor.setAttribute("data-clipboard-text", color);
        colors.push(color);
    }
    document.body.style = `background: colors[0];background:linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 33%, ${colors[2]} 66%, ${colors[3]} 75%);`
}

// Send a notification when the selected color is successfully copied to clipboard
clipboard.on('success', function(e) {
    let notification = document.querySelector('.notification');
    let notificationText = document.querySelector('#notification-text');
    notificationText.innerHTML = `Selected color is copied to your clipboard!\nSelected color is ${e.text}`
    notification.classList.toggle('visible');
    setTimeout(() => {
        notification.classList.toggle('visible');
    },1500)
    e.clearSelection();
});