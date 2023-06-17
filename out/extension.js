"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('gimme-output.genPrint', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Editor Undefined');
            return;
        }
        //Get the langauge of the file
        const language = editor.document.languageId;
        const text = editor.document.getText(editor.selection);
        let wrappedText;
        if (!editor.selection.isEmpty) {
            switch (language) {
                case "java":
                    vscode.window.showInformationMessage(language);
                    wrappedText = `System.out.println(${text})`;
                    break;
                case "python":
                    wrappedText = `print(${text})`;
                    break;
                case "javascript":
                    wrappedText = `console.log(${text})`;
                    break;
                default:
                    vscode.window.showInformationMessage(`Sorry Gimme Output does not support "${language}!"`);
                    break;
            }
        }
        else {
            vscode.window.showInformationMessage(`Gimme Output: No Highlighted Selection!"`);
        }
    }));
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map