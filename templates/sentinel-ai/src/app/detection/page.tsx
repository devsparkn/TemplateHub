"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image as Img, Video, AudioLines, FileText } from "lucide-react";

import ImageDetection from "@/components/detection/ImageDetection";
import VideoDetection from "@/components/detection/VideoDetection";
import AudioDetection from "@/components/detection/AudioDetection";
import TextDetection from "@/components/detection/TextDetection";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("image");

  return (
    <div className="mx-auto py-12 mt-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Sentinel AI Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Use the tools below to detect deepfakes.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Img className="h-4 w-4" />
              <span className="hidden sm:inline">Image</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Video</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <AudioLines className="h-4 w-4" />
              <span className="hidden sm:inline">Audio</span>
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Text</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="image">
          <ImageDetection />
        </TabsContent>
        <TabsContent value="video">
          <VideoDetection />
        </TabsContent>
        <TabsContent value="audio">
          <AudioDetection />
        </TabsContent>
        <TabsContent value="text">
          <TextDetection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
