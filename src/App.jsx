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
  const [activeTab, setActiveTab] = useState('sorting') 

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fef9ef', color: 'black' }}>

      <nav style={{
        backgroundColor: '#227c9d',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ color: 'black', margin: 0, fontSize: '20px' }}>DSA Visualizer</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['sorting', 'linkedlist', 'bst', 'graph'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: activeTab === tab ? '#ffcb77' : 'transparent',
                color: 'black',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {tab === 'linkedlist' ? 'Linked List' : tab === 'bst' ? 'BST' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ padding: '32px' }}>
        {activeTab === 'sorting' && <SortingVisualizer />}
        {activeTab === 'linkedlist' && <LinkedListVisualizer />}
        {activeTab === 'bst' && <BSTVisualizer />}
        {activeTab === 'graph' && <GraphVisualizer />}
      </div>

    </div> 
    

  )
}

export default App
