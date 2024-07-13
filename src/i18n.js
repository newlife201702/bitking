import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 你的语言资源
const resources = {
  en: {
    translation: {
        'menu': 'menu',
        'link wallet': 'link wallet',
        'total network volume': 'total network volume',
        '7-day output': '7-day output',
        'node': 'node',
        'leasing mining': 'leasing mining',
        'pledge mining': 'pledge mining',
        'currency': 'currency',
        'currency cannot be empty': 'currency cannot be empty',
        'select currency': 'select currency',
        'language': 'language',
        'language cannot be empty': 'language cannot be empty',
        'select language': 'select language',
        'number': 'number',
        'pay': 'pay',
        'cancel': 'cancel',
        'pledge': 'pledge',
        'total performance': 'total performance',
        'total commission': 'total commission',
        'withdraw': 'withdraw',
        'platform account': 'platform account',
        'market': 'market',
        'my client': 'my client',
        'customer commission': 'customer commission',
        'integral': 'integral',
        'total acquisition': 'total acquisition',
        'unlocked': 'unlocked',
        'repurchased': 'repurchased',
        'transfer to web3': 'transfer to web3',
        'apply for repurchase': 'apply for repurchase',
        'mining': 'mining',
        'buy': 'buy',
        'airdrop': 'airdrop',
        'total excavation': 'total excavation',
        'to be unlocked': 'to be unlocked',
        'current position': 'current position',
        'position ratio': 'position ratio',
        'account number': 'account number',
        'ranking': 'ranking',
        'position': 'position',
        'voter': 'voter',
        'my invitation code': 'my invitation code',
        'inviter': 'inviter',
        'copy link': 'copy link',
        'copy invitation code': 'copy invitation code',
    }
  },
  zh: {
    translation: {
        'menu': '菜单',
        'link wallet': '链接钱包',
        'total network volume': '全网总量',
        '7-day output': '七日产出',
        'node': '节点',
        'leasing mining': '租赁挖矿',
        'pledge mining': '质押挖矿',
        'currency': '币种',
        'currency cannot be empty': '币种不能为空',
        'select currency': '选择币种',
        'language': '语言',
        'language cannot be empty': '语言不能为空',
        'select language': '选择语言',
        'number': '数量',
        'pay': '支付',
        'cancel': '取消',
        'pledge': '质押',
        'total performance': '总业绩',
        'total commission': '总佣金',
        'withdraw': '提取',
        'platform account': '平台账户',
        'market': '市场',
        'my client': '我的客户',
        'customer commission': '客户佣金',
        'integral': '积分',
        'total acquisition': '总获取',
        'unlocked': '已解锁',
        'repurchased': '已回购',
        'transfer to web3': '划转web3',
        'apply for repurchase': '申请回购',
        'mining': '挖矿',
        'buy': '买入',
        'airdrop': '空投',
        'total excavation': '总挖掘',
        'to be unlocked': '待解锁',
        'current position': '当前持仓',
        'position ratio': '持仓比例',
        'account number': '账号',
        'ranking': '排名',
        'position': '职位',
        'voter': '选民',
        'my invitation code': '我的邀请码',
        'inviter': '邀请我的人',
        'copy link': '复制链接',
        'copy invitation code': '复制邀请码',
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
