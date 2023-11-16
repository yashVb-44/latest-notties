import React, { useState } from "react";
import defualtImage from "../../../../resources/assets/images/add-image.png";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertBox from "../../../../Components/AlertComp/AlertBox"
import { useSelector } from "react-redux";

let url = process.env.REACT_APP_API_URL

const EditOffers = () => {

    const adminToken = localStorage.getItem('token');
    const selectedOffers = useSelector((state) => state?.OffersDataChange?.payload)

    const Navigate = useNavigate()
    const [offersName, setOffersName] = useState(selectedOffers?.name);
    const [offersAddStatus, setOffersAddStatus] = useState();
    const [statusMessage, setStatusMessage] = useState("");
    const [offerImage, setOfferImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(selectedOffers?.image || '');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (offersName !== "") {

            const formData = new FormData();
            formData.append("name", offersName);
            formData.append("image", offerImage);

            try {
                let response = await axios.put(
                    `${url}/offers/update/${selectedOffers?._id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `${adminToken}`,
                        },
                    }
                );
                if (response.data.type === "success") {
                    setOffersAddStatus(response.data.type);
                    let alertBox = document.getElementById('alert-box')
                    alertBox.classList.add('alert-wrapper')
                    setStatusMessage(response.data.message);
                    setTimeout(() => {
                        Navigate('/showOffers');
                    }, 900);
                } else {
                    setOffersAddStatus(response.data.type);
                    let alertBox = document.getElementById('alert-box')
                    alertBox.classList.add('alert-wrapper')
                    setStatusMessage(response.data.message);
                }
            } catch (error) {
                setOffersAddStatus("error");
                let alertBox = document.getElementById('alert-box')
                alertBox.classList.add('alert-wrapper')
                setStatusMessage("Offers not Update !");
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setOffersAddStatus("");
            setStatusMessage("");
            let alertBox = document?.getElementById('alert-box')
            alertBox?.classList?.remove('alert-wrapper')
        }, 1500);

        return () => clearTimeout(timer);
    }, [offersAddStatus, statusMessage]);


    return (
        <>
            <div className="main-content dark">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Edit Offer</h4>
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
                                                    Offer Name :
                                                </label>
                                                <div className="col-md-10">
                                                    <input
                                                        required
                                                        className="form-control"
                                                        type="text"
                                                        id="example-text-input"
                                                        value={offersName}
                                                        onChange={(e) => {
                                                            setOffersName(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="col-md-2 col-form-label"
                                                >
                                                    Offer Image:
                                                    <div className="imageSize">(Recommended Resolution: W-856 x H-400 )</div>
                                                </label>
                                                <div className="col-md-10">
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        onChange={(e) => {
                                                            setOfferImage(e.target.files[0]);
                                                        }}
                                                        id="example-text-input"
                                                    />
                                                    <div className="fileupload_img col-md-10 mt-3 mb-2">
                                                        <img
                                                            type="image"
                                                            src={offerImage ? URL.createObjectURL(offerImage) : `${previewImage}`}
                                                            alt="user image"
                                                            height={100}
                                                            width={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-10">
                                                <div className="col ms-auto">
                                                    <div className="d-flex flex-reverse flex-wrap gap-2">
                                                        <a className="btn btn-danger" onClick={() => Navigate('/showOffers')}>
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
                <AlertBox status={offersAddStatus} statusMessage={statusMessage} />
            </div>
        </>
    );
};

export default EditOffers;
