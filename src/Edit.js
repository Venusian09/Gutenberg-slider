import {
  TextControl,
  Button,
  Icon,
  PanelBody,
  PanelRow,
  ColorPicker,
  ToggleControl,
  RangeControl,
} from "@wordpress/components";
import {
  InspectorControls,
  BlockControls,
  BlockAlignmentToolbar,
} from "@wordpress/block-editor";

function Edit(props) {
  const slides = props.attributes.slides;
  const pagination = props.attributes.pagination;
  function addNewSlide() {
    props.setAttributes({
      slides: slides.concat([""]),
    });
  }

  function slideTitle(index, newValue) {
    const newTitles = slides.concat([]);
    newTitles[index] = {
      title: newValue,
      description: slides[index].description,
      bgColor: slides[index].bgColor,
      bgImage: slides[index].bgImage,
    };
    props.setAttributes({ slides: newTitles });
  }

  function slideDesc(index, newValue) {
    const newDescriptions = slides.concat([]);
    newDescriptions[index] = {
      title: slides[index].title,
      description: newValue,
      bgColor: slides[index].bgColor,
      bgImage: slides[index].bgImage,
    };
    props.setAttributes({ slides: newDescriptions });
  }

  function changeBgColor(index, newValue) {
    const newBgColor = slides.concat([]);
    newBgColor[index] = {
      title: slides[index].title,
      description: slides[index].description,
      bgColor: newValue.hex,
      bgImage: slides[index].bgImage,
    };
    props.setAttributes({ slides: newBgColor });
  }

  function deleteSlide(indexToDelete) {
    const newSlides = props.attributes.slides.filter(function (x, index) {
      return index != indexToDelete;
    });
    props.setAttributes({ slides: newSlides });
  }
  return (
    <div>
      <BlockControls>
        <BlockAlignmentToolbar
          value={props.attributes.theAligment}
          onChange={(newValue) =>
            props.setAttributes({ theAligment: newValue })
          }
        />
      </BlockControls>
      <InspectorControls>
        <PanelBody title="Slider settings">
          <PanelRow>
            <ToggleControl
              label="Pagination"
              checked={props.attributes.pagination}
              onChange={() => props.setAttributes({ pagination: !pagination })}
            />
          </PanelRow>
          <PanelRow>
            <RangeControl
              label="Slides Per View"
              step={1}
              withInputField={false}
              min={1}
              max={3}
              value={props.attributes.slidesPerView}
              onChange={(newValue) =>
                props.setAttributes({ slidesPerView: newValue })
              }
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      {slides.map((slide, index) => {
        return (
          <div className="single-slide">
            <TextControl
              label="Set title"
              value={slide.title}
              onChange={(newValue) => slideTitle(index, newValue)}
            />
            <TextControl
              label="Set description"
              value={slide.description}
              onChange={(newValue) => slideDesc(index, newValue)}
            />
            <div className="pick-bg">
              <div className="component">
                <label class="component__label">Choose overlay color</label>
                <ColorPicker
                  color={slide.bgColor}
                  onChangeComplete={(newValue) =>
                    changeBgColor(index, newValue)
                  }
                />
              </div>
            </div>

            <Button onClick={() => deleteSlide(index)} className="delete-slide">
              <Icon icon="trash" />
            </Button>
          </div>
        );
      })}
      <Button className="primary-btn" onClick={addNewSlide}>
        Add new slide
      </Button>
    </div>
  );
}

export default Edit;
