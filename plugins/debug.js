let div = document.createElement("div");
div.id = "div1";
div.style = "text-align: center; line-height: 0.5; width: 480px; margin-left: auto; margin-right: auto; padding-left: 0; padding-right: 0; visibility: hidden";
document.body.appendChild(div);

let item1 = document.createElement("label");
item1.id = "speedHeader";
item1.innerHTML = "Current Speed:"; 
document.querySelector("#div1").appendChild(item1);
