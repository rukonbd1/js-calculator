const screen1= document.getElementById('screen1');
const screen2= document.getElementById('screen2');
const signs= document.getElementsByClassName('sign');
const operators = document.getElementsByClassName('operator');
const actions= document.getElementsByClassName("action")
console.log(actions)

let text="";

for (let i = 0; i < signs.length; i++) {
  let sign = signs[i];
  sign.addEventListener('click',(e)=>{ 
    t=e.target.innerText;
    text=text+t;
    console.log(text.charAt(text.length-1));
      if(text.charAt(text.length-1)=="+"|| text.charAt(text.length-1)=="−"||text.charAt(text.length-1)=="×" || text.charAt(text.length-1)=="÷"){
        console.log(text.charAt(text.length-1))
        if(text.charAt(text.length-2)=="+"|| text.charAt(text.length-2)=="−"||text.charAt(text.length-2)=="×" || text.charAt(text.length-2)=="÷"){
          console.log(text.charAt(text.length-2))
          text=text.slice(0,-1)
        }
      }
    console.log(text); 
    screen2.innerText=text;
  })  
}

for (let i = 0; i < actions.length; i++) {
  let sign = actions[i];
  sign.addEventListener('click',(e)=>{
    let txt= e.target.innerText;
      if(txt=="AC"){
      screen2.innerText="0"
      text="";
      }
      if(txt=="Del"){
        if(text==""){
          screen2.innerText="0";
        }
        else if(text.length==1){
          screen2.innerText="0";
          text="";
        }
        else{
        let newText=text.slice(0,-1);
        text=newText;
        screen2.innerText=newText;
        }
        
      }
      if(txt=="="){
        console.log("calculation")
      }
    
  })  
}
