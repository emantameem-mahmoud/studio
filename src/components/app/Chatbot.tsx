"use client";

import { useState, useRef, useEffect } from 'react';
import { Bot, CornerDownLeft, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { chatWithNoura } from '@/ai/flows/chat-with-noura';
import type { ChatMessage } from '@/ai/schema/chat-with-noura';

const RobotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
        <circle cx="12" cy="12" r="10" fill="hsl(var(--primary))" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="hsl(var(--primary-foreground))"/>
        <line x1="9" y1="9" x2="9.01" y2="9" stroke="hsl(var(--primary-foreground))" strokeWidth="2.5" strokeLinecap='round' />
        <line x1="15" y1="9" x2="15.01" y2="9" stroke="hsl(var(--primary-foreground))" strokeWidth="2.5" strokeLinecap='round'/>
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

  const botRef = useRef<HTMLDivElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize position on the client side only
    if (typeof window !== 'undefined') {
      setPosition({ x: 50, y: window.innerHeight - 150 });
    }
  }, []);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent dragging on child elements of the chat window
    if (e.target !== botRef.current && botRef.current?.contains(e.target as Node)) {
        if (!isChatOpen) {
            setIsChatOpen(true);
        }
       return;
    }
    if (!position) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleClick = (e: React.MouseEvent) => {
     if (e.target === botRef.current || botRef.current?.contains(e.target as Node)) {
         if (!isDragging) {
            setIsChatOpen(prev => !prev);
         }
     }
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
      className="fixed z-50 cursor-grab"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
    >
      <div className={`transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center">
          <RobotIcon />
        </div>
        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">نورة</div>
      </div>

      {isChatOpen && (
        <Card className="absolute bottom-full mb-4 w-80 shadow-xl" style={{ right: "calc(50% - 10rem)"}}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>مرحباً، أنا نورة!</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)}>
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
