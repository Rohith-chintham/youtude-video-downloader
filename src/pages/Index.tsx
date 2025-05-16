
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getVideoInfo, downloadVideo } from "@/services/youtubeService";
import YoutubeForm from "@/components/YoutubeForm";
import VideoThumbnail from "@/components/VideoThumbnail";
import FormatSelector from "@/components/FormatSelector";
import DownloadButton from "@/components/DownloadButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoCard from "@/components/InfoCard";
import PythonCodeSnippet from "@/components/PythonCodeSnippet";

interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  availableFormats: Array<{
    formatId: string;
    quality: string;
    resolution: string;
    fileSize: string;
  }>;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("downloader");

  const handleFormSubmit = async (url: string) => {
    setIsLoading(true);
    try {
      const info = await getVideoInfo(url);
      setVideoInfo(info);
      setSelectedFormat(info.availableFormats[0].formatId);
      toast.success("Video information fetched successfully!");
    } catch (error) {
      console.error("Error fetching video info:", error);
      toast.error("Failed to fetch video information. Please check the URL and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!videoInfo || !selectedFormat) return;
    
    setIsDownloading(true);
    try {
      await downloadVideo(videoInfo.id, selectedFormat);
      toast.success("Download started! In a real implementation, this would download the file.");
    } catch (error) {
      console.error("Error downloading video:", error);
      toast.error("Failed to download video. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      
      <Tabs
        defaultValue="downloader"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mx-auto max-w-3xl"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="downloader">Downloader</TabsTrigger>
          <TabsTrigger value="code">Python Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="downloader" className="mt-4">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-6">
                <YoutubeForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              </div>
              
              {(isLoading || videoInfo) && (
                <div className="mb-6">
                  <VideoThumbnail 
                    url={videoInfo?.thumbnail} 
                    title={videoInfo?.title} 
                    isLoading={isLoading} 
                  />
                </div>
              )}
              
              {(isLoading || videoInfo) && (
                <div className="mb-6">
                  <FormatSelector 
                    formats={videoInfo?.availableFormats} 
                    selectedFormat={selectedFormat}
                    onSelectFormat={setSelectedFormat}
                    isLoading={isLoading}
                  />
                </div>
              )}
              
              {videoInfo && (
                <DownloadButton 
                  onClick={handleDownload} 
                  isLoading={isDownloading}
                  disabled={!selectedFormat}
                />
              )}
            </CardContent>
          </Card>
          
          <InfoCard />
        </TabsContent>
        
        <TabsContent value="code" className="mt-4">
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              Here's how you would implement the Python backend using pytube
            </p>
            <PythonCodeSnippet />
          </div>
        </TabsContent>
      </Tabs>
      
      <Footer />
    </div>
  );
};

export default Index;
