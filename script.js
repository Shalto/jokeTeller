const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Toggle Button
function toggleButton(){
    button.disabled = !button.disabled;
}

// Passing joke to voiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
            key: '11c77991a971492fb007ea2419ebfe9f',
            src: joke,
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
}

// Get Jokes from joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //Text-To-Speech
        tellMe(joke);
        //Disable Button
        toggleButton();

    }
    catch(error) {
        //Catch Errors here
        console.log('Whoops', error)
    }
}

// Event Listners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);