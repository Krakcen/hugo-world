export const setNavActive = (tab) => {
    return {
        type: 'SET_NAV_ACTIVE',
        payload: tab,
    };
};


//SET_IMG_LOAD_ABOUT
export const setImageLoad = (type, imageState) => {
    return {
        type: type,
        payload: imageState,
    };
};