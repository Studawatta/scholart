import logo from '../../assets/logo.png';
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  const buttonStyle =
    'flex gap-2 items-center justify-center  h-9 sm:h-11 w-20 xs:w-24 sm:w-32 rounded-[20px] xs:rounded-full cursor-pointer duration-500 select-none ';
  return (
    <div
      className={`fixed top-0 z-50 h-16 sm:h-[72px] w-full px-5 sm:px-16 lg:px-[16%] flex justify-between items-center  ${
        isScrolled ? 'bg-black/50' : ''
      } `}
    >
      {/* NAVBAR_LEFT  */}
      <div>
        {/* LOGO */}
        <Link to="/">
          <img
            src={logo}
            alt="scholart_logo"
            className=" h-12 sm:h-14 cursor-pointer"
          />
        </Link>
      </div>
      {/* NAVBAR_RIGHT */}
      <div className=" flex gap-5">
        {/* SIGNUP */}
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
    </div>
  );
};

export default Navbar;
