import { useEffect, useState } from 'react';
import { Flex } from "antd";
import { Card, Button, Toast, Modal, Form, Stepper } from "antd-mobile";
import "./index.css";
import { useTranslation } from "react-i18next";
import "../../i18n"; // 引入i18n配置
import axios from "axios";
import { useAuth } from '../../AuthContext';

function MoneyList(props) {
  const { auth } = useAuth();
  const { t } = useTranslation();
  const [cardAmt, setCardAmt] = useState({});
  const [cardList, setCardList] = useState([]);
  const [form] = Form.useForm();

  const getPerformance = () => {
    axios.post('https://www.bitking.world/h5api/performance', {
      invite_code: auth.super_code || auth.invite_code
    })
    .then(function (response) {
      const data = response.data;
      if (data.code === 1) {
        setCardList(data.data?.data_list || []);
        setCardAmt(data.data?.amt || {});
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const showWithdrawModal = () => {
    Modal.confirm({
      title: t('withdraw reward'),
      content: (
        <Form
          form={form}
          layout='horizontal'
        >
          <Form.Item name='amount' label={t('USDT')} childElementPosition='right'>
            <Stepper />
          </Form.Item>
        </Form>
      ),
      confirmText: t('withdraw'),
      cancelText: t('cancel'),
      onConfirm: () => {
        withdraw();
      },
      showCloseButton: true,
    });
  };

  const withdraw = () => {
    const values = form.getFieldsValue();
    axios
      .post("https://www.bitking.world/h5api/withdrawb", {
        uid: auth.uid,
        address: auth.account,
        amt: values.amount,
      })
      .then(function (response) {
        const data = response.data;
        Toast.show({
          content: data.msg,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getPerformance();
  }, []);

  return (
    <div className="money-list-container">
      <div className="card-container">
        {cardList.map((item) => (
          <Card className="card">
            <Flex justify="space-between" align="center">
              <span>{item[0]}</span>
              <span>{item[1]}</span>
              <span>{item[2]}</span>
            </Flex>
          </Card>
        ))}
      </div>
      <Flex
        justify="space-between"
        align="center"
        className="withdraw-container"
      >
        <Flex
          justify="space-between"
          align="center"
          className="money-container"
        >
          <div>
            <p>{t("total performance")}</p>
            <p>
              <span>{cardAmt.a1}</span> | <span>{cardAmt.a2}</span>
            </p>
          </div>
          <div>
            <p>{t("total commission")}</p>
            <p>
              <span>{cardAmt.b1}</span> | <span>{cardAmt.b2}</span>
            </p>
          </div>
        </Flex>
        <Button
          color="primary"
          fill="solid"
          shape="rounded"
          className="withdraw"
          onClick={showWithdrawModal}
        >
          {t("withdraw")}
        </Button>
      </Flex>
    </div>
  );
}

export default MoneyList;
