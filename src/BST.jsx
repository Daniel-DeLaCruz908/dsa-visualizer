import { useState, useRef, useEffect } from 'react'
import { buttonStyle } from './styles'

class BSTNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BST {
  constructor() {
    this.root = null
  }

  insert(value) {
    const newNode = new BSTNode(value)
    if (!this.root) {
      this.root = newNode
      return
    }
    let current = this.root
    while (true) {
      if (value < current.value) {
        if (current.left === null){
          current.left = newNode
          return
        }
        current = current.left
      } else {
        if (current.right === null) {
          current.right = newNode
          return
        }
        current = current.right
      }
    }
  }

  search(value) {
    let current = this.root
    while (current !== null) {
      if (value === current.value) return true
      if (value < current.value) {
        current = current.left
      } else {
        current = current.right
      }
    }
    return false
  }

  toArray() {
    const result = []

     function traverse(node) {
      if (node === null) return
      traverse(node.left)
      result.push(node.value)
      traverse(node.right)
     }

     traverse(this.root)
     return result
  }

  toLevels() {
    if (!this.root) return []
    const levels = []
    
    // store node and its position in the queue
    const queue = [{ node: this.root, position: 0 }]
    
    while (queue.length > 0) {
      const levelSize = queue.length
      const level = []
      
      for (let i = 0; i < levelSize; i++) {
        const { node, position } = queue.shift()
        
        // store value AND position
        level.push({ value: node.value, position })
        
        // left child position is 2 * parent position
        if (node.left) queue.push({ node: node.left, position: position * 2 })
        
        // right child position is 2 * parent position + 1
        if (node.right) queue.push({ node: node.right, position: position * 2 + 1 })
      }
      levels.push(level)
    }
    return levels
  }

  getSearchSteps(value) {
    const steps = []
    let current = this.root
    while (current !== null) {
      steps.push({ value: current.value, found: value === current.value })
      if (value === current.value) return steps
      if (value < current.value) {
        current = current.left
      } else {
        current = current.right
      }
    }
  }
}

function BSTVisualizer() {
    const [bstArray, setBstArray] = useState([10, 5, 15, 3])
    // stores the pixel position of each node
    const [nodePositions, setNodePositions] = useState({})
    // stores a ref for each node
    const nodeRefs = useRef({})
    const containerRef = useRef(null)
    const [highlightedNode, setHighlightNode] = useState(null)
    const [inputValue, setInputValue] = useState('')


    function buildBST(values) {
        const tree = new BST()
        values.forEach(value => tree.insert(value))
        return tree
      }
    
    function handleInsert() {
    setBstArray([...bstArray, Number(inputValue)])
    setInputValue('')
    }

    useEffect(() => {
    // small delay to let DOM render first
    setTimeout(() => {
        const positions = {}
        // get container's position on screen
        const containerRect = containerRef.current.getBoundingClientRect()
        
        Object.keys(nodeRefs.current).forEach(key => {
        const el = nodeRefs.current[key]
        if (el) {
            const rect = el.getBoundingClientRect()
            positions[key] = {
            // subtract container offset so coordinates are relative
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top
            }
        }
        })
        setNodePositions(positions)
    }, [bstArray])
    })

    function animateSearch() {
    const steps = buildBST(bstArray).getSearchSteps(Number(inputValue))
    steps.forEach((step, index) => {
        setTimeout(() => {
        setHighlightNode(step)
        }, index * 500)
    })
    setTimeout(() => setHighlightNode(null), steps.length * 500)
    }

    return (
        <div style={{ padding: '32px' }}>
          <h2 style={{ marginBottom: '16px' }}>Binary Search Tree</h2>
            <div ref={containerRef} style={{ position: 'relative' }}>
                {buildBST(bstArray).toLevels().map((level, levelIndex) => {
                // number of possible slots doubles each level (1, 2, 4, 8...)
                    const totalSlots = Math.pow(2, levelIndex)
                        
                    return (
                    <div key={levelIndex} style={{
                        display: 'flex',
                        justifyContent: 'space-around', // spread nodes evenly
                        margin: '8px 0',
                        width: '100%'
                    }}>
                        {Array.from({ length: totalSlots }, (_, i) => {
                        // find a node whose position matches this slot
                        const node = level.find(n => n.position % totalSlots === i)

                        return (
                            <div key={i} style={{ width: '40px', textAlign: 'center' }}>
                            {node !== undefined ? (
                                <div ref={el => nodeRefs.current[`${levelIndex}-${i}`] = el} 
                                style={{
                                border: `2px solid ${
                                highlightedNode?.value === node.value 
                                ? highlightedNode.found ? 'green' : 'yellow' 
                                : 'coral'
                                }`,
                                padding: '8px',
                                borderRadius: '4px',
                                display: 'inline-block'
                                }}>
                                {node.value}
                                </div>
                            ) : null}
                            </div>
                        )
                        })}
                    </div>
                    )
                })}
                
                <svg style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none' 
                }}>
                    {buildBST(bstArray).toLevels().map((level, levelIndex) => {
                    const totalSlots = Math.pow(2, levelIndex)
                    return level.map(node => {
                        const key = `${levelIndex}-${node.position % totalSlots}`
                        const leftKey = `${levelIndex + 1}-${(node.position * 2) % Math.pow(2, levelIndex + 1)}`
                        const rightKey = `${levelIndex + 1}-${(node.position * 2 + 1) % Math.pow(2, levelIndex + 1)}`
                        
                        const parent = nodePositions[key]
                        const left = nodePositions[leftKey]
                        const right = nodePositions[rightKey]
                        
                        return (
                        <g key={key}>
                            {parent && left && (
                            <line
                                x1={parent.x} y1={parent.y}
                                x2={left.x} y2={left.y}
                                stroke="coral" strokeWidth="1"
                            />
                            )}
                            {parent && right && (
                            <line
                                x1={parent.x} y1={parent.y}
                                x2={right.x} y2={right.y}
                                stroke="coral" strokeWidth="1"
                            />
                            )}
                        </g>
                        )
                    })
                    })}
                </svg>
                </div>

                <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                />
                <div style={{ padding: '32px' }}>
                <button style={buttonStyle} onClick={handleInsert}>Insert</button>
                <button style={buttonStyle} onClick={animateSearch}>Search</button>
                </div>
        </div>
    )
}

export default BSTVisualizer