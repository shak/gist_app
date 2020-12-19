const GENERIC_ERROR_MESSAGE = 'There was an error processing the request.';

/**
 * Loads all gists for the given username. Github API has size limits but the resolution to those
 * beyond scope of this sample application and would be happy to discuss in detail later.
 * 
 * @method loadGistsByUser
 * @param {String} username 
 * @returns Promise will resolve response JSON
 */
export const loadGistsByUser = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}/gists`);
  if (response.ok) {
    return await response.json();
  }

  // this can be further expanded to capture exact error from the error object
  // and display to user OR capture to server syslog service and generate a
  // service alert email etc.
  if (typeof response === 'object' && ('statusText' in response)) {
    throw new Error(response.statusText);
  }

  throw new Error(GENERIC_ERROR_MESSAGE);
}