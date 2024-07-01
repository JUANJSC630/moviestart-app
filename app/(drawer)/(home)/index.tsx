import { Input, ScrollView, Spinner, YStack } from 'tamagui';
import { ImageBackground } from 'react-native';

import { Container, Title, Main, Subtitle } from '@/tamagui.config';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MovieCard } from '@/components/MovieCard';
import { getTrending } from '@/services/api';

export default function Home() {
  const [searchString, setSearchString] = useState('');

  const trendingQuery = useQuery({
    queryKey: ['trending'],
    queryFn: getTrending,
  });

  const searchQuery = useQuery({
    queryKey: ['search', searchString],
    queryFn: getTrending,
  });
  return (
    <Main>
      <ImageBackground
        source={{
          uri: 'https://media.themoviedb.org/t/p/w880_and_h600_multi_faces_filter(duotone,00192f,00baff)/6UH52Fmau8RPsMAbQbjwN3wJSCj.jpg',
        }}
        style={{ width: '100%', height: 200 }}>
        <Container>
          <YStack>
            <Title
              color={'#fff'}
              fontWeight={'800'}
              enterStyle={{
                opacity: 0,
                scale: 1.5,
                y: -10,
              }}
              animation="quick">
              Trending
            </Title>
            <Input
              placeholder="Search for a movie, tv show, person..."
              placeholderTextColor={'#fff'}
              borderWidth={1}
              size={'$5'}
              fontWeight={'500'}
              value={searchString}
              onChangeText={(text) => setSearchString(text)}
            />
          </YStack>
        </Container>
      </ImageBackground>
      <Subtitle
        p={10}
        enterStyle={{
          opacity: 0,
        }}
        animation="lazy">
        Trending
      </Subtitle>
      {(trendingQuery.isLoading || searchQuery.isLoading) && (
        <Spinner size="large" color={'$blue11'} />
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        py={40}
        contentContainerStyle={{ gap: 15, paddingLeft: 15 }}>
        {trendingQuery.data?.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </ScrollView>
    </Main>
  );
}
