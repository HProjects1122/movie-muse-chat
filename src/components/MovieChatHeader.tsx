
import React from 'react';
import { Film } from 'lucide-react';

const MovieChatHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        <Film className="h-6 w-6 text-cinema-gold" />
        <h1 className="text-xl font-semibold">MovieMuse</h1>
      </div>
      <div className="text-sm text-muted-foreground">
        Your personal movie recommendation assistant
      </div>
    </div>
  );
};

export default MovieChatHeader;
