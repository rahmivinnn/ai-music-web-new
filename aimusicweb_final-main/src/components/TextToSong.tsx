import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import AudioPlayer from './AudioPlayer';

const TextToSong: React.FC = () => {
  const { addTrack, user, useCredit } = useStore();
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('EDM');
  const [mood, setMood] = useState('Energetic');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mixing, setMixing] = useState(false);
  const [mixProgress, setMixProgress] = useState(0);
  const [mixedUrl, setMixedUrl] = useState<string | null>(null);
  const [showSubModal, setShowSubModal] = useState(false);
  
  const isWordLimitExceeded = (text: string): boolean => {
    const wordCount = text.trim().split(/\s+/).length;
    return wordCount > 100;
  };

  const handleError = (error: unknown, defaultMessage = 'An error occurred'): void => {
    const message = error instanceof Error ? error.message : defaultMessage;
    toast.error(message, {
      style: { background: '#ff4444', color: '#fff' },
      duration: 5000
    });
    console.error(error);
  };

  // Smart Prompt Examples - EDM Focus
  const smartPrompts = [
    "Heavy EDM drop with jedag-jedug bass and aggressive synths",
    "Futuristic EDM anthem with pounding kicks and laser effects",
    "Epic EDM build-up with massive risers and explosive drops",
    "Dark EDM track with deep sub-bass and industrial sounds",
    "Uplifting EDM with euphoric melodies and powerful bass",
    "Progressive EDM with evolving synths and punchy drums",
    "Tropical EDM with summer vibes and heavy bass drops",
    "Melodic EDM with emotional leads and thumping kicks",
    "Hardstyle EDM with distorted kicks and aggressive energy",
    "Trance EDM with long builds and massive breakdowns",
    "House EDM with groovy basslines and club-ready beats",
    "Dubstep EDM with wobbly bass and heavy drops",
    "Future bass EDM with vocal chops and melodic drops",
    "Trap EDM with 808s and hi-hat rolls",
    "Electro EDM with robotic sounds and heavy kicks",
    "Big room EDM with festival energy and massive drops",
    "Progressive house EDM with smooth transitions",
    "Tech house EDM with minimal beats and deep bass",
    "Bass house EDM with heavy low-end and groovy rhythms",
    "Melodic dubstep EDM with emotional drops",
    "Hard dance EDM with aggressive kicks and energy",
    "Eurodance EDM with classic vibes and modern production",
    "Breaks EDM with broken beats and heavy bass",
    "Drumstep EDM with fast drums and melodic elements",
    "Glitch hop EDM with chopped beats and heavy bass",
    "Neurofunk EDM with complex rhythms and deep bass",
    "Liquid DnB EDM with smooth flows and heavy drops",
    "Jump up EDM with bouncy bass and energetic beats",
    "Crossbreed EDM with mixed genres and heavy energy",
    "Gabber EDM with extreme kicks and aggressive style",
    "Happy hardcore EDM with uplifting melodies",
    "UK hardcore EDM with British energy and heavy bass",
    "Freeform EDM with experimental sounds and heavy drops",
    "Speedcore EDM with ultra-fast beats and extreme energy",
    "Extratone EDM with maximum speed and heavy distortion",
    "Industrial EDM with mechanical sounds and heavy bass",
    "Cyberpunk EDM with futuristic vibes and aggressive drops",
    "Neon EDM with bright synths and heavy bass",
    "Retrowave EDM with 80s vibes and modern production",
    "Synthwave EDM with analog sounds and heavy kicks",
    "Vaporwave EDM with dreamy textures and heavy bass",
    "Chillwave EDM with relaxed vibes and deep bass",
    "Future garage EDM with atmospheric sounds and heavy drops",
    "UK garage EDM with British style and heavy bass",
    "Speed garage EDM with fast beats and heavy energy",
    "2-step EDM with broken rhythms and heavy bass",
    "Grime EDM with urban vibes and heavy drops",
    "Dub EDM with reggae influence and heavy bass",
    "Jungle EDM with breakbeats and heavy sub-bass",
    "Ragga jungle EDM with reggae vocals and heavy energy",
    "Drum and bass EDM with fast drums and heavy bass",
    "Liquid funk EDM with smooth flows and heavy drops",
    "Neurofunk EDM with complex rhythms and deep bass",
    "Jump up EDM with bouncy bass and energetic beats",
    "Crossbreed EDM with mixed genres and heavy energy"
  ];

  const handleGenerateTrack = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description for your song');
      return;
    }

    if (isWordLimitExceeded(prompt)) {
      toast.error('Please keep your description under 100 words');
      return;
    }

    setIsLoading(true);
    setMixing(true);
    setProgress(0);
    setMixProgress(0);
    setMixedUrl(null);

    try {
      // Use real AI service for text-to-music generation
      const { aiService } = await import('../services/aiService');
      
      const settings = {
        duration: 30, // 30 seconds
        genre: genre,
        mood: mood,
        aiModel: 'musicgen-pro'
      };

      // Generate music with vocals using real API
      const generatedAudioUrl = await aiService.textToMusic(prompt, settings, (progress) => {
        setProgress(progress);
      });

      // Add to track history
      const trackId = uuidv4();
      addTrack({
        id: trackId,
        title: `Generated: ${prompt.substring(0, 30)}...`,
        artist: 'AI Generated',
        duration: 30,
        url: generatedAudioUrl,
        genre: genre,
        mood: mood,
        createdAt: new Date().toISOString(),
        type: 'generated'
      });

      setMixedUrl(generatedAudioUrl);
      toast.success('🎵 EDM with vocals generated successfully!');
      
    } catch (error) {
      handleError(error, 'Failed to generate music. Please try again.');
    } finally {
      setIsLoading(false);
      setMixing(false);
    }
  };

  const handleSmartPrompt = (smartPrompt: string) => {
    setPrompt(smartPrompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-850 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-cyan-400" />
            Text to Song
            <Sparkles className="text-cyan-400" />
          </h1>
          <p className="text-gray-300 text-lg">
            Transform your ideas into EDM tracks with AI-generated vocals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prompt Input */}
            <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
              <label className="block text-white font-semibold mb-3">
                Describe your EDM track
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the EDM track you want to create... (e.g., 'Epic EDM drop with heavy bass and euphoric melodies')"
                className="w-full h-32 bg-dark-700 border border-dark-600 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-400">
                  {prompt.trim().split(/\s+/).length}/100 words
                </span>
                {isWordLimitExceeded(prompt) && (
                  <span className="text-red-400 text-sm">Word limit exceeded</span>
                )}
              </div>
            </div>

            {/* Settings */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
                <label className="block text-white font-semibold mb-3">Genre</label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                >
                  <option value="EDM">EDM</option>
                  <option value="House">House</option>
                  <option value="Techno">Techno</option>
                  <option value="Trance">Trance</option>
                  <option value="Dubstep">Dubstep</option>
                  <option value="Trap">Trap</option>
                  <option value="Future Bass">Future Bass</option>
                  <option value="Progressive House">Progressive House</option>
                  <option value="Hardstyle">Hardstyle</option>
                  <option value="Drum & Bass">Drum & Bass</option>
                </select>
              </div>

              <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
                <label className="block text-white font-semibold mb-3">Mood</label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                >
                  <option value="Energetic">Energetic</option>
                  <option value="Chill">Chill</option>
                  <option value="Uplifting">Uplifting</option>
                  <option value="Dark">Dark</option>
                  <option value="Aggressive">Aggressive</option>
                  <option value="Peaceful">Peaceful</option>
                  <option value="Epic">Epic</option>
                  <option value="Ambient">Ambient</option>
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateTrack}
              disabled={isLoading || !prompt.trim() || isWordLimitExceeded(prompt)}
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Generating EDM with vocals... ({progress}%)
                </div>
              ) : (
                '🎵 Generate EDM with Vocals'
              )}
            </button>
          </div>

          {/* Smart Prompts Sidebar */}
          <div className="space-y-6">
            <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
              <h3 className="text-white font-semibold mb-4">Smart Prompts</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                {smartPrompts.map((smartPrompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSmartPrompt(smartPrompt)}
                    className="w-full text-left p-3 bg-dark-700 hover:bg-dark-600 rounded-lg text-sm text-gray-300 hover:text-white transition-colors border border-transparent hover:border-cyan-500"
                  >
                    {smartPrompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Generated Audio Player */}
        {mixedUrl && (
          <div className="mt-8 bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h3 className="text-white font-semibold mb-4">Generated Track</h3>
            <AudioPlayer
              audioUrl={mixedUrl}
              title={`Generated EDM - ${genre} ${mood}`}
              artist="AI Generated"
              showWaveform={true}
            />
          </div>
        )}

        {/* Progress Bar */}
        {isLoading && (
          <div className="mt-6 bg-dark-800 rounded-xl p-6 border border-dark-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Generating your EDM track...</span>
              <span className="text-cyan-400">{progress}%</span>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToSong;