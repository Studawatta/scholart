import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
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
        'http://localhost:8080/api/auth/signin',
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
    <div className="h-screen bg-slate-100 flex flex-col justify-center items-center gap-10">
      <h1 className="text-3xl font-semibold">Sign In</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-black p-6 rounded-sm"
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
          className="bg-primaryBlue mt-1 text-white px-8 font-semibold py-1 rounded-sm mx-auto block hover:bg-primaryBlueHover"
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
