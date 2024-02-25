import { useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import AddClass from '../../components/addClass/AddClass';
import AddStudent from '../../components/addStudent/AddStudent';
import AddTeacher from '../../components/addTeacher/AddTeacher';
import Header from '../../components/homeHeader/Header';
import HomeSideBar from '../../components/homeSideBar/HomeSideBar';

const Home = () => {
  const { showStudentForm, showTeacherForm, showClassForm } = useSelector(
    (state) => state.form
  );
  return (
    <div className="mt-16 px-10 pb-16 pt-8 lg:px-20  ">
      <Header />
      <div className="mt-8 lg:mt-16">
        <div className="flex">
          <HomeSideBar />
          <div className="flex flex-1 items-center justify-center  overflow-hidden rounded-md bg-slate-200 py-10 lg:ml-10 lg:h-[400px] lg:py-0">
            {showClassForm ? (
              <AddClass />
            ) : showTeacherForm ? (
              <AddTeacher />
            ) : showStudentForm ? (
              <AddStudent />
            ) : (
              <div>
                <p className=" text-center text-xl font-semibold  text-slate-700 md:text-2xl ">
                  <span>
                    Now you can manage your school, college, or any educational
                    center with
                  </span>
                  <br />
                  <img
                    src={logo}
                    alt="scholart_logo"
                    className="mx-auto my-5 w-40 "
                  />{' '}
                  <span>
                    It's 100% free for a lifetime with no limitations.
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
