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
      className={` w-48 py-1 px-2 rounded-lg flex items-center justify-between text-slate-600 font-semibold
                   cursor-pointer border-2 border-primaryBlue hover:bg-slate-200 select-none`}
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
      className={`shadow-[0px_0px_5px_#000] hidden items-center rounded-md w-full md:w-60 lg:flex flex-col 
                  gap-4 py-4 h-fit`}
    >
      <AddButton text="Add Teacher" />
      <AddButton text="Add Class" />
      <AddButton text="Add Student" />
    </div>
  );
};

export default HomeSideBar;
