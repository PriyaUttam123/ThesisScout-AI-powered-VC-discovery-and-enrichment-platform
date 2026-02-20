import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Companies from './pages/Companies';
import Lists from './pages/Lists';
import SavedSearches from './pages/SavedSearches';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/companies" replace />} />
                    <Route path="/companies" element={<Companies />} />
                    <Route path="/lists" element={<Lists />} />
                    <Route path="/saved" element={<SavedSearches />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
