import { StyleSheet } from 'react-native';

export const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',     
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 20,
  },
  description: {
    width: 300,
    height: 300,
    marginBottom: 20,     
  },
  descTitle: {
    color: '#000000',            
    fontSize: 28,                 
    fontWeight: 'bold',       
    textShadowColor: '#FFFFFF',  
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 4,     
    textAlign: 'center',       
    marginBottom: 20,      
  },
  text: {
    color: '#000000',            
    fontSize: 18,                 
    fontWeight: 'bold',       
    textAlign: 'center',
    marginBottom: 20,       
  },
  input: {
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,        
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    borderRadius: 20,
  },
  historyContainer: {
    borderRadius: 20,
    width: '80%',
    marginVertical: 20,        
    flex: 1,
  },
  historyItem: {
    borderRadius: 8,
    padding: 10,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,          
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,         
  },
  icon: {
    width: 50,
    height: 50,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#03c2fc',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',     
    padding: 24,
    backgroundColor: '#000000',
  },
  listContent: {
    paddingBottom: 20,
  },
  description: {
    width: 300,
    height: 300,
    marginBottom: 20,         
  },
  descTitle: {
    color: '#FFFFFF',            
    fontSize: 28,                 
    fontWeight: 'bold',       
    textShadowColor: '#000000',  
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 4,     
    textAlign: 'center',       
    marginBottom: 20,          // Отступ снизу
  },
  text: {
    color: '#FFFFFF',            
    fontSize: 18,                 
    fontWeight: 'bold',       
    textAlign: 'center',
    marginBottom: 20,          // Отступ снизу
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,          // Отступ снизу
    paddingHorizontal: 10,
    backgroundColor: '#333333',
    color: '#FFFFFF',
    borderRadius: 20,
  },
  historyContainer: {
    borderRadius: 20,
    width: '80%',
    marginVertical: 20,        // Вертикальные отступы
    flex: 1,
  },
  historyItem: {
    padding: 10,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    backgroundColor: '#333333',
    marginBottom: 10,          // Отступ между элементами истории
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,          // Отступ снизу
  },
  icon: {
    width: 50,
    height: 50,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0b5fa5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
