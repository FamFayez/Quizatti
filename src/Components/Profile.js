import useProfile from "../hooks/useProfileHook";

export default function Profile() {
  const { user, isLoading } = useProfile();

  if (isLoading) return <p>Loading profile...</p>;
  if (!user) return <p>No user data</p>;

  return (
    <div className="container emp-profile">
      <form method="post">
        <div className="row">
          <div className="col-md-6">
            <div className="profile-head">
              <h1>My Profile</h1>
              <h4>{user.userType}</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
              <div className="tab-pane fade show active" id="home">
                <div className="row">
                  <div className="col-md-6">
                    <label>User ID</label>
                  </div>
                  <div className="col-md-6">
                    <p>{user.userId}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>{user.fullName}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
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
      </form>
    </div>
  );
}
