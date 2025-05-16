
import { Button } from "@/components/ui/button";
import { ReloadIcon, DownloadIcon } from "@radix-ui/react-icons";

interface DownloadButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const DownloadButton = ({ 
  onClick, 
  isLoading = false, 
  disabled = false 
}: DownloadButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="download-btn w-full"
      size="lg"
    >
      {isLoading ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Downloading...
        </>
      ) : (
        <>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download Now
        </>
      )}
    </Button>
  );
};

export default DownloadButton;
