interface IOnboardingPageState {
    currentPageNumber: number,
    currentPage?: any,
    slides: React.ReactElement[],
    lastTouchMousePositionX?: number,
    hasMovedPagesThisTouch: boolean
};


export default IOnboardingPageState;


