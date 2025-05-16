
// This file represents the interface for what would be our backend API
// In a real implementation, these functions would call a Python backend

interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  availableFormats: VideoFormat[];
}

interface VideoFormat {
  formatId: string;
  quality: string;
  resolution: string;
  fileSize: string;
}

export async function getVideoInfo(videoUrl: string): Promise<VideoInfo> {
  // In a real implementation, this would call a Python backend
  // For now, we'll simulate a response
  
  // Extract video ID from URL
  const videoId = extractVideoId(videoUrl);
  
  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock data
  return {
    id: videoId,
    title: "Sample YouTube Video",
    thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    duration: "10:30",
    availableFormats: [
      { formatId: "22", quality: "HD", resolution: "720p", fileSize: "45.3 MB" },
      { formatId: "18", quality: "SD", resolution: "360p", fileSize: "20.1 MB" },
      { formatId: "140", quality: "Audio Only", resolution: "128kbps", fileSize: "4.2 MB" }
    ]
  };
}

export async function downloadVideo(videoId: string, formatId: string): Promise<string> {
  // In a real implementation, this would trigger a Python download
  // For now, we'll simulate the process
  
  // Simulate download delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return a fake download URL
  return `download-${videoId}-${formatId}.mp4`;
}

// Helper function to extract video ID from different YouTube URL formats
function extractVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
}

// Validate YouTube URL
export function isValidYoutubeUrl(url: string): boolean {
  const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return pattern.test(url);
}
