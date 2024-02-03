import { useSelector } from 'react-redux';
import HomeSideBar from '../../components/homeSideBar/HomeSideBar';
import Header from '../../components/homeHeader/Header';
import logo from '../../assets/logo.png';
import AddTeacher from '../../components/addTeacher/AddTeacher';
import AddClass from '../../components/addClass/AddClass';
import AddStudent from '../../components/addStudent/AddStudent';

const Home = () => {
  const { showStudentForm, showTeacherForm, showClassForm } = useSelector(
    (state) => state.form
  );
  return (
    <div className="mt-16 py-8 lg:px-20 px-10  h-[calc(100vh-64px)]">
      <Header />
      <div className="lg:mt-16 mt-8">
        <div className="flex">
          <HomeSideBar />
          <div className="flex-1 lg:ml-10 bg-slate-200 rounded-md  items-center justify-center lg:h-[400px] py-10 lg:py-0 flex">
            {showClassForm ? (
              <AddClass />
            ) : showTeacherForm ? (
              <AddTeacher />
            ) : showStudentForm ? (
              <AddStudent />
            ) : (
              <div>
                <p className=" text-center font-semibold text-slate-700  text-xl md:text-2xl ">
                  <span>
                    Now you can manage your school, college, or any educational
                    center with
                  </span>
                  <br />
                  <img
                    src={logo}
                    alt="scholart_logo"
                    className="w-40 mx-auto my-5 "
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
