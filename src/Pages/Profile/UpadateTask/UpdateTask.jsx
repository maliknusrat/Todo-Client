import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const UpdateTask = ({ id }) => {
    console.log(id);
    const [info,setInfo] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/singleList/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setInfo(data);
            console.log(data);
          });
      }, [id]);

      const navigate = useNavigate();

      const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const date = form.date.value;
        const message = form.message.value;
        const priorty = form.priorty.value;
        const status = "Pending"
        const updatedlist = {title, date, message, priorty,status};
    
        fetch(`http://localhost:5000/updatelist/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedlist),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              title: "Update",
              text: "Update your list Successfully",
              icon: "success",
              confirmButtonText: "OK!!!",
            }).then(result=>{
              if (result.isConfirmed) {
                window.location.reload()
              }
            });
            navigate("/profile/mytodo");
          })
          .catch((err) => console.error(err));
      };
    

  return (
    <div className="w-full max-w-5xl mx-auto rounded-lg bg-base-200 px-5 pb-10 pt-8 shadow-md dark:bg-zinc-900">
      <div className="mb-3 py-5 rounded-md">
        <h2 className="text-start text-black text-3xl font-semibold tracking-tight">
          Update Your Task
        </h2>
        <p className="text-start text-sm text-zinc-500 dark:text-zinc-400">
          We&apos;d love to hear from you!
        </p>
      </div>
      <form onSubmit={handleUpdate} className="w-full space-y-2">
        {info?.map((item)=>(
            <div key={item?._id} className="grid grid-cols-2 place-content-center gap-3">
            <div>
              <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-400">
                <label className="block font-medium" htmlFor="name">
                  Title
                </label>
                <input
                  className="h-10 w-full rounded border px-2 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                  id="title" defaultValue={item?.title}
                  placeholder="Task Title"
                  name="title"
                  type="text"
                />
              </div>
  
              <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-400">
                <label className="block font-medium" htmlFor="_email">
                  Reminder Date
                </label>
                <input
                  className="h-10 w-full rounded border px-2 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                  id="_email"
                  placeholder="Reminder Date" defaultValue={item?.date}
                  name="date"
                  type="date"
                />
              </div>
              <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-400">
                <label className="block font-medium" htmlFor="_message">
                  Select Priorty
                </label>
                <select
                  name="priorty" 
                  className="select select-bordered w-full "
                  defaultValue={item?.priorty}
                >
                  <option disabled hidden selected>
                    What&apos;s Your Priorty
                  </option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                </select>
              </div>
            </div>
  
            <div>
              <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-400">
                <label className="block font-medium" htmlFor="_message">
                  Message
                </label>
                <textarea
                  className="min-h-[80px] w-full rounded border px-2 py-2 leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                  id="_message"
                  defaultValue={item?.message}
                  name="message"
                />
              </div>
  
              
            </div>
          </div>
        ))}

        <input
          className="rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default UpdateTask;
