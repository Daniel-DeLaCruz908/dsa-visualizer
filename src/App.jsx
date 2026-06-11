import { use, useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import SortingVisualizer from './SortingVisualizer'
import LinkedListVisualizer from './LinkedList'
import BSTVisualizer from './BST'
import GraphVisualizer from './Graph'

function App() {  

  return (
    <div>
      <h1>DSA Visualizer</h1>

      <SortingVisualizer />
      <LinkedListVisualizer />
      <BSTVisualizer />
      <GraphVisualizer />

    </div> 
    

  )
}

export default App
