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

  useEffect(() => {
    if (isEditingDetails) {
      fullNameInputRef.current?.focus();
    }
  }, [isEditingDetails]);

  if (!user) {
    return (
      <div className="w-screen h-screen bg-[#0B0F19] text-slate-100 flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-sm font-medium text-slate-300">No profile loaded.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
          >
            Back to chats
          </button>
        </div>
      </div>
    );
  }

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.fullName || user.username || "User"
  )}&background=1e293b&color=94a3b8`;
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
    setIsEditingDetails(false);
  };

  const handlePhotoCancel = () => {
    setAvatarPreview(null);
  };

  const handlePhotoSave = () => {
    setAvatarPreview(null);
  };

  return (
    <div className="w-screen h-screen bg-[#0B0F19] text-slate-100 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Profile</h1>
            <p className="text-xs text-slate-400">Manage your profile details and settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Avatar & Summary Card */}
          <div className="md:col-span-1">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-6 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  src={avatarSrc}
                  alt={`${user.fullName || user.username}'s avatar`}
                  className="size-24 rounded-full object-cover ring-2 ring-slate-800"
                />
                <button
                  onClick={handleAvatarClick}
                  className="absolute bottom-0 right-0 p-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow transition-colors cursor-pointer"
                  aria-label="Edit profile photo"
                >
                  <Pencil className="size-3.5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="flex items-center gap-1.5 justify-center">
                <h2 className="text-base font-semibold text-white">
                  {fullName || "Anonymous User"}
                </h2>
                <button
                  onClick={handleDetailsEdit}
                  className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                  aria-label="Edit name"
                >
                  <Pencil className="size-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                @{user.username || "unknown"}
              </p>

              {avatarPreview && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handlePhotoSave}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors"
                  >
                    Save Photo
                  </button>
                  <button
                    onClick={handlePhotoCancel}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div className="mt-6 w-full pt-4 border-t border-slate-800 flex items-center justify-between px-2 text-xs">
                <span className="text-slate-400">Total Friends</span>
                <span className="font-semibold text-white">{friends?.length || 0}</span>
              </div>
            </div>
          </div>

          {/* Details Form Card */}
          <div className="md:col-span-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Account Details
                </h2>
                {!isEditingDetails && (
                  <button
                    onClick={handleDetailsEdit}
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Edit details
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">
                    Full Name
                  </label>
                  {isEditingDetails ? (
                    <input
                      ref={fullNameInputRef}
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-slate-700"
                    />
                  ) : (
                    <p className="text-sm font-medium text-white px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      {fullName || "Not set"}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      value={user.username || ""}
                      disabled
                      className="w-full px-3 py-2 text-sm rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-400 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user.email || ""}
                      disabled
                      className="w-full px-3 py-2 text-sm rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">
                    Bio / Description
                  </label>
                  {isEditingDetails ? (
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-slate-700 resize-none"
                    />
                  ) : (
                    <p className="text-sm text-slate-300 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/80 min-h-[60px]">
                      {description || "No description yet."}
                    </p>
                  )}
                </div>

                {isEditingDetails && (
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleDetailsSave}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleDetailsCancel}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
