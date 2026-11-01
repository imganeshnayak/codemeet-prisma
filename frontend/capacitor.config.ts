import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.sevaconnect.app",
  appName: "SevaConnect",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
}

export default config
