# Deploy AI Music Web ke Cyclic.sh (GRATIS TANPA CREDIT CARD)

## Cyclic.sh - Platform Gratis Tanpa Credit Card

### Keuntungan Cyclic.sh
✅ 100% GRATIS tanpa credit card  
✅ Auto-deploy dari GitHub  
✅ Custom domains  
✅ SSL certificate otomatis  
✅ Global CDN  
✅ Easy scaling  
✅ No credit card required  

## Langkah Deploy Backend ke Cyclic.sh

### 1. Buka Cyclic.sh
- Kunjungi [cyclic.sh](https://cyclic.sh)
- Sign up dengan GitHub account

### 2. Connect Repository
- Klik "Link Your Own"
- Connect ke GitHub repository: `rahmivinnn/ai-music-web-new`
- Pilih repository

### 3. Konfigurasi Service
- App Name: `ai-music-web-backend`
- Branch: `main`
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

### 4. Environment Variables
Set di Cyclic dashboard:
- NODE_ENV=production
- PORT=3000
- SUNO_API_KEY=sksonauto_Af950HjWjAqgYdswQYXLGoUUwVQp_vjOOiAGuSS2ewzgG_2v
- AUDIO_API_KEY=fb8231ecce1a672bff1fad69509aa1e4

### 5. Deploy
- Klik "Deploy"
- Tunggu build dan deploy (3-5 menit)

## URL Setelah Deploy
- Backend: https://ai-music-web-backend.cyclic.app
- Frontend: https://ai-music-web-frontend.vercel.app