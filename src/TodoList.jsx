import Todo from './Todo.jsx'
function TodoList({todos,handleDelete,handleToggle}){
    return(
    <>
    {
        todos.map((todo,index)=>(
         <Todo key={index} todo={todo} handleDelete={handleDelete} onToggle={handleToggle}/>
        ))
    }
    </>
    );
}
export default TodoList;