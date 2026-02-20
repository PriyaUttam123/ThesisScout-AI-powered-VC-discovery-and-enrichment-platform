import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">VC AI Scout</h1>
                    <p className="text-gray-600 text-center mb-6">
                        AI-powered VC discovery and enrichment platform.
                    </p>
                    <div className="flex justify-center">
                        <Routes>
                            <Route path="/" element={
                                <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100">
                                    <p className="text-indigo-700">Frontend is ready!</p>
                                </div>
                            } />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default App
