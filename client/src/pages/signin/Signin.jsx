import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../../redux/user/userSlice';

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      dispatch(signInStart());
      const res = await axios.post(
        'https://scholart.onrender.com/api/auth/signin',
        data,
        {
          withCredentials: true,
        }
      );
      dispatch(signInSuccess(res.data));
      navigate('/');
    } catch (error) {
      if (error.response.data.message) {
        return dispatch(signInFailure(error.response.data.message));
      }
      dispatch(signInFailure('Something went wrong!'));
    }
  };
  const inputContainerStyle = 'flex flex-col h-[80px]';
  const inputStyle =
    'border border-slate-500 rounded-sm mt-1 px-4 py-[2px] w-[250px] focus:outline-none';
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-slate-100">
      <h1 className="text-3xl font-semibold">Sign In</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-sm border border-black p-6"
      >
        <div className={inputContainerStyle}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register('email', {
              required: true,
            })}
            className={inputStyle}
          />
          <div className=" text-sm text-red-500 ">
            {errors?.email?.type === 'required' && <p>*Required</p>}
          </div>
        </div>

        <div className={`${inputContainerStyle} h-[88px]`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: true,
            })}
            className={inputStyle}
          />
          <div className=" text-sm text-red-500 ">
            {errors?.password?.type === 'required' && <p>*Required</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primaryBlue hover:bg-primaryBlueHover mx-auto mt-1 block rounded-sm px-8 py-1 font-semibold text-white"
        >
          {loading ? 'Loading' : 'Sign In'}
        </button>
      </form>
      {error && (
        <p data-testid="error" style={{ color: 'red' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Signin;
