<div className="w-full">
  <div className="drawer">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">{/* Page content here */}</div>
    <div className="drawer-side">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content min-h-screen w-60 p-4">
        {/* Sidebar content here */}
        <li>
          <a>ACCOUNT</a>
        </li>
        <li>
          <a>FRIENDS</a>
        </li>
      </ul>
    </div>
  </div>

  <ul className="menu bg-base-200 rounded-box h-full">
    <li>
      <label
        htmlFor="my-drawer"
        className="tooltip tooltip-right cursor-pointer btn btn-circle swap swap-rotate"
        data-tip="Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>
      </label>
    </li>

    <li className="indicator mt-3">
      <span className="indicator-item badge badge-secondary text-xs">12</span>
      <a className="tooltip tooltip-right" data-tip="Leaderboard">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </a>
    </li>

    <li className="mt-3">
      <a className="tooltip tooltip-right" data-tip="About Us">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </a>
    </li>

    <li className="mt-3">
      <a className="tooltip tooltip-right" data-tip="Settings">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.983 13.977a2.993 2.993 0 110-5.986 2.993 2.993 0 010 5.986zM19.428 12.593a7.948 7.948 0 000-1.186l2.078-1.602a.5.5 0 00.12-.65l-1.97-3.414a.5.5 0 00-.607-.22l-2.449.98a7.963 7.963 0 00-1.027-.594l-.37-2.6a.5.5 0 00-.496-.424h-3.94a.5.5 0 00-.496.424l-.37 2.6c-.36.168-.703.365-1.027.594l-2.449-.98a.5.5 0 00-.607.22L2.374 9.155a.5.5 0 00.12.65l2.078 1.602a7.948 7.948 0 000 1.186l-2.078 1.602a.5.5 0 00-.12.65l1.97 3.414a.5.5 0 00.607.22l2.449-.98c.324.229.667.426 1.027.594l.37 2.6a.5.5 0 00.496.424h3.94a.5.5 0 00.496-.424l.37-2.6c.36-.168.703-.365 1.027-.594l2.449.98a.5.5 0 00.607-.22l1.97-3.414a.5.5 0 00-.12-.65l-2.078-1.602z"
          />
        </svg>
      </a>
    </li>
  </ul>
</div>;

 {
   /* Create Profile card  */
 }
//  {
//    !verified && (
//      <div className="min-h-screen absolute w-full z-10 bg-black flex flex-col">

//        <div className="flex-1 flex w-full items-center justify-center p-2">
//          <div className="w-1/3  justify-center z-20 ml-20 bg-white/20 backdrop-blur-xl opacity-90 shadow-2xl  rounded-2xl">
//            <div className="!p-10  !h-auto rounded-2xl gap-5 flex flex-col z-20">
//              <div className="text-white text-2xl text-bold text-center">
//                CREATE YOUR ACCOUNT
//              </div>


//              <div className="w-full justify-center flex">
//                <div onClick={inputclick} className="w-30 h-30 cursor-pointer">
//                  {preview ? (
//                    <img
//                      src={preview}
//                      alt="preview"
//                      className="object-cover rounded-full w-28 h-28"
//                    />
//                  ) : (
//                    <Logo />
//                  )}
//                </div>

//                <input
//                  onChange={handleFileChange}
//                  type="file"
//                  accept="image/"
//                  ref={inputRef}
//                  className="hidden"
//                />
//              </div>


//              <div>
//                <fieldset className="fieldset">
//                  <legend className="fieldset-legend text-white text-md">
//                    Username
//                  </legend>
//                  <input
//                    onChange={(e) => setUsername(e.target.value)}
//                    type="text"
//                    className="input w-full"
//                    placeholder="Type here"
//                  />
//                </fieldset>
//              </div>


//              <div>
//                <legend className="fieldset-legend text-white !text-sm">
//                  Bio
//                </legend>
//                <textarea
//                  onChange={(e) => setBio(e.target.value)}
//                  className="textarea w-full"
//                  placeholder="Bio"
//                ></textarea>
//              </div>


//              <div>
//                <legend className="fieldset-legend text-white text-sm">
//                  DOB
//                </legend>
//                <input
//                  onChange={(e) => setBio(e.target.value)}
//                  type="date"
//                  className="input validator"
//                  required
//                  placeholder="Pick a date in 2025"
//                  min="1970-01-01"
//                  max="2020-12-31"
//                  title="Must be valid URL"
//                />
//                <p className="validator-hint">Must be 2025</p>
//              </div>


//              <div className="w-full flex flex-row  justify-end">
//                <button
//                  onSubmit={createprofile}
//                  className="bg-gray-500 p-2 rounded-md px-8 cursor-pointer hover:scale-103 transition duration-100"
//                >
//                  Create Profile
//                </button>
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//    );
//  }
