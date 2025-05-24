import {useState,useEffect} from 'react';
import './App.css';
import TodoList from './TodoList.jsx';
function App(){

  const [todoTitle,setTodoTitle]=useState('');
  const [todos,setTodo]=useState([]);

  useEffect(()=>{
    fetch('http://localhost:8080/tasks')
    .then(response=>response.json())
    .then(data=>{
      setTodo(data);
    })
    .catch(error=>console.error('Error fetching tasks:',error));
  },[]);
 

    const handleAdd=async ()=>{
      if(todoTitle.trim()!==''){
        try{
         const response=await fetch("http://localhost:8080/tasks",{
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify({
            title:todoTitle,
            completed:0
          })
         });
         if(!response.ok){
          throw new Error("Failed to add task");
         }
         const newTodo=await response.json();
         setTodo([...todos,newTodo]);
         setTodoTitle('');
        }
        catch(error){
          console.log("Error adding todo",error);
        }
      }
    }

    const handleDelete=async (id)=>{
        try{
          const response=await fetch(`http://localhost:8080/tasks/${id}`,{
            method:"DELETE",
            
          });
          if(!response.ok){
            throw new Error("failed to delete");
          }
          setTodo(todos.filter(todo=>todo.id!==id));
        }
        catch(error){
          console.log("Error deleting todo",error);
        }
    }

    const handleToggle =async (id)=>{
      try{
        const response=await fetch(`http://localhost:8080/tasks/${id}`,{
          method:"PUT",
        });
        if(!response.ok){
          throw new Error("Failed to update task");
         }
         const updatedTask = await response.json();
         setTodo(prevTodos =>
          prevTodos.map(todo =>
            todo.id === updatedTask.id ? updatedTask : todo
          )
        );
      }
      catch(error){
        console.log("Error updating todo",error);
      }
    }
    return(
    <>
     <div className="container">
      <h1>Todo Application</h1>
      <div className="taskInputSection">
        <input
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <TodoList todos={todos} handleDelete={handleDelete} handleToggle={handleToggle} />
    </div>
    </>
    );
}
export default App;