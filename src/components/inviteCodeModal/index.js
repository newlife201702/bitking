import { Flex } from "antd";
import { Button, Popup, Toast } from "antd-mobile";
import { useTranslation } from "react-i18next";
import "../../i18n"; // 引入i18n配置
import "./index.css";
import clipboard from "copy-text-to-clipboard";
import { useAuth } from '../../AuthContext';

function InviteCode(props) {
  const { auth } = useAuth();
  const { t } = useTranslation();
  const { inviteCodeModalVisible, setInviteCodeModalVisible } = props;

  return (
    <Popup
      visible={inviteCodeModalVisible}
      onMaskClick={() => {
        setInviteCodeModalVisible(false);
      }}
      bodyStyle={{
        boxSizing: "border-box",
        padding: "24px 10px",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        textAlign: "center",
      }}
    >
      <h2>{t("my invitation code")}</h2>
      <h3 className="grey-color">{t("inviter")}：{auth.father_code || '-'}</h3>
      <Flex justify="space-between" align="center" className="code-container blue-color">
        {(auth.super_code || auth.invite_code).replaceAll(" ","").split('').map(item => (
          <div className="code-number">{item}</div>
        ))}
      </Flex>
      <div className="invite-link">
        <p className="grey-color">{auth.uid} 邀请您加入世界囤金计划～</p>
        <p className="blue-color">{`http://www.bitking.world/code=${(auth.super_code || auth.invite_code)}`}</p>
      </div>
      <Flex justify="space-between" align="center" className="btn-container">
        <Button
          color="primary"
          fill="solid"
          shape="rounded"
          onClick={() => {
            clipboard(`http://www.bitking.world/code=${(auth.super_code || auth.invite_code)}`);
            Toast.show({
              content: t("copy link") + t("success"),
            });
          }}
        >
          {t("copy link")}
        </Button>
        <Button
          color="primary"
          fill="solid"
          shape="rounded"
          onClick={() => {
            clipboard((auth.super_code || auth.invite_code));
            Toast.show({
              content: t("copy invitation code") + t("success"),
            });
          }}
        >
          {t("copy invitation code")}
        </Button>
      </Flex>
    </Popup>
  );
}

export default InviteCode;
