import { useState } from 'react'

class Graph {
  constructor() {
    this.adjacencyList = {}
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = []
    }
  }

  addEdge(a, b) {
    this.addVertex(a)
    this.addVertex(b)
    this.adjacencyList[a].push(b)
    this.adjacencyList[b].push(a)
  }

  bfs(start) {
    const visited = {}
    const queue = [start]
    const result = []

    visited[start] = true
     
    while (queue.length > 0) {
      const node = queue.shift()
      result.push(node)
      this.adjacencyList[node].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          queue.push(neighbor)
        }
      })
    }

    return result
  }

  dfs(start) {
    const visited = {}
    const stack = [start]
    const result = []

    visited[start] = true
     
    while (stack.length > 0) {
      const node = stack.pop()
      result.push(node)
      this.adjacencyList[node].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          stack.push(neighbor)
        }
      })
    }

    return result
  }
}

function GraphVisualizer() {
    const [graphData, setGraphData] = useState({
    vertices: ['A', 'B', 'C', 'D', 'E'],
    edges: [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'D'], ['D', 'E']
    ]
    })
    const [visitedNodes, setVisitedNodes] = useState([])

    function getNodePosition(index, total, radius = 150, cx = 250, cy = 250) {
        const angle = (index / (total)) * Math.PI * 2
        return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius
        }
    }

    function animateBFS() {
        const graph = new Graph()
        graphData.vertices.forEach(vertex => graph.addVertex(vertex))
        graphData.edges.forEach(([a, b]) => graph.addEdge(a, b))

        const steps = graph.bfs('A')
        steps.forEach((node, index) => {
        setTimeout(() => {
            setVisitedNodes(prev => [...prev, node])
        }, index * 500)
        })

        setTimeout(() => setVisitedNodes([]), steps.length * 500)
    }

    function animateDFS() {
        const graph = new Graph()
        graphData.vertices.forEach(vertex => graph.addVertex(vertex))
        graphData.edges.forEach(([a, b]) => graph.addEdge(a, b))

        const steps = graph.dfs('A')
        steps.forEach((node, index) => {
        setTimeout(() => {
            setVisitedNodes(prev => [...prev, node])
        }, index * 500)
        })

        setTimeout(() => setVisitedNodes([]), steps.length * 500)
    }

    return (
        <div>
            <div>
                <h2>Graph</h2>
                <svg width="500" height="500">
                {graphData.edges.map(([a, b], index) => {
                    const positionA= getNodePosition(graphData.vertices.indexOf(a), graphData.vertices.length)
                    const positionB= getNodePosition(graphData.vertices.indexOf(b), graphData.vertices.length)
                    return (
                    <line
                        key={index}
                        x1={positionA.x} y1={positionA.y}
                        x2={positionB.x} y2={positionB.y}
                        stroke="black"
                        strokeWidth="2"
                    />
                    )
                })}

                {graphData.vertices.map((vertex, index) => {
                    const position = getNodePosition(index, graphData.vertices.length)
                    return (
                    <g key={vertex}> 
                        <circle
                        cx={position.x} cy={position.y}
                        r="20"
                        fill={visitedNodes.includes(vertex) ? 'yellow' : 'steelblue'}
                        stroke="black"
                        strokeWidth="2"
                        />
                        <text
                        x={position.x} y={position.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="16"
                        fontWeight="bold"
                        >
                        {vertex}
                        </text>
                    </g>
                    )
                })} 
                </svg>
            </div>

            <button onClick={animateBFS}>BFS</button>
            <button onClick={animateDFS}>DFS</button>
        </div>
    )
}

export default GraphVisualizer