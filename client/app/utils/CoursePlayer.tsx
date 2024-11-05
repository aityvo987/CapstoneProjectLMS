import React, { FC } from 'react';

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const getYoutubeEmbedUrl = (videoId: string) => `https://www.youtube.com/embed/${videoId}`;

  return (
    <div>
      <div style={{ paddingTop: "56.25%", position: "relative", overflow:"hidden" }}>
        <iframe
          title="YouTube Video Player"
          width="100%"
          height="100%"
          src={getYoutubeEmbedUrl(videoUrl)}
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          style={{ position: "absolute", top: 0, left: 0 ,border:0}}
        ></iframe>
      </div>
    </div>
  );
};

export default CoursePlayer;