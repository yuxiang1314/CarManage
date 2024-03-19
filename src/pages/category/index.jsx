import React, { Component } from "react";
// 品类管理
import { Card, Table, Button, Space, message, Modal } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { reqCategorys, reqAddCategorys, reqUpdateCategorys } from "../../api"; //
import Addform from "./add-form";
import Updateform from "./update-form";

export default class Category extends Component {
  state = {
    loading: false, //是否正在获取数据中
    categorys: [], //一级分类列表
    subCategorys: [],
    parentId: "0",
    parentName: "",
    showStates: 0, //标识添加/更新的确认框是否显示，0：都不显示，1：都显示
  };
  formAdd = React.createRef(null);
  initColumns = () => {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作",
        width: 300,
        render: (category) => (
          <Space size="middle">
            <LinkButton
              onClick={() => {
                this.showUpdate(category);
              }}
            >
              修改分类
            </LinkButton>
            {/* 如何向事件回调函数传递参数：先定义一个匿名函数，在函数调用处理的函数并传入数据 */}
            {this.state.parentId === "0" ? (
              <LinkButton
                onClick={() => {
                  this.showSubCategorys(category);
                }}
              >
                查看子分类
              </LinkButton>
            ) : null}
          </Space>
        ),
      },
    ];
  };
  // 显示二级分类列表
  showSubCategorys = (category) => {
    // 更新状态
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      () => {
        console.log(this.state.parentId);
        this.getCategory();
      }
    );
  };
  // 显示一级分类列表
  showCategorys = () => {
    this.setState({
      parentId: "0",
      parentName: "",
      subCategorys: [],
    });
  };
  // 响应点击取消，隐藏确定框
  handleCancel = () => {
    this.setState({
      showStates: 0,
    });
  };

  // 添加分类
  addCategory = async () => {
    this.setState({
      showStates: 0,
    });
    const { parentId, categoryName } =
      this.formAdd.current.myForm.getFieldsValue();

    // 发送请求，更新分类
    const result = await reqAddCategorys(categoryName, parentId);
    if (result.status === 0) {
      //
      if (parentId === this.state.parentId) {
        // 重新显示列表
      this.getCategory();
      } else if (parentId === '0') {  //在二级分类列表下添加一级分类，重新获取一级分类列表，但是不需要显示一级列表
        this.getCategory('0')
      }
      
    }
  };
  // 显示添加的确认框

  showAdd = () => {
    this.setState({
      showStates: 1,
    });
  };

  // 更新分类
  updateCategory = async () => {
    this.setState({
      showStates: 0,
    });

    // 准备数据
    const categoryId = this.category._id;
    // const categoryName
    // 发送请求，更新分类
    const result = await reqUpdateCategorys(
      categoryId,
      this.categoryNameNew ? this.categoryNameNew : this.category.name
    );
    if (result.status === 0) {
      //
      // 重新显示列表
      this.getCategory();
    }
  };
  // 显示更新的确认框
  showUpdate = (category) => {
    this.category = category || {};
    this.setState({
      showStates: 2,
    });
  };

  // 异步获取一级分类列表显示
  getCategory = async (parentId) => {
    // 在发送请求之前，显示loading
    this.setState({ loading: true });

     parentId  = parentId || this.state.parentId;
    const result = await reqCategorys(parentId);
    this.setState({ loading: false });

    if (result.status === 0) {
      const categorys = result.data;
      if (parentId === "0") {
        this.setState({ categorys });
      } else {
        this.setState({ subCategorys: categorys });
      }
    } else {
      message.error("获取分类列表失败");
    }
  };
  // 为第一次render()准备数据
  componentWillMount() {
    this.initColumns();
  }
  // 发异步ajax请求，
  componentDidMount() {
    this.getCategory();
  }

  render() {
    const {
      loading,
      subCategorys,
      parentId,
      parentName,
      categorys,
      showStates,
    } = this.state;
    const category = this.category;
    let title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
          <ArrowRightOutlined style={{ marginRight: 10 }} />
          <span>{parentName}</span>
        </span>
      );
    let extra = (
      <Button type="primary" onClick={this.showAdd}>
        <PlusOutlined />
        添加
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          columns={this.columns}
          bordered
          loading={loading}
          rowKey={"_id"}
          dataSource={parentId === "0" ? categorys : subCategorys}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
        <Modal
          title="添加分类"
          visible={showStates === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <Addform
            categorys={categorys}
            parentId={parentId}
            ref={this.formAdd}
          />
        </Modal>
        <Modal
          title="更新分类"
          visible={showStates === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <Updateform
            categoryName={category}
            setForm={(categoryNameNew) => {
              this.categoryNameNew = categoryNameNew;
            }}
          />
        </Modal>
      </Card>
    );
  }
}
