import { useState } from 'react';
import { ConfigProvider, Flex, Radio } from 'antd';
import { Button, Space, Divider } from 'antd-mobile';
import { useTranslation } from 'react-i18next';
import '../../i18n'; // 引入i18n配置
import langImg from '../../img/account/lang@1x.png';
import giftImg from '../../img/account/gift@1x.png';
import shareImg from '../../img/account/share@1x.png';
import infoImg from '../../img/account/info@1x.png';
import './index.css';

function Account(props) {
    const { t, i18n } = useTranslation();
    const [lang, setLang] = useState('zh');
    const [value, setValue] = useState('a');

    const changeLanguage = (lng) => {
        setLang(lng);
        i18n.changeLanguage(lng);
    };

    const onChange = (e) => {
        setValue(e.target.value);
    };

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
                        <Button color="primary" fill="solid" shape="rounded">{t('menu')}</Button>
                        <Space>
                            <Button color="primary" fill="solid" shape="rounded" onClick={() => changeLanguage(lang === 'zh' ? 'en' : 'zh')}>
                                <img src={langImg} alt="img" />
                            </Button>
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
                                    <p>000</p>
                                </div>
                                <div>
                                    <p className="name">{t('my client')}</p>
                                    <p>000</p>
                                </div>
                                <div>
                                    <p className="name">{t('customer commission')}</p>
                                    <p>000</p>
                                </div>
                            </Flex>
                            <Divider className="divider" />
                            <h1>{t('integral')}</h1>
                            <Flex justify="space-between" align="center" className="detail">
                                <div>
                                    <p className="name">{t('total acquisition')}</p>
                                    <p>000</p>
                                </div>
                                <div>
                                    <p className="name">{t('unlocked')}</p>
                                    <p>000</p>
                                </div>
                                <div>
                                    <p className="name">{t('repurchased')}</p>
                                    <p>000</p>
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
                                    <p>000</p>
                                </div>
                                <div>
                                    <p className="name">{t('buy')}</p>
                                    <p>000</p>
                                </div>
                                <div>
                                    <p className="name">{t('airdrop')}</p>
                                    <p>000</p>
                                </div>
                            </Flex>
                            <Flex justify="space-between" align="center" className="detail">
                                <div>
                                    <p className="name">{t('total excavation')}</p>
                                    <p>000</p>
                                </div>
                                <div>
                                    <p className="name">{t('unlocked')}</p>
                                    <p>000</p>
                                </div>
                                <div>
                                    <p className="name">{t('to be unlocked')}</p>
                                    <p>000</p>
                                </div>
                            </Flex>
                            <Flex justify="space-between" align="center" className="position-detail">
                                <div>
                                    <p>{t('current position')}</p>
                                    <p>50000</p>
                                </div>
                                <div>
                                    <p>{t('position ratio')}</p>
                                    <p>80%</p>
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
                            <p>0x123123</p>
                        </div>
                        <div>
                            <p className="name">{t('ranking')}</p>
                            <p>3000/3000</p>
                        </div>
                        <div>
                            <p className="name">{t('position')}</p>
                            <p>{t('voter')}</p>
                        </div>
                    </Flex>
                </div>
            </div>
        </ConfigProvider>
    );
}

export default Account;
