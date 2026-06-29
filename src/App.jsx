import { use, useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import SortingVisualizer from './SortingVisualizer'
import LinkedListVisualizer from './LinkedList'
import BSTVisualizer from './BST'
import GraphVisualizer from './Graph'
import { colors } from './styles'
import Home from './Home'
import DynamicProgramming from './DynamicProgramming'

function App() { 
  const [activeTab, setActiveTab] = useState('home') 

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background, color: colors.text, display: 'flex', flexDirection: 'column' }}>

      <nav style={{
        backgroundColor: colors.surface,
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ color: colors.text, margin: 0, fontSize: '20px' }}>DSA Visualizer</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['home', 'sorting', 'linkedlist', 'bst', 'graph', 'DP'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: activeTab === tab ? colors.primary : 'transparent',
                color: colors.text,
                border: 'none',
                padding: '8px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {tab === 'linkedlist' ? 'Linked List' : tab === 'bst' ? 'BST' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '48px'  }}>
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
        {activeTab === 'sorting' && <SortingVisualizer />}
        {activeTab === 'linkedlist' && <LinkedListVisualizer />}
        {activeTab === 'bst' && <BSTVisualizer />}
        {activeTab === 'graph' && <GraphVisualizer />}
        {activeTab === 'DP' && <DynamicProgramming />}
      </div>

    </div> 
    

  )
}

export default App
