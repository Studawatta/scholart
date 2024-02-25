import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { makeRequest } from '../../axios';
import { setShowTeacherForm } from '../../redux/form/formSlice';

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
    <div className=" h-full w-full p-4">
      <div className=" flex items-center">
        <h1 className="mx-auto w-fit text-2xl font-semibold">Add Teacher</h1>

        <IoMdClose
          data-testid="closeBtn"
          className="cursor-pointer text-4xl hover:text-red-700"
          onClick={() => dispatch(setShowTeacherForm())}
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-primaryBlue mx-auto mt-4 w-3/4 rounded-md border-2 px-8 py-8"
      >
        <div className="flex w-full flex-col justify-between md:flex-row ">
          <div className="flex w-full  flex-col md:w-[45%] md:gap-4">
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

          <div className=" flex w-full  flex-col md:w-[45%] md:gap-4">
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
            {/* PHONE INPUT */}
            <div className={inputContStyle}>
              <label htmlFor="phone" className="font-serif text-slate-800">
                phone:
              </label>
              <input
                type="text"
                id="phone"
                {...register('phone', {
                  required: true,
                })}
                className={inputStyle}
              />
              <div className="text-sm text-red-500">
                {errors?.phone?.type === 'required' && <p>*Required</p>}
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={isLoading}
          className="bg-primaryBlue hover:bg-primaryBlueHover mx-auto mt-6 block w-1/2 rounded-md py-[2px] font-semibold text-white"
        >
          {isLoading ? 'Loading' : 'Submit'}
        </button>
        {error && <p className="mt-2 text-center text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AddTeacher;
