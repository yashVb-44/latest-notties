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
import { useDispatch } from "react-redux";
import { editSize } from "../../../../Redux/Actions/BackendActions/SizeAction";


let url = process.env.REACT_APP_API_URL


const ShowSize = () => {

    const adminToken = localStorage.getItem('token');

    const [sizesData, setSizeData] = useState([]);
    const [sizesName, setSizeName] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true)


    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const localeText = {
        noRowsLabel: "No Data Found 😔",
    };

    const columns = [
        {
            field: "_id",
            width: 300,
            headerName: "Id",
        },
        {
            field: "name",
            headerName: "Size Name",
            width: 225,
            filterable: true,
            sortable: true,
            filterType: "multiselect",
        },
        // {
        //     field: "status",
        //     headerName: "Status",
        //     width: 220,
        //     renderCell: (params) => (
        //         <div className="form-check form-switch">
        //             <input
        //                 type="checkbox"
        //                 className="form-check-input"
        //                 id={`customSwitch-${params.id}`}
        //                 onChange={() => handleSizeStatus(params.row, !params.value)}
        //                 checked={params.value}
        //                 onClick={(event) => event.stopPropagation()}
        //             />
        //             <label
        //                 className="form-check-label"
        //                 htmlFor={`customSwitch-${params.id}`}
        //                 style={{ size: params.value ? "green" : "grey" }}
        //             >
        //                 {params.value ? "Enable" : "Disable"}
        //             </label>
        //         </div>
        //     ),
        //     filterable: false,
        //     sortable: true,
        //     hide: false,
        // },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => (
                <Stack direction="row">
                    <IconButton
                        aria-label="delete"
                        onClick={() => handleSizeDelete(params.row._id)}
                    >
                        <i class="fas fa-trash-alt font-size-16 font-Icon-Del"></i>
                    </IconButton>
                    <IconButton
                        aria-label="edit"
                        onClick={() => handleSizeUpdate(params.row)}
                    >
                        <i class="fas fa-pencil-alt font-size-16 font-Icon-Up"></i>
                    </IconButton>
                </Stack>
            ),
            filterable: false,
            sortable: false,
            hide: false,
        },
    ];

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

                setSizeData(res?.data?.size || []);
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        }
        getSize();
    }, []);


    const handleSizeDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonSize: "#3085d6",
            cancelButtonSize: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {

                axios
                    .delete(`${url}/product/size/delete/${id}`,
                        {
                            headers: {
                                Authorization: `${adminToken}`,
                            },
                        })
                    .then(() => {
                        setSizeData(sizesData.filter((d) => d?._id !== id));
                        Swal.fire("Success!", "Size has been deleted!", "success");
                    })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire("Error!", "Size has not been deleted!", "error");
                    });
            }
        });
    };


    const handleMultipleSizeDelete = () => {
        let idsToDelete = selectedRows

        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonSize: "#3085d6",
            cancelButtonSize: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {

                axios
                    .delete(`${url}/product/size/deletes`, {
                        data: { ids: idsToDelete },
                        headers: {
                            Authorization: `${adminToken}`,
                        }
                    })
                    .then(() => {
                        setSizeData(sizesData?.filter((d) => !idsToDelete?.includes(d?._id)));
                        Swal.fire("Success!", "Size has been deleted!", "success");
                    })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire("Error!", "Size has not been deleted!", "error");
                    });
            }
        });
    };

    const handleSizeUpdate = (sizes) => {
        dispatch(editSize(sizes))
        Navigate('/editSize')
    };

    const handleSizeStatus = async (sizes, newStatus) => {
        try {

            await axios.put(
                `${url}/sizes/update/status/${sizes?._id}`,
                {
                    status: newStatus,
                },
                {
                    headers: {
                        Authorization: `${adminToken}`,
                    },
                }
            );

            const updatedSizeData = sizesData.map((c) =>
                c._id === sizes._id ? { ...c, status: newStatus } : c
            );
            setSizeData(updatedSizeData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilter = () => {
        const filteredSizeList = sizesData?.filter((sizes) => {
            const formattedSizeName = (sizes?.name || "").toUpperCase().replace(/\s/g, "");
            let isSizeName = true;
            if (sizesName) {
                isSizeName = formattedSizeName.includes(sizesName.toUpperCase().replace(/\s/g, ""));
            }

            return isSizeName;
        });

        // Apply search query filtering
        const filteredData = filteredSizeList.filter((sizes) => {
            const formattedSearchQuery = searchQuery.toUpperCase().replace(/\s/g, "");
            const rowValues = Object.values(sizes);
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
                                Size List
                            </div>
                            <div className="d-flex flex-wrap gap-2 mt-2">
                                <button onClick={() => Navigate("/addSize")} className="btn btn-primary waves-effect waves-light">
                                    Add Size <i className="fas fa-arrow-right ms-2"></i>
                                </button>
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
                                <div className="">
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
                                                <div>{selectedRows.length} Home Feature selected</div>
                                                <DeleteIcon
                                                    style={{ size: "red" }}
                                                    className="cursor-pointer"
                                                    onClick={() => handleMultipleSizeDelete()}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ShowSize;
