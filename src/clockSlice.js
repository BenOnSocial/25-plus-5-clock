import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  breakMin: 5,
  sessionMin: 25,
  timerSec: 25 * 60,
  showStart: true,
  isSession: true,
  intervalId: null, // Track the interval ID
};

export const clockSlice = createSlice({
  name: 'clock',
  initialState,
  reducers: {
    reset: (state, action) => {
      if (state.intervalId) {
        console.log('reset');
        clearInterval(state.intervalId);
        state.intervalId = null;
      }
      Object.assign(state, initialState);
    },
    addBreakMin: (state, action) => {
      if (state.breakMin < 60) {
        state.breakMin++;
        clockSlice.caseReducers.updateTimerSec(state);
      }
    },
    subBreakMin: (state, action) => {
      if (state.breakMin > 1) {
        state.breakMin--;
        clockSlice.caseReducers.updateTimerSec(state);
      }
    },
    setBreakMin: (state, action) => {
      state.breakMin = action.payload;
      clockSlice.caseReducers.updateTimerSec(state);
    },

    addSessionMin: (state, action) => {
      if (state.sessionMin < 60) {
        state.sessionMin++;
        clockSlice.caseReducers.updateTimerSec(state);
      }
    },
    subSessionMin: (state, action) => {
      if (state.sessionMin > 1) {
        state.sessionMin--;
        clockSlice.caseReducers.updateTimerSec(state);
      }
    },
    setSessionMin: (state, action) => {
      state.sessionMin = action.payload;
      clockSlice.caseReducers.updateTimerSec(state);
    },

    updateTimerSec: (state, action) => {
      if (state.isSession) {
        state.timerSec = state.sessionMin * 60;
      } else {
        state.timerSec = state.breakMin * 60;
      }
    },
    subTimerSec: (state, action) => {
      if (state.timerSec > 0) {
        state.timerSec--;
      } else if (state.isSession) {
        state.isSession = !state.isSession;
        state.timerSec = state.breakMin * 60;
      } else {
        new Audio('alarm.wav').play();
        state.isSession = !state.isSession;
        state.timerSec = state.sessionMin * 60;
      }
    },

    toggleStart: (state, action) => {
      state.showStart = !state.showStart;
    },
    setIntervalId: (state, action) => {
      state.intervalId = action.payload;
    },
    clearIntervalId: (state) => {
      if (state.intervalId) {
        clearInterval(state.intervalId);
        state.intervalId = null; // Reset intervalId
      }
    },
  },
});

export const {
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
} = clockSlice.actions;
export default clockSlice.reducer;

export const startInterval = () => (dispatch, getState) => {
  const state = getState();
  if (state.clock.intervalId) return; // Prevent multiple intervals

  const intervalId = setInterval(() => {
    dispatch(subTimerSec());
  }, 1000);

  dispatch(setIntervalId(intervalId)); // Store the interval ID
};
