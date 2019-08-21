import { overtimeConstants } from "../constants";
import { overtimeService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";
import { handle } from "./response";

export const overtimeActions = {
  getTeam,
  createTeam,
  addMember,
  getMember,
  deleteMember,
  deleteTeam,
  getOne,
  addOvertime,
  getMemberInTeam,
  getMemberInTeamOT,
  getAllOT,
  getOTMember,
  updateOvertime,
  getOneMemberInTeamOT
};

function createTeam(name) {
  return async dispatch => {
    try {
      const user = await overtimeService.createTeam(name);
      dispatch(success(user.data.data));
      dispatch(alertActions.success("Adding successfully!"));
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
  function success(teams) {
    return { type: overtimeConstants.ADD_TEAM, teams };
  }
}

function addMember(memberAdd, id) {
  return async dispatch => {
    try {
      const member = await overtimeService.addMember(memberAdd, id);
      dispatch(success(member.data.members));
      dispatch(alertActions.success("Adding successfully!"));
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
  function success(member) {
    return { type: overtimeConstants.ADD_MEMBER, member };
  }
}

function getTeam() {
  return async dispatch => {
    dispatch(request());
    try {
      const team = await overtimeService.getTeam();
      dispatch(success(team.data));
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
  function request() {
    return { type: overtimeConstants.GETALL_TEAM_REQUEST };
  }
  function success(teams) {
    return { type: overtimeConstants.GETALL_TEAM_SUCCESS, teams };
  }
}

function getMemberInTeamOT(id, pageNumber) {
  return async dispatch => {
    try {
      const getOTMembers = await overtimeService.getMemberInTeamOT(
        id,
        pageNumber
      );
      dispatch(
        success(
          getOTMembers.data.data,
          getOTMembers.data.data.current_page,
          getOTMembers.data.data.per_page,
          getOTMembers.data.data.total
        )
      );
    } catch (error) {
      handle.handleResponse(error.dispatch);
    }
  };

  function success(getOTMembers, current_page, per_page, total) {
    return {
      type: overtimeConstants.GET_ALL_MEMBER_IN_TEAM_OT_SUCCESS,
      getOTMembers,
      current_page,
      per_page,
      total
    };
  }
}

function getOneMemberInTeamOT(id) {
  return async dispatch => {
    try {
      const getOneMemberOT = await overtimeService.getOneMemberInTeamOT(id);
      dispatch(success(getOneMemberOT.data.data));
    } catch (error) {
      handle.handleResponse(error.dispatch);
    }
  };
  function success(getOneMemberOT) {
    return {
      type: overtimeConstants.GET_ONE_MEMBER_OT_IN_TEAM_SUCCESS,
      getOneMemberOT
    };
  }
}

function getMember(id, key) {
  return async dispatch => {
    // dispatch(request(id));
    try {
      const members = await overtimeService.getMember(id, key);
      dispatch(success(members.data.data));
    } catch (error) {
      // handle.handleResponse(error, dispatch);
    }
  };
  // function request() {
  //   return { type: overtimeConstants.MEMBER_REQUEST };
  // }
  function success(members) {
    return { type: overtimeConstants.MEMBER_SUCCESS, members };
  }
  // function failure(error) {
  //   return { type: overtimeConstants.MEMBER_FAILURE, error };
  // }
}

function getMemberInTeam(id, key) {
  return async dispatch => {
    try {
      const memberInTeam = await overtimeService.getMemberInTeam(id, key);
      dispatch(success(memberInTeam.data));
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
  function success(memberInTeam) {
    return {
      type: overtimeConstants.GET_MEMBER_IN_TEAM_SUCCESS,
      memberInTeam
    };
  }
}

function deleteMember(id, idU) {
  return async dispatch => {
    dispatch(request({ idU }));
    try {
      const user = await overtimeService.deleteMember(id, idU);
      dispatch(success(user.data.members));
      dispatch(alertActions.success("Deleting successfully!"));
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
  function request(id) {
    return { type: overtimeConstants.DELETE_MEMBER_ITEM, id };
  }
  function success(member) {
    return { type: overtimeConstants.DELETE_MEMBER_SUCCESS, member };
  }
}

function getOne(id) {
  return async dispatch => {
    try {
      const team = await overtimeService.getOne(id);
      dispatch(success(team.data));
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };

  function success(team) {
    return { type: overtimeConstants.GETONE_TEAM_SUCCESS, team };
  }
}

function deleteTeam(id) {
  return async dispatch => {
    dispatch(request(id));
    try {
      await overtimeService.deleteTeam(id);
      dispatch(alertActions.success("Deleting successfully!"));
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
  function request(id) {
    return { type: overtimeConstants.DELETE_TEAM, id };
  }
}

function addOvertime(data, id) {
  function success(member) {
    return { type: overtimeConstants.ADD_OVERTIME, member };
  }
  return async dispatch => {
    try {
      const overtime = await overtimeService.addOvertime(data, id);
      dispatch(success(overtime.data.data));
      dispatch(alertActions.success("Adding successfully!"));
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
}

function getAllOT(params) {
  return async dispatch => {
    dispatch(request());
    try {
      const overtime = await overtimeService.getAllOT(params);
      dispatch(
        success(
          overtime.data.data,
          overtime.data.data.current_page,
          overtime.data.data.per_page,
          overtime.data.data.total
        )
      );
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
  function request() {
    return { type: overtimeConstants.GETALL_OT_REQUEST };
  }
  function success(overtimes, current_page, per_page, total) {
    return {
      type: overtimeConstants.GETALL_OT_SUCCESS,
      overtimes,
      current_page,
      per_page,
      total
    };
  }
}

function getOTMember(pageNumber) {
  return async dispatch => {
    try {
      const overtime = await overtimeService.getOTMember(pageNumber);
      dispatch(success(overtime.data.data));
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };

  function success(getOTMember) {
    return {
      type: overtimeConstants.GET_OT_ONE_USER_SUCCESS,
      getOTMember
    };
  }
}

function updateOvertime(id, data) {
  return async dispatch => {
    try {
      const updateOTMember = await overtimeService.updateOvertime(id, data);
      dispatch(success(updateOTMember.data.data));
      dispatch(alertActions.success(updateOTMember.data.message));
      history.push(`/admin/addMember/${data.team_id}/overtime`);
    } catch (error) {
      handle.handleResponse(error, dispatch);
    }
  };
  function success(updateOTMember) {
    return { type: overtimeConstants.UPDATE_OVERTIME_SUCCESS, updateOTMember };
  }
}
