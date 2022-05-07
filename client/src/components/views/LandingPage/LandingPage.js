import { Button, Card, Col, Collapse, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import Search from "antd/lib/input/Search";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./LandingPage.module.css";
import ProductCard from "./ProductCard";
import CheckBox from "./Sections/CheckBox";

import { genres } from "./Sections/Datas";
import PriceSlider from "./Sections/PriceSlider";
import SearchFeature from "./Sections/SearchFeature";

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  // 한번에 불러올 데이터양
  const [limit, setLimit] = useState(6);
  const [postSize, setPostSize] = useState(0);

  // 필터 정보를 저장
  const [filters, setFilters] = useState({
    genre: [],
    price: [],
  });

  const loadMoreHandler = () => {
    let newSkip = skip + limit;

    const body = {
      skip: newSkip,
      limit: limit,
      loadMore: true,
    };
    fetchData(body);

    setSkip((prev) => prev + limit);
  };

  const fetchData = async (body) => {
    try {
      const result = await Axios.post("/api/product/products", body);

      if (body.loadMore) {
        setProducts([...products, ...result.data.products]);
      } else {
        setProducts(result.data.products);
      }
      setPostSize(result.data.postSize);
    } catch (err) {
      console.log(err);
    }
  };

  // 필터된 데이터를 화면에 그리기
  const showFilteredResults = (filters) => {
    let body = {
      skip: 0, // skip 초기화
      limit: limit,
      filters: filters,
    };
    console.log(body);
    fetchData(body);
    setSkip(0);
  };

  const handleFilters = (filterItem, category) => {
    console.log(category, filterItem);

    // filters형식을 한 새로운 객체
    const newFilters = { ...filters };

    // filters 형식을 한 새 객체에 넘겨받은
    newFilters[category] = filterItem;
    console.log("new", newFilters);

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  useEffect(() => {
    const body = {
      skip: skip,
      limit: limit,
    };

    fetchData(body);
  }, []);

  const productCards = products.map((item, index) => {
    return (
      <ProductCard
        key={index}
        title={item.title}
        price={item.price}
        thumbSrc={item.thumbnail}
      ></ProductCard>
    );
  });

  return (
    <main className={styles.main}>
      <div className={styles.center}>text</div>

      {/* filter */}

      <Row gtter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={genres}
            handleFilters={(filters) => {
              handleFilters(filters, "genre");
            }}
          ></CheckBox>
        </Col>
        <Col lg={12} xs={24}>
          <PriceSlider
            handleFilters={(filters) => {
              handleFilters(filters, "price");
            }}
          ></PriceSlider>
        </Col>
        <Col
          lg={24}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        ></Col>
      </Row>
      {/* search */}
      <SearchFeature></SearchFeature>
      {/* items */}

      <Row gutter={[16, 16]}>{productCards}</Row>
      {postSize >= limit && (
        <div className={styles.center}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </main>
  );
}

export default LandingPage;
