import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { HeaderButton } from '@/components/HeaderButton';
import { colorTokens } from '@tamagui/themes';

const DrawerLayout = () => (
  <Drawer
    screenOptions={{
      // styles for the header
      headerStyle: {
        backgroundColor: colorTokens.dark.blue.blue11,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerShown: true,
      // styles for the drawer
      drawerHideStatusBarOnOpen: true,
      drawerActiveBackgroundColor: colorTokens.dark.blue.blue11,
      drawerActiveTintColor: '#fff',
      drawerLabelStyle: {
        marginLeft: -22,
      },
    }}>
    <Drawer.Screen
      name="home"
      options={{
        title: 'Moviestart',
        headerShown: false,
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="favorites"
      options={{
        title: 'Favorites',
        headerShown: false,
        drawerIcon: ({ size, color }) => <Ionicons name="heart-outline" size={size} color={color} />,
      }}
    />
  </Drawer>
);

export default DrawerLayout;
