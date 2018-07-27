
export const navigateTo = (url) => {
    window.location.href = url.startsWith('.') ? window.location.origin + url.substr(1) 
                                                : url;
}