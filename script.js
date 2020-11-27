const container = document.querySelector('.container');
const movieList = document.querySelector('#select-movie');
const count = document.querySelector('.seat-number');
const total = document.querySelector('.total');
const seat = document.querySelector('.row .seat:not(.occupied)')
const screen = document.querySelector('.screen');
const button = document.querySelector('.btn');





let tickitPrice = parseInt(movieList.value);
console.log(tickitPrice);



const updateCountTotal = (cnt) => {

count.innerHTML = cnt;
total.innerHTML = cnt * tickitPrice;

};


const initialize = function(){

//clear values
count.innerHTML = 0;
total.innerHTML = 0;

// // clear selected seats
const list = Array.from(document.querySelectorAll('.row .seat.selected'));
list.forEach(cur => {
cur.classList.remove('selected');
  });


};







// Event Listners


container.addEventListener('click', function(event){
    event.preventDefault();
  
if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')){
    event.target.classList.toggle('selected');    
} 

const selectedSeats = Array.from(document.getElementsByClassName('seat selected'));
const seatCount = selectedSeats.length - 1;

// For Local Storage
const selectedSeatsL = document.querySelectorAll('.row .seat.selected');

const arrselectedSeatsL = [...selectedSeatsL].map(curSeat => {
  const seats = document.querySelectorAll('.row .seat');
  return [...seats].indexOf(curSeat);
});
// console.log(arrselectedSeatsL);

localStorage.setItem('seatArray', JSON.stringify(arrselectedSeatsL));



// calling update value function
updateCountTotal(seatCount);


});


var moviePicture = function(MovieName){
  if(MovieName === 'Avengers End Game') {
    screen.style.backgroundImage = "url(./img/avengers.jpg)";
   
   } else if(MovieName === 'Inception') {
   screen.style.backgroundImage = "url(./img/inception.jpg)";
   
   } else if(MovieName === 'Predestination') {
   screen.style.backgroundImage = "url(./img/predestination.jpg)";
   
   } else if(MovieName === 'Extraction') {
    screen.style.backgroundImage = "url(./img/Extraction.jpg)";
   
   } else if(MovieName === 'Thor') {
    screen.style.backgroundImage = "url(./img/Thor.jpg)";
   }
   


}


// change option===============================
movieList.addEventListener('change', function(event) {
// init
initialize();

// update total pay
tickitPrice = parseInt(event.target.value);


const option = movieList.options[movieList.selectedIndex];
const index = movieList.selectedIndex;

const movieName = option.getAttribute('name');


moviePicture(movieName);

// For Local Storage
localStorage.setItem('movieName', movieName);
localStorage.setItem('movieIndex', index);
localStorage.setItem('moviePrice', event.target.value);


});



// Clear event

button.addEventListener('click', function(event) {
    event.preventDefault();
// data
tickitPrice = 0;


// UI
count.innerHTML = 0;
total.innerHTML = 0;
// // clear selected seats
const list = Array.from(document.querySelectorAll('.row .seat.selected'));
list.forEach(cur => {
cur.classList.remove('selected');
  });


// clear from local Storage
localStorage.clear();

});



// ******************************** //


function populate() {
  const indexofSeats = JSON.parse(localStorage.getItem('seatArray'));
  
  // seats display
  if(indexofSeats !== null && indexofSeats.length > 0) {
    document.querySelectorAll('.row .seat').forEach((seat, index) => {
    if(indexofSeats.indexOf(index) > -1){
      seat.classList.add('selected');
    }
    });
  }
  
  // movie list box display
  const movieListIndex = localStorage.getItem('movieIndex');
  
  if(movieListIndex !== null) {
    movieList.selectedIndex = movieListIndex;
    
  }
  
  // values display
  const selectedSeats = Array.from(document.getElementsByClassName('seat selected'));
  const seatCount = selectedSeats.length - 1;
  const tickitPrice = localStorage.getItem('moviePrice');

  count.innerHTML = seatCount;
  total.innerHTML = seatCount * tickitPrice;

  // image display
  const moviename = localStorage.getItem('movieName');
  moviePicture(moviename);
  };
  
  populate();



// ******************************** //





