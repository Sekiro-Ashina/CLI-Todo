const fs = require("fs");
const filePath = "./task.json";

const command = process.argv[2];
const argument = process.argv[3];



//In oreder to add task you need to first load the task and loading will happen from json file.

  const loadTask = () =>{
    try{     // Since we are reading files the error might occur.
        const buffer = fs.readFileSync(filePath); //you can read file async but there is nothing name exactly as readFileAsync its only readFile means this and async method, but here we are deliberately going with sync cause we dont want to move if we cant read the file. 
        const dataJson = buffer.toString(); //the data json is the actual data of argument
        return JSON.parse(dataJson);
    }
    catch(error){
        return [];
    }
  }

  

const addTask = (task) => {
    const tasks = loadTask();
    tasks.push({task}); // this just pushed the task into the array now you need to save it to.
    saveTask(tasks);
}

const saveTask = (task) => {
    const dataJson = JSON.stringify(task); //why again converting to JSON?
    fs.writeFileSync(filePath,dataJson);
}

const listTask = () =>{
   const list = loadTask();
   list.forEach( (element, index) => {
    console.log(`${index + 1} - ${element.task}`);
   });
}

const removeTask = (taskNumber) =>{
    const task = loadTask(); // you have to load task for removing too? what will happen to the argument that has been passed by the removeTask() in if else.
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

