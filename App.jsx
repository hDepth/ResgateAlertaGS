import 'react-native-gesture-handler'; // IMPORTANTE: deve ser a primeira linha!
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Importe todas as suas telas de src/screens
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import HomeScreen from './src/screens/home';
import CreateAlertScreen from './src/screens/create-alert';
import AlertDetailsScreen from './src/screens/alert-details';
import ProfileScreen from './src/screens/profile';
import AreasOfInterestScreen from './src/screens/areas-of-interest';
import LogoutScreenPlaceholder from './src/screens/LogoutScreenPlaceholder';

// --- CRIAÇÃO DAS INSTÂNCIAS DOS NAVEGADORES (sem tipagens explícitas) ---
const AuthStack = createStackNavigator();
const AppTabs = createBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
const RootStack = createStackNavigator();

// ------------------------------------------
// Navegador de Autenticação (Stack)
// ------------------------------------------
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

// ------------------------------------------
// Navegador de Tabs (Sua Navbar Interativa)
// ------------------------------------------
function MainTabsNavigator() {
  return (
    <AppTabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // O Drawer ou Stack pai vai gerenciar o header
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'CreateAlert') {
            iconName = 'add-alert';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'AreasOfInterest') {
            iconName = 'location-on';
          } else {
            iconName = 'help'; // Ícone padrão
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00796b', // Cor do ícone/label ativo
        tabBarInactiveTintColor: '#4db6ac', // Cor do ícone/label inativo
        tabBarStyle: {
          backgroundColor: '#e0f2f7', // Cor de fundo da Navbar
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <AppTabs.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <AppTabs.Screen name="CreateAlert" component={CreateAlertScreen} options={{ title: 'Reportar' }} />
      <AppTabs.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      <AppTabs.Screen name="AreasOfInterest" component={AreasOfInterestScreen} options={{ title: 'Locais' }} />
    </AppTabs.Navigator>
  );
}

// ------------------------------------------
// Navegador Drawer (Menu Lateral)
// ------------------------------------------
function AppNavigator() {
  return (
    <AppDrawer.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2196F3', // Cor de fundo do cabeçalho
        },
        headerTintColor: '#fff', // Cor do texto e ícones no cabeçalho
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <Pressable onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 15 }}>
            <MaterialIcons name="menu" size={24} color="white" />
          </Pressable>
        ),
        drawerActiveTintColor: '#00796b',
        drawerInactiveTintColor: '#4db6ac',
        drawerLabelStyle: {
          fontSize: 16,
        },
      })}
    >
      {/* A tela principal do Drawer será o seu MainTabsNavigator */}
      <AppDrawer.Screen
        name="MainTabs" // IMPORTANTE: Este nome de rota é como o Drawer acessa as Tabs
        component={MainTabsNavigator}
        options={{
          drawerLabel: 'Início',
          title: 'ResgateAlerta',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      {/* Telas que podem ser acessadas diretamente pelo Drawer, sem estar nas Tabs */}
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
      {/* Item de Logout no Drawer */}
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

// ------------------------------------------
// Navegador Raiz (RootStack) - ponto de entrada do aplicativo
// ------------------------------------------
export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* A tela Auth será a primeira, sem header */}
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        {/* A tela App (principal) será acessada após a autenticação */}
        <RootStack.Screen name="App" component={AppNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}