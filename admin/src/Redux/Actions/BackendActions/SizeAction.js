export const editSize = (sizeId) => {
    return {
        type: "EDIT_SIZE",
        payload: {
            data: sizeId
        }
    }
}