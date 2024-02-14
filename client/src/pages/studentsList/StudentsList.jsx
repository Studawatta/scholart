import Header from '../../components/homeHeader/Header';
import { FaPlus } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import AddStudent from '../../components/addStudent/AddStudent';
import axios from 'axios';

import { setShowStudentForm } from '../../redux/form/formSlice';
import { useEffect, useState } from 'react';

const StudentsList = () => {
  const dispatch = useDispatch();

  const { showStudentForm } = useSelector((state) => state.form);
  const { currentUser } = useSelector((state) => state.user);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  //Fetching Data
  useEffect(() => {
    try {
      const fetchStudents = async () => {
        const res = await axios.get(
          `http://localhost:8080/api/student/${currentUser.id}`,
          {
            withCredentials: true,
          }
        );

        setStudents(res.data);
      };
      fetchStudents();
    } catch (error) {
      setError('Something went wrong!');
    }
  }, [currentUser.id, students]);

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8080/api/student/' + id, {
        withCredentials: true,
      });
      alert('Deleted!');
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className=" py-8 px-20">
      <Header />
      <div className=" flex flex-col md:flex-row mt-8 gap-5 md:gap-0">
        <div>
          <button
            className={` w-48 py-1 px-2 rounded-lg flex mx-auto items-center justify-between text-slate-600 font-semibold
                   cursor-pointer border-2 border-primaryBlue hover:bg-slate-200 select-none`}
            onClick={() => dispatch(setShowStudentForm())}
          >
            <span>Add Student</span>
            <FaPlus />
          </button>
        </div>
        <div className="flex-1 lg:ml-10 bg-slate-200 rounded-md  items-center justify-center  lg:py-4 flex overflow-hidden">
          {showStudentForm ? (
            <AddStudent />
          ) : (
            <div>
              {error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : students.length > 0 ? (
                <div className=" h-full py-1 flex  flex-col">
                  <div className="flex gap-1">
                    <span className="w-6"></span>
                    <span className="w-[250px] bg-[#006666] text-white font-semibold rounded-md text-center select-none">
                      Name
                    </span>
                    <span className="w-[250px] bg-[#006666] text-white font-semibold rounded-md text-center select-none">
                      Class
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col h-[445px] py-1 overflow-auto gap-2">
                    {students.map((student, index) => (
                      <div key={index} className=" flex gap-1">
                        <span className="font-semibold w-6">
                          {index < 9 ? '0' + (index + 1) : index + 1}.
                        </span>
                        <span className="w-[250px] bg-slate-600 text-white font-semibold rounded-md pl-8 cursor-pointer hover:underline">
                          {student.name}
                        </span>
                        <span className="w-[250px] bg-slate-600 text-white font-semibold rounded-md pl-8">
                          {student.class}
                        </span>

                        <span
                          onClick={() => handleDelete(student.id)}
                          className="font-semibold text-red-600 cursor-pointer hover:underline select-none ml-2"
                        >
                          Delete
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-3xl font-semibold">No Students</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
