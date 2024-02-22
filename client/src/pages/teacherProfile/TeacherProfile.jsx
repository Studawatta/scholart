import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/homeHeader/Header';
import empty_propic from '../../assets/empty_propic.png';
import { makeRequest } from '../../axios';
import { useQuery } from 'react-query';

const TeacherProfile = () => {
  const params = useParams();
  const teacherId = params.id;

  const navigate = useNavigate();
  const {
    data: teacher,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['teachers'],
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
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className=" mt-8 flex py-10 bg-slate-200 flex-col gap-5">
          <div className="mx-auto flex flex-col items-center">
            <img
              src={empty_propic}
              alt="profile_picture"
              className=" w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2  border-slate-400 "
            />
            <h1 className=" text-xl md:text-2xl text-slate-700 font-semibold text-center">
              {teacher.name}
            </h1>
          </div>
          <div className=" text-sm md:text-base w-fit md:w-1/2 max-w-[700px] mx-auto flex  flex-col-reverse md:flex-row  ">
            <div className="flex-1 flex md:justify-center px-4 py-4 md:border-r-2 border-white">
              <div className="flex flex-col gap-4 w-fit">
                <h2 className=" text-xs md:text-sm italic underline text-slate-500 font-semibold">
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
                  <button className="bg-primaryGreen rounded-md w-40 uppercase text-white hover:bg-primaryGreenHover">
                    update
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id)}
                    className="bg-red-600 rounded-md w-40 uppercase text-white hover:bg-red-700 "
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 flex md:justify-center py-4 px-4">
              <div className="flex flex-col gap-4  w-fit ">
                <h2 className="text-xs md:text-sm italic underline text-slate-500 font-semibold">
                  Professional Details
                </h2>
                <p className="font-semibold text-slate-700">
                  Subject :{' '}
                  <span className="font-normal">{teacher.subject}</span>{' '}
                </p>
                <div>
                  <p className="font-semibold text-slate-700">
                    Education Qualifications :{' '}
                  </p>

                  <ul className="list-disc ml-10">
                    {teacher.qualifications &&
                      teacher.qualifications.map((qualification, index) => (
                        <li key={index}>{qualification}</li>
                      ))}
                  </ul>
                </div>

                <p className="font-semibold text-slate-700">
                  Appointed Date :{' '}
                  <span className="font-normal">{teacher.appointed_date}</span>{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;
