//1단계 : 시작 버튼을 눌렀을 때 타이틀이 사라진다.
const title = document.querySelector(".title");
const tbtn = document.querySelector(".title-button");
const text = tbtn.innerText;
const game = document.querySelector(".house");
let success = 1; //1 : 성공, 0 : 실패
let num=0;
let start = 10;
tbtn.addEventListener("mouseenter",()=>{
  tbtn.innerText = "GO";
  tbtn.style[`background-color`]="white";
})
tbtn.addEventListener("mouseout",()=>{
  tbtn.innerText = text;
  tbtn.style[`background-color`]="#f2cb05";
})
tbtn.addEventListener("click",(event)=>{
  game.removeChild(title);
  newgame();
})

//게임 start 한 뒤의 html 코드
function newgame(){ //사실상 여기가 main
  const gaming = document.createElement("div");
  gaming.classList.add("gaming");
  gaming.innerHTML=
  `<div class="topA">
    <div class="timer">00:00</div>
    <div class="timerstopbtn" data-val="1"><i class="fa-solid fa-stop"></i></div>
    <div class="countarea">${num}</div>
    <div class="forcount"></div>
  </div>
  <div class="bottomA">f</div>`;
  game.appendChild(gaming);
  const topA = document.querySelector(".topA");
  const bottomA = document.querySelector(".bottomA");

  const timer = document.querySelector(".timer");
  const timerstopbtn = document.querySelector(".timerstopbtn");
  const countarea = document.querySelector(".countarea");
  const forcountbtn = document.querySelector(".forcount");
  let start = 10;

  timerf(start);

  //타이머 함수
  function timerf(time){  
    if (time==-1){
      start = 10;
      console.log("실패");
      return;
    }
    let id = setTimeout(()=>{timerf(--time)},1000);
    timer.innerText = `00:${String(time).padStart(2,'0')}`;
    timerstopbtn.addEventListener("click",()=>{ 
      //진행중이던 상태.
        clearTimeout(id);
        timerstopbtn.dataset.val="0";
        start = time;
        if (num<8) console.log("실패");
        else if (num>=8) console.log("성공");
        //console.log(start);
        return;
    });
  }

  //변경될 사항. 특정 요소를 눌러야 count가 1씩 올라간다.
  window.addEventListener("click",(event)=>{
   if (event.target==forcountbtn) increase();
  });

  //
  function increase(){
    num+=1;
    //console.log(num);
    countarea.innerText = num;
  }
 
  
}




