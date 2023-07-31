let inputArr= process.argv.slice(2)
let fs =require("fs");
const { join } = require("path");
// console.log(inputArr);

// identify --> options
let optionsArr=[];
let filesArr=[];

for(let i=0;i < inputArr.length;i++){
  let firstChar = inputArr[i].charAt(0);
if(firstChar == "-"){
    optionsArr.push(inputArr[i]);
}
else{
    filesArr.push(inputArr[i]);
}


}

//read
let content="";
for(let i=0;i<filesArr.length;i++){
    let bufferContent= fs.readFileSync(filesArr[i]);
    content += bufferContent +"\r\n"
}
// console.log(content);


let contentArr= content.split("\r\n");
// console.log(contentArr);

// -s

let isSPresent =optionsArr.includes("-s");
if(isSPresent== true){
    for(let i=1;i<contentArr.length;i++){
     if(contentArr[i] =="" && contentArr[i-1]==""){
        contentArr[i]=null; 
     }
     else if(contentArr[i]=="" && contentArr[i-1]==null)
     {
        contentArr[i]=null;
     }
    }

    let tempArr=[];
    for(let i =0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            tempArr.push(contentArr[i])

        }
    }
    contentArr=tempArr;
}

console.log("------------");
// console.log(contentArr.join("\n"));

console.log("------------");


let isNPresent= optionsArr.includes("-n");

if(isNPresent== true){
    for(let i=0;i<contentArr.length;i++){
           contentArr[i] = `${i+1} ${contentArr[i]}`; 
       
    }
}

    // console.log(contentArr.join("\n"));


let isBPresent= optionsArr.includes("-b");
if(isBPresent== true){

    let counter =1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            // contentArr[i]=`${i+1} ${contentArr[i]}`
            contentArr[i]=`${counter} ${contentArr[i]}`
            counter++

        }
    }
}
    console.log(contentArr);