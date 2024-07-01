import { Stack } from 'expo-router';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';

export default function Favorites() {
  return (
    <>
      <Stack.Screen options={{ title: 'Favorites' }} />
      <Container>
        <ScreenContent path="app/(drawer)/(favorites)/index.tsx" title="Favorites" />
      </Container>
    </>
  );
}
