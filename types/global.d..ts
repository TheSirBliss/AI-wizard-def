// FILE: types/global.d.ts
export {};

declare global {
  interface Window {
    // Dichiariamo che 'window' può avere una proprietà 'google' di tipo 'any'
    google: any;
    // Dichiariamo anche la funzione di inizializzazione che creiamo
    googleTranslateElementInit: () => void;
  }
}