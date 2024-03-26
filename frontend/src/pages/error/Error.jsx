import { Link } from "react-router-dom";
import errorIcon from "../../assets/icons/error_page/error.svg";

const Error = ({onClick}) => {
    return (
        <div className="m-8">
            <div className="flex flex-row max-md:flex-col justify-center items-center h-[35rem] max-lg:h-[30rem] max-md:h-full">
                <div className="p-3 w-full max-w-[40rem] max-lg:max-w-[30rem] whitespace-pre-wrap">
                    <h1 className="font-f1-b text-5xl max-lg:text-4xl">Oops! Page not found</h1>
                    <p className="my-2 text-xl max-lg:text-base">The page you are looking for cannot be reached or an error has occured.</p>
                    <Link 
                        className="my-2 text-blue-400 border-b-2 border-blue-400 max-lg:text-base max-md:text-sm"
                        to="/"
                        onClick={onClick}
                    >Return to home page
                    </Link>
                </div>
                <div className="p-3">
                    <img
                        width={"300px"}
                        height={"300px"}
                        src={errorIcon}
                        alt={"Error icon"}
                    />
                </div>
            </div>
        </div>
    )
};

export default Error;