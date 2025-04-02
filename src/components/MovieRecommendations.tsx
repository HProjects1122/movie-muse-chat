
import React from 'react';
import MovieCard, { MovieData } from './MovieCard';

interface MovieRecommendationsProps {
  movies: MovieData[];
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onMoreInfo: (id: number) => void;
}

const MovieRecommendations = ({ 
  movies, 
  onLike, 
  onDislike, 
  onMoreInfo 
}: MovieRecommendationsProps) => {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-3">Recommended Movies:</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-3 px-3 chat-scrollbar">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onLike={onLike}
            onDislike={onDislike}
            onMoreInfo={onMoreInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;
