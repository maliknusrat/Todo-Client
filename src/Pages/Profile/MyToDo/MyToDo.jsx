import React, { useContext, useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FcClock } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { IoMdClose } from "react-icons/io";
import UpdateTask from "../UpadateTask/UpdateTask";
import { AuthContext } from "../../Provider/AuthProvider";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90vh", // adjust this as needed
    width: "60%", // adjust this as needed
    height: "80%", // adjust this as needed
  },
};

const MyToDo = () => {
  const { user } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [mail, setMail] = useState("");
  const [info, setInfo] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetch(`https://todo-list-server-neon-six.vercel.app/getList?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data.lists);
        setMail(data.user.email);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [user?.email]);

  const handleStatus = (id) => {
    fetch(`https://todo-list-server-neon-six.vercel.app/updateStatus/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Update!",
            text: "Your file has been updated.",
            icon: "success",
          });
        }
        window.location.reload();
      });
  };

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("delete confirm");
        fetch(`https://todo-list-server-neon-six.vercel.app/deleteList/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            window.location.reload();
          });
      }
    });
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(id) {
    setId(id);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      {info?.length === 0 ? (
        <div className="flex items-center justify-center">
          <p className="text-xl font-semibold">You have not added any Task</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>Title</th>
                <th>Tasks</th>
                <th>Date</th>
                <th>Status</th>
                <th>Priorty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {info.map((item) => (
                <tr key={item?._id}>
                  <td className="font-semibold text-slate-500">
                    {item?.title}
                  </td>
                  <td>{item?.message}</td>
                  <td className="text-red-700">{item?.date}</td>
                  <td>
                    {item.status === "Pending" && (
                      <div
                        onClick={() => handleStatus(item._id)}
                        className="text-xl btn btn-ghost btn-sm"
                      >
                        <FcClock />
                      </div>
                    )}
                    {item.status === "Finished" && (
                      <div className="btn btn-ghost btn-sm text-xl">
                        <FcApproval />
                      </div>
                    )}
                  </td>
                  <td className="text-start">
                    {item?.priorty == "High" && (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-[10px] h-[10px] rounded-full bg-red-600" />
                        <p>{item?.priorty}</p>
                      </div>
                    )}
                    {item?.priorty == "Medium" && (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-[10px] h-[10px] rounded-full bg-green-600" />
                        <p>{item?.priorty}</p>
                      </div>
                    )}
                    {item?.priorty == "Low" && (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-[10px] h-[10px] rounded-full bg-yellow-300" />
                        <p>{item?.priorty}</p>
                      </div>
                    )}
                  </td>
                  <td className=" flex items-center gap-3 justify-center">
                    <button
                      onClick={() => openModal(item._id)}
                      className="btn btn-sm btn-square text-xl btn-neutral"
                    >
                      <RiEdit2Fill />
                    </button>
                    {/* Modal Start */}
                    <Modal
                      style={customStyles}
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      contentLabel="Example Modal"
                    >
                      <div className="flex items-end justify-end">
                        <button
                          className="btn btn-sm btn-circle h-6 btn-ghost mb-2  bg-slate-300 hover:bg-slate-600 text-lg font-extrabold text-black "
                          onClick={closeModal}
                        >
                          <IoMdClose></IoMdClose>
                        </button>
                      </div>
                      <UpdateTask id={id} closeModal={closeModal}></UpdateTask>
                    </Modal>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm btn-square text-lg btn-secondary"
                    >
                      <RiDeleteBin6Fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyToDo;
