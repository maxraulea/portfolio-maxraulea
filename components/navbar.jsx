import react from "react";
import { Transition } from '@headlessui/react'
import Link from "next/link";
import Image from "next/image";

const navbar = ({heading ,message}) =>{

    const { useState } = react;
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
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

    return(   
        <div>
            
            <div className="fixed flex items-center left-20 top-20 text-xl font-bold z-10">
            <Link href="/menu"> 
                <p className="text-white"> 
                Max Răulea  
                </p>
                </Link>
            </div>


            <div className="flex flex-col justify-center items-end group fixed right-20 top-20 hover:scale-125 transform transition-all z-10">
                <Link href={nav ? "/" : "/menu"}>
                <button className="h-10 w-10"
                onClick={() => {
                    handleNav();
                    }
                }
                >
                    <div
                        className={`${genericHamburgerLine} ${
                            nav
                                ? "rotate-45 translate-y-2 group-hover:opacity-100"
                                : "group-hover:opacity-100 "
                        }`}
                    />
                    <div className={`${genericHamburgerLine} ${nav ? "opacity-0" : "w-4 group-hover:opacity-100 group-hover:w-6 group-hover:transition-all transition-all"}`} />
                    <div
                        className={`${genericHamburgerLine} ${
                            nav
                                ? "-rotate-45 -translate-y-2 group-hover:opacity-100"
                                : "w-2 group-hover:opacity-100 group-hover:w-6 group-hover:transition-all transition-all"
                        }`}
                    />
                </button>
                </Link>
            </div>
        </div>
     )
}

export default navbar