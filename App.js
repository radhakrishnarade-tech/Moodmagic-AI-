import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, Share, ActivityIndicator } from 'react-native';

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("ಕನ್ನಡ (Kannada)");
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [generatedStatus, setGeneratedStatus] = useState("ನಿಮ್ಮ ಮ್ಯಾಜಿಕ್ AI ಇಂಟರ್ನೆಟ್ ಸ್ಟೇಟಸ್ ಇಲ್ಲಿ ಮೂಡಿಬರುತ್ತದೆ... ✨");
  const [currentMood, setCurrentMood] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const CHATGPT_API_KEY = "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";
  const START_IO_APP_ID = "206474415";

  const languages = ["English", "ಕನ್ನಡ (Kannada)", "Hindi", "Spanish", "Arabic"];
  
  const moods = [
    { id: 'attitude', label: 'Attitude & Style', icon: '🕶️' },
    { id: 'goal', label: 'Goal & Success', icon: '🏆' },
    { id: 'love', label: 'Love & Romance', icon: '❤️' },
    { id: 'sad', label: 'Breakup & Sad', icon: '💔' },
    { id: 'motivation', label: 'Motivation', icon: '🎯' },
    { id: 'devotion', label: 'Devotion', icon: '🙏' },
    { id: 'fitness', label: 'Fitness & Gym', icon: '💪' },
  ];

  useEffect(() => {
    console.log(`[Start.io] Initialized ID: ${START_IO_APP_ID}`);
  }, []);

  const showFullScreenAd = () => {
    Alert.alert("🎰 Start.io Ad", "ಫುಲ್ ಸ್ಕ್ರೀನ್ ಜಾಹೀರಾತು ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತಿದೆ... (Earnings in $)");
  };

  const generateAIStatus = async (moodLabel) => {
    setCurrentMood(moodLabel);
    setIsLoading(true);
    setGeneratedStatus("MoodMagic AI ಜಾಗತಿಕ ಸರ್ವರ್‌ನೊಂದಿಗೆ ಸಂಪರ್ಕದಲ್ಲಿದೆ... 🪄");

    showFullScreenAd();

    const promptMessage = `Create a unique, highly catchy, and creative social media status or poetry for the mood: "${moodLabel}". The user description/input is: "${inputText}". Write the response strictly in the language: "${selectedLanguage}". Keep it short (1-2 lines) and include 1 relevant emoji and hashtags.`;

    try {
      const response = await fetch("https://openai.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${CHATGPT_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: promptMessage }],
          temperature: 0.7
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setGeneratedStatus(data.choices[0].message.content.trim());
      } else {
        setGeneratedStatus("⚠️ ಕ್ಷಮಿಸಿ, ಕೀ ಸೆಟ್ಟಿಂಗ್ಸ್‌ನಲ್ಲಿ ಸಣ್ಣ ದೋಷವಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.");
      }
    } catch (error) {
      setGeneratedStatus("❌ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕದ ತೊಂದರೆ ಇದೆ. ದಯವಿಟ್ಟು ಸರ್ವರ್ ಮರುಪರಿಶೀಲಿಸಿ.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setInputText("ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ... ನಿಮ್ಮ ಮೂಡ್ ವಿವರ ಹೇಳಿ...🎙️");
      
      setTimeout(() => {
        setInputText("ನನಗೊಂದು ಬೆಂಕಿ ತರ ಇರೋ ಆಟಿಟ್ಯೂಡ್ ಸ್ಟೇಟಸ್ ಬೇಕು");
        setIsRecording(false);
        generateAIStatus('Attitude & Style');
      }, 3000);
    }
  };

  const shareStatus = async () => {
    try {
      await Share.share({ message: generatedStatus });
    } catch (error) {
      Alert.alert("Error", "ಶೇರ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topAdBanner}>
        <Text style={styles.adText}>🎰 Start.io Top Small Banner Ad (Earnings in $)</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>✨ MoodMagic AI ✨</Text>
        <Text style={styles.headerSubtitle}>Instant Global Status Creator</Text>
      </View>

      <ScrollView style={styles.scrollArea}>
        <Text style={styles.sectionTitle}>🌐 SELECT GLOBAL LANGUAGE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.langRow}>
          {languages.map((lang) => (
            <TouchableOpacity 
              key={lang} 
              style={[styles.langChip, selectedLanguage === lang && styles.activeLangChip]}
              onPress={() => setSelectedLanguage(lang)}
            >
              <Text style={[styles.langText, selectedLanguage === lang && styles.activeLangText]}>{lang}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>✍️ DESCRIBE YOUR MOOD OR USE VOICE</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.textInput}
            placeholder="E.g. Write an attitude status for me..."
            placeholderTextColor="#666"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity 
            style={[styles.micButton, isRecording && styles.micButtonActive]} 
            onPress={handleVoiceInput}
          >
            <Text style={styles.micIcon}>{isRecording ? "🛑" : "🎙️"}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>🎭 QUICK MOOD SELECTION</Text>
        <View style={styles.moodGrid}>
          {moods.map((mood) => (
            <TouchableOpacity 
              key={mood.id} 
              style={styles.moodBox} 
              onPress={() => generateAIStatus(mood.label)}
            >
              <Text style={styles.moodIcon}>{mood.icon}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.resultHeading}>🔮 YOUR AI GENERATED STATUS</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#39ff14" style={{ marginVertical: 10 }} />
          ) : (
            <Text style={styles.resultText}>{generatedStatus}</Text>
          )}
          
          <TouchableOpacity style={styles.shareBtn} onPress={shareStatus} disabled={isLoading}>
            <Text style={styles.shareBtnText}>📲 Copy & Share to Status</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.legalBox}>
          <Text style={styles.legalHeading}>⚖️ LEGAL DISCLAIMER / ಬಳಕೆಯ ನಿಯಮಗಳು:</Text>
          <Text style={styles.legalText}>
            MoodMagic AI ಪ್ರದರ್ಶಿಸುವ ಪ್ರತಿಯೊಂದು ಸ್ಟೇಟಸ್ ಅಥವಾ ಶಾಯರಿಯನ್ನು ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ (Generative AI) ತಂತ್ರಜ್ಞಾನ ಬಳಸಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸೃಷ್ಟಿಸಲಾಗುತ್ತದೆ. ಇದು ಕೇವಲ ವೈಯಕ್ತಿಕ ಮನರಂಜನೆ ಮತ್ತು ಸಾಮಾಜಿಕ ಜಾಲತಾಣಗಳ ಬಳಕೆಯ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಮಾತ್ರ ನಿಯೋಜಿತವಾಗಿದೆ. ಯಾವುದೇ ರೀತಿಯ ಕಾಪಿರೈಟ್ ಮತ್ತು ಬ್ರ್ಯಾಂಡ್ ಪಾಲಿಸಿಗಳ ಉಲ್ಲಂಘನೆ ಇರುವುದಿಲ್ಲ.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomAdBanner}>
        <Text style={styles.adText}>🎰 Start.io Bottom Small Banner Ad (Earnings in $)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f0d' },
  topAdBanner: { height: 40, backgroundColor: '#111814', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: '#333' },
  header: { backgroundColor: '#111814', padding: 20, alignItems: 'center', borderBottomWidth: 2, borderColor: '#39ff14' },
  headerTitle: { color: '#39ff14', fontSize: 26, fontWeight: 'bold', textShadowColor: '#39ff14', textShadowRadius: 10 },
  headerSubtitle: { color: '#00ffff', fontSize: 13, marginTop: 5, fontWeight: '600' },
  scrollArea: { flex: 1, padding: 15 },
  sectionTitle: { color: '#00ffff', fontSize: 12, fontWeight: 'bold', marginTop: 20, marginBottom: 10, letterSpacing: 1 },
  langRow: { flexDirection: 'row', marginBottom: 5 },
  langChip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: '#16221c', marginRight: 10, borderWidth: 1, borderColor: '#222' },
  activeLangChip: { backgroundColor: '#39ff14', borderColor: '#39ff14' },
  langText: { color: '#aaa', fontWeight: 'bold' },
  activeLangText: { color: '#000' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16221c', borderRadius: 12, padding: 5, borderWidth: 1, borderColor: '#333' },
  textInput: { flex: 1, color: '#fff', paddingHorizontal: 15, height: 50 },
  micButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#00ffff', justifyContent: 'center', alignItems: 'center' },
  micButtonActive: { backgroundColor: '#ff0055' },
  micIcon: { fontSize: 20, color: '#000' },
  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  moodBox: { width: '48%', backgroundColor: '#111814', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#222' },
  moodIcon: { fontSize: 30, marginBottom: 5 },
  moodLabel: { color: '#fff', fontSize: 13, fontWeight: '600' },
  resultCard: { backgroundColor: '#16221c', padding: 20, borderRadius: 15, marginTop: 15, borderWidth: 1, borderColor: '#39ff14', marginBottom: 15 },
  resultHeading: { color: '#39ff14', fontSize: 12, fontWeight: 'bold', marginBottom: 10 },
  resultText: { color: '#fff', fontSize: 16, lineHeight: 24, fontWeight: '500', fontStyle: 'italic' },
  shareBtn: { backgroundColor: '#39ff14', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  shareBtnText: { color: '#000', fontWeight: 'bold', fontSize: 15 },
  legalBox: { backgroundColor: '#111814', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#333', marginTop: 10, marginBottom: 30 },
  legalHeading: { color: '#00ffff', fontSize: 11, fontWeight: 'bold', marginBottom: 5 },
  legalText: { color: '#777', fontSize: 11, lineHeight: 16, fontWeight: '500' },
bottomAdBanner: { height: 45, backgroundColor: '#111814', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderColor: '#333' },adText: { fontSize: 11, color: '#00ffff', fontWeight: 'bold' }});
