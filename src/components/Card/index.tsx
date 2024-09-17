import Image from "next/image";
import React from "react";

interface CardProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  isEmailVisible: boolean;
  onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  firstName,
  lastName,
  email,
  avatar,
  isEmailVisible,
  onClick,
}) => {
  return (
    <div className="flex flex-col md:flex-row-reverse w-[20.5rem] md:w-[25rem] h-[40rem] md:h-[12.5rem] p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl dark:shadow-slate-700 ease-linear duration-300">
      <div className="relative w-full h-full shadow-md rounded-2xl md:basis-2/3">
        <Image
          src={avatar}
          alt={`${firstName} ${lastName}'s avatar`}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl border-2 border-white"
        />
      </div>

      <div className="flex flex-col justify-between w-full h-full px-4">
        <h1 className="mt-2 text-l font-bold dark:text-white">
          {firstName} {lastName}
        </h1>

        <p className="mt-4 text-dark dark:text-white">
          {isEmailVisible ? email : "****@****.com"}
        </p>

        <button
          className="mt-8 mx-auto md:mx-0 bg-[#2167ae] text-white text-md font-semibold py-2 px-6 rounded-xl shadow-md hover:bg-[#424bb6] transition-all"
          onClick={() => onClick(id)}
        >
          Show Email
        </button>
      </div>
    </div>
  );
};

export default Card;
