import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/homeHeader/Header';
import empty_propic from '../../assets/empty_propic.png';
import { makeRequest } from '../../axios';
import { useQuery } from 'react-query';
import { FaArrowLeftLong } from 'react-icons/fa6';

const StudentProfile = () => {
  const params = useParams();
  const teacherId = params.id;

  const navigate = useNavigate();
  const {
    data: student,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['students'],
    queryFn: async () =>
      await makeRequest.get(`/student/profile/${teacherId}`).then((res) => {
        return res.data;
      }),
  });

  const handleDelete = async (id) => {
    try {
      await makeRequest.delete(`/teacher/${id}`);
      alert('Deleted!');
      navigate('/teachers');
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className=" px-4 py-8 lg:px-20">
      <Header />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className=" mt-8 flex flex-col bg-slate-200 pb-10">
          <div className="flex h-10 w-full items-center  px-20">
            <Link
              to={'/students'}
              className="flex w-fit cursor-pointer select-none items-center text-xl font-semibold  text-primaryBlue hover:text-primaryBlueHover"
            >
              <FaArrowLeftLong /> Back
            </Link>
          </div>
          <div className="mx-auto flex flex-col items-center">
            <img
              src={empty_propic}
              alt="profile_picture"
              className=" h-32 w-32 rounded-full border-2 border-slate-400 object-cover md:h-40  md:w-40 "
            />
            <h1 className=" text-center text-xl font-semibold text-slate-700 md:text-2xl">
              {student.student_name}
            </h1>
          </div>
          <div className=" mx-auto mt-5 flex w-fit max-w-[700px] flex-col-reverse text-sm md:w-1/2  md:flex-row md:text-base  ">
            <div className="flex flex-1 md:justify-center">
              <div className="flex w-fit flex-col gap-4">
                <p className="font-semibold text-slate-700">
                  Class :{' '}
                  <span className="font-normal">{student.class_name}</span>{' '}
                </p>
                <p className="font-semibold text-slate-700">
                  Address :{' '}
                  <span className="font-normal">
                    {student.address && student.address}
                  </span>{' '}
                </p>
                <p className="font-semibold text-slate-700">
                  Birth Date :{' '}
                  <span className="font-normal">{student.birth_date}</span>{' '}
                </p>
                <p className="font-semibold text-slate-700">
                  Phone : <span className="font-normal">{student.phone}</span>{' '}
                </p>
                <div className="flex flex-col gap-2">
                  <button className="w-40 rounded-md bg-primaryGreen uppercase text-white hover:bg-primaryGreenHover">
                    update
                  </button>
                  <button
                    onClick={() => handleDelete(student.student_id)}
                    className="w-40 rounded-md bg-red-600 uppercase text-white hover:bg-red-700 "
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
