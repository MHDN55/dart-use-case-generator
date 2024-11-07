import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// Convert to snake_case for the filename
function toSnakeCase(input: string): string {
    return input
        .replace(/\s+/g, '_')         // Replace spaces with underscores
        .replace(/([a-z])([A-Z])/g, '$1_$2') // Add underscore between camelCase words
        .toLowerCase();
}

// Convert to PascalCase for the class name
function toPascalCase(input: string): string {
    return input
        .replace(/\s+/g, ' ') // Normalize spaces
        .split(/_| /) // Split on underscores or spaces
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('dartUseCaseGenerator.createUseCase', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage("Please open a workspace first.");
            return;
        }

        // Prompt for the feature name first
        const featureName = await vscode.window.showInputBox({
            prompt: "Enter the feature name :"
        });

        if (!featureName) {
            vscode.window.showErrorMessage("Feature name is required.");
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;
        const featurePath = path.join(rootPath, 'lib', 'features', featureName);

        // Check if the feature directory exists
        if (!fs.existsSync(featurePath)) {
            vscode.window.showErrorMessage(`Feature "${featureName}" does not exist. Please enter a valid feature name.`);
            return;
        }

        // Prompt for the use case name after feature name
        const useCaseName = await vscode.window.showInputBox({
            prompt: "Enter the use case name :"
        });

        if (!useCaseName) {
            vscode.window.showErrorMessage("Use case name is required.");
            return;
        }

        const snakeCaseName = toSnakeCase(useCaseName);
        const pascalCaseName = toPascalCase(useCaseName);

        // Define the path for the use case file within the specified feature
        const useCaseFilePath = path.join(featurePath, 'domain', 'usecases', `${snakeCaseName}_use_case.dart`);

        // File content for the use case
        const fileContent = `
import 'package:dartz/dartz.dart';
import 'package:injectable/injectable.dart';


@lazySingleton
class ${pascalCaseName}UseCase {
  final Repo _repo;

  ${pascalCaseName}UseCase(this._baseRepository);

  Future<Either<Failure, Entity>> call() async =>
      await _repo.doSomething();
}
        `;

        // Ensure the folder path exists
        const folderPath = path.dirname(useCaseFilePath);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        // Write the file with the specified content
        fs.writeFileSync(useCaseFilePath, fileContent.trim());

        vscode.window.showInformationMessage(`Dart use case "${pascalCaseName}UseCase" created successfully at ${useCaseFilePath}`);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
