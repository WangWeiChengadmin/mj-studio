interface Window {
  electronAPI?: {
    selectFolder: () => Promise<string | undefined>
    getPaths: () => Promise<{ userData: string; uploads: string }>
  }
}
