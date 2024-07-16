import { useEffect, useState } from "react";
import { Flex } from "antd";
import { Button, Popup, Toast } from "antd-mobile";
import { useTranslation } from "react-i18next";
import "../../i18n"; // 引入i18n配置
import "./index.css";
import axios from "axios";
import clipboard from "copy-text-to-clipboard";

function InviteCode(props) {
  const { t } = useTranslation();
  const { inviteCodeModalVisible, setInviteCodeModalVisible } = props;
  const [inviteCode, setInviteCode] = useState("");
  const [superCode, setSuperCode] = useState("");
  const [invitelink, setInvitelink] = useState("");

  const getInviteCodeAndSuperCode = () => {
    axios
      .post("https://www.bitking.world/h5api/fillfathercode", {
        uid: "0x123AB456",
        father_code: "0x12345678",
      })
      .then(function (response) {
        const data = response.data;
        if (data.code === 1) {
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getInvitelink = () => {
    axios
      .post("https://www.bitking.world/h5api/invitelink", {
        uid: "0x123AB456",
        address: "0xc678ujfr567uijgty7890plkjhu8o",
      })
      .then(function (response) {
        const data = response.data;
        if (data.code === 1) {
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getInviteCodeAndSuperCode();
    getInvitelink();
  }, []);

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
      <h3>{t("inviter")}：XXX</h3>
      <div className="invite-link">
        <p>文本文本文本文本文本文本文本文本文本文本</p>
        <a>https://www.xxxxx.xxxx/code=A12B34C56</a>
      </div>
      <Flex justify="space-between" align="center" className="btn-container">
        <Button
          color="primary"
          fill="solid"
          shape="rounded"
          onClick={() => {
            clipboard("111");
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
            clipboard("222");
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
