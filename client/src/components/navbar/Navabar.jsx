import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from '../../redux/user/userSlice';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const changeNav = () => {
    if (window.scrollY >= 72) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      await axios.post(
        'http://localhost:8080/api/auth/signout',
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const buttonStyle =
    'flex gap-2 items-center justify-center  h-9 sm:h-11 w-20 xs:w-24 sm:w-32 rounded-[20px] xs:rounded-full cursor-pointer duration-500 select-none ';
  return (
    <div
      className={`fixed top-0 z-50  flex h-16 w-full items-center justify-between px-5 sm:h-[72px] sm:px-16 lg:px-[16%]  ${
        isScrolled ? 'bg-black/50 backdrop-blur-[5px]' : ''
      } `}
    >
      {/* NAVBAR_LEFT  */}
      <div>
        {/* LOGO */}
        <Link to="/">
          <img
            src={logo}
            alt="scholart_logo"
            className=" h-12 cursor-pointer sm:h-14"
          />
        </Link>
      </div>
      {/* NAVBAR_RIGHT */}
      <div>
        {/* SIGNUP */}
        {currentUser ? (
          <div
            onClick={handleSignOut}
            className={`${buttonStyle} bg-white text-red-600 hover:bg-slate-300 `}
          >
            <AiOutlineLogin className="hidden  sm:block" />
            <button>Sign Out</button>
          </div>
        ) : (
          <div className=" flex gap-5">
            <Link
              to="/signup"
              className={`${buttonStyle} bg-primaryBlue hover:bg-primaryBlueHover text-white`}
            >
              {/* bg-primaryBlue hover:bg-primaryBlueHover text-white */}
              <AiOutlineUserAdd className="hidden sm:block" />
              <button>Sign Up</button>
            </Link>
            {/* LOGIN */}
            <Link
              to="/signin"
              className={`${buttonStyle} bg-white hover:bg-slate-300 `}
            >
              <AiOutlineLogin className="hidden sm:block" />
              <button>Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
