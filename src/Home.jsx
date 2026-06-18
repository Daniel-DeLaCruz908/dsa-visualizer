import { colors, buttonStyle } from './styles'

function Home({ setActiveTab }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '80vh',textAlign: 'center', maxWidth: '600px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Data Structures & Algorithms Visualizer</h1>
            <p style={{ color: colors.textMuted, marginBotton: '16px', padding: '16px'}}>
                Sorting, linked lists, binary search trees, and graphs visualized all in one place. This tool helps you see how data structures and algorithms work.
            </p>
            <div style={{ padding: '16px' }}>
                <button className="btn" style={buttonStyle} onClick={() => setActiveTab('sorting')}>Get Started</button>
            </div>
        </div>
    )
}

export default Home