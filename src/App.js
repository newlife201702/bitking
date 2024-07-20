import React, { useEffect, useState } from 'react';
import { Flex } from 'antd';
import { Button, Modal, Form, Picker, Stepper, Swiper } from 'antd-mobile';
import { Area } from '@ant-design/plots';
import axios from 'axios';
import confirmImg from './img/home/confirm_img.png';
import './App.css';
import { useTranslation } from 'react-i18next';
import './i18n'; // 引入i18n配置
import Account from './components/account/index';
import MenuModal from './components/menuModal/index';
import MoneyList from './pages/moneyList/index';
import { Routes, Route, useLocation } from 'react-router-dom';
import { sendTransaction } from '@wagmi/core';
import { parseEther } from 'viem';
import { config } from './config';
import { connect } from '@wagmi/core';
import { injected } from '@wagmi/connectors';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useTranslation();
  const [amt, setAmt] = useState(0);
  const [data, setData] = useState([]);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [imgs, setImgs] = useState([]);
  const chartConfig = {
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

  const onSubmit = async () => {
    const values = form.getFieldsValue();
    console.log('values', values);
    return;
    const result0 = await connect(config, { connector: injected() });
    console.log('result0', result0);
    const result = await sendTransaction(config, {
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther(values.amount + ''),
    });
    console.log('result', result);
  };

  const getImgs = () => {
    axios.get('https://www.bitking.world/h5api/imgs')
    .then(function (response) {
      const data = response.data;
      if (data.code === 1) {
        setImgs(data.data?.map(item => `data:image/png;base64,${item}`) || []);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const getUnlockdinfo = () => {
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
  };

  useEffect(() => {
    getImgs();
    getUnlockdinfo();
  }, []);

  const items = imgs.map((img, index) => (
    <Swiper.Item key={index}>
      <img src={img} className="img" alt="img" />
    </Swiper.Item>
  ))

  return (
    <div className="App">
      {currentPath !== '/account' && (
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
      )}
      <div>
        {currentPath === '/' && (
          <div>
            <div className="content">
              <Swiper>{items}</Swiper>
              <div className="chart-container">
                <div className="title">{t('total network volume')}：{amt}/433M</div>
                <div className="chart">
                  <Area {...chartConfig} />
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
          </div>
        )}
        {currentPath === '/moneylist' && (
          <Routes>
            <Route path="/moneylist" element={<MoneyList />} />
          </Routes>
        )}
        {currentPath === '/account' && (
          <Routes>
            <Route path="/account" element={<Account />} />
          </Routes>
        )}
      </div>
      {menuModalVisible ? (
        <MenuModal menuModalVisible={menuModalVisible} setMenuModalVisible={setMenuModalVisible} />
      ) : null}
    </div>
  );
}

export default App;
