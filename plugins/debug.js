let div = document.createElement("div");
div.id = "div1";
div.style = "text-align: center; line-height: 0.5; width: inherit; overflow: hidden; margin-left: auto; margin-right: auto; padding-left: 0; padding-right: 0; visibility: hidden";
document.body.appendChild(div);

let break1 = document.createElement("br");
document.querySelector("#div1").appendChild(break1);

let item1 = document.createElement("label");
item1.id = "speedHeader";
item1.innerHTML = "Current Speed:"; 
document.querySelector("#div1").appendChild(item1);

let item2 = document.createElement("p");
item2.id = "speedLabel";
item2.innerHTML = "unknown"; 
document.querySelector("#div1").appendChild(item2);

let item3 = document.createElement("button");
item3.id = "decreaseSpeedButton";
item3.setAttribute("onClick", "decreaseSpeed()");
item3.innerHTML = "Decrease Speed (1)"; 
document.querySelector("#div1").appendChild(item3);

let item4 = document.createElement("button");
item4.id = "increaseSpeedButton";
item4.setAttribute("onClick", "increaseSpeed()");
item4.innerHTML = "Increase Speed (2)"; 
document.querySelector("#div1").appendChild(item4);

let break2 = document.createElement("br");
document.querySelector("#div1").appendChild(break2);

let break3 = document.createElement("br");
document.querySelector("#div1").appendChild(break3);

let item5 = document.createElement("label");
item5.id = "positionHeader";
item5.innerHTML = "Position:"; 
document.querySelector("#div1").appendChild(item5);

let item6 = document.createElement("p");
item6.id = "positionLabel";
item6.innerHTML = "unknown"; 
document.querySelector("#div1").appendChild(item6);

let item7 = document.createElement("label");
item7.id = "areaSizeHeader";
item7.innerHTML = "Current Area Size:"; 
document.querySelector("#div1").appendChild(item7);

let item8 = document.createElement("p");
item8.id = "areaSizeLabel";
item8.innerHTML = "unknown"; 
document.querySelector("#div1").appendChild(item8);

let item9 = document.createElement("button");
item9.id = "decreaseAreaSizeButton";
item9.setAttribute("onClick", "decreaseAreaSize()");
item9.innerHTML = "Decrease Area Size (q)"; 
document.querySelector("#div1").appendChild(item9);

let item10 = document.createElement("button");
item10.id = "fullScreenButton";
item10.setAttribute("onClick", "fullScreen()");
item10.innerHTML = "Full Screen"; 
document.querySelector("#div1").appendChild(item10);

let item11 = document.createElement("button");
item11.id = "increaseAreaSizeButton";
item11.setAttribute("onClick", "increaseAreaSize()");
item11.innerHTML = "Increase Area Size (w)"; 
document.querySelector("#div1").appendChild(item11);

let break4 = document.createElement("br");
document.querySelector("#div1").appendChild(break4);

let break5 = document.createElement("br");
document.querySelector("#div1").appendChild(break5);

let item12 = document.createElement("label");
item12.id = "playerPieceSizeHeader";
item12.innerHTML = "Current Piece Size:"; 
document.querySelector("#div1").appendChild(item12);

let item13 = document.createElement("p");
item13.id = "playerPieceSizeLabel";
item13.innerHTML = "unknown"; 
document.querySelector("#div1").appendChild(item13);

let item14 = document.createElement("button");
item14.id = "decreasePlayerPieceSizeButton";
item14.setAttribute("onClick", "decreasePlayerPieceSize()");
item14.innerHTML = "Decrease Piece Size (a)"; 
document.querySelector("#div1").appendChild(item14);

let item15 = document.createElement("button");
item15.id = "increasePlayerPieceSizeButton";
item15.setAttribute("onClick", "increasePlayerPieceSize()");
item15.innerHTML = "Increase Piece Size (s)"; 
document.querySelector("#div1").appendChild(item15);

let break6 = document.createElement("br");
document.querySelector("#div1").appendChild(break6);

let break7 = document.createElement("br");
document.querySelector("#div1").appendChild(break7);

let item16 = document.createElement("label");
item16.id = "autoHeader";
item16.innerHTML = "Auto:"; 
document.querySelector("#div1").appendChild(item16);

let item17 = document.createElement("p");
item17.id = "autoEnableLabel";
item17.innerHTML = "Disabled"; 
document.querySelector("#div1").appendChild(item17);

let item18 = document.createElement("button");
item18.id = "stopAutoButton";
item18.setAttribute("onClick", "stopAuto()");
item18.innerHTML = "Stop Auto (Esc)"; 
document.querySelector("#div1").appendChild(item18);

let item19 = document.createElement("button");
item19.id = "startAutoButton";
item19.setAttribute("onClick", "startAuto()");
item19.innerHTML = "Start Auto (\)"; 
document.querySelector("#div1").appendChild(item19);

let break8 = document.createElement("br");
document.querySelector("#div1").appendChild(break8);

let break9 = document.createElement("br");
document.querySelector("#div1").appendChild(break9);

let item20 = document.createElement("label");
item20.id = "accelerometerHeader";
item20.innerHTML = "Accelerometer:"; 
document.querySelector("#div1").appendChild(item20);

let item21 = document.createElement("p");
item21.id = "accelLabel";
item21.innerHTML = "Disabled"; 
document.querySelector("#div1").appendChild(item21);

let item22 = document.createElement("p");
item22.id = "accelerometer";
item22.innerHTML = "Unknown"; 
document.querySelector("#div1").appendChild(item22);

let item23 = document.createElement("button");
item23.id = "accelButton";
item23.setAttribute("onClick", "accelToggle()");
item23.innerHTML = "Start/Stop Accelerometer"; 
document.querySelector("#div1").appendChild(item23);

let break10 = document.createElement("br");
document.querySelector("#div1").appendChild(break10);

let break11 = document.createElement("br");
document.querySelector("#div1").appendChild(break11);

let break12 = document.createElement("br");
document.querySelector("#div1").appendChild(break12);

let break13 = document.createElement("br");
document.querySelector("#div1").appendChild(break13);

let item24 = document.createElement("button");
item24.id = "startGameButton";
item24.setAttribute("onClick", "startGame1()");
item24.innerHTML = "Start Game"; 
document.querySelector("#div1").appendChild(item24);

let break14 = document.createElement("br");
document.querySelector("#div1").appendChild(break14);

let break15 = document.createElement("br");
document.querySelector("#div1").appendChild(break15);

let item25 = document.createElement("button");
item25.id = "spawnEnemyButton";
item25.setAttribute("onClick", "spawnEnemy()");
item25.innerHTML = "Spawn Enemy"; 
document.querySelector("#div1").appendChild(item25);

let break16 = document.createElement("br");
document.querySelector("#div1").appendChild(break16);

let break17 = document.createElement("br");
document.querySelector("#div1").appendChild(break17);

let item26 = document.createElement("button");
item26.id = "enemyFireButton";
item26.setAttribute("onClick", "enemyFire()");
item26.innerHTML = "Fire!"; 
document.querySelector("#div1").appendChild(item26);

let item27 = document.createElement("button");
item27.id = "enemyFireLargeButton";
item27.setAttribute("onClick", "enemyFireLarge()");
item27.innerHTML = "Fire Large!"; 
document.querySelector("#div1").appendChild(item27);

let item28 = document.createElement("button");
item28.id = "splitMinisButton";
item28.setAttribute("onClick", "launchMoreMinis()");
item28.innerHTML = "Split Minis!"; 
document.querySelector("#div1").appendChild(item28);

let item29 = document.createElement("button");
item29.id = "lsButton";
////item29.setAttribute("onClick", "lockStart()");
item29.hidden = "hidden"; 
document.querySelector("#div1").appendChild(item29);
