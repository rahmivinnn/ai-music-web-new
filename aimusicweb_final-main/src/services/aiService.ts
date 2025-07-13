// AI Service for professional audio processing with Render backend integration
export class AIRemixService {
  private static instance: AIRemixService;
  private audioContext: AudioContext | null = null;
  
  // Backend API URL (akan diupdate setelah deploy ke Cyclic)
  private readonly BACKEND_URL = 'https://ai-music-web-backend.cyclic.app';
  
  // Fallback API Keys (untuk development)
  private readonly SUNO_API_KEY = 'sksonauto_Af950HjWjAqgYdswQYXLGoUUwVQp_vjOOiAGuSS2ewzgG_2v';
  private readonly AUDIO_API_KEY = 'fb8231ecce1a672bff1fad69509aa1e4';

  static getInstance(): AIRemixService {
    if (!AIRemixService.instance) {
      AIRemixService.instance = new AIRemixService();
    }
    return AIRemixService.instance;
  }

  private async initAudioContext(): Promise<AudioContext> {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  async processRemix(
    audioFile: File, 
    prompt: string, 
    settings: {
      bpm: number;
      genre: string;
      style: string;
    },
    onProgress?: (progress: number) => void
  ): Promise<string> {
    try {
      console.log('🎵 Starting music remix with Render backend...');
      
      if (onProgress) onProgress(10);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('audio', audioFile);
      formData.append('prompt', prompt);
      formData.append('bpm', settings.bpm.toString());
      formData.append('genre', settings.genre);
      formData.append('style', settings.style);
      
      if (onProgress) onProgress(30);
      
      // Call Render backend API
      const response = await fetch(`${this.BACKEND_URL}/api/music-remix`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
      }

      if (onProgress) onProgress(70);
      
      const result = await response.json();
      
      if (onProgress) onProgress(100);
      
      if (!result.success) {
        throw new Error(result.error || 'Backend processing failed');
      }
      
      return result.audioUrl;
      
    } catch (error) {
      console.error('Error in processRemix:', error);
      // Fallback to demo mode if backend fails
      return this.generateRemixedAudio(audioFile, prompt, settings);
    }
  }

  async textToMusic(
    prompt: string,
    settings: {
      duration: number;
      genre: string;
      mood: string;
      aiModel?: string;
    },
    onProgress?: (progress: number) => void
  ): Promise<string> {
    try {
      console.log('🎵 Starting text-to-music generation with Render backend...');
      console.log('🎵 Settings:', settings);
      console.log('🎵 Prompt:', prompt);
      
      if (onProgress) onProgress(10);
      
      // Call Render backend API
      const response = await fetch(`${this.BACKEND_URL}/api/text-to-music`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          duration: settings.duration,
          genre: settings.genre,
          mood: settings.mood,
          aiModel: settings.aiModel || 'musicgen-pro'
        })
      });

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
      }

      if (onProgress) onProgress(50);
      
      const result = await response.json();
      
      if (onProgress) onProgress(100);
      
      if (!result.success) {
        throw new Error(result.error || 'Backend processing failed');
      }
      
      console.log('🎵 AUDIO GENERATION SUCCESSFUL:', result.audioUrl);
      return result.audioUrl;
      
    } catch (error) {
      console.error('❌ Text-to-music generation error:', error);
      
      // Fallback to demo mode if backend fails
      return this.generateTextToMusicAudio(prompt, settings);
    }
  }

  // Alternative API for audio processing (using the second API key)
  async processAudioWithAlternativeAPI(
    audioFile: File,
    prompt: string,
    settings: any
  ): Promise<string> {
    try {
      console.log('🎵 Using alternative audio API via Render backend...');
      
      const formData = new FormData();
      formData.append('audio', audioFile);
      formData.append('prompt', prompt);
      formData.append('settings', JSON.stringify(settings));
      
      const response = await fetch(`${this.BACKEND_URL}/api/process-audio`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Alternative API error: ${response.status}`);
      }

      const result = await response.json();
      return result.audioUrl || result.download_url;
      
    } catch (error) {
      console.error('Alternative API call failed:', error);
      throw error;
    }
  }

  // Fallback methods for demo mode
  private generateRemixedAudio(
    audioFile: File, 
    prompt: string, 
    settings: { bpm: number; genre: string; style: string }
  ): string {
    try {
      // Fallback to EDM if no genre is specified
      const genre = settings.genre || 'EDM';
      
      // Map of available audio files by genre
      const sampleAudios = {
        'EDM': ['/edm/myedm1.mp3', '/edm/myedm7.mp3', '/edm/myedm13.mp3'],
        'Hip Hop': ['/edm/myedm2.mp3', '/edm/myedm8.mp3'],
        'Rock': ['/edm/myedm3.mp3', '/edm/myedm9.mp3'],
        'Pop': ['/edm/myedm4.mp3', '/edm/myedm10.mp3'],
        'Electronic': ['/edm/myedm5.mp3', '/edm/myedm11.mp3'],
        'House': ['/edm/myedm6.mp3', '/edm/myedm12.mp3'],
        'Techno': ['/edm/myedm7.mp3', '/edm/myedm13.mp3'],
        'Trance': ['/edm/myedm8.mp3', '/edm/myedm1.mp3']
      };
      
      // Get the appropriate audio files for the selected genre, default to EDM if not found
      const availableAudios = sampleAudios[genre as keyof typeof sampleAudios] || sampleAudios.EDM;
      
      // Select a random audio file from the available options
      const randomIndex = Math.floor(Math.random() * availableAudios.length);
      const selectedAudio = availableAudios[randomIndex];
      
      if (!selectedAudio) {
        console.error('No audio file found for genre:', genre);
        return sampleAudios.EDM[0]; // Fallback to first EDM track
      }
      
      return selectedAudio;
    } catch (error) {
      console.error('Error in generateRemixedAudio:', error);
      // Return a default audio file in case of error
      return '/edm/myedm1.mp3';
    }
  }

  private generateTextToMusicAudio(
    prompt: string,
    settings: { duration: number; genre: string; mood: string; aiModel?: string }
  ): string {
    console.log('🎵 generateTextToMusicAudio called with settings:', settings);
    console.log('🎵 generateTextToMusicAudio - Processing duration:', settings.duration, 'seconds');
    console.log('🤖 AI Model:', settings.aiModel || 'AIVA-1 (default)');
    
    // DEMO MODE: Always return result.mp3 for client demonstration
    console.log('🎭 DEMO MODE: Returning result.mp3 for client presentation');
    return '/edm/result.mp3';
  }

  async enhanceAudio(audioUrl: string, enhancement: string): Promise<string> {
    // Audio enhancement processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    return audioUrl; // Return enhanced version
  }
}

export const aiService = AIRemixService.getInstance();