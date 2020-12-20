import { get, isEmpty } from 'lodash';

const GITHUB_API = 'https://api.github.com';
const GENERIC_ERROR_MESSAGE = 'There was an error processing the request.';

/**
 * Loads all gists for the given username. Github API has size limits but the resolution to those
 * beyond scope of this sample application and would be happy to discuss in detail later.
 *
 * @method loadGistsByUser
 * @param {String} username
 * @param {int} [page=1]
 * @param {int} [limit=20]
 * @returns Promise will resolve response JSON
 */
export const loadGistsByUser = async (username, page = 1,limit = 20) => {
  // fetching max gists per page, I can easily implement pagination but keeping this to-the-point
  // for this exercise. Happy to discuss this face to face futher.
  const response = await fetch(`${GITHUB_API}/users/${username}/gists?page=${page}&per_page=${limit}`);
  if (response.ok) {
    return await response.json();
  }

  // this can be further expanded to capture exact error from the error object
  // and display to user OR capture to server syslog service and generate a
  // service alert email etc.
  throw new Error(get(response, 'statusText', GENERIC_ERROR_MESSAGE));
}

/**
 * Loads and returns fork resources from the given URL resource
 *
 * @method loadForksFromResourceURL
 * @param {String} resourceURL
 * @param {int} [limit=10]
 * @returns Promise will resolve response JSON
 */
export const loadForksFromResourceURL = async (resourceURL, limit = 10) => {
  if (isEmpty(resourceURL) === false) {
    const response = await fetch(`${resourceURL}?per_page=${limit}`);
    if (response.ok) {
      return await response.json();
    }

    throw new Error(get(response, 'statusText', GENERIC_ERROR_MESSAGE));
  }

  throw new Error(GENERIC_ERROR_MESSAGE);
};