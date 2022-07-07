export const getCreators = async () => {
    try {
        const response = await fetch("/api/creators/");
        const creatorsJson = await response.json();
        return creatorsJson;
    }
    catch (err) {
        console.error(err);
    }
}