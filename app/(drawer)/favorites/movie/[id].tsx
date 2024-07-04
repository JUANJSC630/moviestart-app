import { useLocalSearchParams } from 'expo-router';
import { DetailsPage } from '@/components/DetailsPage';
import { MediaType } from '@/interfaces/apiresults';

const MovieDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <DetailsPage id={String(id)} mediaType={MediaType.MOVIE}/>;
};

export default MovieDetail;