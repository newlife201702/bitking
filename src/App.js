import React, { useEffect, useState } from 'react';
import { Flex } from 'antd';
import { Button, Modal, Form, Picker, Stepper } from 'antd-mobile';
import { Area } from '@ant-design/plots';
import axios from 'axios';
import img from './img/home/组 391@1x.png';
import confirmImg from './img/home/confirm_img.png';
import './App.css';
import { useTranslation } from 'react-i18next';
import './i18n'; // 引入i18n配置
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import MoneyList from './components/moneyList/index';
import Account from './components/account/index';
import MenuModal from './components/menuModal/index';

function App() {
  const { t } = useTranslation();
  const [amt, setAmt] = useState(0);
  const [data, setData] = useState([]);
  const [cardAmt, setCardAmt] = useState({});
  const [cardList, setCardList] = useState([]);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const config = {
    data,
    height: 300,
    xField: 'month',
    yField: 'value',
    colorField: 'type',
    shapeField: 'smooth',
    stack: true, // Try to remove this line.
  };
  const [form] = Form.useForm();
  const moneyColumns = [[
    { label: '人民币', value: '人民币' },
    { label: '美元', value: '美元' },
  ]];
  const langColumns = [[
    { label: '中文', value: '中文' },
    { label: '英文', value: '英文' },
  ]];
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  const onSubmit = () => {
    const values = form.getFieldsValue();
    console.log('values', values);
  }

  const getPerformance = () => {
    axios.post('https://www.bitking.world/h5api/performance', {
      invite_code: 'O31B22V02'
    })
    .then(function (response) {
      const data = response.data;
      if (data.code === 1) {
        // setCardList(data.data?.data_list || []);
        setCardAmt(data.data?.amt || {});
        setCardList([
          ['3.11', '0x123456789', '500U'],
          ['3.11', '0x123456789', '500U'],
          ['3.11', '0x123456789', '500U']
        ]);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  useEffect(() => {
    axios.get('https://www.bitking.world/h5api/unlockdinfo')
    .then(function (response) {
      const data = response.data;
      if (data.code === 1) {
        const mint = data.data.mint?.map((item, index) => ({
          month: index + 1,
          type: 'mint',
          value: item
        })) || [];
        const unlock = data.data.unlock?.map((item, index) => ({
          month: index + 1,
          type: 'unlock',
          value: item
        })) || [];
        setAmt(data.data.amt);
        setData([...mint, ...unlock]);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    getPerformance();
  }, []);

  return (
    <div className="App">
      <MoneyList cardAmt={cardAmt} cardList={cardList} />
      {/* <Account /> */}
      {/* <div>
        <h1>Wallet Connect with Web3Modal and Wagmi</h1>
        {isConnected ? (
          <div>
            <p>Connected to {address}</p>
            <button onClick={disconnect}>Disconnect</button>
          </div>
        ) : (
          <div>
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connect({ connector })}
                disabled={!connector.ready}
              >
                {connector.name}
                {!connector.ready && ' (unsupported)'}
                {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
              </button>
            ))}

            {error && <div>{error.message}</div>}
          </div>
        )}
      </div> */}
      <header>
        <Flex justify="space-between" align="center">
          <Button
            color="primary"
            fill="solid"
            shape="rounded"
            onClick={() => setMenuModalVisible(true)}
          >{t('menu')}</Button>
          <Button
            color="primary"
            fill="solid"
            shape="rounded"
            onClick={() => {
              Modal.confirm({
                image: confirmImg,
                content: (
                  <Form
                    form={form}
                    layout='horizontal'
                  >
                    <Form.Item
                      name='money'
                      label={t('currency')}
                      trigger='onConfirm'
                      onClick={(e, pickerRef) => {
                        pickerRef.current?.open();
                      }}
                      rules={[{ required: true, message: t('currency cannot be empty') }]}
                    >
                      <Picker
                        columns={moneyColumns}
                      >
                        {items =>
                          items.length > 0 ? items[0].label : t('select currency')
                        }
                      </Picker>
                    </Form.Item>
                    <Form.Item
                      name='lang'
                      label={t('language')}
                      trigger='onConfirm'
                      onClick={(e, pickerRef) => {
                        pickerRef.current?.open();
                      }}
                      rules={[{ required: true, message: t('language cannot be empty') }]}
                    >
                      <Picker
                        columns={langColumns}
                      >
                        {items =>
                          items.length > 0 ? items[0].label : t('select language')
                        }
                      </Picker>
                    </Form.Item>
                    <Form.Item name='amount' label={t('number')} childElementPosition='right'>
                      <Stepper />
                    </Form.Item>
                  </Form>
                ),
                confirmText: t('pay'),
                cancelText: t('cancel'),
                onConfirm: () => {
                  onSubmit();
                },
                showCloseButton: true,
              });
            }}
          >{t('link wallet')}</Button>
        </Flex>
      </header>
      <div className="content">
        <img src={img} className="img" alt="img" />
        <div className="chart-container">
          <div className="title">{t('total network volume')}：{amt}/433M</div>
          <div className="chart">
            <Area {...config} />
          </div>
          <div className="desc">- {t('7-day output')} -</div>
        </div>
      </div>
      <footer>
        <Flex justify="space-between" align="center">
          <Button color="primary" fill="solid" shape="rounded">{t('node')}</Button>
          <Button color="primary" fill="solid" shape="rounded">{t('leasing mining')}</Button>
          <Button color="primary" fill="solid" shape="rounded">{t('pledge mining')}</Button>
        </Flex>
      </footer>
      {menuModalVisible ? (
        <MenuModal menuModalVisible={menuModalVisible} setMenuModalVisible={setMenuModalVisible} />
      ) : null}
    </div>
  );
}

export default App;
