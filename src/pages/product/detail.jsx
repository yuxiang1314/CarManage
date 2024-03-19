import React, { Component } from "react";
import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { createBrowserHistory } from "history";
import { BASE_IMG } from "../../utils/constants";
import { reqGetCategory } from "../../api";
const history = createBrowserHistory();
const Item = List.Item;

export default class ProductDetail extends Component {
  state = {
    cName1: "", //一级分类名称
    cName2: " ", //二级分类名称
  };
  async componentWillMount() {
    const { pCategoryId, categoryId } = history.location.state;
    console.log("p :>> ", pCategoryId, categoryId);
    if (pCategoryId === "0") {
      const result = await reqGetCategory(categoryId);
      const cName1 = result.data.name;
      this.setState({ cName1 });
    } else {
      // 通过多个await方式发送多个请求，后面一个请求是在前一个请求成功返回之后才发送
      //   const result1 = await reqGetCategory(pCategoryId);
      //   const result2 = await reqGetCategory(categoryId);
      //   const cName1 = result1.data.name;
      //   const cName2 = result2.data.name;
      // 为了效率问题，需要一次性发送多个请求
      const results = await Promise.all([
        reqGetCategory(pCategoryId),
        reqGetCategory(categoryId),
      ]);
      const cName1 = results[0].data.name;
        const cName2 = results[1].data.name;
      this.setState({ cName1, cName2 });
    }
  }
  render() {
    //   读取携带的状态数据，state数据

    const { name, desc, price, detail, imgs } = history.location.state;
    const { cName1, cName2 } = this.state;
    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{ color: "green", fontSize: 20 }}
            onClick={() => {
              history.back();
            }}
          />
        </LinkButton>
        <span style={{ margin: "0 10px" }}>商品详情</span>
      </span>
    );


    return (
      <Card title={title}>
        <List className="product">
          <Item className="product-item">
            <span className="left">商品名称:</span>
            {name}
          </Item>
          <Item className="product-item">
            <span className="left">商品描述:</span>
            {desc}
          </Item>
          <Item className="product-item">
            <span className="left">商品价格:</span>
            {price + "元"}
          </Item>
          <Item className="product-item">
            <span className="left">所属分类:</span>
            <span>
              {cName1} {cName2 === " " ? " " : "-->" + cName2 }
            </span>
          </Item>
          <Item className="product-item">
            <span className="left">商品图片:</span>
            {imgs.map((img)=>(
              <span key={img}>{BASE_IMG + img}</span>
              //   <img key={img}
              //     className="product-img"
              //     // src={[require(BASE_IMG + img)]}
              //     alt="img"
              //   />;
            ))}
          </Item>
          <Item className="product-item">
            <span className="left">商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </Item>
        </List>
      </Card>
    );
  }
}
