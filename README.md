# Awaaz - Bring the Change with Your Voice 

![Awaaz Logo](./public/assets/logo.jpeg)

Your voice has the power to spark change. Awaaz empowers individuals and communities to take action on issues that matter. With this, you can mobilize support, raise awareness, and influence decision-makers.

## Tech Stack 🛠️

- **Frontend & Backend**: Next.js
- **Database**: Firebase (Firestore)
- **OTP Verification**: Fast2SMS service
- **UI Components**: Preline UI
- **Animations**: Framer Motion
- **Graphs & Charts**: Recharts.js
- **CDN & Image Optimization**: Imagekit.io
- **AI Petition Generation**: Using Gemini AI api


## Key Features ✨

1. **Drag-and-Drop Petition Builder** 🖱️: A sleek UI that allows users to create petitions visually, add images/videos, and format text easily.
2. **Secure Authentication & Verification** 🔐: Users sign petitions via OAuth (Google/GitHub) and OTP.
3. **Real-Time Signature Updates** 📈: Display live petition updates using WebSockets.
4. **Interactive Petition Analytics** 📊: A dashboard with dynamic charts & maps (Recharts/D3.js) to show growth trends, demographics, and engagement heatmaps.
5. **Social Media API Integration** 📱: Allow users to share petitions directly to Twitter, LinkedIn, and WhatsApp using meta tags and Open Graph for rich previews.
6. **Geolocation-Based Petitions** 🌍: Only allow users in relevant regions to sign petitions based on their IP address or GPS location (HTML5 Geolocation API).
7. **Role-Based Access Control (RBAC)** 🛡️: Different user roles: Petition Creators, Signers, Moderators, and Government/NGO Officials with custom dashboards.
8. **Server-Side Rendering (SSR) & SEO Optimization** ⚡: Ensures fast load times and improved search engine rankings.
9. **Automated AI Petition Generator** ⚡: To automatically generate an entire petition for you with just a prompt

## Getting Started 🚀

To get a local copy up and running follow these simple steps:

### Prerequisites 📋

- Make sure you have npm installed on your local machine.

### Installation 🔧

1. Clone the repo
   ```sh
   git clone https://github.com/hazraChandrima/awaaz.git
   cd awaaz/
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the development server
   ```sh
   npm run dev
   ```


## Setting Up Environment Variables 🔑

Create a `.env.local` file in the root directory and add the following environment variables:

```sh
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTHDOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECTID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

NEXT_PUBLIC_FAST2SMS_API_KEY=your_fast2sms_api_key
```


## 💻 Contributors

- [Chandrima Hazra](https://github.com/hazraChandrima)
- [Sonu Hansda](https://github.com/Sonu-Hansda)
- [Hemanvitha Pullela](https://github.com/hemanvithapullela0456)
- [Avani Gupta](https://github.com/guptaavani111)
