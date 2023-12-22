import { GlobalContext } from "../context/GlobalContext"
import { useContext } from "react"

const Login = () => {
  const { name, setName, email, setEmail, password, setPassword, onSubmit, login } = useContext(GlobalContext)

  return (
    <div className="relative flex justify-center top-52">
      <div className="w-[400px] bg-white px-6 py-3 rounded-xl">
        <h1 className="text-3xl font-semibold mb-8">Create Account</h1>
        <form className="w-full" onSubmit={(e) => onSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="nameInput" className="block mb-2 text-lg text-slate-500 font-medium">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="nameInput" placeholder="Full Name (required)" required autoComplete="off" className="w-full rounded-lg py-3 px-3 text-lg font-normal focus:outline-none border border-slate-200 cursor-pointer focus:border-indigo-700 transition-colors duration-150 ease-in-out"/>
          </div>
          <div className="mb-4">
            <label htmlFor="emailInput" className="block mb-2 text-lg text-slate-500 font-medium">Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="emailInput" placeholder="Email Address (required)" required autoComplete="off" className="w-full rounded-lg py-3 px-3 text-lg font-normal focus:outline-none border border-slate-200 cursor-pointer focus:border-indigo-700 transition-colors duration-150 ease-in-out"/>
          </div>
          <div>
            <label htmlFor="passwordInput" className="block mb-2 text-lg text-slate-500 font-medium">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="passwordInput" placeholder="Password (required)" required autoComplete="off" className="w-full rounded-lg py-3 px-3 text-lg font-normal focus:outline-none border border-slate-200 cursor-pointer focus:border-indigo-700 transition-colors duration-150 ease-in-out"/>
          </div>
          <button className="text-lg bg-indigo-700 text-white py-3 w-full mt-5 rounded-lg font-semibold hover:bg-indigo-800 transition-colors duration-150 ease-in-out">Sign In</button>
          <p className="text-md mt-2 font-semibold text-slate-500">Already have an account? <span onClick={login} className="text-indigo-600 hover:text-indigo-800 transition-colors duration-150 ease-in-out cursor-pointer">Log In</span></p>
        </form>
      </div>
    </div>
  )
}

export default Login