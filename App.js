import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';

export default function App() {
  const [contact, setContact] = useState({});

const getContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync(); //kysyy lupaa kameran käyttööna
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync(
      { fields: [Contacts.Fields.PhoneNumbers] }
    );
    if (data.length > 0) {
      setContact(data); //data[0] näyttää vain ensimmäisen yhteystiedon
    }
  }
}
  return (
    <View style={styles.container}>
    <FlatList
      data={contact}
      renderItem={({ item }) => (
        <View>
          <Text>{item.name}</Text>
          {item.phoneNumbers && item.phoneNumbers.length > 0 && ( // tarkistetaan onko phoneNumbers-kenttä olemassa ja onko siinä vähintään yksi puhelinnumero.
          <Text>{item.phoneNumbers[0].number}</Text> // mikäli ehto täyttyy, näytetään ensimmäinen puhelinnumero
           )}
        </View>
      )}
          />
    <Button title="Get Contact" onPress={getContacts} />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    padding: 150,
  },
  
});
