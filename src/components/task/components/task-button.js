const getButtonStatus = (isActive) => isActive ? `` : `card__btn--disabled`;

const createTaskButton = (name, isActive = true) => {
  return (
    `<button
      type="button"
      class="card__btn card__btn--${name} ${getButtonStatus(isActive)}"
    >
      ${name}
    </button>`
  );
};

export {createTaskButton};
