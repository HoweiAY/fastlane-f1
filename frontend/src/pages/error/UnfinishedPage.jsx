import { Link } from "react-router-dom";

import unfinishedBackgroundImage from "../../assets/images/common/unfinished_bg_1.png";

const UnfinishedPage = () => {
    return (
        <main 
            className="min-h-[80vh] bg-right bg-cover bg-no-repeat"
            style={{
                "backgroundImage": `url(${unfinishedBackgroundImage})`
            }}
        >
            <div className="flex justify-start max-md:justify-center items-center min-h-[80vh] w-full md:bg-gradient-to-r md:from-white md:via-45% md:via-white md:to-transparent max-md:bg-white max-md:bg-opacity-80">
                <section className="flex flex-col justify-center items-start m-8 w-1/2 max-md:w-9/12 h-1/2">
                    <h1 className="px-4 py-1 font-f1-bl text-5xl max-md:text-xl max-lg:text-3xl">
                        Page under construction
                    </h1>
                    <p className="border-s-8 border-t-8 border-red-600 rounded-tl-xl px-3 py-4 text-lg max-lg:text-base">
                        We are working hard on delivering new content as soon as possible. Please visit again soon when it becomes available!
                        <Link 
                            className="block my-2 w-fit text-blue-400 max-md:text-blue-500 border-b-2 border-blue-400 max-md:border-blue-500 max-lg:text-base max-md:text-sm" 
                            to="/"
                        >
                            Return to home page
                        </Link>
                    </p>
                </section>
                
            </div>
        </main>
    )
};

export default UnfinishedPage;