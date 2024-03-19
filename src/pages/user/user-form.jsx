import React, { useImperativeHandle, forwardRef } from "react";
import { Form, Input, Select } from "antd";
const Option = Select.Option;
const Userform = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    myForm: form,
  }));
  const { roles, user } = props;

  const onGetInput = (e) => {};

  const onFinish = (values) => {};

  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      initialValues={{
        username: user.username,
        password: user.password,
        phone: user.phone,
        email: user.email,
        role_id: user.role_id,
      }}
    >
      <Form.Item
        label="角色名"
        name="username"
        rules={[
          {
            required: true,
          },
          {
            min: 4,
            message: "最小长度为4",
          },
        ]}
      >
        <Input placeholder="请输入用户名称" onChange={onGetInput} />
      </Form.Item>
      {user._id ? null : (
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
            },
            {
              min: 4,
              message: "最小长度为4",
            },
          ]}
        >
          <Input
            type="password"
            placeholder="请输入用户密码"
            onChange={onGetInput}
          />
        </Form.Item>
      )}

      <Form.Item
        label="手机号"
        name="phone"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="请输入手机号" onChange={onGetInput} />
      </Form.Item>
      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="请输入邮箱" onChange={onGetInput} />
      </Form.Item>
      <Form.Item
        label="角色"
        name="role_id"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="请选择角色">
          {roles.map((role) => (
            <Option key={role._id}>{role.name}</Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
});
export default Userform;
