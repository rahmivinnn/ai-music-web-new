# 🚀 Deploy AI Music Web ke Render.com (GRATIS)

## **Langkah Deploy Otomatis**

### **1. Buka Render.com**
- Kunjungi [render.com](https://render.com)
- Sign up dengan GitHub account

### **2. Connect Repository**
- Klik "New +" → "Web Service"
- Connect ke GitHub repository: `rahmivinnn/ai-music-web-new`
- Pilih repository

### **3. Konfigurasi Service**
- **Name**: `ai-music-web-backend`
- **Environment**: `Node`
- **Region**: `Singapore` (terdekat dengan Indonesia)
- **Branch**: `main`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`

### **4. Environment Variables**
Render akan otomatis menggunakan `render.yaml`, tapi bisa juga set manual:
- `NODE_ENV=production`
- `PORT=10000`
- `SUNO_API_KEY=sksonauto_Af950HjWjAqgYdswQYXLGoUUwVQp_vjOOiAGuSS2ewzgG_2v`
- `AUDIO_API_KEY=fb8231ecce1a672bff1fad69509aa1e4`

### **5. Deploy**
- Klik "Create Web Service"
- Tunggu build dan deploy (5-10 menit)

### **6. Deploy Frontend ke Vercel**
- Buka [vercel.com](https://vercel.com)
- Import repository: `rahmivinnn/ai-music-web-new`
- Set environment variable: `VITE_BACKEND_URL=https://[RENDER-BACKEND-URL]`

## **URL Setelah Deploy**
- **Backend**: `https://ai-music-web-backend.onrender.com`
- **Frontend**: `https://ai-music-web-frontend.vercel.app`

## **Testing API**
```bash
# Health check
curl https://ai-music-web-backend.onrender.com/api/health

# Text to Music
curl -X POST https://ai-music-web-backend.onrender.com/api/text-to-music \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Epic EDM drop","genre":"EDM","mood":"Energetic"}'
```

## **Keuntungan Render.com**
✅ **GRATIS** - 750 jam/bulan  
✅ **Auto-deploy** dari GitHub  
✅ **Custom domains**  
✅ **SSL certificate** otomatis  
✅ **Global CDN**  
✅ **Easy scaling**  

## **Features yang Tersedia**
✅ **Music Remix** - Upload audio + EDM effects  
✅ **Text-to-Song** - Generate EDM with vocals  
✅ **Real API Integration** - Suno API + Alternative API  
✅ **Progress Tracking** - Real-time processing updates  
✅ **Error Handling** - Fallback to demo mode  
✅ **CORS Enabled** - Frontend-backend communication  
✅ **File Upload** - Support up to 50MB audio files  
✅ **Health Monitoring** - Render health checks 