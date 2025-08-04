import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <div className="clouds">
        <img src="/images/leftcloud.png" alt="Left cloud" className="cloud left" />
        <img src="/images/rightcloud.png" alt="Right cloud" className="cloud right" />
      </div>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
