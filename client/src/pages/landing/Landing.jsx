import { useEffect } from 'react';
import Landing_Background from '../../assets/Landing_Background.mp4';
import logo from '../../assets/logo.png';

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="">
      <div className=" relative h-screen  min-w-full">
        <video
          src={Landing_Background}
          autoPlay
          loop
          muted
          type="video/mp4"
          className=" h-screen min-w-full object-cover"
        />
        <div className=" absolute bottom-[25%] left-0 right-0 mx-auto flex select-none flex-col items-center">
          <h1 className="w-fit text-center text-4xl font-medium text-white drop-shadow-[0_5px_2px_black] md:text-6xl">
            Free Online School
            <br /> Management Software
          </h1>
          <p className=" mt-10 text-center text-xl text-white md:text-2xl ">
            <span className="drop-shadow-[0_1px_2px_black]">
              Now you can manage your school, college, or any educational center
              with
            </span>
            <br />
            <img
              src={logo}
              alt="scholart_logo"
              className="mx-auto my-5 w-40 "
            />{' '}
            <span className="drop-shadow-[0_1px_2px_black]">
              It's 100% free for a lifetime with no limitations.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
