ZipFolder
=====

<a name="TOP"></a>
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENCE)

<a name="Overview"></a>
# Overview
This is a library for zipping a folder using Google Apps Scripts.

<a name="Description"></a>
# Description
When users manually download a folder on Google Drive, users can download all files in the folder as a zip file using the web interface. [There are zip tools in Class Utilities of Google Apps Script](https://developers.google.com/apps-script/reference/utilities/utilities). However, the zip tools cannot create a zip file from a folder. And it cannot retrieve all files included any folders in a folder. So I created this. This library works like almost the same to the web interface using GAS.

## Feature
- Retrieve all files in a folder. If there are folders in the folder, this library retrieves all files in all folders.
- Google Docs of Spreadsheet, Document and Slide which are included in the folder are converted to Excel, Word and Powerpoint format, respectively.
- Standalone scripts (projects) which are included in the folder are converted to JSON.
- Other types (images, text data and so on) are not converted.
- Google Form is not retrieved. Because it cannot be converted to export.

# Library's project key
~~~
1q5FY5UxNpFNYxtd-LZgIjchicKq1BfDCVPbOwA0BDiL6zfCTxjfe-Puz
~~~

# How to install
- [Install ManifestsApp library](https://developers.google.com/apps-script/guides/libraries).
    - Library's project key is **``1q5FY5UxNpFNYxtd-LZgIjchicKq1BfDCVPbOwA0BDiL6zfCTxjfe-Puz``**

Installing is done. You can use ZipFolder.

# Usage
~~~javascript
var blob = ZipFolder.zip(folderId);
DriveApp.createFile(blob);
~~~

or

~~~javascript
var blob = ZipFolder.zip(folderId, "_");
DriveApp.createFile(blob);
~~~

``"_"`` is a delimiter between folder names. You can use freely various delimiters. If this is given, folder tree is used as a prefix of filename when there are folders in the folderId. If this is not given, the prefix is not used. For example, when there is ``/folder1/folder2/folder3/file1``. When ``var blob = ZipFolder.zip(### ID of folder1 ###, "_")`` is used, filename will be ``folder2_folder3_file1``. ``folder1`` is used as the filename of zip file.

You can also see the documents at the following URL.

[https://script.google.com/macros/library/versions/d/1q5FY5UxNpFNYxtd-LZgIjchicKq1BfDCVPbOwA0BDiL6zfCTxjfe-Puz](https://script.google.com/macros/library/versions/d/1q5FY5UxNpFNYxtd-LZgIjchicKq1BfDCVPbOwA0BDiL6zfCTxjfe-Puz)

# For your applications
For example, by deploying as Web Apps, this can be used as an API for zipping folders.


<a name="Licence"></a>
# Licence
[MIT](LICENCE)

<a name="Author"></a>
# Author
[Tanaike](https://tanaikech.github.io/about/)

If you have any questions and commissions for me, feel free to tell me.

<a name="Update_History"></a>
# Update History
* v1.0.0 (November 12, 2017)

    Initial release.

[TOP](#TOP)
