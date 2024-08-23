import translations from "../locales/resources";

type ChangeLanguage = 'en' | 'uk';


let currentLanguage: ChangeLanguage = 'uk';

export const setLanguage = (lang: ChangeLanguage) => {
    currentLanguage = lang;
};

export const t = (key: string): string => {
    return translations[currentLanguage][key] || key;
};
