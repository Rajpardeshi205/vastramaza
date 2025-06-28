import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
