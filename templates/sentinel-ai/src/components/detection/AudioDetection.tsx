import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { Upload, AudioLines, Loader2 } from "lucide-react";
import { toast } from "sonner";
import DetectionResult from "./DetectionResult";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { sampleResults } from "../../data/sampleDetectionResults";
import type { DetectionResult as DetectionResultType } from "../../data/sampleDetectionResults";

const AudioDetection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<DetectionResultType | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check file type
    const validTypes = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/m4a"];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Please select a valid audio file (MP3, WAV, OGG, M4A)");
      return;
    }

    // Check file size (max 25MB)
    if (selectedFile.size > 25 * 1024 * 1024) {
      toast.error("Audio size should be less than 25MB");
      return;
    }

    setFile(selectedFile);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
    
    // Clear previous results
    setResult(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please select an audio file to analyze");
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Randomly choose between authentic and deepfake result (80% chance of deepfake for demo purposes)
      const resultType = Math.random() < 0.8 ? 'deepfake' : 'authentic';
      const data = sampleResults[resultType].audio;
      
      setResult(data);
      if (data.isDeepfake) {
        toast.warning("Deepfake detected! See analysis below.");
      } else {
        toast.success("Analysis complete. Audio appears to be authentic.");
      }
    } catch (error) {
      console.error("Audio detection error:", error);
      toast.error("Detection failed. Please try again.");
      
      // Use the error sample data
      setResult(sampleResults.error.processingError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Audio Deepfake Detection</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="audio-upload">Upload Audio</Label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer">
            <input
              id="audio-upload"
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="audio-upload"
              className="flex flex-col items-center justify-center py-6 cursor-pointer"
            >
              {preview ? (
                <div className="w-full flex justify-center">
                  <audio
                    ref={audioRef}
                    src={preview}
                    className="w-full max-w-md"
                    controls
                  />
                </div>
              ) : (
                <>
                  <AudioLines className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Supports MP3, WAV, OGG (max 25MB)
                  </p>
                </>
              )}
            </label>
          </div>
          {file && (
            <p className="text-sm text-gray-500 mt-2">
              Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading || !file}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Analyze Audio
            </>
          )}
        </Button>
      </form>

      {result && <DetectionResult result={result} mediaType="audio" preview={preview} />}
    </div>
  );
};

export default AudioDetection;