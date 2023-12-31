import React from 'react'

const WalletCoinSettings = ({
    minWalletAmount,
    setMinWalletAmount,
    minCoinsAmount,
    setMinCoinsAmount,
    CoinsAmount,
    setCoinsAmount,
    setReviewAmount,
    reviewAmount,
    minWalletAmountforOrder,
    setMinWalletAmountforOrder,
    userOrderCoins,
    setUserOrderCoins,
    senderCoinsAtOrder,
    setSenderCoinsAtOrder,
    senderWalletAtOrder,
    setSenderWalletAtOrder,
}) => {
    return (
        <>
            <div className="mb-3 row">
                <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                >
                    Minimum Amount for Add in wallet :-
                </label>
                <div className="col-md-10">
                    <input
                        min={1}
                        className="form-control"
                        type="number"
                        id="example-number-input"
                        value={minWalletAmount}
                        onChange={(e) => {
                            setMinWalletAmount(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                >
                    Minimum Amount for coins withdrawal in wallet :-
                </label>
                <div className="col-md-10">
                    <input
                        min={1}
                        className="form-control"
                        type="number"
                        id="example-number-input"
                        value={minCoinsAmount}
                        onChange={(e) => {
                            setMinCoinsAmount(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                >
                    Minus Wallet Amount for Order :-
                </label>
                <div className="col-md-10">
                    <input
                        className="form-control"
                        type="number"
                        id="example-number-input"
                        value={minWalletAmountforOrder}
                        onChange={(e) => {
                            setMinWalletAmountforOrder(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                >
                    Review Reward Amount :-
                </label>
                <div className="col-md-10">
                    <input
                        min={1}
                        className="form-control"
                        type="number"
                        id="example-number-input"
                        value={reviewAmount}
                        onChange={(e) => {
                            setReviewAmount(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                >
                    Order Coins Reward :- <br></br>
                    (For User)
                </label>
                <div className="col-md-10">
                    <input
                        min={0}
                        className="form-control"
                        type="number"
                        id="example-number-input"
                        value={userOrderCoins}
                        onChange={(e) => {
                            setUserOrderCoins(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                >
                    Order Coins Reward :- <br></br>
                    (For Sender)
                </label>
                <div className="col-md-10">
                    <input
                        min={0}
                        className="form-control"
                        type="number"
                        id="example-number-input"
                        value={senderCoinsAtOrder}
                        onChange={(e) => {
                            setSenderCoinsAtOrder(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                >
                    Order Wallet Reward Amount :- <br></br>
                    (For User)
                </label>
                <div className="col-md-10">
                    <input
                        min={0}
                        className="form-control"
                        type="number"
                        id="example-number-input"
                        value={senderWalletAtOrder}
                        onChange={(e) => {
                            setSenderWalletAtOrder(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                >
                    Coins Per Amount :- <br></br>
                    (ex. 2 coins = 1₹)
                </label>
                <div className="col-md-10">
                    <input
                        min={1}
                        className="form-control"
                        type="number"
                        id="example-number-input"
                        value={CoinsAmount}
                        onChange={(e) => {
                            setCoinsAmount(e.target.value);
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default WalletCoinSettings
