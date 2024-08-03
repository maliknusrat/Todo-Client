import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Upcomming = () => {
  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch(`https://todo-list-server-neon-six.vercel.app/upcommingGetList?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data.findDate);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [user?.email]);

  return (
    <div>
      {info?.length === 0 ? (
        <div className="flex items-center justify-center">
          <p className="text-xl font-semibold">There is no Upcoming Task</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {/* Card one */}
          {info?.map((item) => (
            <div
              key={item?._id}
              className="group relative max-w-[350px] overflow-hidden bg-gradient-to-r from-[#e67f3b] via-[#ff8b3d] to-[#ffa36b] px-6 py-6 text-white shadow"
            >
              <span className="absolute left-[-40%] top-[30%] z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-r from-[#DD4823] via-[#e76748] to-[#fcc2b4] duration-300 group-hover:top-[-30%] group-hover:blur-sm"></span>

              <span className="absolute right-[-40%] top-[-40%] z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-tr from-[#f44f26] via-[#ea7558] to-[#f48e75] duration-300 group-hover:top-[40%] group-hover:blur-sm"></span>

              <div className="relative z-20 space-y-6">
                <div>
                  <h1 className="text-2xl font-bold">{item?.title}</h1>
                  <p className="text-base">{item?.date}</p>
                </div>
                <p>{item?.message} </p>
                <button className="bg-[#DD4823] px-6 py-2">
                  {item?.status}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Upcomming;
