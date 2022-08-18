import React from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { setAvatarDialog } from '../../../redux/slices/avatarDialogSlice';
import { useAppSelector } from '../../../redux/hooks';
import './AvatarDialog.sass';
import axios from 'axios';
import { setUserInfo } from '../../../redux/slices/userInfoSlice';
import IUserInfo from '../../../models/IUserInfo';

interface IFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

const AvatarDialog: React.FC = () => {

    const dispatch = useAppDispatch();

    const userInfo = useAppSelector(state => state.userInfo.value);
    const userId = userInfo?.id;

    const changeAvatar = async (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const fileList = target?.files;
        const file = fileList?.[0] as File;

        const formData = new FormData();

        formData.append("avatar", file);

        const config = { headers: { "content-type" : "multipart/form-data"} };

        try {
            const res = await axios.post(`http://localhost:5001/changeAvatar?userId=${userId}`, formData, config);

            if (res.status !== 200) {
                alert('There were error during avatar uploading, try another file');
            } else {
                const newAvatarPath = res.data;
                dispatch(setUserInfo({...userInfo as IUserInfo, avatar: newAvatarPath}));
            }

            closeDialog();
        }
        catch(e) {
            console.log(e);
        }
    }

    const closeDialog = () => {
        dispatch(setAvatarDialog(false));
    }

    return (
        <div className="avatar-dialog-container">
            <div className="avatar-dialog">
                <h3 className="avatar-dialog__title">Change Profile Photo</h3>
                <div className="avatar-dialog__button-container">
                    <input
                        type="file"
                        className="avatar-dialog__input"
                        onInput={changeAvatar}
                        accept=".png,.jpg,.jpeg,.svg"
                    />
                    <span className="avatar-dialog__text" style={{color: "#0294e3"}}>Upload avatar</span>
                </div>
                <div className="avatar-dialog__button">
                    <span className="avatar-dialog__text" style={{color: "#e3020e"}}>Delete current avatar</span>
                </div>
                <div className="avatar-dialog__button" onClick={closeDialog}>
                    <span className="avatar-dialog__text">Cancel</span>
                </div>
            </div>
        </div>
    );
};

export default AvatarDialog;