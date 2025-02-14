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
        'ordinary node': 'ordinary node',
        'leasing mining': 'leasing mining',
        'pledge mining': 'pledge mining',
        'purchase mining': 'purchase mining',
        'currency': 'currency',
        'currency cannot be empty': 'currency cannot be empty',
        'select currency': 'select currency',
        'network': 'network',
        'network cannot be empty': 'network cannot be empty',
        'select network': 'select network',
        'number': 'number',
        'pay': 'pay',
        'cancel': 'cancel',
        'pledge': 'pledge',
        'total performance': 'total performance',
        'total commission': 'total commission',
        'withdraw': 'withdraw',
        'withdraw reward': 'withdraw reward',
        'balance': 'balance',
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
        'sell out': 'sell out',
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
        'performance': 'performance',
        'information': 'information',
        'organization': 'organization',
        'invitation code': 'invitation code',
        'success': 'success',
    }
  },
  zh1: {
    translation: {
      'menu': '菜單',
      'link wallet': '鏈接錢包',
      'total network volume': '全網總量',
      '7-day output': '七日產出',
      'ordinary node': '普通節點',
      'leasing mining': '租賃挖礦',
      'pledge mining': '質押挖礦',
      'purchase mining': '購買挖礦',
      'currency': '幣種',
      'currency cannot be empty': '幣種不能為空',
      'select currency': '選擇幣種',
      'network': '網絡',
      'network cannot be empty': '網絡不能為空',
      'select network': '選擇網絡',
      'number': '數量',
      'pay': '支付',
      'cancel': '取消',
      'pledge': '質押',
      'total performance': '總業績',
      'total commission': '總佣金',
      'withdraw': '提取',
      'withdraw reward': '提取獎勵',
      'balance': '餘額',
      'platform account': '平台賬戶',
      'market': '市場',
      'my client': '我的客戶',
      'customer commission': '客戶佣金',
      'integral': '積分',
      'total acquisition': '總獲取',
      'unlocked': '已解鎖',
      'repurchased': '已回購',
      'transfer to web3': '劃轉web3',
      'apply for repurchase': '申請回購',
      'sell out': '賣出',
      'mining': '挖礦',
      'buy': '買入',
      'airdrop': '空投',
      'total excavation': '總挖掘',
      'to be unlocked': '待解鎖',
      'current position': '當前持倉',
      'position ratio': '持倉比例',
      'account number': '賬號',
      'ranking': '排名',
      'position': '職位',
      'voter': '選民',
      'my invitation code': '我的邀請碼',
      'inviter': '邀請我的人',
      'copy link': '複製鏈接',
      'copy invitation code': '複製邀請碼',
      'performance': '業績',
      'information': '信息',
      'organization': '組織',
      'invitation code': '邀請碼',
      'success': '成功'
    }
  },
  zh2: {
    translation: {
        'menu': '菜单',
        'link wallet': '链接钱包',
        'total network volume': '全网总量',
        '7-day output': '七日产出',
        'ordinary node': '普通节点',
        'leasing mining': '租赁挖矿',
        'pledge mining': '质押挖矿',
        'purchase mining': '购买挖矿',
        'currency': '币种',
        'currency cannot be empty': '币种不能为空',
        'select currency': '选择币种',
        'network': '网络',
        'network cannot be empty': '网络不能为空',
        'select network': '选择网络',
        'number': '数量',
        'pay': '支付',
        'cancel': '取消',
        'pledge': '质押',
        'total performance': '总业绩',
        'total commission': '总佣金',
        'withdraw': '提取',
        'withdraw reward': '提取奖励',
        'balance': '余额',
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
        'sell out': '卖出',
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
        'performance': '业绩',
        'information': '信息',
        'organization': '组织',
        'invitation code': '邀请码',
        'success': '成功',
    }
  },
  jp: {
    translation: {
      'menu': 'メニュー',
      'link wallet': 'ウォレットをリンクする',
      'total network volume': 'ネットワーク総量',
      '7-day output': '7日間の出力',
      'ordinary node': '普通ノード',
      'leasing mining': 'リースマイニング',
      'pledge mining': '質入れマイニング',
      'purchase mining': '購入マイニング',
      'currency': '通貨',
      'currency cannot be empty': '通貨は空にできません',
      'select currency': '通貨を選択',
      'network': 'ネットワーク',
      'network cannot be empty': 'ネットワークは空にできません',
      'select network': 'ネットワークを選択',
      'number': '数量',
      'pay': '支払う',
      'cancel': 'キャンセル',
      'pledge': '質入れ',
      'total performance': '総業績',
      'total commission': '総手数料',
      'withdraw': '引き出す',
      'withdraw reward': '報酬の抽出',
      'balance': '残高',
      'platform account': 'プラットフォームアカウント',
      'market': '市場',
      'my client': '私のクライアント',
      'customer commission': '顧客手数料',
      'integral': '積分',
      'total acquisition': '総取得',
      'unlocked': '解除済み',
      'repurchased': '再購入済み',
      'transfer to web3': 'Web3に転送',
      'apply for repurchase': '再購入を申請',
      'sell out': '売り出す',
      'mining': 'マイニング',
      'buy': '購入する',
      'airdrop': 'エアドロップ',
      'total excavation': '総採掘',
      'to be unlocked': '解除待ち',
      'current position': '現在のポジション',
      'position ratio': 'ポジション比率',
      'account number': 'アカウント番号',
      'ranking': 'ランキング',
      'position': 'ポジション',
      'voter': '投票者',
      'my invitation code': '私の招待コード',
      'inviter': '私を招待した人',
      'copy link': 'リンクをコピー',
      'copy invitation code': '招待コードをコピー',
      'performance': '業績',
      'information': '情報',
      'organization': '組織',
      'invitation code': '招待コード',
      'success': '成功'
    }
  },
  kr: {
    translation: {
      'menu': '메뉴',
      'link wallet': '지갑 연결',
      'total network volume': '전체 네트워크 양',
      '7-day output': '7일 출력',
      'ordinary node': '일반 노드',
      'leasing mining': '임대 채굴',
      'pledge mining': '담보 채굴',
      'purchase mining': '구매 채굴',
      'currency': '통화',
      'currency cannot be empty': '통화는 비워둘 수 없습니다',
      'select currency': '통화 선택',
      'network': '네트워크',
      'network cannot be empty': '네트워크는 비워둘 수 없습니다',
      'select network': '네트워크 선택',
      'number': '수량',
      'pay': '지불',
      'cancel': '취소',
      'pledge': '담보',
      'total performance': '총 실적',
      'total commission': '총 수수료',
      'withdraw': '출금',
      'withdraw reward': '보상 추출',
      'balance': '잔액',
      'platform account': '플랫폼 계정',
      'market': '시장',
      'my client': '내 고객',
      'customer commission': '고객 수수료',
      'integral': '적립금',
      'total acquisition': '총 획득',
      'unlocked': '잠금 해제됨',
      'repurchased': '재매입됨',
      'transfer to web3': 'web3로 전송',
      'apply for repurchase': '재매입 신청',
      'sell out': '매도',
      'mining': '채굴',
      'buy': '구매',
      'airdrop': '에어드롭',
      'total excavation': '총 채굴량',
      'to be unlocked': '잠금 해제 대기 중',
      'current position': '현재 보유량',
      'position ratio': '보유 비율',
      'account number': '계좌 번호',
      'ranking': '순위',
      'position': '직위',
      'voter': '투표자',
      'my invitation code': '내 초대 코드',
      'inviter': '초대한 사람',
      'copy link': '링크 복사',
      'copy invitation code': '초대 코드 복사',
      'performance': '실적',
      'information': '정보',
      'organization': '조직',
      'invitation code': '초대 코드',
      'success': '성공'
    }
  }
};

i18n
  .use(initReactI18next) // 如果你使用React
  .init({
    resources,
    lng: "zh2", // 默认语言
    fallbackLng: "zh2",
    interpolation: {
      escapeValue: false // react已经安全处理
    }
  });

export default i18n;
