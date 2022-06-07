let canvas = document.getElementById("myCanvas");
let canvas_parent = document.querySelector(".canvas-parent");

let contex = canvas.getContext("2d");
let kolory = ['red','green','yellow','orange','aqua'];

var parent_height = canvas_parent.clientHeight;
var parent_width = canvas_parent.clientWidth;

canvas.height = parent_height;
canvas.width= parent_width;

contex.textAlign = "center";
contex.textBaseline = "middle";
//contex.fillText('URUCHOM GRĘ', canvas.width / 2, canvas.height / 2 );
//stworzenie zmiennych dla elementów interfejsu
let start = document.getElementById("start");
let time_text = document.getElementById("time-text");
let pczasMin = document.getElementById("czasMin");
let pczasMax = document.getElementById("czasMax");
let pczasSre = document.getElementById("czasSre");
let pczasBest = document.getElementById("czasBest");
let input_liczbaProb = document.getElementById("liczbaProb");
let strybGry = document.getElementById("trybGry");
let licznik = 0;
//statusy gry
let GameStatus = {
    STOP : 1,
    START: 2,

}
let status = GameStatus.STOP;
var timeout1;
var timeout2;
var time_now;
var time_later;
var play_time;
var liczbaProb;
var trybGry;
//statystyki
var czasBest = 5000;
var czasMin;
var czasMax;
var sumaCzasow;
var czasSre;


function get_random_time(max){
    let result = parseInt(Math.floor(Math.random() * max) + 1);
result = result * 1000;
    return result;
}
function end_game(){
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    canvas.style.backgroundColor  = "white";
start.style.backgroundColor = "green";
if(czasBest > czasMin)
{
czasBest = czasMin;
pczasBest.innerHTML = czasBest + " ms";
}

//contex.fillText('KONIEC GRY', canvas.width / 2, canvas.height / 2 );
    start.innerHTML = "START";
    status = GameStatus.STOP;

}

function klikniecie_canvas(){

            if(trybGry == "myszka" || event.key == 'z')
{
let date2 = new Date();
time_later = date2.getTime();
play_time = (time_later - time_now);
if(czasMin == 0 || czasMin > play_time)
czasMin = play_time;
if(czasMax == 0 || czasMax < play_time)
czasMax = play_time;
sumaCzasow += play_time;
czasSre = sumaCzasow / (liczbaProb - licznik+1);
time_text.innerHTML = play_time + " ms";
pczasMin.innerHTML = czasMin + " ms";
pczasMax.innerHTML = czasMax + " ms";
pczasSre.innerHTML = czasSre + " ms";
}
canvas.removeEventListener("click", klikniecie_canvas);
canvas.removeEventListener("keyup", klikniecie_canvas);
        }

function timeout1_function(time){
    timeout1 = setTimeout(function(){
//zmiana koloru
        canvas.style.backgroundColor  = kolory[((licznik-1)%5)]; // jest 5 kolorów dlatego %5
        let date1 = new Date();
        time_now = date1.getTime();
if(strybGry.value == "myszka")
canvas.addEventListener('click',klikniecie_canvas);
else
document.addEventListener('keyup',klikniecie_canvas);

    }, time)
}
function timeout2_function(time){
    timeout2 = setTimeout (koniec_rundy, time);
}


function start_game(){
liczbaProb = licznik = input_liczbaProb.value;
trybGry = strybGry.value;
status = GameStatus.START;
//reset statystyk
sumaCzasow = czasMax = czasMin = czasSre = 0;
//ustawienie koloru oczekiwania
    canvas.style.backgroundColor = "white";
contex.fillText('CZEKAJ NA ZMIANĘ KOLORU I KLIKNIJ JAK NAJSZYBCIEJ', canvas.width / 2, canvas.height / 2 );
//let licznik2 = licznik;
start.style.backgroundColor = "red";
if(strybGry.value == "klawiatura")
{
canvas.removeEventListener("click", klikniecie_canvas);
}

start_rundy();

}
function koniec_rundy()
{
clearTimeout(timeout1);
    clearTimeout(timeout2);

//canvas.style.background = "rgb (237, 255, 172)";
licznik -= 1;
if(licznik > 0)
start_rundy();
else
end_game();
   
   
}
function start_rundy()
{

let change_time = get_random_time(5);
    let end_time = change_time + 1000;
   
    timeout1_function(change_time);
    timeout2_function(end_time);
}





start.addEventListener('click', function(){
    if (status === GameStatus.START) {
        end_game();
    }else{
        start_game();
        this.innerHTML = "STOP";

    }
   
});
