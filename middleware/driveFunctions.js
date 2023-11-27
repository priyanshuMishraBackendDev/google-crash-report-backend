const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

// Replace with your OAuth client ID and client secret
const clientId = '733063959891-555cnmp16u19ggjdogmnld96dekc398j.apps.googleusercontent.com';
const clientSecret = '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';
const redirectUri = 'https://unrivaled-sherbet-6e1e5d.netlify.app';


const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

async function getFileMetadata(fileId, dataToReturn, drive) {
    try {
      const response = await drive.files.get({
        fileId,
        fields: 'id, name, createdTime, modifiedTime, owners, permissions, webViewLink',
    });
    const file = response.data;
      if (file.permissions){
          const fileObj = {}
          fileObj.name = file.name
          fileObj.id = file.id
          fileObj.webViewLink = file.webViewLink
          fileObj.permissions = file.permissions
          fileObj.owner = []
          file.owners.forEach(owner => {
            fileObj.owner.push({"displayName": owner.displayName, "emailAddress": owner.emailAddress})
          });
          dataToReturn.push(fileObj)
          console.log(dataToReturn)
      }
    } catch (error) {
      console.error('Error fetching file metadata:', error);
    }
  }
  

async function revokeAccessToken(accessToken) {
    try {
      const response = await oauth2Client.revokeToken(accessToken);
  
      console.log('Access token revoked:', response.data);
    } catch (error) {
      console.error('Error revoking access token:', error.message);
    }
  }

async function getDriveData(accessToken){
    const dataToReturn = []
    oauth2Client.setCredentials({ access_token: accessToken });
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const response = await drive.files.list({
        fields: 'files/id',
      })
    const fileCount = response.data.files.length;
    driveFiles = response.data.files
    for (const obj of driveFiles){
        await getFileMetadata(obj.id,dataToReturn,drive)
        
    }
    return dataToReturn
        }
module.exports = {
    getDriveData,
    revokeAccessToken
}