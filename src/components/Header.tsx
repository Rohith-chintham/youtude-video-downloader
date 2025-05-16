
import { FaYoutube } from "react-icons/fa";

const Header = () => {
  return (
    <header className="mb-8 text-center">
      <div className="flex items-center justify-center space-x-2">
        <FaYoutube className="h-10 w-10 text-youtube-red" />
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          YouTube Downloader
        </h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        Download your favorite YouTube videos quickly and easily
      </p>
    </header>
  );
};

export default Header;
