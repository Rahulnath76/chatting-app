import { ArrowLeft, Pencil } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
import { useEffect, useRef, useState } from "react";

const MyProfile = () => {
  const navigate = useNavigate();
  const { user, friends } = useSelector((state: RootState) => state.profile);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [description, setDescription] = useState(user?.description || "");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isEditingDetails, setIsEditingDetails] = useState(false);

  if (!user) {
    return (
      <div className="w-screen h-screen bg-black text-blue-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold">No profile loaded.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md shadow-blue-900/40 hover:from-blue-600 hover:to-blue-400 transition-all duration-200"
          >
            Back to chats
          </button>
        </div>
      </div>
    );
  }

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.fullName || user.username || "User"
  )}&background=000&color=fff`;
  const avatarSrc = avatarPreview || user.avatar || defaultAvatar;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  const handleDetailsEdit = () => {
    setIsEditingDetails(true);
  };

  const handleDetailsCancel = () => {
    setFullName(user.fullName || "");
    setDescription(user.description || "");
    setIsEditingDetails(false);
  };

  const handleDetailsSave = () => {
    // TODO: wire to details update API (name + description)
    setIsEditingDetails(false);
  };

  const handlePhotoCancel = () => {
    setAvatarPreview(null);
  };

  const handlePhotoSave = () => {
    // TODO: wire to photo update API
    setAvatarPreview(null);
  };

  useEffect(() => {
    if (isEditingDetails) {
      fullNameInputRef.current?.focus();
    }
  }, [isEditingDetails]);

  return (
    <div className="w-screen h-screen bg-black text-blue-200 overflow-hidden">
      <div className="h-full p-2">
        <div className="h-full rounded-lg bg-[#090d1e] border border-blue-900/40 p-6">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-black/65 transition-all duration-200"
              aria-label="Go back"
            >
              <ArrowLeft />
            </button>
            <h2 className="text-2xl font-semibold">My Profile</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="bg-[#050712] rounded-xl p-6 border border-blue-900/30">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="relative">
                    <img
                      src={avatarSrc}
                      alt={`${user.fullName || user.username}'s avatar`}
                      className="w-28 h-28 rounded-full object-cover border-2 border-blue-700"
                    />
                    <button
                      onClick={handleAvatarClick}
                      className="absolute -bottom-1 -right-1 p-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md shadow-blue-900/40 hover:from-blue-600 hover:to-blue-400 transition-all duration-200"
                      aria-label="Edit profile photo"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 justify-center">
                      <p className="text-xl font-semibold">
                        {fullName || "Anonymous User"}
                      </p>
                      <button
                        onClick={handleDetailsEdit}
                        className="p-1 rounded-full hover:bg-black/65 transition-all duration-200"
                        aria-label="Edit name"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-blue-300/80">
                      @{user.username || "unknown"}
                    </p>
                  </div>
                  {avatarPreview && (
                    <div className="flex gap-2">
                      <button
                        onClick={handlePhotoSave}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 text-white text-sm shadow-md shadow-blue-900/40 hover:from-blue-600 hover:to-blue-400 transition-all duration-200"
                      >
                        Save Photo
                      </button>
                      <button
                        onClick={handlePhotoCancel}
                        className="px-3 py-1.5 rounded-lg bg-[#0b1024] hover:bg-[#121936] border border-blue-800/50 text-blue-200 transition-all duration-200 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  <div className="mt-2 w-full rounded-lg bg-[#0e1226] p-3">
                    <p className="text-xs text-blue-300/80 uppercase tracking-wide">
                      Friends
                    </p>
                    <p className="text-2xl font-bold">{friends.length}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-[#050712] rounded-xl p-6 border border-blue-900/30">
                <h3 className="text-lg font-semibold mb-4">Account Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#0e1226] rounded-lg p-4">
                    <p className="text-xs text-blue-300/80 uppercase tracking-wide">
                      Full Name
                    </p>
                    {isEditingDetails ? (
                      <input
                        ref={fullNameInputRef}
                        id="fullNameInput"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your name"
                        className="mt-1 w-full bg-transparent border border-blue-900/40 rounded-md px-3 py-2 text-sm text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-700"
                      />
                    ) : (
                      <p className="mt-1 text-base font-semibold">
                        {fullName || "Not set"}
                      </p>
                    )}
                  </div>
                  <div className="bg-[#0e1226] rounded-lg p-4">
                    <p className="text-xs text-blue-300/80 uppercase tracking-wide">
                      Username
                    </p>
                    <input
                      type="text"
                      value={user.username || ""}
                      disabled
                      className="mt-1 w-full bg-transparent border border-blue-900/40 rounded-md px-3 py-2 text-sm text-blue-400/70 cursor-not-allowed"
                    />
                  </div>
                  <div className="bg-[#0e1226] rounded-lg p-4 sm:col-span-2">
                    <p className="text-xs text-blue-300/80 uppercase tracking-wide">
                      Email
                    </p>
                    <input
                      type="email"
                      value={user.email || ""}
                      disabled
                      className="mt-1 w-full bg-transparent border border-blue-900/40 rounded-md px-3 py-2 text-sm text-blue-400/70 cursor-not-allowed"
                    />
                  </div>
                  <div className="bg-[#0e1226] rounded-lg p-4 sm:col-span-2">
                    <p className="text-xs text-blue-300/80 uppercase tracking-wide">
                      Description
                    </p>
                    {isEditingDetails ? (
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell others a bit about you..."
                        rows={3}
                        className="mt-1 w-full bg-transparent border border-blue-900/40 rounded-md px-3 py-2 text-sm text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-blue-200/90">
                        {description || "No description yet."}
                      </p>
                    )}
                  </div>
                </div>
                {isEditingDetails && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={handleDetailsSave}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md shadow-blue-900/40 hover:from-blue-600 hover:to-blue-400 transition-all duration-200"
                    >
                      Save Details
                    </button>
                    <button
                      onClick={handleDetailsCancel}
                      className="px-4 py-2 rounded-lg bg-[#0b1024] hover:bg-[#121936] border border-blue-800/50 text-blue-200 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* <div className="mt-6 bg-[#050712] rounded-xl p-6 border border-blue-900/30">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 transition-colors"
                  >
                    Back to chats
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 rounded-md bg-[#0e1226] hover:bg-[#151a33] border border-blue-900/40 transition-colors"
                  >
                    View conversations
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
