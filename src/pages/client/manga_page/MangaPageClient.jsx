import { Card, Image, Row, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDocuments } from "../../../services/firebaseService";

function MangaPageClient() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllDocuments("manga")
      .then(setData)
      .finally(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, []);
  console.log(data);
  return (
    <Spin
      spinning={isLoading}
      className="min-h-screen"
      tip="Đang tải dữ liệu..."
    >
      <div className="min-h-screen">
        <h3>MANGA</h3>
        <Row wrap className="gap-5">
          {data?.map((item, index) => {
            return (
              <Link to={`/manga/${item.nameManga}`} key={index}>
                <Card
                  hoverable
                  cover={
                    <Image
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                      style={{
                        flex: 1,
                        height: 300,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        objectFit: "cover", // Sử dụng object-fit để scale hình ảnh
                        width: "100%", // Đảm bảo rằng hình ảnh sẽ có chiều rộng 100%
                      }}
                      preview={false}
                    />
                  }
                >
                  <Image src={item.imgMain} />
                  <h3>{item.nameManga}</h3>
                  <p>
                    {item.tags.map((itemTag, index) => {
                      return <Tag key={index}>{itemTag.label}</Tag>;
                    })}
                  </p>
                </Card>
              </Link>
            );
          })}
        </Row>
      </div>
    </Spin>
  );
}

export default MangaPageClient;
