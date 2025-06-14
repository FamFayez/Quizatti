import React, { useState } from "react";
import useProfile from "../hooks/useProfileHook";
import useChangePassword from "../hooks/ChangePasswordHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/profile.css";
import ChangePasswordHook from "../hooks/ChangePasswordHook";
import Spinner from "../shared/Spinner";

export default function Profile() {
  const { user, isLoading } = useProfile();

  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    setShowChangePassword,
    handleChangePassword,
    loading,
    showChangePassword
  } = ChangePasswordHook();

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowChangePassword(false);
  };

  if (isLoading) return <Spinner />;
  if (!user) return <p>No user data</p>;

  return (
    <div className="container emp-profile">
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="profile-head">
              <h3>My Profile</h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="tab-content profile-tab">
              <div className="tab-pane fade show active">
                <div className="row">
                  <div className="col-md-12">
                    <label>Type</label>
                  </div>
                  <div className="col-md-12">
                    <p>{user.userType}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label>Name</label>
                  </div>
                  <div className="col-md-12">
                    <p>{user.fullName}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label>Email</label>
                  </div>
                  <div className="col-md-12">
                    <p>{user.email}</p>
                  </div>
                </div>
                {user.createdAt && (
                  <div className="row">
                    <div className="col-md-6">
                      <label>Created At</label>
                    </div>
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
          <div className="col-md-12 text-start">
            {showChangePassword ? (
              <>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={async () => {
                    await handleChangePassword();
                  }}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Password"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
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
