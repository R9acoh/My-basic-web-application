// Array of background colors to cycle through
const colors = [
    '#f5f5f5', // default
    '#e0f7fa', // light blue
    '#f3e5f5', // light purple
    '#e8f5e9', // light green
    '#fff8e1', // light yellow
    '#fbe9e7'  // light red
];

// Current color index
let currentColorIndex = 0;

// Get button element
const colorButton = document.getElementById('colorButton');

// Add click event listener
colorButton.addEventListener('click', function() {
    // Move to next color (or back to beginning if at the end)
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    
    // Apply the new color
    document.body.style.backgroundColor = colors[currentColorIndex];
});