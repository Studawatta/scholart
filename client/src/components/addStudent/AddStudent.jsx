import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setShowStudentForm } from '../../redux/form/formSlice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { makeRequest } from '../../axios';

const schema = yup.object().shape({
  class: yup.string().notOneOf([''], 'You must select a class!'),
  name: yup.string().required('Required!'),
  age: yup.string().required('Required!'),
});

const AddStudent = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  //Fetching classes
  const { data: classes, isLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: async () =>
      await makeRequest.get(`/class/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      class: '',
    },
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newStudent) => {
      return makeRequest.post('/student', newStudent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
  const onSubmit = async (data) => {
    try {
      setIsPending(true);
      mutation.mutate(data);
      setError('');
      setIsPending(false);
      alert('Student added!');
      reset();
    } catch (error) {
      setIsPending(false);
      setError(error.message);
    }
  };

  const inputContStyle = 'flex flex-col gap-1  h-[84px] ';
  const inputStyle =
    'border border-slate-400 rounded-md outline-none px-4 py-[2px]';
  return (
    <div className=" w-full h-full p-4">
      <div className=" flex items-center">
        <h1 className="text-2xl font-semibold mx-auto w-fit">Add Student</h1>

        <IoMdClose
          data-testid="closeBtn"
          className="text-4xl cursor-pointer hover:text-red-700"
          onClick={() => dispatch(setShowStudentForm())}
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : classes.length === 0 ? (
        <p className="text-3xl font-semibold text-center mt-10 text-slate-500">
          Please add classes before create classes !
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-2 w-3/4 mx-auto border-primaryBlue rounded-md mt-4 py-8 px-8"
        >
          <div className="flex flex-col md:flex-row justify-between w-full ">
            <div className="md:w-[45%] flex flex-col md:gap-4">
              <div className={inputContStyle}>
                <label
                  htmlFor="student_name"
                  className="font-serif text-slate-800"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="student_name"
                  {...register('name')}
                  className={inputStyle}
                />
                <div className="text-sm text-red-500">
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
              </div>

              <div className={inputContStyle}>
                <label htmlFor="class" className="font-serif text-slate-800">
                  Class:
                </label>
                <select
                  name="class"
                  id="class"
                  {...register('class')}
                  className={inputStyle}
                >
                  <option value="" disabled>
                    Select a class
                  </option>
                  {classes.map((item) => (
                    <option value={item.name}>{item.name}</option>
                  ))}
                </select>
                <div className=" text-sm text-red-500 ">
                  {errors.class && <p>{errors.class.message}</p>}
                </div>
              </div>
            </div>

            <div className="md:w-[45%] flex flex-col gap-4">
              <div className={inputContStyle}>
                <label htmlFor="age" className="font-serif text-slate-800">
                  Age:
                </label>
                <input
                  type="text"
                  id="age"
                  {...register('age')}
                  className={inputStyle}
                />
                <div className="text-sm text-red-500">
                  {errors.age && <p>{errors.age.message}</p>}
                </div>
              </div>
              <div className={inputContStyle}>
                <p className="font-serif text-slate-800">Gender:</p>
                <div className="flex gap-4">
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      defaultChecked
                      value={'male'}
                      {...register('gender')}
                    />

                    <label htmlFor="male" className="font-serif text-slate-800">
                      Male
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value={'female'}
                      {...register('gender')}
                    />
                    <label
                      htmlFor="female"
                      className="font-serif text-slate-800"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            disabled={isPending}
            className="w-1/2 bg-primaryBlue py-[2px] rounded-md font-semibold text-white mx-auto block mt-6 hover:bg-primaryBlueHover"
          >
            {isPending ? 'Loading' : 'Submit'}
          </button>
          {error && <p className="text-center text-red-500 mt-2">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default AddStudent;
