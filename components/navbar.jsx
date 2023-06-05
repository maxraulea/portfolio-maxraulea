import react from "react";
import { Transition } from '@headlessui/react'
import Link from "next/link";
import Image from "next/image";

const navbar = ({heading ,message}) =>{


    const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-white transition ease transform duration-300`;

    return(   
        <div>
            
            <div className="flex flex-col justify-center items-end group fixed right-20 top-20 hover:scale-125 transform transition-all z-10">
                <Link href={"/menu"}>
                <button className="h-10 w-10"
                >
                    <div
                        className={`${genericHamburgerLine} ${ "group-hover:opacity-100 "
                        }`}
                    />
                    <div className={`${genericHamburgerLine} ${ "w-4 group-hover:opacity-100 group-hover:w-6 group-hover:transition-all transition-all"}`} />
                    <div
                        className={`${genericHamburgerLine} ${ "w-2 group-hover:opacity-100 group-hover:w-6 group-hover:transition-all transition-all"
                        }`}
                    />
                </button>
                </Link>
            </div>
        </div>
     )
}

export default navbar