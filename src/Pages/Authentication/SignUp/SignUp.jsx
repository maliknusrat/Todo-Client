import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
const image_hosting_token = import.meta.env.VITE_Image_Upload_token
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../Provider/AuthProvider";
// import axios from "axios";

const SignUp = () => {
  const [showName, setShowName] = useState({});
  const [image, setImage] = useState(null);
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      Swal.fire({
        title: "Password must be six characters",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      return;
    }

    if (
      !/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])/.test(password)
    ) {
      Swal.fire({
        title: "Password must an upper latter and one special character",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      return;
    }

    //create User

    // eslint-disable-next-line no-undef
    createUser(email, password)
      .then((result) => {
        updateUserData(result.user, name,photo);
        console.log(result.user,name);

        //post operation
        const formData = new FormData();
        formData.append("image", image);

        fetch(image_hosting_url, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            console.log(data.data.display_url);
            const image = data.data.display_url;
            console.log(image);
            const user = {name,email,image};
            console.log(user);
            if (data.success) {
              fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  Swal.fire({
                    title: "Registration",
                    text: "Registration Complete Successfully",
                    icon: "success",
                    confirmButtonText: "Cool!!!",
                  });
                  navigate("/profile/mytodo/");
                })
                .catch((err) => console.error(err));
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateUserData = (user, name, image) => {
    updateProfile(user, {
      displayName: name,
      photoURL: image,
    })
      .then(() => {
        console.log("User Profile Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="box">
      <form onSubmit={handleRegister} action="">
        <h2 className="font-black">Sign Up Here</h2>
        <div className="inputbox">
          <ion-icon name="person-outline"></ion-icon>
          <input type="text" name="name" id="" required />
          <label>Name:</label>
        </div>
        <div>
          <label
            htmlFor="type2-2"
            className="flex w-full max-w-[300px] md:w-[300px]"
          >
            <div className="w-fit whitespace-nowrap bg-[#DC4724] px-3 py-2 text-white">
              Choose File
            </div>
            <div className="flex w-full max-w-[300px] items-center border-b-[2px] border-base-500 px-2 font-medium text-white">
              {showName.name ? showName.name : "No File Chosen"}
            </div>
          </label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
              if (e.target.files && e.target.files[0]) {
                const imageFile = e.target.files[0];
                setShowName(imageFile);
              }
            }}
            className="hidden"
            type="file"
            name="photo"
            id="type2-2"
          />
        </div>
        <div className="inputbox">
          <ion-icon name="mail-outline"></ion-icon>
          <input type="email" name="email" id="" required />
          <label>Email:</label>
        </div>

        <div className="inputbox">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input type="password" name="password" id="" required />
          <label>Password:</label>
        </div>

        <input className="btn button-box" type="submit" value="Sign Up" />

        <div className="register">
          <p>
            Already have an account ?{" "}
            <Link className="text-black" to="/signIn">
              LogIn
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
