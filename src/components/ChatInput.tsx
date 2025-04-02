
import React, { useState } from 'react';
import { Send, Mic, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

const ChatInput = ({ onSendMessage, isProcessing }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() === '') return;
    
    onSendMessage(message);
    setMessage('');
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-4 border-t border-border bg-card"
    >
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about movies, genres, or directors..."
        className="flex-1"
        disabled={isProcessing}
      />
      
      {message && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => setMessage('')}
          disabled={isProcessing}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      <Button
        type="submit"
        size="icon"
        disabled={message.trim() === '' || isProcessing}
        className="bg-cinema-accent hover:bg-cinema-accent/90 text-white"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
