import React, { Component } from "react";
// 柱形图
import { Card } from "antd";
import ReactECharts from "echarts-for-react";
export default class Bar extends Component {
  // 返回饼图图的对象配置
  state = {
    sales: [5, 20, 36, 10, 10, 20], //销量
    stores: [15, 10, 26, 20, 30, 10], //库存
  };

  getOption = (sales, stores) => {
    return {
      backgroundColor: "#2c343c",
      title: {
        text: "Customized Pie",
        left: "center",
        top: 20,
        textStyle: {
          color: "#ccc",
        },
      },
      tooltip: {
        trigger: "item",
      },
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1],
        },
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: [
            { value: 335, name: "Direct" },
            { value: 310, name: "Email" },
            { value: 274, name: "Union Ads" },
            { value: 235, name: "Video Ads" },
            { value: 400, name: "Search Engine" },
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: "radius",
          label: {
            color: "rgba(255, 255, 255, 0.3)",
          },
          labelLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
          itemStyle: {
            color: "#c23531",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function (idx) {
            return Math.random() * 200;
          },
        },
      ],
    };
  };
  update = () => {
    this.setState((state) => ({
      sales: state.sales.map((sale) => sale + 1),
      stores: state.stores.reduce((pre, store) => {
        pre.push(store - 1);
        return pre;
      }, []),
    }));
  };
  render() {
    const { sales, stores } = this.state;
    return (
      <div>
        <Card>
          
        </Card>
        <Card title="饼状图一">
          <ReactECharts option={ this.getOption(sales, stores)} style = {{height:300}} />
        </Card>
      </div>
    );
  }
}

