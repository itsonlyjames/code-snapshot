(() => {
    const snippetContainerNode  = document.getElementById('snippet-container');
    const snippetNode           = document.getElementById('snippet');
    const codeNode              = snippetNode.querySelector('code');
    const sizeNode              = document.getElementById('size');
    const shootNode             = document.getElementById('shoot');

    window.addEventListener('message', e => {
        switch(e.data.type) {
            case 'updateCode':
                document.execCommand('paste')
            break;
        }
    });

    document.addEventListener('paste', event => {
        const code = event.clipboardData.getData('text/html')
        codeNode.innerHTML = code
    });

    shootNode.addEventListener('click', e => {
        snippetContainerNode.style.resize = 'none',
        snippetNode.style.resize = 'none',

        domtoimage.toBlob(snippetContainerNode, {
            width: snippetContainerNode.offsetWidth * 2,
            height: snippetContainerNode.offsetHeight * 2,
            style: {
                'transform': 'scale(2)',
                'transform-origin': 'center',
                'background': '#e0eafc',
                'background': 'linear-gradient(to left, #e0eafc, #cfdef3);'
            }
        })
        .then(function (blob) {
            snippetContainerNode.style.resize = '',
            snippetNode.style.resize = '',
            window.saveAs(blob, 'code-snapshot.png');
        });
    });

    if (ResizeObserver) {
        const resizeObserver = new ResizeObserver(entries => {
            let w = Math.round(entries[0].contentRect.width);
            let h = Math.round(entries[0].contentRect.height);

            sizeNode.textContent = w + "x" + h;
        });

        resizeObserver.observe(snippetNode);
    }
})();