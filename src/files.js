
export async function getDirectories(basePath) {
    return fetch(basePath)
            .then(response => response.text())
            .then(text => findLinks(basePath, text))
}

export async function getLinks(path) {
    return fetch(path)
        .then(response => response.text())
        .then(text => findLinks(path, text))
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
            const url = new URL(links.item(i));
            let link = url.pathname;
            let fullURI = url.pathname;
            if (!fullURI.startsWith(tmpPath)) {
                fullURI = tmpPath + fullURI
            }
            const lower = link.toLowerCase();
            if (link.endsWith('/') && link.length > 1) {                // Directory
                output.push({type: 'directory', name: decodeURI(link), link: fullURI})
            } else {                                                    // File
                if (lower.endsWith('.png') ||
                    lower.endsWith('.jpg') ||
                    lower.endsWith('.jpeg') ||
                    lower.endsWith('.webm') ||
                    lower.endsWith('gif')) {
                    output.push({type: 'image', name: decodeURI(url), url: fullURI})
                } else if (lower.endsWith(('.txt')))  {
                    output.push({type: 'document', name: decodeURI(url), link: fullURI})
                }
            }
        }
    }
    return output;
}