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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

const schema = yup.object().shape({
  name: yup.string().required('Required!'),
  birth_date: yup.string().required('Required!'),
  phone: yup.string().required('Required!'),
});

const UpdateStudent = () => {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const params = useParams();
  const studentId = params.id;

  const fileRef = useRef();

  const [file, setFile] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [proPic, setProPic] = useState(null);

  //Fetching classes
  const { data: classes, isLoading: classLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: async () =>
      await makeRequest.get(`/class/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });
  //fetching student
  const {
    data: student,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['student'],
    queryFn: async () =>
      await makeRequest.get(`/student/profile/${studentId}`).then((res) => {
        return res.data;
      }),
  });

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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newStudent) => {
      return makeRequest.put(`/student/update/${studentId}`, newStudent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student'] });
    },
  });

  const onSubmit = (data) => {
    try {
      setIsPending(true);
      mutation.mutate({ ...data, proPic: proPic });
      setUpdateError('');
      setIsPending(false);
      alert('Updated!');
      navigate(`/student/profile/${studentId}`);
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
              to={`/student/profile/${studentId}`}
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
            {isLoading ? (
              'loading..'
            ) : (
              <img
                src={
                  proPic
                    ? proPic
                    : student.profile_pic
                      ? student.profile_pic
                      : empty_propic
                }
                alt="profile_picture"
                className="h-32 w-32 rounded-full border-2 border-slate-400  object-cover "
              />
            )}

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
                      htmlFor="student_name"
                      className="font-serif text-slate-800"
                    >
                      Name:
                    </label>
                    <input
                      type="text"
                      id="student_name"
                      {...register('name', { value: student.student_name })}
                      className={inputStyle}
                    />
                    <div className="text-xs text-red-500">
                      {errors.name && <p>{errors.name.message}</p>}
                    </div>
                  </div>
                  {/* CLASS INPUT */}
                  <div className={inputContStyle}>
                    <label
                      htmlFor="class"
                      className="font-serif text-slate-800"
                    >
                      Class:
                    </label>
                    <select
                      name="class"
                      id="class"
                      {...register('class')}
                      className={inputStyle}
                      defaultValue={student.class_id}
                    >
                      <option value="" disabled>
                        {student.class_name}
                      </option>
                      {classLoading ? (
                        <p>Loading...</p>
                      ) : (
                        classes.map((clss) => (
                          <option key={clss.class_id} value={clss.class_id}>
                            {clss.class_name}
                          </option>
                        ))
                      )}
                    </select>
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
                      {...register('address', { value: student.address })}
                      className={inputStyle}
                    />
                  </div>
                </div>
                {/* RIGHT */}
                <div className="flex w-full  flex-col md:w-[45%]">
                  {/* BIRTH DATE INPUT */}
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
                      {...register('birth_date', { value: student.birth_date })}
                      className={inputStyle}
                    />
                    <div className="text-xs text-red-500">
                      {errors.birth_date && <p>{errors.birth_date.message}</p>}
                    </div>
                  </div>

                  {/* PHONE INPUT */}
                  <div className={inputContStyle}>
                    <label
                      htmlFor="phone"
                      className="font-serif text-slate-800"
                    >
                      Phone:
                    </label>
                    <input
                      type="text"
                      id="phone"
                      {...register('phone', { value: student.phone })}
                      className={inputStyle}
                    />
                    <div className="text-xs text-red-500">
                      {errors.phone && <p>{errors.phone.message}</p>}
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

export default UpdateStudent;
