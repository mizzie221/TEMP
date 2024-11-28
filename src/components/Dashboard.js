import React, { useState } from 'react';
import '../styles/Dashboard.css'; 

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const signOut = () => {
    window.location.href = '/'; // Redirect to the home page
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
                <div className="top-box">Overview</div>
                <div className="top-box">Progress</div>
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
                    {[
                      'Arnold Press',
                      'Barbell Lunge',
                      'Bench Press',
                      'Biceps Curl',
                      'Bulgarian Split Squat',
                      'Chest Press',
                      'Deadlift',
                      'Dumbbell Chest Fly',
                      'Dumbbell Curl',
                      'Dumbbell Lateral Raise',
                      'Dumbbell Row',
                      'Goblet Squat',
                      'Incline Dumbbell Press',
                      'Leg Extension',
                      'Leg Press',
                      'Lunge',
                      'Lying Triceps Extension',
                      'Overhead Press',
                      'Pull-down',
                      'Pull-up',
                      'Push-up',
                      'Romanian Deadlift',
                      'Squat',
                    ].map((exercise, index) => (
                      <li key={index}>
                        <label>
                          <input type="radio" name="exercise" value={exercise} />
                          {exercise}
                        </label>
                      </li>
                    ))}
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
