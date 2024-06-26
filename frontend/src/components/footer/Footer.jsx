import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaGithub } from "react-icons/fa";

const githubLink = "https://github.com/HoweiAY/fastlane-f1";

const Footer = () => {
    return (
        <footer className="flex flex-row justify-between items-center p-8 max-md:px-4 mt-auto max-h-[10vh] bg-gray-800 text-base max-md:text-sm text-white">
            <p>
                <span className="font-f1-b">FastLane</span> by HoweiAY
            </p>
            <Link 
                className="mx-6"
                to={githubLink}
                target="_blank"
            >
                <IconContext.Provider value={{ style: { height: "2rem", width:"2rem", margin: "auto", color: "#FFF" }}} >
                    <FaGithub />
                </IconContext.Provider>
            </Link>
        </footer>
    )
};

export default Footer;