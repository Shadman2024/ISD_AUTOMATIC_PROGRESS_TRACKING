import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

import CourseContentPage from './pages/CourseContentPage';
import StudentDashboard from './pages/StudentDashboard';
import MyLearning from './pages/MyLearning';
import HomePage from './pages/HomePage';

import PerformanceOverview from './pages/PerformanceOverview';
import PerformanceStudents from './pages/PerformanceStudents';
import PerformanceEngagement from './pages/PerformanceEngagement';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/student/course/:courseId" element={<CourseContentPage />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/my-learning" element={<MyLearning />} />
                 
                <Route path="/instructor/dashboard" element={<PerformanceOverview />} />
                <Route path="/instructor/overview" element={<PerformanceOverview />} />
                <Route path="/instructor/students" element={<PerformanceStudents />} />
                <Route path="/instructor/engagement" element={<PerformanceEngagement />} />
                                
            </Routes>
        </BrowserRouter>
    );
}




export default App;