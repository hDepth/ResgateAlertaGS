import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// Importe suas constantes de tema
import { COLORS, FONT_SIZES, SPACING } from './src/constants/Theme';

// Importe todas as suas telas de src/screens
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import HomeScreen from './src/screens/home';
import CreateAlertScreen from './src/screens/create-alert';
import AlertDetailsScreen from './src/screens/alert-details';
import ProfileScreen from './src/screens/profile';
import AreasOfInterestScreen from './src/screens/areas-of-interest';
import AddEditAreaScreen from './src/screens/AddEditAreaScreen';
import LogoutScreenPlaceholder from './src/screens/LogoutScreenPlaceholder';

const AuthStack = createStackNavigator();
const AppTabs = createBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
const RootStack = createStackNavigator();
const AreasStack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function AreasStackNavigator() {
  return (
    <AreasStack.Navigator screenOptions={{ headerShown: false }}>
      <AreasStack.Screen name="AreasOfInterestScreen" component={AreasOfInterestScreen} />
      <AreasStack.Screen name="AddEditAreaScreen" component={AddEditAreaScreen} />
    </AreasStack.Navigator>
  );
}

function MainTabsNavigator() {
  return (
    <AppTabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'CreateAlert':
              iconName = 'add-alert';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            case 'AreasOfInterest':
              iconName = 'map';
              break;
            default:
              iconName = 'help';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.lightText,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          height: 60,
          paddingBottom: SPACING.small,
          borderTopWidth: 1,
          borderTopColor: COLORS.borderColor,
        },
        tabBarLabelStyle: {
          fontSize: FONT_SIZES.small,
        },
      })}
    >
      <AppTabs.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <AppTabs.Screen name="CreateAlert" component={CreateAlertScreen} options={{ title: 'Reportar' }} />
      <AppTabs.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      <AppTabs.Screen name="AreasOfInterest" component={AreasStackNavigator} options={{ title: 'Locais' }} />
    </AppTabs.Navigator>
  );
}

function AppNavigator() {
  return (
    <AppDrawer.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.inverseText,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: FONT_SIZES.large,
        },
        headerLeft: () => (
          <Pressable onPress={() => navigation.toggleDrawer()} style={styles.headerLeftIcon}>
            <MaterialIcons name="menu" size={SPACING.large} color={COLORS.inverseText} />
          </Pressable>
        ),
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.darkText,
        drawerLabelStyle: {
          fontSize: FONT_SIZES.medium,
        },
        drawerStyle: {
          backgroundColor: COLORS.lightBackground,
        },
      })}
    >
      <AppDrawer.Screen
        name="MainTabs"
        component={MainTabsNavigator}
        options={{
          drawerLabel: 'Início',
          title: 'ResgateAlerta',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <AppDrawer.Screen
        name="AlertDetails"
        component={AlertDetailsScreen}
        options={{
          drawerLabel: 'Detalhes do Alerta',
          title: 'Detalhes do Alerta',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="info" color={color} size={size} />
          ),
        }}
      />
      <AppDrawer.Screen
        name="Logout"
        component={LogoutScreenPlaceholder}
        options={{
          drawerLabel: 'Sair',
          title: 'Sair',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="logout" color={color} size={size} />
          ),
        }}
      />
    </AppDrawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="App" component={AppNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerLeftIcon: {
    marginLeft: SPACING.medium,
  },
});