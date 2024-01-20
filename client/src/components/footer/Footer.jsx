import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <div className="w-full h-40 bg-slate-600 select-none px-5 sm:px-16 lg:px-[16%] flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center gap-5">
        <img src={logo} alt="scholart_logo" className="h-14" />
        <p className=" font-medium flex text-xs sm:text-base text-white drop-shadow-[0_0_2px_black]">
          Copyright © 2023 scholart(pvt) Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
