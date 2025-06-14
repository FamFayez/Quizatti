import React, { useState } from "react";
import useProfile from "../hooks/useProfileHook";
import useChangePassword from "../hooks/ChangePasswordHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/profile.css";

export default function Profile() {
  const { user, isLoading } = useProfile();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
    loading,
  } = useChangePassword();

  if (isLoading) return <p>Loading profile...</p>;
  if (!user) return <p>No user data</p>;

  return (
    <div className="container emp-profile">
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="profile-head">
              <h1>My Profile</h1>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="tab-content profile-tab">
              <div className="tab-pane fade show active">
                <div className="row">
                  <div className="col-md-6"><label>Type</label></div>
                  <div className="col-md-6"><p>{user.userType}</p></div>
                </div>
                <div className="row">
                  <div className="col-md-6"><label>Name</label></div>
                  <div className="col-md-6"><p>{user.fullName}</p></div>
                </div>
                <div className="row">
                  <div className="col-md-6"><label>Email</label></div>
                  <div className="col-md-6"><p>{user.email}</p></div>
                </div>
                {user.createdAt && (
                  <div className="row">
                    <div className="col-md-6"><label>Created At</label></div>
                    <div className="col-md-6">
                      <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showChangePassword && (
          <div className="row mt-3">
            <div className="col-md-4">
              <label>Current Password</label>
              <input
                type="password"
                className="form-control"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="row mt-4">
          <div className="col-md-12 text-end">
            {showChangePassword ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={handleChangePassword}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Password"}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setShowChangePassword(true)}
              >
                Change Password
              </button>
            )}
          </div>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}