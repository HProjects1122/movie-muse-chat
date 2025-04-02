
import React from 'react';
import MovieChatContainer from '@/components/MovieChatContainer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cinema-dark to-cinema-navy">
      <div className="container mx-auto h-screen max-w-4xl pt-8 pb-8 px-4">
        <div className="bg-card overflow-hidden rounded-xl shadow-xl h-full border border-border">
          <MovieChatContainer />
        </div>
      </div>
    </div>
  );
};

export default Index;
