import QuestionConstants from '../Constants/QuestionConstants';
import UserConstants from '../Constants/UserConstants';

function QuestionReducer(state = {}, action) {
  switch (action.type) {
    case QuestionConstants.CREATE_REQUEST:
      return {
        Questions: action.QuestionName,
      };
    case QuestionConstants.CREATE_SUCCESS:
      return {
        Questions: action.QuestionName,
      };
    case QuestionConstants.CREATE_FAILURE:
      return {};
    case QuestionConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case QuestionConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        Questions: action.Questions,
      });
    case QuestionConstants.GETALL_FAILURE:
      return {
        Questions: {},
      };
    case QuestionConstants.GETBYID_REQUEST:
      return {
        loading: true,
      };
    case QuestionConstants.GETBYID_SUCCESS:
      return Object.assign({}, state, {
        Questions: action.Questions,
      });
    case QuestionConstants.GETBYID_FAILURE:
      return {
        Questions: {},
      };
    case UserConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

export default QuestionReducer;
