import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { makeRequest } from '../../axios';
import AddClass from '../../components/addClass/AddClass';
import Header from '../../components/homeHeader/Header';
import { setShowClassForm } from '../../redux/form/formSlice';

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
    <div className=" py-8 px-20">
      <Header />
      <div className=" flex flex-col md:flex-row mt-8 gap-5 md:gap-0">
        <div>
          <button
            className={` w-48 py-1 px-2 rounded-lg flex mx-auto items-center justify-between text-slate-600 font-semibold
                   cursor-pointer border-2 border-primaryBlue hover:bg-slate-200 select-none`}
            onClick={() => dispatch(setShowClassForm())}
          >
            <span>Add Class</span>
            <FaPlus />
          </button>
        </div>
        <div className="flex-1 lg:ml-10 bg-slate-200 rounded-md  items-center justify-center  lg:py-4 flex overflow-hidden">
          {showClassForm ? (
            <AddClass />
          ) : (
            <div>
              {error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : isLoading ? (
                <p className="text-center text-slate-700">Loading...</p>
              ) : classes.length > 0 ? (
                <div className=" h-full py-1 flex  flex-col">
                  <div className="flex gap-1">
                    <span className="w-6"></span>
                    <span className="w-[250px] bg-[#006666] text-white font-semibold rounded-md text-center select-none">
                      Name
                    </span>
                    <span className="w-[250px] bg-[#006666] text-white font-semibold rounded-md text-center select-none">
                      In Charge Teacher
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col h-[445px] py-1 overflow-auto gap-2">
                    {classes.map((item, index) => (
                      <div key={index} className=" flex gap-1">
                        <span className="font-semibold w-6">
                          {index < 9 ? '0' + (index + 1) : index + 1}.
                        </span>
                        <span className="w-[250px] bg-slate-600 text-white font-semibold rounded-md pl-8 cursor-pointer hover:underline">
                          {item.name}
                        </span>
                        <span className="w-[250px] bg-slate-600 text-white font-semibold rounded-md pl-8">
                          {item.incharge_teacher}
                        </span>

                        <span
                          onClick={() => handleDelete(item.id)}
                          className="font-semibold text-red-600 cursor-pointer hover:underline select-none ml-2"
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
