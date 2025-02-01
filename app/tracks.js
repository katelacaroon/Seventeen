import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import YouTubeIframe from 'react-native-youtube-iframe';

const Tracks = ({ navigation }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingTrack, setPlayingTrack] = useState(null); // Store the currently playing track
  const [videoId, setVideoId] = useState(null); // Store the YouTube video ID

  const API_KEY = 'ed52bb182043fa96043bcaaa2f38d451';  
  const BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          method: 'album.getInfo',
          artist: 'SEVENTEEN',
          album: 'Face the Sun',
          api_key: API_KEY,
          format: 'json',
        },
      });

      if (response.data.album && response.data.album.tracks) {
        setTracks(response.data.album.tracks.track);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tracks from Last.fm:', error);
      setLoading(false);
    }
  };

  const handlePlay = async (track) => {
    if (playingTrack === track.name) {
      // If the same track is clicked again, stop playback
      setPlayingTrack(null);
      setVideoId(null);
    } else {
      // Fetch YouTube video URL
      const trackURL = await getTrackURL(track.name, 'SEVENTEEN');
      if (trackURL) {
        setPlayingTrack(track.name);
        setVideoId(trackURL);
      } else {
        Alert.alert("Track not found", "Unable to find the track to play.");
      }
    }
  };

  const getTrackURL = async (trackName, artistName) => {
    try {
      const searchQuery = `${trackName} ${artistName}`;
      const youtubeSearchURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&key=AIzaSyAc0mDpCzUnGZI-7zX-u7cly8Hk3EuVTjg`;

      const response = await axios.get(youtubeSearchURL);

      if (response.data.items && response.data.items.length > 0) {
        return response.data.items[0].id.videoId; // Return only the video ID
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching track URL:", error);
      return null;
    }
  };

  return (
    <LinearGradient colors={["#FCF579", "#F98937"]} style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
          <Image source={require('./assets/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Tracks</Text>
      </View>

      <View style={styles.separatorLine} />

      {videoId && (
        <View style={{ height: 0, width: 0, }}>
          <YouTubeIframe
            videoId={videoId}
            height={200}
            play={true}
            onChangeState={(event) => {
              if (event === "ended") {
                setPlayingTrack(null);
                setVideoId(null);
              }
            }}
          />
        </View>
      )}

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={tracks}
          renderItem={({ item }) => (
            <View style={styles.trackContainer}>
              <Text style={styles.trackText}>{item.name}</Text>
              <TouchableOpacity onPress={() => handlePlay(item)}>
                <Image
                  source={playingTrack === item.name ? require('./assets/stop.png') : require('./assets/play.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    flex: 1, // Takes up all available space between the icons
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F98937',
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#F98937',
    marginBottom: 20,
  },
  trackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
  },
  trackText: {
    fontSize: 18,
    color: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 100,
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Tracks;
