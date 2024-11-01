import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  reset,
  addBreakMin,
  subBreakMin,
  setBreakMin,
  addSessionMin,
  subSessionMin,
  setSessionMin,
  subTimerSec,
  toggleStart,
  setIntervalId,
  clearIntervalId,
  startInterval,
} from './clockSlice';
import './Clock.css';

export default function Clock() {
  const breakMin = useSelector((state) => state.clock.breakMin);
  const sessionMin = useSelector((state) => state.clock.sessionMin);
  const showStart = useSelector((state) => state.clock.showStart);
  const timerSec = useSelector((state) => state.clock.timerSec);
  const isSession = useSelector((state) => state.clock.isSession);
  const dispatch = useDispatch();

  const handleStartStop = () => {
    if (showStart) {
      dispatch(startInterval());
    } else {
      dispatch(clearIntervalId());
    }
    dispatch(toggleStart());
  };

  function StartStopIcon() {
    if (showStart) {
      return <i className="bi bi-play-fill"></i>;
    }
    return <i className="bi bi-pause-fill"></i>;
  }

  const handleStartClick = () => {
    dispatch(startInterval());
  };

  const handleStopClick = () => {
    dispatch(clearIntervalId());
  };

  useEffect(() => {
    return () => {
      // Clear the interval when the component unmounts
      dispatch(clearInterval());
    };
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <h1 className="py-4">25 + 5 Clock</h1>

      <div className="input-group flex-nowrap align-items-center py-3">
        <label
          id="break-label"
          htmlFor="break-length"
          className="form-label text-nowrap col-3 pe-3 text-end"
        >
          Break Length
        </label>
        <div id="break-length" className="well p-1 border">
          {breakMin}
        </div>
        <input
          type="range"
          className="form-range px-3"
          id="break-length"
          min="1"
          max="60"
          step="1"
          value={breakMin}
          onChange={(event) => {
            dispatch(setBreakMin(event.target.value));
          }}
        ></input>
        <button
          id="break-decrement"
          className="btn btn-secondary"
          onClick={() => {
            dispatch(subBreakMin());
          }}
        >
          -
        </button>
        <button
          id="break-increment"
          className="btn btn-secondary"
          onClick={() => {
            dispatch(addBreakMin());
          }}
        >
          +
        </button>
      </div>
      <div className="input-group flex-nowrap align-items-center py-3">
        <label
          id="session-label"
          htmlFor="session-length"
          className="form-label text-nowrap col-3 pe-3 text-end"
        >
          Session Length
        </label>
        <div id="session-length" className="well p-1 border">
          {sessionMin}
        </div>
        <input
          type="range"
          className="form-range px-3"
          id="session-length"
          min="1"
          max="60"
          step="1"
          value={sessionMin}
          onChange={(event) => {
            dispatch(setSessionMin(event.target.value));
          }}
        ></input>
        <button
          id="session-decrement"
          className="btn btn-secondary"
          onClick={() => {
            dispatch(subSessionMin());
          }}
        >
          -
        </button>
        <button
          id="session-increment"
          className="btn btn-secondary"
          onClick={() => {
            dispatch(addSessionMin());
          }}
        >
          +
        </button>
      </div>

      <div className="row">
        <div className="card">
          <div className="card-body">
            <h2 id="timer-label" className="h1 card-title">
              {isSession ? 'Session' : 'Break'}
            </h2>
            <p id="time-left" className="h3 card-text">
              {Math.floor(timerSec / 60)
                .toString()
                .padStart(2, '0')}
              :
              {Math.floor(timerSec % 60)
                .toString()
                .padStart(2, '0')}
            </p>
            <div className="btn-group" role="group">
              <button
                id="start_stop"
                type="button"
                className="btn btn-primary"
                onClick={handleStartStop}
              >
                <StartStopIcon />
              </button>
              <button
                id="reset"
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  dispatch(reset());
                }}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
