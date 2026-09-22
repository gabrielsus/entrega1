import { useState } from 'react'
import Header from './components/header.jsx'
import './App.css'
import Layout from './components/layout.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout />
    </>
  )
}

export default App
