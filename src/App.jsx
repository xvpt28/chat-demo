import { Chat } from "src/layouts";
import { useState } from "react";

function App() {
  useState(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const onChange = () => {
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
    document.body.classList.toggle("dark");
  };

  return (
    <div className="relative">
      {/* <Switch
        onChange={onChange}
        defaultChecked={localStorage.getItem("theme") === "light"}
        className="md:fixed absolute md:right-[50px] right-[20px] md:top-[40px] top-[80px] z-10 "
        checkedChildren="Light"
        unCheckedChildren="Dark"
      /> */}
      <Chat />
    </div>
  );
}

export default App;
