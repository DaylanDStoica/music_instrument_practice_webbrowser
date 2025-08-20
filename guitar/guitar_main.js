// guitar_main.js
// the main JavaScript file for guitar practice
// Owner: DaylanDStoica
// Developer: Daylan Stoica, DaylanDStoica

const CHORD_TEXT_FILE = "guitar_chords_tab.txt";
const CHORDS = [ 
"E =  022100",
"A =  X02220",
"D =  XX0232",
"C =  X32010",
"G =  320003",
"F_minor =  022000",
"A_minor =  X02210"
]
document.getElementById('homeBtn').addEventListener('click', function() {
    // document.getElementById('output').textContent = 'Navigating to Homepage...';

    window.location.href = '../homeindex.html'; // Redirect to the home page
    document.getElementById('output').textContent = 'Navigating to Home Page...';
});

document.getElementById('guitarChordBtn').addEventListener('click', function() {
    // Load the chord practice section when the button is clicked
    document.getElementById('output').textContent = 'Loading Chord Practice...'; // show that progress is being made
    // loadChordPractice();
    let randChord = getRandomChord()
    document.getElementById('randomChordOutput').textContent = randChord; // display the random chord
    // clear the output, so no longer saying loading chord practice
    document.getElementById('output').textContent = '';
});

function loadChordPractice() {
    // Fetch the chord text file and display a random chord, 
    // or handle errors if the file cannot be loaded 
    // in the output element with id 'randomChordOutput' 
    fetch(CHORD_TEXT_FILE) // Fetch the chord text file
        .then(response => response.text())
        .then(data => {
            const chords = data.split('\n').filter(line => line.trim() !== ''); // Split the file content into lines and filter out empty lines
            const randomChord = chords[Math.floor(Math.random() * chords.length)]; // Select a random chord from the list
            document.getElementById('randomChordOutput').textContent = randomChord; // Display the random chord in the output element with id 'chordPracticeOutput'
        }) // Handle the response and display a random chord
        .catch(error => {
            console.error('Error loading chord practice:', error);
            document.getElementById('randomChordOutput').textContent = 'Error loading chord practice.';
        }); // Handle any errors that occur during the fetch operation

    // document.getElementById('randomChordOutput').textContent = 'Random chord practice will be displayed here.'; // placeholder text
    // document.getElementById('randomChordOutput').textContent = 'randomChord'; // placeholder text

    // alert(document.getElementById('randomChordOutput').textContent); // Alert the user with the random chord
    // console.log(document.getElementById('randomChordOutput').textContent); // Log the random chord to the console

}

let GlobalRandomChord = CHORDS[0]
function getRandomChord(){
    // const chords = Object.keys(CHORDS);
    const chords = CHORDS; // Use the predefined CHORDS array
    const randomChord = chords[Math.floor(Math.random() * chords.length)]; // Select a random chord from the array
    // alert("* " + Math.floor(Math.random() * chords.length) ); // random numbers
    // alert("% " + Math.floor(Math.random() % chords.length) ); // consistently 0
    GlobalRandomChord = randomChord; // set the global variable, usable for other uses
    return randomChord;
}

/*
function playRandomChord(){
    // using the global varaible GlobalRandomChord, play the associated audio file for the chord
    // to aid in audio training.
    // activated with the HTML PlayChordAudio button
    alert("chord audio button pressesd: " + GlobalRandomChord)
    const audio = new Audio(`../audio/${GlobalRandomChord}.mp3`);
    audio.play();
}

document.getElementById('playChordAudioBtn').addEventListener('click', playRandomChord);
*/

document.getElementById('autoLoopSwitch').addEventListener('change', function() {
    // Handle the auto-loop switch change event
    // TODO: Implement auto-looping functionality
    if (this.checked) {
        // Start auto-looping chords
        alert("Auto-looping enabled");
    } else {
        // Stop auto-looping chords
        alert("Auto-looping disabled");
    }
});