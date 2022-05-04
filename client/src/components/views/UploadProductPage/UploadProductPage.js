import React, { useState } from "react";

import { Typography, Form, Input, Button } from "antd";
import FileUpload from "../../utils/FileUpload";

const { Title } = Typography;
const { TextArea } = Input;

const genres = [
  { key: "g1", value: "액션" },
  { key: "g2", value: "SF" },
  { key: "g3", value: "코미디" },
  { key: "g4", value: "로맨스" },
  { key: "g5", value: "스릴러" },
  { key: "g6", value: "공포" },
  { key: "g7", value: "판타지" },
  { key: "g8", value: "뮤지컬" },
  { key: "g9", value: "말로 하기 힘들지만 특별함" },
];

const sizes = [
  { key: "s1", value: "티스푼보다 적은" },
  { key: "s2", value: "적은" },
  { key: "s3", value: "보통" },
  { key: "s4", value: "커다란" },
  { key: "s5", value: "어어어엄청 커다란!" },
];

const moods = [
  { key: "m1", value: "행복한" },
  { key: "m2", value: "흥겨운" },
  { key: "m3", value: "슬픈" },
  { key: "m4", value: "화가 나는" },
  { key: "m5", value: "무서운" },
  { key: "m6", value: "감동적인" },
  { key: "m7", value: "그리운" },
  { key: "m8", value: "괴로운" },
  { key: "m9", value: "말로 하기 힘들지만 소중한" },
];

function UploadProductPage() {
  // 서버로 보낼 form data
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [price, setPrice] = useState(0);
  const [genre, setGenre] = useState("");
  const [mood, setMood] = useState("");
  const [size, setSize] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDiscription(e.target.value);
  };

  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  };

  const selectHandler = (e, point) => {
    point(e.target.value);
  };

  const upadateImage = (image) => {
    setThumbnail(image);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>꿈 올리기</Title>
        <Title level={4}>누구나 꿈 작가가 될 수 있어요!</Title>
        <span>
          <b>모퉁이 꿈 공방</b>은 아마추어 꿈 제작자의 행보를 응원합니다!
        </span>
      </div>

      <Form>
        <FileUpload refreshFunction={upadateImage}></FileUpload>

        <article style={{ margin: "1rem 0" }}>
          <label>꿈의 이름은?</label>
          <Input onChange={titleChangeHandler} value={title} />
        </article>

        <article style={{ margin: "1rem 0" }}>
          <label>꿈의 장르는?</label>
          <select
            onChange={(e) => selectHandler(e, setGenre)}
            value={genre.key}
          >
            {genres.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
        </article>

        <article style={{ margin: "1rem 0" }}>
          <label>담긴 감정은</label>
          <select onChange={(e) => selectHandler(e, setMood)} value={mood.key}>
            {moods.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
          <label>느낌이에요</label>
        </article>

        <article style={{ margin: "1rem 0" }}>
          <label>감정의 크기는</label>
          <select onChange={(e) => selectHandler(e, setSize)} value={size.key}>
            {sizes.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
          <span>정도예요</span>
        </article>

        <article style={{ margin: "1rem 0" }}>
          <label>자세한 이야기</label>
          <TextArea onChange={descriptionChangeHandler} value={description} />
        </article>

        <article style={{ margin: "1rem 0" }}>
          <label>꿈의 가치($)</label>
          <Input type="number" onChange={priceChangeHandler} value={price} />
        </article>

        <article style={{ margin: "1rem 0" }}>
          <Button>확인</Button>
        </article>
      </Form>
    </div>
  );
}

export default UploadProductPage;