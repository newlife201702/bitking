import { useEffect, useState } from 'react';
import { ConfigProvider, Flex, Radio } from 'antd';
import { Button, Space, Divider, Popover } from 'antd-mobile';
import { useTranslation } from 'react-i18next';
import '../../i18n'; // 引入i18n配置
import langImg from '../../img/account/lang@1x.png';
import giftImg from '../../img/account/gift@1x.png';
import shareImg from '../../img/account/share@1x.png';
import infoImg from '../../img/account/info@1x.png';
import jianImg from '../../img/account/简@1x.png';
import fanImg from '../../img/account/繁@1x.png';
import enImg from '../../img/account/EN@1x.png';
import jpImg from '../../img/account/JP@1x.png';
import krImg from '../../img/account/KR@1x.png';
import './index.css';
import axios from "axios";
import MenuModal from '../menuModal';
import { useAuth } from '../../AuthContext';

function Account(props) {
    const { auth } = useAuth();
    const { t, i18n } = useTranslation();
    const [value, setValue] = useState('a');
    const [accountInfo, setAccountInfo] = useState({});
    const [menuModalVisible, setMenuModalVisible] = useState(false);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

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
                <header>
                    <Flex justify="space-between" align="center">
                        <Button color="primary" fill="solid" shape="rounded" onClick={() => setMenuModalVisible(true)}>{t('menu')}</Button>
                        <Space>
                            <Popover
                                content={
                                    <Space direction="vertical">
                                        <Button color="primary" fill="solid" shape="rounded" onClick={() => changeLanguage('zh2')}>
                                            <img src={jianImg} alt="img" />
                                        </Button>
                                        <Button color="primary" fill="solid" shape="rounded" onClick={() => changeLanguage('zh1')}>
                                            <img src={fanImg} alt="img" />
                                        </Button>
                                        <Button color="primary" fill="solid" shape="rounded" onClick={() => changeLanguage('en')}>
                                            <img src={enImg} alt="img" />
                                        </Button>
                                        <Button color="primary" fill="solid" shape="rounded" onClick={() => changeLanguage('jp')}>
                                            <img src={jpImg} alt="img" />
                                        </Button>
                                        <Button color="primary" fill="solid" shape="rounded" onClick={() => changeLanguage('kr')}>
                                            <img src={krImg} alt="img" />
                                        </Button>
                                    </Space>
                                }
                                trigger="click"
                                placement="bottom"
                            >
                                <Button color="primary" fill="solid" shape="rounded">
                                    <img src={langImg} alt="img" />
                                </Button>
                            </Popover>
                            <Button color="primary" fill="solid" shape="rounded">
                                <img src={giftImg} alt="img" />
                            </Button>
                            <Button color="primary" fill="solid" shape="rounded">
                                <img src={shareImg} alt="img" />
                            </Button>
                            <Button color="primary" fill="solid" shape="rounded" className="info-btn">
                                <img src={infoImg} className="info-img" alt="img" />
                            </Button>
                        </Space>
                    </Flex>
                </header>
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
