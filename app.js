const screen1= document.getElementById('screen1');
const screen2= document.getElementById('screen2');
const signs= document.getElementsByClassName('sign');
const operators = document.getElementsByClassName('operator');
const actions= document.getElementsByClassName("action");
const square = document.getElementsByClassName("square")[0];
const factorial = document.getElementsByClassName("factorial")[0];

//square
square.addEventListener('click',()=>{
  const input= screen2.innerText;
  const num=parseFloat(input)
  const sqr =num*num;
  screen1.innerText=num;
  screen2.innerText=sqr;
})
// factorial by recursion
factorial.addEventListener('click',()=>{
  const input= screen2.innerText;
  const num=parseInt(input)
  const fact=(n)=>{
    if(n>0){
      return n*fact(n-1);
    }
    else return 1;
  }
  fact(num);
  screen1.innerText=num;
  screen2.innerText=fact(num);
})

//calculation of two numbers
const calculation=(x,y,sign)=>{

  const num1=parseFloat(x)
  const num2=parseFloat(y)
  if(sign=="+"){
    return num1+num2;
  }
  else if(sign=="−"){
    return num1-num2;
  }
  else if(sign=="×"){
    return num1*num2;
  }
  else if(sign=="÷"){
    return num1/num2;
  }
  else{
    return 0;
  }
}

//remove sign from an array
const removeSign=(signs,i)=>{
      if (i > -1) {
        signs.splice(i, 1);
      }
  return signs;
}
const removeNum=(nums,i)=>{
      if (i > -1) {
        signs.splice(i, 1);
      }
  return nums;
}

//operation on sign and numbers

const operations=(sign,number)=>{
  let newSign =sign;
  let newNumber = number;
    if((newSign.includes("÷"))){
      let i = newSign.indexOf("÷");
      let dvalue=calculation(newNumber[i],newNumber[i+1],newSign[i]);
      newNumber.splice(i,2,dvalue.toString())
      newSign.splice(i,1)
      if(newNumber.length>1){
        operations(newSign,newNumber);
      }
    }
    else if(newSign.includes("×")){
      let i = newSign.indexOf("×");
      let sValue=calculation(newNumber[i],newNumber[i+1],newSign[i]);
      newNumber.splice(i,2,sValue.toString())
      newSign.splice(i,1)
      if(newNumber.length>1){
        operations(newSign,newNumber);
      }  
    }
    else if(newSign.includes("−")){
      let i = newSign.indexOf("−");
      let sValue=calculation(newNumber[i],newNumber[i+1],newSign[i]);
      newNumber.splice(i,2,sValue.toString())
      newSign.splice(i,1)
      if(newNumber.length>1){
        operations(newSign,newNumber);
      }  
    }
    else if(newSign.includes("+")){
      let i = newSign.indexOf("+");
      let sValue=calculation(newNumber[i],newNumber[i+1],newSign[i]);
      newNumber.splice(i,2,sValue.toString())
      newSign.splice(i,1)
      if(newNumber.length>1){
        operations(newSign,newNumber);
      }  
    }
    
    return newNumber[0];
}

  
  
//get number from screen

const getNumber=(index,text)=>{
  let numbers=[];
  let previous=0;
  for (let i = 0; i < index.length; i++) {
    let next = index[i];
    numbers.push(text.slice(previous,next))
    previous=next+1;
  }
  let num = text.slice(previous,text.length)
  if((num)){
    numbers.push(num);
  }
  return numbers;
}

//get operrators from screen

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

//fix duplicate input sign and display input

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
    if(text.length<16){

      screen2.innerText=text;
    }
  })  
}

//handle event

for (let i = 0; i < actions.length; i++) {
  let sign = actions[i];
  sign.addEventListener('click',(e)=>{
    let txt= e.target.innerText;
      if(txt=="AC"){
      screen2.innerText="0"
      screen1.innerText="0"
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
        let indexArr= operator.indexArr;
        let sign=operator.newArr;
        let number= getNumber(indexArr,text);
        let result = operations(sign,number);
         if (result!==NaN) {
          if((text)){
            screen1.innerText=text;
            screen2.innerText=result;
            text=result;
          }
          else{
            screen1.innerText="0";
            screen2.innerText="0";
            text='';
          } 
        }
        else{
          screen1.innerText="0";
          screen2.innerText="0";
          text='';
        }
      }   
  })  
}


