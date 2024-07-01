import { Stack, Tabs } from 'expo-router';
import { ScreenContent } from '~/components/ScreenContent';

import { TabBarIcon } from '~/components/TabBarIcon';
import { Container } from '~/tamagui.config';

export default function Layout() {
  return (
    <>
      <Container>
        <ScreenContent path="app/(drawer)/(home)/index.tsx" title="Moviestart" />
      </Container>
    </>
  );
}
