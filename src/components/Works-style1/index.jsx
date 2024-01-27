/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import tooltipEffect from "../../common/tooltipEffect";
import worksData from "../../data/sections/worksData.json";
import { image_url } from "../../../global_vars";
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const WorksStyle1 = ({ data = {} }) => {
  useEffect(() => {
    tooltipEffect();
  }, []);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const toggleGallery = () => {
    setIsGalleryOpen(!isGalleryOpen);
  };

  const images = data.class.map((item) => {
    if (item.classes_content_id.images && Array.isArray(item.classes_content_id.images)) {
      return item.classes_content_id.images.map((image) => ({
        original: `${image_url}${image.directus_files_id}`,
        thumbnail: `${image_url}${image.directus_files_id}`
      }));
    } else {
      return [];
    }
  }).flat();

  const handleImageClick = (index) => {
    const selectedItem = data.class[index];

    if (selectedItem && selectedItem.classes_content_id && selectedItem.classes_content_id.images) {
      const imagesForSelectedItem = selectedItem.classes_content_id.images.map((image) => ({
        original: `${image_url}${image.directus_files_id}`,
        thumbnail: `${image_url}${image.directus_files_id}`
      }));

      setSelectedImageIndex(index);
      setGalleryImages(imagesForSelectedItem);
      setIsGalleryOpen(true);
    } else {
      console.error("Invalid data structure for the selected item:", selectedItem);
    }
  };

  const closeGallery = () => {
    setSelectedImageIndex(null);
    setIsGalleryOpen(false);
  };

  return (
    <section className="works pb-70" style={{
        position: "relative",
        height: isGalleryOpen && galleryImages.length > 0 ? "115vh" : "auto", 
        overflow: isGalleryOpen ? "hidden" : "visible",
      }}>
      <h2 style={{ display: 'none' }}> &nbsp; </h2>
      <div className="container">
        <div className="mobileFlex" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginBottom: "5rem" }}>
          {data.branch_name ? <h1 className="globalTitle" style={{ fontWeight: "bold", fontFamily: "Montserrat ExtraBold" }}>{data.branch_name}</h1> : null}
          {data.title ? <h1 className="globalSubtitle" style={{ fontWeight: "200", fontFamily: "Montserrat Regular" }}>{data.title}</h1> : null}
        </div>
        <div className="row lg-space">
          {data.class.map((item, index) => (
            <div key={item.id} className={`col-lg-4 col-md-6 ${index % 2 !== 0 ? 'valign' : ''}`}>
              <div className="item">
                <img
                  src={`${image_url}${item.classes_content_id.image?.id}`}
                  alt=""
                  style={{cursor:"pointer"}}
                  onClick={() => handleImageClick(index)}
                />
              </div>
            </div>
          ))}

          {selectedImageIndex !== null && galleryImages.length > 0 && (
            <Gallery
              items={galleryImages}
              showIndex
              currentIndex={selectedImageIndex}
              renderCustomControls={() => (
                <img
                  src="/closeButton.svg"
                  onClick={closeGallery}
                  style={{
                    width: "30px",
                    height: "30px",
                    outline: "none",
                    lineHeight: 1,
                    position: "absolute",
                    right: "1.75rem",
                    top: 0,
                    zIndex: 4,
                  }}
                />
              )}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default WorksStyle1;
