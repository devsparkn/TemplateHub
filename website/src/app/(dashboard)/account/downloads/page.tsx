"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Download } from "lucide-react";

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );

  if (!session)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-xl font-semibold mb-2">
          Please log in to view your downloads
        </h2>
        <p className="text-muted-foreground">
          Sign in to access all the templates you’ve purchased or downloaded.
        </p>
      </div>
    );

  return (
    <div className="pb-10">
      <div className="mb-12">
        <h1 className="text-3xl font-bold">My Templates</h1>
        <p className="text-muted-foreground mt-2">
          Access and download all your purchased templates
        </p>
      </div>
      {templates.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[40vh] text-center">
          <Image
            src="/empty-state.svg"
            alt="No templates"
            width={200}
            height={200}
            className="mb-6 opacity-80"
          />
          <h2 className="text-lg font-semibold mb-1">No downloads available</h2>
          <p className="text-muted-foreground mb-4">
            You haven’t downloaded any templates yet. Browse our collection and
            get started!
          </p>
          <Button asChild>
            <Link href="/templates">Explore Templates</Link>
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((tpl) => (
            <div
              key={tpl._id}
              className="group relative bg-card rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={tpl.thumbnailUrls[0]}
                  alt={tpl.title}
                  fill
                  className="object-fit object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-5 flex flex-col">
                <h2 className="font-semibold text-lg mb-1 line-clamp-1">
                  {tpl.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {tpl.category}
                </p>
                <Button asChild className="mt-auto w-full gap-2">
                  <Link href={`/templates/${tpl.slug}/download`}>
                    <Download className="w-4 h-4" />
                    Download
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadsPage;
