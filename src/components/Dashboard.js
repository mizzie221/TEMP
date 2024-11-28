import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Import Calendar
import 'react-calendar/dist/Calendar.css'; // Import Calendar styles
import '../styles/Dashboard.css'; 
import Home from './Home';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSignedOut, setIsSignedOut] = useState(false);
  const [workoutDates, setWorkoutDates] = useState([]); // Track workout dates
  const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date on calendar

  const signOut = () => {
    setIsSignedOut(true);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDateClick = (date) => {
    const dateString = date.toDateString();
    if (!workoutDates.includes(dateString)) {
      setWorkoutDates([...workoutDates, dateString]);
    } else {
      setWorkoutDates(workoutDates.filter((d) => d !== dateString));
    }
  };

  if (isSignedOut) {
    return <Home />;
  }

  return (
    <div>
      {/* Header Section */}
      <header className="home-header">
        <h1 className="main-title">Fitness Tracker</h1>
        <nav>
          <button className="signout" onClick={signOut}>
            Sign Out
          </button>

          <ul className="nav-links">
            <li>
              <button
                className={`nav-link ${activeTab === 'Dashboard' ? 'active' : ''}`}
                onClick={() => handleTabClick('Dashboard')}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activeTab === 'Weight Training' ? 'active' : ''}`}
                onClick={() => handleTabClick('Weight Training')}
              >
                Weight Training
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activeTab === 'Cardio' ? 'active' : ''}`}
                onClick={() => handleTabClick('Cardio')}
              >
                Cardio
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Tab Content */}
      <div className="content">
        {activeTab === 'Dashboard' && (
          <div className="tab-content active" id="Dashboard">
            <div className="background-box">
              <h1>Dashboard</h1>
              <div className="dashboard-boxes">
                <div className="top-box">
                  <h2>Check-In Calendar</h2>
                  <Calendar
                    onClickDay={handleDateClick}
                    value={selectedDate}
                    tileClassName={({ date }) =>
                      workoutDates.includes(date.toDateString()) ? 'workout-day' : null
                    }
                  />
                  <p>
                    {workoutDates.includes(selectedDate.toDateString())
                      ? 'You worked out on this day!'
                      : 'You did not check in for this day.'}
                  </p>
                </div>
                <div className="top-box">
                  <h2>Progress</h2>
                  <p>
                    You have worked out on {workoutDates.length} day(s) this month.
                  </p>
                </div>
                <div className="bottom-box">Goals</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Weight Training' && (
          <div className="tab-content active" id="Weight Training">
            <div className="background-box">
              <h1>Weight Training</h1>
              <div className="dashboard-boxes">
                <div className="top-box">
                  <h2>Choose Sets and Reps</h2>
                  <label htmlFor="sets">Number of Sets:</label>
                  <select id="sets" name="sets">
                    {[...Array(6).keys()].map((num) => (
                      <option key={num} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="reps">Number of Reps:</label>
                  <select id="reps" name="reps">
                    {[...Array(20).keys()].map((num) => (
                      <option key={num} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="top-box">Example Content Here</div>
                <div className="bottom-box">
                  <h2>Exercise List</h2>
                  <ul className="exercise-list">
                    {['Arnold Press', 'Barbell Lunge', 'Bench Press', 'Biceps Curl', 'Squat'].map(
                      (exercise, index) => (
                        <li key={index}>
                          <label>
                            <input type="radio" name="exercise" value={exercise} />
                            {exercise}
                          </label>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Cardio' && (
          <div className="tab-content active" id="Cardio">
            <div className="background-box">
              <h1>Cardio</h1>
              <div className="dashboard-boxes">
                <div className="top-box">Type of Cardio</div>
                <div className="top-box">Time Spent</div>
                <div className="bottom-box">Distance Traveled</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
