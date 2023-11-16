import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, GridPagination, GridToolbarExport } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import notificationImage from '../../../../resources/assets/images/add-image.png'
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import ImageModel from "../../../../Components/ImageComp/ImageModel";


let url = process.env.REACT_APP_API_URL

const ShowNotification = () => {

    const adminToken = localStorage.getItem('token');

    const Navigate = useNavigate()

    const [notificationData, setNotificationData] = useState([]);
    const [notificationName, setNotificationName] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    // for big image
    const [selectedImage, setSelectedImage] = useState("");
    const [isModalOpenforImage, setIsModalOpenforImage] = useState(false);

    const handleImageClick = (imageURL) => {
        setSelectedImage(imageURL);
        setIsModalOpenforImage(true);
    };

    const localeText = {
        noRowsLabel: "No Data Found 😔",
    };

    const columns = [
        {
            field: "_id",
            width: 240,
            headerName: "Id",
        },
        {
            field: "Type",
            headerName: "Type",
            width: 120,
            filterable: true,
            sortable: true,
            filterType: "multiselect",
        },
        {
            field: "title",
            headerName: "Title",
            width: 200,
            filterable: true,
            sortable: true,
            filterType: "multiselect",
        },
        {
            field: "message",
            headerName: "Message",
            width: 250,
            filterable: true,
            sortable: true,
            filterType: "multiselect",
        },
        {
            field: "Notification_Image",
            headerName: "Image",
            width: 120,
            renderCell: (params) => (
                <img
                    src={`${params?.value}` !== "undefined" ? `${url}/${params?.value}` : notificationImage}
                    alt="Notification Image"
                    height={35}
                    width={35}
                    style={{ borderRadius: '50%', cursor: "pointer" }}
                    onClick={() => handleImageClick(`${params?.value}` !== "undefined" ? `${url}/${params?.value}` : notificationImage)}
                />
            ),
            sortable: false,
            filterable: false,
        },
        {
            field: "SendFor",
            headerName: "Send TO",
            width: 190,
            filterable: true,
            sortable: true,
            filterType: "multiselect",
        },
        {
            field: "Date",
            headerName: "Date",
            width: 120,
            filterable: true,
            sortable: true,
            filterType: "multiselect",
        },
        {
            field: "Time",
            headerName: "Time",
            width: 120,
            filterable: true,
            sortable: true,
            filterType: "multiselect",
        },
        {
            field: "action",
            headerName: "Action",
            width: 80,
            renderCell: (params) => (
                <Stack direction="row">
                    <IconButton
                        aria-label="delete"
                        onClick={() => handleNotificationDelete(params.row._id)}
                    >
                        <i class="fas fa-trash-alt font-size-16 font-Icon-Del"></i>
                    </IconButton>
                </Stack>
            ),
            filterable: false,
            sortable: false,
            hide: false,
        },
    ];

    useEffect(() => {
        async function getNotification() {
            try {

                const res = await axios.get(`${url}/notification/getAll`,
                    {
                        headers: {
                            Authorization: `${adminToken}`,
                        },
                    }
                );
                setNotificationData(res?.data?.notificationList || []);
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        }
        getNotification();
    }, []);


    const handleNotificationDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${url}/notification/delete/${id}`, {
                        headers: {
                            Authorization: `${adminToken}`,
                        },
                    })
                    .then(() => {
                        setNotificationData(notificationData.filter((d) => d?._id !== id));
                        Swal.fire("Success!", "Notification has been deleted!", "success");
                    })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire("Error!", "Notification has not been deleted!", "error");
                    });
            }
        });
    };

    const handleMultipleNotificationDelete = () => {
        let idsToDelete = selectedRows

        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${url}/notification/deletes`, {
                        data: { ids: idsToDelete },
                        headers: {
                            Authorization: `${adminToken}`,
                        },
                    })
                    .then(() => {
                        setNotificationData(notificationData?.filter((d) => !idsToDelete?.includes(d?._id)));
                        Swal.fire("Success!", "Notification has been deleted!", "success");
                    })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire("Error!", "Notification has not been deleted!", "error");
                    });
            }
        });
    };


    const handleFilter = () => {
        const filteredNotificationList = notificationData?.filter((notification) => {
            const formattedNotificationName = (notification?.name || "").toUpperCase().replace(/\s/g, "");
            let isNotificationName = true;
            if (notificationName) {
                isNotificationName = formattedNotificationName.includes(notificationName.toUpperCase().replace(/\s/g, ""));
            }

            return isNotificationName;
        });

        // Apply search query filtering
        const filteredData = filteredNotificationList.filter((notification) => {
            const formattedSearchQuery = searchQuery.toUpperCase().replace(/\s/g, "");
            const rowValues = Object.values(notification);
            for (let i = 0; i < rowValues.length; i++) {
                const formattedRowValue = String(rowValues[i]).toUpperCase().replace(/\s/g, "");
                if (formattedRowValue.includes(formattedSearchQuery)) {
                    return true;
                }
            }
            return false;
        });

        return filteredData;
    };
    const getRowId = (row) => row._id;

    const handleCellClick = (params, event) => {
        if (event.target.type !== "checkbox") {
            event.stopPropagation();
        }
    };

    return (
        <>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2 table-heading">
                                Notification List
                                <div className="d-flex flex-wrap gap-2 mt-2">
                                    <button onClick={() => Navigate("/sendNotification")} className="btn btn-primary waves-effect waves-light">
                                        Send Notification <i className="fas fa-arrow-right ms-2"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="searchContainer mb-3">
                                <div className="searchBarcontainer">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="searchBar"
                                    />
                                    <ClearIcon className="cancelSearch" onClick={() => setSearchQuery("")} />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="datagrid-container">
                                    <DataGrid
                                        style={{ textTransform: "capitalize" }}
                                        rows={handleFilter()}
                                        columns={columns}
                                        checkboxSelection
                                        disableSelectionOnClick
                                        getRowId={getRowId}
                                        filterPanelDefaultOpen
                                        filterPanelPosition="top"
                                        slots={{
                                            toolbar: (props) => (
                                                <div>
                                                    <GridToolbar />
                                                </div>
                                            ),
                                        }}
                                        localeText={localeText}
                                        loading={isLoading}
                                        onCellClick={handleCellClick}
                                        onRowSelectionModelChange={(e) => setSelectedRows(e)}
                                        initialState={{
                                            pagination: { paginationModel: { pageSize: 10 } },
                                        }}
                                        pageSizeOptions={[10, 25, 50, 100]}
                                    />
                                    {selectedRows.length > 0 && (
                                        <div className="row-data">
                                            <div>{selectedRows.length} Notification selected</div>
                                            <DeleteIcon
                                                style={{ color: "red" }}
                                                className="cursor-pointer"
                                                onClick={() => handleMultipleNotificationDelete()}
                                            />
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                className="main-content dark"
                isOpen={isModalOpenforImage}
            >

                <ImageModel
                    isOpen={isModalOpenforImage}
                    onClose={() => setIsModalOpenforImage(false)}
                    imageURL={selectedImage}
                />
            </Modal>
        </>
    );
};

export default ShowNotification;
