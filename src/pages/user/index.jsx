import React, { Component } from 'react'
import { Card , Button , Table , Modal, message } from 'antd'
// 用户管理
import { PAGE_SIZE } from "../../utils/constants";
import LinkButton from '../../components/link-button'
import { reqAddOrUpdateUsers, reqDeleteUser, reqGetUsers } from '../../api';
import Userform from './user-form';
export default class User extends Component {
  state = {
    users: [],
    roles: [],
    isShow: false,
  };
  formAdd = React.createRef(null);      //使用这个接收 const { parentId, categoryName } =this.formAdd.current.myForm.getFieldsValue();
  initColumn = () => {
    this.columns = [
      {
        title: "用户名",
        dataIndex: "username",
      },
      {
        title: "邮箱",
        dataIndex: "email",
      },
      {
        title: "电话",
        dataIndex: "phone",
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        // render:formateDate
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        render: (role_id) => this.roleNames[role_id],
      },
      {
        title: "操作",

        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        ),
      },
    ];
  };
  showUpdate = (user) => {
    this.user = user
    this.setState({
      isShow:true
    })
  }
  deleteUser = (user) => {
    Modal.confirm({
      title: `确定删除${user.username}吗?`,
      onOk: async () => {
        //  console.log("OK");
        const result = await reqDeleteUser(user._id);
        if (result.status === 0) {
          message.success("删除用户成功");
          this.getUsers();
        } else {
          message.error("删除用户失败");
        }
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };
  // 根据role的数组,生成包含所有角色名称的对象
  initRoleNames = (roles) => {
    this.roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
  };
  componentWillMount() {
    this.initColumn();
  }
  componentDidMount() {
    this.getUsers();
  }
  getUsers = async () => {
    const result = await reqGetUsers();
    if (result.status === 0) {
      const { roles, users } = result.data;
      this.initRoleNames(roles);
      this.setState({
        users,
        roles,
      });
    }
  };
  addOrUpdateUser = async () => {
    // 收集输入数据
    const user = this.formAdd.current.myForm.getFieldsValue();
    if (this.user) {
      user._id = this.user._id
    }

    const result = await reqAddOrUpdateUsers(user)
    if (result.status === 0) {
      message.success(`${this.user ? '修改':'添加'}用户成功`)
      this.getUsers()
      this.setState({
        isShow:false
      })
    } else {
      message.error('创建用户失败')
    }
    // 提交添加的请求

    // 更新列表显示


  };
  showAdd = () => {
    this.user = null
    this.setState({ isShow: true })
  }
  render() {
    const title = (
      <Button type="primary" onClick={this.showAdd}>
        创建用户
      </Button>
    );
    const { users, roles, isShow } = this.state;
    const user = this.user || {}
    return (
      <Card title={title}>
        <Table
          columns={this.columns}
          bordered
          rowKey={"_id"}
          dataSource={users}
          pagination={{ defaultPageSize: PAGE_SIZE }}
          // rowSelection={{ type: "radio", selectedRowKeys: [role._id] }}
          onRow={this.onRow}
        />
        <Modal
          title={user._id ? "修改用户" :"添加用户"}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.setState({
              isShow: false,
            });
          }}
          destroyOnClose={true}
        >
          <Userform ref={this.formAdd} roles={roles} user={user }/>
        </Modal>
      </Card>
    );
  }
}
