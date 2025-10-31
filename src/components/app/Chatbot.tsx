"use client";

import { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { chatWithNoura } from '@/ai/flows/chat-with-noura';
import type { ChatMessage } from '@/ai/schema/chat-with-noura';

const RobotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
        <circle cx="12" cy="12" r="10" fill="hsl(var(--primary))" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="hsl(var(--primary-foreground))"/>
        <path d="M9 9.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5.22-.5.5-.5.5.22.5.5z" fill="hsl(var(--primary-foreground))" stroke="none" />
        <path d="M15 9.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5.22-.5.5-.5.5.22.5.5z" fill="hsl(var(--primary-foreground))" stroke="none" />
        <path d="M10 4.5a2.5 2.5 0 0 1 4 0" stroke="hsl(var(--primary-foreground))" strokeLinecap='round' />
        <path d="M4.93 4.93l-1.41 1.41" />
        <path d="M19.07 4.93l1.41 1.41" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
    </svg>
);


export function Chatbot() {
  const [position, setPosition] = useState<{x: number, y: number} | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const botRef = useRef<HTMLDivElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const chatCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPosition({ x: 50, y: window.innerHeight - 150 });
    }
  }, []);
  
  const handleDragStart = (clientX: number, clientY: number, target: EventTarget) => {
    // Prevent dragging if the click is inside the chat window
    if (chatCardRef.current?.contains(target as Node)) {
        return;
    }
    if (!position) return;

    setIsDragging(true);
    setHasMoved(false);
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  };
  
  const handleDragMove = (clientX: number, clientY: number) => {
    if (isDragging) {
        if (!hasMoved) setHasMoved(true);
        setPosition({ x: clientX - dragStart.x, y: clientY - dragStart.y });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Use a timeout to reset hasMoved to allow click event to process
    setTimeout(() => setHasMoved(false), 0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX, e.clientY, e.target);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX, e.touches[0].clientY, e.target);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
  };
  
  const handleClick = (e: React.MouseEvent) => {
     if (hasMoved) {
        e.stopPropagation();
        return;
     }
      // Do not toggle chat if the click is on the chat window itself
     if (chatCardRef.current?.contains(e.target as Node)) {
        return;
     }
     setIsChatOpen(prev => !prev);
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithNoura({ history: [...messages, userMessage] });
      const nouraMessage: ChatMessage = { role: 'model', content: response };
      setMessages(prev => [...prev, nouraMessage]);
    } catch (error) {
      console.error("Error chatting with Noura:", error);
      const errorMessage: ChatMessage = { role: 'model', content: "عذراً، حدث خطأ ما. الرجاء المحاولة مرة أخرى." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
   useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  if (!position) {
    return null;
  }

  return (
    <div
      ref={botRef}
      className="fixed z-50"
      style={{ left: position.x, top: position.y, touchAction: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleDragEnd}
      onClick={handleClick}
    >
      <div className={`transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center">
          <RobotIcon />
        </div>
        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">نورة</div>
      </div>

      {isChatOpen && (
        <Card 
            ref={chatCardRef}
            className="absolute bottom-full mb-4 w-80 shadow-xl" 
            style={{ right: "calc(50% - 10rem)", cursor: 'default' }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>مرحباً، أنا نورة!</CardTitle>
            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setIsChatOpen(false); }}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent ref={chatContentRef} className="h-80 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
             {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>تفكر...</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اسأل نورة أي شيء..."
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <CornerDownLeft className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
