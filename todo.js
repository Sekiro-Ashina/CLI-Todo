const fs = require("fs");
const filePath = "./task.json";

const command = process.argv[2];
const argument = process.argv[3];



//In oreder to add task you need to first load the task and loading will happen from json file.

  const loadTask = () =>{
    try{     // Since we are reading files the error might occur.
        const buffer = fs.readFileSync(filePath); //you can read file async but there is nothing name exactly as readFileAsync its only readFile means this and async method, but here we are deliberately going with sync cause we dont want to move if we cant read the file. 
        const dataJson = buffer.toString();
        return JSON.parse(dataJson);
    }
    catch(error){
        return [];
    }
  }

  

const addTask = (task) => { 
    const tasks = loadTask();
    tasks.push({task}); 
    saveTask(tasks);
}

const saveTask = (task) => {
    const dataJson = JSON.stringify(task);
    fs.writeFileSync(filePath,dataJson);
}

const listTask = () =>{
   const list = loadTask();
   list.forEach( (element, index) => {
    console.log(`${index + 1} - ${element.task}`);
   });
}

const removeTask = (taskNumber) =>{
    const task = loadTask(); 
    const save = task.filter((element,index) => index != taskNumber - 1);
    saveTask(save);
}


if(command === "add"){
    addTask(argument);
} else if(command === "list"){
    listTask();
} else if(command === "remove"){
    removeTask(parseInt(argument));
} else{
    console.log("Command not found!");
}

