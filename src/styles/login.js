import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA', // Azul claro de fundo
    padding: 20,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 150, // Ajuste conforme o tamanho da sua logo
    height: 150, // Ajuste conforme o tamanho da sua logo
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 28, // Fonte maior
    fontWeight: 'bold',
    color: '#00796B', // Verde escuro para o título
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#FFFFFF', // Fundo branco para os inputs
    borderRadius: 10, // Bordas arredondadas
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15, // Espaço entre os inputs
    borderWidth: 1, // Borda padrão
    borderColor: '#B0BEC5', // Cor da borda padrão
  },
  inputError: {
    borderColor: '#EF5350', // Borda vermelha em caso de erro
  },
  errorText: {
    color: '#EF5350', // Texto de erro vermelho
    fontSize: 12,
    marginBottom: 10, // Espaço após o erro
    textAlign: 'left',
    width: '90%',
  },
  button: { // Estilo base para os botões TouchableOpacity
    width: '90%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8, // Espaçamento vertical entre os botões
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  primaryButton: {
    backgroundColor: '#00796B', // Cor principal do botão
  },
  secondaryButton: {
    backgroundColor: '#4DD0E1', // Cor do botão secundário
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});