//homepage for the app
// DaylanDStoica
// for handling musical instrument practice

// handle the button presses, and create the page for the appropriate instrument practice    

document.getElementById('guitarPracBtn').addEventListener('click', function() {
    //window.location.href = 'guitar_practice.html';
    document.getElementById('output').textContent = 'Navigating to Guitar Practice...';
    window.location.href = 'guitar/guitar_index.html';
}); 