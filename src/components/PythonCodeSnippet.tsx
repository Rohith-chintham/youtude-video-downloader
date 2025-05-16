
import { Card } from "@/components/ui/card";

const PythonCodeSnippet = () => {
  const pythonCode = `# Python backend implementation example
import pytube
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/video-info', methods=['POST'])
def get_video_info():
    url = request.json.get('url')
    try:
        yt = pytube.YouTube(url)
        streams = yt.streams.filter(progressive=True)
        
        formats = []
        for stream in streams:
            formats.append({
                'formatId': stream.itag,
                'quality': stream.resolution,
                'resolution': stream.resolution,
                'fileSize': f"{stream.filesize / (1024 * 1024):.1f} MB"
            })
            
        return jsonify({
            'id': yt.video_id,
            'title': yt.title,
            'thumbnail': yt.thumbnail_url,
            'duration': str(yt.length),
            'availableFormats': formats
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/download', methods=['POST'])
def download_video():
    try:
        url = request.json.get('url')
        format_id = request.json.get('format_id')
        
        yt = pytube.YouTube(url)
        stream = yt.streams.get_by_itag(format_id)
        
        # In a real app, this would save to a temp file and return a download link
        filename = stream.download()
        return jsonify({'download_url': filename})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
`;

  return (
    <Card className="overflow-hidden">
      <div className="bg-zinc-900 px-4 py-2 text-white">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-sm font-medium">backend.py</span>
        </div>
      </div>
      <pre className="bg-zinc-950 p-4 text-left text-sm text-white">
        <code>{pythonCode}</code>
      </pre>
    </Card>
  );
};

export default PythonCodeSnippet;
