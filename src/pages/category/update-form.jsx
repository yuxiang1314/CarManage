import React  from "react";
import {  Form, Input } from "antd";

export default function Updateform(props) {
  const [form] = Form.useForm();
  console.log("props", props);
  let categoryName 
  // 此处获取Input框输入数据
  const onGetInput = (e) => {
    console.log("Input", e.target.value);
    categoryName = e.target.value || props.categoryName.name
    console.log(categoryName);
    props.setForm(categoryName)
  };
  
  

  const onFinish = (values) => {
    console.log("onFinish", values.categoryName);
  };

  return (
    <Form form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="categoryName"
        initialValue={props.categoryName.name}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input onChange={onGetInput} />
      </Form.Item>
    </Form>
  );
}
