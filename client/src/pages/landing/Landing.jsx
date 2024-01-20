import { useEffect } from 'react';
import logo from '../../assets/logo.png';
import Landing_Background from '../../assets/Landing_Background.mp4';

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
          className=" min-w-full h-screen object-cover"
        />
        <div className=" absolute bottom-[25%] left-0 right-0 flex flex-col items-center mx-auto select-none">
          <h1 className="w-fit text-4xl md:text-6xl text-center font-medium text-white drop-shadow-[0_5px_2px_black]">
            Free Online School
            <br /> Management Software
          </h1>
          <p className=" text-center mt-10 text-xl md:text-2xl text-white ">
            <span className="drop-shadow-[0_1px_2px_black]">
              Now you can manage your school, college, or any educational center
              with
            </span>
            <br />
            <img
              src={logo}
              alt="scholart_logo"
              className="w-40 mx-auto my-5 "
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
