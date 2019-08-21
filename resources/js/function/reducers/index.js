import { combineReducers } from "redux";

import { authentication } from "./authentication";
import { users } from "./users";
import { alert } from "./alert";
import { members } from "./members";
import { teams } from "./teams";
import { memberInTeam } from "./memberInTeam";
import { overtimes} from "./overtime";
import { updateOT } from "./updateOT";
import {dateOffs} from "./date-off"

const rootReducer = combineReducers({
  authentication,
  users,
  members,
  alert,
  teams,
  memberInTeam,
  overtimes,
  updateOT,
  dateOffs
});

export default rootReducer;
