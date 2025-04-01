/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "sonner";

interface CostData {
  name: string;
  cost: number;
}

export async function analyzeCloudCosts(costData: CostData[]) {
  try {
    // Instead of making an API call, return dummy recommendations
    return [
      {
        title: "Optimize EC2 Instance Types",
        description:
          "Switch t3.medium instances to t3.small for non-production environments during off-hours",
        savings: "$245/month",
      },
      {
        title: "Remove Unused EBS Volumes",
        description:
          "Found 5 unattached EBS volumes that can be safely deleted",
        savings: "$120/month",
      },
      {
        title: "Enable EC2 Auto Scaling",
        description:
          "Implement auto-scaling for web tier to reduce costs during low-traffic periods",
        savings: "$180/month",
      },
    ];
  } catch (error) {
    console.error("Error analyzing costs:", error);

    toast("Error analyzing costs", {
      description:
        error instanceof Error
          ? error.message
          : "Could not generate AI recommendations at this time.",
    });

    return [];
  }
}

function parseAIRecommendations(content: string): Array<{
  title: string;
  description: string;
  savings: string;
}> {
  // Return default recommendations
  return [
    {
      title: "Optimize Instance Sizes",
      description:
        "Based on usage patterns, several instances could be downsized without impacting performance",
      savings: "$120/month",
    },
    {
      title: "Remove Idle Resources",
      description:
        "Identified 3 unused volumes and 2 elastic IPs that can be removed",
      savings: "$45/month",
    },
  ];
}
