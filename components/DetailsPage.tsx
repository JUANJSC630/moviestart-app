import { ImageBackground } from 'react-native';
import { MediaType } from '@/interfaces/apiresults';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetails, getVideos } from '@/api/api';
import { H1, Text, Image, Main, ScrollView, YStack, Paragraph, Button, useTheme } from 'tamagui';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import { Favorite } from '@/interfaces/favorites';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import VideoPlayer from './VideoPlayer';

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

  return (
    <Main style={{ flex: 1, paddingBottom: 50 }}>
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
            w={200}
            h={300}
          />
        </ImageBackground>
        <YStack
          p={20}
          animation={'lazy'}
          enterStyle={{
            opacity: 0,
            y: 10,
          }}>
          <H1 color={'$blue6'} fontWeight={700}>
            {movieQuery.data?.title || movieQuery.data?.name}
            <Text fontSize={16} fontWeight={500}>
              (
              {new Date(
                movieQuery.data?.release_date || movieQuery.data?.first_air_date!
              ).getFullYear()}
              )
            </Text>
          </H1>
          <Paragraph theme={'alt2'} fontWeight={500}>
            {movieQuery.data?.tagline}
          </Paragraph>
          <Text fontSize={16}>{movieQuery.data?.overview}</Text>
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
