import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Form, Input, Cascader, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { reqCategorys } from "../../api";

const { TextArea } = Input;

export default function ProductAddUpdate() {
  let data = {};
  let isUpdate;
  let title;
  const makeTitle = (isUpdate) => {
    title = (
      <span style={{ fontSize: 20 }}>
        <LinkButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowLeftOutlined />
        </LinkButton>
        {isUpdate ? "修改商品" : "添加商品"}
      </span>
    );
  };
  useEffect(() => {
    getCategorys("0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    isUpdate = !!location.state;
    console.log("isUpdate :>> ", isUpdate);
    makeTitle(isUpdate);
  });
  const onFinish = (values) => {
    console.log("Success:", values);
    data = values;
  };
  const navigate = useNavigate();
  const location = useLocation();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [options, setOptions] = useState([]);
  const onChange = (value, selectedOptions) => {
    console.log("28行", value, selectedOptions); //输出选择的参数
    data.parendId = value;
    data.childrenId = selectedOptions;
    console.log("data :>> ", data);
  };

  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true; // load options lazily

    //   根据选中的分类，请求获取二级分类列表
    const subCategorys = await getCategorys(targetOption.value);
    targetOption.loading = false;

    if (subCategorys && subCategorys.length > 0) {
      // 生成一个二级列表
      targetOption.children = subCategorys.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));
      //   关联到当前的option上
    } else {
      //当前没有二级分类
      targetOption.isLeaf = true;
    }
    //   模拟请求异步获取二级数据
    console.log("[...options] :>> ", [...options]);
    setOptions([...options]);
  };

  const initOptions = (categorys) => {
    // 根据数组生成option数组
    const options = categorys.map((c) => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }));
    setOptions(options);
  };
  // 异步获取一级/二级分类列表，并显示
  // async函数的返回值是一个新的promise对象，promise对象的结果和值由async的结果来决定
  const getCategorys = async (parendId) => {
    const result = await reqCategorys(parendId);
    if (result.status === 0) {
      const categorys = result.data;
      // 如果是一级分类列表
      if (parendId === "0") {
        initOptions(categorys);
      } else {
        return categorys; //返回二级列表==>当前async函数返回的promise就会成功，并且value值为category
      }
    }
  };

  return (
    <Card title={title}>
      <Form
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 6,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="商品名称"
          name="name"
          rules={[
            {
              required: true,
              message: "必须输入商品名称",
            },
          ]}
        >
          <Input placeholder="请输入商品名称"></Input>
        </Form.Item>
        <Form.Item
          label="商品描述"
          name="desc"
          rules={[
            {
              required: true,
              message: "必须输入商品描述",
            },
          ]}
        >
          <TextArea
            placeholder="请输入商品描述"
            autoSize={{ minRows: 2, maxRows: 6 }}
          ></TextArea>
        </Form.Item>
        <Form.Item
          label="商品价格"
          name="price"
          type="number"
          rules={[
            {
              required: true,
              message: "必须输入商品价格",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value > 0) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("输入的价格最小为1"));
              },
            }),
          ]}
        >
          <Input
            type="number"
            placeholder="请输入商品价格"
            addonAfter="元"
          ></Input>
        </Form.Item>
        <Form.Item
          label="商品分类"
          //   name="category"
          rules={[
            {
              required: true,
              message: "必须输入商品分类",
            },
          ]}
        >
          <Cascader
            options={options}
            loadData={loadData}
            onChange={onChange}
            changeOnSelect
          />
        </Form.Item>
        <Form.Item
          label="商品图片"
          //   name="img"
          rules={[
            {
              required: true,
              message: "必须输入商品图片",
            },
          ]}
        >
          <div>商品图片</div>
        </Form.Item>
        <Form.Item
          label="商品详情"
          //   name="detail"
          rules={[
            {
              required: true,
              message: "必须输入商品详情",
            },
          ]}
        >
          <div>商品详情</div>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
    </Card>
  );
}
