import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { RxArrowTopRight } from "react-icons/rx";
import image from "../../assets/trianglify-lowres.png";

export default function Guest({ children }) {
    return (
        <div className="flex h-screen text-gray-700">
            <div
                className="hidden lg:block flex-1 bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div className="flex-1 bg-white shadow-inner flex flex-col items-center justify-between">
                <nav className="flex justify-between p-4 mx-4 w-full">
                    <div className="bg-gray-700 p-4 rounded-full">
                        <img
                            src="https://ifortech.com/assets/images/logo-header.png"
                            alt="logo"
                            className="w-32"
                        />
                    </div>

                    <a
                        href="https://ifortech.com/"
                        className="flex items-center gap-1 text-red-500"
                    >
                        Visita ifortech.com <RxArrowTopRight />
                    </a>
                </nav>
                {children}
            </div>
        </div>
    );
}
