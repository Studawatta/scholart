import Header from '../../components/homeHeader/Header';
import { FaPlus } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import AddTeacher from '../../components/addTeacher/AddTeacher';
import axios from 'axios';

import { setShowTeacherForm } from '../../redux/form/formSlice';
import { useEffect, useState } from 'react';
const TeachersList = () => {
  const dispatch = useDispatch();

  const { showTeacherForm } = useSelector((state) => state.form);
  const { currentUser } = useSelector((state) => state.user);
  const [teachers, setTeachers] = useState([]);

  //Fetching Data
  useEffect(() => {
    try {
      const fetchTeachers = async () => {
        const res = await axios.get(
          `http://localhost:8080/api/teacher/${currentUser.id}`,
          {
            withCredentials: true,
          }
        );

        setTeachers(res.data);
      };
      fetchTeachers();
    } catch (error) {
      console.log(error);
    }
  }, [currentUser.id, teachers]);

  return (
    <div className=" py-8 px-20">
      <Header />
      <div className=" flex mt-8">
        <div>
          <button
            className={` w-48 py-1 px-2 rounded-lg flex items-center justify-between text-slate-600 font-semibold
                   cursor-pointer border-2 border-primaryBlue hover:bg-slate-200 select-none`}
            onClick={() => dispatch(setShowTeacherForm())}
          >
            <span>Add Teacher</span>
            <FaPlus />
          </button>
        </div>
        <div className="flex-1 lg:ml-10 bg-slate-200 rounded-md  items-center justify-center  lg:py-4 flex overflow-hidden">
          {showTeacherForm ? (
            <AddTeacher />
          ) : (
            <div>
              {teachers ? (
                <div className=" h-full py-1 flex  flex-col items-center">
                  <div className="w-[600px]  flex gap-1 pl-6 ">
                    <h1 className="w-[250px] bg-primaryGreen text-white font-semibold rounded-md text-center select-none">
                      Name
                    </h1>
                    <h1 className="w-[250px] bg-primaryGreen text-white font-semibold rounded-md text-center select-none">
                      Subject
                    </h1>
                  </div>
                  <div className="mt-4 flex flex-col h-[445px] py-1 overflow-auto gap-2">
                    {teachers.map((teacher, index) => (
                      <div className="w-[600px] flex">
                        <span className="font-semibold w-6">
                          {index < 9 ? '0' + (index + 1) : index + 1}.
                        </span>
                        <div className="flex w-[500px] justify-between gap-1">
                          <p className="w-[250px] bg-slate-600 text-white font-semibold rounded-md pl-8 cursor-pointer hover:underline">
                            {teacher.name}
                          </p>
                          <p className="w-[250px] bg-slate-600 text-white font-semibold rounded-md pl-8">
                            {teacher.subject}
                          </p>
                        </div>

                        <span className="font-semibold ml-4 text-red-600 cursor-pointer hover:underline select-none">
                          Delete
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-3xl font-semibold">No Teachers</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeachersList;
