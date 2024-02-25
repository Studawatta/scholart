import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/homeHeader/Header';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../../axios';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRef, useState } from 'react';
import useOutSideClickFrom from '../../hooks/useOutSideClick';
import { useSelector } from 'react-redux';
import { IoMdClose } from 'react-icons/io';

const ClassProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const naviagate = useNavigate();
  const params = useParams();
  const classId = params.id;

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [isPending, setIsPending] = useState(false);
  const [updateError, setUpdateError] = useState('');

  const [showDropDown, setShowDropDown] = useState(false);
  const [inchargeTeacher, setInchargeTeacher] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    incharge_teacher: '',
  });

  const dropDownRef = useRef();

  const {
    data: classData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['class'],
    queryFn: async () =>
      await makeRequest.get(`/class/profile/${classId}`).then((res) => {
        setFormData({
          name: res.data.class_name,
          incharge_teacher: res.data.teacher_id,
        });
        setInchargeTeacher(res.data.incharge_teacher);
        return res.data;
      }),
  });

  const {
    data: students,
    isLoading: isStudentsLoading,
    error: studentsError,
  } = useQuery({
    queryKey: ['students'],
    queryFn: async () =>
      await makeRequest.get(`/student/class/${classId}`).then((res) => {
        return res.data;
      }),
  });

  //Fetching teachers
  const { data: teachers, isLoading: isTeachersLoading } = useQuery({
    queryKey: ['teachers'],
    queryFn: async () =>
      await makeRequest.get(`/teacher/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newClass) => {
      return makeRequest.put(`/class/update/${classId}`, newClass);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['class'] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.incharge_teacher) {
      return setUpdateError('Teacher that you entered does not exist!');
    }
    try {
      setIsPending(true);
      mutation.mutate(formData);
      setUpdateError('');
      setIsPending(false);
      alert('Class updated!');
      setShowUpdateForm(false);
    } catch (error) {
      setIsPending(false);
      setUpdateError(error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      await makeRequest.delete(`/class/${id}`);
      alert('Deleted!');
      naviagate('/classes');
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  useOutSideClickFrom(dropDownRef, setShowDropDown);

  const inputContStyle = 'flex flex-col gap-1 h-[84px]  w-full';
  const inputStyle =
    'border border-slate-400 rounded-md outline-none w-full px-4 py-[2px]';
  return (
    <div className=" px-4 py-8 lg:px-20">
      <Header />
      {isLoading ? (
        <p className="text-center mt-10">Loading</p>
      ) : error ? (
        <p className="text-red-500 text-center mt-10">{error}</p>
      ) : (
        <div className="mt-20 flex flex-col pt-4 pb-10 rounded-md bg-slate-200 w-2/5 min-w-[300px] mx-auto">
          {showUpdateForm ? (
            <div>
              <div className="flex h-10 w-full items-center px-10">
                <button
                  onClick={() => setShowUpdateForm(false)}
                  className="flex w-fit cursor-pointer select-none items-center text-xl font-semibold  text-primaryBlue hover:text-primaryBlueHover"
                >
                  <FaArrowLeftLong /> Back
                </button>
              </div>
              <form
                onSubmit={handleSubmit}
                className="border-primaryBlue mx-auto mt-4 w-3/4 rounded-md border-2 px-8 py-8"
              >
                <div className="flex w-full flex-col items-center ">
                  {/*  */}
                  {/* NAME INPUT */}
                  <div className={inputContStyle}>
                    <label htmlFor="name" className="font-serif text-slate-800">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      className={inputStyle}
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  {/* INCHARGE TEACHER INPUT */}
                  <div
                    ref={dropDownRef}
                    className={`${inputContStyle} relative`}
                  >
                    <label
                      htmlFor="inchage_teacher"
                      className="font-serif text-slate-800"
                    >
                      In charge teacher:
                    </label>
                    <div className=" flex w-full items-center justify-between rounded-md border border-slate-400 bg-white px-4 py-[2px] outline-none">
                      <input
                        type="text"
                        id="incharge_teacher"
                        value={inchargeTeacher}
                        className="w-[95%] focus:outline-none"
                        onChange={(e) => setInchargeTeacher(e.target.value)}
                        required
                        onFocus={() => setShowDropDown(true)}
                      />
                      {inchargeTeacher !== '' ? (
                        <IoMdClose
                          className=" cursor-pointer rounded-full bg-slate-300 p-[2px] text-xs text-white"
                          onClick={() => {
                            setInchargeTeacher('');
                            setFormData({ ...formData, incharge_teacher: '' });
                          }}
                        />
                      ) : (
                        ''
                      )}
                    </div>

                    {/* TEACHER'S NAMES DROPDOWN */}
                    {showDropDown && (
                      <div className="absolute bottom-0 top-[64px] flex h-fit max-h-32 w-full flex-col gap-2 overflow-auto rounded-md border border-slate-400 bg-white py-1 font-semibold text-slate-700">
                        {isTeachersLoading
                          ? 'Loading...'
                          : teachers
                              .filter((teacher) =>
                                teacher.name
                                  .toLowerCase()
                                  .includes(inchargeTeacher.toLowerCase())
                              )
                              .map((teacher, index) => (
                                <span
                                  className=" cursor-pointer pl-4 hover:bg-slate-200 "
                                  key={index}
                                  onClick={() => {
                                    setInchargeTeacher(teacher.name);
                                    setFormData({
                                      ...formData,
                                      incharge_teacher: teacher.id,
                                    });
                                    setShowDropDown(false);
                                  }}
                                >
                                  {teacher.name} ({teacher.subject})
                                </span>
                              ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-primaryBlue hover:bg-primaryBlueHover mx-auto mt-6 block w-1/2 rounded-md py-[2px] font-semibold text-white"
                >
                  {isPending ? 'Loading' : 'Update'}
                </button>
                {updateError && (
                  <p className="mt-2 text-center text-red-500">{updateError}</p>
                )}
              </form>
            </div>
          ) : (
            <div>
              <div className="flex h-10 w-full items-center px-10">
                <Link
                  to={'/classes'}
                  className="flex w-fit cursor-pointer select-none items-center text-xl font-semibold  text-primaryBlue hover:text-primaryBlueHover"
                >
                  <FaArrowLeftLong /> Back
                </Link>
              </div>
              <h1 className="text-2xl font-semibold text-center">
                {classData.class_name}
              </h1>
              <div className="mt-8 w-[300px] flex flex-col gap-5 mx-auto">
                <p className="text-lg font-semibold">
                  In Charge Teacher:{' '}
                  <span className="font-normal">
                    {classData.incharge_teacher}
                  </span>
                </p>
                <p className="text-lg font-semibold">
                  Number Of Students:{' '}
                  {isStudentsLoading ? (
                    <span>Loading...</span>
                  ) : studentsError ? (
                    <span>Something went worng</span>
                  ) : (
                    <span className="font-normal">{students.length}</span>
                  )}
                </p>
              </div>
              <div className="flex mt-8 w-fit mx-auto flex-col gap-2">
                <button
                  onClick={() => setShowUpdateForm(true)}
                  className="w-40 rounded-md bg-primaryGreen text-center uppercase text-white hover:bg-primaryGreenHover"
                >
                  update
                </button>
                <button
                  onClick={() => handleDelete(classData.class_id)}
                  className="w-40 rounded-md bg-red-600 uppercase text-white hover:bg-red-700 "
                >
                  delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassProfile;
