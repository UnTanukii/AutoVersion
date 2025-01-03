const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function checkVersion([major,minor,patch]){
	if((typeof major == 'number' || isNaN(major)) || (typeof minor == 'number' || isNaN(minor)) || (typeof patch == 'number' || isNaN(patch))){
		return false;
	}
	return true;
};

function activate(context) {
	let disposable = vscode.commands.registerCommand('autoversion.changeVersion', async () => {
		try {
			if (!vscode.workspace.workspaceFolders) {
				vscode.window.showErrorMessage('AutoVersion: No workspace is open.');
				return;
			}
			const fileToEdit = vscode.workspace.getConfiguration('autoversion').get('fileToEdit');
			const packageJsonPath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, fileToEdit);
			if(!fs.existsSync(packageJsonPath)){
				vscode.window.showErrorMessage(`AutoVersion: ${fileToEdit} not found.`);
				return;
			};
			const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
	
			const versionTypes = [
				{ label: 'Keep', description: 'Keep the current version', type: 'keep' },
				{ label: 'Patch', description: 'Increment the patch version (x.x.1)', type: 'patch' },
				{ label: 'Minor', description: 'Increment the minor version (x.1.0)', type: 'minor' },
				{ label: 'Major', description: 'Increment the major version (1.0.0)', type: 'major' }
			];
	
			const selected = await vscode.window.showQuickPick(versionTypes, {
				placeHolder: 'Select the semantic version type to increment',
			});
	
			if (!selected) {
				vscode.window.showWarningMessage('AutoVersion: No option selected. Action canceled.');
				return;
			}
	
			const [major, minor, patch] = packageJson.version.split('.').map(Number);
			if(checkVersion([major, minor, patch])){
				vscode.window.showErrorMessage('AutoVersion: The version in the package.json file is invalid (format: x.x.x).');
				return;
			}
			let newVersion;
			switch (selected.type) {
				case 'keep':
					newVersion = packageJson.version;
				break;
				case 'patch':
					newVersion = `${major}.${minor}.${patch + 1}`;
				break;
				case 'minor':
					newVersion = `${major}.${minor + 1}.0`; 
				break;
				case 'major':
					newVersion = `${major + 1}.0.0`; 
				break;
			}
	
			packageJson.version = newVersion;
			fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
	
			const gitExtension = vscode.extensions.getExtension('vscode.git').exports;
			if(!gitExtension){
				vscode.window.showErrorMessage('AutoVersion: Git extension not found.');
				return;
			}
			const api = gitExtension.getAPI(1);
	
			if (api.repositories.length > 0) {
				const currentMessage = api.repositories[0].inputBox.value;
				if(currentMessage.includes(newVersion) || currentMessage.match(/\d+\.\d+\.\d+/)){
					vscode.window.showWarningMessage('AutoVersion: The version is already present in the commit message.');
					return;
				}
				if(currentMessage){
					const newMessage = `${currentMessage.trim()} - ${newVersion}`;
					api.repositories[0].inputBox.value = newMessage;
				}
			}
	
			vscode.window.showInformationMessage(`AutoVersion: Version updated to ${newVersion} (${selected.label.toLowerCase()})`);
		} catch (error) {
			vscode.window.showErrorMessage(`AutoVersion: Error : ${error.message}`);
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
};
