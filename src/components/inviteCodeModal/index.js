import { useState } from 'react';
import { Flex } from 'antd';
import { Button, Popup } from 'antd-mobile';
import { useTranslation } from 'react-i18next';
import '../../i18n'; // 引入i18n配置
import './index.css';

function InviteCode(props) {
    const { t } = useTranslation();
    const { inviteCodeModalVisible, setInviteCodeModalVisible } = props;
    const [inviteCode, setInviteCode] = useState('');
    const [superCode, setSuperCode] = useState('');
    const [invitelink, setInvitelink] = useState('');

    return (
        <Popup
            visible={inviteCodeModalVisible}
            onMaskClick={() => {
                setInviteCodeModalVisible(false);
            }}
            bodyStyle={{
                boxSizing: 'border-box',
                padding: '24px 10px',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                minHeight: '40vh',
                textAlign: 'center',
            }}
        >
            <h2>{t('my invitation code')}</h2>
            <h3>{t('inviter')}：XXX</h3>
            <div className="invite-link">
                <p>
                    文本文本文本文本文本文本文本文本文本文本
                </p>
                <a>https://www.xxxxx.xxxx/code=A12B34C56</a>
            </div>
            <Flex justify="space-between" align="center" className="btn-container">
                <Button color="primary" fill="solid" shape="rounded">{t('copy link')}</Button>
                <Button color="primary" fill="solid" shape="rounded">{t('copy invitation code')}</Button>
            </Flex>
        </Popup>
    );
}

export default InviteCode;
