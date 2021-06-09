let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let prasent = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let main = document.querySelector('.main');
let logout = document.querySelector(".logout a");



let timmer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

//create a audio Element 
let track = document.createElement('audio');


//All songs list 
let All_song = [
    {
        name: "makeMeLove ", 
        path:"music/song1.mp3", 
        img:"img/im.jpg",
        singer: "[NCS Release]"  
    },
    {
        name: "Home", 
        path:"music/song5.mp3", 
        img:"img/im1.jpg",
        singer: "[NCS Release]"  
    },
    {
        name: "NIVIRO", 
        path:"music/song3.mp3", 
        img:"img/img1.png",
        singer: "[NCS Release]"  
    },
    {
        name: "Lost Sky", 
        path:"music/song4.mp3", 
        img:"img/im4.jpg",
        singer: "[NCS Release]"  
    },
    {
        name: "Shahed", 
        path:"music/song2.mp3", 
        img:"img/img3.jpg",
        singer: "Fusion"  
    },
   
];

//All function

//function load the track
function load_track(index_no){
    clearInterval(timmer);
    reset_slider();
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
    timmer = setInterval(range_slider , 1000);
}
load_track(index_no);


//mute sound
function mute_sound(){
    track.volume = 0;
    volume.value = 0;
    valume.volume_show.innerHTML = 0;
}


//reset song slider

function reset_slider(){
    slider.value = 0;

}



// checking the song is playing or not
 function justplay(){
     if(playing_song==false){
         playsong()
     }else{
         pausesong()
     }
 }

 //play song
 function playsong(){
     track.play();
     playing_song = true;
     play.innerHTML = '<i class="fa fa-pause"></i>';

 }


 //pause song
 function pausesong(){
     track.pause();
     playing_song = false;
     play.innerHTML = '<i class="fa fa-play"></i>';
 }



 //next song
 function next_song(){
     if(index_no < All_song.length - 1){
         index_no += 1;
         load_track(index_no);
         playsong();
     }else{
         index_no = 0;
         load_track(index_no);
         playsong();
     }
 }
   

 //previous song
 function previous_song(){
     if(index_no > 0 ){
         index_no -= 1;
         load_track(index_no);
         playsong();
     }else{
         index_no = All_song.length;
         load_track(index_no);
         playsong();
     }
 }


//change volume
function volume_change(){
    volume_show.innerHTML = recent_volume.value
    track.volume = recent_volume.value /100;
}

//change slider position
function change_duration(){
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;

}



//autoplay function
function autoplay_switch(){
    if (autoplay==1){
        autoplay=0;
        auto_play.style.background = "rgba(255,255,255,0.2)";
    }else{
        autoplay = 1;
        auto_play.style.background = "#A27DE6";
    }

}


function range_slider(){
    let position = 0;

    //update slider position 
    if(!isNaN(track.duration)){
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    //function will  run when the song is over 
    if (track.ended){
        play.innerHTML = '<i class="fa fa-play"></i>';
        if (autoplay==1){
            index_no += 1;
            load_track(index_no);
            playsong();

        }
    }
}



/*****  POPUP FORM  *****/
var Btn, popupForm, closeBtn, popupContainer;

Btn = document.querySelector('.feedback');
popupForm = document.querySelector('.popup-form');
closeBtn = popupForm.querySelector('.close-btn');
popupContainer = document.querySelector('.popup-container');

// event handler to show hidden form
Btn.addEventListener('click', () => {
    // remove hide class
    popupForm.classList.remove('hide');
    popupContainer.classList.remove('hide');
});

// event handler to hide form
closeBtn.addEventListener('click', () => {
    // add hide class
    popupForm.classList.add('hide');
    popupContainer.classList.add('hide');
});

/****************/
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const textarea = document.getElementById('textarea');


//Show input error messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success colour
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSucces(input)
    }else {
        showError(input,'Email is not invalid');
    }
}


//checkRequired fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input,`${getFieldName(input)} is required`)
        }else {
            showSucces(input);
        }
    });
}


//check input Length
function checkLength(input, min ,max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be les than ${max} characters`);
    }else {
        showSucces(input);
    }
}

//get FieldName
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check textarea match
function checktextareaMatch(textarea) {
    if(textarea.value === '') {
        showError((textarea, 'textarea min 6 char'));
    }
}

//Event Listeners
form.addEventListener('submit',function(e) {
    e.preventDefault();

    checkRequired([username, email, textarea]);
    checkLength(username,3,15);
    checkLength(textarea,6,25);
    checkEmail(email);
    checktextareaMatch(textarea);
});






