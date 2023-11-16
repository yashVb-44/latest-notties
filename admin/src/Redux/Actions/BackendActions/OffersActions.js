export const editOffer = (offerId) => {
    return {
        type: "EDIT_OFFERS",
        payload: {
            data: offerId
        }
    }
}