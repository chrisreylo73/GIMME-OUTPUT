// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('gimme-output.genPrint', () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor){
			vscode.window.showInformationMessage('Editor Undefined');
			return;
		}
		//Get the langauge of the file
		const language = editor.document.languageId;
		if (!editor.selection.isEmpty) {
			switch (language) {
				case "java":
					vscode.window.showInformationMessage(language);
					break;
				case "python":
					
					break;
				case "javascript":
					
					break;
				default:
					vscode.window.showInformationMessage(`Sorry Gimme Output does not support "${language}!"`);
					break;
			}
		} else {
			vscode.window.showInformationMessage(`No Highlighted Selection"`);
		}
		
	}));
}

// This method is called when your extension is deactivated
export function deactivate() {}
