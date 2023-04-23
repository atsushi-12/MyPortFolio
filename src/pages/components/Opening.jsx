import { gsap } from "gsap"
import { useEffect, useRef } from "react"
import { createRoot } from 'react-dom/client';
import Vivus from 'vivus';

const Opening = () => {
const elementRef = useRef(null);
const finishRef = useRef(null);
const animation = useRef(null);
let vivusInstance = null;

  useEffect(()=>{
    vivusInstance = new Vivus(animation.current, {
      duration: 1000,
      file: '/opening.svg'
    });
    vivusInstance.play();
  gsap.to(elementRef.current,{
    x:10,
    opacity:1,
    duration:1,
    delay:3, 
    onComplete: () => {
    gsap.to(finishRef.current,{
      opacity:0,
      duration:2,
      onComplete: () => {
        finishRef.current.remove();
      },
    })},
  })
},[]);
  return (
  <div  ref={ finishRef }className=" absolute w-screen h-full  flex justify-center items-center z-40 bg-black">
  <div className="absolute  bg-black h-screen w-1/2 flex justify-center items-center">
    <img ref ={animation} src="/opening.svg" alt=""  className="display: inline-block absolute top-0 left-0 w-full h-full z-30;"/>
    <img ref={elementRef} src="welcome.svg" className="opacity-0 display:inline-block absolute top-0 left-0 w-full h-full z-10;"/>
  </div>
  </div>
  )
}

export default Opening