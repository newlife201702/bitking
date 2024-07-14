import { Flex } from 'antd';
import { Card, Button } from 'antd-mobile';
import './index.css';
import { useTranslation } from 'react-i18next';
import '../../i18n'; // 引入i18n配置
import axios from 'axios';

function MoneyList(props) {
    const { t } = useTranslation();
    const { cardAmt, cardList } = props;

    const withdraw = () => {
        axios.post('https://www.bitking.world/h5api/witherdrawb', {
            uid: '000002',
            address: '0xc678ujfr567uijgty7890plkjhu8o',
            amt:1000
        })
        .then(function (response) {
            const data = response.data;
            if (data.code === 1) {
                console.log('data', data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <div className="money-list-container">
            <div className="card-container">
                {cardList.map(item => (
                    <Card className="card">
                        <Flex justify="space-between" align="center">
                            <span>{item[0]}</span>
                            <span>{item[1]}</span>
                            <span>{item[2]}</span>
                        </Flex>
                    </Card>
                ))}
            </div>
            <Flex justify="space-between" align="center" className="withdraw-container">
                <Flex justify="space-between" align="center" className="money-container">
                    <div>
                        <p>{t('total performance')}</p>
                        <p><span>{cardAmt.a1}</span> | <span>{cardAmt.a2}</span></p>
                    </div>
                    <div>
                        <p>{t('total commission')}</p>
                        <p><span>{cardAmt.b1}</span> | <span>{cardAmt.b2}</span></p>
                    </div>
                </Flex>
                <Button color="primary" fill="solid" shape="rounded" className="withdraw" onClick={withdraw}>{t('withdraw')}</Button>
            </Flex>
        </div>
    );
}

export default MoneyList;
