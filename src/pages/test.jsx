import React from "react";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";
export const test = () => {
  const array = ["Language", "Framework", "Cloud", "Other"];
  const language = ["JavaScript", "TypeScript", "Python", "Java"];

  const move = (e, g) => {
    console.log(e);
    gsap.to(`#underline-${e}-${g}`, {
      width: 400,
      duration: 0.6,
      opacity: 1,
    });
  };
  const leave = (e, g) => {
    gsap.to(`#underline-${e}-${g}`, {
      width: 0,
      duration: 0.6,
      opacity: 0,
    });
  };

  return (
    <div className="flex justify-center bg-black text-white">
      <div className="relative text-6xl flex-col justify-center h-screen w-1/5 bg-black text-center">
        <p className="mt-10">メニュー画面</p>
        <p className="text-5xl absolute bottom-20 text-center left-4">
          前のページに戻る
        </p>
      </div>

      <div className="h-screen w-4/5 bg-black text-white  border-l-2 border-r-white pl-9">
        {array.map((item, index) => (
          <div key={index} className="text-4xl">
            <div className="m-0 p-0 hover:cursor-pointe ">
              <ul className="flex">
                <div className="text-6xl mt-9">
                  <p className="mb-4">{item}</p>
                  <div className="flex ">
                    {language.map((item, subIndex) => (
                      <>
                        <p
                          onMouseEnter={() => move(index, subIndex)}
                          onMouseLeave={() => leave(index, subIndex)}
                          className="text-6xl "
                        >
                          画像
                        </p>
                        <li
                          id={`underline-${index}-${subIndex}`}
                          onMouseEnter={() => move(index, subIndex)}
                          onMouseLeave={() => leave(index, subIndex)}
                          key={index}
                          className="m-0 p-0 bg-black rounded-md w-0 opacity-0 text-white mr-10 "
                        >
                          {item}
                        </li>
                      </>
                    ))}
                  </div>
                </div>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default test;
