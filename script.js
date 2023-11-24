const btn = document.getElementById('btn');
const audio = document.getElementById('audio');

function togglebtn(){
    btn.disabled = !btn.disabled;
}

function tellme(joke){
    const jokeString = joke.trim().replace(/ /g, '%20');
    VoiceRSS.speech({
        key: '55320759ab074732aa23a654f52cd59c',
        src: jokeString,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.type === 'twopart') {
            joke = ` ${data.setup} ... ${data.delivery}`;
        }
        else if (data.type === 'single') {
            joke = `${data.joke}`;
        }

    } catch (err) {
        console.log('whoops', err);

        // Todo - Add an array of jokes
    } finally {
        // Text-to-speech
        tellme(joke);
        // disable button
        togglebtn();
    }
}

btn.addEventListener('click', getJokes);
audio.addEventListener('ended', togglebtn);

