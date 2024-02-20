import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await axios.post('http://localhost:8080/api/auth/signup', data);
      setError('');
      setIsLoading(false);
      navigate('/signin');
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
    }
  };
  const inputContainerStyle = 'flex flex-col h-[80px]';
  const inputStyle =
    'border border-slate-500 rounded-sm mt-1 px-4 py-[2px] w-[250px] focus:outline-none';
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-slate-100">
      <h1 className="text-3xl font-semibold">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-sm border border-black p-6"
      >
        <div className={inputContainerStyle}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register('username', {
              required: true,
              maxLength: 20,
              minLength: 4,
              pattern: /^[A-Za-z]+$/,
            })}
            className={inputStyle}
          />
          <div className=" text-sm text-red-500 ">
            {errors?.username?.type === 'required' && <p>*Required</p>}
            {errors.username?.type === 'maxLength' && (
              <p>*Username must less than 20 characters</p>
            )}
            {errors.username?.type === 'minLength' && (
              <p>*Username not long enough</p>
            )}
            {errors?.username?.type === 'pattern' && (
              <p>*Alphebetical characters only</p>
            )}
          </div>
        </div>

        <div className={inputContainerStyle}>
          <label htmlFor="school_name">School name</label>
          <input
            type="text"
            id="school_name"
            {...register('school_name', {
              required: true,
              minLength: 4,
            })}
            className={inputStyle}
          />
          <div className=" text-sm text-red-500 ">
            {errors?.school_name?.type === 'required' && <p>*Required</p>}

            {errors.school_name?.type === 'minLength' && (
              <p>*School name not long enough</p>
            )}
          </div>
        </div>

        <div className={inputContainerStyle}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register('email', {
              required: true,
              pattern:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            })}
            className={inputStyle}
          />
          <div className=" text-sm text-red-500 ">
            {errors?.email?.type === 'required' && <p>*Required</p>}

            {errors.email?.type === 'pattern' && <p>*Invalid email</p>}
          </div>
        </div>

        <div className={`${inputContainerStyle} h-[88px]`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            })}
            className={inputStyle}
          />
          <div className=" text-sm text-red-500 ">
            {errors?.password?.type === 'required' && <p>*Required</p>}

            {errors.password?.type === 'pattern' && (
              <p className="w-[250px] text-xs">
                *Password must contain minimum eight characters, at least one
                letter and one number.
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-primaryBlue hover:bg-primaryBlueHover mx-auto mt-1 block rounded-sm px-8 py-1 font-semibold text-white"
        >
          Sign Up
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

export default Signup;
