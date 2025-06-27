import React, { useState } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import CourseDetail from './components/CourseDetail';
import StudentArea from './components/StudentArea';
import Calendar from './components/Calendar';
import Chat from './components/Chat';
import Alerts from './components/Alerts';
import WatchCourse from './components/WatchCourse';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedCourse(null);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setCurrentPage('course-detail');
  };

  const handleEnroll = () => {
    if (selectedCourse && !enrolledCourses.find(c => c.id === selectedCourse.id)) {
      setEnrolledCourses([...enrolledCourses, selectedCourse]);
    }
    // Simular redirecionamento para área do aluno ou início do curso
    alert('Inscrição realizada com sucesso!');
  };

  const handleStartCourse = () => {
    setCurrentPage('watch-course');
  };

  const handleBackToHome = () => {
    setSelectedCourse(null);
    setCurrentPage('home');
  };

  const handleBackToCourseDetail = () => {
    setCurrentPage('course-detail');
  };

  const isEnrolled = selectedCourse && enrolledCourses.find(c => c.id === selectedCourse.id);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        notifications={3}
      />
      
      <main>
        {currentPage === 'home' && (
          <Home onCourseSelect={handleCourseSelect} />
        )}
        
        {currentPage === 'course-detail' && selectedCourse && (
          <CourseDetail
            course={selectedCourse}
            onBack={handleBackToHome}
            onEnroll={handleEnroll}
            onStartCourse={handleStartCourse}
            isEnrolled={isEnrolled}
          />
        )}
        
        {currentPage === 'student' && (
          <StudentArea />
        )}
        
        {currentPage === 'calendar' && (
          <Calendar />
        )}
        
        {currentPage === 'chat' && (
          <Chat />
        )}
        
        {currentPage === 'alerts' && (
          <Alerts />
        )}
        
        {currentPage === 'watch-course' && selectedCourse && (
          <WatchCourse
            course={selectedCourse}
            onBack={handleBackToCourseDetail}
          />
        )}
      </main>
    </div>
  );
}

export default App;

