import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { HeaderButton } from '../../components/HeaderButton';

const DrawerLayout = () => (
  <Drawer
    screenOptions={{
      // styles for the header
      headerStyle: {
        backgroundColor: '#026873',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerShown: true,
      // styles for the drawer
      drawerHideStatusBarOnOpen: true,
      drawerActiveBackgroundColor: '#026873',
      drawerActiveTintColor: '#fff',
      drawerLabelStyle: {
        marginLeft: -22,
      },
    }}>
    <Drawer.Screen
      name="(home)"
      options={{
        title: 'Moviestart',
        headerShown: false,
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="(favorites)"
      options={{
        title: 'Favorites',
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="star-outline" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <HeaderButton />
          </Link>
        ),
      }}
    />
  </Drawer>
);

export default DrawerLayout;
