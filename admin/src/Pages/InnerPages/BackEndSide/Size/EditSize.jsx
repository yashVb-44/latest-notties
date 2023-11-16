import React, { useState } from "react";
import defualtImage from "../../../../resources/assets/images/add-image.png";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertBox from "../../../../Components/AlertComp/AlertBox"
import { useSelector } from "react-redux";

let url = process.env.REACT_APP_API_URL

const EditSize = () => {

    const adminToken = localStorage.getItem('token');
    const selectedSize = useSelector((state) => state?.SizeDataChange?.payload)

    const Navigate = useNavigate()
    const [sizeName, setSizeName] = useState(selectedSize?.name);
    const [sizeAddStatus, setSizeAddStatus] = useState();
    const [statusMessage, setStatusMessage] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (sizeName !== "") {

            try {
                let response = await axios.put(
                    `${url}/product/size/update/${selectedSize?._id}`,
                    {
                        name: sizeName,
                    },
                    {
                        headers: {
                            Authorization: `${adminToken}`,
                        },
                    }
                );
                if (response.data.type === "success") {
                    setSizeAddStatus(response.data.type);
                    let alertBox = document.getElementById('alert-box')
                    alertBox.classList.add('alert-wrapper')
                    setStatusMessage(response.data.message);
                    setSizeName("");
                    setTimeout(() => {
                        Navigate('/showSize');
                    }, 900);
                } else {
                    setSizeAddStatus(response.data.type);
                    let alertBox = document.getElementById('alert-box')
                    alertBox.classList.add('alert-wrapper')
                    setStatusMessage(response.data.message);
                }
            } catch (error) {
                setSizeAddStatus("error");
                let alertBox = document.getElementById('alert-box')
                alertBox.classList.add('alert-wrapper')
                setStatusMessage("Sizes not Update !");
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSizeAddStatus("");
            setStatusMessage("");
            let alertBox = document?.getElementById('alert-box')
            alertBox?.classList?.remove('alert-wrapper')
        }, 1500);

        return () => clearTimeout(timer);
    }, [sizeAddStatus, statusMessage]);


    return (
        <>
            <div className="main-content dark">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Edit Home Feature Video</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3 row">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="col-md-2 col-form-label"
                                                >
                                                    Size Name :
                                                </label>
                                                <div className="col-md-10">
                                                    <input
                                                        required
                                                        className="form-control"
                                                        type="text"
                                                        id="example-text-input"
                                                        value={sizeName}
                                                        onChange={(e) => {
                                                            setSizeName(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-10">
                                                <div className="col ms-auto">
                                                    <div className="d-flex flex-reverse flex-wrap gap-2">
                                                        <a className="btn btn-danger" onClick={() => Navigate('/showSize')}>
                                                            {" "}
                                                            <i className="fas fa-window-close"></i> Cancel{" "}
                                                        </a>
                                                        <button className="btn btn-success" type="submit">
                                                            {" "}
                                                            <i className="fas fa-save"></i> Save{" "}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AlertBox status={sizeAddStatus} statusMessage={statusMessage} />
            </div>
        </>
    );
};

export default EditSize;
