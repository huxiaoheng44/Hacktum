import React, { useState } from "react";
import CraftCard from "../components/CraftCard";
import { Responsive, WidthProvider } from "react-grid-layout";
import { createPortal } from "react-dom";

import "./CraftCardBoard.css";

const CraftcardBoard = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [modalContent, setModalContent] = useState(null);

  const handleShowModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const modal = isModalVisible ? (
    <div onClick={(e) => e.stopPropagation()}>{modalContent}</div>
  ) : null;

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const craftsmen = props.craftsmen;

  const cols = { lg: 8, md: 8, sm: 8, xs: 8, xxs: 4 };

  const genLayouts = {
    lg: generatedLayout(craftsmen, cols.lg),
    md: generatedLayout(craftsmen, cols.md),
    sm: generatedLayout(craftsmen, cols.sm),
    xs: generatedLayout(craftsmen, cols.xs),
    xxs: generatedLayout(craftsmen, cols.xxs),
  };

  const margin = {
    lg: [30, 30],
    md: [20, 20],
    sm: [15, 15],
    xs: [15, 15],
    xxs: [15, 15],
  };

  return (
    <div className="craftBoard-container">
      <ResponsiveGridLayout
        className="gridlayout"
        layouts={genLayouts}
        breakpoints={{ lg: 1200, md: 996, sm: 900, xs: 780, xxs: 0 }}
        cols={cols}
        margin={margin}
        rowHeight={40}
      >
        {craftsmen.length > 0 ? (
          craftsmen.map((craftsman, index) => (
            <div key={index}>
              <CraftCard
                id={craftsman.id}
                name={craftsman.name}
                rankingScore={Number(craftsman.profilePictureScore)}
                distance={(craftsman.distance / 1000).toFixed(1)}
                onShowModal={handleShowModal}
                onCloseModal={handleCloseModal}
              />
            </div>
          ))
        ) : (
          <p>No craftsmen yet</p>
        )}
      </ResponsiveGridLayout>
      {isModalVisible && createPortal(modal, document.body)}
    </div>
  );
};

function generatedLayout(craftsmen, col_num) {
  let setH = 4;
  let setW = 4;

  if (col_num === 12) {
    setW = 4;
  } else if (col_num === 9 || col_num === 6 || col_num === 3) {
    setW = 3;
  } else if (col_num === 8 || col_num === 4) {
    setW = 4;
  }

  return craftsmen.map((craftsman, index) => {
    let x = (index * setW) % col_num;
    let y = Math.floor((index * setW) / col_num) * setH;

    return {
      x: x,
      y: y,
      w: setW,
      h: setH,
      i: index.toString(),
      static: true,
    };
  });
}

export default CraftcardBoard;
