export function resizeImage(url, width = 400, height = 300) {
    if (!url || !url.startsWith('http')) {
        return url;
    }
    //return `${url}?height=${height}&width=${width}`
    return url
}
