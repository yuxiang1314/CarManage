import React, { useImperativeHandle, forwardRef, useState } from "react";
import { Form, Input, Tree } from "antd";
import menuList from "../../config/menuConfig";

const Addform = forwardRef((props, ref) => {
  //  useEffect(() => {
  //    getTreeNode(menuList);
  //  }, []);

  const data = [
    {
      title: "平台权限",
      key: "all",
      children: menuList,
    },
  ];

  const [form] = Form.useForm();
  const { role } = props;
  const [checkedKeys, setCheckedKeys] = useState(role.menus);
  const onFinish = (values) => {};
  const onSelect = (selectedKeys, info) => {};

  const onCheck = (checkedKeysValue, info) => {
    setCheckedKeys(checkedKeysValue);
  };
  useImperativeHandle(ref, () => ({
    checkedKeys: checkedKeys,
  }));

  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      initialValues={{ roleName: role.name }}
    >
      <Form.Item
        label="角色名称"
        name="roleName"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled />
      </Form.Item>
      <Tree
        checkable
        defaultExpandedKeys={["/products", "/charts"]}
        // defaultSelectedKeys={["/products"]}
        defaultCheckedKeys={role.menus}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={data}
      />
    </Form>
  );
});
export default Addform;
