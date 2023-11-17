const getFreePage = (browserPool) => {
    for (let i = 0; i < browserPool.length; i++) {
        for (let j = 0; i < browserPool[i].pages.length; j++) {
            if (!browserPool[i].pages[j].inUse) {
                browserPool[i].pages[j].inUse = true;
                return browserPool[i].pages[j];
            }
        }
    }

    console.log("page not available");
    return false;
};

export default getFreePage;
