const getCheckedDay = (day, repeatingDays) => repeatingDays[day] ? `checked` : ``;

const createRepeatDay = (day, index, repeatingDays) => (
  `<input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${day}-${index}"
    name="repeat"
    value="${day}"
    ${getCheckedDay(day, repeatingDays)}
  />
  <label class="card__repeat-day" for="repeat-${day}-${index}">
    ${day}
  </label>`
);

const createRepeatingDaysMarkup = (days, repeatingDays) => {
  return days.map((day, index) => createRepeatDay(day, index, repeatingDays)).join(``);
};

export {createRepeatingDaysMarkup};
