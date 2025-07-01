/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type Template = {
  title: string;
  downloadUrl: string;
  // add other properties if needed
};

const DownloadTemplatePage = () => {
  const { data: session, status } = useSession();
  const params = useParams();
  const [allowed, setAllowed] = useState(false);
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && params?.slug) {
      fetch(`/api/templates/${params.slug}/can-download`)
        .then((res) => res.json())
        .then((data) => {
          setAllowed(data.allowed);
          setTemplate(data.template || null);
          setLoading(false);
        });
    }
  }, [status, params]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!allowed)
    return (
      <div className="p-8 text-red-500">
        You do not have access to download this template.
      </div>
    );
  if (!template) return <div className="p-8">Template not found.</div>;

  return (
    <div className="container py-12 px-8">
      <h1 className="text-2xl font-bold mb-4">Download: {template.title}</h1>
      <Button asChild>
        <a href={template.downloadUrl} download>
          Download Template
        </a>
      </Button>
    </div>
  );
};

export default DownloadTemplatePage;
