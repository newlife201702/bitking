import React, { useEffect, useState } from 'react';
import { Flex } from 'antd';
import { Button, Modal, Form, Picker, Stepper } from 'antd-mobile';
import { Area } from '@ant-design/plots';
import axios from 'axios';
import img from './img/home/组 391@1x.png';
import confirmImg from './img/home/confirm_img.png';
import './App.css';

function App() {
  const [amt, setAmt] = useState(0);
  const [data, setData] = useState([]);
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

  const onSubmit = () => {
    const values = form.getFieldsValue();
    console.log('values', values);
  }

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
  }, []);

  return (
    <div className="App">
      <header>
        <Flex justify="space-between" align="center">
          <Button color="primary" fill="solid" shape="rounded">菜单</Button>
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
                      label='币种'
                      trigger='onConfirm'
                      onClick={(e, pickerRef) => {
                        pickerRef.current?.open();
                      }}
                    >
                      <Picker
                        columns={moneyColumns}
                      >
                        {items =>
                          items.length > 0 ? items[0].label : '选择币种'
                        }
                      </Picker>
                    </Form.Item>
                    <Form.Item
                      name='lang'
                      label='语言'
                      trigger='onConfirm'
                      onClick={(e, pickerRef) => {
                        pickerRef.current?.open();
                      }}
                    >
                      <Picker
                        columns={langColumns}
                      >
                        {items =>
                          items.length > 0 ? items[0].label : '选择语言'
                        }
                      </Picker>
                    </Form.Item>
                    <Form.Item name='amount' label='数量' childElementPosition='right'>
                      <Stepper />
                    </Form.Item>
                  </Form>
                ),
                confirmText: '支付',
                onConfirm: () => {
                  onSubmit();
                },
              });
            }}
          >链接钱包</Button>
        </Flex>
      </header>
      <div className="content">
        <img src={img} className="img" alt="img" />
        <div className="chart-container">
          <div className="title">全网总量：{amt}/433M</div>
          <div className="chart">
            <Area {...config} />
          </div>
          <div className="desc">- 七日产出 -</div>
        </div>
      </div>
      <footer>
        <Flex justify="space-between" align="center">
          <Button color="primary" fill="solid" shape="rounded">节点</Button>
          <Button color="primary" fill="solid" shape="rounded">租赁挖矿</Button>
          <Button color="primary" fill="solid" shape="rounded">质押挖矿</Button>
        </Flex>
      </footer>
    </div>
  );
}

export default App;
