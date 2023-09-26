import React from "react";

import "./KoFi.css";

interface KofiProp {
    color: string,
    id: string,
    label: string
}
const Kofi: React.FC<KofiProp> = (props) => {
    return (
        <div className="btn-container">
          <a
            title={props.label}
            className="kofi-button"
            style={{ backgroundColor: props.color }}
            href={"https://ko-fi.com/" + props.id}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="kofitext">
              <img
                src="https://ko-fi.com/img/cup-border.png"
                className="kofiimg"
                alt="Ko-Fi button"
              />
              {props.label}
            </span>
          </a>
        </div>
      );
}

export default Kofi;