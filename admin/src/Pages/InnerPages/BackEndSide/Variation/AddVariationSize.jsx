import React, { useEffect, useState } from 'react';
import axios from 'axios';
let url = process.env.REACT_APP_API_URL;

const AddVariationSize = ({ variationId, handleCloseModal, handleSizeAdd }) => {
    const adminToken = localStorage.getItem('token');

    const [sizes, setSizes] = useState([])

    useEffect(() => {

        async function getSize() {

            try {
                const res = await axios.get(`${url}/product/size/get`,
                    {
                        headers: {
                            Authorization: `${adminToken}`,
                        },
                    }
                );

                setSizes(res?.data?.size || []);
            } catch (error) {
            }
        }

        getSize()
    }, []);

    const [size, setSize] = useState('');
    const [stock, setStock] = useState('');
    const [discPrice, setDiscPrice] = useState(0)
    const [userPrice, setuserPrice] = useState(0)
    const [R1Price, setR1Price] = useState(0)
    const [R2Price, setR2Price] = useState(0)
    const [R3Price, setR3Price] = useState(0)
    const [R4Price, setR4Price] = useState(0)
    const [R1MinQuan, setR1MinQuan] = useState(0)
    const [R2MinQuan, setR2MinQuan] = useState(0)
    const [R3MinQuan, setR3MinQuan] = useState(0)
    const [R4MinQuan, setR4MinQuan] = useState(0)

    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleAddSize = async (e) => {
        e.preventDefault();
        setLoading(true)
        setButtonDisabled(true)

        try {
            // Send the new size data to the server
            const response = await axios.post(`${url}/product/variation/add/size/${variationId}`, {
                Size_Name: size,
                Size_Stock: stock,
                Disc_Price: discPrice,
                R0_Price: userPrice,
                R1_Price: R1Price,
                R2_Price: R2Price,
                R3_Price: R3Price,
                R4_Price: R4Price,
                R1_Min_Quantity: R1MinQuan,
                R2_Min_Quantity: R2MinQuan,
                R3_Min_Quantity: R3MinQuan,
                R4_Min_Quantity: R4MinQuan,
            }, {
                headers: {
                    Authorization: `${adminToken}`,
                },
            });

            if (response?.data?.type === 'success') {
                handleSizeAdd(response.data.size);
                handleCloseModal();
            } else {
                console.log('Error adding size:', response?.data?.message);
            }
        } catch (error) {
            // Handle any other errors that may occur during the API call
            console.log('Error adding size:', error);
        } finally {
            setLoading(false)
            setButtonDisabled(false)
        }
    };

    return (
        <div className="main-content-model dark">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card model-card">
                                <div className="card-body">
                                    <div className="page-title-box d-flex align-items-center justify-content-between">
                                        <h4 className="mb-0">Add New Size</h4>
                                        {loading && <div className="loader">Loading...</div>}
                                        <i
                                            className="fas fa-window-close"
                                            style={{ cursor: 'pointer', color: 'red' }}
                                            onClick={handleCloseModal}
                                        ></i>
                                    </div>
                                    <form onSubmit={handleAddSize}>
                                        <div className="mb-3 row">
                                            <label htmlFor="example-text-input" className="col-md-1 col-form-label mt-3">
                                                Size:
                                            </label>
                                            <div className="col-md-2">
                                                Size
                                                <select
                                                    required
                                                    className="form-select"
                                                    id="subcategory-select"
                                                    value={size}
                                                    onChange={(e) => setSize(e.target.value)}
                                                >
                                                    <option value="">Select Size</option>
                                                    {sizes?.map((size => {
                                                        return (<option key={size?.name} value={size?.name}>{size?.name}</option>)
                                                    }))}
                                                </select>
                                            </div>
                                            <div className="col-md-2">
                                                Stock
                                                <input
                                                    min="0"
                                                    required
                                                    className="form-control"
                                                    type="number"
                                                    id="example-number-input"
                                                    value={stock}
                                                    placeholder='Add Stock'
                                                    onChange={(e) => setStock(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                Original Price
                                                <input
                                                    min="0"
                                                    required
                                                    className="form-control"
                                                    type="number"
                                                    id="example-number-input"
                                                    value={discPrice}
                                                    placeholder='Add Stock'
                                                    onChange={(e) => setDiscPrice(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label htmlFor="example-text-input" className="col-md-1 col-form-label mt-3">
                                                Min Quantity:
                                            </label>
                                            <div className="col-md-2">
                                                Premium Bulk Buyer
                                                <input
                                                    min="0"
                                                    required
                                                    className="form-control"
                                                    type="number"
                                                    id="example-number-input"
                                                    value={R1MinQuan}
                                                    // placeholder='Add Stock'
                                                    onChange={(e) => setR1MinQuan(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                Bulk Buyer
                                                <input
                                                    min="0"
                                                    required
                                                    className="form-control"
                                                    type="number"
                                                    id="example-number-input"
                                                    value={R2MinQuan}
                                                    // placeholder='Add Stock'
                                                    onChange={(e) => setR2MinQuan(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                Premium Reseller
                                                <input
                                                    min="0"
                                                    required
                                                    className="form-control"
                                                    type="number"
                                                    id="example-number-input"
                                                    value={R3MinQuan}
                                                    // placeholder='Add Stock'
                                                    onChange={(e) => setR3MinQuan(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                Reseller
                                                <input
                                                    min="0"
                                                    required
                                                    className="form-control"
                                                    type="number"
                                                    id="example-number-input"
                                                    value={R4MinQuan}
                                                    // placeholder='Add Stock'
                                                    onChange={(e) => setR4MinQuan(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label htmlFor="example-text-input" className="col-md-1 col-form-label mt-3">
                                                Price:
                                            </label>
                                            <div className="col-md-2">
                                                User Price
                                                <input
                                                    min="0"
                                                    required
                                                    className="form-control"
                                                    type="number"
                                                    id="example-number-input"
                                                    value={userPrice}
                                                    // placeholder='Add Stock'
                                                    onChange={(e) => setuserPrice(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                Premium Bulk Buyer
                                                <input
                                                    min="0"
                                                    required
                                                    className="form-control"
                                                    type="number"
                                                    id="example-number-input"
                                                    value={R1Price}
                                                    // placeholder='Add Stock'
                                                    onChange={(e) => setR1Price(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                Bulk Buyer
                                                <input
                                                    min="0"
                                                    required
                                                    className="form-control"
                                                    type="number"
                                                    id="example-number-input"
                                                    value={R2Price}
                                                    // placeholder='Add Stock'
                                                    onChange={(e) => setR2Price(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                Premium Reseller
                                                <input
                                                    min="0"
                                                    required
                                                    className="form-control"
                                                    type="number"
                                                    id="example-number-input"
                                                    value={R3Price}
                                                    // placeholder='Add Stock'
                                                    onChange={(e) => setR3Price(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                R4 Price
                                                <input
                                                    min="0"
                                                    required
                                                    className="form-control"
                                                    type="number"
                                                    id="example-number-input"
                                                    value={R4Price}
                                                    // placeholder='Add Stock'
                                                    onChange={(e) => setR4Price(e.target.value)}
                                                />
                                            </div>

                                        </div>
                                        <div className="col-md-2">
                                            <button type="submit" className="btn btn-primary" disabled={buttonDisabled}>
                                                Add Size
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddVariationSize;
