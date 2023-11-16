const initialState = {
    payload: []
}


const OffersDataChange = (state = initialState, action) => {
    switch (action.type) {
        case "EDIT_OFFERS":
            const { data } = action.payload
            return {
                payload: data
            }

        default:
            return state
    }
}

export default  OffersDataChange 