/**
 * Main method for ZipFolder.<br>
 * @param {String} folderId folderId
 * @param {String} folderDelimiter Delimiter between folder names. If this is given, folder tree is used as a prefix of filename when there are folders in the folderId. If this is not given, the prefix is not used.
 * @return {Blob} Return Blob which is a created zip file.
 */
function zip(folderId, folderDelim) {
    return new ZipFolder(folderId, folderDelim || null).zip();
}
;
(function(r) {
  var ZipFolder;
  ZipFolder = (function() {
    var dupCheck, fetch, getFileLlist, getFolderLlist, zipping;

    ZipFolder.name = "ZipFolder";

    function ZipFolder(id, folderDelim) {
      this.folderId = id;
      this.folderName = DriveApp.getFileById(id).getName();
      this.folderDelim = folderDelim;
    }

    ZipFolder.prototype.zip = function() {
      var filelist, folderlist;
      folderlist = getFolderLlist.call(this);
      filelist = getFileLlist.call(this, folderlist);
      return zipping.call(this, filelist);
    };

    getFolderLlist = function() {
      return (function(folder, folderSt, results) {
        var lb;
        lb = function(folder, folderSt, results) {
          var ar, array_folderSt, e, folders, i, k, len;
          ar = [];
          folders = folder.getFolders();
          while (folders.hasNext()) {
            ar.push(folders.next());
          }
          folderSt += folder.getId() + "#_aabbccddee_#";
          array_folderSt = folderSt.split("#_aabbccddee_#");
          array_folderSt.pop();
          results.push(array_folderSt);
          ar.length === 0 && (folderSt = "");
          for (i = k = 0, len = ar.length; k < len; i = ++k) {
            e = ar[i];
            lb(e, folderSt, results);
          }
          return results;
        };
        return lb(folder, folderSt, results);
      })(DriveApp.getFolderById(this.folderId), "", []);
    };

    getFileLlist = function(folderlist) {
      var e, file, fileName, filelist, files, folder, folderTree, folderid, i, k, len, localTimeZone, temp;
      localTimeZone = Session.getScriptTimeZone();
      filelist = [];
      temp = {};
      for (i = k = 0, len = folderlist.length; k < len; i = ++k) {
        e = folderlist[i];
        folderid = folderlist[i][folderlist[i].length - 1];
        folder = DriveApp.getFolderById(folderid);
        files = folder.getFiles();
        while (files.hasNext()) {
          file = files.next();
          folderTree = (function(folderlist, i, folderDelim) {
            var ar, f, j, l, len1, ref;
            if (i > 0) {
              ar = [];
              ref = folderlist[i];
              for (j = l = 0, len1 = ref.length; l < len1; j = ++l) {
                f = ref[j];
                if (j > 0) {
                  ar.push(DriveApp.getFolderById(folderlist[i][j]).getName());
                }
              }
              return ar.join(folderDelim) + folderDelim;
            } else {
              return "";
            }
          })(folderlist, i, this.folderDelim);
          fileName = this.folderDelim != null ? folderTree + file.getName() : file.getName();
          temp = {
            folder_tree: folderTree,
            file_id: file.getId(),
            file_name: fileName,
            file_mimetype: file.getMimeType()
          };
          filelist.push(temp);
          temp = {};
        }
      }
      filelist.sort(function(e1, e2) {
        if (e1.folder_tree > e2.folder_tree) {
          return 1;
        } else {
          return -1;
        }
      });
      return dupCheck.call(this, filelist);
    };

    dupCheck = function(files) {
      var e, i, k, len, tmp;
      tmp = {};
      for (i = k = 0, len = files.length; k < len; i = ++k) {
        e = files[i];
        if (tmp[e.file_name]) {
          tmp[e.file_name] += 1;
          files[i].file_name = files[i].file_name + "_" + tmp[e.file_name].toString();
        } else {
          tmp[e.file_name] = 1;
        }
      }
      if (files.length > 0) {
        return files;
      } else {
        return null;
      }
    };

    zipping = function(files) {
      var accesstoken, blob, blobs, e, er, headers, id, k, len, method, mime, mimeInf, name, url, zipfilename;
      zipfilename = this.folderName + ".zip";
      blobs = [];
      mimeInf = [];
      accesstoken = ScriptApp.getOAuthToken();
      for (k = 0, len = files.length; k < len; k++) {
        e = files[k];
        try {
          id = e.file_id;
          mime = e.file_mimetype;
          name = e.file_name;
        } catch (error) {
          er = error;
          return er;
        }
        blob = null;
        method = "get";
        headers = {
          "Authorization": "Bearer " + accesstoken
        };
        if (mime === "application/vnd.google-apps.form") {
          continue;
        } else if (mime === "application/vnd.google-apps.script") {
          url = "https://script.google.com/feeds/download/export?id=" + id + "&format=json";
          blob = (fetch.call(this, url, method, null, headers)).getBlob().setName(name + ".json");
        } else if (~mime.indexOf('google-apps')) {
          mimeInf = mime === "application/vnd.google-apps.spreadsheet" ? ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", name + ".xlsx"] : mime === "application/vnd.google-apps.document" ? ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", name + ".docx"] : mime === "application/vnd.google-apps.presentation" ? ["application/vnd.openxmlformats-officedocument.presentationml.presentation", name + ".pptx"] : ["application/pdf", name + ".pdf"];
          url = "https://www.googleapis.com/drive/v3/files/" + id + "/export?mimeType=" + mimeInf[0];
          blob = (fetch.call(this, url, method, null, headers)).getBlob().setName(mimeInf[1]);
        } else {
          url = "https://www.googleapis.com/drive/v3/files/" + id + "?alt=media";
          blob = (fetch.call(this, url, method, null, headers)).getBlob().setName(name);
        }
        if (blob != null) {
          blobs.push(blob);
        }
      }
      return Utilities.zip(blobs, zipfilename);
    };

    fetch = function(url, method, payload, headers) {
      var e, res;
      try {
        if (headers != null) {
          headers["User-Agent"] = "Mozilla/5.0 Firefox/26.0";
        }
        res = UrlFetchApp.fetch(url, {
          method: method,
          payload: payload,
          headers: headers,
          muteHttpExceptions: true
        });
      } catch (error) {
        e = error;
        throw new Error(e);
      }
      return res;
    };

    return ZipFolder;

  })();
  return r.ZipFolder = ZipFolder;
})(this);
