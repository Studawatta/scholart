import { QueryClient, QueryClientProvider } from 'react-query';
import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navabar';
import ClassesList from './pages/classesList/ClassesList';
import Home from './pages/home/Home';
import Landing from './pages/landing/Landing';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import StudentsList from './pages/studentsList/StudentsList';
import TeachersList from './pages/teachersList/TeachersList';
import TeacherProfile from './pages/teacherProfile/TeacherProfile';
import StudentProfile from './pages/studentProfile/StudentProfile';
import UpdateTeacher from './pages/updateTeacher/UpdateTeacher';
import UpdateStudent from './pages/updateStudent/UpdateStudent';
import ClassProfile from './pages/classProfile/ClassProfile';
const App = () => {
  const { currentUser } = useSelector((state) => state.user);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };

  const PrivateRoute = () => {
    return currentUser ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={currentUser ? <Home /> : <Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/students" element={<StudentsList />} />
            <Route path="/teachers" element={<TeachersList />} />
            <Route path="/classes" element={<ClassesList />} />
            <Route path="/teacher/profile/:id" element={<TeacherProfile />} />
            <Route path="/student/profile/:id" element={<StudentProfile />} />
            <Route path="/class/profile/:id" element={<ClassProfile />} />
            <Route path="/teacher/update/:id" element={<UpdateTeacher />} />
            <Route path="/student/update/:id" element={<UpdateStudent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
