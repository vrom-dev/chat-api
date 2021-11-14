const fs = require('fs')
const AWS = require('aws-sdk')

const {
  AWS_BUCKET_NAME,
  AWS_DEFAULT_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} = require('../config/s3')

const s3 = new AWS.S3({
  AWS_DEFAULT_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
})

const uploadFileStream = async (file) => {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}

const getFileStream = (fileKey) => {
  const downloadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileKey
  }
  return s3.getObject(downloadParams).createReadStream()
}

module.exports = {
  uploadFileStream,
  getFileStream
}
