
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import MovieChatHeader from './MovieChatHeader';
import ChatInput from './ChatInput';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import { generateResponse, getMovieById } from '@/services/movieService';

const MovieChatContainer = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage = {
      type: 'bot' as const,
      content: "👋 Hi there! I'm MovieMuse, your personal movie recommendation assistant. Tell me what kind of movies you enjoy, or ask for suggestions by genre, director, or mood!",
      timestamp: new Date().toLocaleTimeString(),
      movies: []
    };
    
    setMessages([welcomeMessage]);
  }, []);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: ChatMessageProps = {
      type: 'user',
      content,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    // Simulate processing delay for realistic chat experience
    setTimeout(() => {
      const response = generateResponse(content);
      
      const botMessage: ChatMessageProps = {
        type: 'bot',
        content: response.text,
        timestamp: new Date().toLocaleTimeString(),
        movies: response.movies,
        onLike: handleLikeMovie,
        onDislike: handleDislikeMovie,
        onMoreInfo: handleMoreInfo
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsProcessing(false);
    }, 1500);
  };
  
  const handleLikeMovie = (id: number) => {
    const movie = getMovieById(id);
    if (movie) {
      toast({
        title: `You liked ${movie.title}`,
        description: "I'll recommend more movies like this in the future!",
      });
      // In a real app, we'd store this preference in a user profile
    }
  };
  
  const handleDislikeMovie = (id: number) => {
    const movie = getMovieById(id);
    if (movie) {
      toast({
        title: `You disliked ${movie.title}`,
        description: "I'll avoid recommending similar movies in the future.",
      });
      // In a real app, we'd store this preference in a user profile
    }
  };
  
  const handleMoreInfo = (id: number) => {
    const movie = getMovieById(id);
    if (movie) {
      const botMessage: ChatMessageProps = {
        type: 'bot',
        content: `More about "${movie.title}" (${movie.year}):\n\n${movie.overview}\n\nGenres: ${movie.genres.join(', ')}\nRating: ${movie.rating}/10`,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }
  };
  
  return (
    <div className="flex flex-col h-screen max-h-screen bg-cinema-navy/5">
      <MovieChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4 chat-scrollbar">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            {...message}
          />
        ))}
        
        {isProcessing && (
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <div className="bg-card h-8 w-8 rounded-full flex items-center justify-center">
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-cinema-accent animate-pulse-slow"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-cinema-accent animate-pulse-slow delay-200"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-cinema-accent animate-pulse-slow delay-300"></div>
              </div>
            </div>
            <span className="text-sm">MovieMuse is thinking...</span>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>
      
      <ChatInput
        onSendMessage={handleSendMessage}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default MovieChatContainer;
