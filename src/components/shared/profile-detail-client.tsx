'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Shield,
  Activity,
  Image as ImageIcon,
  FileText,
  Link as LinkIcon,
} from 'lucide-react'
import { ContentImage } from './content-image'

interface ProfileDetailClientProps {
  brandName: string
  descriptionHtml: string
  images: string[]
  website?: string
  domain?: string
  birthday?: string
}

export function ProfileDetailClient({
  brandName,
  descriptionHtml,
  images,
  website,
  domain,
  birthday,
}: ProfileDetailClientProps) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="border border-[#562f00]/10 bg-white shadow-sm">
          <TabsTrigger value="activity" className="gap-1.5 data-[state=active]:bg-[#fff2dc] data-[state=active]:text-[#562f00]">
            <Activity className="h-4 w-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="about" className="gap-1.5 data-[state=active]:bg-[#fff2dc] data-[state=active]:text-[#562f00]">
            <FileText className="h-4 w-4" />
            About Me
          </TabsTrigger>
          <TabsTrigger value="images" className="gap-1.5 data-[state=active]:bg-[#fff2dc] data-[state=active]:text-[#562f00]">
            <ImageIcon className="h-4 w-4" />
            Images
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-6">
          <Card className="border-[#562f00]/10 bg-white shadow-sm">
            <CardContent className="py-12 text-center">
              <Activity className="mx-auto h-10 w-10 text-[#562f00]/20" />
              <p className="mt-3 text-sm text-[#8d5828]">No recent activity to display.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="mt-6 space-y-6">
          {/* About Me Content */}
          <Card className="border-[#562f00]/10 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-normal text-[#562f00]/80">
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div
                className="prose prose-slate max-w-none text-sm leading-relaxed text-[#562f00]/80 prose-a:text-[#8d5828] prose-a:underline prose-strong:font-semibold"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
              {website && (
                <div className="flex items-center gap-2 text-sm text-[#8d5828]">
                  <LinkIcon className="h-4 w-4 shrink-0" />
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate hover:underline"
                  >
                    {website}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="mt-6">
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-xl border border-[#562f00]/10 bg-[#fff2dc]"
                >
                  <ContentImage
                    src={img}
                    alt={`${brandName} image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
              ))}
            </div>
          ) : (
            <Card className="border-[#562f00]/10 bg-white shadow-sm">
              <CardContent className="py-12 text-center">
                <ImageIcon className="mx-auto h-10 w-10 text-[#562f00]/20" />
                <p className="mt-3 text-sm text-[#8d5828]">No images available.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
