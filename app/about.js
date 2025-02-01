import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTd-xVu-R3BY6LcX4Y9GqtN-zFlfSq0HE",
  authDomain: "seventeen-89144.firebaseapp.com",
  projectId: "seventeen-89144",
  storageBucket: "seventeen-89144.firebasestorage.app",
  messagingSenderId: "608891305247",
  appId: "1:608891305247:web:6c1860eb518b395ca6442a",
  measurementId: "G-NNK2QB03JF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function AboutScreen() {
  const navigation = useNavigation();
  const [albumData, setAlbumData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
        try {
          const docRef = doc(db, 'AlbumInfo', '5ThkW2zLrysfRjBzSX8n');
          const docSnap = await getDoc(docRef);
      
          if (docSnap.exists()) {
            const data = docSnap.data();
            setAlbumData(data);

          } else {
            console.error('No such document!');
            alert('Album details not found.');
          }
        } catch (error) {
          console.error('Error fetching album details:', error);
          alert('Unable to load album details. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      
    fetchAlbumDetails();
  }, []);

  return (
    <LinearGradient colors={['#FCF579', '#F98937']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          <Text style={styles.albumTitle}>{albumData?.albumName}</Text>
          <Text style={styles.artistText}>{albumData?.artist}</Text>
          <Text style={styles.releaseText}>{albumData?.releaseDate}</Text>

          <View style={styles.cdContainer}>
            <Image source={require('./assets/ftsalbum2.png')} style={styles.cd} />
          </View>

          <Text style={styles.descriptionText}>{'     '}{albumData?.albumDesc}</Text>
        </>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    padding: 20 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '100%', 
    paddingVertical: 10, 
    marginTop: 20,
  },
  backIcon: { 
    width: 24, 
    height: 24, 
    resizeMode: 'contain' 
  },
  separator: { 
    width: '100%', 
    height: 1, 
    backgroundColor: '#F98937', 
    marginBottom: 20, 
  },
  albumTitle: { 
    fontSize: 40, 
    fontWeight: 'bold', 
    color: '#F98937', 
    alignSelf: 'flex-start', 
    marginTop: 10, 
    marginLeft: 20, 
  },
  artistText: { 
    fontSize: 18, 
    color: '#F8F1FF', 
    alignSelf: 'flex-start', 
    marginLeft: 20, 
  },
  cdContainer: { 
    width: 320, 
    height: 256, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  cd: { 
    width: '100%', 
    height: '100%' 
  },
  releaseText: { 
    fontSize: 16, 
    color: '#F8F1FF', 
    marginTop: 5, 
    textAlign: 'center', 
    alignSelf: 'flex-start', 
    marginLeft: 20,
  },
  descriptionText: { 
    fontSize: 14, 
    color: '#EAE5E5', 
    marginTop: 10, 
    textAlign: 'justify',
    textAlignVertical: 'top', 
    lineHeight: 20, // Adjust spacing between lines
    paddingHorizontal: 20, // Adds some space on the sides
  },
});
