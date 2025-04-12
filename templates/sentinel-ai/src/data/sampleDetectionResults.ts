/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Sample detection results for different media types
 * Used for development and demonstration purposes
 */

export interface DetectionResult {
  isDeepfake: boolean | null;
  confidence: number;
  processingTime: number;
  details: {
    [key: string]: any;
  };
}

interface SampleResults {
  authentic: {
    text: DetectionResult;
    image: DetectionResult;
    audio: DetectionResult;
    video: DetectionResult;
  };
  deepfake: {
    text: DetectionResult;
    image: DetectionResult;
    audio: DetectionResult;
    video: DetectionResult;
  };
  error: {
    apiError: DetectionResult;
    processingError: DetectionResult;
  };
}

export const sampleResults: SampleResults = {
  // Sample authentic results
  authentic: {
    text: {
      isDeepfake: false,
      confidence: 92.35,
      processingTime: 1240,
      details: {
        humanScore: 92.35,
        aiScore: 7.65,
        analysisTimestamp: new Date().toISOString(),
        textFeatures: "Natural language patterns detected",
        contentEvaluation: "Content appears to be written by a human"
      }
    },
    image: {
      isDeepfake: false, 
      confidence: 95.73,
      processingTime: 2320,
      details: {
        manipulationScore: 4.27,
        authenticityScore: 95.73,
        analysisTimestamp: new Date().toISOString(),
        imageConsistency: "High",
        artifactAnalysis: "No digital manipulation artifacts detected"
      }
    },
    audio: {
      isDeepfake: false,
      confidence: 89.12,
      processingTime: 3150,
      details: {
        voicePrintScore: 89.12,
        synthesisProbability: 10.88,
        analysisTimestamp: new Date().toISOString(),
        frequencyAnalysis: "Natural voice patterns detected",
        audioConsistency: "Consistent with human speech patterns"
      }
    },
    video: {
      isDeepfake: false,
      confidence: 91.45,
      processingTime: 5280,
      details: {
        manipulationScore: 8.55,
        authenticityScore: 91.45,
        analysisTimestamp: new Date().toISOString(),
        facialConsistency: "High",
        motionAnalysis: "Natural motion patterns",
        audioVideoSync: "Synchronized naturally"
      }
    }
  },
  
  // Sample deepfake results
  deepfake: {
    text: {
      isDeepfake: true,
      confidence: 96.82,
      processingTime: 1120,
      details: {
        humanScore: 3.18,
        aiScore: 96.82,
        analysisTimestamp: new Date().toISOString(),
        textFeatures: "Repetitive patterns and typical AI structures detected",
        contentEvaluation: "Content shows characteristics of AI generation"
      }
    },
    image: {
      isDeepfake: true,
      confidence: 98.34,
      processingTime: 2540,
      details: {
        manipulationScore: 98.34,
        authenticityScore: 1.66,
        analysisTimestamp: new Date().toISOString(),
        imageConsistency: "Low",
        artifactAnalysis: "GAN artifacts detected in pixel patterns",
        manipulationDetails: "Face area shows inconsistent textures"
      }
    },
    audio: {
      isDeepfake: true,
      confidence: 94.71,
      processingTime: 2980,
      details: {
        voicePrintScore: 5.29,
        synthesisProbability: 94.71,
        analysisTimestamp: new Date().toISOString(),
        frequencyAnalysis: "Unnatural frequency distribution detected",
        audioConsistency: "Voice patterns match known synthesis models"
      }
    },
    video: {
      isDeepfake: true,
      confidence: 97.23,
      processingTime: 4920,
      details: {
        manipulationScore: 97.23,
        authenticityScore: 2.77,
        analysisTimestamp: new Date().toISOString(),
        facialConsistency: "Low",
        motionAnalysis: "Unnatural blinking patterns and facial expressions",
        audioVideoSync: "Slight mismatch between lip movements and audio"
      }
    }
  },
  
  // Sample error results
  error: {
    apiError: {
      isDeepfake: null,
      confidence: 0,
      processingTime: 0,
      details: {
        apiError: true,
        status: "failed",
        errorMessage: "API connection failed or service unavailable",
        suggestion: "Please try again later or check your network connection"
      }
    },
    processingError: {
      isDeepfake: null,
      confidence: 0,
      processingTime: 0,
      details: {
        apiError: true,
        status: "failed",
        errorMessage: "Could not process the submitted file",
        suggestion: "Please ensure the file is not corrupted and is in a supported format"
      }
    }
  }
}; 