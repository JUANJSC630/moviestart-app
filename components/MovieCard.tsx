import { ResultItem } from '@/interfaces/apiresults';
import { Link } from 'expo-router';
import React from 'react';
import { Card, Image, Paragraph, Text, YStack } from 'tamagui';

type MovieCardProps = {
  movie: ResultItem;
};

//TODO: add TV type
export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      href={`/(drawer)/(home)/${movie.media_type === '(movie)' ? '(movie)' : '(movie)'}/${movie.id}`}
      asChild>
      <Card
        elevate
        width={200}
        height={310}
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.985 }}
        animation={'bouncy'}>
        <Card.Header p={0}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            alt={movie.title}
            style={{ width: 200, height: 240, borderRadius: 5 }}
          />
        </Card.Header>
        <Card.Footer p={8}>
          <YStack>
            <Text fontSize={12} color={'lightblue'}>
              {movie.title || movie.name}
            </Text>
            <Paragraph theme={'alt2'}>
              {new Date(movie.release_date! || movie.first_air_date!).getFullYear()}
            </Paragraph>
          </YStack>
        </Card.Footer>
      </Card>
    </Link>
  );
};
