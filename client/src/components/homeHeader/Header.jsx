import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  const headerButtonStyle =
    'cursor-pointer hover:underline bg-primaryBlue lg:bg-transparent w-full lg:w-fit md:w-3/5 text-center rounded-md';
  return (
    <div>
      <h1 className=" text-2xl select-none mb-5  lg:mb-10 md:text-4xl text-center underline font-semibold italic">
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
        className={`bg-white justify-center text-white font-semibold gap-2 py-[2px] px-10 flex lg:text-lg
                     rounded-md flex-col lg:flex-row lg:bg-primaryBlue lg:gap-32 items-center`}
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
