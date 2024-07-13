import { Flex } from 'antd';
import { Card, Button } from 'antd-mobile';
import './index.css';
import { useTranslation } from 'react-i18next';
import '../../i18n'; // 引入i18n配置

function MoneyList(props) {
    const { t } = useTranslation();
    const cardList = props.cardList;

    return (
        <div className="money-list-container">
            <div className="card-container">
                {cardList.map(item => (
                    <Card className="card">
                        测试
                    </Card>
                ))}
            </div>
            <Flex justify="space-between" align="center" className="withdraw-container">
                <Flex justify="space-between" align="center" className="money-container">
                    <div>
                        <p>{t('total performance')}</p>
                        <p>000</p>
                    </div>
                    <div>
                        <p>{t('total commission')}</p>
                        <p>000</p>
                    </div>
                </Flex>
                <Button color="primary" fill="solid" shape="rounded" className="withdraw">{t('withdraw')}</Button>
            </Flex>
        </div>
    );
}

export default MoneyList;
