import React from "react";
import { Button, Col, Form, Input, Row } from "antd";

const DBLogin: React.FC<{ isRegister?: boolean }> = ({ isRegister = false }) => {
  return (
    <Form
      name="basic"
      requiredMark={false}
      labelCol={{
        span: 24,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      labelAlign="left"
    >
      <Form.Item label={<span className="">Email</span>} name="email">
        <Input name="email" />
      </Form.Item>

      <Form.Item label={<span className="">Password</span>} name="password">
        <Input.Password name="password" />
      </Form.Item>
      {isRegister && (
        <Form.Item label={<span className="">Confirm Password</span>} name="confirmPassword">
          <Input.Password name="Confirm Password" />
        </Form.Item>
      )}

      <Row gutter={20}>
        <Col span={12} className="">
          <Form.Item>
            <Button type="dashed" htmlType="submit" className="w-full">
              {isRegister ? "Register" : "Login"}
            </Button>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Button type="text" className="w-full">
              Forgot Password
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default DBLogin;
