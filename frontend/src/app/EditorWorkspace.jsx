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
    <main className="workspace-page">
      <section className="workspace-window" aria-label="Paircode shared playground">
        <header className="workspace-titlebar">
          <div className="workspace-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span className="workspace-title">paircode / playground</span>
          <span className={`workspace-live workspace-live-${connectionStatus}`}>
            <i aria-hidden="true" />
            {connectionStatus === "connected" ? "Live" : connectionStatus}
          </span>
        </header>

        <div className="workspace-tab">
          <span className="workspace-language-mark">JS</span>
          <span>index.js</span>
          <span className="workspace-unsaved" aria-hidden="true">●</span>
        </div>

        <section className="workspace-editor">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue="// Start coding together"
            theme="paircode"
            onMount={handleMount}
            beforeMount={(monaco) => {
              monaco.editor.defineTheme("paircode", {
                base: "vs-dark",
                inherit: true,
                rules: [
                  { token: "comment", foreground: "8995A8" },
                  { token: "keyword", foreground: "C6A7F7" },
                  { token: "string", foreground: "A8D7A1" },
                  { token: "number", foreground: "E8D28A" },
                ],
                colors: {
                  "editor.background": "#0B111C",
                  "editor.foreground": "#D3DAE5",
                  "editorLineNumber.foreground": "#566174",
                  "editorLineNumber.activeForeground": "#AAB4C3",
                  "editorCursor.foreground": "#FF9A79",
                  "editor.selectionBackground": "#26354D",
                  "editor.inactiveSelectionBackground": "#1D2A3C",
                  "editorIndentGuide.background1": "#1B2637",
                  "editorIndentGuide.activeBackground1": "#344156",
                  "editorWidget.border": "#A5B5CD",
                },
              })
            }}
            options={{
              automaticLayout: true,
              fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 13,
              lineHeight: 22,
              minimap: { enabled: false },
              padding: { top: 18, bottom: 18 },
              overviewRulerBorder: false,
              renderLineHighlight: "line",
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              tabSize: 2,
            }}
          />
        </section>

        <footer className="workspace-statusbar">
          <span className="workspace-collaborators" role="status">
            <i aria-hidden="true" />
            {users.length} collaborator{users.length === 1 ? "" : "s"}
            {users.length > 0 && (
              <span className="workspace-usernames">
                {users.map((user) => user.username).join(", ")}
              </span>
            )}
          </span>
          <span>JavaScript</span>
        </footer>
      </section>
    </main>
  )
}

export default EditorWorkspace
