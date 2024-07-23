import { useState } from 'react';
import { Button, Space, CenterPopup } from 'antd-mobile';
import { useTranslation } from 'react-i18next';
import '../../i18n'; // 引入i18n配置
import './index.css';
import InviteCodeModal from '../inviteCodeModal/index';
import { Link } from 'react-router-dom';

function MenuModal(props) {
    const { t } = useTranslation();
    const { menuModalVisible, setMenuModalVisible } = props;
    const [inviteCodeModalVisible, setInviteCodeModalVisible] = useState(false);
    const menuList = ['network', 'performance', 'information', 'organization', 'invitation code'];

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
                    <Button color="primary" fill="solid" shape="rounded" className="menu-modal-title">{t('menu')}</Button>
                    <Space direction="vertical" className="menu-modal-content">
                        {menuList.map((item) => {
                            if (item === 'network') {
                                return (
                                    <Link to="/">
                                        <Button color="primary" fill="solid" shape="rounded" block onClick={() => setMenuModalVisible(false)}>{t(item)}</Button>
                                    </Link>
                                );
                            } else if (item === 'performance') {
                                return (
                                    <Link to="/moneylist">
                                        <Button color="primary" fill="solid" shape="rounded" block onClick={() => setMenuModalVisible(false)}>{t(item)}</Button>
                                    </Link>
                                );
                            } else if (item === 'information') {
                                return (
                                    <Link to="/account">
                                        <Button color="primary" fill="solid" shape="rounded" block onClick={() => setMenuModalVisible(false)}>{t(item)}</Button>
                                    </Link>
                                );
                            } else if (item === 'invitation code') {
                                return (
                                    <Button color="primary" fill="solid" shape="rounded" block onClick={() => setInviteCodeModalVisible(true)}>{t(item)}</Button>
                                );
                            } else {
                                return (
                                    <Button color="primary" fill="solid" shape="rounded" block>{t(item)}</Button>
                                );
                            }
                        })}
                    </Space>
                </div>
            </CenterPopup>
            <InviteCodeModal inviteCodeModalVisible={inviteCodeModalVisible} setInviteCodeModalVisible={setInviteCodeModalVisible} />
        </div>
    );
}

export default MenuModal;
