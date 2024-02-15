import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import useOutSideClickFrom from '../../hooks/useOutSideClick';
import { setShowClassForm } from '../../redux/form/formSlice';

const AddClass = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [incharge, setIncharge] = useState('');
  const [teachers, setTeachers] = useState([]);

  const dropDownRef = useRef();

  //Fetching teachers
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
      setError('Something went wrong!');
    }
  }, [currentUser.id, teachers]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await axios.post('http://localhost:8080/api/class', data, {
        withCredentials: true,
      });
      setError('');
      setIsLoading(false);
      alert('Class added!');
      reset();
      setIncharge('');
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  useOutSideClickFrom(dropDownRef, setShowDropDown);

  const inputContStyle = 'flex flex-col gap-1 h-[84px] md:w-1/2 w-full';
  const inputStyle =
    'border border-slate-400 rounded-md outline-none w-full px-4 py-[2px]';

  return (
    <div className=" w-full h-full p-4">
      <div className=" flex items-center">
        <h1 className="text-2xl font-semibold mx-auto w-fit">Add Class</h1>

        <IoMdClose
          data-testid="closeBtn"
          className="text-4xl cursor-pointer hover:text-red-700"
          onClick={() => dispatch(setShowClassForm())}
        />
      </div>
      {teachers.length === 0 ? (
        <p className="text-3xl font-semibold text-center mt-10 text-slate-500">
          Please add teachers before create classes !
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-2 w-3/4 mx-auto border-primaryBlue rounded-md mt-4 py-8 px-8"
        >
          <div className="flex flex-col items-center w-full ">
            {/*  */}
            {/* NAME INPUT */}
            <div className={inputContStyle}>
              <label htmlFor="name" className="font-serif text-slate-800">
                Name:
                {errors?.name?.type === 'required' && (
                  <span className=" text-sm text-red-500 ">*Required</span>
                )}
              </label>
              <input
                type="text"
                id="name"
                {...register('name', {
                  required: true,
                })}
                className={inputStyle}
              />
            </div>

            {/* INCHARGE TEACHER INPUT */}
            <div ref={dropDownRef} className={`${inputContStyle} relative`}>
              <label
                htmlFor="inchage_teacher"
                className="font-serif text-slate-800"
              >
                In charge teacher:
                {errors?.incharge_teacher?.type === 'required' && (
                  <span className=" text-sm text-red-500 ">*Required</span>
                )}
              </label>
              <div className=" border flex items-center justify-between border-slate-400 rounded-md outline-none w-full px-4 py-[2px] bg-white">
                <input
                  type="text"
                  id="incharge_teacher"
                  value={incharge}
                  {...register('incharge_teacher', { required: true })}
                  className="w-[95%] focus:outline-none"
                  onChange={(e) => setIncharge(e.target.value)}
                  onFocus={() => setShowDropDown(true)}
                />
                {incharge !== '' ? (
                  <IoMdClose
                    className=" cursor-pointer rounded-full bg-slate-300 text-xs p-[2px] text-white"
                    onClick={() => setIncharge('')}
                  />
                ) : (
                  ''
                )}
              </div>

              {/* TEACHER'S NAMES DROPDOWN */}
              {showDropDown && (
                <div className="bg-white border flex flex-col border-slate-400 py-1 overflow-auto rounded-md font-semibold text-slate-700 gap-2 absolute top-[64px] bottom-0 w-full max-h-32 h-fit">
                  {teachers
                    .filter((teacher) =>
                      teacher.name
                        .toLowerCase()
                        .includes(incharge.toLowerCase())
                    )
                    .map((teacher, index) => (
                      <span
                        className=" hover:bg-slate-200 pl-4 cursor-pointer "
                        key={index}
                        onClick={() => {
                          setIncharge(teacher.name);
                          setShowDropDown(false);
                        }}
                      >
                        {teacher.name}
                      </span>
                    ))}
                </div>
              )}
            </div>
          </div>
          <button
            disabled={isLoading}
            className="w-1/2 bg-primaryBlue py-[2px] rounded-md font-semibold text-white mx-auto block mt-6 hover:bg-primaryBlueHover"
          >
            {isLoading ? 'Loading' : 'Submit'}
          </button>
          {error && <p className="text-center text-red-500 mt-2">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default AddClass;
