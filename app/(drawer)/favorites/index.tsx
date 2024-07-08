import { Favorite } from '@/interfaces/favorites';
import { Container, Main } from '@/tamagui.config';
import { Link } from 'expo-router';
import { useMMKVObject } from 'react-native-mmkv';
import { Text, View } from 'react-native';
import { Image, ListItem, ScrollView } from 'tamagui';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useMMKVObject<Favorite[]>('favorites');

  return (
    <Main>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          {favorites?.length !== 0 ? (
            <>
              {favorites?.map((fav) => (
                <Link key={fav.id} href={`/(drawer)/favorites/${fav.mediaType}/${fav.id}`} asChild>
                  <ListItem
                    my={10}
                    theme={'alt1'}
                    borderRadius={10}
                    title={fav.name}
                    size={'$5'}
                    icon={() => (
                      <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${fav.thumb}` }}
                        style={{ width: 70, height: 100, borderRadius: 10 }}></Image>
                    )}></ListItem>
                </Link>
              ))}
            </>
          ) : (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    color: '#333',
                  }}>
                  No favorites yet
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#666',
                    marginTop: 10,
                    textAlign: 'center',
                  }}>
                  Start adding some by tapping the heart icon on a movie or tv show
                </Text>
              </View>
            </>
          )}
        </ScrollView>
      </Container>
    </Main>
  );
};

export default FavoritesPage;
