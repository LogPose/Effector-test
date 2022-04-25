import React from "react";
import "../general/styles.css";

interface BlockProps {
  activeTab: "chars" | "planets";
}

export const CurrentBlock: React.FC<BlockProps> = ({ activeTab }) => {
  return (
    <>
      <div className="jedi_photo">
        <img src="" alt="" />
      </div>
      <div className="jedi_info">
        <div className="info_line">
          <span className="jedi_info_text">Name: </span>
          <span className="jedi_info_text"></span>
        </div>
        <div className="info_line">
          <span className="jedi_info_text">Birth date: </span>
          <span className="jedi_info_text"></span>
        </div>
      </div>
    </>
  );
};
