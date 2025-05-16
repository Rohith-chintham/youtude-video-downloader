
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoThumbnailProps {
  url?: string;
  title?: string;
  isLoading?: boolean;
}

const VideoThumbnail = ({ url, title, isLoading = false }: VideoThumbnailProps) => {
  if (isLoading) {
    return (
      <Card className="w-full overflow-hidden">
        <Skeleton className="h-[200px] w-full" />
        <div className="p-4">
          <Skeleton className="h-4 w-full" />
        </div>
      </Card>
    );
  }
  
  if (!url) {
    return null;
  }

  return (
    <Card className="w-full overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-video">
        <img 
          src={url} 
          alt={title || "Video thumbnail"} 
          className="h-full w-full object-cover"
          onError={(e) => {
            // Fallback to default thumbnail if the maxresdefault doesn't exist
            const target = e.target as HTMLImageElement;
            if (target.src.includes("maxresdefault")) {
              target.src = target.src.replace("maxresdefault", "hqdefault");
            }
          }}
        />
      </div>
      {title && (
        <div className="p-4">
          <h3 className="line-clamp-2 text-lg font-semibold">{title}</h3>
        </div>
      )}
    </Card>
  );
};

export default VideoThumbnail;
