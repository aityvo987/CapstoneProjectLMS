'use client'
import React, { FC, useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2, FiPenTool } from 'react-icons/fi';
import { useDeleteCourseMutation, useGetAllCoursesQuery, useGetLecturerAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { format } from "timeago.js";
import toast from 'react-hot-toast';
import Link from 'next/link';
import { styles } from '@/app/styles/styles';
import Loader from '../../../Loader/Loader';
import { useSelector } from 'react-redux';
type Props = {
}

const ManageQuizzes = (props: Props) => {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [courseId, setCourseId] = useState('');
    const { user } = useSelector((state: any) => state.auth);
    const { isLoading, data,error, refetch } = user.role === 'admin'
    ? useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true })
    : useGetLecturerAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    
    const columns = [
        { field: "title", headerName: "Course Title", flex: 0.8 },
        {
            field: " ",
            headerName: "Edit Quizzes",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link href={`/admin/quizzes/${params.row.id}`}
                        >
                            <Button>
                                <FiEdit2
                                    className="dark:text-white text-black"
                                    size={20}
                            />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
        // {
        //     field: "  ",
        //     headerName: "Evaluate",
        //     flex: 0.2,
        //     renderCell: (params: any) => {
        //         return (
        //             <>
        //                <Link href={`/admin/manage-quizzes/${params.row.id}`}
        //                 >
        //                     <Button>
        //                         <FiPenTool
        //                             className="dark:text-white text-black"
        //                             size={20}
        //                     />
        //                     </Button>
                            
        //                 </Link>
        //             </>
        //         );
        //     },
        // },
        {
            field: "   ",
            headerName: "Delete Quizzes",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link href={`/admin/quizzes/${params.row.id}`}
                        >
                            <Button>
                                <AiOutlineDelete
                                    className="dark:text-white text-black"
                                    size={20}
                            />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];
    const rows: any = [

    ];
    {
        data && data.courses.forEach((item: any) => {
            console.log(data)
            rows.push({
                id: item._id,
                title: item.name,
                ratings: item.ratings,
                purchased: item.purchased,
                created_at: format(item.createdAt),
            })
        });
    }
    useEffect(() => {
        if(isLoading){
            console.log("isLoading",user);
        }
        if(!isLoading){
            console.log("emptyData",data);
        }
        
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [error])

    const handleDelete = async () => {
        
    };
    return (
        <div className="mt-[120px]">
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <Box m="20px">
                        <Box
                            m="40px 0 0 0"
                            height="80vh"
                            sx={{
                                "& MuiDataGrid-root": {
                                    border: "none",
                                    outline: "none",
                                },
                                "&.css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& MuiDataGrid-sortIcon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-row": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                    borderBottom:
                                        theme === "dark"
                                            ? "1px solid #ffffff30!important"
                                            : "1px solid #ccc!important",
                                },
                                "& .MuiTablePagination-root": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-cell": {
                                    borderBottom: "none!important",
                                },
                                "& .name-column--cell": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                    borderBottom: "none",
                                    // color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    backgroundColor: theme == "dark" ? "#1F2A40" : "#F2F0F0",
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                    borderTop: "none",
                                    backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                                },
                                "& .MuiCheckbox-root": {
                                    color:
                                        theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                                },
                                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                    color: `#fff !important`,
                                },
                            }}
                        >
                            <DataGrid checkboxSelection rows={rows} columns={columns} />
                        </Box>

                        {/* Delete Course Modal*/}
                        {
                            open && (
                                <Modal
                                    open={open}
                                    onClose={() => setOpen(!open)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                        <h1 className={`${styles.title}`}>
                                            Are you sure you want to delete this question?
                                        </h1>
                                        <div className="flex w-full items-center justify-between mb-6 mt-4">
                                            <div className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                                                onClick={() => setOpen(!open)}>
                                                Cancel
                                            </div>
                                            <div className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                                                onClick={handleDelete}>
                                                Delete
                                            </div>
                                        </div>
                                    </Box>
                                </Modal>
                            )
                        }
                    </Box>
                )
            }
        </div>
    )
}
export default ManageQuizzes