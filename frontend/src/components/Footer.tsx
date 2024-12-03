import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="py-4">
      <div className="container mx-auto flex flex-row items-center justify-between px-4">
        {/* Left Side */}
        <div className="flex items-center space-x-2">
          
        </div>
        {/* Right Side */}
        <div className="flex items-center space-x-4">
        <span className="flex items-center">
            Built 
            by Jainam
          </span>
          <a
            href="https://x.com/Jainam___patel?t=CjtZEGNkw9Js4SFEx21drQ&s=09"
            target="_blank"
            rel="noopener noreferrer"
          >

            <BsTwitterX size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;