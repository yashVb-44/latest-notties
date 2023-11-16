const initialState = {
    payload: []
}


const ColorDataChange = (state = initialState, action) => {
    switch (action.type) {
        case "EDIT_COLOR":
            const { data } = action.payload
            return {
                payload: data
            }

        default:
            return state
    }
}

export default ColorDataChange 