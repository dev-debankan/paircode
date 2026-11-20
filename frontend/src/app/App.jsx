import "./App.css"
import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LandingPage from "./LandingPage.jsx"
import JoinPage from "./JoinPage.jsx"

const EditorWorkspace = lazy(() => import("./EditorWorkspace.jsx"))

function ProtectedEditor() {
  return sessionStorage.getItem("username") ? (
    <Suspense fallback={<main className="editor-loading">Loading editor…</main>}>
      <EditorWorkspace />
    </Suspense>
  ) : (
    <Navigate to="/join" replace />
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/editor" element={<ProtectedEditor />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
