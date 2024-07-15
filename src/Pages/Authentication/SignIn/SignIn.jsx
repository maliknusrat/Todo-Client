/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";

const SignIn = () => {
  const {signIn, loginWithGoogle} = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();

  const loginHandler = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        form.reset();
        Swal.fire({
          title: "Login Successful",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate("/profile/mytodo/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Email or Password do not matched",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        console.log(error.message);
      });
  };
  const googleLoginHandler = () => {
    loginWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/profile/mytodo/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="box">
      <form onSubmit={loginHandler} action="">
        <h2 className="font-bold">Login Here</h2>

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

        {/* <div className="forget">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <label>Forget Password</label>
        </div> */}

        <div className="py-3">
          <button
            onClick={googleLoginHandler}
            className="flex btn border-none h-10 w-full items-center justify-center gap-1 rounded-full bg-[#DC4724] px-4 py-2 text-sm font-medium text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="size-6 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            SIGN IN WITH GOOGLE
          </button>
        </div>
        <button className="btn buttoon"> Log In</button>

        <div className="register">
          <p>
            Do not have an account ?{" "}
            <Link className="text-red-200" to="/signUp">
              register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
