import Action from "./components/Action"
import Navigation from "./components/Navigation"
import ManageReleases from "./components/ManageReleases"
import AddRelease from "./components/AddRelease"
import AddCreator from "./components/AddCreator"
import ViewRelease from "./components/ViewRelease"
import DeleteModal from "./components/DeleteModal"
import EditRelease from "./components/EditRelease"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ManageCreators from "./components/ManageCreators";
import { useState, useEffect } from "react";
import Expire from "react-expire";
import EditCreator from "./components/EditCreator"


const App = () => {

  const [releaseModal, setReleaseModal] = useState(false)
  const [creatorModal, setCreatorModal] = useState(false)
  const [releaseViewModal, setReleaseViewModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editReleaseModal, setEditReleaseModal] = useState(false)
  const [editCreatorModal, setEditCreatorModal] = useState(false)

  const [popups, setPopups] = useState([])
  const [releaseId, setReleaseId] = useState(null)

  const [deleteReleaseCurrent, setDeleteReleaseCurrent] = useState(null)
  const [editReleaseCurrent, setEditReleaseCurrent] = useState(null)

  const [editCreatorCurrent, setEditCreatorCurrent] = useState(null)

  const [refreshTrigger, setRefreshTrigger] = useState(false)

  const openReleaseModal = (id) => {
    setReleaseId(id);
    setReleaseViewModal(true)
  }

  const releaseAddHandle = (rId) => {
    setPopups([...popups, `${rId}rId`]);
    //
    setRefreshTrigger(prevVal => !prevVal);
  }

  const releaseCallHandle = (msg) => {
    setPopups([...popups, msg]);
    setRefreshTrigger(prevVal => !prevVal);
  }

  const creatorAddHandle = () => {
    setPopups([...popups, "New creator successfully added."]);
    setRefreshTrigger(prevVal => !prevVal);
  }

  const openDeleteModal = (data) => {
    setDeleteReleaseCurrent(data);
    setDeleteModal(true);
  }

  const deleteConfirm = () => {
    setPopups([...popups, "Release deleted successfully."]);
    setDeleteReleaseCurrent(null);
    setRefreshTrigger(prevVal => !prevVal);
  }

  const openReleaseEditModal = (release) => {
    setEditReleaseCurrent(release);
    setEditReleaseModal(true);
  }

  const releaseEditSuccess = () => {
    setPopups([...popups, "Release edited successfully."]);
    setEditReleaseCurrent(null);
    setRefreshTrigger(prevVal => !prevVal);
  }

  const closeViewAndRemoveId = () => {
    setReleaseViewModal(false)
    setReleaseId(null);
  }

  const openCreatorEditModal = (creator) => {
    setEditCreatorCurrent(creator);
    setEditCreatorModal(true);
  }

  const creatorEditSuccess = () => {
    setPopups([...popups, "Creator edited successfully."]);
    setEditCreatorCurrent(null);
    setRefreshTrigger(prevVal => !prevVal);
  }

  return (
    <div className="wrapper">
      <Navigation openCreatorModal={() => setCreatorModal(true)} openReleaseModal={() => setReleaseModal(true)} />
      <AddRelease isOpen={releaseModal} callClose={() => setReleaseModal(false)} callParentUpdate={(rId) => releaseAddHandle(rId)} />
      <AddCreator isOpen={creatorModal} callClose={() => setCreatorModal(false)} callParentUpdate={() => creatorAddHandle()} />
      <ViewRelease isOpen={releaseViewModal} callClose={() => closeViewAndRemoveId()} callParentUpdate={(msg) => releaseCallHandle(msg)} releaseId={releaseId} />
      <DeleteModal isOpen={deleteModal} callClose={() => setDeleteModal(false)} release={deleteReleaseCurrent} callParentUpdate={() => deleteConfirm()} />
      <EditRelease isOpen={editReleaseModal} callClose={() => setEditReleaseModal(false)} callParentUpdate={() => releaseEditSuccess()} release={editReleaseCurrent} />
      <EditCreator isOpen={editCreatorModal} callClose={() => setEditCreatorModal(false)}
        callParentUpdate={() => creatorEditSuccess()} creator={editCreatorCurrent} />
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Action openCreatorModal={() => setCreatorModal(true)} openReleaseModal={() => setReleaseModal(true)} />} />
          <Route exact path="/releases" render={() => <ManageReleases refreshTrigger={refreshTrigger} openReleaseViewModal={(id) => openReleaseModal(id)} openDeleteModal={(data) => openDeleteModal(data)} openReleaseEditModal={(data) => openReleaseEditModal(data)} />} />
          <Route exact path="/creators" render={() => <ManageCreators refreshTrigger={refreshTrigger} openCreatorEditModal={(data => openCreatorEditModal(data))} />} />
        </Switch>
      </Router>
      {
        popups.map((popup, k) =>
          <Expire key={k} until={3000}>{(expired) => (expired ? null :
            <div className="added-popup">
              {popup.endsWith("rId") ?
                <>New release successfully added. View it&nbsp;<span className="show-release-popup" onClick={() => openReleaseModal(popup.replace("rId", ""))}>here</span></>
                : popup}
            </div>)}
          </Expire>)
      }

    </div >
  );
}

export default App;
