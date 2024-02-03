import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showStudentForm: false,
  showTeacherForm: false,
  showClassForm: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setShowStudentForm: (state) => {
      state.showStudentForm = !state.showStudentForm;
    },
    setShowTeacherForm: (state) => {
      state.showTeacherForm = !state.showTeacherForm;
    },
    setShowClassForm: (state) => {
      state.showClassForm = !state.showClassForm;
    },
  },
});

export const { setShowClassForm, setShowStudentForm, setShowTeacherForm } =
  formSlice.actions;

export default formSlice.reducer;
