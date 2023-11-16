export const editColor = (colorId) => {
    return {
        type: "EDIT_COLOR",
        payload: {
            data: colorId
        }
    }
}