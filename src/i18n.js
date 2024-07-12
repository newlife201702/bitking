import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 你的语言资源
const resources = {
  en: {
    translation: {
        'menu': 'menu',
        'withdraw': 'withdraw',
    }
  },
  zh: {
    translation: {
        'menu': '菜单',
        'withdraw': '提现',
    }
  }
};

i18n
  .use(initReactI18next) // 如果你使用React
  .init({
    resources,
    lng: "zh", // 默认语言
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react已经安全处理
    }
  });

export default i18n;
