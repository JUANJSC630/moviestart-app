import { View, ImageBackground } from 'react-native';
import { MediaType } from '@/interfaces/apiresults';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '@/services/api';
import { H1, Text, Image, Main, ScrollView, YStack, Paragraph } from 'tamagui';

type DetailsPageProps = {
  id: string;
  mediaType: MediaType;
};

export const DetailsPage = ({ id, mediaType }: DetailsPageProps) => {
  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(+id, mediaType),
  });
  return (
    <Main>
      <ScrollView>
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
      </ScrollView>
    </Main>
  );
};
