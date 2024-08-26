
import React from 'react';
import { Modal, View, TouchableOpacity, Text, Button } from 'react-native';

const LanguageModal = ({ modalVisible, handleChangeLanguage, t, setModalVisible }: any) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ width: 300, backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <TouchableOpacity onPress={() => handleChangeLanguage('en')}>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>{t('english')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChangeLanguage('uk')}>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>{t('uk')}</Text>
          </TouchableOpacity>
          <Button title={t('cancel')} onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;
