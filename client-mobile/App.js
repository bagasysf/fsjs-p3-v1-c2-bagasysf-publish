import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import LogoTitle from './components/LogoTitle';
import DetailPostScreen from './screens/DetailPostScreen';
import { client } from './config/apollo';
import { ApolloProvider } from '@apollo/client';

const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

const Stack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerStyle: { height: 100 },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="Details" component={DetailPostScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer
        style={{
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              size = 20;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Categories') {
                iconName = focused ? 'grid' : 'grid-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#E20612',
            tabBarInactiveTintColor: '#1F2024',
            tabBarStyle: {
              paddingTop: 10,
              paddingBottom: 20,
              height: 85,
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen name="Categories" component={CategoriesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
