const initialState = {
    payload: []
}


const SizeDataChange = (state = initialState, action) => {
    switch (action.type) {
        case "EDIT_SIZE":
            const { data } = action.payload
            return {
                payload: data
            }

        default:
            return state
    }
}

export default SizeDataChange 