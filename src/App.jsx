import { use, useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

class ListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
    constructor() {
      this.head = null
    }

    append(value) {
      const newNode = new ListNode(value)

      if (!this.head) {
        this.head = newNode
      }
      else {
        let current = this.head
        while (current.next !== null) {
          current = current.next
        }
        current.next = newNode
      }
    }

    prepend(value) {
      const newNode = new ListNode(value)
      newNode.next = this.head
      this.head = newNode
    }

    delete(value) {
      if (this.head.value === value) {
        this.head = this.head.next
        return
      }
      let current = this.head
      while (current.next !== null) {
        if (current.next.value === value) {
          current.next = current.next.next
          return
        }
        current = current.next
      }
    }

    toArray() {
      const result = []
      let current = this.head
        while (current !== null) {
          result.push(current.value)
          current = current.next
        }

      return result
    }
  }

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
}

function App() {
  const [array, setArray] = useState(generateArray())
  const [comparing, setComparing] = useState([])
  const [isSorting, setIsSorting] = useState(false)
  const [listArray, setListArray] = useState([10,20,30])
  const [inputValue, setInputValue] = useState('')
  const [bstArray, setBstArray] = useState([10, 5, 15, 3])
  // stores the pixel position of each node
  const [nodePositions, setNodePositions] = useState({})
  // stores a ref for each node
  const nodeRefs = useRef({})
  const containerRef = useRef(null)

  function shuffleArray() {
    const shuffled = [...array].sort(() => Math.random() - 0.5)
    setArray(shuffled)
  }

  function generateArray() {
  return Array.from({ length: 50 }, () => Math.floor(Math.random() * 290) + 10)
  }

  function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j+1]) {
          let temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;
        }
      }
    }
    return arr
  }

  function getBubbleSortSteps(arr) {
    const steps = []
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j+1]) {
          let temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;

          const step = {
            array: [...arr],
            comparing: [j, j+1]
          }

          steps.push(step);
        }
      }
    }
    return steps
  }

  function insertionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      let current = arr[i]
      let j = i - 1
      while (j >= 0 && arr[j] > current) {
        arr[j + 1] = arr[j]
        j--
      }
      arr[j + 1] = current
    }
    return arr
  }

  function getInsertionSortSteps(arr) {
    const steps = []
    for (let i = 0; i < arr.length; i++) {
      let current = arr[i]
      let j = i - 1
      while (j >= 0 && arr[j] > current) {
        arr[j + 1] = arr[j]
        steps.push({ array: [...arr], comparing: [j, j+1]})
        j--
      }
      arr[j + 1] = current

      steps.push({array: [...arr], comparing: [i, j+1]})
      }
    return steps
  }

  function animateSort() {
    setIsSorting(true)
    const steps = getBubbleSortSteps([...array])
    steps.forEach((step, index) => {
      setTimeout(() => {
        setArray(step.array)
        setComparing(step.comparing)
      }, index * 200)
    })

    setTimeout(() => {
      setComparing([])
      setIsSorting(false)
    }, steps.length * 200)
  }

  function animateInsertion() {
    setIsSorting(true)
    const steps = getInsertionSortSteps([...array])
    steps.forEach((step, index) => {
      setTimeout(() => {
        setArray(step.array)
        setComparing(step.comparing)
      }, index * 200)
    })

    setTimeout(() => {
      setComparing([])
      setIsSorting(false)
    }, steps.length * 200)
  }

  function handleAppend() {
    const list = new LinkedList()
    listArray.forEach(value => list.append(value))
    list.append(Number(inputValue))
    setListArray(list.toArray())
    setInputValue('')
  }

  function handlePrepend() {
    const list = new LinkedList()
    listArray.forEach(value => list.prepend(value))
    list.prepend(Number(inputValue))
    setListArray(list.toArray())
    setInputValue('')
  }

  function handleDelete() {
    if (!listArray.includes(Number(inputValue))) {
      alert('Value not found in list')
      return
    }
    const list = new LinkedList()
    listArray.forEach(value => list.append(value))
    list.delete(Number(inputValue))
    setListArray(list.toArray())
    setInputValue('')
  }

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

  return (
    <div>
      <h1>DSA Visualizer</h1>

      <div>
      {array.map((value, index) => (
          <div key={index} style={{height: value, width: 20, backgroundColor: comparing.includes(index) ? 'red' : 'steelblue', display: 'inline-block', verticalAlign: 'bottom'}}></div>
      ))} 
      </div>

      <div>
      <button onClick={() => setArray(generateArray())} disabled={isSorting}>Shuffle</button>
      <button onClick={() => setArray(bubbleSort([...array]))} disabled={isSorting}>Sort</button>
      <button onClick={animateSort} disabled={isSorting}>Animate</button>
      <button onClick={animateInsertion} disabled={isSorting}>Animate Insertion</button>
      </div>

      <div>
      {listArray.map((value, index) => (
        <span key={index}>
          <div style={{
            display: 'inline-block',
            border: '2px solid steelblue',
            padding: '8px',
            borderRadius: '4px',
            margin: '4px'
          }}>
            {value}
          </div>
          {index < listArray.length - 1 ? '→' : '→ null'}
        </span>
      ))}

      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={handleAppend}>Append</button>
      <button onClick={handlePrepend}>Prepend</button>
      <button onClick={handleDelete}>Delete</button>
      </div>


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
                        border: '2px solid coral',
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
      <button onClick={handleInsert}>Insert</button>

    </div>
  )
}

export default App
