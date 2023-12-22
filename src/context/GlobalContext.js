import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { db, auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword } from "firebase/auth"
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc, where } from "firebase/firestore"

import { nanoid } from "nanoid"

export const GlobalContext = createContext()

export const AppProvider = ({ children }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [input, setInput] = useState("")
    const [todos, setTodos] = useState([])

    const authUser = auth.currentUser
    const authName = auth?.currentUser?.displayName

    const navigate = useNavigate()
    
    const todosCollectionRef = collection(db, "todos")

    const addTodo = async (e) => {
        e.preventDefault()
        if(input.trim() !== "") {
        const todoData = {
            text: input,
            completed: false,
        }

        if(auth.currentUser) {
            todoData.userId = auth.currentUser.uid
        } else {
            todoData.id = nanoid()
        }

        await addDoc(todosCollectionRef, todoData)
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
        let unsubscribe

        if(auth.currentUser) {
        const q = query(todosCollectionRef, where("userId", "==", auth.currentUser.uid))
        unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArray = []
            querySnapshot.forEach((doc) => {
            todosArray.push({...doc.data(), id: doc.id})
            })
    
            setTodos(todosArray)
        })
        } else {
        const q = query(todosCollectionRef)
        unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArray = []
            querySnapshot.forEach((doc) => {
            todosArray.push({...doc.data(), id: doc.id})
            })
    
            setTodos(todosArray)
        })
        }

        return () => {
        if(unsubscribe) {
            unsubscribe()
        }
        }
    }, [todosCollectionRef])

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
        navigate("/", { replace: true })
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
        navigate("/", { replace: true })
        } catch(err) {
        console.error(err)
        }
    }

    const logout = async () => {
        try {
        await signOut(auth)
        navigate("/login", { replace: true })
        } catch(err) {
        console.error(err)
        }
    }

    const navigateToLoginPage = () => {
        navigate("/login", { replace: true })
    }

    return (
        <GlobalContext.Provider 
            value={{ input, setInput, todos, addTodo, logout, navigateToLoginPage, authUser, authName, deleteTodo, toggleComplete, name, setName, email, setEmail, password, setPassword, onSubmit, login }}>
            {children}
        </GlobalContext.Provider>
    )
}