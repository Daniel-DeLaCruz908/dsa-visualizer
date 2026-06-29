import { useState } from 'react'
import { buttonStyle } from './styles'
import { colors } from './styles'

function DynamicProgramming () {
    const [inputValue, setInputValue] = useState('')
    const [currentMemo, setCurrentMemo] = useState({})

    function fib(n) {
        if (n === 0 || n === 1) {
            return n
        } else { return fib(n-1) + fib(n-2) }
    }

    function getFibSteps(n) {
        const steps = []
        const memo = {}

        function fibMemo(n, memo = {}) {
            if (n in memo) return memo[n]
            if (n === 0 || n === 1) {
                memo[n] = n
                steps.push({...memo})
                return n
            }

            const result = fibMemo(n-1) + fibMemo(n-2)
            memo[n] = result
            steps.push({...memo})
            return result
        }

        fibMemo(n)
        return steps
    }

    function animateFib() {
        const steps = getFibSteps(Number(inputValue))
        steps.forEach((step, index) => {
            setTimeout(() => {
                setCurrentMemo(step)
            }, index * 300)
        })
    }

    return (
        <div style={{ padding: '32px' }}>
            <h2 style={{ marginBottom: '16px' }}>Dynamic Programming</h2>

            <div>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div style={{ padding: '32px' }}><button className="btn" style={buttonStyle} onClick={animateFib}>Calculate</button></div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
                {Object.entries(currentMemo).map(([key, value]) => (
                    <div key={key} style={{
                    border: `2px solid ${colors.secondary}`,
                    borderRadius: '4px',
                    padding: '8px',
                    textAlign: 'center',
                    minWidth: '60px'
                    }}>
                    <div style={{ color: colors.textMuted, fontSize: '12px' }}>fib({key})</div>
                    <div style={{ fontWeight: 'bold' }}>{value}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DynamicProgramming