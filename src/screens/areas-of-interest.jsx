import React, { useState, useCallback, useEffect } from 'react'; // Adicione useEffect
import { View, Text, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Adicione useFocusEffect
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe AsyncStorage
import styles from '../styles/areas-of-interest';
import StyledButton from '../components/StyledButton';
import { COLORS, FONT_SIZES, SPACING } from '../constants/Theme';
import AreaCard from '../components/AreaCard'; // Importe o componente AreaCard

export default function AreasOfInterestScreen() {
  const navigation = useNavigation();
  const [areas, setAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para carregar as áreas do AsyncStorage
  const loadAreas = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const storedAreas = await AsyncStorage.getItem('user_areas_of_interest');
      if (storedAreas) {
        setAreas(JSON.parse(storedAreas));
      } else {
        setAreas([]); // Nenhuma área salva
      }
    } catch (e) {
      console.error('Erro ao carregar áreas do AsyncStorage:', e);
      setError('Não foi possível carregar suas áreas de interesse.');
      Alert.alert('Erro', 'Não foi possível carregar suas áreas de interesse.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Use useFocusEffect para recarregar as áreas sempre que a tela estiver em foco
  useFocusEffect(
    useCallback(() => {
      loadAreas();
      return () => {
        // Limpar estados ou listeners se necessário
      };
    }, [loadAreas])
  );

  // Função para salvar as áreas no AsyncStorage
  const saveAreas = useCallback(async (newAreas) => {
    try {
      await AsyncStorage.setItem('user_areas_of_interest', JSON.stringify(newAreas));
      setAreas(newAreas); // Atualiza o estado local
    } catch (e) {
      console.error('Erro ao salvar áreas no AsyncStorage:', e);
      Alert.alert('Erro', 'Não foi possível salvar as alterações nas áreas de interesse.');
    }
  }, []);

  const handleDeleteArea = useCallback((id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja remover esta área de interesse?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            const updatedAreas = areas.filter(area => area.id !== id);
            await saveAreas(updatedAreas); // Salva no AsyncStorage
            Alert.alert('Sucesso', 'Área removida com sucesso!');
          },
          style: 'destructive',
        },
      ]
    );
  }, [areas, saveAreas]); // Adicione 'areas' como dependência

  const handleToggleActive = useCallback(async (id, newActiveState) => {
    const updatedAreas = areas.map(area =>
      area.id === id ? { ...area, active: newActiveState } : area
    );
    await saveAreas(updatedAreas); // Salva no AsyncStorage
    // Poderia adicionar um feedback visual/toast aqui
  }, [areas, saveAreas]); // Adicione 'areas' como dependência

  const handleEditArea = useCallback((area) => {
    navigation.navigate('AddEditAreaScreen', { areaToEdit: area });
    console.log('Editando área:', area);
  }, [navigation]);

  const handleNavigateToAddArea = () => {
    navigation.navigate('AddEditAreaScreen');
  };

  const renderAreaItem = ({ item }) => (
    <AreaCard
      area={item}
      onDelete={handleDeleteArea}
      onToggleActive={handleToggleActive}
      onEdit={handleEditArea}
    />
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Carregando áreas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={FONT_SIZES.xxLarge * 2} color={COLORS.danger} />
        <Text style={styles.errorText}>{error}</Text>
        <StyledButton title="Tentar Novamente" onPress={loadAreas} color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Áreas de Interesse</Text>
      <Text style={styles.subtitle}>
        Receba alertas personalizados para locais que são importantes para você.
      </Text>

      {areas.length > 0 ? (
        <FlatList
          data={areas}
          renderItem={renderAreaItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer}
        />
      ) : (
        <View style={styles.noAreasContainer}>
          <MaterialIcons name="location-off" size={FONT_SIZES.xxLarge * 2} color={COLORS.lightText} />
          <Text style={styles.noAreasText}>Nenhuma área de interesse configurada ainda. Adicione uma para começar a receber alertas!</Text>
        </View>
      )}

      <View style={styles.addAreaButtonContainer}>
        <StyledButton
          title="Adicionar Nova Área"
          onPress={handleNavigateToAddArea}
          color={COLORS.primary}
        />
      </View>
    </View>
  );
}