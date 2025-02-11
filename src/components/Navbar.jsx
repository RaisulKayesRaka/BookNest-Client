import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);

  const openSidebar = () => {
    document.getElementById("sidebar").style.transform = "translateX(-16rem)";
  };
  const closeSidebar = () => {
    document.getElementById("sidebar").style.transform = "translateX(16rem)";
  };
  return (
    <nav className={`sticky top-0 z-50 bg-blue-50 dark:bg-gray-900`}>
      <section className="mx-auto flex w-11/12 max-w-screen-xl items-center justify-between gap-4 py-4">
        <div className="flex items-center justify-center gap-2">
          <Link to="/">
            <img src="/booknest.png" className="h-8" alt="BookNest Logo" />
          </Link>
          <Link to="/">
            <span className="self-center whitespace-nowrap text-2xl font-semibold">
              BookNest
            </span>
          </Link>
        </div>
        <div className="hidden items-center justify-center gap-8 whitespace-nowrap lg:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "active font-semibold text-blue-500 underline decoration-blue-500 decoration-2 underline-offset-4"
                : ""
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-books"
            className={({ isActive }) =>
              isActive
                ? "active font-semibold text-blue-500 underline decoration-blue-500 decoration-2 underline-offset-4"
                : ""
            }
          >
            All Books
          </NavLink>
          <NavLink
            to="/add-book"
            className={({ isActive }) =>
              isActive
                ? "active font-semibold text-blue-500 underline decoration-blue-500 decoration-2 underline-offset-4"
                : ""
            }
          >
            Add Book
          </NavLink>
          <NavLink
            to="/borrowed-books"
            className={({ isActive }) =>
              isActive
                ? "active font-semibold text-blue-500 underline decoration-blue-500 decoration-2 underline-offset-4"
                : ""
            }
          >
            Borrowed Books
          </NavLink>
        </div>
        <div className="hidden items-center justify-center gap-4 lg:flex">
          {user && user?.email ? (
            <div className="group relative flex items-center gap-2">
              <div>
                <img
                  src={user?.photoURL}
                  alt=""
                  className="h-8 w-8 rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute right-0 top-0 hidden w-72 group-hover:block">
                <div>
                  <div className="mt-12 space-y-4 rounded-lg bg-white dark:bg-black p-4 shadow">
                    <p className="whitespace-nowrap font-semibold">
                      {user?.displayName}
                    </p>
                    <button
                      onClick={logOut}
                      className="w-full rounded-lg bg-blue-500 px-4 py-1.5 text-center font-semibold text-white hover:bg-blue-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "active rounded-lg border-blue-500 bg-blue-500 px-4 py-1.5 font-semibold text-white"
                    : "rounded-lg border border-blue-500 px-4 py-1.5 text-blue-500"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "active rounded-lg border-blue-500 bg-blue-500 px-4 py-1.5 font-semibold text-white"
                    : "rounded-lg border border-blue-500 px-4 py-1.5 text-blue-500"
                }
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
        <div className="lg:hidden">
          <button
            className="flex h-8 w-8 items-center justify-center text-3xl"
            onClick={openSidebar}
          >
            <FiMenu />
          </button>
        </div>
      </section>

      {/* sidebar */}
      <section
        id="sidebar"
        className="fixed -right-64 bottom-0 top-0 z-50 flex h-screen w-64 flex-col gap-4 bg-blue-50 dark:bg-gray-900 p-10 shadow transition duration-500 lg:hidden"
      >
        <div>
          <button
            className="absolute right-4 top-4 h-8 w-8 text-3xl"
            onClick={closeSidebar}
          >
            <IoClose />
          </button>
        </div>
        <div className="flex h-full flex-col gap-4">
          <div className="flex flex-grow flex-col gap-4">
            <NavLink
              to="/"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive
                  ? "active font-semibold text-blue-500 underline decoration-blue-500 decoration-2 underline-offset-4"
                  : ""
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/all-books"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive
                  ? "active font-semibold text-blue-500 underline decoration-blue-500 decoration-2 underline-offset-4"
                  : ""
              }
            >
              All Books
            </NavLink>
            <NavLink
              to="/add-book"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive
                  ? "active font-semibold text-blue-500 underline decoration-blue-500 decoration-2 underline-offset-4"
                  : ""
              }
            >
              Add Book
            </NavLink>
            <NavLink
              to="/borrowed-books"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive
                  ? "active font-semibold text-blue-500 underline decoration-blue-500 decoration-2 underline-offset-4"
                  : ""
              }
            >
              Borrowed Books
            </NavLink>
          </div>
          <section className="space-y-4">
            {user && user?.email ? (
              <div className="space-y-4">
                <div>
                  <img
                    src={user?.photoURL}
                    alt=""
                    className="h-12 w-12 rounded"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="font-semibold">{user?.displayName}</p>
                <button
                  onClick={logOut}
                  className="w-full rounded-lg border border-blue-500 px-4 py-1.5 text-center text-blue-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <NavLink
                  to="/login"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    isActive
                      ? "active rounded-lg border-blue-500 bg-blue-500 px-4 py-1.5 text-center font-semibold text-white"
                      : "rounded-lg border border-blue-500 px-4 py-1.5 text-center text-blue-500"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    isActive
                      ? "active rounded-lg border-blue-500 bg-blue-500 px-4 py-1.5 text-center font-semibold text-white"
                      : "rounded-lg border border-blue-500 px-4 py-1.5 text-center text-blue-500"
                  }
                >
                  Register
                </NavLink>
              </div>
            )}
          </section>
        </div>
      </section>
    </nav>
  );
}
