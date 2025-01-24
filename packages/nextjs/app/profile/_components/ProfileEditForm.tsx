import { useState } from "react";

export const ProfileEditForm = ({
  userName,
  handleCancel,
  handleSave,
}: {
  userName: string;
  handleCancel: () => void;
  handleSave: (newProfileName: string) => void;
}) => {
  const [userNameInputValue, setUserNameInputValue] =
    useState<string>(userName);

  return (
    <div className="relative flex flex-col w-[30%] gap-10 justify-center items-center text-white overflow-hidden">
      <div className="relative flex flex-col gap-2 justify-center ">
        <label className="text-lg ">Username</label>
        <input
          type="text"
          onChange={(event) => {
            setUserNameInputValue(event.target.value);
          }}
          value={userNameInputValue}
          className="w-64 h-12 text-yellow-500 text-center bg-gray-600
      rounded-md text-lg border border-white placeholder-yellow-500
      focus:outline-none focus:border-yellow-500 caret-yellow-500"
        />
      </div>

      <div className="relative flex w-full gap-10 justify-center  overflow-hidden">
        {/* Cancel button  */}
        <button
          className="w-1/2 py-3 bg-black text-yellow-500 font-bold rounded-lg "
          onClick={handleCancel}
        >
          Cancel
        </button>

        {/* Save button  */}
        <button
          className="w-1/2 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
          onClick={() => {
            handleSave(userNameInputValue);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};
