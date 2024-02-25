import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { makeRequest } from '../../axios';
import AddStudent from '../../components/addStudent/AddStudent';
import Header from '../../components/homeHeader/Header';
import { setShowStudentForm } from '../../redux/form/formSlice';
import { Link } from 'react-router-dom';

const StudentsList = () => {
  const dispatch = useDispatch();

  const { showStudentForm } = useSelector((state) => state.form);
  const { currentUser } = useSelector((state) => state.user);
  const [studentClass, setStudentClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (showStudentForm) {
      dispatch(setShowStudentForm());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Fetching Data
  const {
    data: students,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['students'],
    queryFn: async () =>
      await makeRequest.get(`/student/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  //Fetching Classes
  const { data: classes, isLoading: isClassesLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: async () =>
      await makeRequest.get(`/class/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  const handleDelete = async (id) => {
    try {
      await makeRequest.delete(`/student/${id}`);
      alert('Deleted!');
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  const tableNameColStyle =
    'w-[38%] max-w-[350px] cursor-pointer rounded-md bg-slate-600 pl-4 font-semibold text-white hover:underline';
  const tableClassColStyle =
    'w-[38%] max-w-[350px] rounded-md bg-slate-600 pl-4 font-semibold text-white';

  const tableDeleteBtnStyle =
    'ml-2 hidden cursor-pointer select-none font-semibold text-red-600 hover:underline md:block';

  return (
    <div className=" px-4 py-8 lg:px-20">
      <Header />
      <div className=" mt-8  flex flex-col gap-5 text-sm md:gap-0 lg:flex-row lg:text-base">
        <div className="flex flex-col gap-5 lg:gap-10">
          <form className="flex flex-row justify-center gap-2 lg:flex-col">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              className={` border-primaryBlue w-48 rounded-[18px] border-2 px-6 py-[2px]   text-slate-700 outline-none
                    placeholder:font-semibold  lg:py-1 `}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="button"
              className="bg-primaryBlue hover:bg-primaryBlueHover w-fit rounded-[18px] px-6  py-[2px] font-semibold text-white lg:py-1"
              onClick={() => setSearchTerm('')}
            >
              Reset
            </button>
          </form>
          {/* Filter students by class */}
          <div className=" flex flex-wrap justify-center gap-2 lg:flex-col">
            <button
              className={` border-primaryBlue flex w-16 cursor-pointer  select-none items-center justify-center rounded-lg  border-2
                   py-[2px] font-semibold hover:bg-slate-600 hover:text-white lg:w-24 lg:py-1
                   ${studentClass === 'all' ? 'bg-slate-600 text-white' : 'bg-white text-slate-600'}`}
              onClick={() => setStudentClass('all')}
            >
              <span>ALL</span>
            </button>
            {isClassesLoading ? (
              <p>Loading</p>
            ) : (
              classes.map((stdClass) => (
                <button
                  key={stdClass.class_id}
                  className={` border-primaryBlue flex w-fit min-w-24  cursor-pointer select-none items-center justify-center 
                      rounded-lg border-2 px-2 py-[2px] font-semibold text-slate-600 hover:bg-slate-600 hover:text-white lg:py-1
                       ${studentClass === stdClass.class_name ? 'bg-slate-600 text-white' : 'bg-white text-slate-600'}`}
                  onClick={() => setStudentClass(stdClass.class_name)}
                >
                  <span>{stdClass.class_name.toUpperCase()}</span>
                </button>
              ))
            )}
          </div>
          <button
            className={` border-primaryBlue mx-auto flex w-36 cursor-pointer  select-none items-center justify-between
                 rounded-lg border-2 px-2 py-[2px] font-semibold text-slate-600 hover:bg-slate-200 lg:w-48 lg:py-1`}
            onClick={() => dispatch(setShowStudentForm())}
          >
            <span>Add Student</span>
            <FaPlus />
          </button>
        </div>
        <div className="flex flex-1 overflow-hidden rounded-md bg-slate-200 px-1 py-4 lg:ml-10">
          {showStudentForm ? (
            <AddStudent />
          ) : (
            <div className=" w-full">
              {error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : isLoading ? (
                <p className="text-center text-slate-700">Loading...</p>
              ) : students.length > 0 ? (
                <div className=" flex h-full w-full   flex-col  py-1">
                  <div className="mx-auto flex w-full justify-center gap-1 md:w-3/5 ">
                    <span className="w-6"></span>
                    <span className="w-[38%] max-w-[350px] select-none rounded-md bg-[#006666] text-center font-semibold text-white">
                      Name
                    </span>
                    <span className="w-[38%] max-w-[350px] select-none rounded-md bg-[#006666] text-center font-semibold text-white">
                      Class
                    </span>
                    <span className="ml-2 hidden w-12 md:block"></span>
                  </div>
                  <div className="mx-auto  mt-4 flex h-[445px] w-full flex-col gap-2 overflow-auto py-1 md:w-3/5">
                    {
                      // SEARCH BY NAME
                      searchTerm
                        ? students
                            .filter((student) =>
                              student.student_name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            )
                            .map((student, index) => (
                              <div
                                key={index}
                                className=" flex justify-center gap-1"
                              >
                                <span className="w-6 font-semibold">
                                  {index < 9 ? '0' + (index + 1) : index + 1}.
                                </span>
                                <Link
                                  to={'/student/profile/' + student.student_id}
                                  className={tableNameColStyle}
                                >
                                  {student.student_name}
                                </Link>
                                <span className={tableClassColStyle}>
                                  {student.class_name}
                                </span>

                                <span
                                  onClick={() =>
                                    handleDelete(student.student_id)
                                  }
                                  className={tableDeleteBtnStyle}
                                >
                                  Delete
                                </span>
                              </div>
                            ))
                        : //GET ALL STUDENTS
                          studentClass === 'all'
                          ? students.map((student, index) => (
                              <div
                                key={index}
                                className=" flex justify-center gap-1"
                              >
                                <span className="w-6 font-semibold">
                                  {index < 9 ? '0' + (index + 1) : index + 1}.
                                </span>
                                <Link
                                  to={'/student/profile/' + student.student_id}
                                  className={tableNameColStyle}
                                >
                                  {student.student_name}
                                </Link>
                                <span className={tableClassColStyle}>
                                  {student.class_name}
                                </span>

                                <span
                                  onClick={() =>
                                    handleDelete(student.student_id)
                                  }
                                  className={tableDeleteBtnStyle}
                                >
                                  Delete
                                </span>
                              </div>
                            ))
                          : // FILTER BY CLASS
                            students
                              .filter(
                                (student) => student.class_name === studentClass
                              )
                              .map((student, index) => (
                                <div
                                  key={index}
                                  className=" flex justify-center gap-1"
                                >
                                  <span className="w-6 font-semibold">
                                    {index < 9 ? '0' + (index + 1) : index + 1}.
                                  </span>
                                  <Link
                                    to={
                                      '/student/profile/' + student.student_id
                                    }
                                    className={tableNameColStyle}
                                  >
                                    {student.student_name}
                                  </Link>
                                  <span className={tableClassColStyle}>
                                    {student.class_name}
                                  </span>

                                  <span
                                    onClick={() =>
                                      handleDelete(student.student_id)
                                    }
                                    className={tableDeleteBtnStyle}
                                  >
                                    Delete
                                  </span>
                                </div>
                              ))
                    }
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
