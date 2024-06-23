function newElement({
    elementName,
    id,
    className,
    type,
    min,
    max,
    innerHTML,
    parent,
    child,
    children,
    src,
    placeholder,
    value,
    disabled
}) {
    const element = document.createElement(elementName);
    if (className !== undefined)    element.className = className;
    if (placeholder !== undefined)  element.placeholder = placeholder;
    if (value !== undefined)        element.value = value;
    if (disabled !== undefined)     element.disabled = disabled;
    if (id !== undefined)           element.id = id;
    if (type !== undefined)         element.type = type;
    if (min !== undefined)          element.min = min;
    if (max !== undefined)          element.max = max;
    if (src !== undefined)          element.src = src;
    if (innerHTML !== undefined)    element.innerHTML = (innerHTML === undefined) ? "" : innerHTML;
    if (child !== undefined)        element.appendChild(child);
    if (children !== undefined)
        children.forEach(child => element.appendChild(child));
    if (parent !== undefined)       parent.appendChild(element);
    return element;
}

export {
    newElement
}