import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  const headerButtonStyle =
    'cursor-pointer hover:underline bg-primaryBlue lg:bg-transparent w-full lg:w-fit md:w-3/5 text-center rounded-md';
  return (
    <div>
      <h1 className=" mb-5 select-none text-center  text-2xl font-semibold italic underline md:text-4xl lg:mb-10">
        {currentUser ? (
          currentUser.school_name
            .split(' ')
            .map((name) => (
              <span key={name}>
                {name.charAt(0).toUpperCase() + name.slice(1)}{' '}
              </span>
            ))
        ) : (
          <span>No User</span>
        )}
      </h1>
      <div
        className={` lg:bg-primaryBlue flex flex-col items-center justify-center gap-2 rounded-md bg-white px-10
                     py-[2px] font-semibold text-white lg:flex-row lg:gap-32 lg:text-lg`}
      >
        <Link to={'/'} className={headerButtonStyle}>
          <button>Home</button>
        </Link>
        <Link to={'/teachers'} className={headerButtonStyle}>
          <button>Teachers</button>
        </Link>
        <Link to={'/classes'} className={headerButtonStyle}>
          <button>Classes</button>
        </Link>
        <Link to={'/students'} className={headerButtonStyle}>
          <button>Students</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
