
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useRouter } from 'next/router'

export const Menu = () => {
  const refs = [useRef(null), useRef(null), useRef(null)];
  const [isHovered, setIsHovered] = useState([false, false, false]);
 const router = useRouter()
  const handleHover = (index) => {
    setIsHovered((prevIsHovered) =>
      prevIsHovered.map((_, i) => (i === index ? true : false))
    );
    gsap.to(refs[index].current, {
      width: 150,
      duration: 0.4,
    });
  };

  const handleLeave = (index) => {
    setIsHovered((prevIsHovered) =>
      prevIsHovered.map((_, i) => (i === index ? false : false))
    );
    gsap.to(refs[index].current, {
      width: 0,
      duration: 0.4,
    });
  };
  const push = (e) =>{
   

    // Googleのトップページに遷移する
    if(e===0){
      return
    }else if(e===1){
      return
    }else if(e === 2){
      router.push('https://github.com/atsushi-12')
    }
  }
  
  return (
    <div className="absolute w-full h-full flex justify-left z-40 text-white text-7xl font-fancy ml-6 mt-2 pointer-events-none">
      <ul className="color: inherit font-size: 4rem  mb-0">
        <p className=" ">Atsushi Yamano</p>
        <p className=" text-4xl text-gray-500 opacity: 0.2;">
          Souzousya-RicarentSchool
        </p>
        <ul className="text-gray-400 text-4xl flex-col space-y-5 mt-10 pointer-events-auto">
          {["Portfolio", "Skills", "GitHub"].map((item, index) => (
            <div key={index}>
              <li
                className="m-0 p-0 hover:cursor-pointer"
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleLeave(index)}
                onClick={() => push(index)}
              >
                {item}
              </li>
              <li
                ref={refs[index]}
                className="bg-white text-red-400 w-0 h-0.5 m-0 p-0"
              ></li>
            </div>
          ))}
        </ul>
      </ul>
    </div>
  );
};
export default Menu