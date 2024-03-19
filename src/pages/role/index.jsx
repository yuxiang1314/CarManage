import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import { createBrowserHistory } from "history";
import { PAGE_SIZE } from "../../utils/constants";
import { reqRoles, reqAddRoles, reqUpdateRoles } from "../../api";
import Addform from "./add-form";
import Authform from "./auth-form";
import { connect } from "react-redux";

import { logout } from "../../redux/actions";

const history = createBrowserHistory();
class Role extends Component {
  state = {
    roles: [], //所有的role
    role: {}, //选中的role
    isShowAdd: false,
    isShowAuth: false,
  };
  
  formAdd = React.createRef(null);
  auth = React.createRef();
  initColumn = () => {
    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
      },
    ];
  };
  getRoles = async () => {
    const result = await reqRoles();
    if (result.status === 0) {
      const roles = result.data;
      this.setState({
        roles,
      });
    }
  };
  addRole = async () => {
    const { roleName } = this.formAdd.current.myForm.getFieldsValue();
    console.log(
      "this.formAdd.current.myForm.getFieldsValue() :>> ",
      this.formAdd.current.myForm.getFieldsValue()
    );
    console.log("rolename :>> ", roleName);
    if (!roleName) {
      message.error("输入内容为空");
    } else {
      const result = await reqAddRoles(roleName);
      if (result.status === 0) {
        message.success("添加角色成功");
        // 新产生的角色
        const role = result.data;
        // 更新roles状态
        // const roles = [...this.state.roles]
        // roles.push(role)
        // this.setState({
        //   roles,
        //   isShowAdd:false
        // })
        this.setState((state) => ({
          roles: [...state.roles, role],
          isShowAdd: false,
        }));
      } else {
        message.error("添加角色失败");
        this.setState({
          isShowAdd: false,
        });
      }
    }
  };
  updateRole = async () => {
    const role = this.state.role;
    const menus = this.auth.current.checkedKeys;
    role.menus = menus;
    const result = await reqUpdateRoles(role);
    if (result.status === 0) {
      message.success("设置角色权限成功");
      // 如果更新的是自己的角色的权限,要强制退出
      if (role._id === this.props.user.role_id) {
        
        this.props.logout()
        history.replace("/login");
        history.go();
        message.success("更新权限后,需要重新登录");
      }
      this.setState((state) => ({
        roles: [...state.roles],
        isShowAuth: false,
      }));
    } else {
      message.error("添加角色失败");
      this.setState({
        isShowAuth: false,
      });
    }
  };
  componentWillMount() {
    this.initColumn();
  }

  componentDidMount() {
    this.getRoles();
  }
  onRow = (role) => {
    return {
      onClick: (event) => {
        console.log("role :>> ", role);
        this.setState({
          role,
        });
      }, // 点击行
      onDoubleClick: (event) => {},
      onContextMenu: (event) => {},
      onMouseEnter: (event) => {}, // 鼠标移入行
      onMouseLeave: (event) => {},
    };
  };
  render() {
    const { roles, role, isShowAdd, isShowAuth } = this.state;
    const title = (
      <span>
        <Button
          type="primary"
          onClick={() => {
            this.setState({
              isShowAdd: true,
            });
          }}
        >
          创建角色
        </Button>{" "}
        &nbsp;
        <Button
          type="primary"
          disabled={!role._id}
          onClick={() => {
            this.setState({
              isShowAuth: true,
            });
          }}
        >
          设置角色权限
        </Button>
      </span>
    );

    return (
      <Card title={title}>
        <Table
          columns={this.columns}
          bordered
          rowKey={"_id"}
          dataSource={roles}
          pagination={{ defaultPageSize: PAGE_SIZE }}
          rowSelection={{
            type: "radio", selectedRowKeys: [role._id], onSelect: (role) => {
              this.setState({
              role
            })
          } }}
          onRow={this.onRow}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({
              isShowAdd: false,
            });
          }}
          destroyOnClose={true}
        >
          <Addform ref={this.formAdd} />
        </Modal>
        <Modal
          title="设置角色的权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({
              isShowAuth: false,
            });
          }}
          destroyOnClose={true}
        >
          <Authform ref={this.auth} role={role} />
        </Modal>
      </Card>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  {logout}
)(Role)