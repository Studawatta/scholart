import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { makeRequest } from '../../axios';
import { setShowStudentForm } from '../../redux/form/formSlice';

const schema = yup.object().shape({
  class: yup.string().notOneOf([''], 'You must select a class!'),
  name: yup.string().required('Required!'),
  birth_date: yup.string().required('Required!'),
  phone: yup.string().required('Required!'),
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
    console.log(data);
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
    <div className=" h-full w-full p-4">
      <div className=" flex items-center">
        <h1 className="mx-auto w-fit text-2xl font-semibold">Add Student</h1>

        <IoMdClose
          data-testid="closeBtn"
          className="cursor-pointer text-4xl hover:text-red-700"
          onClick={() => dispatch(setShowStudentForm())}
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : classes.length === 0 ? (
        <p className="mt-10 text-center text-3xl font-semibold text-slate-500">
          Please create at least one class before add students !
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-primaryBlue mx-auto mt-4 w-3/4 rounded-md border-2 px-8 py-8"
        >
          <div className="flex w-full flex-col justify-between md:flex-row ">
            <div className="flex flex-col md:w-[45%] md:gap-4">
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
                  {classes.map((clss) => (
                    <option key={clss.class_id} value={clss.class_id}>
                      {clss.class_name}
                    </option>
                  ))}
                </select>
                <div className=" text-sm text-red-500 ">
                  {errors.class && <p>{errors.class.message}</p>}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:w-[45%]">
              <div className={inputContStyle}>
                <label
                  htmlFor="birth_date"
                  className="font-serif text-slate-800"
                >
                  Birth Date:
                </label>
                <input
                  type="date"
                  id="birth_date"
                  {...register('birth_date')}
                  className={inputStyle}
                />
                <div className="text-sm text-red-500">
                  {errors.birth_date && <p>{errors.birth_date.message}</p>}
                </div>
              </div>
              <div className={inputContStyle}>
                <label htmlFor="phone" className="font-serif text-slate-800">
                  Phone:
                </label>
                <input
                  type="text"
                  id="phone"
                  {...register('phone')}
                  className={inputStyle}
                />
                <div className="text-sm text-red-500">
                  {errors.phone && <p>{errors.phone.message}</p>}
                </div>
              </div>
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

export default AddStudent;
