import "../../style/profile.css";
import { ProfileData } from "../../core/data/ProfileCont";
export default function Profile() {
  const user = ProfileData[0];
  return (
    <>
      <link
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
        rel={"Profile"}
        id="bootstrap-css"
      ></link>
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

      <div class="container emp-profile">
        <form method="post">
          <div class="row">
            <div class="col-md-6">
              <div class="profile-head">
                <h1>My Profile</h1>
                <h4>Position(TA/ST/IN)</h4>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8">
              <div class="tab-content profile-tab" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div class="row">
                    <div class="col-md-6">
                      <label>User Id</label>
                    </div>
                    <div class="col-md-6">
                      <p>{user.UserID}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Name</label>
                    </div>
                    <div class="col-md-6">
                      <p>{user.Name}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Email</label>
                    </div>
                    <div class="col-md-6">
                      <p>{user.Email}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div class="col-md-6">
                      <p>{user.Phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
