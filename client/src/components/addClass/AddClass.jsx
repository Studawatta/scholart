import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { makeRequest } from '../../axios';
import useOutSideClickFrom from '../../hooks/useOutSideClick';
import { setShowClassForm } from '../../redux/form/formSlice';

const AddClass = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [incharge, setIncharge] = useState('');

  const dropDownRef = useRef();

  //Fetching teachers
  const { data: teachers, isLoading } = useQuery({
    queryKey: ['teachers'],
    queryFn: async () =>
      await makeRequest.get(`/teacher/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newClass) => {
      return makeRequest.post('/class', newClass);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsPending(true);
      mutation.mutate(data);
      setError('');
      setIsPending(false);
      alert('Class added!');
      reset();
      setIncharge('');
    } catch (error) {
      setIsPending(false);
      setError(error.message);
    }
  };

  useOutSideClickFrom(dropDownRef, setShowDropDown);

  const inputContStyle = 'flex flex-col gap-1 h-[84px] md:w-1/2 w-full';
  const inputStyle =
    'border border-slate-400 rounded-md outline-none w-full px-4 py-[2px]';

  return (
    <div className=" h-full w-full p-4">
      <div className=" flex items-center">
        <h1 className="mx-auto w-fit text-2xl font-semibold">Add Class</h1>

        <IoMdClose
          data-testid="closeBtn"
          className="cursor-pointer text-4xl hover:text-red-700"
          onClick={() => dispatch(setShowClassForm())}
        />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : teachers.length === 0 ? (
        <p className="mt-10 text-center text-3xl font-semibold text-slate-500">
          Please add at least one teacher before create classes !
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-primaryBlue mx-auto mt-4 w-3/4 rounded-md border-2 px-8 py-8"
        >
          <div className="flex w-full flex-col items-center ">
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
              <div className=" flex w-full items-center justify-between rounded-md border border-slate-400 bg-white px-4 py-[2px] outline-none">
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
                    className=" cursor-pointer rounded-full bg-slate-300 p-[2px] text-xs text-white"
                    onClick={() => setIncharge('')}
                  />
                ) : (
                  ''
                )}
              </div>

              {/* TEACHER'S NAMES DROPDOWN */}
              {showDropDown && (
                <div className="absolute bottom-0 top-[64px] flex h-fit max-h-32 w-full flex-col gap-2 overflow-auto rounded-md border border-slate-400 bg-white py-1 font-semibold text-slate-700">
                  {teachers
                    .filter((teacher) =>
                      teacher.name
                        .toLowerCase()
                        .includes(incharge.toLowerCase())
                    )
                    .map((teacher, index) => (
                      <span
                        className=" cursor-pointer pl-4 hover:bg-slate-200 "
                        key={index}
                        onClick={() => {
                          setIncharge(teacher.name);
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
            disabled={isPending}
            className="bg-primaryBlue hover:bg-primaryBlueHover mx-auto mt-6 block w-1/2 rounded-md py-[2px] font-semibold text-white"
          >
            {isPending ? 'Loading' : 'Submit'}
          </button>
          {error && <p className="mt-2 text-center text-red-500">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default AddClass;
