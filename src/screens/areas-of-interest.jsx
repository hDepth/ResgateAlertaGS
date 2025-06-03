import React, { useState, useCallback } from 'react'; // Adicione useCallback
import { View, Text, ScrollView, Alert, FlatList } from 'react-native'; // Mude para FlatList
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/areas-of-interest';
import StyledButton from '../components/StyledButton';
import { COLORS, FONT_SIZES, SPACING } from '../constants/Theme';
import AreaCard from '../components/AreaCard'; // Importe o novo componente

export default function AreasOfInterestScreen() {
  const navigation = useNavigation();
  const [areas, setAreas] = useState([
    { id: '1', name: 'Casa', coordinates: 'Lat: -23.123, Long: -46.456', active: true },
    { id: '2', name: 'Trabalho', coordinates: 'Lat: -23.789, Long: -46.987', active: false },
    { id: '3', name: 'Escola Filhos', coordinates: 'Lat: -23.321, Long: -46.765', active: true },
  ]);

  const handleDeleteArea = useCallback((id) => { // Envolva com useCallback
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja remover esta área de interesse?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => {
            // Aqui você chamaria sua API para deletar
            setAreas(prevAreas => prevAreas.filter(area => area.id !== id));
            Alert.alert('Sucesso', 'Área removida com sucesso!');
          },
          style: 'destructive',
        },
      ]
    );
  }, []); // Adicione dependências se `areas` ou `setAreas` fossem de um contexto/prop

  const handleToggleActive = useCallback((id, newActiveState) => { // Envolva com useCallback
    // Aqui você chamaria sua API para atualizar o status
    setAreas(prevAreas =>
      prevAreas.map(area =>
        area.id === id ? { ...area, active: newActiveState } : area
      )
    );
    // Poderia adicionar um feedback visual/toast aqui
  }, []);

  const handleEditArea = useCallback((area) => { // Envolva com useCallback
    // Navegar para uma nova tela de edição, passando os dados da área
    navigation.navigate('AddEditAreaScreen', { areaToEdit: area });
    console.log('Editando área:', area);
  }, [navigation]);

  const handleNavigateToAddArea = () => {
    // Navegar para uma nova tela de adição
    navigation.navigate('AddEditAreaScreen'); // Sem parâmetros para modo de adição
  };

  const renderAreaItem = ({ item }) => ( // Ajuste para FlatList
    <AreaCard
      area={item}
      onDelete={handleDeleteArea}
      onToggleActive={handleToggleActive}
      onEdit={handleEditArea}
    />
  );

  return (
    <View style={styles.container}> {/* Use View para FlatList ocupar a tela */}
      <Text style={styles.title}>Minhas Áreas de Interesse</Text>
      <Text style={styles.subtitle}>
        Receba alertas personalizados para locais que são importantes para você.
      </Text>

      {areas.length > 0 ? (
        <FlatList
          data={areas}
          renderItem={renderAreaItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer} // Para padding na lista
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
          onPress={handleNavigateToAddArea} // Mude para navegação
          color={COLORS.primary}
        />
      </View>
    </View>
  );
}
