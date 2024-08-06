import React from "react";

interface VideoPlayerProps {
  videoId: string | null;
  filmTitle: string | undefined;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, filmTitle }) => {
  return (
    <iframe
      width="1200"
      height="600"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={filmTitle}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="mx-auto rounded-xl shadow-lg"
    />
  );
};

export default VideoPlayer;
