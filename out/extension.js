"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('gimme-output.genPrint1', () => {
        genPrint(1);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('gimme-output.genPrint2', () => {
        genPrint(2);
    }));
    function genPrint(action) {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Editor Undefined');
            return;
        }
        //Get the langauge of the file
        const language = editor.document.languageId;
        const text = editor.document.getText(editor.selection);
        const line = editor.document.lineAt(editor.selection.active.line);
        const lineText = line.text;
        const leadingWhitespace = lineText.slice(0, line.firstNonWhitespaceCharacterIndex);
        if (!editor.selection.isEmpty) {
            let wrappedText;
            switch (language) {
                case "java":
                    if (action === 1) {
                        wrappedText = `${leadingWhitespace}System.out.println(${text});`;
                    }
                    else {
                        wrappedText = `${leadingWhitespace}System.out.println(" " + ${text});`;
                    }
                    break;
                case "python":
                    if (action === 1) {
                        wrappedText = `${leadingWhitespace}print(${text})`;
                    }
                    else {
                        wrappedText = `${leadingWhitespace}print(" " + ${text})`;
                    }
                    break;
                case "javascript":
                    if (action === 1) {
                        wrappedText = `${leadingWhitespace}console.log(${text});`;
                    }
                    else {
                        wrappedText = `${leadingWhitespace}console.log(" "+ ${text});`;
                    }
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
        }
        else {
            vscode.window.showInformationMessage(`Gimme Output: No Highlighted Selection!"`);
        }
    }
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map