interface OnboardingPageState {
    currentPageNumber: number,
    currentPage?: any,
    pages: React.ReactElement[],
    lastTouchMousePositionX?: number,
    hasMovedPagesThisTouch: boolean
};


export default OnboardingPageState;


