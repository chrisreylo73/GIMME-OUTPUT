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
		const text = editor.document.getText(editor.selection);
		
		if (!editor.selection.isEmpty) {
			let wrappedText: string;
			switch (language) {
				case "java":
					vscode.window.showInformationMessage(language);
					wrappedText = `System.out.println(${text});`;
					break;
				case "python":
					wrappedText = `print(${text})`;
					break;
				case "javascript":
					wrappedText = `console.log(${text});`;
					break;
				default:
					vscode.window.showInformationMessage(`Sorry Gimme Output does not support "${language}!"`);
					break;
			}
			editor.edit(editBuilder => {
				const selectedLineText = editor.document.lineAt(editor.selection.active.line).text;
				const insertPosition = new vscode.Position(editor.selection.active.line, selectedLineText.length);
				editBuilder.insert(insertPosition, `\n${wrappedText}`);
			});
		} else {
			vscode.window.showInformationMessage(`Gimme Output: No Highlighted Selection!"`);
		}
	}));
}

// This method is called when your extension is deactivated
export function deactivate() {}
