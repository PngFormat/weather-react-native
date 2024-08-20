import { StyleSheet } from 'react-native';

export const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  descTitle: {
    color: '#FFFFFF',            
    fontSize: 28,                 
    fontWeight: 'bold',       
    textShadowColor: '#000000',  
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 4,     
    textAlign: 'center',       
  },
  text: {
    color: '#FFFFFF',            
    fontSize: 28,                 
    fontWeight: 'bold',       
    textShadowColor: '#000000',  
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 4,     
    textAlign: 'center', 
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
    height: '20%',
    marginVertical: 20,
    flex: 1,
  },
  historyItem: {
    borderRadius: 8,
    padding: 10,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#000000',
  },

  listContent: {
    paddingBottom: 20,
  },
  descTitle: {
    color: '#FFFFFF',            
    fontSize: 28,                 
    fontWeight: 'bold',       
    textShadowColor: '#000000',  
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 4,     
    textAlign: 'center', 
  },
  description: {
    width: 300,
    height: 300,
  },
  text: {
    color: '#FFFFFF',            
    fontSize: 28,                 
    fontWeight: 'bold',       
    textShadowColor: '#000000',  
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 4,     
    textAlign: 'center', 
  },
  historyContainer: {
    borderRadius: 20,
    width: '80%',
    height: '20%',
    marginVertical: 20,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#333333',
    color: '#FFFFFF',
    borderRadius: 20,
  },
  historyItem: {
    padding: 10,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    backgroundColor: '#333333',
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
  },
});
