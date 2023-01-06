import react from "react";
import { Transition } from '@headlessui/react'
import Link from "next/link";
import Image from "next/image";

export default function menu(){

    const { useState } = react;
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

    setTimeout(setAlert, 40);

    function setAlert() {
        setNav(true);
    }

    const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-white transition ease transform duration-300`;

    const FadeIn = ({ delay, children }) => (
        <Transition.Child
          enter={`transition-all ease-in-out duration-700 ${delay}`}
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {children}
        </Transition.Child>
      )
    return   (      
    <div>
    <div className="fixed flex items-center left-20 top-20 text-xl font-bold z-10">
        <p className="text-black"> 
        Max Răulea  
        </p>
    </div>



    <div className= "items-center flex w-full h-screen fixed bg-emerald-400 text-center ease-in duration-600" >

            <ul className="ml-80 mb-60 w-56 h-56 ">
                <Transition.Root className="mx-auto my-16 max-w-md space-y-4" show={nav}>
                <FadeIn delay="delay-[100ms]">
                    <li onClick={handleNav} className="p-1 hover:font-bold hover:scale-125 transform flex transition-all">
                        <p className="text-xl font-thin">01</p>
                        <Link href="/" className="text-6xl">
                            HOME
                        </Link>
                    </li>
                    </FadeIn>
                    <FadeIn delay="delay-[400ms]">
                    <li onClick={handleNav} className="p-1 text-6xl hover:font-bold flex hover:scale-125 transform transition-all">
                    <p className="text-xl font-thin">02</p>
                        <Link href="#vision">
                            ABOUT
                        </Link>
                    </li>
                    </FadeIn>
                    <FadeIn delay="delay-[700ms]">
                    <li onClick={handleNav} className="p-1 text-6xl flex hover:font-bold hover:scale-125 transform transition-all">
                    <p className="text-xl font-thin">03</p>
                        <Link href="#information">                                    
                            WORK
                        </Link>
                    </li>
                    </FadeIn>
                    <FadeIn delay="delay-[1000ms]">
                    <li onClick={handleNav} className="p-1 text-6xl flex hover:font-bold hover:scale-125 transform transition-all">
                    <p className="text-xl font-thin">04</p>
                        <Link href="../#contact">
                            CONTACT
                        </Link>
                    </li>
                    </FadeIn>
                </Transition.Root>
            </ul>
            <div className="right-20 bottom-20 absolute flex">
                <div className="p-3 hover:scale-125 transform transition-all"><a href="http://www.twitter.com/MaxRaulea"><Image src="/images/twitter.png" width={40} height={40}/></a></div>
                <div className="p-3 mt-[-5px] hover:scale-125 transform transition-all"><a href="https://github.com/maxraulea"><Image src="/images/github-markup.png" width={40} height={40}/></a></div>
                <div className="p-3 hover:scale-125 transform transition-all"><a><Image src="/images/linkedinblack.png" width={40} height={40}/></a></div>
            </div>
        </div>
</div>
)
}