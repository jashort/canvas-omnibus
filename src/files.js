
export async function getDirectories(basePath) {
    return fetch(basePath)
            .then(response => response.text())
            .then(text => findLinks(basePath, text))
}

export async function getFiles(path) {
    return fetch(path)
        .then(response => response.text())
        .then(text => findImages(path, text));
}

function findLinks(path, pageBody) {
    let tmpPath = path;
    if (tmpPath.endsWith("/")) {
        tmpPath = tmpPath.substr(0, tmpPath.length-1);
    }
    const fragment = document.createElement('div');
    fragment.innerHTML = pageBody;

    const links = fragment.getElementsByTagName('a');
    const output = [];

    for (let i=0; i<links.length; i++) {
        if (links.item(i).text !== '../') {
            let href = links.item(i).href;
            const url = new URL(href);
            if (!url.pathname.startsWith(path)) {
                output.push(tmpPath + url.pathname);
            } else {
                output.push(url.pathname);
            }
        }
    }
    return output;
}

function findImages(path, pageBody) {
    let tmpPath = path;
    if (tmpPath.endsWith("/")) {
        tmpPath = tmpPath.substr(0, tmpPath.length-1);
    }
    const fragment = document.createElement('div');
    fragment.innerHTML = pageBody;

    const links = fragment.getElementsByTagName('a');
    const output = [];

    for (let i=0; i<links.length; i++) {
        if (links.item(i).text !== '../') {
            const url = new URL(links.item(i).href);
            const lower = url.pathname.toLowerCase();
            if (lower.endsWith('.png') ||
                lower.endsWith('.jpg') ||
                lower.endsWith('.jpeg') ||
                lower.endsWith('.webm') ||
                lower.endsWith('gif')) {

                if (!url.pathname.startsWith(tmpPath)) {
                    output.push(tmpPath + url.pathname)
                } else {
                    output.push(url.pathname);
                }
            }
        }
    }
    return output;
}