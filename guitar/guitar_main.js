// guitar_main.js
// the main JavaScript file for guitar practice
// Owner: DaylanDStoica
// Developer: Daylan Stoica, DaylanDStoica
document.getElementById('homeBtn').addEventListener('click', function() {
    // document.getElementById('output').textContent = 'Navigating to Homepage...';

    window.location.href = '../homeindex.html'; // Redirect to the home page
    document.getElementById('output').textContent = 'Navigating to Home Page...';
});