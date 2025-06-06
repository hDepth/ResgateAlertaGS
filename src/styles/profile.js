// src/styles/profile.js
import { StyleSheet } from 'react-native';

const profileStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f0f2f5',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 18,
        color: '#666',
    },
    errorText: {
        marginTop: 20,
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    // --- Estilos de Cards ---
    profileCard: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },

    // --- Estilos de Informações Pessoais ---
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f0f0f0',
    },
    label: {
        fontSize: 16,
        color: '#555',
        fontWeight: '600',
        flex: 1,
    },
    value: {
        fontSize: 16,
        color: '#333',
        flex: 2,
        textAlign: 'right',
    },

    // --- Estilos de Edição (NOVOS/AJUSTADOS) ---
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fefefe',
        width: '100%', // Para ocupar o espaço total
    },
    editButton: {
        backgroundColor: '#007bff', // Azul para editar
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    editButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonGroup: {
        flexDirection: 'column', // Alterado para coluna para melhor empilhamento
        // justifyContent: 'space-around', // Usar se flexDirection for 'row'
        marginTop: 15,
    },
    saveButton: {
        backgroundColor: '#28a745', // Verde para salvar
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10, // Espaçamento entre Salvar e Cancelar
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#dc3545', // Vermelho para cancelar
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },

    // --- Estilos de Estatísticas ---
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    statItem: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        minWidth: '45%',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007bff',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
        textAlign: 'center',
    },

    // --- Estilos de Conquistas ---
    achievementsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    achievementItem: {
        backgroundColor: '#e9ecef',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        width: '45%', // Ajuste para 2 colunas
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    achievementIcon: {
        fontSize: 30,
        marginBottom: 5,
    },
    achievementName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#495057',
        marginBottom: 5,
    },
    achievementDescription: {
        fontSize: 12,
        textAlign: 'center',
        color: '#6c757d',
    },

    // --- Estilo do Botão de Excluir ---
    deleteButton: {
        backgroundColor: '#dc3545', // Vermelho para exclusão
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
        width: '100%',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default profileStyles; 