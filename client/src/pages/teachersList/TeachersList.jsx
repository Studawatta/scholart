import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { makeRequest } from '../../axios';
import AddTeacher from '../../components/addTeacher/AddTeacher';
import Header from '../../components/homeHeader/Header';
import { setShowTeacherForm } from '../../redux/form/formSlice';
import { Link } from 'react-router-dom';

const TeachersList = () => {
  const dispatch = useDispatch();

  const { showTeacherForm } = useSelector((state) => state.form);
  const { currentUser } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (showTeacherForm) {
      dispatch(setShowTeacherForm());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: teachers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['teachers'],
    queryFn: async () =>
      await makeRequest.get(`/teacher/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  const handleDelete = async (id) => {
    try {
      await makeRequest.delete(`/teacher/${id}`);
      alert('Deleted!');
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  const tableNameColStyle =
    'w-[38%] max-w-[350px] cursor-pointer rounded-md bg-slate-600 pl-4 font-semibold text-white hover:underline';
  const tableSubjectColStyle =
    'w-[38%] max-w-[350px] rounded-md bg-slate-600 pl-4 font-semibold text-white';

  const tableDeleteBtnStyle =
    'ml-2 hidden cursor-pointer select-none font-semibold text-red-600 hover:underline md:block';

  return (
    <div className=" px-4 py-8 lg:px-20">
      <Header />
      <div className=" mt-8 flex flex-col gap-5 text-sm lg:flex-row lg:gap-0 lg:text-base">
        <div className="flex flex-col gap-5 lg:gap-10 ">
          <form className="flex flex-row justify-center gap-2 lg:flex-col">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              className={` border-primaryBlue w-48 rounded-[18px] border-2 px-6   py-[2px] text-slate-700
                    outline-none  placeholder:font-semibold lg:py-1`}
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
          <button
            className={`border-primaryBlue mx-auto flex w-36 cursor-pointer  select-none items-center justify-between rounded-lg border-2 px-2 py-[2px]
                   font-semibold text-slate-600 hover:bg-slate-200 lg:w-48 lg:py-1`}
            onClick={() => dispatch(setShowTeacherForm())}
          >
            <span>Add Teacher</span>
            <FaPlus />
          </button>
        </div>
        <div className="flex flex-1 overflow-hidden rounded-md bg-slate-200 px-1 py-4 lg:ml-10">
          {showTeacherForm ? (
            <AddTeacher />
          ) : (
            <div className=" w-full">
              {error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : isLoading ? (
                <p className="text-center text-slate-700">Loading...</p>
              ) : teachers.length > 0 ? (
                <div className=" flex h-full w-full flex-col py-1">
                  <div className="mx-auto flex w-full justify-center gap-1 md:w-3/5 ">
                    <span className="w-6"></span>
                    <span className="w-[38%] max-w-[350px] select-none rounded-md bg-[#006666] text-center font-semibold text-white">
                      Name
                    </span>
                    <span className="w-[38%] max-w-[350px] select-none rounded-md bg-[#006666] text-center font-semibold text-white">
                      Subject
                    </span>
                    <span className="ml-2 hidden w-12 md:block"></span>
                  </div>
                  <div className="mx-auto  mt-4 flex h-[445px] w-full flex-col gap-2 overflow-auto py-1 md:w-3/5">
                    {searchTerm
                      ? teachers
                          .filter((teacher) =>
                            teacher.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((teacher, index) => (
                            <div
                              key={index}
                              className=" flex w-full justify-center gap-1"
                            >
                              <span className="w-6 font-semibold">
                                {index < 9 ? '0' + (index + 1) : index + 1}.
                              </span>
                              <Link
                                to={'/teacher/profile/' + teacher.id}
                                className={tableNameColStyle}
                              >
                                {teacher.name}
                              </Link>
                              <span className={tableSubjectColStyle}>
                                {teacher.subject}
                              </span>

                              <span
                                onClick={() => handleDelete(teacher.id)}
                                className={tableDeleteBtnStyle}
                              >
                                Delete
                              </span>
                            </div>
                          ))
                      : teachers.map((teacher, index) => (
                          <div
                            key={index}
                            className=" flex w-full justify-center gap-1"
                          >
                            <span className="w-6 font-semibold">
                              {index < 9 ? '0' + (index + 1) : index + 1}.
                            </span>
                            <Link
                              to={'/teacher/profile/' + teacher.id}
                              className={tableNameColStyle}
                            >
                              {teacher.name}
                            </Link>
                            <span className={tableSubjectColStyle}>
                              {teacher.subject}
                            </span>

                            <span
                              onClick={() => handleDelete(teacher.id)}
                              className={tableDeleteBtnStyle}
                            >
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
