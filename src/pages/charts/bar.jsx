import React, { Component } from "react";
// 柱形图
import { Card, Button } from "antd";
import EChartsReact from "echarts-for-react";
export default class Bar extends Component {
  // 返回柱状图的对象配置
  state = {
    sales: [5, 20, 36, 10, 10, 20], //销量
    stores: [15, 10, 26, 20, 30, 10], //库存
  };
  getOption = (sales, stores) => {
    return {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量", "库存"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: sales,
        },
        {
          name: "库存",
          type: "bar",
          data: stores,
        },
      ],
    };
  };
  update = () => {
    this.setState(state => ({
      sales: state.sales.map(sale => sale + 1),
      stores: state.stores.reduce((pre, store) => {
        pre.push(store - 1)
        return pre
      } , [])
    }))
  }
  render() {
    const { sales, stores } = this.state
    console.log('sales :>> ', sales);
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.update}>
            更新
          </Button>
        </Card>
        <Card title="柱状图一">
          <EChartsReact option={ this.getOption(sales, stores)} />
        </Card>
      </div>
    );
  }
}
