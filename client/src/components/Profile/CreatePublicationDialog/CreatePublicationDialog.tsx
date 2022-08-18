import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../../../redux/hooks';
import { setCreatePublicationDialog } from '../../../redux/slices/createPublicationDialogSlice';
import { useAppSelector } from '../../../redux/hooks';
import './CreatePublicationDialog.scss';

const CreatePublicationDialog = () => {

    const dispatch = useAppDispatch();

    const userId = useAppSelector(state => state.userInfo.value?.id);

    const filesList = useRef<HTMLUListElement>(null);
    const filesInput = useRef<HTMLInputElement>(null);
    const messageArea = useRef<HTMLTextAreaElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fileList = filesInput.current?.files;
        const formData = new FormData();
        
        if (fileList) {
            for (let i = 0; i < fileList?.length; i++) {
                formData.append("file", fileList?.item(i) as Blob);
            }
        }

        const message = messageArea.current?.value as string;
        formData.append("message", message);

        const config = { headers: { "content-type" : "multipart/form-data"} };

        try {
            await axios.post(`http://localhost:5001/savePublication?userId=${userId}`, formData, config);
            closeDialog();
        }
        catch(e) {
            console.log(e);
        }
    }

    const showSelectedFiles = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        let filesNames: string[] = [];

        if (input.files?.length !== undefined) {
            for (let i = 0; i < input.files.length; i++) {
                filesNames.push(input.files.item(i)?.name as string);
            }
        }

        setSelectedFiles(filesNames);
    }

    const closeDialog = () => {
        dispatch(setCreatePublicationDialog(false));
    }

    return (
        <div className="create-publication-dialog-container">
            <div className="create-publication-dialog">
                <h3 className="create-publication-dialog__title">Create publication</h3>
                <form onSubmit={handleSubmit} className="create-publication-dialog__form">
                    <div className="create-publication-dialog__file-input-container">
                        <input
                            type="file"
                            name="files"
                            id="create-publication-dialog-file-input"
                            max="10"
                            accept=".jpeg,.jpg,.svg,.png,.webp,.jfif,.mp4"
                            multiple
                            ref={filesInput}
                            onInput={showSelectedFiles}
                        />
                        <label htmlFor="create-publication-dialog-file-input">Select files</label>
                    </div>
                    <ul className="create-publication-dialog__selected-files" ref={filesList}>
                        {
                            selectedFiles.map((fileName, index) => {
                                return (
                                    <li key={index} className="create-publication-dialog__selected-files-item">
                                        {fileName}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="create-publication-dialog__message-container">
                        {/* <label htmlFor="create-publication-dialog-message">Write message</label> */}
                        <textarea
                            name="message"
                            id="create-publication-dialog-message"
                            cols={30}
                            rows={10}
                            placeholder="Write message..."
                            ref={messageArea}
                        ></textarea>
                    </div>
                    <button type="submit" className="create-publication-dialog__submit">Post</button>
                </form>
                <div className="create-publication-dialog__close" onClick={closeDialog}>
                    <svg aria-label="Close" className="create-publication-dialog__close-image" color="#ffffff" fill="#ffffff" height="25" role="img" viewBox="0 0 48 48" width="25"><title>Close</title><path clipRule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fillRule="evenodd"></path></svg>
                </div>
            </div>
        </div>
    );
};

export default CreatePublicationDialog;