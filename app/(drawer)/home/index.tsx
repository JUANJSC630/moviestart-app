import { Input, ScrollView, Spinner, YStack } from 'tamagui';
import { ImageBackground } from 'react-native';

import { Container, Title, Main, Subtitle } from '@/tamagui.config';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MovieCard } from '@/components/MovieCard';
import { getTvTopRate, getSearchResults, getTrending } from '@/api/api';
import useDebounce from '@/hooks/useDebounce';

export default function Home() {
  const [searchString, setSearchString] = useState('');

  const debouncedString = useDebounce(searchString, 300);

  const trendingQuery = useQuery({
    queryKey: ['trending'],
    queryFn: getTrending,
  });

  const searchQuery = useQuery({
    queryKey: ['search', debouncedString],
    queryFn: () => getSearchResults(debouncedString),
    enabled: debouncedString.length > 0,
  });

  const tvTopRateQuery = useQuery({
    queryKey: ['top_rated'],
    queryFn: getTvTopRate,
  });

  return (
    <Main style={{ flex: 1, paddingBottom: 50 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
        <YStack>
          <Subtitle
            p={10}
            enterStyle={{
              opacity: 0,
            }}
            animation="lazy">
            {searchQuery.data?.results ? 'Search Results' : 'Trending'}
          </Subtitle>
          {(trendingQuery.isLoading || searchQuery.isLoading) && (
            <Spinner size="large" color={'$blue11'} />
          )}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            py={10}
            contentContainerStyle={{ gap: 15, paddingLeft: 15 }}>
            {searchQuery.data?.results ? (
              <>
                {searchQuery.data.results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </>
            ) : (
              <>
                {trendingQuery.data?.results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </>
            )}
          </ScrollView>

          <Subtitle
            p={10}
            enterStyle={{
              opacity: 0,
            }}
            animation="lazy"
            style={{ marginTop: 20 }}>
            Top Rated TV Shows
          </Subtitle>
          {tvTopRateQuery.isLoading && <Spinner size="large" color={'$blue11'} />}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            py={10}
            contentContainerStyle={{ gap: 15, paddingLeft: 15 }}>
            {tvTopRateQuery.data?.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </ScrollView>
        </YStack>
      </ScrollView>
    </Main>
  );
}
