import React, { useState } from "react";

import { Typography, Form, Input, Button, Divider } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
import SizeSlider from "../../utils/SizeSlider";

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

function UploadProductPage({ user, history }) {
  // 서버로 보낼 form data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [genre, setGenre] = useState(genres[0].key);
  const [mood, setMood] = useState(moods[0].key);
  const [size, setSize] = useState(sizes[0].key);
  const [thumbnail, setThumbnail] = useState("");

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const priceChangeHandler = (e) => {
    e.target.value = Math.abs(
      e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1")
    );
    setPrice(e.target.value);
  };

  const selectHandler = (e, point) => {
    point(e.target.value);
  };

  const upadateImage = (image) => {
    setThumbnail(image);
  };

  const selectedIndex = (dataObj, selectedValue) => {
    return dataObj.findIndex((item) => item.key === selectedValue) + 1;
  };

  const submitHandler = () => {
    if (!title || !description || price < 1 || !genre || !mood || !size) {
      return alert("모든 값을 넣어주세요!");
    }

    const genreIndex = selectedIndex(genres, genre);
    const moodIndex = selectedIndex(moods, mood);
    const sizeIndex = selectedIndex(sizes, size);

    const body = {
      writer: user.userData._id,
      title: title,
      description: description,
      price: price,
      genre: genreIndex,
      mood: moodIndex,
      size: sizeIndex,
      thumbnail: thumbnail,
    };

    Axios.post("/api/product", body).then((res) => {
      if (res.data.success) {
        alert("성공!");
        history.push("/");
      } else {
        alert("뭔가 문제가 생겼어요! 다시 시도해봅시다.");
      }
    });
  };

  return (
    <main style={{ padding: "0 1rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2} style={{ marginTop: "3rem" }}>
          꿈 판매하기
        </Title>
        <Title level={4}>누구나 꿈 작가가 될 수 있어요!</Title>
        <span>
          <b>모퉁이 꿈 공방</b>은 아마추어 꿈 제작자의 행보를 응원합니다!
        </span>
      </div>

      <Form onSubmitCapture={submitHandler}>
        <FileUpload refreshFunction={upadateImage}></FileUpload>

        <Divider style={{ marginBottom: "3rem" }}>자세한 소개</Divider>
        <article style={{ margin: "1rem 0" }}>
          <label style={{ fontWeight: "bold" }}>꿈의 이름은?</label>
          <Input onChange={titleChangeHandler} value={title} />
        </article>

        <article style={{ margin: "1rem 0" }}>
          <label style={{ fontWeight: "bold" }}>꿈의 장르는?</label>
          <select
            style={{ margin: "0 0.5rem" }}
            onChange={(e) => selectHandler(e, setGenre)}
            value={genre.key}
          >
            {genres.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
          <label>입니다</label>
        </article>

        <article style={{ margin: "1rem 0" }}>
          <label style={{ fontWeight: "bold" }}>담긴 감정은</label>
          <select
            style={{ margin: "0 0.5rem" }}
            onChange={(e) => selectHandler(e, setMood)}
            value={mood.key}
          >
            {moods.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
          <label>느낌이에요</label>
        </article>

        <article style={{ margin: "1rem 0" }}>
          <label style={{ fontWeight: "bold" }}>감정의 크기는?</label>

          <SizeSlider setSize={setSize}></SizeSlider>
          {/* <select onChange={(e) => selectHandler(e, setSize)} value={size.key}>
            {sizes.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select> */}
        </article>

        <article style={{ margin: "1rem 0" }}>
          <label style={{ fontWeight: "bold" }}>이야기 소개...</label>
          <TextArea
            placeholder="어떤 꿈인지 간단히 들려주세요!"
            onChange={descriptionChangeHandler}
            value={description}
          />
        </article>

        <article style={{ margin: "1rem 0" }}>
          <label style={{ fontWeight: "bold" }}>꿈의 가치($)</label>
          <p>좋은 이야기에는 그만한 가치가 필요해요!</p>
          <Input
            type="number"
            onChange={priceChangeHandler}
            min="1"
            value={price}
          />
        </article>
        <article style={{ margin: "1rem 0" }}>
          <Button htmlType="submit">확인</Button>
        </article>
      </Form>
    </main>
  );
}

export default UploadProductPage;
