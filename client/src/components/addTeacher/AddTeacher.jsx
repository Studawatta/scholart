import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setShowTeacherForm } from '../../redux/form/formSlice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import axios from 'axios';

const schema = yup.object().shape({
  subject: yup.string().notOneOf([''], 'You must select a subject!'),
  name: yup.string().required('Required!'),
});

const AddTeacher = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await axios.post('http://localhost:8080/api/teacher', data, {
        withCredentials: true,
      });
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
                {...register('name')}
                className={inputStyle}
              />
              <div className="text-sm text-red-500">
                {errors.name && <p>{errors.name.message}</p>}
              </div>
            </div>

            <div className={inputContStyle}>
              <label htmlFor="subject" className="font-serif text-slate-800">
                Subject:
              </label>
              <select
                name="subject"
                id="subject"
                {...register('subject')}
                className={inputStyle}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="maths">Maths</option>
                <option value="science">Science</option>
                <option value="history">History</option>
              </select>
              <div className=" text-sm text-red-500 ">
                {errors.subject && <p>{errors.subject.message}</p>}
              </div>
            </div>
          </div>

          <div className=" w-full md:w-[45%]">
            <div className={inputContStyle}>
              <label htmlFor="subject" className="font-serif text-slate-800">
                Appointed Date:
              </label>
              <input type="date" id="subject" className={inputStyle} />
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
