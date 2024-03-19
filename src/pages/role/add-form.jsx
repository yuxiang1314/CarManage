import React, { useImperativeHandle, forwardRef } from "react";
import { Form, Input } from "antd";



const Addform = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    myForm: form,
  }));

 

  const onGetInput = (e) => {};

  const onFinish = (values) => {};

  return (
    <Form form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item label='角色名称'
        name="roleName"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="请输入分类名称" onChange={onGetInput} />
      </Form.Item>
    </Form>
  );
});
export default Addform;

