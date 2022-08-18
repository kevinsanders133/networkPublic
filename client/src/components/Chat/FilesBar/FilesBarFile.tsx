import React from 'react';
import IShortFileInfo from '../../../models/IShortFileInfo';

const DOCS = ['doc', 'docx'];
const DOCS_color = 'blue';

const SPREADSHEETS = ['xls', 'xlsx'];
const SPREADSHEETS_color = 'green';

const PDF = 'pdf';
const PDFS_color = 'red';

interface FilesBarFileProps {
    file: IShortFileInfo;
}

const FilesBarFile: React.FC<FilesBarFileProps> = ({ file }) => {
    const name = file.path.split('/')[file.path.split('/').length - 1].split('-').slice(1).join('-');
    const extension = name.split('.')[name.split('.').length - 1]
    let symbol = 'F';
    let color = 'grey';
    if (DOCS.includes(extension)) {
        symbol = 'W';
        color = DOCS_color;
    } else if (SPREADSHEETS.includes(extension)) {
        symbol = 'X';
        color = SPREADSHEETS_color;
    } else if (extension === PDF) {
        symbol = 'P';
        color = PDFS_color;
    }

    return (
        <a className="files-bar__file" href={`http://localhost:5001${file.path}`} download={name}>
            <div
                className="files-bar__file-image"
                style={{
                    backgroundColor: `${color}`
                }}
            >{symbol}</div>
            <div className="files-bar__file-info">
                <div className="files-bar__file-name">{name}</div>
                <div className="files-bar__file-size">{file.size} KB</div>
                <div className="files-bar__file-date">Mar 27 at 7:45 PM</div>
            </div>
        </a>
    );
}

export default FilesBarFile;