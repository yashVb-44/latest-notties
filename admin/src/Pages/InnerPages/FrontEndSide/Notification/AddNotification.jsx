import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertBox from "../../../../Components/AlertComp/AlertBox";
import { useNavigate } from "react-router-dom";
import defualtImage from "../../../../resources/assets/images/add-image.png";
import Select from "react-select";

let url = process.env.REACT_APP_API_URL;

const AddNotification = () => {

    const adminToken = localStorage.getItem('token');
    const Navigate = useNavigate()

    const [notificationTitle, setNotificationTitle] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("")
    const [userType, setUserType] = useState("0");
    const [notificationAddStatus, setNotificationAddStatus] = useState();
    const [statusMessage, setStatusMessage] = useState("");
    const [notificationImage, setNotificationImage] = useState("");
    const [userList, setUserList] = useState([]);
    const [resellerList, setResellerList] = useState([])
    const [selectedUser, setSelectedUser] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (notificationTitle) {

            const formData = new FormData();
            const selectedUserIds = selectedUser.map(user => user.value);
            formData.append("selectedUser", selectedUserIds);
            formData.append("userType", userType);
            formData.append("image", notificationImage);
            formData.append("title", notificationTitle);
            formData.append("message", notificationMessage);

            try {
                let response = await axios.post(
                    `${url}/notification/sendbyadmin`,
                    formData,
                    {
                        headers: {
                            Authorization: `${adminToken}`,
                        },
                    }
                );
                if (response.data.type === "success") {
                    setNotificationAddStatus(response.data.type);
                    let alertBox = document.getElementById('alert-box');
                    alertBox.classList.add('alert-wrapper');
                    setStatusMessage(response.data.message);
                    setTimeout(() => {
                        Navigate('/showNotification');
                    }, 900);
                } else {
                    setNotificationAddStatus(response.data.type);
                    let alertBox = document.getElementById('alert-box');
                    alertBox.classList.add('alert-wrapper');
                    setStatusMessage(response.data.message);
                }
            } catch (error) {
                setNotificationAddStatus("error");
                let alertBox = document.getElementById('alert-box');
                alertBox.classList.add('alert-wrapper');
                setStatusMessage("Notification not send!");
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotificationAddStatus("");
            setStatusMessage("");
            let alertBox = document?.getElementById('alert-box');
            alertBox?.classList?.remove('alert-wrapper');
        }, 1500);

        return () => clearTimeout(timer);
    }, [notificationAddStatus, statusMessage]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`${url}/user/get/alluser`,
                    {
                        headers: {
                            Authorization: `${adminToken}`,
                        },
                    });
                const options = response?.data?.user?.filter(option => option.User_Name)?.map((option) => ({
                    value: option._id,
                    label: option.User_Name + `-(${option.User_Mobile_No})`
                }));
                setUserList(options);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        }

        async function fetchResellerData() {
            try {
                const response = await axios.get(`${url}/user/get/allreseller`,
                    {
                        headers: {
                            Authorization: `${adminToken}`,
                        },
                    });

                const options = response?.data?.user?.filter(option => option.User_Name)?.map((option) => ({
                    value: option._id,
                    label: option.User_Name + `-(${option.User_Mobile_No})`
                }));
                setResellerList(options);
            } catch (error) {
                console.error('Failed to fetch resellers:', error);
            }
        }

        fetchUserData()
        fetchResellerData()
    }, []);

    const handleUserType = (value) => {
        setUserType(value)
        setSelectedUser([])
    }

    const handleUserChange = (selectedOptions) => {
        setSelectedUser(selectedOptions);
    };


    return (
        <>
            <div className="main-content dark">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Send Notification</h4>
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
                                                    htmlFor="notificationTitle"
                                                    className="col-md-2 col-form-label"
                                                >
                                                    Notification Title:
                                                </label>
                                                <div className="col-md-10">
                                                    <input
                                                        required
                                                        className="form-control"
                                                        type="text"
                                                        id="notificationTitle"
                                                        value={notificationTitle}
                                                        onChange={(e) => setNotificationTitle(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label
                                                    htmlFor="notificationMessage"
                                                    className="col-md-2 col-form-label"
                                                >
                                                    Notification Message:
                                                </label>
                                                <div className="col-md-10">
                                                    <textarea
                                                        required
                                                        className="form-control"
                                                        type="text"
                                                        id="notificationMessage"
                                                        value={notificationMessage}
                                                        onChange={(e) => setNotificationMessage(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-3 row">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="col-md-2 col-form-label"
                                                >
                                                    Notification Image:
                                                    <div className="imageSize">(Recommended Resolution:
                                                        W-971 X H-1500,
                                                        W-1295 X H-2000,
                                                        W-1618 X H-2500 )</div>
                                                </label>
                                                <div className="col-md-10">
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        onChange={(e) => {
                                                            setNotificationImage(e.target.files[0]);
                                                        }}
                                                        id="example-text-input"
                                                    />
                                                    <div className="fileupload_img col-md-10 mt-3">
                                                        <img
                                                            type="image"
                                                            src={
                                                                notificationImage
                                                                    ? URL.createObjectURL(notificationImage)
                                                                    : defualtImage
                                                            }
                                                            alt="product image"
                                                            height={100}
                                                            width={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3 row">
                                                <label
                                                    htmlFor="userType"
                                                    className="col-md-2 col-form-label"
                                                >
                                                    User Type:
                                                </label>
                                                <div className="col-md-10">
                                                    <select
                                                        className="form-select"
                                                        id="userType"
                                                        value={userType}
                                                        onChange={(e) => handleUserType(e.target.value)}
                                                    >
                                                        <option value="0">All</option>
                                                        <option value="1">All Users</option>
                                                        <option value="2">All Resellers</option>
                                                        <option value="3">Particular User</option>
                                                        <option value="4">Particular Reseller</option>
                                                    </select>
                                                    {userType === "3" ? (
                                                        <Select
                                                            required
                                                            value={selectedUser}
                                                            onChange={handleUserChange}
                                                            options={userList}
                                                            isMulti
                                                            placeholder="Select Users"
                                                            className="w-full md:w-20rem mt-3"
                                                        />
                                                    ) : null}
                                                    {userType === "4" ? (
                                                        <Select
                                                            required
                                                            value={selectedUser}
                                                            onChange={handleUserChange}
                                                            options={resellerList}
                                                            isMulti
                                                            placeholder="Select Resellers"
                                                            className="w-full md:w-20rem mt-3"
                                                        />
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="row mb-10">
                                                <div className="col ms-auto">
                                                    <div className="d-flex flex-reverse flex-wrap gap-2">
                                                        <a className="btn btn-danger" onClick={() => Navigate('/showNotification')}>
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
                <AlertBox status={notificationAddStatus} statusMessage={statusMessage} />
            </div>
        </>
    );
};

export default AddNotification;
