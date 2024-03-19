import React, { Component } from "react";
import { Card, Select, Input, Button, Table, message } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { reqGetProduct, reqSearchProducts, reqUpdateStatus } from "../../api";
import { PAGE_SIZE } from "../../utils/constants";
import { createBrowserHistory } from "history";
// Product的默认子路由组件
const { Option } = Select;
const history = createBrowserHistory();
export default class ProductHome extends Component {
  state = {
    loading: false,
    total: 0,
    products: [], //商品的数组
    searchName: "", //搜索的关键字
    searchType: "productName", //根据那个字段搜索
    };
    


  initColums = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
      },
      {
        title: "价格",
        dataIndex: "price",
        render: (price) => "￥" + price, //当前指定了对应的属性
      },
      {
        width: 100,
        title: "状态",

        render: (product) => {
          const { status, _id } = product;
          return (
            <span>
              <Button
                type="primary"
                onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}
              >
                {status === 1 ? "下架" : "上架"}
              </Button>
              <span>{status === 1 ? "在售" : "已下架"}</span>
            </span>
          );
        },
      },
      {
        width: 100,
        title: "操作",

        render: (product) => {
          return (
            <span>
              <LinkButton
                onClick={() => {
                  history.push("/product/detail", product); //将product对象使用state传递给目标路由组件
                  history.go(0);
                }}
              >
                详情
              </LinkButton>
              <LinkButton
                onClick={() => {
                  history.push("/product/addupdate", product); //将product对象使用state传递给目标路由组件
                  history.go(0);
                }}
              >
                修改
              </LinkButton>
            </span>
          );
        }, //当前指定了对应的属性
      },
    ];
  };
  // 获取指定页码的列表数据显示
    getProduct = async (pageNum) => {
      this.pageNum = pageNum
    this.setState({ loading: true });
    const { searchName, searchType } = this.state;
    let result;
    if (searchName) {
      result = await reqSearchProducts(
        pageNum,
        PAGE_SIZE,
        searchName,
        searchType
      );
    } else {
      result = await reqGetProduct(pageNum, PAGE_SIZE);
    }

    this.setState({ loading: false });
    if (result.status === 0) {
      const { total, list } = result.data;
      this.setState({
        total,
        products: list,
      });
    }
    };
    updateStatus = async (productId, status)=>{
        const result = await reqUpdateStatus(productId, status)
        if (result.status === 0) {
            message.success('更新商品状态成功')
            this.getProduct(this.pageNum)
        }
    }
  componentWillMount() {
    this.initColums();
  }
  componentDidMount() {
    this.getProduct(1);
  }
  render() {
    // 取出状态数据
    const { products, total, loading, searchName, searchType } = this.state;

    const title = (
      <div>
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={(value) => this.setState({ searchType: value })}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          style={{ width: 300, margin: "0 15px" }}
          placeholder="关键字"
          value={searchName}
          onChange={(e) => this.setState({ searchName: e.target.value })}
        />
        <Button
          type="primary"
          onClick={() => {
            this.getProduct(1);
          }}
        >
          搜索
        </Button>
      </div>
    );
      const extra = (
          <Button type="primary" onClick={() => {
              history.push("/product/addupdate");
              history.go(0)
          }}>
        <PlusOutlined />
        添加商品
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          dataSource={products}
          columns={this.columns}
          pagination={{
            current:this.pageNum,
            defaultPageSize: PAGE_SIZE,
            total,
            showQuickJumper: true,
            onChange: this.getProduct,
          }}
        />
      </Card>
    );
  }
}

// export default function ProductHome() {
//   const { Option } = Select;

//   //     total: 0,
//   //     products: [], //商品的数组
//   //     searchName: "", //搜索的关键字
//   //     searchType: "productName", //根据那个字段搜索
//   const [loading, setLoading] = useState(false);
//   const [total, setTotal] = useState(0);
//   const [products, setProducts] = useState([]);
//   const [searchName, setSeachName] = useState("");
//   const [searchType, setSearchType] = useState("productName");
//   let columns;
//   const initColums = () => {
//     columns = [
//       {
//         title: "商品名称",
//         dataIndex: "name",
//       },
//       {
//         title: "商品描述",
//         dataIndex: "desc",
//       },
//       {
//         title: "价格",
//         dataIndex: "price",
//         render: (price) => "￥" + price, //当前指定了对应的属性
//       },
//       {
//         width: 100,
//         title: "状态",
//         dataIndex: "status",
//         render: (status) => {
//           return (
//             <span>
//               <Button type="primary">下架</Button>
//               <span>{status === 1 ? "在售" : "已下架"}</span>
//             </span>
//           );
//         },
//       },
//       {
//         width: 100,
//         title: "操作",

//         render: (product) => {
//           return (
//             <span>
//               <LinkButton
//                 onClick={() => {
//                   return this.state && <Navigate to="/detail" replace="true" />;
//                 }}
//               >
//                 详情
//               </LinkButton>
//               <LinkButton>修改</LinkButton>
//             </span>
//           );
//         }, //当前指定了对应的属性
//       },
//     ];
//   };
//   const getProduct = async (pageNum) => {
//     setLoading(true);
//     let result;
//     if (searchName) {
//       result = await reqSearchProducts(
//         pageNum,
//         PAGE_SIZE,
//         searchName,
//         searchType
//       );
//     } else {
//       result = await reqGetProduct(pageNum, PAGE_SIZE);
//     }

//     setLoading(false);

//     if (result.status === 0) {
//       const { total, list } = result.data;
//       setTotal(total);
//       setProducts(list);
//       console.log("list :>> ", list);
//       console.log("products231", products);
//     }
//       console.log("products", products);
//       console.log('total :>> ', total);
//   };
//   useEffect(() => {
//     initColums();
//     getProduct(1);
//   }, []);
//   const title = (
//     <div>
//       <Select
//         value={searchType}
//         style={{ width: 150 }}
//         onChange={(value) => setSearchType(value)}
//       >
//         <Option value="productName">按名称搜索</Option>
//         <Option value="productDesc">按描述搜索</Option>
//       </Select>
//       <Input
//         style={{ width: 300, margin: "0 15px" }}
//         placeholder="关键字"
//         value={searchName}
//         onChange={(e) => setSeachName(e.target.value)}
//       />
//       <Button
//         type="primary"
//         onClick={() => {
//           getProduct(1);
//         }}
//       >
//         搜索
//       </Button>
//     </div>
//   );
//   const extra = (
//     <Button type="primary">
//       <PlusOutlined />
//       添加商品
//     </Button>
//   );

//   return (
//     <Card title={title} extra={extra}>
//       <Table
//         bordered
//         rowKey="_id"
//         loading={loading}
//         dataSource={products}
//         columns={columns}
//         pagination={{
//           defaultPageSize: PAGE_SIZE,
//           total,
//           showQuickJumper: true,
//           onChange: getProduct,
//         }}
//       />
//     </Card>
//   );
// }
