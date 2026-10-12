export function fixupSvgString(input) {
    let svg = input;
    const svgAttrs = svg.match(/<svg [^>]*>/);
    if (svgAttrs && svgAttrs[0].indexOf('xmlns=') === -1) {
        svg = svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
    }
    if (svgAttrs && svgAttrs[0].indexOf('&ns_') !== -1 && svg.indexOf('<!DOCTYPE') === -1) {
        svg = svg.replace(svgAttrs[0], svgAttrs[0].replace(/&ns_[^;]+;/g, 'http://ns.adobe.com/Extensibility/1.0/'));
    }
    if (svg.includes('data:img/png')) {
        svg = svg.replace(/(<image[^>]+?xlink:href=["'])data:img\/png/g, ($0, $1) => `${$1}data:image/png`);
    }
    const xmlnsRegex = /(<[^>]+?xmlns:(?!xml=)[^ ]+=)"http:\/\/www.w3.org\/XML\/1998\/namespace"/g;
    if (svg.match(xmlnsRegex) !== null) svg = svg.replace(xmlnsRegex, ($0, $1) => `${$1}"http://dummy.namespace"`);
    svg = svg.replace(/<(\/?)\s*svg:/g, '<$1');
    svg = svg.replace(/<metadata>[\s\S]*<\/metadata>/, '<metadata></metadata>');
    svg = svg.replace(/<script[\s\S]*>[\s\S]*<\/script>/, '<script></script>');
    return svg;
}
