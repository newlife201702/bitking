import React, { useEffect, useState } from 'react';
import { Flex } from 'antd';
import { Button, Modal, Form, Picker, Stepper, Swiper, Toast } from 'antd-mobile';
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
import { walletConnect } from '@wagmi/connectors';
import { useAuth } from './AuthContext';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { auth, setAuth } = useAuth();
  const { t } = useTranslation();
  const [amt, setAmt] = useState(0);
  const [data, setData] = useState([]);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [imgs, setImgs] = useState([]);
  const [productsInfo, setProductsInfo] = useState([]);
  const [currentPayProduct, setCurrentProduct] = useState({});
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
    { label: 'USDT', value: 'USDT' },
  ]];
  const networkColumns = [[
    { label: 'BSC', value: 'BSC' },
  ]];
  const productsInfoName = {
    '普通节点': 'ordinary node',
    '购买挖矿': 'purchase mining',
    '租赁挖矿': 'leasing mining'
  };

  const onSubmit = async () => {
    const values = form.getFieldsValue();
    try {
      const result = await sendTransaction(config, {
        account: auth.account,
        to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
        value: parseEther(values.amount + ''),
      });
      axios.post('https://www.bitking.world/h5api/payconfirm', {
        uid: auth.uid,
        chain_name: values.network[0],
        coin_type: values.money[0],
        txshash: result,
        category: currentPayProduct.cn,
        amt: values.amount * currentPayProduct.price,
        intivatecode: auth.super_code || auth.intivate_code
      })
      .then(function (response) {
        const data = response.data;
        if (data.code === 1) {
          Toast.show({
            content: t("success"),
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
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

  const getProductsinfo = () => {
    axios.get('https://www.bitking.world/h5api/productsinfo')
    .then(function (response) {
      const data = response.data;
      if (data.code === 1) {
        setProductsInfo(data.data?.map(item => ({
          ...item,
          cn: item.name,
          name: productsInfoName[item.name]
        })));
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const walletConnectFunc = async () => {
    const connectResult = await connect(config, { connector: walletConnect({ projectId: '3f16e56c7257930aca7d6bc52640c2f8'}) });
    axios.post('https://www.bitking.world/h5api/register_login', {
      address: connectResult.accounts[0],
      amt: '-1'
    })
    .then(function (response) {
      const data = response.data;
      if (data.code === 1) {
        setAuth({
          ...data.data[0],
          account: connectResult.accounts[0]
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const showPayModal = (product) => {
    setCurrentProduct(product);
    Modal.confirm({
      image: confirmImg,
      content: (
        <Form
          form={form}
          layout='horizontal'
          initialValues={{
            money: ['USDT'],
            network: ['BSC'],
          }}
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
            name='network'
            label={t('network')}
            trigger='onConfirm'
            onClick={(e, pickerRef) => {
              pickerRef.current?.open();
            }}
            rules={[{ required: true, message: t('network cannot be empty') }]}
          >
            <Picker
              columns={networkColumns}
            >
              {items =>
                items.length > 0 ? items[0].label : t('select network')
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
  };

  useEffect(() => {
    getImgs();
    getUnlockdinfo();
    getProductsinfo();
  }, []);

  const items = imgs.map((img, index) => (
    <Swiper.Item key={index}>
      <img src={img} className="img" alt="img" />
    </Swiper.Item>
  ));

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
                walletConnectFunc();
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
                {productsInfo.map(item => (
                  <Button color="primary" fill="solid" shape="rounded" onClick={() => showPayModal(item)}>{t(item.name)}</Button>
                ))}
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
