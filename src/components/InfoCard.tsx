
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InfoCard = () => {
  return (
    <Card className="mb-8 mt-8">
      <CardHeader>
        <CardTitle className="text-xl">How to use</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="ml-6 list-decimal space-y-2 text-sm">
          <li>Paste a YouTube video URL in the input field above</li>
          <li>Click the search icon or press Enter to fetch video information</li>
          <li>Select your preferred quality from the available options</li>
          <li>Click the Download button to start downloading</li>
          <li>
            <strong>Note:</strong> This is a frontend demo. In a real implementation, 
            a Python backend would handle the actual video downloads using libraries 
            like pytube or youtube-dl
          </li>
        </ol>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
