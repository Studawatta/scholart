import { FaPlus } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import {
  setShowClassForm,
  setShowStudentForm,
  setShowTeacherForm,
} from '../../redux/form/formSlice';

const AddButton = ({ text }) => {
  const dispatch = useDispatch();

  const { showStudentForm, showTeacherForm, showClassForm } = useSelector(
    (state) => state.form
  );

  return (
    <div
      className={` border-primaryBlue flex w-48 cursor-pointer select-none items-center justify-between rounded-lg border-2
                   px-2 py-1 font-semibold text-slate-600 hover:bg-slate-200`}
      onClick={() => {
        if (text === 'Add Teacher') {
          if (showStudentForm) {
            dispatch(setShowStudentForm());
          } else if (showClassForm) {
            dispatch(setShowClassForm());
          }
          dispatch(setShowTeacherForm());
        } else if (text === 'Add Class') {
          if (showTeacherForm) {
            dispatch(setShowTeacherForm());
          } else if (showStudentForm) {
            dispatch(setShowStudentForm());
          }
          dispatch(setShowClassForm());
        } else if (text === 'Add Student') {
          if (showClassForm) {
            dispatch(setShowClassForm());
          } else if (showTeacherForm) {
            dispatch(setShowTeacherForm());
          }
          dispatch(setShowStudentForm());
        }
      }}
    >
      <span>{text}</span>
      <FaPlus />
    </div>
  );
};

const HomeSideBar = () => {
  return (
    <div
      className={`hidden h-fit w-full flex-col items-center gap-4 rounded-md py-4 
                  shadow-[0px_0px_5px_#000] md:w-60 lg:flex`}
    >
      <AddButton text="Add Teacher" />
      <AddButton text="Add Class" />
      <AddButton text="Add Student" />
    </div>
  );
};

export default HomeSideBar;
