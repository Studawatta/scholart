import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setShowTeacherForm } from '../../redux/form/formSlice';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { makeRequest } from '../../axios';

const AddTeacher = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTeacher) => {
      return makeRequest.post('/teacher', newTeacher);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
    },
  });

  const onSubmit = (data) => {
    try {
      setIsLoading(true);
      mutation.mutate(data);
      setError('');
      setIsLoading(false);
      alert('Teacher added!');
      reset();
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const inputContStyle = 'flex flex-col gap-1  h-[84px] ';
  const inputStyle =
    'border border-slate-400 rounded-md outline-none px-4 py-[2px]';

  return (
    <div className=" w-full h-full p-4">
      <div className=" flex items-center">
        <h1 className="text-2xl font-semibold mx-auto w-fit">Add Teacher</h1>

        <IoMdClose
          data-testid="closeBtn"
          className="text-4xl cursor-pointer hover:text-red-700"
          onClick={() => dispatch(setShowTeacherForm())}
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 w-3/4 mx-auto border-primaryBlue rounded-md mt-4 py-8 px-8"
      >
        <div className="flex flex-col md:flex-row justify-between w-full ">
          <div className="w-full md:w-[45%]  flex flex-col md:gap-4">
            {/*  */}
            {/* NAME INPUT */}
            <div className={inputContStyle}>
              <label
                htmlFor="teacher_name"
                className="font-serif text-slate-800"
              >
                Name:
              </label>
              <input
                type="text"
                id="teacher_name"
                {...register('name', {
                  required: true,
                })}
                className={inputStyle}
              />
              <div className="text-sm text-red-500">
                {errors?.name?.type === 'required' && <p>*Required</p>}
              </div>
            </div>

            {/* SUBJECT INPUT */}
            <div className={inputContStyle}>
              <label htmlFor="subject" className="font-serif text-slate-800">
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                {...register('subject', {
                  required: true,
                })}
                className={inputStyle}
              />
              <div className=" text-sm text-red-500 ">
                {errors?.subject?.type === 'required' && <p>*Required</p>}
              </div>
            </div>
          </div>

          <div className=" w-full md:w-[45%]">
            {/* APPOINTED DATE INPUT */}
            <div className={inputContStyle}>
              <label htmlFor="subject" className="font-serif text-slate-800">
                Appointed Date:
              </label>
              <input
                type="date"
                id="appointed_date"
                {...register('appointed_date', {
                  required: true,
                })}
                className={inputStyle}
              />
              <div className=" text-sm text-red-500 ">
                {errors?.appointed_date?.type === 'required' && (
                  <p>*Required</p>
                )}
              </div>
            </div>
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
    </div>
  );
};

export default AddTeacher;
