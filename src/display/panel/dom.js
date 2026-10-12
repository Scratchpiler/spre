export function h(tag, props = {}, ...children) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(props ?? {})) {
        if (value === undefined || value === null || value === false) continue;
        if (key === 'class') element.className = value;
        else if (key === 'style') Object.assign(element.style, value);
        else if (key === 'dataset') Object.assign(element.dataset, value);
        else if (key.startsWith('on') && typeof value === 'function') element.addEventListener(key.slice(2).toLowerCase(), value);
        else if (key === 'html') element.innerHTML = value;
        else if (value === true) element.setAttribute(key, '');
        else element.setAttribute(key, value);
    }
    append(element, children);
    return element;
}

export function append(parent, children) {
    for (const child of children.flat(Infinity)) {
        if (child === null || child === undefined || child === false) continue;
        parent.append(child instanceof Node ? child : document.createTextNode(String(child)));
    }
    return parent;
}

export function replaceChildren(parent, ...children) {
    parent.replaceChildren();
    return append(parent, children);
}

export const formatValue = value => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object' && 'length' in value) return `${value.length} item${value.length === 1 ? '' : 's'}`;
    return String(value);
};
