// types.ts (optional if types are used elsewhere)
export interface Recommendation {
    id: number;
    title: string;
    description: string;
    impact: string;
    savings: number;
    difficulty: string;
    status: string;
  }
  
  export interface Resource {
    id: string;
    name: string;
    type: string;
    provider: string;
    region: string;
    cost: number;
    utilization: number;
    status: string;
  }
  
  // data.ts
  const recommendations: Recommendation[] = [
    {
      id: 1,
      title: "Rightsize underutilized EC2 instances",
      description: "3 instances in us-east-1 are consistently using less than 20% CPU",
      impact: "High",
      savings: 420.50,
      difficulty: "Easy",
      status: "New"
    },
    {
      id: 2,
      title: "Delete unused Azure Disks",
      description: "5 unattached disks found in eastus region",
      impact: "Medium",
      savings: 85.25,
      difficulty: "Easy",
      status: "In Progress"
    },
    {
      id: 3,
      title: "Optimize GCP Network Usage",
      description: "Consider using a CDN to reduce egress costs",
      impact: "Medium",
      savings: 250.00,
      difficulty: "Medium",
      status: "New"
    }
  ];
  
  const resources: Resource[] = [
    {
      id: "i-1234567890",
      name: "prod-api-server",
      type: "EC2",
      provider: "AWS",
      region: "us-east-1",
      cost: 245.50,
      utilization: 35,
      status: "Running"
    },
    {
      id: "vm-abcdef123",
      name: "staging-db",
      type: "Virtual Machine",
      provider: "Azure",
      region: "eastus",
      cost: 189.75,
      utilization: 65,
      status: "Running"
    },
    {
      id: "gce-xyz789",
      name: "dev-environment",
      type: "Compute Engine",
      provider: "GCP",
      region: "us-central1",
      cost: 123.25,
      utilization: 15,
      status: "Stopped"
    }
  ];
  
export { recommendations, resources };  