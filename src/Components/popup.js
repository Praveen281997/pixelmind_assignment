import React from "react";
import "./popupstyle.css";

function Popup(props) {
  return (
    <div class="backdrop">
      <div class="modal">
        <div class="modal-content">
          <span class="close" onClick={props.close}>
            &times;
          </span>
          <p>SUCCESS</p>
        </div>
      </div>
    </div>
  );
}

export default Popup;
