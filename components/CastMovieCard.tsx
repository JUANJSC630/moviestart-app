import { CastMovie } from '@/interfaces/apiresults';
import React from 'react';
import { Card, View, Text, Image } from 'tamagui';
type CastCardProps = {
  cast: CastMovie;
};

const CastMovieCard = ({ cast }: CastCardProps) => {
  return (
    <Card
      style={{
        margin: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 10,
      }}>
      <View flexDirection="row" alignItems="center" padding={10}>
        <Image
          style={{
            width: 60,
            height: 80,
            borderRadius: 5,
            marginRight: 10,
          }}
          source={{ uri: `https://image.tmdb.org/t/p/w185${cast.profile_path}` }}
        />
        <View flex={1}>
          <Text fontSize={16} fontWeight={'bold'}>
            {cast.name}
          </Text>
          <Text fontSize={12} color={'gray'}>
            {cast.character}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default CastMovieCard;
