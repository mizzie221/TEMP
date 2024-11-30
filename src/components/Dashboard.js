import React, { useState } from "react";
import Calendar from "react-calendar"; // Import Calendar
import "react-calendar/dist/Calendar.css"; // Import Calendar styles
import "../styles/Dashboard.css";
import Home from "./Home";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSignedOut, setIsSignedOut] = useState(false);
  const [workoutDates, setWorkoutDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startingWeight, setStartingWeight] = useState(70); // Default starting weight
  const [currentWeight, setCurrentWeight] = useState(70); // Current weight starts as the starting weight
  const [newWeightInput, setNewWeightInput] = useState(""); // Input field for weight updates

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

  const handleStartingWeightUpdate = () => {
    if (newWeightInput) {
      setStartingWeight(Number(newWeightInput));
      setCurrentWeight(Number(newWeightInput)); // Sync current weight with new starting weight
      setNewWeightInput(""); // Clear input field
    }
  };

  const handleCurrentWeightUpdate = () => {
    if (newWeightInput) {
      setCurrentWeight(Number(newWeightInput));
      setNewWeightInput(""); // Clear input field
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
                className={`nav-link ${activeTab === "Dashboard" ? "active" : ""}`}
                onClick={() => handleTabClick("Dashboard")}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activeTab === "Weight Training" ? "active" : ""}`}
                onClick={() => handleTabClick("Weight Training")}
              >
                Weight Training
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${activeTab === "Cardio" ? "active" : ""}`}
                onClick={() => handleTabClick("Cardio")}
              >
                Cardio
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Tab Content */}
      <div className="content">
        {activeTab === "Dashboard" && (
          <div className="tab-content active" id="Dashboard">
            <div className="background-box">
              <h1>Dashboard</h1>
              <div className="dashboard-boxes">
                <div className="top-box">
                  <h2>Check-In Calendar</h2>
                  <div className="calendar-wrapper">
                    <Calendar
                      onClickDay={handleDateClick}
                      value={selectedDate}
                      tileClassName={({ date }) =>
                        workoutDates.includes(date.toDateString()) ? "workout-day" : null
                      }
                    />
                  </div>
                  <p>
                    {workoutDates.includes(selectedDate.toDateString())
                      ? "You worked out on this day!"
                      : "You did not check in for this day."}
                  </p>
                </div>
                <div className="middle-box">
                  <h2>Progress</h2>
                  <p>You have worked out for {workoutDates.length} day(s) this month.</p>
                </div>
                <div className="bottom-box">
                  <h2>Goals</h2>
                  <p className="goals-starting-weight">
                    <strong>Starting Weight:</strong> {startingWeight} kg
                  </p>
                  <p className="goals-current-weight">
                    <strong>Current Weight:</strong> {currentWeight} kg
                  </p>
                  <div>
                    <input
                      className="goals-input"
                      type="number"
                      placeholder="Update your weight e.g., 68"
                      value={newWeightInput}
                      onChange={(e) => setNewWeightInput(e.target.value)}
                    />
                  </div>
                  <div className="goals-buttons">
                    <button className="goals-button" onClick={handleCurrentWeightUpdate}>
                      Log Current Weight
                    </button>
                    <button className="goals-button" onClick={handleStartingWeightUpdate}>
                      Update Starting Weight
                    </button>
                  </div>
                </div>
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
                <div className="top-box">Today's Workout</div>
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
                <div className="middle-box">Time Spent</div>
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
