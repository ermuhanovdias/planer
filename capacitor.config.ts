import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.planer.app',
  appName: 'planer',
  webDir: 'dist/client',
  server: {
    url: 'https://planer.ermuhanovdias.workers.dev/',
    androidScheme: 'https',
    iosScheme: 'https'
  },
  plugins: {
      EdgeToEdge: {
      backgroundColor: '#000000'
      },
    },
  };

  export default config;
