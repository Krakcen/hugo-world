export const setNavActive = (tab) => {
    return {
        type: 'SET_NAV_ACTIVE',
        payload: tab,
    };
};


//SET_IMG_LOAD_ABOUT
//SET_IMG_LOAD_JUMBO
export const setImageLoad = (type, imageState) => {
    return {
        type: type,
        payload: imageState,
    };
};

export const setJumboLoad = (jumboState) => {
    return {
        type: 'SET_JUMBO_LOAD',
        payload: jumboState,
    };
};

export const setJumboImageProgress = (progress) => {
    return {
        type: 'SET_JUMBO_IMAGE_PROGRESS',
        payload: progress,
    };
};
