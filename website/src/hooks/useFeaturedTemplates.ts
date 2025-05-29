import { useEffect, useState } from "react";
import { Template } from "@/types/templates";

export const useFeaturedTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      const res = await fetch("/api/templates/featured");
      const data = await res.json();
      if (data.success) setTemplates(data.data);
      setLoading(false);
    };
    fetchTemplates();
  }, []);

  return { templates, loading };
};
