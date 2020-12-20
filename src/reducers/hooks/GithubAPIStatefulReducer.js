export const FETCH_SUCCESS = 0;
export const FETCH_ERROR = 1;
export const FETCH_INIT = 2;

/**
 * State/action reducer for the gist pull. See React's hooks API for more info
 *
 * Note: Assumes array collection for the payload. This can be further expanded
 * to support various payload types.
 *
 * @method githubAPIStatefulReducer
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const GithubAPIStatefulReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        message: null
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
        message: null
      };
    case FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        message: action.payload
      };
    default:
      throw new Error();
  }
};

export default GithubAPIStatefulReducer;