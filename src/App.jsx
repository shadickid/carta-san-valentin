import "./components/valentine-card.jsx"
import './App.css'
import ValentineCard from "./components/valentine-card.jsx"
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
     <ValentineCard/>
     <Analytics />
    </>
  )
}

export default App
