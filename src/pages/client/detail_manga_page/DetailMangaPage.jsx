import { useParams } from "react-router-dom";

function DetailMangaPage() {
  const { mangaId } = useParams();

  // Sử dụng giá trị của mangaId để làm gì đó trong trang này

  return (
    <div>
      <h2>Chi tiết Manga</h2>
      <p>Manga ID: {mangaId}</p>
      {/* Hiển thị thông tin chi tiết về manga có ID là mangaId */}
    </div>
  );
}

export default DetailMangaPage;
