import { useLocalSearchParams } from 'expo-router';
import { DetailsPage } from '@/components/DetailsPage';
import { MediaType } from '@/interfaces/apiresults';

const TvDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <DetailsPage id={String(id)} mediaType={MediaType.TV}/>;
};

export default TvDetail;
