import { useState } from 'react'
import { buttonStyle } from './styles'
import { colors } from './styles'

function SortingVisualizer() {
    function generateArray() {
    return Array.from({ length: 50 }, () => Math.floor(Math.random() * 290) + 10)
    }

    const [array, setArray] = useState(generateArray())
    const [comparing, setComparing] = useState([])
    const [isSorting, setIsSorting] = useState(false)

    function shuffleArray() {
    const shuffled = [...array].sort(() => Math.random() - 0.5)
    setArray(shuffled)
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

    return (
        <div style={{ padding: '32px' }}>
            <h2 style={{ marginBottom: '16px' }}>Binary & Insertion Sort</h2>
            <div style={{ whiteSpace: 'nowrap' }}>
            {array.map((value, index) => (
                <div key={index} style={{height: value, width: 20, backgroundColor: comparing.includes(index) ? colors.primary : colors.secondary, display: 'inline-block', verticalAlign: 'bottom'}}></div>
            ))} 
            </div>

            <div style={{ padding: '32px' }}>
                <button className="btn" style={buttonStyle} onClick={() => setArray(generateArray())} disabled={isSorting}>Shuffle</button>
                <button className="btn" style={buttonStyle} onClick={() => setArray(bubbleSort([...array]))} disabled={isSorting}>Sort</button>
                <button className="btn" style={buttonStyle} onClick={animateSort} disabled={isSorting}>Animate</button>
                <button className="btn" style={buttonStyle} onClick={animateInsertion} disabled={isSorting}>Animate Insertion</button>
            </div>
        </div>
    )
}

export default SortingVisualizer