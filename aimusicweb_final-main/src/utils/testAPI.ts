// Test utility for API integration
import { aiService } from '../services/aiService';

export async function testAPIIntegration() {
  console.log('🧪 Testing API Integration...');
  
  try {
    // Test 1: Text to Music
    console.log('🎵 Testing Text to Music API...');
    const textToMusicResult = await aiService.textToMusic(
      'Epic EDM drop with heavy bass and euphoric melodies',
      {
        duration: 30,
        genre: 'EDM',
        mood: 'Energetic',
        aiModel: 'musicgen-pro'
      },
      (progress) => {
        console.log(`Text to Music Progress: ${progress}%`);
      }
    );
    console.log('✅ Text to Music Result:', textToMusicResult);

    // Test 2: Create a dummy audio file for remix test
    const dummyAudioData = new ArrayBuffer(1024);
    const dummyFile = new File([dummyAudioData], 'test-audio.wav', { type: 'audio/wav' });
    
    console.log('🎵 Testing Music Remix API...');
    const remixResult = await aiService.processRemix(
      dummyFile,
      'Create an EDM remix with energetic feel and heavy bass',
      {
        bpm: 128,
        genre: 'EDM',
        style: 'energetic'
      },
      (progress) => {
        console.log(`Remix Progress: ${progress}%`);
      }
    );
    console.log('✅ Remix Result:', remixResult);

    console.log('🎉 All API tests completed successfully!');
    return { success: true, textToMusic: textToMusicResult, remix: remixResult };
    
  } catch (error) {
    console.error('❌ API Test Failed:', error);
    return { success: false, error: error };
  }
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testAPIIntegration = testAPIIntegration;
} 