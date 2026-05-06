'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Share2 } from 'lucide-react'

interface PdfActionsProps {
  pdfUrl?: string
  currentUrl: string
  title: string
}

export function PdfActions({ pdfUrl, currentUrl, title }: PdfActionsProps) {
  const [showNotification, setShowNotification] = useState(false)

  const handleShare = () => {
    // Copy URL to clipboard
    navigator.clipboard.writeText(currentUrl)
    
    // Show notification
    setShowNotification(true)
    
    // Hide notification after 3 seconds
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleDownload = () => {
    if (pdfUrl) {
      // Open PDF URL in new tab for download
      window.open(pdfUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <Button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-[#562f00] text-white hover:bg-[#562f00]/90"
          disabled={!pdfUrl}
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
        
        <Button
          onClick={handleShare}
          variant="outline"
          className="flex items-center gap-2 border-[#562f00]/20 text-[#562f00] hover:bg-[#562f00]/10"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>

      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-green-600 px-4 py-2 text-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>Link copied to clipboard!</span>
          </div>
        </div>
      )}
    </>
  )
}
