import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const AddTODO = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const date = form.date.value;
    const message = form.message.value;
    const priorty = form.priorty.value;
    const email = user?.email;
    const name = user?.displayName;
    const status = "Pending"
    const list = { name, email, title, date, message, priorty,status};

    fetch("http://localhost:5000/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: "Add",
          text: "Add your list Successfully",
          icon: "success",
          confirmButtonText: "Cool!!!",
        });
        navigate("/profile/mytodo");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg bg-base-200 px-14 pb-10 pt-8 shadow-md dark:bg-zinc-900">
      <div className="mb-6 bg-[#FFFFFF] p-5 rounded-md">
        <h2 className="text-start text-black text-3xl font-semibold tracking-tight">
          Add Your Task
        </h2>
        <p className="text-start text-sm text-zinc-500 dark:text-zinc-400">
          We&apos;d love to hear from you!
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-400">
          <label className="block font-medium" htmlFor="name">
            Title
          </label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            id="title"
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
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            id="_email"
            placeholder="Reminder Date"
            name="date"
            type="date"
          />
        </div>

        <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-400">
          <label className="block font-medium" htmlFor="_message">
            Message
          </label>
          <textarea
            className="min-h-[80px] w-full rounded border px-3 py-2 leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            id="_message"
            placeholder="what's in your mind"
            name="message"
          />
        </div>

        <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-400">
          <label className="block font-medium" htmlFor="_message">
            Select Priorty
          </label>
          <select
            name="priorty"
            className="select select-bordered w-full "
            placeholder="What's Your Priorty"
          >
            <option disabled hidden selected>
              What&apos;s Your Priorty
            </option>
            <option value="High">High</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
          </select>
        </div>
        <input className="rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700" type="submit" value="Submit" />
        
    </form>
    </div>
  );
};

export default AddTODO;
