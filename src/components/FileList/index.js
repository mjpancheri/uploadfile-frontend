import React from 'react';
import {CircularProgressbar} from 'react-circular-progressbar';
import {MdCheckCircle, MdError, MdLink} from 'react-icons/md';

import {Container, FileInfo, Preview} from './styles';

function readableName(name) {
  if(name.length < 23){
    return name;
  }
  return String(name).substring(0, 15)+'...'+String(name).substring(name.length - 4);
}

const FileList = ({files, onDelete}) => (
  <Container>
    {files.map(uploadedFile => (
        <li key={uploadedFile.id}>
        <FileInfo>
          <Preview src={uploadedFile.preview} />
          <div>
            <strong>{readableName(uploadedFile.name)}</strong>
            {uploadedFile.uploaded && (<small>{uploadedFile.createdAt}</small>)}
            <span>{uploadedFile.readableSize} {!!uploadedFile.url && <button onClick={() => onDelete(uploadedFile.id)}>Excluir</button>}</span>
          </div>
        </FileInfo>

        <div>
          {!uploadedFile.uploaded && !uploadedFile.error && (
            <CircularProgressbar 
              styles={{
                root: {width: 24},
                path: {stroke: '#7159c1'}
              }}
              strokeWidth={10}
              percentage={uploadedFile.progress}
              value={uploadedFile.progress} 
              text={`${uploadedFile.progress}%`}
            />
          )}

          {uploadedFile.url && (
            <a 
              href={uploadedFile.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdLink style={{marginRight: 8}} size={24} color="#222" />
            </a>
          )}

          {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
          {uploadedFile.error && <MdError size={24} color="#e57878" />}
        </div>
      </li>
    ))}
  </Container>
);

export default FileList;