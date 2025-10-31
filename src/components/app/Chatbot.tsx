"use client";

import { useState, useRef, useEffect } from 'react';
import { Bot, CornerDownLeft, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { chatWithNoura } from '@/ai/flows/chat-with-noura';
import type { ChatMessage } from '@/ai/schema/chat-with-noura';

const RobotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
        <path d="M12 8V4H8v4Z" fill="currentColor" />
        <path d="M16 8V4h-4v4Z" fill="currentColor" />
        <path d="M12 14v-4h4v4Z" />
        <path d="M8 10v4h4v-4Z" />
        <path d="m14 20-2-2-2 2" />
        <path d="M18 10h4v4h-4Z" />
        <path d="M2 10h4v4H2Z" />
        <path d="M10 18v-2a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
        <path d="M12 2a2 2 0 0 1 2 2v1H10V4a2 2 0 0 1 2-2Z" />
        <path d="M14 14a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2" />
        <circle cx="9" cy="12" r="1" fill="white" />
        <circle cx="15" cy="12" r="1" fill="white" />
        <path d="M9.5 16h5" />
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
    setPosition({ x: 50, y: window.innerHeight - 150 });
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
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
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
