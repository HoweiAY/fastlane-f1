import { IconContext } from "react-icons";
import { MdArrowOutward } from "react-icons/md";

const CircuitInfo = ({circuitInfo, circuitImgSrc}) => {
    return (
        <div className="flex-auto flex flex-col justify-center items-start w-full mt-2 mb-4 max-lg:mx-4">
            <h2 className="place-self-start px-1 py-2 font-f1-b text-3xl max-md:text-xl">Track Details</h2>
            <div className="flex flex-col max-md:flex-col max-lg:flex-row justify-around items-center border-t-4 border-gray-700 w-full p-4">
                <div className="lg:border border-slate-300 rounded-lg max-md:w-full max-lg:w-[50%] p-2 lg:bg-gray-50">
                    <img 
                        className="w-fit h-fit max-lg:w-fit lg:max-h-72"
                        src={`${circuitImgSrc}`}
                        alt={`${circuitInfo?.circuitName}`}
                    />
                </div>
                <section className="max-md:self-start lg:place-self-start w-full max-md:w-full max-lg:w-[50%] me-2 my-3 max-lg:ms-2 text-sm max-lg:text-base">
                    <p className="py-1">
                        <span className="font-f1-b">Circuit:</span> {circuitInfo ? circuitInfo.circuitName : "--"}
                    </p>
                    <p className="py-1">
                        <span className="font-f1-b">Location:</span> {circuitInfo ? circuitInfo.Location.locality : "--"}
                    </p>
                    <button className="flex flex-row justify-start border-s-2 border-b-2 rounded-bl-md border-red-600 w-52 pe-3 my-3 transition-all hover:w-60">
                        <IconContext.Provider value={ { style: { display: "inline" } } }>
                            <a className="ps-3 pb-1 max-lg:text-sm" href={circuitInfo?.url} target="_blank">
                                <MdArrowOutward /> More Information
                            </a>
                        </IconContext.Provider>
                    </button>
                </section>
            </div>
        </div>
    )
};

export default CircuitInfo;