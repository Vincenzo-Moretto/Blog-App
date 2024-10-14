const ProfilePosts = () => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* left */}
      <div className="w-[35%] h-[200px] flex justify-center item-center">
        <img src="./coding.png" alt="" className="h-full w-full object-cover" />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold mb:-2 mb-1 md:text-2xl">
          10 Uses of Artificial Intelligence in Day to Day Life
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 item-center justify-between md:mb-4">
          <p>@enzodev</p>
          <div className="flex space-x-2">
            <p>23/06/1993</p>
            <p>23:00</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure quasi quos optio culpa eius fugiat consequatur
          ducimus porro itaque pariatur impedit, ea ratione commodi rem iusto ipsum quaerat? Quae, consectetur.
        </p>
      </div>
    </div>
  );
};
export default ProfilePosts;
