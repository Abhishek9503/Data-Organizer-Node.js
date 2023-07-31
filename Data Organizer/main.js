#!/usr/bin/env node

let inputArr = process.argv.slice(2);
const { dir } = require("console");
let fs = require("fs");
let path = require("path");

console.log(inputArr);

//node main.js tree "directoryPath"
//node main.js organize "directoryPath"
//node main.js help"

//switch case

let command = inputArr[0];

let types = {
  songs: ["mp4", "mp3"],
  Photo: ["jpg", "png", "jpeg"],
  media: ["mp4", "mkv"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlxs",
    "xls",
    "odt",
    "odp",
    "odg",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};

switch (command) {
  case "tree":
    treeFn(inputArr[1]);
    break;

  case "organize":
    organizeFn(inputArr[1]);
    break;

  case "help":
    helpFn();
    break;

  default:
    console.log("Input right command");
}

function treeFn(dirPath) {
  // console.log("Tree command implemented fro ", dirPath);

  let destPath;
  if (dirPath == undefined) {
    // console.log("kindly enter the path");
    process.cwd();
    treeHelper(process.cwd() ,"");
    return;
  } else {
    let doesExists = fs.existsSync(dirPath);
    if (doesExists) {
     treeHelper(dirPath ,"");
    } else {
      console.log("kindly enter the correct path ");
      return;
    }
  }
}

function treeHelper(dirPath, indent){
  //first check is file or folder  if file then write it and fi it is folder then open the foder and read the file
 let isFile=  fs.lstatSync(dirPath).isFile();
 if(isFile==true){
  let fileName=path.basename(dirPath);
  console.log(indent +"|---"+ fileName)
 }
 else
 {
  let dirName= path.basename(dirPath)
  console.log(indent + "|---"+dirName)
 let childrens=  fs.readdirSync(dirPath);
  for(let i=0;i< childrens.length;i++){
    path.join(dirPath,childrens[i])
    let childPath = path.join(dirPath, childrens[i]);
    treeHelper(childPath, indent + "\t");
  }
 }
}

function organizeFn(dirPath) {
  // console.log("Tree command implemented fro ", dirPath);
  // 1. input -> directory path given

  let destPath;
  if (dirPath == undefined) {
    // console.log("kindly enter the path");
    destPath=process.cwd();
    return;
  } else {
    let doesExists = fs.existsSync(dirPath);
    if (doesExists) {
      // 2, create-> organized_files ->directory
      destPath = path.join(dirPath, "organized_files");
      if (fs.existsSync(destPath) == false) {
        fs.mkdirSync(destPath);
      }
    } else {
      console.log("kindly enter the correct path ");
      return;
    }
  }

  organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest) {
  // 3.identify categories of all the files present in that input directory ->
  let childNames = fs.readdirSync(src);
  console.log(childNames);

  for (let i = 0; i < childNames.length; i++) {
    let childAddress = path.join(src, childNames[i]);
    let isFile = fs.lstatSync(childAddress).isFile();
    if (isFile) {
      //   console.log(childNames[i]);
      let category = getCategory(childNames[i]);
      console.log(childNames[i], "belongs to -->", category);

      // 4. copy/cut file to that  organized directory inside of any of category folder

      sendFiles(childAddress, dest, category);
    }
  }
}

function helpFn() {
  console.log(`List of all the command:
                         node main.js tree "directoryPath"
                         node main.js organize "directoryPath"
                         node main.js help"
`);
}

function sendFiles(srcFilePath, dest, category) {
  //

  let categoryPath = path.join(dest, category);
  if (fs.existsSync(categoryPath) == false) {
    fs.mkdirSync(categoryPath);
  }

  let fileName = path.basename(srcFilePath);
  let destFilePath = path.join(categoryPath, fileName);
  fs.copyFileSync(srcFilePath, destFilePath);
  fs.unlinkSync(srcFilePath);
  console.log(fileName, "copied To", category);
}

function getCategory(name) {
  let ext = path.extname(name);
  ext = ext.slice(1);
  for (let type in types) {
    let cTypeArray = types[type];
    for (let i = 0; i < cTypeArray.length; i++) {
      if (ext == cTypeArray[i]) {
        return type;
      }
    }
  }
  return "others";
  //  console.log(ext);
}
