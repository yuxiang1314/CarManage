import React, { useImperativeHandle, forwardRef } from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

// export default class Addform extends Component {
//   render() {
//     return (
//       <Form>
//         <Form.Item>
//           <Select>
//             <Option value="0">一级分类</Option>
//             <Option value="1">电脑</Option>
//             <Option value="2">图书</Option>
//             <Option value="3">美食</Option>
//             <Option value="4">生活</Option>
//           </Select>
//         </Form.Item>
//         <Form.Item
//           name="name"
//           rules={[
//             {
//               required: true,
//             },
//           ]}
//         >
//           <Input placeholder="请输入分类名称"></Input>
//         </Form.Item>
//       </Form>
//     );
//   }
// }

const Addform = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    myForm: form,
  }));
 

  const onGetSelect = (value) => {
 
  };

  const onGetInput = (e) => {

  };

  const onFinish = (values) => {
   
  };

  return (
    <Form form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="parentId"
        initialValue={props.parentId}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="选择分类级别" allowClear onChange={onGetSelect}>
          <Option value="0">一级分类</Option>
          {props.categorys.map((c) => (
            <Option key={c._id} value={c._id}>{c.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="categoryName"
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
