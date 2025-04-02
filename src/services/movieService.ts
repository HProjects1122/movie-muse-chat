
import { MovieData } from '@/components/MovieCard';

// Sample movie data for demonstration
const sampleMovies: MovieData[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    rating: 9.3,
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genres: ["Drama"]
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    rating: 9.2,
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    genres: ["Crime", "Drama"]
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    rating: 9.0,
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genres: ["Action", "Crime", "Drama"]
  },
  {
    id: 4, 
    title: "Pulp Fiction",
    year: 1994,
    poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    rating: 8.9,
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    genres: ["Crime", "Drama"]
  },
  {
    id: 5,
    title: "Fight Club",
    year: 1999,
    poster: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    rating: 8.8,
    overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    genres: ["Drama"]
  }
];

// Movie categories for responses
const movieCategories = {
  action: [3],
  drama: [1, 2, 5],
  crime: [2, 3, 4],
  classics: [1, 2],
  modern: [3, 4, 5]
};

export type MovieCategory = keyof typeof movieCategories;

// Simple NLP for demonstration - in a real app, this would be much more sophisticated
export const analyzeMessage = (message: string) => {
  const lowerCaseMsg = message.toLowerCase();
  
  // Check for genres and categories
  let identifiedCategories: MovieCategory[] = [];
  
  if (lowerCaseMsg.includes('action')) identifiedCategories.push('action');
  if (lowerCaseMsg.includes('drama')) identifiedCategories.push('drama');
  if (lowerCaseMsg.includes('crime')) identifiedCategories.push('crime');
  if (lowerCaseMsg.includes('classic')) identifiedCategories.push('classics');
  if (lowerCaseMsg.includes('modern') || lowerCaseMsg.includes('recent')) identifiedCategories.push('modern');
  
  // Default to a mix if nothing specific is mentioned
  if (identifiedCategories.length === 0) {
    if (lowerCaseMsg.includes('recommend') || lowerCaseMsg.includes('suggestion') || lowerCaseMsg.includes('movie')) {
      identifiedCategories = ['drama', 'action']; // Default categories
    }
  }
  
  return {
    categories: identifiedCategories,
    hasGreeting: lowerCaseMsg.includes('hello') || lowerCaseMsg.includes('hi') || lowerCaseMsg.includes('hey'),
    asksForRecommendation: lowerCaseMsg.includes('recommend') || lowerCaseMsg.includes('suggestion') || lowerCaseMsg.includes('what should')
  };
};

export const getMovieRecommendations = (categories: MovieCategory[] = []) => {
  if (categories.length === 0) return sampleMovies;
  
  // Get unique movie IDs from all requested categories
  const movieIds = new Set<number>();
  categories.forEach(category => {
    movieCategories[category]?.forEach(id => movieIds.add(id));
  });
  
  // Return movies that match those IDs
  return sampleMovies.filter(movie => movieIds.has(movie.id));
};

export const generateResponse = (message: string) => {
  const analysis = analyzeMessage(message);
  
  if (analysis.hasGreeting) {
    return {
      text: "Hello! I'm MovieMuse, your friendly movie recommendation assistant. Tell me what kind of movies you enjoy, or ask for recommendations by genre, actor, or director!",
      movies: []
    };
  }
  
  if (analysis.asksForRecommendation) {
    const recommendations = getMovieRecommendations(analysis.categories);
    const categoryNames = analysis.categories.length > 0 
      ? analysis.categories.join(' and ') 
      : 'you might enjoy';
      
    return {
      text: `Based on your interest in ${categoryNames}, here are some movies I think you'd enjoy:`,
      movies: recommendations
    };
  }
  
  // Default response
  return {
    text: "I'm not sure I understand what kind of movies you're looking for. You can ask me for recommendations by genre like 'action' or 'drama', or tell me about movies you've enjoyed before.",
    movies: []
  };
};

export const getMovieById = (id: number) => {
  return sampleMovies.find(movie => movie.id === id);
};
