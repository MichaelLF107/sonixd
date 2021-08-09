import React from 'react';
import '../../styles/Titlebar.global.css';

const Titlebar = () => {
  return (
    <header id="titlebar">
      <div id="drag-region">
        <div id="window-title">
          <span>{document.title}</span>
        </div>
        <div id="window-controls">
          <div className="button" id="min-button">
            <img
              className="icon"
              srcSet="img/icons/min-w-10.png 1x, img/icons/min-w-12.png 1.25x, img/icons/min-w-15.png 1.5x, img/icons/min-w-15.png 1.75x, img/icons/min-w-20.png 2x, img/icons/min-w-20.png 2.25x, img/icons/min-w-24.png 2.5x, img/icons/min-w-30.png 3x, img/icons/min-w-30.png 3.5x"
              draggable="false"
              alt=""
            />
          </div>

          <div className="button" id="max-button">
            <img
              className="icon"
              srcSet="img/icons/max-w-10.png 1x, img/icons/max-w-12.png 1.25x, img/icons/max-w-15.png 1.5x, img/icons/max-w-15.png 1.75x, img/icons/max-w-20.png 2x, img/icons/max-w-20.png 2.25x, img/icons/max-w-24.png 2.5x, img/icons/max-w-30.png 3x, img/icons/max-w-30.png 3.5x"
              draggable="false"
              alt=""
            />
          </div>

          <div className="button" id="restore-button">
            <img
              className="icon"
              srcSet="img/icons/restore-w-10.png 1x, img/icons/restore-w-12.png 1.25x, img/icons/restore-w-15.png 1.5x, img/icons/restore-w-15.png 1.75x, img/icons/restore-w-20.png 2x, img/icons/restore-w-20.png 2.25x, img/icons/restore-w-24.png 2.5x, img/icons/restore-w-30.png 3x, img/icons/restore-w-30.png 3.5x"
              draggable="false"
              alt=""
            />
          </div>

          <div className="button" id="close-button">
            <img
              className="icon"
              srcSet="img/icons/close-w-10.png 1x, img/icons/close-w-12.png 1.25x, img/icons/close-w-15.png 1.5x, img/icons/close-w-15.png 1.75x, img/icons/close-w-20.png 2x, img/icons/close-w-20.png 2.25x, img/icons/close-w-24.png 2.5x, img/icons/close-w-30.png 3x, img/icons/close-w-30.png 3.5x"
              draggable="false"
              alt=""
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Titlebar;