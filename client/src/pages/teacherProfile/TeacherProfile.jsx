import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/homeHeader/Header';
import empty_propic from '../../assets/empty_propic.png';
import { makeRequest } from '../../axios';
import { useQuery } from 'react-query';
import { FaArrowLeftLong } from 'react-icons/fa6';

const TeacherProfile = () => {
  const params = useParams();
  const teacherId = params.id;

  const navigate = useNavigate();
  const {
    data: teacher,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['teacher'],
    queryFn: async () =>
      await makeRequest.get(`/teacher/profile/${teacherId}`).then((res) => {
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
      <div className="mt-8 flex flex-col gap-5 lg:px-40">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="flex flex-1 flex-col overflow-hidden rounded-md bg-slate-200  py-4">
            <div className="flex h-10 w-full items-center  px-20">
              <Link
                to={'/teachers'}
                className="flex w-fit cursor-pointer select-none items-center text-xl font-semibold text-primaryBlue hover:text-primaryBlueHover"
              >
                {' '}
                <FaArrowLeftLong /> Back
              </Link>
            </div>
            <div className="mx-auto flex flex-col gap-1 items-center">
              <img
                src={teacher.profile_pic ? teacher.profile_pic : empty_propic}
                alt="profile_picture"
                className=" h-32 w-32 rounded-full border-2 border-slate-400 object-cover  "
              />
              <h1 className=" text-center text-xl font-semibold text-slate-700 md:text-2xl">
                {teacher.name}
              </h1>
            </div>
            <div className=" mx-auto flex w-fit max-w-[700px] flex-col-reverse text-sm md:w-1/2  md:flex-row md:text-base  ">
              <div className="flex flex-1 border-white px-4 py-4 md:justify-center md:border-r-2">
                <div className="flex w-fit flex-col gap-4">
                  <h2 className=" text-xs font-semibold italic text-slate-500 underline md:text-sm">
                    Persanol Details
                  </h2>
                  <p className="font-semibold text-slate-700">
                    Address :{' '}
                    <span className="font-normal">
                      {teacher.address && teacher.address}
                    </span>{' '}
                  </p>
                  <p className="font-semibold text-slate-700">
                    Birth Date :{' '}
                    <span className="font-normal">
                      {teacher.birth_date && teacher.birth_date}
                    </span>{' '}
                  </p>
                  <p className="font-semibold text-slate-700">
                    Phone :{' '}
                    <span className="font-normal">
                      {teacher.phone && teacher.phone}
                    </span>{' '}
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link
                      to={'/teacher/update/' + teacher.id}
                      className="w-40 rounded-md bg-primaryGreen text-center uppercase text-white hover:bg-primaryGreenHover"
                    >
                      update
                    </Link>
                    <button
                      onClick={() => handleDelete(teacher.id)}
                      className="w-40 rounded-md bg-red-600 uppercase text-white hover:bg-red-700 "
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 px-4 py-4 md:justify-center">
                <div className="flex w-fit flex-col  gap-4 ">
                  <h2 className="text-xs font-semibold italic text-slate-500 underline md:text-sm">
                    Professional Details
                  </h2>
                  <p className="font-semibold text-slate-700">
                    Subject :{' '}
                    <span className="font-normal">{teacher.subject}</span>{' '}
                  </p>

                  <p className="font-semibold text-slate-700">
                    Appointed Date :{' '}
                    <span className="font-normal">
                      {teacher.appointed_date}
                    </span>{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherProfile;
