import React, { Component } from "react";
import { Button, Row, Col } from "antd";
import "./index.less";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
/*
前台404页面
 */
export default class NotFound extends Component {
  render() {
    return (
      <Row className="not-found">
        <Col span={12} className="left"></Col>
        <Col span={12} className="right">
          <h1>404</h1>
          <h2>抱歉，你访问的页面不存在</h2>
          <div>
            <Button
              type="primary"
              onClick={() => { history.replace("/home"); history.go()}}
            >
              回到首页
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
}
