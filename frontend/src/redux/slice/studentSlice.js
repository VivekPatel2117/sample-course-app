import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrolledCourses: [],
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    enrollCourse: (state, action) => {
      const course = action.payload;
      
      const isAlreadyEnrolled = state.enrolledCourses.some((c) => c.id === course.id);
      
      if (!isAlreadyEnrolled) {
        state.enrolledCourses.push({
          ...course,
          progress: Math.floor(Math.random() * 100) + 1, // Random progress between 1-100
        });
      }
    },
    unenrollCourse: (state, action) => {
      state.enrolledCourses = state.enrolledCourses.filter((c) => c.id !== action.payload);
    },
    markCourseAsCompleted: (state, action) => {
      const course = state.enrolledCourses.find((c) => c.id === action.payload);
      if (course) {
        course.progress = 100; // Set progress to 100% when completed
      }
    }
  },
});

export const { enrollCourse, unenrollCourse, markCourseAsCompleted } = studentSlice.actions;
export default studentSlice.reducer;
