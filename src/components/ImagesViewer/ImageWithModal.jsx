import React from "react";
import windowdemensions from "../../core/util/windowdemensions.js";
import './ImageWithModal.less';

const ImageWithModal = ({ imgSrc }) => {
  
  const [isOpen, setIsOpen] = React.useState(false);

  const handleShowDialog = () => {
    setIsOpen(!isOpen);
  };
  const containerHeight = Math.floor(windowdemensions.getContentHeight()*0.90);
  const containerWidth = Math.floor(windowdemensions.getContentWidth()*0.53);
  const dialogHeight = { 
    height: `${containerHeight}px`, 
    width: `${containerWidth}px`, 
    position: "absolute",
    overflow: 'auto'
  };

  return (
    <div>
      <img
        className="image-with-modal-small"
        src={imgSrc}
        onClick={handleShowDialog}
        alt="no image"
      />
      {isOpen && (
        <dialog
          className="image-with-modal-dialog"
          style={dialogHeight}
          open
          onClick={handleShowDialog}
        >
          <img height='100%'
            className="image-with-modal-image"
            src={imgSrc}
            onClick={handleShowDialog}
            alt="no image"
          />
        </dialog>
      )}
    </div>
  );
}

export default ImageWithModal;