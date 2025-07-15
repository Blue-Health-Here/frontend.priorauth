const RenderFilePreview: React.FC<any> = ({ file, isLarge, selectedItem, handleSelectFile }) => {
    if (!file.url) return null;

    const containerClass = isLarge
        ? 'w-full h-96 bg-secondary-background rounded-theme-r flex items-center justify-center overflow-hidden cursor-pointer border-2 border-gray-200'
        : 'w-full h-60 bg-secondary-background rounded-theme-r flex items-center justify-center overflow-hidden cursor-pointer border-2 border-gray-200';

    if (file.type.startsWith('image/') || file.mimeType.startsWith('image/')) {
        return (
            <div key={file.id} onClick={() => handleSelectFile(file)} 
                className={selectedItem.name === file.name ? containerClass + ' relative border-primary-sky-blue' : containerClass + ' relative'}>
                <img src={file.url} alt={file.name} className="max-h-full max-w-full object-cover h-full w-full" />
                <p className="absolute bottom-0 left-0 right-0 p-2 text-center bg-white ">
                    <span className="font-medium text-xs line-clamp-1 text-secondary-black">{file.name}</span>
                </p>
                <a href={file.url} target="_blank" className="cursor-pointer bg-white z-10 p-1.5 border rounded-sm border-blue-navigation-link-button absolute top-4 right-4">
                    <img src="/formkit_expand.svg" alt="expand button" className="w-4" />
                </a>
            </div>
        );
    } else if (file.type === 'application/pdf' || file.mimeType === 'application/pdf') {
        return (
            <div key={file.id} onClick={() => handleSelectFile(file)} 
                className={selectedItem.name === file.name ? containerClass + ' relative border-primary-sky-blue' : containerClass + ' relative'}>
                {file.file ? (
                    <img src={file.url} alt={file.name} className="max-h-full max-w-full object-cover h-full" />
                ) : <iframe src={file.url} name="iframe_all" height="100%" width="100%"></iframe>}
                <p className="absolute bottom-0 left-0 right-0 p-2 text-center bg-white ">
                    <span className="font-medium text-xs line-clamp-1 text-secondary-black">{file.name}</span>
                </p>
                <a href={file.file ? URL.createObjectURL(file.file) : file.url} target="_blank" className="cursor-pointer bg-white z-10 p-1.5 border rounded-sm border-blue-navigation-link-button absolute top-4 right-4">
                    <img src="/formkit_expand.svg" alt="expand button" className="w-4" />
                </a>
            </div>
        );
    } else if (file.type.startsWith('text/') || file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return (
            <div key={file.id} onClick={() => handleSelectFile(file)} 
                className={selectedItem.name === file.name ? containerClass + ' relative border-primary-sky-blue' : containerClass + ' relative'}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <p className="absolute bottom-0 left-0 right-0 p-2 text-center bg-white ">
                    <span className="font-medium text-xs line-clamp-1 text-secondary-black">{file.name}</span>
                </p>
                <a href={file.url} target="_blank" className="cursor-pointer bg-white z-10 p-1.5 border rounded-sm border-blue-navigation-link-button absolute top-4 right-4">
                    <img src="/formkit_expand.svg" alt="expand button" className="w-4" />
                </a>
            </div>
        );
    } else {
        return (
            <div key={file.id} onClick={() => handleSelectFile(file)} 
                className={selectedItem.name === file.name ? containerClass + ' relative border-primary-sky-blue' : containerClass + ' relative'}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <p className="absolute bottom-0 left-0 right-0 p-2 text-center bg-white ">
                    <span className="font-medium text-xs line-clamp-1 text-secondary-black">{file.name}</span>
                </p>
                <a href={file.url} target="_blank" className="cursor-pointer bg-white z-10 p-1.5 border rounded-sm border-blue-navigation-link-button absolute top-4 right-4">
                    <img src="/formkit_expand.svg" alt="expand button" className="w-4" />
                </a>
            </div>
        );
    }
};

export default RenderFilePreview;