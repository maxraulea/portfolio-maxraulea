import react from "react";
import Link from "next/link";

const navbar = ({heading ,message}) =>{

    const { useState } = react;
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

    const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

    return(   
        <div>
            <div className="flex flex-col justify-center items-end group fixed right-20 top-20 hover:scale-125 transform transition-all">
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
                                : "group-hover:opacity-100"
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
            </div>

            <div className={nav ? "items-center flex w-full h-screen bg-emerald-400 text-center ease-in duration-600" 
                : "sm:hidden ease-in duration-600"}>
                    <ul className="ml-80 mb-60">
                        <li onClick={handleNav} className="p-1 text-6xl hover:font-bold hover:scale-125 transform transition-all flex">
                            <svg class="h-15 w-15"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                </svg>
                            <Link href="/">
                                Home
                            </Link>
                        </li>
                        <li onClick={handleNav} className="p-1 text-6xl hover:font-bold hover:scale-125 transform transition-all">
                            <Link href="#vision">
                                Vision
                            </Link>
                        </li>
                        <li onClick={handleNav} className="p-1 text-6xl hover:font-bold hover:scale-125 transform transition-all">
                            <Link href="#information">                                    
                                team
                            </Link>
                        </li>
                        <li onClick={handleNav} className="p-1 text-6xl hover:font-bold hover:scale-125 transform transition-all">
                            <Link href="#contact">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
        </div>
        
     )
}

export default navbar