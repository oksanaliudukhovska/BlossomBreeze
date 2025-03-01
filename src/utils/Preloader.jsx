import React from 'react'

const Preloader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-bezchBase1/20">
      <svg className="w-[100px] h-[100px] text-gold/40 animate-spin" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>
    </div>
  );
};


export default Preloader
