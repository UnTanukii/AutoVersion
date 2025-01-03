# AutoVersion

**AutoVersion** is a Visual Studio Code extension designed for managing semantic versioning in Node.js projects. It allows developers to easily increment the version number (major, minor, patch) in any file (such as `package.json`), and also integrates with Git to automatically update the commit message with the new version number.

## Features

- **Automatic Version Incrementing**: 
  - Increment the version number (major, minor, patch) in a user-defined file (e.g., `package.json`).
  
- **Git Integration**: 
  - Automatically append the new version number to the commit message in Git.

- **Customizable File**: 
  - You can configure which file to edit for versioning (default is `package.json`).

## Commands

1. **AutoVersion - Change Version**: 
   - Increment the version of your project in the selected file.
   - Use `Ctrl+Shift+V` (Windows/Linux) or `Cmd+Shift+V` (macOS) to trigger this command.

## Installation

1. Open **Visual Studio Code**.
2. Navigate to the **Extensions** panel.
3. Search for `AutoVersion` and install it.
4. Alternatively, you can install it directly from the marketplace using this [link](https://marketplace.visualstudio.com/items?itemName=untanukii.autoversion).

## Configuration

By default, the extension will modify the `package.json` file. However, you can configure it to edit any file by setting the `autoversion.fileToEdit` property in the workspace or user settings:

```json
{
  "autoversion.fileToEdit": "myfile.json"
}
```

### Settings

- **autoversion.fileToEdit**: The file to edit for versioning (default is `package.json`).

## Usage

1. Open a project folder in Visual Studio Code with a versioned file (e.g., `package.json`).
2. To update the version, press the assigned keyboard shortcut `Ctrl+Shift+V` (Windows/Linux) or `Cmd+Shift+V` (macOS).
3. The extension will prompt you to select the type of version increment (patch, minor, major).
4. The version number will be updated in the specified file, and the commit message will be updated with the new version.

## Requirements

- Visual Studio Code version: **1.96.0** or higher.
- Node.js project with a file containing a version number (e.g., `package.json`).
- Git: Required for updating the commit message with the new version number.

## Development

To contribute to the development of AutoVersion, clone the repository and run the following commands:

```bash
# Install dependencies
npm install

# Run the extension in a development environment
npm run watch
```

## License

This extension is licensed under the **GPL-3.0-only** license.

## Author

- **Name**: UnTanukii
- **Discord**: [@untanukii](https://discord.com/)
- **Twitter**: [@untanukii](https://twitter.com/untanukii)

## Repository

- GitHub: [https://github.com/UnTanukii/AutoVersion](https://github.com/UnTanukii/AutoVersion)