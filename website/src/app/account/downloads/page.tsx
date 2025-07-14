"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

type Template = {
  _id: string;
  title: string;
  category: string;
  slug: string;
  thumbnailUrls: string[];
};

const DownloadsPage = () => {
  const { data: session, status } = useSession();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user/downloads")
        .then((res) => res.json())
        .then((data) => {
          setTemplates(data.templates || []);
          setLoading(false);
        });
    }
  }, [status]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!session)
    return <div className="p-8">Please log in to view your downloads.</div>;

  return (
    <div className="pb-10">
      <h1 className="text-3xl font-bold mb-8">My Templates</h1>
      {templates.length === 0 ? (
        <div>You have not purchased or downloaded any templates yet.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {templates.map((tpl) => (
            <div
              key={tpl._id}
              className="border rounded-lg p-4 flex flex-col items-center"
            >
              <Image
                src={tpl.thumbnailUrls[0]}
                alt={tpl.title}
                width={120}
                height={80}
                className="rounded mb-2"
              />
              <h2 className="font-semibold text-lg mb-1">{tpl.title}</h2>
              <p className="text-sm text-muted-foreground mb-2">
                {tpl.category}
              </p>
              <Button asChild>
                <Link href={`/templates/${tpl.slug}/download`}>Download</Link>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadsPage;
