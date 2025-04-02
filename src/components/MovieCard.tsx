
import React from 'react';
import { Star, ThumbsUp, ThumbsDown, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export interface MovieData {
  id: number;
  title: string;
  year: number;
  poster: string;
  rating: number;
  overview: string;
  genres: string[];
}

interface MovieCardProps {
  movie: MovieData;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onMoreInfo: (id: number) => void;
}

const MovieCard = ({ movie, onLike, onDislike, onMoreInfo }: MovieCardProps) => {
  return (
    <Card className="w-full sm:w-[220px] overflow-hidden transition-all hover:shadow-md animate-fade-in">
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <img 
          src={movie.poster} 
          alt={`${movie.title} poster`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          <Star className="h-3 w-3 fill-cinema-gold text-cinema-gold" />
          <span>{movie.rating.toFixed(1)}</span>
        </div>
      </div>
      
      <CardContent className="p-3">
        <h3 className="font-semibold text-sm line-clamp-1">{movie.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{movie.year} • {movie.genres.slice(0, 2).join(', ')}</p>
        
        <div className="flex items-center justify-between gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => onLike(movie.id)}
          >
            <ThumbsUp className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => onDislike(movie.id)}
          >
            <ThumbsDown className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => onMoreInfo(movie.id)}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
