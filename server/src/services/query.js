const DEFAULT_PAGE_NO = 1;
const DEFAULT_PAGE_LIMIT = 0;

function getPagination(query) {
    const limit = Math.abs(query['limit']) || DEFAULT_PAGE_LIMIT; // string -> number
    const page = Math.abs(query['page']) || DEFAULT_PAGE_NO;

    const skip = (page - 1) * limit;
    return { skip, limit };
}

module.exports = {
    getPagination
}