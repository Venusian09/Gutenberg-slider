import Edit from "./Edit.js";

import "./index.scss";
wp.blocks.registerBlockType("customplugin/gutenbergslider", {
  title: "Gutenberg slider",
  icon: "slides",
  category: "common",
  attributes: {
    slides: {
      type: "array",
      default: [
        {
          title: "test title",
          description: "test desc",
          bgColor: "#EBEBEB",
          bgImage: "/wp-content/uploads/2022/08/meowsalot.jpg",
        },
      ],
    },
    pagination: {
      type: "boolean",
      default: true,
    },
    slidesPerView: {
      type: "number",
      default: 1,
    },
    theAligment: {
      type: "string",
      default: "left",
    },
  },
  example: {
    attributes: {
      slides: [
        {
          title: "elo",
          description: "witam",
          bgColor: "#313131",
        },
      ],
      pagination: true,
      slidesPerView: 1,
      theAligment: "center",
    },
  },
  edit: Edit,
  save: SaveSlide,
});

function SaveSlide(props) {
  const slides = props.attributes.slides;
  return (
    <div className="slides" data-json={JSON.stringify(props.attributes)}></div>
  );
}
