const getCheckedColor = (color, currentColor) => currentColor === color ? `checked` : ``;

const createColor = (color, currentColor) => (
  `<input
    type="radio"
    id="color-${color}"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${getCheckedColor(color, currentColor)}
  />
  <label
    for="color-${color}"
    class="card__color card__color--${color}"
    >${color}</label
  >`
);

const createColorsMarkup = (colors, currentColor) => {
  return colors.map((color) => createColor(color, currentColor)).join(``);
};

export {createColorsMarkup};
