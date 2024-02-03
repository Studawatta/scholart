import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navabar';
import Home from './pages/home/Home';
import Landing from './pages/landing/Landing';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import StudentsList from './pages/studentsList/StudentsList';
import TeachersList from './pages/teachersList/TeachersList';
import ClassesList from './pages/classesList/ClassesList';
import { useSelector } from 'react-redux';

const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={currentUser ? <Home /> : <Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/students" element={<StudentsList />} />
        <Route path="/teachers" element={<TeachersList />} />
        <Route path="/classes" element={<ClassesList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
