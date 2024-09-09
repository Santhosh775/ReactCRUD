import React, { useEffect, useState } from "react"
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constant";

const App = () => {
  const [input,setInput] = useState("");
  const [tasks,setTasks] = useState([]);
  const [updateUI,setUpdateUI] = useState(false);
  const [updateId,setUpdateId] = useState(null)

  useEffect(()=>{
    axios.get(`${baseURL}/get`)
    .then((res)=>{
      console.log(res.data);
      setTasks(res.data)
    }).catch((err) =>{
      console.log(err);
    })
  },[updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`,{task:input})
    .then((res) => { 
      console.log(res.data);
      setInput("")
      setUpdateUI((prevState)=> !prevState)
  }).catch((err) =>{
    console.log(err);
  })  
};

const updateMode = (id,text) => {
  console.log(text);
  setInput(text)
  setUpdateId(id)
};

const updateTask = () =>{
  axios.put(`${baseURL}/update/${updateId}`,{task:input}).then((res) =>{
    console.log(res.data);
    setUpdateUI((prevState) => !prevState)
    setUpdateId(null)
    setInput("")
  }).catch((err)=>{
    console.log(err);
  })
}
  return(
    <main>
      <div className='crud'>
        <h1 className='title'>CRUD OPERATIONS</h1>
        <div className='input_holder'>
          <input type="text" 
          value={input} 
          onChange={(e)=>setInput(e.target.value)}/>
          <button type="submit" onClick={updateId ? updateTask : addTask}>
            {updateId ? "Update Task" : "Add Task"}
          </button>
          <ul>
            {tasks.map((task) =>( 
              <List 
              key = {task._id} 
              id = {task._id} 
              task = {task.task} 
              setUpdateUI={setUpdateUI}
              updateMode={updateMode}
              />
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;
