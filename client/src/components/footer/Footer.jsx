import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <div className="flex h-40 w-full select-none items-center justify-center bg-[#454545] px-5 sm:px-16 lg:px-[16%]">
      <div className="flex flex-col items-center gap-5 md:flex-row">
        <img src={logo} alt="scholart_logo" className="h-14" />
        <p className=" flex text-xs font-medium text-white drop-shadow-[0_0_2px_black] sm:text-base">
          Copyright © 2023 scholart(pvt) Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
