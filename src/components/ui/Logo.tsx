import { FC } from "react";

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return (
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        id="chat"
        width={50}
        height={50}
      >
        <path d="M5.8 12.2V6H2C.9 6 0 6.9 0 8v6c0 1.1.9 2 2 2h1v3l3-3h5c1.1 0 2-.9 2-2v-1.82a.943.943 0 0 1-.2.021h-7V12.2zM18 1H9c-1.1 0-2 .9-2 2v8h7l3 3v-3h1c1.1 0 2-.899 2-2V3c0-1.1-.9-2-2-2z"></path>
      </svg>
      <span className="ml-2 font-bold">StreamTalk</span>
    </div>
  );
};

export default Logo;
