import React, { useEffect, useState } from "react";

const Modal = ({
  title = "Modal",
  modalTitle = "Congratulation",
  box,
  steps,
}) => {
  const [modal, setModal] = useState(false);
  const [toggle, setToggle] = useState(false);

  const active = () => {
    if (toggle) {
      setToggle(false);
    } else {
      if (!modal) {
        setModal(true);
      }
    }
  };
  useEffect(() => {
    if (modal) {
      setTimeout(() => {
        setToggle(true);
      }, 30);
    }
  }, [modal]);

  useEffect(() => {
    if (!toggle) {
      if (modal) {
        setTimeout(() => {
          setModal(false);
        }, 300);
      }
    }
  }, [toggle]);

  useEffect(() => {
    if (`${box}` === `1,2,3,4,5,6,7,8,0`) {
      active();
    }
  }, [box]);

  return (
    <>
      {modal && (
        <>
          <div className={"w-dvw h-dvh fixed left-0 top-0 right-0 z-[999999]"}>
            <div
              className={`'w-dvw h-dvh flex items-center justify-center fixed left-0 ${
                toggle ? "top-0" : "-top-[100dvh]"
              } right-0 z-[99999] transition-all`}
            >
              <div
                className={
                  "w-80 h-fit p-6 flex flex-col gap-6 relative z-[99999] bg-gray-900 rounded-3xl"
                }
              >
                <div className={"w-full flex justify-between"}>
                  <div className={"text-xl"}>{modalTitle}</div>
                  <button onClick={active}>
                    <img
                      className={"w-5 h-5 invert"}
                      src={
                        "https://cdn-icons-png.flaticon.com/512/2997/2997911.png"
                      }
                    />
                  </button>
                </div>
                <div className={""}>
                  <span className={""}>Win the game with {steps} steps</span>
                </div>
                <div className={"flex justify-end gap-3"}>
                  <button
                    className={"px-3 py-1.5 rounded-lg bg-gray-950"}
                    onClick={active}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div
                className={`w-dvw h-dvh flex justify-center fixed left-0 top-0 right-0 z-[999] ${
                  toggle
                    ? "backdrop-blur-sm backdrop-brightness-50"
                    : "backdrop-blur-0 backdrop-brightness-100"
                } transition-all`}
                onClick={active}
              ></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
