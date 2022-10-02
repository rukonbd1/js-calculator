const screen1= document.getElementById('screen1');
const screen2= document.getElementById('screen2');
const signs= document.getElementsByClassName('sign');
const operators = document.getElementsByClassName('operator');
const actions= document.getElementsByClassName("action");
const getNumber=(sign,index,text)=>{
  for (let i = 0; i < index.length; i++) {
    const element = index[i];
    console.log(element)
    
  }
}

const getOperator=(arr)=>{
  let newArr=[]
  let indexArr=[]
  for (let i = 0; i < arr.length; i++) {
    if(arr[i]=="+" || arr[i]=="−" || arr[i]=="×" || arr[i]=="÷"){
      newArr.push(arr[i]);
      indexArr.push(i);
    }  
  }
  return {newArr,indexArr};
}
const calculation=(value)=>{
  let array=[];
  for (let i = 0; i < value.length; i++) {
    const element = value.charAt(i);
    array.push(element) 
  }
  console.log(getOperator(array))
  
}

let text="";

for (let i = 0; i < signs.length; i++) {
  let sign = signs[i];
  sign.addEventListener('click',(e)=>{ 
    let t=e.target.innerText;
    text=text+t;
    const last= text.charAt(text.length-1);
    const prev= text.charAt(text.length-2)
    if(last=="+"|| text.charAt(text.length-1)=="−"||last=="×" || last=="÷"){
      if(prev=="+"|| prev=="−"||prev=="×" || prev=="÷"){
        text=text.slice(0,-1);  
      }
    }
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
        let operator=getOperator(text);
        let sign=operator.newArr;
        let indexArr= operator.indexArr;
        getNumber(sign,indexArr,text);

      }
    
  })  
}
