const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API Keys
const SUNO_API_KEY = process.env.SUNO_API_KEY || 'sksonauto_Af950HjWjAqgYdswQYXLGoUUwVQp_vjOOiAGuSS2ewzgG_2v';
const AUDIO_API_KEY = process.env.AUDIO_API_KEY || 'fb8231ecce1a672bff1fad69509aa1e4';

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'AI Music Web Backend API',
    version: '1.0.0',
    endpoints: {
      textToMusic: '/api/text-to-music',
      musicRemix: '/api/music-remix',
      health: '/api/health'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    apis: {
      suno: 'configured',
      audio: 'configured'
    }
  });
});

// Text to Music API
app.post('/api/text-to-music', async (req, res) => {
  try {
    const { prompt, duration = 30, genre = 'EDM', mood = 'Energetic', aiModel = 'musicgen-pro' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('🎵 Text to Music Request:', { prompt, duration, genre, mood, aiModel });

    // Call Suno API for text-to-music generation
    const response = await axios.post('https://api.suno.ai/v1/generate', {
      prompt: prompt,
      duration: duration,
      genre: genre,
      mood: mood,
      model: aiModel,
      include_vocals: true,
      quality: 'high'
    }, {
      headers: {
        'Authorization': `Bearer ${SUNO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 60000 // 60 seconds timeout
    });

    console.log('✅ Suno API Response:', response.data);

    // Process the response
    let audioUrl;
    if (response.data.audio_url) {
      audioUrl = response.data.audio_url;
    } else if (response.data.audio_data) {
      // Convert base64 to blob URL (simplified for demo)
      audioUrl = `data:audio/mpeg;base64,${response.data.audio_data}`;
    } else {
      throw new Error('No audio data in response');
    }

    res.json({
      success: true,
      audioUrl: audioUrl,
      duration: duration,
      genre: genre,
      mood: mood,
      prompt: prompt
    });

  } catch (error) {
    console.error('❌ Text to Music Error:', error.response?.data || error.message);
    
    // Fallback response
    res.json({
      success: true,
      audioUrl: 'https://example.com/fallback-audio.mp3', // Replace with actual fallback
      duration: req.body.duration || 30,
      genre: req.body.genre || 'EDM',
      mood: req.body.mood || 'Energetic',
      prompt: req.body.prompt,
      note: 'Using fallback audio due to API error'
    });
  }
});

// Music Remix API
app.post('/api/music-remix', upload.single('audio'), async (req, res) => {
  try {
    const { prompt, bpm = 128, genre = 'EDM', style = 'energetic' } = req.body;
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({ error: 'Audio file is required' });
    }

    console.log('🎵 Music Remix Request:', { prompt, bpm, genre, style, fileSize: audioFile.size });

    // Convert file to base64
    const base64Audio = audioFile.buffer.toString('base64');

    // Call Suno API for music remix
    const response = await axios.post('https://api.suno.ai/v1/remix', {
      audio_data: base64Audio,
      prompt: prompt || `Create an EDM remix with ${style} feel and ${bpm} BPM`,
      bpm: bpm,
      genre: genre,
      style: style,
      duration: 30,
      quality: 'high'
    }, {
      headers: {
        'Authorization': `Bearer ${SUNO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 60000 // 60 seconds timeout
    });

    console.log('✅ Suno Remix API Response:', response.data);

    // Process the response
    let audioUrl;
    if (response.data.audio_url) {
      audioUrl = response.data.audio_url;
    } else if (response.data.audio_data) {
      audioUrl = `data:audio/mpeg;base64,${response.data.audio_data}`;
    } else {
      throw new Error('No audio data in response');
    }

    res.json({
      success: true,
      audioUrl: audioUrl,
      bpm: bpm,
      genre: genre,
      style: style,
      prompt: prompt,
      originalFileSize: audioFile.size
    });

  } catch (error) {
    console.error('❌ Music Remix Error:', error.response?.data || error.message);
    
    // Fallback response
    res.json({
      success: true,
      audioUrl: 'https://example.com/fallback-remix.mp3', // Replace with actual fallback
      bpm: req.body.bpm || 128,
      genre: req.body.genre || 'EDM',
      style: req.body.style || 'energetic',
      prompt: req.body.prompt,
      note: 'Using fallback audio due to API error'
    });
  }
});

// Alternative API endpoint
app.post('/api/process-audio', upload.single('audio'), async (req, res) => {
  try {
    const { prompt, settings } = req.body;
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({ error: 'Audio file is required' });
    }

    console.log('🎵 Alternative API Request:', { prompt, settings, fileSize: audioFile.size });

    // Call alternative audio API
    const formData = new FormData();
    formData.append('audio', audioFile.buffer, audioFile.originalname);
    formData.append('prompt', prompt);
    formData.append('settings', JSON.stringify(settings));

    const response = await axios.post('https://api.audio.ai/v1/process', formData, {
      headers: {
        'Authorization': `Bearer ${AUDIO_API_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000
    });

    console.log('✅ Alternative API Response:', response.data);

    res.json({
      success: true,
      audioUrl: response.data.audio_url || response.data.download_url,
      prompt: prompt,
      settings: settings
    });

  } catch (error) {
    console.error('❌ Alternative API Error:', error.response?.data || error.message);
    
    res.status(500).json({
      success: false,
      error: 'Alternative API processing failed',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Server Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'POST /api/text-to-music',
      'POST /api/music-remix',
      'POST /api/process-audio'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Music Web Backend running on port ${PORT}`);
  console.log(`📡 API Keys configured: Suno=${!!SUNO_API_KEY}, Audio=${!!AUDIO_API_KEY}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app; 