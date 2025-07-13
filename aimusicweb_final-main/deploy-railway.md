# 🚀 Deploy AI Music Web ke Railway

## **Langkah Deploy Otomatis**

### **1. Install Railway CLI**
```bash
npm install -g @railway/cli
```

### **2. Login ke Railway**
```bash
railway login
```

### **3. Deploy Backend**
```bash
cd backend
railway init
railway up
```

### **4. Set Environment Variables di Railway Dashboard**
- Buka [Railway Dashboard](https://railway.app/dashboard)
- Pilih project backend
- Tambahkan environment variables:
  - `SUNO_API_KEY=sksonauto_Af950HjWjAqgYdswQYXLGoUUwVQp_vjOOiAGuSS2ewzgG_2v`
  - `AUDIO_API_KEY=fb8231ecce1a672bff1fad69509aa1e4`
  - `PORT=3000`

### **5. Deploy Frontend ke Vercel/Netlify**
- Frontend sudah siap untuk di-deploy ke Vercel atau Netlify
- Update `VITE_BACKEND_URL` di environment variables dengan URL backend Railway

## **URL Setelah Deploy**
- **Backend**: `https://ai-music-web-backend.railway.app`
- **Frontend**: `https://ai-music-web-frontend.vercel.app` (atau Netlify)

## **Testing API**
```bash
# Health check
curl https://ai-music-web-backend.railway.app/api/health

# Text to Music
curl -X POST https://ai-music-web-backend.railway.app/api/text-to-music \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Epic EDM drop","genre":"EDM","mood":"Energetic"}'
```

## **Features yang Tersedia**
✅ **Music Remix** - Upload audio + EDM effects  
✅ **Text-to-Song** - Generate EDM with vocals  
✅ **Real API Integration** - Suno API + Alternative API  
✅ **Progress Tracking** - Real-time processing updates  
✅ **Error Handling** - Fallback to demo mode  
✅ **CORS Enabled** - Frontend-backend communication  
✅ **File Upload** - Support up to 50MB audio files  
✅ **Health Monitoring** - Railway health checks 