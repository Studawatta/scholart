import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { makeRequest } from '../../axios';
import AddClass from '../../components/addClass/AddClass';
import Header from '../../components/homeHeader/Header';
import { setShowClassForm } from '../../redux/form/formSlice';
import { Link } from 'react-router-dom';

const ClassesList = () => {
  const dispatch = useDispatch();

  const { showClassForm } = useSelector((state) => state.form);
  const { currentUser } = useSelector((state) => state.user);

  const {
    data: classes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['classes'],
    queryFn: async () =>
      await makeRequest.get(`/class/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });
  useEffect(() => {
    if (showClassForm) {
      dispatch(setShowClassForm());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      await makeRequest.delete(`/class/${id}`);
      alert('Deleted!');
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className=" px-4 py-8 lg:px-20">
      <Header />
      <div className=" mt-8 flex flex-col gap-5 text-sm md:text-base lg:flex-row lg:gap-0 ">
        <div className="flex flex-col gap-5 lg:gap-10 ">
          <button
            className={`border-primaryBlue mx-auto flex w-36 cursor-pointer  select-none items-center justify-between rounded-lg border-2 px-2 py-[2px]
                   font-semibold text-slate-600 hover:bg-slate-200 lg:w-48 lg:py-1`}
            onClick={() => dispatch(setShowClassForm())}
          >
            <span>Add Class</span>
            <FaPlus />
          </button>
        </div>
        <div className="flex flex-1 overflow-hidden rounded-md bg-slate-200 px-1 py-4 lg:ml-10">
          {showClassForm ? (
            <AddClass />
          ) : (
            <div className=" w-full">
              {error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : isLoading ? (
                <p className="text-center text-slate-700">Loading...</p>
              ) : classes.length > 0 ? (
                <div className=" flex h-full w-full flex-col py-1">
                  <div className="mx-auto flex w-full justify-center gap-1 md:w-3/5 ">
                    <span className="w-6"></span>
                    <span className="w-[38%] max-w-[350px] select-none rounded-md bg-[#006666] text-center font-semibold text-white">
                      Name
                    </span>
                    <span className="w-[38%] max-w-[350px] select-none rounded-md bg-[#006666] text-center font-semibold text-white">
                      In Charge Teacher
                    </span>
                    <span className="ml-2 hidden w-12 md:block"></span>
                  </div>
                  <div className="mx-auto  mt-4 flex h-[445px] w-full flex-col gap-2 overflow-auto py-1 md:w-3/5">
                    {classes.map((clss, index) => (
                      <div
                        key={index}
                        className=" flex w-full justify-center gap-1"
                      >
                        <span className="w-6 font-semibold">
                          {index < 9 ? '0' + (index + 1) : index + 1}.
                        </span>
                        <Link
                          to={`/class/profile/${clss.class_id}`}
                          className="w-[38%] max-w-[350px] cursor-pointer rounded-md bg-slate-600 pl-4 font-semibold text-white hover:underline"
                        >
                          {clss.class_name}
                        </Link>
                        <span className="w-[38%] max-w-[350px] rounded-md bg-slate-600 pl-4 font-semibold text-white">
                          {clss.incharge_teacher}
                        </span>

                        <span
                          onClick={() => handleDelete(clss.class_id)}
                          className="ml-2 hidden w-12 cursor-pointer select-none font-semibold text-red-600 hover:underline md:block"
                        >
                          Delete
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-3xl font-semibold">No Classes</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassesList;
