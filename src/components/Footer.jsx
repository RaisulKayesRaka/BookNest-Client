import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className={`bg-slate-100`}>
      <div className="mx-auto w-11/12 max-w-screen-xl">
        <div className="flex flex-col-reverse items-center justify-between gap-4 py-4 sm:flex-row">
          <div>
            <p>
              &copy; {new Date().getFullYear()} BookNest. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <FaTwitter className="cursor-pointer hover:text-blue-400" />
            <FaFacebook className="cursor-pointer hover:text-blue-500" />
            <FaLinkedin className="cursor-pointer hover:text-blue-600" />
          </div>
        </div>
      </div>
    </footer>
  );
}
