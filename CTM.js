//1단계 : 시작 버튼을 눌렀을 때 타이틀이 사라진다.
const title = document.querySelector(".title");
const tbtn = document.querySelector(".title-button");
const text = tbtn.innerText;
const game = document.querySelector(".house");

let success = 'not yet'; //1 : 성공, 0 : 실패
let numn=0;
let start = 10;
let end = false;
console.log(end);

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
  newgame(numn);
  return;
})
console.log(end);

//게임 start 한 뒤의 html 코드
function newgame(numn){ 
  let num = numn;
  const game = document.querySelector(".house");
  const gaming = document.createElement("div");
  gaming.classList.add("gaming");
  gaming.innerHTML=
  `<div class="topA">
    <div class="timer">00:00</div>
    <div class="timerstopbtn" data-val="1">Done!</div>
    <div class="countarea">${num}</div>
  </div>
  <div class="bottomA">
    <div class="jerry0"><img class="jerry b" src="/쥐를 잡자/img/pngegg70px.png"></div>
    <div class="jerry1"><img class="jerry b" src="/쥐를 잡자/img/pngegg70px.png"></div>
    <div class="jerry2"><img class="jerry b" src="/쥐를 잡자/img/pngegg70px.png"></div>
    <div class="jerry3"><img class="jerry b" src="/쥐를 잡자/img/pngegg70px.png"></div>
    <div class="jerry4"><img class="jerry b" src="/쥐를 잡자/img/pngegg70px.png"></div>
    <div class="jerry5"><img class="jerry b" src="/쥐를 잡자/img/pngegg70px.png"></div>
    <div class="jerry6"><img class="jerry b" src="/쥐를 잡자/img/pngegg70px.png"></div>
    <div class="jerry7"><img class="jerry b" src="/쥐를 잡자/img/pngegg70px.png"></div>
    <div class="cheese0"><img class="cheese b" src="/쥐를 잡자/img/cheese.png"></div>
    <div class="cheese1"><img class="cheese b" src="/쥐를 잡자/img/cheese.png"></div>
    <div class="cheese2"><img class="cheese b" src="/쥐를 잡자/img/cheese.png"></div>
    <div class="cheese3"><img class="cheese b" src="/쥐를 잡자/img/cheese.png"></div>
    <div class="cheese4"><img class="cheese b" src="/쥐를 잡자/img/cheese.png"></div>
    <div class="cheese5"><img class="cheese b" src="/쥐를 잡자/img/cheese.png"></div>
    <div class="cheese6"><img class="cheese b" src="/쥐를 잡자/img/cheese.png"></div>
    <div class="cheese7"><img class="cheese b" src="/쥐를 잡자/img/cheese.png"></div>
  </div>`;
  game.appendChild(gaming);
  gaming.style.width="100%";
  gaming.style.height="100%";

  const topA = document.querySelector(".topA");
  const bottomA = document.querySelector(".bottomA");
  const timer = document.querySelector(".timer");
  const timerstopbtn = document.querySelector(".timerstopbtn");
  //const countarea = document.querySelector(".countarea");
  const botrect = bottomA.getBoundingClientRect();

  //쥐 랜덤배치
  for (let i=0; i<8; i++){
    const jerry = document.querySelector(`.jerry${i}`);
    const xmin = botrect.x;
    const xmax = botrect.right-70;
    const ymin = botrect.y;
    const ymax = botrect.bottom-120;
    const xp =  randomposition(xmin, xmax);
    const yp = randomposition (ymin, ymax);
    jerry.style.position = "absolute";
    jerry.style.left = `${xp}px`;
    jerry.style.top = `${yp}px`;
  }

  //치즈 랜덤배치
  for (let i=0; i<8; i++){
    const cheese = document.querySelector(`.cheese${i}`);
    const xmin = botrect.x;
    const xmax = botrect.right-70;
    const ymin = botrect.y;
    const ymax = botrect.bottom-120;
    
    const xp =  randomposition(xmin, xmax);
    const yp = randomposition (ymin, ymax);
    cheese.style.width = '60px';
    cheese.style.height = '60px';
    cheese.style.position = "absolute";
    cheese.style.left = `${xp}px`;
    cheese.style.top = `${yp}px`;
  }
  
  //click 이벤트 시 대상을 확실하게 하기 위해, mouse가 가리키게 되면 확대시켜줌.
  const nodes = document.querySelectorAll(".b");
  for (let i=0; i<nodes.length; i++){
    const node = nodes[i];
    node.style.transition = `transform 0.03s ease-in-out`;
    node.addEventListener("mouseenter",()=>{
      node.style.transform=`scale(1.06)`;
      node.style.cursor = 'pointer';
    });
    node.addEventListener("mouseout",()=>{
      node.style.transform=`scale(1)`;
    })
  }

  //타이머 함수 실행
  let start = 10;
  timerf(start);
  
  //타이머 함수
  function timerf(time){  
    const game = document.querySelector(".house");
    const gaming = document.querySelector(".gaming");
    const topA = document.querySelector(".topA");
    const bottomA = document.querySelector(".bottomA");
    if (time==-1){  
      start = 10;
     //실패한 경우
      num=0;
      console.log("실패");
      game.removeChild(gaming);
      return failf();
    }
    let id = setTimeout(()=>{timerf(--time)},1000);
    timer.innerText = `00:${String(time).padStart(2,'0')}`;
    timerstopbtn.addEventListener("click",()=>{ 
      //진행중이던 상태.
        clearTimeout(id);
        timerstopbtn.dataset.val="0";
        start = time;
        return;
    });
  }

  //jerry가 클릭될 경우 count++. cheese 선택 시 실패.
  game.addEventListener("click",(event)=>{
    const game = document.querySelector(".house");
    const gaming = document.querySelector(".gaming");
    let nodename = event.target.className;    
    if (nodename.includes('jerry')){
      const target = event.target;
      target.parentElement.removeChild(target);
      increase();
    }
    else if (nodename.includes("cheese")){
      num=0;
      game.removeChild(gaming);
      success=0; //실패한 경우
      console.log("실패");
      failf();
    }
    else if (nodename==`timerstopbtn` || nodename==`fa-solid fa-stop`){
      if (num<8){
        num=0;
        game.removeChild(gaming);
        success = 0; //실패
        console.log("실패");
        failf();
      }
      else{ //num>=8
        num=0;
        game.removeChild(gaming);
        console.log("성공"); 
        success=1; //성공
        successf();
      } 
    }
    else if (nodename=='replay'){
      end=true;
      numn=0;
      console.log(end);
      return;
    }
  });

  //타이머 증가함수
  function increase(){
    num+=1;
    const countarea = document.querySelector(".countarea");
    countarea.innerText = num;
  }  


  if (end==true) console.log("real 끝")
  return;
}

function successf(){
  const game = document.querySelector(".house");
  const sdiv = document.createElement("div");
  sdiv.innerHTML=
  `<img class="tom" src="/쥐를 잡자/img/tom.png">
  <div class="textp">SUCCESS!</div>`
  //<div class="replay"><i class="fa-solid fa-arrow-rotate-left"></i></div>`;
  game.appendChild(sdiv);
  
  const tom = document.querySelector(".tom");
  //const replay = document.querySelector(".replay");
  const textp = document.querySelector(".textp");
  
  sdiv.style.cssText =
  `width : 80%;
  height : 70%;
  border : 5px solid black;
  background : #f2b705;
  margin : 0 auto;
  border-radius : 80%;
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;`;
  
  textp.style.cssText=
  `margin : 5px;
  font-size : 80px;
  color : white;
  font-weight : bold;
  text-shadow: -5px 0px #8fc4d9, 0px 5px #8fc4d9, 5px 0px #8fc4d9, 0px -5px #8fc4d9;`;

  /*
  replay.style.cssText=
  `width : 60px;
  height : 60px;
  margin-top : 20px;
  font-size : 30px;
  color : white;
  text-align : center;
  line-height : 60px;
  border : 1px solid #735145;
  border-radius : 50%;
  background-color : #735145;`;
  
  replay.addEventListener("click",()=>{
    sdiv.removeChild(tom);
    sdiv.removeChild(textp);
    sdiv.removeChild(replay);
    game.removeChild(sdiv);
    numn=0;
    newgame(numn);
  });*/
  return;
}


function failf(){
  const game = document.querySelector(".house");
  const sdiv = document.createElement("div");
  sdiv.innerHTML=
  `<img class="cheesejerry" src="/쥐를 잡자/img/jerryEatingCheese.png">
  <div class="textp">UH OH...:(</div>`
  //<div class="replay"><i class="fa-solid fa-arrow-rotate-left"></i></div>`;
  game.appendChild(sdiv);
  
  const cheesejerry = document.querySelector(".cheesejerry");
  //const replay = document.querySelector(".replay");
  const textp = document.querySelector(".textp");
  
  sdiv.style.cssText =
  `width : 80%;
  height : 70%;
  border : 5px solid black;
  background : #d94436;
  margin : 0 auto;
  border-radius : 80%;
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;`;
  
  textp.style.cssText=
  `margin : 5px;
  font-size : 80px;
  color : white;
  font-weight : bold;
  text-shadow: -5px 0px #8fc4d9, 0px 5px #8fc4d9, 5px 0px #8fc4d9, 0px -5px #8fc4d9;`;

  /*
  replay.style.cssText=
  `width : 60px;
  height : 60px;
  margin-top : 20px;
  color : white;
  text-align : center;
  line-height : 60px;
  font-size : 30px;
  border : 1px solid #735145;
  border-radius : 50%;
  background-color : #735145;`;
  
  replay.addEventListener("click",()=>{
    sdiv.removeChild(cheesejerry);
    sdiv.removeChild(textp);
    sdiv.removeChild(replay);
    game.removeChild(sdiv);
    numn=0;
    newgame(numn);
  });*/
  return;
}


//random position 함수
function randomposition(min, max){
  return Math.random()*(max-min)+min;
}

