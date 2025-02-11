import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Register() {
  const { setUser, createNewUser, updateUserProfile, googleLogIn } =
    useContext(AuthContext);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const photoUrl = form.get("photoUrl");
    const email = form.get("email");
    const password = form.get("password");
    const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (!regex.test(password)) {
      setError(
        "Invalid password! Password must be at least 6 characters and include uppercase and lowercase letters.",
      );
      return;
    }

    createNewUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photoUrl }).then(
          () => {
            toast.success("Registration successful!");
            navigate(location?.state ? location.state : "/");
          },
        );
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login Successful");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Helmet>
        <title>Register | Visa Navigator</title>
      </Helmet>
      <section className="mx-auto w-11/12 max-w-screen-xl py-16">
        <div className="mx-auto flex max-w-[500px] items-center justify-center">
          <div className="w-full rounded-lg p-8 shadow-lg">
            <h1 className="pb-8 text-center text-3xl font-semibold">
              Register
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="" htmlFor="name">
                <p>Name</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  id="name"
                  className="w-full rounded-lg border p-2 dark:border-gray-700 dark:bg-black"
                  required
                />
              </label>
              <label htmlFor="photoUrl">
                <p>Photo URL</p>
                <input
                  type="text"
                  name="photoUrl"
                  placeholder="Photo URL"
                  id="photoUrl"
                  className="w-full rounded-lg border p-2 dark:border-gray-700 dark:bg-black"
                  required
                />
              </label>

              <label htmlFor="email">
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                  className="w-full rounded-lg border p-2 dark:border-gray-700 dark:bg-black"
                  required
                />
              </label>
              <label htmlFor="password">
                <p>Password</p>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    id="password"
                    className="w-full rounded-lg border p-2 dark:border-gray-700 dark:bg-black"
                    required
                  />
                  {showPassword ? (
                    <FaRegEyeSlash
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={toggleShowPassword}
                    />
                  ) : (
                    <FaRegEye
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={toggleShowPassword}
                    />
                  )}
                </div>
              </label>

              {error && (
                <p className="text-justify text-sm text-red-500">{error}</p>
              )}

              <div className="">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-500 p-2 font-bold text-white"
                >
                  Register
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center justify-center">
              <hr className="h-1 w-full" /> <span className="px-4">or</span>
              <hr className="h-1 w-full" />
            </div>
            <button
              onClick={handleGoogleLogIn}
              className="mt-4 w-full rounded-lg border border-blue-500 p-2 font-bold text-blue-500"
            >
              Continue with Google
            </button>
            <div className="mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
