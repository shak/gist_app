/**
 * Loads all gists for the given username. Github API has size limits but the resolution to those
 * beyond scope of this sample application and would be happy to discuss in detail later.
 * 
 * @method loadGistsByUser
 * @param {String} username 
 * @returns Promise will resolve response JSON
 */
export async function loadGistsByUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}/gists`);

  return await response.json();
}