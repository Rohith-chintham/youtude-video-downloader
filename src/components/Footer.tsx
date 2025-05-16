
import { FaGithub, FaPython, FaReact } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-border py-6 text-center text-sm">
      <div className="flex items-center justify-center space-x-4">
        <span className="flex items-center space-x-1">
          <FaPython className="h-4 w-4" />
          <span>Python</span>
        </span>
        <span className="text-muted-foreground">+</span>
        <span className="flex items-center space-x-1">
          <FaReact className="h-4 w-4" />
          <span>React</span>
        </span>
      </div>
      <p className="mt-2 text-muted-foreground">
        © {new Date().getFullYear()} YouTube Downloader - For educational purposes only
      </p>
    </footer>
  );
};

export default Footer;
