export const getDrakenIMeanKraken = (html: string) => {
    const htmlShii = new HTMLRewriter();
    const dataSrcs= new Set<string>()

    htmlShii.on('#my-video', {
        element(el) {
            const dataSrc = el.getAttribute('data-src-url');
            if (dataSrc) {
                dataSrcs.add(dataSrc);
            }
        }
    });

    ( htmlShii.transform(html))

    return [...dataSrcs.values()]
}