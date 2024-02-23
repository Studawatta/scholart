import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowLeftLong, FaPlus } from 'react-icons/fa6';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import empty_propic from '../../assets/empty_propic.png';
import { makeRequest } from '../../axios';
import Header from '../../components/homeHeader/Header';
import { app } from '../../firebase';

const UpdateTeacher = () => {
  const navigate = useNavigate();
  const params = useParams();
  const teacherId = params.id;

  const fileRef = useRef();

  const [file, setFile] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  //fetching teacher
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
  const [proPic, setProPic] = useState(teacher.profile_pic);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  //file upload function
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURl) => {
          setProPic(downloadURl);
        });
      }
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTeacher) => {
      return makeRequest.put(`/teacher/update/${teacherId}`, newTeacher);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher'] });
    },
  });

  const onSubmit = (data) => {
    try {
      setIsPending(true);
      mutation.mutate({ ...data, proPic: proPic });
      setUpdateError('');
      setIsPending(false);
      alert('Updated!');
      navigate(`/teacher/profile/${teacherId}`);
    } catch (error) {
      setIsPending(false);
      setUpdateError(error.message);
    }
  };

  const inputContStyle = 'flex flex-col gap-[2px] h-[70px] ';
  const inputStyle = 'border border-slate-400 rounded-md outline-none px-4';
  return (
    <div className=" px-4 py-8 lg:px-20">
      <Header />
      <div className="mt-8 flex flex-col gap-5 lg:px-40">
        <div className="flex flex-1 flex-col overflow-hidden rounded-md bg-slate-200  py-4">
          <div className="flex h-10 w-full items-center  px-20">
            <Link
              to={`/teacher/profile/${teacherId}`}
              className="flex w-fit cursor-pointer select-none items-center text-xl font-semibold  text-primaryBlue hover:text-primaryBlueHover"
            >
              {' '}
              <FaArrowLeftLong /> Back
            </Link>
          </div>
          <div
            onClick={() => fileRef.current.click()}
            className="relative mx-auto h-32 w-32 cursor-pointer rounded-full"
          >
            <img
              src={proPic ? proPic : empty_propic}
              alt="profile_picture"
              className="h-32 w-32 rounded-full border-2 border-slate-400  object-cover "
            />
            <FaPlus className="absolute bottom-2 right-3 rounded-full bg-slate-400 text-white" />
          </div>
          <p className=" mt-2 self-center text-xs ">
            {fileUploadError ? (
              <span className="text-red-700">Error Image upload</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image succesfully uploaded!
              </span>
            ) : (
              ''
            )}
          </p>

          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" mx-auto w-3/4 rounded-md  px-8 py-3"
            >
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                ref={fileRef}
                hidden
                accept="image/*"
              />
              <div className="flex w-full flex-col justify-between md:flex-row ">
                {/* LEFT */}
                <div className="flex w-full flex-col md:w-[45%]">
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
                      onChange={() => {}}
                      id="teacher_name"
                      {...register('name', {
                        required: true,
                        value: teacher.name,
                      })}
                      className={inputStyle}
                    />
                    <div className="text-xs text-red-500">
                      {errors?.name?.type === 'required' && <p>*Required</p>}
                    </div>
                  </div>
                  {/* BIRTH DATE INPUT */}
                  <div className={inputContStyle}>
                    <label
                      htmlFor="subject"
                      className="font-serif text-slate-800"
                    >
                      Birth Date:
                    </label>
                    <input
                      type="date"
                      id="birth_date"
                      {...register('birth_date', { value: teacher.birth_date })}
                      className={inputStyle}
                    />
                  </div>
                  {/* ADDRESS INPUT */}
                  <div className={inputContStyle}>
                    <label
                      htmlFor="address"
                      className="font-serif text-slate-800"
                    >
                      Address:
                    </label>
                    <input
                      type="text"
                      id="address"
                      {...register('address', { value: teacher.address })}
                      className={inputStyle}
                    />
                  </div>
                </div>
                {/* RIGHT */}
                <div className="flex w-full  flex-col md:w-[45%]">
                  {/* PHONE INPUT */}
                  <div className={inputContStyle}>
                    <label
                      htmlFor="phone"
                      className="font-serif text-slate-800"
                    >
                      phone:
                    </label>
                    <input
                      type="text"
                      id="phone"
                      {...register('phone', {
                        required: true,
                        value: teacher.phone,
                      })}
                      className={inputStyle}
                    />
                    <div className="text-sm text-red-500">
                      {errors?.phone?.type === 'required' && <p>*Required</p>}
                    </div>
                  </div>
                  {/* SUBJECT INPUT */}
                  <div className={inputContStyle}>
                    <label
                      htmlFor="subject"
                      className="font-serif text-slate-800"
                    >
                      Subject:
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register('subject', {
                        required: true,
                        value: teacher.subject,
                      })}
                      className={inputStyle}
                    />
                    <div className=" text-sm text-red-500 ">
                      {errors?.subject?.type === 'required' && <p>*Required</p>}
                    </div>
                  </div>
                  {/* APPOINTED DATE INPUT */}
                  <div className={inputContStyle}>
                    <label
                      htmlFor="subject"
                      className="font-serif text-slate-800"
                    >
                      Appointed Date:
                    </label>
                    <input
                      type="date"
                      id="appointed_date"
                      {...register('appointed_date', {
                        required: true,
                        value: teacher.appointed_date,
                      })}
                      className={inputStyle}
                    />
                    <div className=" text-sm text-red-500 ">
                      {errors?.appointed_date?.type === 'required' && (
                        <p>*Required</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                disabled={isPending}
                className="mx-auto mt-6 block w-1/2 rounded-md bg-primaryBlue py-[2px] font-semibold text-white hover:bg-primaryBlueHover"
              >
                {isPending ? 'Loading' : 'Update'}
              </button>
              {updateError && (
                <p className="text-center text-red-500">{updateError}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateTeacher;
