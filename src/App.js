import { Routes, Route, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import Login from "./pages/Login"
import Todos from "./pages/Todos"

import { db, auth } from "./config/firebase"
import { createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword } from "firebase/auth"
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore"

const App = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [input, setInput] = useState("")
  const [todos, setTodos] = useState([])

  const navigate = useNavigate()
  
  const todosCollectionRef = collection(db, "todos")

  const addTodo = async (e) => {
    e.preventDefault()
    if(input.trim() !== "") {
      await addDoc(todosCollectionRef, {
        text: input,
        completed: false
      })
      setInput("")
    }

  }

  const deleteTodo = async (id) => {
    await deleteDoc(doc(todosCollectionRef, id))
  }

  const toggleComplete = async (todo) => {
    await updateDoc(doc(todosCollectionRef, todo.id), {
      completed: !todo.completed
    })
  }

  // to read data
  useEffect(() => {
    const q = query(todosCollectionRef)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArray = []
      querySnapshot.forEach((doc) => {
        todosArray.push({...doc.data(), id: doc.id})
      })

      setTodos(todosArray)
    })

    return () => unsubscribe()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, {
        displayName: name
      })
      setName("")
      setEmail("")
      setPassword("")
      navigate("/")
    } catch(err) {
      console.error(err)
    }
  }

  const login = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      await updateProfile(user, {
        displayName: name
      })
      setName("")
      setEmail("")
      setPassword("")
      navigate("/")
    } catch(err) {
      console.error(err)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      navigate("/login")
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Todos todos={todos} input={input} authName={auth?.currentUser?.displayName} setInput={setInput} addTodo={addTodo} deleteTodo={deleteTodo} toggleComplete={toggleComplete} logout={logout}/>}/>
        <Route path="/login" element={<Login name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} onSubmit={onSubmit} login={login}/>}/>
      </Routes>
    </>
  )
}

export default App
