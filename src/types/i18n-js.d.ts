declare module 'i18n-js' {
    interface I18n {
      t(key: string, options?: any): string;
      locale: string;
      fallbacks: boolean;
      translations: any;
    }
  
    const i18n: I18n;
  
    export default i18n;
  }
  