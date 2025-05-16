
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { isValidYoutubeUrl } from "@/services/youtubeService";

interface YoutubeFormProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

const YoutubeForm = ({ onSubmit, isLoading = false }: YoutubeFormProps) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }
    
    if (!isValidYoutubeUrl(url)) {
      setError("Please enter a valid YouTube URL");
      return;
    }
    
    setError(null);
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Paste YouTube URL here..."
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError(null);
          }}
          className="youtube-input pr-20 shadow-sm"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="sm" 
          className="absolute right-1 top-1 px-3"
          disabled={isLoading}
        >
          {isLoading ? (
            <MagnifyingGlassIcon className="h-4 w-4 animate-pulse" />
          ) : (
            <MagnifyingGlassIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </form>
  );
};

export default YoutubeForm;
