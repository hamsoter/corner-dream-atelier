import { Col, Row } from "antd";
import CheckableTag from "antd/lib/tag/CheckableTag";
import React, { useState } from "react";

import styles from "./col.module.css";

function CheckBox({ list, handleFilters }) {
  // 눌려져 있는 아이템의 id를 담음
  const [checked, setChecked] = useState([]);

  const handleToggle = (key) => {
    const keyNum = Number(key.split("g")[1]);
    // 누른 것의 index 구하기
    const currentIndex = checked.indexOf(keyNum);

    // checked state에 지금 누른 checkbox가 있는지 확인
    const newChecked = [...checked];

    // 없다면 추가
    if (currentIndex === -1) {
      newChecked.push(keyNum);

      // 있다면 빼기
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    handleFilters(newChecked);
  };

  const renderCheckboxLists = () => {
    return (
      list &&
      list.map((item, index) => {
        if (index === 0) {
          return;
        }
        return (
          <CheckableTag
            style={{ border: `1px solid lightgrey` }}
            key={index}
            className={item.key}
            onChange={(e) => {
              handleToggle(item.key);
            }}
            checked={
              checked.indexOf(Number(item.key.split("g")[1])) === -1
                ? false
                : true
            }
          >
            <span>{item.value}</span>
          </CheckableTag>
        );
      })
    );
  };

  return (
    <div className={`${styles.left} ${styles.box}`}>
      <h3>장르</h3>
      <div>
        <Row
          className={`collapse-row right ${styles.row}`}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Col className={styles.col} lg={{ span: 20 }} xs={{ span: 22 }}>
            {renderCheckboxLists()}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CheckBox;
