import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';

const App: React.FC = () => {
    return (
        <Router>
            <div className="container mx-auto">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;