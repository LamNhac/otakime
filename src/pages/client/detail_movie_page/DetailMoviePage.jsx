import { VideoPlayer } from "../../../components";

function DetailMoviePage() {
  return (
    <div>
      <VideoPlayer
        option={{
          url: "https://artplayer.org/assets/sample/video.mp4",
        }}
      />
    </div>
  );
}
export default DetailMoviePage;
