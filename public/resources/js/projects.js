/**
 * @description This file contains all the code taht will be used in the projects
 *              section.
 */

/**
 * Creates a map of field and value pairs that will be used to create a project
 * document.
 * @param {String} name
 * @param {String} description
 * @param {String} repository
 */
function createProjectDocumentDataObject(name, description, repository) {
	return {
		description: description,
		name: name,
		repository: repository,
	};
}
