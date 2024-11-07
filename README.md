# Flutter Clean Architecture Use Case Generator

This VS Code extension simplifies the process of creating use case files within a Flutter Clean Architecture project. The extension allows you to specify a feature name, then generates a Dart use case file with the correct file and class naming conventions inside the specified feature's `domain/usecases` folder.

## Features

- Prompts for the feature name and use case name.
- Creates a Dart file in the format `snake_case_use_case.dart` in the specified feature's `domain/usecases` folder.
- Generates a Dart class for the use case with the correct naming convention (PascalCase).
- Automatically includes `@lazySingleton` annotation and imports necessary packages.

## Installation

1. Clone or download this repository.
2. Open it in VS Code.
3. Run `npm install` to install dependencies.
4. Run `F5` to start a new Extension Development Host instance.

## Usage

1. Open your Flutter project in VS Code.
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
3. Run the command `Feature : Create Use Case`.
4. Enter the feature name where the use case should be created (e.g., `auth`).
5. Enter the use case name (e.g., `GetLanguageUseCase`).
