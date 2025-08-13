// guitar_main.js
// the main JavaScript file for guitar practice
// Owner: DaylanDStoica
// Developer: Daylan Stoica, DaylanDStoica

CHORD_TEXT_FILE = "guitar_chords_tab.txt";

document.getElementById('homeBtn').addEventListener('click', function() {
    // document.getElementById('output').textContent = 'Navigating to Homepage...';

    window.location.href = '../homeindex.html'; // Redirect to the home page
    document.getElementById('output').textContent = 'Navigating to Home Page...';
});

document.getElementById('chordPracticeBtn').addEventListener('click', function() {
    // Load the chord practice section when the button is clicked
    document.getElementById('output').textContent = 'Loading Chord Practice...';
    loadChordPractice();
});

function loadChordPractice() {
    // Fetch the chord text file and display a random chord, 
    // or handle errors if the file cannot be loaded 
    // in the output element with id 'chordPracticeOutput' 
    fetch(CHORD_TEXT_FILE) // Fetch the chord text file
        .then(response => response.text())
        .then(data => {
            const chords = data.split('\n').filter(line => line.trim() !== ''); // Split the file content into lines and filter out empty lines
            const randomChord = chords[Math.floor(Math.random() * chords.length)]; // Select a random chord from the list
            document.getElementById('chordPracticeOutput').textContent = randomChord; // Display the random chord in the output element with id 'chordPracticeOutput'
        }) // Handle the response and display a random chord
        .catch(error => {
            console.error('Error loading chord practice:', error);
            document.getElementById('chordPracticeOutput').textContent = 'Error loading chord practice.';
        }); // Handle any errors that occur during the fetch operation
}

