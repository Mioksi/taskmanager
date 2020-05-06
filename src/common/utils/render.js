import {Place} from '../consts';

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const renderPlace = {
  'afterbegin': (container, component) => container.prepend(component.getElement()),
  'beforeend': (container, component) => container.append(component.getElement())
};

export const render = (container, component, place = Place.BEFOREEND) => {
  renderPlace[place](container, component);
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
