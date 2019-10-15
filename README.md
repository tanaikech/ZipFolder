# ZipFolder

<a name="top"></a>
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENCE)

<a name="overview"></a>

# Overview

This is a library for zipping a folder using Google Apps Scripts.

<a name="description"></a>

# Description

When users manually download a folder on Google Drive, users can download all files in the folder as a zip file using the web interface. [There are zip tools in Class Utilities of Google Apps Script](https://developers.google.com/apps-script/reference/utilities/utilities). However, the zip tools cannot create a zip file from a folder. And it cannot retrieve all files included any folders in a folder. So I created this. This library works like almost the same to the web interface using GAS.

## Feature

- Retrieve all files in a folder. If there are folders in the folder, this library retrieves all files in all folders.
- Google Docs of Spreadsheet, Document and Slide which are included in the folder are converted to Excel, Word and Powerpoint format, respectively.
- Standalone scripts (projects) which are included in the folder are converted to JSON.
- Other types (images, text data and so on) are not converted.
- Google Form is not retrieved. Because it cannot be converted to export.

# Library's project key

```
1q5FY5UxNpFNYxtd-LZgIjchicKq1BfDCVPbOwA0BDiL6zfCTxjfe-Puz
```

# How to install

- [Install ManifestsApp library](https://developers.google.com/apps-script/guides/libraries).
  - Library's project key is **`1q5FY5UxNpFNYxtd-LZgIjchicKq1BfDCVPbOwA0BDiL6zfCTxjfe-Puz`**

Installing is done. You can use ZipFolder.

# Usage

```javascript
var blob = ZipFolder.zip(folderId);
DriveApp.createFile(blob);
```

or

```javascript
var blob = ZipFolder.zip(folderId, "_");
DriveApp.createFile(blob);
```

`"_"` is a delimiter between folder names. You can use freely various delimiters. If this is given, folder tree is used as a prefix of filename when there are folders in the folderId. If this is not given, the prefix is not used. For example, when there is `/folder1/folder2/folder3/file1`. When `var blob = ZipFolder.zip(### ID of folder1 ###, "_")` is used, filename will be `folder2_folder3_file1`. `folder1` is used as the filename of zip file.

You can also see the documents at the following URL.

[https://script.google.com/macros/library/versions/d/1q5FY5UxNpFNYxtd-LZgIjchicKq1BfDCVPbOwA0BDiL6zfCTxjfe-Puz](https://script.google.com/macros/library/versions/d/1q5FY5UxNpFNYxtd-LZgIjchicKq1BfDCVPbOwA0BDiL6zfCTxjfe-Puz)

<a name="option1"></a>

# Option for preventing the duplicated filenames when the Google Docs is converted

```javascript
var blob = ZipFolder.zip(folderId, null, { noExtension: true });
DriveApp.createFile(blob);
```

or

```javascript
var blob = ZipFolder.zip(folderId, "_", { noExtension: true });
DriveApp.createFile(blob);
```

In this case, the files converted from Google Docs to Microsoft Docs have no extension of the filename. Please be careful this.

# For your applications

For example, by deploying as Web Apps, this can be used as an API for zipping folders.

<a name="licence"></a>

# Licence

[MIT](LICENCE)

<a name="author"></a>

# Author

[Tanaike](https://tanaikech.github.io/about/)

If you have any questions and commissions for me, feel free to tell me.

<a name="updatehistory"></a>

# Update History

- v1.0.0 (November 12, 2017)

  Initial release.

- v1.0.1 (October 15, 2019)

  - [The option for preventing the duplicated filenames when the Google Docs is converted was added.](#option1)

[TOP](#top)
