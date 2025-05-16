
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoFormat {
  formatId: string;
  quality: string;
  resolution: string;
  fileSize: string;
}

interface FormatSelectorProps {
  formats?: VideoFormat[];
  selectedFormat?: string;
  onSelectFormat: (formatId: string) => void;
  isLoading?: boolean;
}

const FormatSelector = ({ 
  formats = [], 
  selectedFormat, 
  onSelectFormat,
  isLoading = false
}: FormatSelectorProps) => {
  if (isLoading) {
    return (
      <div className="w-full space-y-2">
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (formats.length === 0) {
    return null;
  }

  return (
    <Card className="p-4">
      <label className="mb-2 block font-medium text-gray-700">Select Format</label>
      <Select
        defaultValue={selectedFormat || formats[0].formatId}
        onValueChange={onSelectFormat}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a format" />
        </SelectTrigger>
        <SelectContent>
          {formats.map((format) => (
            <SelectItem key={format.formatId} value={format.formatId}>
              {format.quality} - {format.resolution} ({format.fileSize})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Card>
  );
};

export default FormatSelector;
