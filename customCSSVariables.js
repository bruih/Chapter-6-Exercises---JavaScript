//contains the elements, properties, values from the CSS to pass into JavaScript and vice versa.

export function getCSSVar(elem, prop) { //for getting the properties of css
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0  //if no numbers present on the property, default the value to 0.
}

export function setCSSVar(elem, prop, value) { //for setting custom variables in the properties
  elem.style.setProperty(prop, value)
}

export function addCSSVar(elem, prop, inc) { //function to combines the other functions above.
  setCSSVar(elem, prop, getCSSVar(elem, prop) + inc) //getting the values of the properties and adding it with a custom increment.
}
