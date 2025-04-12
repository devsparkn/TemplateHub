import { useState, ChangeEvent, FormEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import DetectionResult from "./DetectionResult";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { sampleResults } from "../../data/sampleDetectionResults";
import type { DetectionResult as DetectionResultType } from "../../data/sampleDetectionResults";

const TextDetection = () => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<DetectionResultType | null>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Clear previous results when text changes
    if (result) setResult(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error("Please enter text to analyze");
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Randomly choose between authentic and deepfake result (65% chance of deepfake for demo purposes)
      const resultType = Math.random() < 0.65 ? 'deepfake' : 'authentic';
      const data = sampleResults[resultType].text;
      
      setResult(data);
      if (data.isDeepfake) {
        toast.warning("AI-generated text detected! See analysis below.");
      } else {
        toast.success("Analysis complete. See results below.");
      }
    } catch (error) {
      console.error("Text detection error:", error);
      toast.error("Detection failed. Please try again.");
      
      // Use the error sample data
      setResult(sampleResults.error.processingError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">AI-Generated Text Detection</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text-input">Enter Text</Label>
          <textarea
            id="text-input"
            value={text}
            onChange={handleTextChange}
            placeholder="Paste or type the text you want to analyze..."
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
          />
          <p className="text-sm text-gray-500 mt-2">
            {text.length > 0 ? `${text.length} characters, ${text.split(/\s+/).length} words` : "No text entered"}
          </p>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading || !text.trim()}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Analyze Text
            </>
          )}
        </Button>
      </form>

      {result && <DetectionResult result={result} mediaType="text" preview={null} text={text} />}
    </div>
  );
};

export default TextDetection;
