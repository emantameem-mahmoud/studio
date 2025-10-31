"use client";

import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chatbot } from '@/components/app/Chatbot';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };
  
  // No metadata export from a client component
  // We can set it in the head as a workaround
  useEffect(() => {
    document.title = "Northern Star Achievers";
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', 'Fostering success at Northern Elementary School for Girls');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Fostering success at Northern Elementary School for Girls';
      document.head.appendChild(meta);
    }
  }, []);


  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <audio ref={audioRef} autoPlay loop>
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
        <div className="fixed bottom-4 right-4 z-50">
          <Button variant="outline" size="icon" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            <span className="sr-only">{isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}</span>
          </Button>
        </div>
        <Chatbot />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
