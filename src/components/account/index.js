import { useEffect, useState } from 'react';
import { ConfigProvider, Flex, Radio } from 'antd';
import { Button, Divider } from 'antd-mobile';
import { useTranslation } from 'react-i18next';
import '../../i18n'; // 引入i18n配置
import './index.css';
import axios from "axios";
import MenuModal from '../menuModal';
import { useAuth } from '../../AuthContext';

function Account(props) {
    const { auth } = useAuth();
    const { t } = useTranslation();
    const [value, setValue] = useState('a');
    const [accountInfo, setAccountInfo] = useState({});
    const [menuModalVisible, setMenuModalVisible] = useState(false);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const getAccountinfo = () => {
      axios.post('https://www.bitking.world/h5api/accountinfo', {
        uid: auth.uid
      })
      .then(function (response) {
        const data = response.data;
        if (data.code === 1) {
            setAccountInfo(data.data?.[0] || {});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    useEffect(() => {
        getAccountinfo();
    }, []);

    return (
        <ConfigProvider
            theme={{
                components: {
                Radio: {
                    /* 这里是你的组件 token */
                    buttonSolidCheckedActiveBg: '#FFCE0A',
                    buttonSolidCheckedBg: '#FFCE0A',
                    buttonSolidCheckedHoverBg: '#FFCE0A'
                },
                },
            }}
        >
            <div className="account-container">
                <div className="content">
                    <Radio.Group onChange={onChange} value={value} buttonStyle="solid">
                        <Radio.Button value="a">{t('platform account')}</Radio.Button>
                        <Radio.Button value="b">WEB3</Radio.Button>
                    </Radio.Group>
                    {value === 'a' ? (
                        <div>
                            <Divider className="divider" />
                            <h1>{t('market')}</h1>
                            <Flex justify="space-between" align="center" className="detail">
                                <div>
                                    <p className="name">{t('total performance')}</p>
                                    <p>{accountInfo?.GoldenAccount?.mkt?.[0] ?? '-'}</p>
                                </div>
                                <div>
                                    <p className="name">{t('my client')}</p>
                                    <p>{accountInfo?.GoldenAccount?.mkt?.[1] ?? '-'}</p>
                                </div>
                                <div>
                                    <p className="name">{t('customer commission')}</p>
                                    <p>{accountInfo?.GoldenAccount?.mkt?.[2] ?? '-'}</p>
                                </div>
                            </Flex>
                            <Divider className="divider" />
                            <h1>{t('integral')}</h1>
                            <Flex justify="space-between" align="center" className="detail">
                                <div>
                                    <p className="name">{t('total acquisition')}</p>
                                    <p>{accountInfo?.GoldenAccount?.point?.[0] ?? '-'}</p>
                                </div>
                                <div>
                                    <p className="name">{t('unlocked')}</p>
                                    <p>{accountInfo?.GoldenAccount?.point?.[1] ?? '-'}</p>
                                </div>
                                <div>
                                    <p className="name">{t('repurchased')}</p>
                                    <p>{accountInfo?.GoldenAccount?.point?.[2] ?? '-'}</p>
                                </div>
                            </Flex>
                            <Flex justify="space-between" align="center" className="btn-container">
                                <Button color="primary" fill="solid" shape="rounded">{t('transfer to web3')}</Button>
                                <Button color="primary" fill="solid" shape="rounded">{t('apply for repurchase')}</Button>
                            </Flex>
                        </div>
                    ) : (
                        <div>
                            <h1>BTK</h1>
                            <Flex justify="space-between" align="center" className="detail">
                                <div>
                                    <p className="name">{t('mining')}</p>
                                    <p>{accountInfo?.web3account?.BTK?.[0] ?? '-'}</p>
                                </div>
                                <div>
                                    <p className="name">{t('buy')}</p>
                                    <p>{accountInfo?.web3account?.BTK?.[1] ?? '-'}</p>
                                </div>
                                <div>
                                    <p className="name">{t('airdrop')}</p>
                                    <p>{accountInfo?.web3account?.BTK?.[2] ?? '-'}</p>
                                </div>
                            </Flex>
                            <Flex justify="space-between" align="center" className="detail">
                                <div>
                                    <p className="name">{t('total excavation')}</p>
                                    <p>{accountInfo?.web3account?.BTK?.[3] ?? '-'}</p>
                                </div>
                                <div>
                                    <p className="name">{t('unlocked')}</p>
                                    <p>{accountInfo?.web3account?.BTK?.[4] ?? '-'}</p>
                                </div>
                                <div>
                                    <p className="name">{t('to be unlocked')}</p>
                                    <p>{accountInfo?.web3account?.BTK?.[5] ?? '-'}</p>
                                </div>
                            </Flex>
                            <Flex justify="space-between" align="center" className="position-detail">
                                <div>
                                    <p>{t('current position')}</p>
                                    <p>{accountInfo?.web3account?.BTK?.[6] ?? '-'}</p>
                                </div>
                                <div>
                                    <p>{t('position ratio')}</p>
                                    <p>{accountInfo?.web3account?.BTK?.[7] ?? '-'}%</p>
                                </div>
                            </Flex>
                            <Flex justify="space-between" align="center" className="btn-container">
                                <Button color="primary" fill="solid" shape="rounded">{t('transfer to web3')}</Button>
                                <Button color="primary" fill="solid" shape="rounded">{t('apply for repurchase')}</Button>
                            </Flex>
                        </div>
                    )}
                    <Flex justify="space-between" align="center" className="info-container">
                        <div>
                            <p className="name">{t('account number')}</p>
                            <p>{auth.uid}</p>
                        </div>
                        <div>
                            <p className="name">{t('ranking')}</p>
                            <p>{accountInfo?.account?.ranking}/3000</p>
                        </div>
                        <div>
                            <p className="name">{t('position')}</p>
                            <p>{accountInfo?.account?.position ? t(accountInfo.account.position) : '-'}</p>
                        </div>
                    </Flex>
                </div>
                {menuModalVisible ? (
                    <MenuModal menuModalVisible={menuModalVisible} setMenuModalVisible={setMenuModalVisible} />
                ) : null}
            </div>
        </ConfigProvider>
    );
}

export default Account;
