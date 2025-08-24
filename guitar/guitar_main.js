// guitar_main.js
// the main JavaScript file for guitar practice
// Owner: DaylanDStoica
// Developer: Daylan Stoica, DaylanDStoica

const CHORD_TEXT_FILE = "guitar_chords_tab.txt";
const CHORDS = [ 
"E = 022100",
"A = X02220",
"D = XX0232",
"C = X32010",
"G = 320003",
"F_minor = 022000",
"A_minor = X02210"
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
    
    // create a blinking flash to tell when a change occurs
    let blinking_text = document.getElementById('randomChordOutput');
    blinking_text.style.backgroundColor = 'yellow';
    setTimeout(() => {
        blinking_text.style.backgroundColor = '';
    }, 500);

    // clear the output, so no longer saying loading chord practice
    document.getElementById('output').textContent = '';
    updateFingerDots();
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

    // console.log(document.getElementById('randomChordOutput').textContent); // Log the random chord to the console

}

var GlobalRandomChord = CHORDS[0]
function getRandomChord(){
    const chords = CHORDS; // Use the predefined CHORDS array
    const randomChord = chords[Math.floor(Math.random() * chords.length)]; // Select a random chord from the array
    GlobalRandomChord = randomChord; // set the global variable, usable for other uses
    return randomChord;
}

/*
//add audio playback functionality
function playRandomChordSound(){
    // using the global varaible GlobalRandomChord, play the associated audio file for the chord
    // to aid in audio training.
    // activated with the HTML PlayChordAudio button
    // alert("chord audio button pressed: " + GlobalRandomChord)
    const audio = new Audio(`sounds_folder/${GlobalRandomChord}.mp3`);
    audio.play();
}

document.getElementById('playChordAudioBtn').addEventListener('click', playRandomChordSound);
// event listener for playing an audio file
*/

// Add an event listener to the auto-loop switch
let AutoDisplayToggle = false; // Initialize the auto-loop toggle state
document.getElementById('autoLoopSwitch').addEventListener('change', function() {
    // Handle the auto-loop switch change event
    AutoDisplayToggle = !AutoDisplayToggle
});

// Auto-display interval 
let time_interval = 5;
setInterval(() => {
    if (AutoDisplayToggle) {
        let randChord = getRandomChord();
        document.getElementById('randomChordOutput').textContent = randChord; // display the random chord
        // create a blinking flash to tell when a change occurs
        // <blink>document.getElementById('randomChordOutput').style.backgroundColor = 'yellow';</blink>
        let blinking_text = document.getElementById('randomChordOutput');
        blinking_text.style.backgroundColor = 'yellow';
        setTimeout(() => {
            blinking_text.style.backgroundColor = '';
        }, 500);
    }
    // parseTheChord();
    updateFingerDots(); // update the finger dot positions on the guitar image
}, time_interval * 1000);

function parseTheChord(){
    // parse out the chord name and its properties
    let chord = GlobalRandomChord;
    let chordParts = chord.split(' '); // Split the chord string into name and notes
    let chordName = chordParts[0];
    let chordNotes = chordParts[1].split(','); // Split the notes by comma
    let chordFingers = chordParts[2].split(','); // Split the fingers by comma

    // Display the parsed chord information in console log for developers
    console.log("Chordparts: " + chordParts.join(', '));
    console.log("Chord Name: " + chordName);
    console.log("Chord Notes: " + chordNotes.join(', '));
    console.log("Chord Fingers: " + chordFingers.join(', '));

    // let chordFingersArray = chordFingers.split('');
    // console.log("Chord Fingers Array: " + chordFingersArray);

    return { // return the parsed components
        name: chordName,
        notes: chordNotes,
        fingers: chordFingers
    };
}

// using the parsed chord information, display an overlay on the guitar image
// on the appropriate fret and string positions

// TODO: develop the finger-dot placement and action functions
//1. move the dots along the vertical lines
// 2. make the dot inivisible when the string reads '0' 
// 3. decide on what visual to show when the gstring is meant to be skipped entirely, 'X' perhaps a muted color for the string


function updateFingerDots() {
    const chordInfo = parseTheChord(); // Get the parsed chord information
    // Get the finger placements from the chord information
    let fingerPositions = chordInfo.fingers;

    console.log("fingerPostions type: " + typeof fingerPositions); // object
    // fingerPostions currently read as object
    // Checked TODO: convert fingerPostions to a sting
    // trying stringify
    fingerPositions = JSON.stringify(fingerPositions);
    console.log("fingerPostions type: " + typeof fingerPositions); // string
    // fingerPostions still has unwanted chars, such '[' and ' ' messing up the calculations. Removing them
    // trying split to remove invalid chars 
    fingerPositions = fingerPositions.replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, '');
    let fret_distance = 75; // Distance between frets in pixels
    // Loop through each string and update the dot positions
    for (let i = 1; i <= 6; i++) {
        let dot = document.getElementById(`dot${i}`);
        let fingerPosition = fingerPositions[i - 1]; // get a single character from the string
        console.log(`Dot ${i} finger position: ${fingerPosition}`);
        // Move the dot along the vertical lines

        if ( fingerPosition == '0') {
            dot.style.visibility = 'hidden';
            continue; // skip to next fingerPosition loop
        } else {
            dot.style.visibility = 'visible';
        }
        if ( fingerPosition == 'X') { // mute the string, do not play
            // dot.style.visibility = 'hidden';
            // mark the string as muted
            dot.style.backgroundColor = 'lightgray';
            dot.style.height = '400px';
            dot.style.top = '175px';
            continue; // skip to next fingerPosition loop
        }
        else {
            dot.style.backgroundColor = 'red'; // reset the color to red if not muted
            // reset the dimensions of the dot, 15px    
            dot.style.width = '15px';
            dot.style.height = '15px';
        }
        console.log('Visibility: ' + dot.style.visibility + ', Background Color: ' + dot.style.backgroundColor);

        // Calculate the top position based on the fret number
        // top = 200 + (fret_distance * (fingerPositionNum )); 
        // top = 200 + (75 * (fingerPositionNum)); in pixels
        let fingerPositionNum = Number(fingerPosition); // convert the finger position string to a number
        console.log(`fingerPositionNum type: ${typeof fingerPositionNum}`); // number
        console.log(`Dot ${i} finger position: ${fingerPosition}, as number: ${fingerPositionNum}`);
        // let top = 200 + (fret_distance * (fingerPositionNum ));
        let top = 200 + (fret_distance * (fingerPositionNum - 1)); // adjusted to -1 to match the visual positions
        // problem: currently returns a pointer rather than usable interger
        dot.style.top = `${top}px`;
        console.log(`Dot ${i} position: ${dot.style.top}`);

        // set the visual dot to the changed position, from the dot loop variable 
        // getElementById(`dot${i}`).style.top = dot.style.top;
    }
}