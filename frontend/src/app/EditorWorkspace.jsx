import { Editor } from "@monaco-editor/react"
import { MonacoBinding } from "y-monaco"
import { useRef, useMemo, useState, useEffect } from "react"
import * as Y from "yjs"
import { SocketIOProvider } from "y-socket.io"

function EditorWorkspace() {
  const editorRef = useRef(null)
  const providerRef = useRef(null)
  const bindingRef = useRef(null)
  const [username] = useState(() => sessionStorage.getItem("username") || "")
  const [users, setUsers] = useState([])
  const [connectionStatus, setConnectionStatus] = useState("disconnected")

  const ydoc = useMemo(() => new Y.Doc(), [])
  const yText = useMemo(() => ydoc.getText("monaco"), [ydoc])

  const handleMount = (editor) => {
    editorRef.current = editor

    const provider = providerRef.current
    const model = editor.getModel()
    if (provider && model && !bindingRef.current) {
      bindingRef.current = new MonacoBinding(
        yText,
        model,
        new Set([editor]),
        provider.awareness,
      )
    }
  }

  useEffect(() => {
    if (!username) return

    const serverUrl = `${window.location.protocol}//${window.location.hostname}:3000`
    const provider = new SocketIOProvider(serverUrl, "monaco", ydoc, {
      autoConnect: false,
    })
    providerRef.current = provider
    provider.awareness.setLocalStateField("user", { username })

    const updateUsers = () => {
      const states = Array.from(provider.awareness.getStates().values())
      setUsers(
        states
          .filter((state) => state.user?.username)
          .map((state) => state.user),
      )
    }
    const handleStatus = ({ status }) => setConnectionStatus(status)
    const handleConnectionError = (error) => {
      setConnectionStatus("error")
      console.error("Collaboration connection failed:", error)
    }

    provider.awareness.on("change", updateUsers)
    provider.on("status", handleStatus)
    provider.on("connection-error", handleConnectionError)
    updateUsers()

    const editor = editorRef.current
    const model = editor?.getModel()
    if (editor && model && !bindingRef.current) {
      bindingRef.current = new MonacoBinding(
        yText,
        model,
        new Set([editor]),
        provider.awareness,
      )
    }

    provider.connect()

    return () => {
      provider.awareness.off("change", updateUsers)
      provider.off("status", handleStatus)
      provider.off("connection-error", handleConnectionError)
      bindingRef.current?.destroy()
      bindingRef.current = null
      provider.destroy()
      providerRef.current = null
      setUsers([])
      setConnectionStatus("disconnected")
    }
  }, [username, yText, ydoc])

  return (
    <main className="h-screen w-full bg-gray-950 flex gap-4 p-4">
      <aside className="h-full w-1/4 bg-amber-50 rounded-lg">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-300">Users</h2>
        <p className="px-4 pt-3 text-sm text-gray-600" role="status">
          Collaboration: {connectionStatus}
        </p>
        <ul className="p-4">
          {users.map((user, index) => (
            <li key={index} className="p-2 bg-gray-800 text-white rounded mb-2">
              {user.username}
            </li>
          ))}
        </ul>
      </aside>
      <section className="w-3/4 bg-neutral-800 rounded-lg overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          theme="vs-dark"
          onMount={handleMount}
        />
      </section>
    </main>
  )
}

export default EditorWorkspace
