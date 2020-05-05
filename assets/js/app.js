// document.addEventListener('keydown', obteniendoTecla);

// function obteniendoTecla(e) {
//     let teclaEnter = 13;
//     if (e.keyCode == teclaEnter) {
//         console.log('ohyes')
//     }
// }

let teclaEnter = 13;



//variables

const listaTweets = document.querySelector('#lista-tweets');


// event listeners

escucharEvents();

function escucharEvents() {
    // cuando envia el form!
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    listaTweets.addEventListener('click', borrarTweet);

    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
};


// funciones

// Añadir tweet del form

function agregarTweet(e) {
        e.preventDefault();
    
       
        //guarda el texto escrito en el textarea
        const tweet = document.getElementById('tweet').value;

        // el if con la condición evita agregar tweets vacios!
        if(tweet != ''){
            
        //crear boton borrar
        const btnBorrar = document.createElement('a');
        btnBorrar.classList = 'borrar-tweet';
        btnBorrar.innerText = 'X';

        // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        //añade el tweet a la lista
        listaTweets.appendChild(li);
        //añade el btn de borrar al tweet
        li.appendChild(btnBorrar);

        //añadir a local storage
        agregarTweetLocalSotrage(tweet);

        // resetea el form al enviar
        document.getElementById('formulario').reset();
    } 

};

// elimina el tweet del dom
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
};


// mostrar datos de local storage en la lista

function localStorageListo() {
    let tweets

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function (tweet) {

        //crear boton borrar
        const btnBorrar = document.createElement('a');
        btnBorrar.classList = 'borrar-tweet';
        btnBorrar.innerText = 'X';

        // Crear elemento y añadirle el contenido a la lsita
        const li = document.createElement('li');
        li.innerText = tweet;
        //añade el btn de borrar al tweet
        li.appendChild(btnBorrar);
        //añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}

// agregar tweet en local storage

function agregarTweetLocalSotrage(tweet) {

    let tweets;

    tweets = obtenerTweetsLocalStorage();
    //añadir el new tweet
    tweets.push(tweet);
    // Convertir de string a arreglo para localstorage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function obtenerTweetsLocalStorage() {
    let tweets;

    // revisamos los valores de local storage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

// eliminar twwet de local storage

function borrarTweetLocalStorage(tweet) {

    let tweets, tweetBorrar;
    // Elimina la X del Tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function (tweet, index) {
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}





