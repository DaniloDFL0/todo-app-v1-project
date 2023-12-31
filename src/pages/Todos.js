import TodoItem from "../components/TodoItem"

import { GlobalContext } from "../context/GlobalContext"
import { useContext } from "react"

const Todos = () => {
  const { todos, input, setInput, addTodo, logout, navigateToLoginPage, authUser, authName } = useContext(GlobalContext)

  return (
    <div className="relative flex justify-center top-52">
        <div className="w-[400px] bg-white rounded-xl">
            <div className="p-3">
                <h1 className="text-3xl text-center font-semibold">Todo App</h1>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg flex-wrap">User: {authName}</h2>
                    {authUser ? <button onClick={logout} className="text-lg bg-indigo-700 text-white py-2 px-3 mt-5 rounded-sm font-semibold hover:bg-indigo-800 transition-colors duration-150 ease-in-out">Logout</button>
                    : <button onClick={navigateToLoginPage} className="text-lg bg-indigo-700 text-white py-2 px-3 mt-5 rounded-sm font-semibold hover:bg-indigo-800 transition-colors duration-150 ease-in-out">Log In</button>}
                </div>
            </div>
            <form className="p-3 text-wrap" onSubmit={(e) => addTodo(e)}>
                <div className="mt-2">
                    <input type="text" placeholder="Add Task" value={input} onChange={(e) => setInput(e.target.value)} className="pt-[0.5rem] pb-[0.4rem] font-semibold px-3 w-2/3 focus:outline-none border border-slate-200 cursor-pointer rounded-tl-full rounded-bl-full focus:border-indigo-700 transition-colors duration-150 ease-in-out"/>
                    <button className="text-lg bg-indigo-700 text-white py-[0.4rem] font-semibold px-2 w-1/3 hover:bg-indigo-800 transition-colors duration-150 ease-in-out">Add task</button>
                </div>
            </form>
            <div className="py-3">
                <ul className="px-2 w-full">
                    {todos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo}/>
                    ))}
                </ul>
            </div>
            <h2 className="text-xl text-center pb-2">You've got {todos.length} {todos.length > 1 ? "todos" : todos.length === 0  ? "todos" : todos.length === 1 && "todo"}</h2>
        </div>
    </div>
  )
}

export default Todos