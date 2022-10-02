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
  const isInt=(a)=>{
    if(a.includes('.')){
      return parseFloat(a);
    }
    else{
      return parseInt(a);
    }
  }
  const num1=isInt(x)
  const num2=isInt(y)
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

//operation on sign and numbers

const operations=(signs,numbers)=>{
  if(signs.length==0){
    return screen2.innerText;
  }
  else if(numbers.length==2){
    return calculation(numbers[0],numbers[1],signs[0]);
  }
  else if(numbers.length>2){
    let result='';
    for (let i = 0; i < numbers.length-1; i++) {
      if(i==0){
        result=calculation(numbers[0],numbers[1],signs[0])
      }
      else{
        result =calculation(result,numbers[i+1],signs[i])
      }     
    }
    return result;
  }
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
        let numbers = getNumber(indexArr,text);
        let result= operations(sign,numbers);
        if ((result)){
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


