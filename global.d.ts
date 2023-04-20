declare global {
    interface Window {
        __API__: {
            getScreenList: () => Promise<Electron.DesktopCapturerSource[]>
        }
    }
}
