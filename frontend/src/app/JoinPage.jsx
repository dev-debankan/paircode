import { useState } from "react"
import { useNavigate } from "react-router-dom"

function JoinPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")

  const handleJoin = (event) => {
    event.preventDefault()
    const nextUsername = username.trim()
    if (!nextUsername) return
    sessionStorage.setItem("username", nextUsername)
    navigate("/editor")
  }

  return (
    <main className="h-screen w-full bg-gray-950 flex gap-4 p-4 items-center justify-center">
      <form onSubmit={handleJoin} className="flex flex-col gap-4">
        <label className="sr-only" htmlFor="username">Your name</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          className="p-2 rounded-lg bg-gray-800 text-white"
          name="username"
          autoComplete="nickname"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <button className="p-2 rounded-lg bg-amber-50 text-gray-950 font-bold">
          Join
        </button>
      </form>
    </main>
  )
}

export default JoinPage
