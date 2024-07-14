import { useState } from 'react';
import { Button, Space, CenterPopup } from 'antd-mobile';
import { useTranslation } from 'react-i18next';
import '../../i18n'; // 引入i18n配置
import './index.css';
import InviteCodeModal from '../inviteCodeModal';

function MenuModal(props) {
    const { t } = useTranslation();
    const { menuModalVisible, setMenuModalVisible, menuList } = props;
    const [inviteCodeModalVisible, setInviteCodeModalVisible] = useState(false);

    return (
        <div>
            <CenterPopup
                visible={menuModalVisible}
                showCloseButton={true}
                onClose={() => {
                    setMenuModalVisible(false);
                }}
                onMaskClick={() => {
                    setMenuModalVisible(false);
                }}
            >
                <div className="menu-modal-container">
                    <Button color="primary" fill="solid" shape="rounded" className="title">{t('menu')}</Button>
                    <Space direction='vertical'>
                        {menuList.map((item, index) => (
                            index === menuList.length - 1 ? (
                                <Button color="primary" fill="solid" shape="rounded" onClick={() => setInviteCodeModalVisible(true)}>{t('menu')}</Button>
                            ) : (
                                <Button color="primary" fill="solid" shape="rounded">{t('menu')}</Button>
                            )
                        ))}
                    </Space>
                </div>
            </CenterPopup>
            {inviteCodeModalVisible ? (
                <InviteCodeModal inviteCodeModalVisible={inviteCodeModalVisible} setInviteCodeModalVisible={setInviteCodeModalVisible} />
            ) : null}
        </div>
    );
}

export default MenuModal;
