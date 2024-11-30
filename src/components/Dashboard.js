import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Dashboard.css";
import Home from "./Home";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSignedOut, setIsSignedOut] = useState(false);
  const [workoutDates, setWorkoutDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startingWeight, setStartingWeight] = useState(70);
  const [currentUserWeight, setCurrentUserWeight] = useState(70);
  const [newWeightInput, setNewWeightInput] = useState("");
  const [workoutInProgress, setWorkoutInProgress] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState(new Date());
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState("");
  const [notes, setNotes] = useState("");
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [cardioExercises, setCardioExercises] = useState([]);
  const [cardioHistory, setCardioHistory] = useState([]);
  const [isEditingWorkout, setIsEditingWorkout] = useState(null); // Track if editing a workout

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
      setCurrentUserWeight(Number(newWeightInput));
      setNewWeightInput("");
    }
  };

  const handleCurrentWeightUpdate = () => {
    if (newWeightInput) {
      setCurrentUserWeight(Number(newWeightInput));
      setNewWeightInput("");
    }
  };

  const handleStartWorkout = () => {
    setWorkoutInProgress(true);
    setWorkoutStartTime(new Date());
    setExercises([]);
    setNotes("");
  };

  const handleCancelWorkout = () => {
    if (window.confirm("Are you sure you want to cancel this workout? All progress will be lost.")) {
      setWorkoutInProgress(false);
      setExercises([]);
      setWorkoutStartTime(new Date());
      setNotes("");
    }
  };

  const handleFinishWorkout = () => {
    const completedWorkout = {
      time: workoutStartTime,
      exercises,
      notes,
    };
    setWorkoutHistory([...workoutHistory, completedWorkout]);
    alert("Workout completed!");
    setWorkoutInProgress(false);
    setExercises([]);
    setWorkoutStartTime(new Date());
    setNotes("");
  };

  const handleAddExercise = () => {
    if (!currentExercise.trim()) {
      alert("Please enter an exercise name.");
      return;
    }
    setExercises([
      ...exercises,
      {
        name: currentExercise.trim(),
        sets: [],
      },
    ]);
    setCurrentExercise("");
  };

  const handleAddSet = (exerciseIndex) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets.push({ weight: "", reps: "" });
    setExercises(updatedExercises);
  };

  const handleDeleteSet = (exerciseIndex, setIndex) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets.splice(setIndex, 1);
    setExercises(updatedExercises);
  };

  const handleUpdateSet = (exerciseIndex, setIndex, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets[setIndex][field] = value;
    setExercises(updatedExercises);
  };

  const handleEditWorkout = (index) => {
    const workoutToEdit = workoutHistory[index];
    setWorkoutInProgress(true);
    setWorkoutStartTime(workoutToEdit.time);
    setExercises(workoutToEdit.exercises);
    setNotes(workoutToEdit.notes);
    setIsEditingWorkout(index); // Set editing index
  };

  const handleSaveEditedWorkout = () => {
    const updatedHistory = [...workoutHistory];
    updatedHistory[isEditingWorkout] = {
      time: workoutStartTime,
      exercises,
      notes,
    };
    setWorkoutHistory(updatedHistory);
    setIsEditingWorkout(null); // Clear editing index
    setWorkoutInProgress(false);
    alert("Workout updated successfully!");
  };

  const handleEditWorkoutTime = (index, newTime) => {
    const updatedHistory = [...workoutHistory];
    updatedHistory[index].time = new Date(newTime);
    setWorkoutHistory(updatedHistory);
  };

  const handleStartCardioWorkout = () => {
    setWorkoutInProgress(true);
    setWorkoutStartTime(new Date());
    setCardioExercises([]); // Reset cardio-specific exercises
    setNotes("");
  };

  const handleCancelCardioWorkout = () => {
    if (window.confirm("Are you sure you want to cancel this workout? All progress will be lost.")) {
      setWorkoutInProgress(false);
      setCardioExercises([]); // Reset cardio-specific exercises
      setWorkoutStartTime(new Date());
      setNotes("");
    }
  };

  const handleFinishCardioWorkout = () => {
    const completedWorkout = {
      time: workoutStartTime,
      exercises: cardioExercises,
      notes,
    };
    setCardioHistory([...cardioHistory, completedWorkout]); // Save to cardio-specific history
    alert("Cardio workout completed!");
    setWorkoutInProgress(false);
    setCardioExercises([]); // Clear cardio-specific exercises
    setWorkoutStartTime(new Date());
    setNotes("");
  };

  const handleAddCardioExercise = () => {
    if (!currentExercise.trim()) {
      alert("Please enter an exercise name.");
      return;
    }
    setCardioExercises([
      ...cardioExercises,
      {
        name: currentExercise.trim(),
        sets: [],
      },
    ]);
    setCurrentExercise("");
  };

  const handleAddCardioSet = (exerciseIndex) => {
    const updatedExercises = [...cardioExercises];
    updatedExercises[exerciseIndex].sets.push({ time: "", distance: "" });
    setCardioExercises(updatedExercises);
  };

  const handleDeleteCardioSet = (exerciseIndex, setIndex) => {
    const updatedExercises = [...cardioExercises];
    updatedExercises[exerciseIndex].sets.splice(setIndex, 1);
    setCardioExercises(updatedExercises);
  };

  const handleUpdateCardioSet = (exerciseIndex, setIndex, field, value) => {
    const updatedExercises = [...cardioExercises];
    updatedExercises[exerciseIndex].sets[setIndex][field] = value;
    setCardioExercises(updatedExercises);
  };  

  const handleEditCardioWorkout = (index) => {
    const workoutToEdit = cardioHistory[index];
    setWorkoutInProgress(true);
    setWorkoutStartTime(workoutToEdit.time);
    setCardioExercises(workoutToEdit.exercises);
    setNotes(workoutToEdit.notes);
    setIsEditingWorkout(index); // Set editing index
  };
  
  const handleSaveEditedCardioWorkout = () => {
    const updatedHistory = [...cardioHistory];
    updatedHistory[isEditingWorkout] = {
      time: workoutStartTime,
      exercises: cardioExercises,
      notes,
    };
    setCardioHistory(updatedHistory);
    setIsEditingWorkout(null); // Clear editing index
    setWorkoutInProgress(false);
    alert("Cardio workout updated successfully!");
  };
  
  const handleEditCardioWorkoutTime = (index, newTime) => {
    const updatedHistory = [...cardioHistory];
    updatedHistory[index].time = new Date(newTime);
    setCardioHistory(updatedHistory);
  };  
  
  if (isSignedOut) {
    return <Home />;
  }

  return (
    <div>
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
                  <p>
                    <strong>Starting Weight:</strong> {startingWeight} kg
                  </p>
                  <p>
                    <strong>Current Weight:</strong> {currentUserWeight} kg
                  </p>
                  <div>
                    <input
                      type="number"
                      placeholder="Update your weight e.g., 68"
                      value={newWeightInput}
                      onChange={(e) => setNewWeightInput(e.target.value)}
                    />
                  </div>
                  <div>
                    <button onClick={handleCurrentWeightUpdate}>Log Current Weight</button>
                    <button onClick={handleStartingWeightUpdate}>Update Starting Weight</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Weight Training" && (
          <div className="tab-content active weight-training">
            <div className="background-box">
              <h1 className="section-title">Weight Training</h1>
              {!workoutInProgress ? (
                <button className="modern-button start-workout-button" onClick={handleStartWorkout}>
                Start Workout
              </button>
              ) : (
                <>
                  <div className="workout-details">
                    <p>
                      <strong>Started at:</strong> {workoutStartTime.toLocaleString()}
                    </p>
                    <input
                      type="text"
                      placeholder="Exercise Name (e.g., Deadlift)"
                      value={currentExercise}
                      onChange={(e) => setCurrentExercise(e.target.value)}
                      className="modern-input"
                    />
                    <button className="add-exercise-button modern-button" onClick={handleAddExercise}>
                      Add Exercise
                    </button>
                  </div>
                  {exercises.map((exercise, index) => (
                    <div key={index}>
                      <h3>{exercise.name}</h3>
                      {exercise.sets.map((set, setIndex) => (
                        <div key={setIndex}>
                          <input
                            type="number"
                            placeholder="Weight (kg)"
                            value={set.weight}
                            onChange={(e) =>
                              handleUpdateSet(index, setIndex, "weight", e.target.value)
                            }
                          />
                          <input
                            type="number"
                            placeholder="Reps"
                            value={set.reps}
                            onChange={(e) =>
                              handleUpdateSet(index, setIndex, "reps", e.target.value)
                            }
                          />
                          <button onClick={() => handleDeleteSet(index, setIndex)}>Delete</button>
                        </div>
                      ))}
                      <button onClick={() => handleAddSet(index)}>Add Set</button>
                    </div>
                  ))}
                  <textarea
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                  {isEditingWorkout !== null ? (
                    <button onClick={handleSaveEditedWorkout}>Save Changes</button>
                  ) : (
                    <button onClick={handleFinishWorkout}>Finish Workout</button>
                  )}
                  <button onClick={handleCancelWorkout}>Cancel Workout</button>
                </>
              )}
              {workoutHistory.map((workout, index) => (
                <div key={index}>
                  <p>
                    Workout at:{" "}
                    <input
                      type="datetime-local"
                      value={new Date(workout.time).toISOString().slice(0, 16)}
                      onChange={(e) =>
                        handleEditWorkoutTime(index, new Date(e.target.value))
                      }
                    />
                  </p>
                  {workout.exercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex}>
                      <strong>{exercise.name}</strong>
                      {exercise.sets.map((set, setIndex) => (
                        <p key={setIndex}>
                          {set.weight} kg x {set.reps} reps
                        </p>
                      ))}
                    </div>
                  ))}
                  <p>Notes: {workout.notes}</p>
                  <button onClick={() => handleEditWorkout(index)}>Edit Workout</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Cardio" && (
          <div className="tab-content active cardio">
            <div className="background-box">
              <h1 className="section-title">Cardio</h1>
              {!workoutInProgress ? (
                <button className="modern-button start-workout-button" onClick={handleStartCardioWorkout}>
                  Start Workout
                </button>
              ) : (
                <>
                  <div className="workout-details">
                    <p>
                      <strong>Started at:</strong> {workoutStartTime.toLocaleString()}
                    </p>
                    <input
                      type="text"
                      placeholder="Exercise Name (e.g., Run, Bike Ride)"
                      value={currentExercise}
                      onChange={(e) => setCurrentExercise(e.target.value)}
                      className="modern-input"
                    />
                    <button
                      className="add-exercise-button modern-button"
                      onClick={handleAddCardioExercise}
                    >
                      Add Exercise
                    </button>
                  </div>
                  {cardioExercises.map((exercise, index) => (
                    <div key={index}>
                      <h3>{exercise.name}</h3>
                      {exercise.sets.map((set, setIndex) => (
                        <div key={setIndex}>
                          <input
                            type="number"
                            placeholder="Time (min)"
                            value={set.time}
                            onChange={(e) =>
                              handleUpdateCardioSet(index, setIndex, "time", e.target.value)
                            }
                          />
                          <input
                            type="number"
                            placeholder="Distance (km)"
                            value={set.distance}
                            onChange={(e) =>
                              handleUpdateCardioSet(index, setIndex, "distance", e.target.value)
                            }
                          />
                          <button onClick={() => handleDeleteCardioSet(index, setIndex)}>Delete</button>
                        </div>
                      ))}
                      <button onClick={() => handleAddCardioSet(index)}>Add Cardio</button>
                    </div>
                  ))}
                  <textarea
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                  <button
                    onClick={() =>
                      isEditingWorkout !== null
                        ? handleSaveEditedCardioWorkout()
                        : handleFinishCardioWorkout()
                    }
                  >
                    {isEditingWorkout !== null ? "Save Changes" : "Finish Workout"}
                  </button>
                  <button onClick={handleCancelCardioWorkout}>Cancel Workout</button>
                </>
              )}
              {cardioHistory.map((workout, index) => (
                <div key={index}>
                  <p>
                    Workout at:{" "}
                    <input
                      type="datetime-local"
                      value={new Date(workout.time).toISOString().slice(0, 16)}
                      onChange={(e) =>
                        handleEditCardioWorkoutTime(index, new Date(e.target.value))
                      }
                    />
                  </p>
                  {workout.exercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex}>
                      <strong>{exercise.name}</strong>
                      {exercise.sets.map((set, setIndex) => (
                        <p key={setIndex}>
                          {set.time} min, {set.distance} km
                        </p>
                      ))}
                    </div>
                  ))}
                  <p>Notes: {workout.notes}</p>
                  <button onClick={() => handleEditCardioWorkout(index)}>Edit Workout</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
