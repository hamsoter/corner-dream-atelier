import { Table, Space } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";

function HistoryPage({ user }) {
  const columns = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "주문번호",
      dataIndex: "paymentId",
      key: "paymentId",
      ellipsis: true,
    },
    {
      title: "지불액",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "결제일",
      dataIndex: "dateOfPurchase",
      key: "dateOfPurchase",
    },
  ];

  const arr =
    user.userData &&
    user.userData.history.map((item, index) => {
      console.log();
      const body = {
        ...item,
        key: index,
        dateOfPurchase: new Date(item.dateOfPurchase).toLocaleDateString(),
      };
      console.log(body);
      return body;
    });

  return (
    <main>
      <Table columns={columns} dataSource={arr} />
    </main>
  );
}

export default HistoryPage;
