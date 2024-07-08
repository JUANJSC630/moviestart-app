import { ImageBackground } from 'react-native';
import { MediaType, CastTv, CastMovie } from '@/interfaces/apiresults';
import { useQuery } from '@tanstack/react-query';
import { getCastMovies, getCastTvShows, getMovieDetails, getVideos } from '@/api/api';
import {
  H1,
  Text,
  Image,
  Main,
  ScrollView,
  YStack,
  Paragraph,
  Button,
  useTheme,
  H3,
  Spinner,
} from 'tamagui';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import { Favorite } from '@/interfaces/favorites';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import VideoPlayer from './VideoPlayer';
import ParticleBackground from './ParticleBackground';
import PercentageCircle from './PercentageCircle';
import CastTvCard from './CastTvCard';
import CastMovieCard from './CastMovieCard';

type DetailsPageProps = {
  id: string;
  mediaType: MediaType;
};

export const DetailsPage = ({ id, mediaType }: DetailsPageProps) => {
  const [isFavorite, setIsFavorite] = useMMKVBoolean(`${mediaType}-${id}`);
  const [favorites, setFavorites] = useMMKVObject<Favorite[]>('favorites');
  const theme = useTheme();

  const toggleFavorite = () => {
    const current = favorites || [];

    if (!isFavorite) {
      setFavorites([
        ...current,
        {
          id,
          mediaType,
          name: movieQuery.data?.title || movieQuery.data?.name,
          thumb: movieQuery.data?.poster_path!,
        },
      ]);
    } else {
      setFavorites(current.filter((fav) => fav.id !== id || fav.mediaType !== mediaType));
    }

    setIsFavorite(!isFavorite);
  };

  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(id, mediaType),
  });

  const videosQuery = useQuery({
    queryKey: ['videos', id],
    queryFn: () => getVideos(id, mediaType),
  });

  const castTvQuery = useQuery({
    queryKey: ['castTv', id],
    queryFn: () => getCastTvShows(id),
  });

  const castMovieQuery = useQuery({
    queryKey: ['castMovie', id],
    queryFn: () => getCastMovies(id),
  });

  const castTv = castTvQuery.data?.cast || [];
  const castMovie = castMovieQuery.data?.cast || [];

  if (
    movieQuery.isLoading ||
    videosQuery.isLoading ||
    castTvQuery.isLoading ||
    castMovieQuery.isLoading
  ) {
    return (
      <Main
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Spinner size="large" color={'$blue11'} />
      </Main>
    );
  }

  return (
    <Main style={{ flex: 1, paddingBottom: 50 }}>
      <ParticleBackground />
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button unstyled onPress={toggleFavorite}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={26}
                color={theme.blue9.get()}
              />
            </Button>
          ),
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          style={{ width: '100%', height: 300 }}
          resizeMode="cover"
          source={{
            uri: `https://image.tmdb.org/t/p/original${movieQuery.data?.backdrop_path}`,
          }}>
          <Image
            m={20}
            borderWidth={5}
            borderRadius={10}
            source={{ uri: `https://image.tmdb.org/t/p/w500${movieQuery.data?.poster_path}` }}
            w={290}
            h={410}
          />
        </ImageBackground>
        <PercentageCircle
          percentage={movieQuery.data?.vote_average * 10}
          containerStyle={{ top: 20, left: 330 }}
          textStyle={{ color: 'white', fontSize: 30 }}
          radius={40}
          strokeWidth={8}
        />
        <YStack
          p={20}
          mt={30}
          space={2}
          animation={'lazy'}
          enterStyle={{
            opacity: 0,
            y: 10,
          }}>
          <H1
            color={'$blue6'}
            style={{
              fontWeight: 'bold',
            }}>
            {movieQuery.data?.title || movieQuery.data?.name}
            <Text fontSize={16}>
              (
              {new Date(
                movieQuery.data?.release_date || movieQuery.data?.first_air_date!
              ).getFullYear()}
              )
            </Text>
          </H1>
          <Paragraph theme={'alt2'}>{movieQuery.data?.tagline}</Paragraph>
          <H3 color={'$blue6'}>Genres</H3>
          <Text fontSize={16} fontWeight={'bold'}>
            {movieQuery.data?.genres.map((genre: any) => genre.name).join(', ')}
          </Text>
          <H3 color={'$blue6'} mt={20}>
            Overview
          </H3>
          <Text fontSize={16}>{movieQuery.data?.overview}</Text>

          <H3 color={'$blue6'} mt={20}>
            Cast
          </H3>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {castTv.length > 0
              ? castTv.map((cast: CastTv) => (
                  <CastTvCard key={cast.id} cast={cast} roles={cast.roles[0]} />
                ))
              : castMovie.map((cast: CastMovie) => <CastMovieCard key={cast.id} cast={cast} />)}
          </ScrollView>
        </YStack>
        <ScrollView
          horizontal
          style={{
            paddingBottom: 20,
          }}
          showsHorizontalScrollIndicator={false}>
          {videosQuery.data?.results.map((video: any) => (
            <VideoPlayer key={video.key} video={video} />
          ))}
        </ScrollView>
      </ScrollView>
    </Main>
  );
};
