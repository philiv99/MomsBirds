import React from 'react';
import './Modal.less';

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
            <div className="modal-buttons">
                <button onClick={handleClose}><i className="fa fa-times-circle"></i></button>
            </div>
          {children}
        </section>
      </div>
    );
  };

  export default Modal;