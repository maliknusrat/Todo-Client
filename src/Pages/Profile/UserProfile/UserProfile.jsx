import { MdEmail } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/userInfo/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
        console.log(data);
      });
  }, [user]);

  

  return (
    <div className="w-full mx-auto my-10 lg:w-[70%] drop-shadow-lg bg-white">
      <form className="p-12">
        <h1 className="backdrop-blur-sm text-4xl pb-8"> Profile</h1>
        <div className="">
          {info.map((item) => (
            <div key={item?._id} className="grid grid-cols-2 gap-3 place-content-center">
              <div className="border flex justify-self-start">
                <img className="w-[200px]" src={item?.image|| user?.photoURL} alt="" />
              </div>
              <div className="space-y-3">
                <label className="block">Name</label>
                <div className="relative">
                  <input readOnly
                    defaultValue={item?.name ||user?.displayName}
                    className="p-3 block w-full pl-10 drop-shadow-lg outline-none"
                  />
                  <span className="absolute top-1/4 left-2">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="inline-block w-6"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V10ZM7.73867 16.4465C8.96118 15.5085 10.4591 15 12 15C13.5409 15 15.0388 15.5085 16.2613 16.4465C17.4838 17.3846 18.3627 18.6998 18.7615 20.1883C18.9044 20.7217 18.5878 21.2701 18.0544 21.413C17.5209 21.556 16.9726 21.2394 16.8296 20.7059C16.5448 19.6427 15.917 18.7033 15.0438 18.0332C14.1706 17.3632 13.1007 17 12 17C10.8993 17 9.82942 17.3632 8.95619 18.0332C8.08297 18.7033 7.45525 19.6427 7.17037 20.7059C7.02743 21.2394 6.47909 21.556 5.94563 21.413C5.41216 21.2701 5.09558 20.7217 5.23852 20.1883C5.63734 18.6998 6.51616 17.3846 7.73867 16.4465ZM10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9ZM12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5Z"
                          fill="#000000"
                        ></path>
                        <rect
                          x="2.5"
                          y="2.5"
                          width="19"
                          height="19"
                          rx="3.5"
                          stroke="#000000"
                        ></rect>
                      </g>
                    </svg>
                  </span>
                </div>
                <label className="block">Email</label>
                <div className="relative">
                  <input readOnly
                    defaultValue={item?.email || user?.email}
                    className="p-3 block w-full pl-10 drop-shadow-lg outline-none"
                  />
                  <span className="absolute top-1/4 left-2">
                    <MdEmail className="text-xl text-black"></MdEmail>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default UserProfile;


