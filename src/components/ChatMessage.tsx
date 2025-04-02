
import React from 'react';
import { cn } from '@/lib/utils';
import { MovieData } from './MovieCard';
import MovieRecommendations from './MovieRecommendations';

export type MessageType = 'user' | 'bot';

export interface ChatMessageProps {
  type: MessageType;
  content: string;
  timestamp: string;
  movies?: MovieData[];
  onLike?: (id: number) => void;
  onDislike?: (id: number) => void;
  onMoreInfo?: (id: number) => void;
}

const ChatMessage = ({ 
  type, 
  content, 
  timestamp, 
  movies, 
  onLike, 
  onDislike, 
  onMoreInfo 
}: ChatMessageProps) => {
  const isBot = type === 'bot';
  
  return (
    <div className={cn(
      "flex w-full mb-4 animate-fade-in",
      isBot ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[80%] md:max-w-[70%]",
        isBot ? "mr-auto" : "ml-auto"
      )}>
        <div className={cn(
          "p-3 rounded-lg",
          isBot ? "bg-card text-card-foreground" : "bg-primary text-primary-foreground"
        )}>
          <p className="text-sm whitespace-pre-wrap">{content}</p>
          
          {isBot && movies && movies.length > 0 && (
            <MovieRecommendations 
              movies={movies}
              onLike={onLike}
              onDislike={onDislike}
              onMoreInfo={onMoreInfo}
            />
          )}
        </div>
        
        <p className="text-xs text-muted-foreground mt-1">
          {timestamp}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
