import { ResultItem } from '@/interfaces/apiresults';
import { Link } from 'expo-router';
import React from 'react';
import { Card, Image, Paragraph, Text, View, YStack } from 'tamagui';
import PercentageCircle from './PercentageCircle'; // Asegúrate de que la ruta sea correcta

type MovieCardProps = {
  movie: ResultItem;
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      href={`/(drawer)/home/${movie.media_type === 'movie' ? 'movie' : 'tv'}/${movie.id}`}
      asChild>
      <Card
        width={200}
        height={410}
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.985 }}
        backgroundColor={'transparent'}
        animation={'lazy'}
        enterStyle={{
          opacity: 0,
          y: 10,
        }}>
        <Card.Header p={0}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            alt={movie.title}
            style={{ width: 200, height: 300, borderRadius: 10 }}
          />
          <View h={0}>
            {isNaN(movie.vote_average) ? (
              <PercentageCircle percentage={0} />
            ) : (
              <PercentageCircle percentage={movie.vote_average * 10} />
            )}
          </View>
        </Card.Header>
        <Card.Footer h={90} p={8}>
          <YStack>
            <Text fontSize={18} fontWeight={600} color={'#000'}>
              {movie.title || movie.name}
            </Text>
            <Paragraph
              style={{
                color: 'gray',
                fontSize: 14,
                fontWeight: 700,
                lineHeight: 20,
              }}>
              {new Date(movie.release_date! || movie.first_air_date!).getFullYear()}
            </Paragraph>
          </YStack>
        </Card.Footer>
      </Card>
    </Link>
  );
};
