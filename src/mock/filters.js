export const filterNames = [
  {
    name: `all`,
    isChecked: true
  },
  {
    name: `overdue`,
    isChecked: false
  },
  {
    name: `today`,
    isChecked: false
  },
  {
    name: `favorites`,
    isChecked: false
  },
  {
    name: `repeating`,
    isChecked: false
  },
  {
    name: `archive`,
    isChecked: false
  },
];

const generateFilters = () => filterNames.map((filter) => {
  const {name, isChecked} = filter;

  return {
    name,
    isChecked,
    count: Math.floor(Math.random() * 10),
  };
});

export {generateFilters};
