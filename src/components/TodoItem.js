import { LiaTimesSolid } from "react-icons/lia";

import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react"

const TodoItem = ({ todo }) => {
  const { deleteTodo, toggleComplete } = useContext(GlobalContext)

  return (
    <li className={`flex items-center justify-between bg-zinc-100 ${todo.completed ? "bg-zinc-300" : ""} mb-2 py-3 px-3`}>
        <div className="flex items-center gap-2 w-4/5">
            <input type="checkbox" onChange={() => toggleComplete(todo)} checked={todo.completed ? "checked" : ""} id={todo.id} className="cursor-pointer"/>
            <label htmlFor={todo.id} onClick={() => toggleComplete(todo)} className={`cursor-pointer break-words ${todo.completed ? "line-through text-indigo-700" : ""}`}>{todo.text}</label>
        </div>
        <LiaTimesSolid size={30} className="text-indigo-700 cursor-pointer hover:text-indigo-800 transition-colors duration-150 ease-in-out" onClick={() => deleteTodo(todo.id)}/>
    </li>
  )
}

export default TodoItem