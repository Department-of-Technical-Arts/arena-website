import { React, useEffect } from "react";
import "./Gallery.css";
import imagesData from "./ImagesList";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Gallery = () => {
  useEffect(() => {
    document.title = "Gallery - ARENA";
  }, []);

  const imageCard = imagesData.map((item) => {
    const i = imagesData.indexOf(item);
    return (
      <div className={`w-2 ${i % 2 === 0 ? "h-2" : "h-3"} `}>
        <div class="gallery-item">
          <div class="image-gallery-grid">
            <LazyLoadImage src={require(`${item}`)} width={330} height={300} />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="content-gallery">
        <h1 className="gallery-title">GALLERY</h1>
      </div>
      <div className="container-grid">{imageCard}</div>
    </div>
  );
};

export default Gallery;
